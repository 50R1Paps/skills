# Template: `docs/agents/constraints.md` of a Team Home Repo

What Matt Pocock's skills cannot know about this project: the rules between repos, the client's rules, the meeting-note format. Fill the placeholders and translate into the project docs language. Keep "Client rules" only when the interview gave one; it grows after meetings, as rules are decided.

When the Team Home Repo sits on the client's infrastructure, the client's administrators can read it whatever its permissions: replace the body of "Meeting notes" with "Meeting notes stay out of this repo. Record each decision that matters as a ticket or an ADR."

````markdown
# Constraints

## Across repos

- The tracker lives here; the code lives in the app repos. Commits and PR text in an app repo describe the change on its own terms, without ticket references: a bare `#12` there points at that repo's own numbering, and the client may read that history.
- Link from this side instead: comment on the ticket with each PR's URL.
- A ticket that touches several app repos gets one branch and one PR per repo. It closes when all of them are merged.

## Pull requests

Request review from another member. The author may merge without waiting when speed matters, after `/code-review` and green checks, leaving one line on the PR starting with "Merged without review:" followed by the reason.

## Client rules

<Repo or "All app repos">: <the client's rule, e.g. its review rule, where its PRs are opened, where its CI runs>.

## Meeting notes

One file per meeting, `docs/meetings/YYYY-MM-DD-<topic>.md`, with three sections: Decisions, Actions (each with an owner), Open questions. Each decision also becomes a ticket, a glossary entry, an ADR or a line in this file, confirmed by the person who attended.

Transcripts stay with whoever recorded them, in `docs/meetings/transcripts/` (untracked).
````
