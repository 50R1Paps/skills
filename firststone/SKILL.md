---
name: firststone
description: "Set up a new client project: a home repo for knowledge and tracking, plus its app repos."
disable-model-invocation: true
---

Lay the first stone of a client project: one **home repo** and its **app repos**, ready for a small team and its agents. Talk to the user in their language.

## Vocabulary

- **Home repo**: `<project>-knowledge`, internal to the team. Tracker, glossary, ADRs, coding standards, workflow, team, meeting updates and retro notes live here, and every agent session starts here.
- **App repo**: a repo holding the project's code, owned by the team or by the client. It receives only what the code needs: `CONTRIBUTING.md`, hooks, CI. The client may read it and may never see the home repo, so everything written there stands on its own, with the home repo and the team's tracker left unnamed.
- **Open step**: work left to a person, because a CLI, a permission or a fact is missing. Write each one with the direct link, the clicks to make and any text to paste (a PR title and body, a label name). On a host you do not know, say the path is unknown and ask, rather than guess its menus.
- **Setup checklist**: the open steps as a checklist, one line each, with any long text to paste (a PR body) in a section below the list. It lives in the setup issue of the home repo; when no issue can be created (no CLI access, or an "Other" tracker) it lives in `docs/agents/setup-checklist.md` of the home repo and is also printed in chat.

Names in paths are slugs: lowercase, hyphenated (`Acme Corp` → `acme-corp`).

## Without CLI access

When the host's CLI is missing, unauthenticated or refused, every host operation becomes an open step. Creating a repo is the only one that blocks: show it in the plan, and right after confirmation give the user the link and the clicks, then wait for the URL. A repo the user created is wired with `git remote add origin <url>` and a plain push.

## Rerun

It is a rerun when the home repo already holds an `AGENTS.md`, on disk or on its remote (clone it). Read the answers from `AGENTS.md` and `docs/agents/team.md`, read the setup checklist, ask only what is still unknown, and do what the unchecked lines now allow (typically hooks and CI for a stack chosen since). Tick the lines you complete.

In an app repo, the files the earlier run wrote (its `CONTRIBUTING.md`) are yours to complete, not existing files to leave byte-identical. Work on `firststone/setup`: when its PR is still open, push to it and update the PR description; when it has been merged, create the branch again from `main` and open a new PR.

## 1. Interview

Find the facts yourself before asking. Reading is free at this stage: inspect an existing repo on its host or through a throwaway clone you delete.

- CLI access, for the hosts involved only: `gh auth status`, `glab auth status`.
- Each existing app repo's stack and the files it already has.
- The coding agents the team uses (Claude Code, Codex…), from the agent folders already on disk (`.claude/`, `.agents/`, `.codex/`), confirmed in the interview.

Then ask the rest in batches, each question with a recommended answer.

- Client and project names.
- Language of the project docs (default: the conversation's).
- Home repo host: GitHub or GitLab, and the owner or group. Another host only when the client forbids keeping project material outside its infrastructure.
- Tracker: the home repo's Issues. "Other" (Jira, Azure Boards…) when the client imposes one or the home repo sits on another host.
- App repos: how many (default 1). For each: name, host, owner (team or client), new or existing (URL or local path), stack.
- Team: members (name, tracker username, starting areas), which member the user is, the coding agents they use, and client contacts (name, role, what to ask them). Nothing more personal than that.
- For an app repo on a host other than GitHub or GitLab: two lines on how pull requests are opened there and where CI runs.

**Done when** every item is answered or the user has deferred it as an open step.

## 2. Plan

Show one plan covering:

- the folder to create and every file to write, per repo;
- every remote operation: repo creation, push, label, PR, branch protection;
- for an existing app repo, the files already there that overlap with yours and stay untouched, or "no overlaps";
- the open steps already known, blocking ones first;
- the skills committed into the home repo (see step 3).

The user's confirmation authorises the Git operations in the plan: commits and pushes to `main` in the home repo; in app repos a `firststone/setup` branch and a PR, with `main` left to the merge.

**Done when** the user confirms. Until then nothing in the plan is executed.

## 3. Home repo

Location: when the current folder is named after the client (compare slugs), `./<project>-knowledge/`; otherwise `./<Client>/<project>-knowledge/`. Projects of one client sit side by side.

Write, in the project docs language:

- `AGENTS.md` from [template-agents.md](template-agents.md);
- `docs/agents/workflow.md` from [template-workflow.md](template-workflow.md);
- `docs/agents/team.md` from [template-team.md](template-team.md);
- `.gitignore` listing `repos.local.md`;
- `repos.local.md`, only when an app repo is kept outside its default path (format in `template-agents.md`);
- `CODING_STANDARDS.md`, copied from the root of `50R1Paps/skills` when that file exists there: the shared standards each project starts from and then adapts.

Every file you write has content. Do not create `GLOSSARY.md`, `docs/adr/`, `docs/meetings/`, or a `CODING_STANDARDS.md` with no shared source, not even with a first entry of your own: each is born later with its first real entry, written by the skill or person that owns it.

Commit the skills so every teammate gets the same version by cloning: `npx skills add mattpocock/skills --skill ask-matt code-review codebase-design diagnosing-bugs domain-modeling grill-with-docs grilling implement implement-spec improve-codebase-architecture pr prototype research retro setup-matt-pocock-skills tdd to-spec to-tickets triage wayfinder wizard --agent <each agent from the interview> --copy -y`, run from the home repo. `--copy` writes real folders instead of links, which Git and Windows both handle; commit them with `skills-lock.json`. The lock only detects drift: the committed folders are what pins the version. Updates happen at the weekly retro (see `template-workflow.md`).

Then create the private remote, commit, push `main` and create the `retro` label, following the host file: [host-github.md](host-github.md), [host-gitlab.md](host-gitlab.md) or [host-other.md](host-other.md). The home repo's `main` stays unprotected: agents write glossary, ADRs and meeting updates to it during sessions.

**Done when** the first commit is on the remote `main`.

## 4. App repos

For each app repo:

1. Get a clone at `~/repos/<client>/<name>`, or at the path the user gave. A new repo is created through the host file.
2. Create the branch `firststone/setup`.
3. Add the missing files: `CONTRIBUTING.md` from [template-contributing.md](template-contributing.md), in the language the repo already uses; hooks and CI when the stack is known, from [stack-python.md](stack-python.md) or [stack-node.md](stack-node.md) wrapped as the host file says.
4. Leave every existing file byte-identical, except the edits a stack file prescribes (in a team-owned Node repo, `package.json` and its lockfile). When one covers the same ground (a `CONTRIBUTING.md`, a PR template, a CI pipeline), record the overlap for the summary.
5. Push the branch and open the PR through the host file, with the body written by the `pr` skill when it is installed. Merging it is an open step. A branch that adds nothing is not pushed.
6. Protect `main`: pull request required, zero required approvals, so the author can merge. On a client-owned repo the client's rule wins: where the client has none, propose this one as an open step addressed to the client contact.

Unknown stack: write `CONTRIBUTING.md` without its checks section, skip hooks and CI, and add the open step "Choose the stack, then rerun `/firststone` from the home repo". Any other stack than the two above is unknown.

**Done when** each app repo has its branch on the remote and its PR open, or the matching open step, or nothing to add.

## 5. Close

Write the setup checklist, assigned to the user when it is an issue. One line is always present: run `/setup-matt-pocock-skills` from the home repo (it adds its block to the existing `AGENTS.md`).

With an "Other" tracker, create no label, and add a line for the paragraph the setup skill will ask for; help the user draft it: how a ticket is created and assigned, how the five triage states and the retro note are expressed.

Then report: what was created, the overlaps, where the setup checklist is. End by telling the user to run `/setup-matt-pocock-skills` from the home repo and then `/ask-matt` to choose the first flow.

**Done when** the setup checklist exists in the home repo's tracker or files, and every open step is on it.
