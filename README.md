# skills

Agent skills (`SKILL.md` format), usable from any harness that loads skills from a folder.

| Skill | What it does |
|---|---|
| [`debrief`](debrief/SKILL.md) | Turns the meetings recorded in a Home Repo's Granola folder into Meeting notes, with who asked for each thing and who to notify, plus the tickets, glossary entries and ADRs they imply; then hands an anonymized copy to the second brain. User-invoked. |
| [`explain-simply`](explain-simply/SKILL.md) | Explains a software change at the user's knowledge level: what changed, the engineering decision, and the long-term impact. Keeps a personal calibration profile outside the repository. |
| [`firststone`](firststone/SKILL.md) | Sets up Home Repos: the Personal Home Repo with its machine setup script, a Team Home Repo for each work project, and the pointers to their app repos. Writes nothing inside app repos. User-invoked. |
| [`resume-snapshot`](resume-snapshot/SKILL.md) | Rebuilds the work week of a project from its codebase and past agent sessions, and writes a personal snapshot to pick the work up again on Monday. User-invoked. |

## Install

With the [`skills`](https://www.npmjs.com/package/skills) CLI:

- list the skills: `npx skills add 50R1Paps/skills --list`
- install one for your user: `npx skills add 50R1Paps/skills --skill <name> -g`
- update the installed ones to `main`: `npx skills update -g`

Or copy a skill folder into your skills directory, for example `~/.agents/skills/` or `~/.claude/skills/`.

`resume-snapshot` needs Python 3 for `scripts/transcript.py`.

## Versions

The whole repository has one version, published as a Git tag and a GitHub Release (`vMAJOR.MINOR.PATCH`). It stays on `0.x` while the skills are still evolving; `v1.0.0` marks a set of skills that are defined and tested. To release: commit and push, then `gh release create vX.Y.Z`.

## Pull requests

A pull request from the owner merges by itself (squash) once the `classify` check is green. The check never runs code from the pull request: it reads the diff with the rules in `.github/scripts/classify.sh`, as they are on `main`.

A delicate pull request gets the `needs-review` label and a comment with the reasons, and waits for a manual merge. It is delicate when it:

- changes `.github/`;
- adds or changes executable code (`scripts/`, `.py`, `.sh`, `.js`, `.ts`, `.ps1`) or makes a file executable;
- adds, removes or renames a skill, or changes the frontmatter of a `SKILL.md`;
- adds a term from the private list (secret `PRIVATE_TERMS`);
- comes from a fork or from anyone other than the owner.

An invalid pull request (a `SKILL.md` without `name` matching its folder or without `description`, or a JSON file that does not parse) fails the check.
