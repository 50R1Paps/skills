# Host: GitLab

Uses the `glab` CLI, on `gitlab.com` or a self-hosted instance (`<host>` below). `glab auth status` tells whether it is usable; a command refused for permissions becomes an open step with the link below.

| Operation | Command | Link for the open step |
|---|---|---|
| Create the home repo | `glab repo create <group>/<name> --private`, then add the remote and push | `https://<host>/projects/new` |
| Create a new app repo | `glab repo create <group>/<name> --private --readme`, then clone | `https://<host>/projects/new` |
| Create the `retro` label | `glab label create --name retro --description "Retro note"` | `https://<host>/<group>/<repo>/-/labels` |
| Open the merge request | `glab mr create --source-branch firststone/setup --target-branch main --title "…" --description "…"` | `https://<host>/<group>/<repo>/-/merge_requests/new?merge_request[source_branch]=firststone/setup` |
| Protect `main` | `glab api` on `projects/<id>/protected_branches` | `https://<host>/<group>/<repo>/-/settings/repository` → Protected branches |
| Create the setup issue | `glab issue create --title "…" --description "…" --assignee <username>` | |

- A new app repo needs `--readme`: a merge request needs a `main` with one commit to target.
- GitLab protects the default branch at creation, with direct push allowed to maintainers. To require merge requests, set "Allowed to push" to no one (`push_access_level=0`) and keep "Allowed to merge" on developers and maintainers. Replacing an existing rule through the API means deleting it and creating it again.
- Required approvals are a paid feature and default to zero, which is the target: leave them alone.
- Flags differ between `glab` versions; when a command is rejected, read its `--help` before turning it into an open step.
- Write the merge request description with the `pr` skill.

## CI

`.gitlab-ci.yml`: one job using the stack's official image, with `rules` for merge request events and for the default branch, running the stack file's check commands in order.
