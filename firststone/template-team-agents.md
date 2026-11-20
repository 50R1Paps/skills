# Template: `AGENTS.md` of a Team Home Repo

Pointers only: every line here loads in every session. Fill the placeholders and translate into the project docs language. One line per app repo, in the Home Repo pattern's format; add a hint only where the repo needs one. The tracker is named later by the `/setup-matt-pocock-skills` block.

````markdown
# <Project> (<Client>)

Home Repo of <Project>: tracker, glossary, decisions, team, constraints and meeting notes. Start every agent session here.

## Skills

The development flow is Matt Pocock's skills: run `/ask-matt` to choose the path for a task. When they are missing from your skills, install them with `npx skills add mattpocock/skills -g -y`.

## App repositories

<name> (<what it is, in a few words>): `~/code/work/<client>/<project>/<name>`. Clone from <url> if missing.
<name> (<what it is>): `~/code/work/<client>/<project>/<name>`. Clone from <url> if missing. <hint, e.g. "Read its CONTRIBUTING.md before changing it.">

A repo kept elsewhere on this machine is listed in `local.md` (untracked); that path wins over the one above. A repo found in neither place: clone it to the path above, or ask where it is and record the answer in `local.md`.

## Meetings

Granola folder: `<folder name>`. Each member who records meetings keeps a folder with this name.

## Working here

- Code commands (git, tests, linters) run from the directory of the app repo involved; tracker commands run from this repo.
- Before opening a PR in an app repo, assigning work, or writing a meeting note, read `docs/agents/constraints.md`.
- Before assigning work or chasing a `needs-info` ticket, read `docs/agents/team.md`.
````

`local.md`, written only for repos outside their default path:

````markdown
| Repo | Path on this machine |
|---|---|
| <name> | <absolute path> |
````
