# Template: `docs/agents/workflow.md` of the home repo

Fill the placeholders and translate into the project docs language. Keep "Repo notes" only for app repos that depart from the rest of the file: a host other than GitHub or GitLab, or a client review rule that replaces the one above. With an "Other" tracker, word the retro note as that tracker expresses it (a ticket type, a label, a component) instead of "issue labelled `retro`". When the home repo sits on the client's infrastructure, the client's administrators can read it whatever its permissions: replace the body of "Meeting updates" with "Meeting notes stay out of this repo. Record each decision that matters as a ticket or an ADR."

````markdown
# Workflow

## Ticket path

1. Take a `ready-for-agent` ticket assigned to you. One assignee per ticket.
2. Comment on the ticket with the files you expect to touch ("Expected files").
3. Run `/implement` in a worktree; it drives `/tdd` and `/code-review`.
4. Run the app repo's local checks. Hooks pass before the push.
5. Open the PR with the `pr` skill.
6. Review, as described below.
7. Merge, verify the behaviour on `main`, close the ticket with a comment logging what was verified.
8. Run `/retro`, then file the retro note.

`/clear` between tickets. For a spec with many independent tickets, `/implement-spec`.

## Across repos

- The tracker lives here; the code lives in the app repos. Commits and PR text in an app repo describe the change on its own terms, without ticket references: a bare `#12` there points at that repo's own numbering, and the client reads that history.
- Link from this side instead: comment on the ticket with each PR's URL.
- For `/code-review`, pass the ticket as the spec, and review against `CODING_STANDARDS.md` in this repo plus the app repo's `CONTRIBUTING.md`.
- `CODING_STANDARDS.md` lives at this repo's root and is created with its first rule.
- A ticket that touches several app repos gets one branch and one PR per repo. It closes when all of them are merged.

## Worktrees

One worktree per ticket, beside the clone: `<repo>-worktrees/<ticket-number>-<slug>/`. Create it when the ticket starts, remove it after the merge. The main clone stays on a clean `main`.

## Pull requests and review

- The `pr` skill writes the body. Add a section "Expected files / touched files" comparing the forecast on the ticket with the diff.
- Request review from the other person. The reviewer asks questions on the diff as review comments; the author answers before merging.
- When speed matters, the author merges without waiting, after `/code-review` and green checks, and leaves one line on the PR starting with "Merged without review:" followed by the reason. The other person may still review afterwards.

## Retro

**After a session.** `/retro` lists its candidates in chat and saves nothing. Open an issue labelled `retro` with them, in two groups:

- mechanical checks (a lint rule, a hook, a CI job): open the PR now;
- judgement rules: they wait for the weekly retro.

Changes to your personal environment stay out of the note.

**Weekly, together.** Sources: the open retro notes, review comments, CI failures, PRs merged without review. Decide the judgement rules and write them to `CODING_STANDARDS.md`, rotate areas in `team.md`, close the notes. Update the committed skills on a branch with `npx skills update -p`, and review their diff in the PR like any other change.

## Meeting updates

One file per meeting, `docs/meetings/YYYY-MM-DD-<topic>.md`, with three sections: Decisions, Actions (each with an owner), Open questions. Same format whether written by hand or from a transcript.

## Repo notes

<Repo>: <how pull requests are opened on its host and where CI runs; the client's review rule, which replaces the one above for this repo>.
````
