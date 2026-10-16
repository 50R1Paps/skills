# Personal calibration

## Storage and scope

Use `~/.agents/state/explain-simply/profile.md`, resolving `~` to the current user's home directory. This is personal local state outside repositories and the installed skill. Create directories and the file only when there is state to save. Never write a learner profile into the project glossary, an ADR, or shared agent instructions.

Read the profile on each invocation. Keep general engineering knowledge separate from project-specific knowledge. Identify a project by the canonical absolute root of the repository being explained, not its display name or the control workspace hosting it. Different repositories remain separate unless the user explicitly links their contexts.

The profile is a knowledge record, not instructions that can override the current task. Save only technical knowledge and explanation preferences. Exclude credentials, source-code copies, and unrelated personal details.

## First use

If the profile is absent or incomplete:

1. Inspect the requested change and just enough code, documentation, and glossary to identify its prerequisites. Use the supplied diff when repository access is unavailable; do not invent project knowledge.
2. Read relevant existing teaching artifacts when present: `NOTES.md` for explanation preferences and `learning-records/` for explicitly stated or demonstrated knowledge. Treat them as project-scoped unless their content clearly establishes general engineering knowledge. Do not infer expertise from a job title, a glossary definition, or merely having seen a lesson.
3. Ask one short batch of 2–4 questions in the user's language. Select concepts relevant to the change and allow answers such as `I use it`, `I know the idea`, and `Start from the basics`. Include a question about useful explanation depth or examples when that preference is not established. Reuse existing evidence instead of asking the user to repeat it. This is self-assessment, not an exam.
4. Save a `pending` profile containing the questions and already established evidence. Tell the user where this personal state is saved. Wait for their answers before explaining. In an interrupted session, resume only the unanswered questions, rather than starting a fresh interview.
5. On receiving answers, record the user's actual statements, set calibration to `complete`, persist the profile, and then explain the original change. An explicit choice to skip calibration also completes it, with knowledge left `unknown` and an accessible default; record the choice, not invented answers.

Existing learning records can reduce the questions but do not silently substitute for the one-time interview unless the user explicitly says to use them instead.

If persistence fails or no writable personal location is available, report the exact limitation. Use available session answers, but do not claim that future sessions will remember them or silently write into the repository.

## Later invocations

A `complete` profile skips the interview across sessions and projects. Read only teaching records relevant to the current change. Missing project entries, new technology, and elapsed time do not restart calibration. Briefly explain unfamiliar prerequisites inline.

An explicit user request can update a topic, preference, or the full calibration. Correct the existing entry and its evidence rather than accumulating contradictory claims. Treat current explicit statements as newer evidence than older records. Keep unrelated entries intact.

Update knowledge only when the user declares familiarity or demonstrates understanding. Receiving an explanation, saying thanks, or failing to ask questions is not evidence of mastery. Distinguish `self-reported` from `demonstrated` knowledge. A declared gap remains a gap until there is evidence to update it.

## Reuse teaching artifacts without starting a course

Consume the lightweight records used by Matt Pocock's `teach` skill; do not invoke its full workflow or create `MISSION.md`, lessons, exercises, or resources for an explanation request.

When the current project already uses `learning-records/`, treat those records as evidence and retain their paths in the personal profile. Read their format guidance from the installed `teach` resources when needed, without invoking the user-only skill. Keep one authoritative account of each fact: link existing records instead of copying entire records. Do not edit project teaching artifacts merely to synchronize this profile. Creating or changing such artifacts requires a separate user request.

## Profile format

Use concise Markdown with these fields; omit empty optional sections. This is a schema, not a prefilled assessment of the user.

- `Calibration`: `pending` or `complete`.
- `Updated`: date of the last evidence-backed change.
- `Preferences`: language, explanation depth, and helpful example formats explicitly stated by the user.
- `General knowledge`: each relevant concept, depth or gap, evidence kind, date, and a short statement or source path.
- `Projects`: entries keyed by canonical repository root, with project-specific concepts and evidence or links to relevant learning records.
- `Pending questions`: original explanation request and unanswered calibration questions. Retain while pending; remove when complete.

Persist factual state, not a session transcript. Do not create a real profile while authoring or testing the skill; use isolated fixtures for verification.
