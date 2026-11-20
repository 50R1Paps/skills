# Host: GitLab

Uses the `glab` CLI, on `gitlab.com` or a self-hosted instance (`<host>` below). `glab auth status --hostname <host>` tells whether it is usable; a command refused for permissions becomes an open step with the link below. Without a host, `glab` falls back to `gitlab.com` outside a clone of the target project: on a self-hosted instance, prefix every `glab` command with `GITLAB_HOST=<host>`.

| Operation | Command | Link for the open step |
|---|---|---|
| Create a Home Repo | `glab repo create <group>/<name> --private`, then add the remote and push | `https://<host>/projects/new` |
| Create a new app repo | `glab repo create <group>/<name> --private --readme` | `https://<host>/projects/new` |
| Protect an app repo's `main` | `glab api` on `projects/<id>/protected_branches` | `https://<host>/<group>/<repo>/-/settings/repository` → Protected branches |
| Create the setup issue | `glab issue create --title "…" --description-file <file> --assignee <username>` | |

- GitLab protects the default branch at creation, with direct push allowed to maintainers. To require merge requests, set "Allowed to push" to no one (`push_access_level=0`) and keep "Allowed to merge" on developers and maintainers. Replacing an existing rule through the API means deleting it and creating it again.
- Required approvals are a paid feature and default to zero, which is the target: leave them alone.
- Flags differ between `glab` versions; when a command is rejected, read its `--help` before turning it into an open step.
