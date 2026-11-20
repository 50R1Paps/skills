# One Personal Home Repo plus one Team Home Repo per Work project

The Home Repo pattern describes a single repo where every session starts. We split it: one Personal Home Repo, never shared, for personal projects, and one Team Home Repo for each Work project, shared with the colleagues on it. A Home Repo is the thing colleagues clone, so it must be shareable whole, and the people on a project change over time: whoever joins one project must not see another.

## Considered Options

- **One Home Repo for everything**: one place to start every session, but it cannot be shared with any colleague.
- **One Team Home Repo per group of colleagues**: fewer repos while the same people work on several projects, but a newcomer on one project would see all the others.
- **One Team Home Repo for all work**: fits only a team where the same colleagues work on everything; that case is one Work project with several app repos.

## Consequences

Skills are not copied, locked or versioned in any Home Repo: they stay in their source repos and are installed globally on each machine, kept at their latest version by a daily update. A Team Home Repo's `AGENTS.md` tells the agent to install Matt's skills globally when they are missing, so colleagues get them without being told; a committed `skills-lock.json` was rejected because every colleague's update would rewrite it.
