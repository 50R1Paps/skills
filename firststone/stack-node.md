# Stack: Node / TypeScript

Recognised by `package.json`. A new repo with no `package.json` yet counts as an unknown stack: there is no script to run.

## Check commands

The `lint`, `typecheck` and `test` scripts of `package.json`, in that order, each only if it exists. A missing `lint` or `test`, or a missing `typecheck` in a repo with a `tsconfig.json`, is an open step ("add a `<name>` script, then rerun `/firststone`"), never a script you invent.

Package manager and install command come from the lockfile: `npm ci`, `pnpm install --frozen-lockfile`, `yarn install --immutable`, `bun install --frozen-lockfile`.

## Hooks

`husky`: `.husky/pre-commit` runs `lint` (and `typecheck` when fast), `.husky/pre-push` runs `test`. Each file holds the bare command, one per line.

Husky needs a dev dependency and a `prepare` script, both edits to `package.json`. In a repo the team owns, make them with the package manager so the lockfile changes with `package.json` and the CI install still works: `npm install --save-dev husky` (`pnpm add -D`, `yarn add -D`, `bun add -d`), then `npm pkg set scripts.prepare=husky`. Commit both files. In a client's existing repo `package.json` and the lockfile stay untouched and hook files without husky do nothing: write no hook, and make "adopt husky" one open step naming the two edits and the two hook files.

## CI setup

GitHub: `actions/setup-node` with the version from `.nvmrc` or `engines`, with the package manager's cache. GitLab: the matching `node:<version>` image.
