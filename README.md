# skills

Agent skills (`SKILL.md` format), usable from any harness that loads skills from a folder.

| Skill | What it does |
|---|---|
| [`explain-simply`](explain-simply/SKILL.md) | Explains a software change at the user's knowledge level: what changed, the engineering decision, and the long-term impact. Keeps a personal calibration profile outside the repository. |
| [`resume-snapshot`](resume-snapshot/SKILL.md) | Rebuilds the work week of a project from its codebase and past agent sessions, and writes a personal snapshot to pick the work up again on Monday. User-invoked. |

## Install

Copy or link a skill folder into your skills directory, for example `~/.agents/skills/` or `~/.claude/skills/`.

`resume-snapshot` needs Python 3 for `scripts/transcript.py`.

## Versions

The whole repository has one version, published as a Git tag and a GitHub Release (`vMAJOR.MINOR.PATCH`). It stays on `0.x` while the skills are still evolving; `v1.0.0` marks a set of skills that are defined and tested. To release: commit and push, then `gh release create vX.Y.Z`.
