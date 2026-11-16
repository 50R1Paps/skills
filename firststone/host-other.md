# Host: other

Any host that is neither GitHub nor GitLab: Bitbucket, Azure DevOps, a self-hosted forge. One behaviour for all of them.

## App repo

Do what is plain Git: clone, branch `firststone/setup`, commit, push the branch. Write `CONTRIBUTING.md` and, when the stack file allows, the hooks: they run on the developer's machine, whatever the host.

Everything the host owns is an open step:

- creating the repo (blocking: wait for the URL);
- opening the pull request for `firststone/setup`, with the title and body to paste;
- protecting `main`;
- configuring CI. Write no CI file: the host's CI system is unknown and an untested pipeline is worse than a checklist line.

Write each open step from the two lines the user gave in the interview. Where they do not cover a step, name what has to be achieved and ask the user where it is done.

Write those two lines under the repo's name in the "Repo notes" section of `docs/agents/workflow.md` in the home repo, so later sessions know how pull requests are opened there.

## Home repo

Only when the client forbids keeping project material elsewhere. Push with plain Git once the user has created the remote. The tracker is then "Other": see step 5 of `SKILL.md`. Add the open step "restrict access to the home repo to the team": on the client's infrastructure it is not private by default.
