# Template: `CONTRIBUTING.md` of an app repo

Written only when the repo has none. About the code alone, in the language the repo already uses. Fill "Local checks" from the stack file; omit that section when the stack is unknown. When the client has its own review rule, write the client's rule in "Pull requests".

````markdown
# Contributing

## Branches

Work on a branch named `<ticket-number>-<short-slug>`. `main` changes only through pull requests.

## Local checks

Install the tools, then run before pushing:

```
<tool install command>
<check commands>
```

Activate the hooks once after cloning:

```
<hook install command>
```

## Pull requests

- Every change reaches `main` through a pull request with green checks.
- Request review from another team member. The author may merge without waiting when speed matters, stating the reason on the pull request.
````
