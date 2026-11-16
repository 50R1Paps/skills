# Host: GitHub

Uses the `gh` CLI. `gh auth status` tells whether it is usable; a command refused for permissions becomes an open step with the link below.

| Operation | Command | Link for the open step |
|---|---|---|
| Create the home repo from the local folder | `gh repo create <owner>/<name> --private --source . --remote origin --push` | `https://github.com/new` |
| Create a new app repo | `gh repo create <owner>/<name> --private --add-readme --clone` | `https://github.com/new` |
| Create the `retro` label | `gh label create retro --description "Retro note"` | `https://github.com/<owner>/<repo>/labels` |
| Open the PR | `gh pr create --base main --head firststone/setup --title "…" --body-file <file>` | `https://github.com/<owner>/<repo>/compare/main...firststone/setup?expand=1` |
| Protect `main` | `gh api --method PUT repos/<owner>/<repo>/branches/main/protection --input <json>` | `https://github.com/<owner>/<repo>/settings/branches` |
| Create the setup issue | `gh issue create --title "…" --body-file <file> --assignee @me` | |

- Run each command in the folder of the repo it targets, or pass `-R <owner>/<repo>`.
- A new app repo needs `--add-readme`: a PR needs a `main` with one commit to target. `--clone` creates `<name>/` in the current folder, so run it from the parent of the clone path.
- Protection payload: `required_pull_request_reviews.required_approving_review_count` is `0`; `required_status_checks`, `restrictions` are `null`; `enforce_admins` is `false`. Once protection is set, the open step "add the CI job as a required status check" follows: GitHub knows a check only after its first run.
- Branch protection on a private repo needs a paid plan. A 403 here is one open step, worded as a plan limit, that also covers the required status check.
- A PR left as an open step carries its title and its body, as the setup checklist lays them out.

## CI

`.github/workflows/ci.yml`: one job on `ubuntu-latest`, triggered by `pull_request` and by `push` to `main`, running the stack file's check commands in order after checkout and the stack's setup action. Use each action's current major tag, looked up (`gh api repos/<action>/releases/latest`) rather than recalled.
