# Template: `AGENTS.md` of the home repo

Pointers only: every line here loads in every session. Rules and process belong in `docs/agents/workflow.md`. Fill the placeholders and translate into the project docs language. One line per app repo, in the Home Repo pattern's format; add a hint only where the repo needs one. The tracker is named later by the setup skill's own block.

````markdown
# <Project> (<Client>)

Home repo of <Project>: tracker, glossary, decisions, coding standards and workflow. Start every agent session here.

## App repositories

<name> (<what it is, in a few words>): `~/repos/<client>/<name>`. Clone from <url> if missing.
<name> (<what it is>): `~/repos/<client>/<name>`. Clone from <url> if missing. <hint, e.g. "Read its CONTRIBUTING.md before changing it.">

A repo kept elsewhere on this machine is listed in `repos.local.md` (untracked); that path wins over the one above. A repo found in neither place: clone it to the path above, or ask where it is and record the answer in `repos.local.md`.

## Working here

- Code commands (git, tests, linters) run from the directory of the app repo involved; tracker commands run from this repo.
- Before taking a ticket, opening a PR, running a retro or writing a meeting update, read `docs/agents/workflow.md`.
- Before assigning work or chasing a `needs-info` ticket, read `docs/agents/team.md`.
````

`repos.local.md`, written only for repos outside their default path:

````markdown
| Repo | Path on this machine |
|---|---|
| <name> | <absolute path> |
````
