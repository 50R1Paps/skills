---
name: firststone
description: "Set up a Home Repo: the Personal Home Repo, a Team Home Repo for a new work project, or a pointer for a new personal project or app repo."
disable-model-invocation: true
---

Lay the first stone of a project: the **Home Repo** its agent sessions start from, and the pointers to its app repos. Talk to the user in their language. The development flow belongs to Matt Pocock's skills (`/ask-matt`); a Home Repo only carries the context that flow runs in.

## Vocabulary

- **Personal Home Repo**: `~/code/personal/home`, private, the user's alone. Points at every personal project; holds nothing about work except `work-clones.md`, a list of Team Home Repo URLs read only by `setup.mjs`.
- **Team Home Repo**: `~/code/work/<client>/<project>/home`, one per work project, shared with the colleagues on it. Holds the project's tracker, glossary, ADRs, team, constraints and meeting notes.
- **App repo**: a repo holding code. Personal: `~/code/personal/<name>`. Work: `~/code/work/<client>/<project>/<name>`. Firststone writes no file in an app repo: checks, hooks and CI arrive later through `/retro`.
- **Open step**: work left to a person, because a CLI, a permission or a fact is missing. Write each with the direct link, the clicks to make and any text to paste. On a host you do not know, say the path is unknown and ask, rather than guess its menus.
- **Setup checklist**: the open steps of one run, one line each. It lives in a setup issue of the Home Repo; when no issue can be created (no CLI access, or an "Other" tracker) it lives in `docs/agents/setup-checklist.md` and is also printed in chat.

Names in paths are slugs: lowercase, hyphenated (`Acme Corp` → `acme-corp`).

## 0. Choose the case

Look before asking: whether `~/code/personal/home` exists, which Team Home Repos exist under `~/code/work/`, and what the user asked for.

| Case | When |
|---|---|
| **Personal Home Repo** | `~/code/personal/home` is missing. Run it first, then the case the user asked for. |
| **Personal project** | a personal repo has no pointer in the Personal Home Repo. |
| **Work project** | a new work project: its Team Home Repo does not exist. |
| **App repo** | a new app repo for a work project whose Team Home Repo exists. |

A rerun is a case whose Home Repo already holds an `AGENTS.md`, on disk or on its remote (clone it): read the answers from its files and its setup checklist, ask only what is still unknown, do what the unchecked lines now allow, and tick them.

## 1. Interview

Find the facts yourself before asking: CLI access for the hosts involved (`gh auth status`, `glab auth status`), each existing app repo's remote and default branch, the coding agents in use from the agent folders on disk (`.claude/`, `.agents/`, `.codex/`). Then ask the rest in batches, each question with a recommended answer.

- **Personal Home Repo**: GitHub owner (the repo is `<owner>/home`, private); the coding agents to install skills for.
- **Personal project**: name, URL, a few words on what it is, its Granola folder if it has one.
- **Work project**:
  - client and project names; language of the project docs (default: the conversation's);
  - host of the Team Home Repo, GitHub or GitLab, and the owner or group. Another host only when the client forbids keeping project material outside its infrastructure;
  - tracker: the Team Home Repo's Issues; "Other" (Jira, Azure Boards…) when the client imposes one;
  - app repos known so far: name, URL, owner (team or client), a few words on each;
  - members (name, tracker username, starting areas), which member the user is; client contacts (name, role, what to ask them). Nothing more personal than that;
  - the client's review rule, if any;
  - the Granola folder name for the project's meetings (default: the project name).
- **App repo**: name, URL, owner (team or client), a few words on it.

**Done when** every item is answered or the user has deferred it as an open step.

## 2. Plan

Show one plan: every folder and file to write, every remote operation (repo creation, push, branch protection, issue), and the open steps already known, blocking ones first. Creating a repo without CLI access blocks: right after confirmation give the link and the clicks, wait for the URL, then wire it with `git remote add origin <url>` and a plain push.

The confirmation authorises the Git operations in the plan: commits and pushes to `main` of the Home Repos. A Home Repo's `main` stays unprotected: agents write glossary, ADRs and meeting notes to it during sessions.

**Done when** the user confirms. Until then nothing in the plan is executed.

## 3. Write

Every file written has content. `GLOSSARY.md`, `docs/adr/` and `docs/meetings/` are born later with their first real entry, written by the skill or person that owns it. Every Home Repo gets `CLAUDE.md` holding the single line `@AGENTS.md`.

**Personal Home Repo**, at `~/code/personal/home`:

- `AGENTS.md` from [template-personal-agents.md](template-personal-agents.md), with a pointer for each personal repo the user names now;
- `setup.mjs` from [template-setup.mjs](template-setup.mjs), with `AGENTS` set to the coding agents from the interview; from then on it is the user's file;
- `.gitignore` listing `local.md`.

Create the private remote following the host file, commit, push `main`, then run `node setup.mjs` once.

**Personal project**: add its pointer to the Personal Home Repo's `AGENTS.md`, commit and push.

**Work project**, at `~/code/work/<client>/<project>/home`, remote `<owner>/<project>-home`, in the project docs language:

- `AGENTS.md` from [template-team-agents.md](template-team-agents.md);
- `docs/agents/team.md` from [template-team.md](template-team.md);
- `docs/agents/constraints.md` from [template-constraints.md](template-constraints.md);
- `.gitignore` listing `local.md` and `docs/meetings/transcripts/`.

Create the private remote following the host file, commit, push `main`. Then add the project's line to `work-clones.md` in the Personal Home Repo (format in `template-personal-agents.md`), commit and push there.

For each app repo of the project, then for the **App repo** case: add its pointer to the Team Home Repo's `AGENTS.md`, and protect its `main` following the host file: pull request required, zero required approvals. On a client-owned repo the client's rule wins: where the client has none, propose this one as an open step addressed to the client contact. A new app repo is created through the host file before its pointer is written.

Host files: [host-github.md](host-github.md), [host-gitlab.md](host-gitlab.md), [host-other.md](host-other.md).

**Done when** every Home Repo touched has its commit on the remote `main`.

## 4. Close

Write the setup checklist, assigned to the user when it is an issue. For a new Home Repo, one line is always present: run `/setup-matt-pocock-skills` from it. In a Team Home Repo it records the tracker; in the Personal Home Repo the tracker is "the Issues of the app repo the work belongs to". With an "Other" tracker, add a line for the paragraph that skill will ask for, and help the user draft it: how a ticket is created and assigned, and how the five triage states are expressed.

Then report what was created and where the setup checklist is, and end with the session to open next: `/setup-matt-pocock-skills` in the new Home Repo, then `/ask-matt`.

**Done when** the setup checklist exists and every open step is on it.
