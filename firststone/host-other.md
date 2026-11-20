# Host: other

Any host that is neither GitHub nor GitLab: Bitbucket, Azure DevOps, a self-hosted forge. One behaviour for all of them: plain Git only, and everything the host owns is an open step.

## App repo

Its pointer needs only its URL. Creating it (blocking: wait for the URL) and protecting its `main` are open steps. Ask the user how pull requests are opened there and where CI runs, and write the answer under "Client rules" in `docs/agents/constraints.md`. Where that does not cover a step, name what has to be achieved and ask the user where it is done.

## Team Home Repo

Only when the client forbids keeping project material elsewhere. Push with plain Git once the user has created the remote. The tracker is then "Other": see step 4 of `SKILL.md`. Add the open step "restrict access to the Team Home Repo to the team": on the client's infrastructure it is not private by default.
