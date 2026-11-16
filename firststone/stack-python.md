# Stack: Python

Recognised by `pyproject.toml`, `setup.py` or `requirements*.txt`, or declared by the user for a new repo.

## Check commands

In order: `ruff check .`, `ruff format --check .`, `pytest`.

- Take the install command from the repo: `uv sync`, `poetry install` or `pip install -r …`, whichever its files call for. A new repo with no dependency file installs with `pip`: `ruff` in CI, `ruff` and `pre-commit` in `CONTRIBUTING.md`.
- Include `pytest` only when the repo has tests. With none collected it exits 5 and turns every run red; add the open step "add `pytest` to hooks and CI with the first test".
- When the repo already configures another linter or formatter, that is an overlap: keep its commands and report it.

## Hooks

`.pre-commit-config.yaml`, using the `pre-commit` framework:

- on commit: the `ruff-check` and `ruff-format` hooks from `astral-sh/ruff-pre-commit`;
- on push: a `local` hook running `pytest`, with `stages: [pre-push]`, under the same condition as above.

Pin `rev` to the latest release tag, looked up rather than recalled: `pre-commit autoupdate`, or `git ls-remote --tags --sort=-v:refname https://github.com/astral-sh/ruff-pre-commit`. A config with a placeholder `rev` breaks every commit: when the tag cannot be resolved, write no config and make the hooks an open step.

Each developer activates the hooks once with `pre-commit install`, adding `--hook-type pre-push` once the pytest hook exists; put that command in `CONTRIBUTING.md`.

## CI setup

GitHub: `actions/setup-python` with the version from `pyproject.toml` or `.python-version`. GitLab: the matching `python:<version>` image. A new repo declares no version: ask the user and write it to `.python-version`.
