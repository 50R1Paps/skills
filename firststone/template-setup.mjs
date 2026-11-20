#!/usr/bin/env node
// Set up or repair this machine from the Personal Home Repo:
// installs the skills globally, schedules their daily update,
// creates ~/code/personal and ~/code/work, and offers the repos to clone.
// Safe to rerun. `node setup.mjs --dry-run` prints the actions without running them.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir, platform, userInfo } from "node:os";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

// Coding agents to install the skills for (`npx skills add --help` lists the names).
const AGENTS = ["claude-code"];
const SKILL_SOURCES = ["mattpocock/skills", "50R1Paps/skills"];
const TASK_NAME = "skills-daily-update";

const DRY_RUN = process.argv.includes("--dry-run");
const HOME_REPO = dirname(fileURLToPath(import.meta.url));
const CODE = join(homedir(), "code");
const LOG = join(homedir(), ".skills-update.log");
const UPDATE = `npx -y skills update -g -y >> "${LOG}" 2>&1`;

function run(cmd, args, opts = {}) {
  console.log(`$ ${cmd} ${args.join(" ")}`);
  if (DRY_RUN) return;
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: platform() === "win32", ...opts });
  if (r.status !== 0) throw new Error(`${cmd} exited with ${r.status}`);
}

function write(path, content) {
  console.log(`write ${path}`);
  if (DRY_RUN) return;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function makeDirs() {
  for (const dir of [join(CODE, "personal"), join(CODE, "work")]) {
    if (existsSync(dir)) continue;
    console.log(`mkdir ${dir}`);
    if (!DRY_RUN) mkdirSync(dir, { recursive: true });
  }
}

function installSkills() {
  const agentArgs = AGENTS.flatMap((a) => ["--agent", a]);
  for (const source of SKILL_SOURCES) {
    run("npx", ["-y", "skills", "add", source, "-g", "-y", "--skill", "*", ...agentArgs]);
  }
}

// Daily update that also runs at the next start when the machine was off at the scheduled time.
function scheduleUpdate() {
  switch (platform()) {
    case "win32": {
      const ps = [
        `$action = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument '/c ${UPDATE.replaceAll("'", "''")}'`,
        `$trigger = New-ScheduledTaskTrigger -Daily -At 9am`,
        `$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries`,
        `Register-ScheduledTask -TaskName '${TASK_NAME}' -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null`,
      ].join("; ");
      run("powershell", ["-NoProfile", "-Command", ps], { shell: false });
      return;
    }
    case "darwin": {
      const label = `local.${TASK_NAME}`;
      const plist = join(homedir(), "Library", "LaunchAgents", `${label}.plist`);
      write(
        plist,
        `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>${label}</string>
  <key>ProgramArguments</key>
  <array><string>/bin/zsh</string><string>-lc</string><string>${UPDATE.replaceAll('"', "&quot;")}</string></array>
  <key>StartCalendarInterval</key><dict><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>
  <key>RunAtLoad</key><true/>
</dict>
</plist>
`,
      );
      const domain = `gui/${userInfo().uid}`;
      if (!DRY_RUN) spawnSync("launchctl", ["bootout", `${domain}/${label}`]);
      run("launchctl", ["bootstrap", domain, plist]);
      return;
    }
    case "linux": {
      const dir = join(homedir(), ".config", "systemd", "user");
      write(
        join(dir, `${TASK_NAME}.service`),
        `[Unit]\nDescription=Update agent skills\n\n[Service]\nType=oneshot\nExecStart=/bin/bash -lc '${UPDATE}'\n`,
      );
      write(
        join(dir, `${TASK_NAME}.timer`),
        `[Unit]\nDescription=Update agent skills daily\n\n[Timer]\nOnCalendar=*-*-* 09:00:00\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n`,
      );
      run("systemctl", ["--user", "daemon-reload"]);
      run("systemctl", ["--user", "enable", "--now", `${TASK_NAME}.timer`]);
      return;
    }
    default:
      console.log(`No scheduler known for ${platform()}: run "npx skills update -g -y" by hand.`);
  }
}

function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

// Personal repos from the AGENTS.md pointers, Team Home Repos from work-clones.md.
function listRepos() {
  const repos = [];
  const pointer = /^(.+?) \(.*?\): `~\/code\/personal\/([^`]+)`\. Clone from (\S+?) if missing/;
  for (const line of readIfExists(join(HOME_REPO, "AGENTS.md")).split(/\r?\n/)) {
    const m = line.match(pointer);
    if (m) repos.push({ name: m[1], path: join(CODE, "personal", m[2]), url: m[3] });
  }
  const row = /^\|\s*([^|]+?)\s*\|\s*(\S+?)\s*\|$/;
  for (const line of readIfExists(join(HOME_REPO, "work-clones.md")).split(/\r?\n/)) {
    const m = line.match(row);
    if (!m || !m[1].includes("/") || m[2].startsWith("-")) continue;
    repos.push({ name: `work: ${m[1]}`, path: join(CODE, "work", ...m[1].split("/"), "home"), url: m[2] });
  }
  return repos;
}

// local.md lists repos kept outside their default path on this machine: | name | path |
function localPaths() {
  const paths = new Map();
  for (const line of readIfExists(join(HOME_REPO, "local.md")).split(/\r?\n/)) {
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
    if (m && !m[2].startsWith("-")) paths.set(m[1], m[2]);
  }
  return paths;
}

async function offerClones() {
  const local = localPaths();
  const missing = listRepos().filter((r) => !existsSync(r.path) && !(local.has(r.name) && existsSync(local.get(r.name))));
  if (missing.length === 0) {
    console.log("Every listed repo is already on this machine.");
    return;
  }
  missing.forEach((r, i) => console.log(`${i + 1}. ${r.name}  →  ${r.path}`));
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question('Repos to clone (e.g. "1,3", "all", or empty for none): ')).trim();
  rl.close();
  const picked =
    answer === "all"
      ? missing
      : answer
          .split(",")
          .map((s) => missing[Number(s.trim()) - 1])
          .filter(Boolean);
  for (const r of picked) {
    if (!DRY_RUN) mkdirSync(dirname(r.path), { recursive: true });
    run("git", ["clone", r.url, r.path], { shell: false });
  }
}

makeDirs();
installSkills();
scheduleUpdate();
await offerClones();
console.log(`Done. Skill updates log to ${LOG}.`);
