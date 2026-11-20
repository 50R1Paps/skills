# Template: `AGENTS.md` and `work-clones.md` of the Personal Home Repo

Pointers only: every line of `AGENTS.md` loads in every session. One line per personal repo, in the Home Repo pattern's format. A project with its own Granola folder names it in its hint. The tracker is named later by the `/setup-matt-pocock-skills` block.

````markdown
# Home

Personal Home Repo: pointers to every personal project. Start every personal agent session here. Each project keeps its own tracker, glossary and ADRs in its repo; this repo holds only what spans them all.

## Repositories

<name> (<what it is, in a few words>): `~/code/personal/<name>`. Clone from <url> if missing.
<name> (<what it is>): `~/code/personal/<name>`. Clone from <url> if missing. Granola folder: `<folder name>`.

A repo kept elsewhere on this machine is listed in `local.md` (untracked); that path wins over the one above. A repo found in neither place: clone it to the path above, or ask where it is and record the answer in `local.md`.
````

`local.md`, written only for repos outside their default path:

````markdown
| Repo | Path on this machine |
|---|---|
| <name> | <absolute path> |
````

`work-clones.md`, created with the first Team Home Repo and read only by `setup.mjs`, never by a session:

````markdown
# Work clones

Team Home Repos to offer when setting up a machine. Read by `setup.mjs` only.

| Team Home Repo | Clone from |
|---|---|
| <client>/<project> | <url> |
````
