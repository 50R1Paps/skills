---
name: explain-simply
description: Explain software-engineering changes and design decisions in junior-friendly language, with emphasis on what changed, why that approach was chosen, and its long-term impact. Use for code diffs, pull requests, refactors, architecture changes, or when the user asks "spiegamelo in modo semplice", "cosa è cambiato", "che scelta è stata fatta", "che impatto avrà", or wants to understand a change alongside show-me.
---

# Explain engineering changes

Explain a software change at the user's established level. Make the decision and its consequences understandable without removing technical facts that affect maintenance or future development.

## Establish the evidence

- Reply in the user's language.
- Inspect the actual change before explaining it. Use the available diff, modified files, relevant callers, tests, configuration, and documentation. Use conversation history when the change happened in the current session.
- Read enough surrounding code to distinguish a local implementation detail from a changed interface or system behavior.
- Follow the repository's domain-documentation pointers. Read the relevant glossary and any relevant documented decisions. Preserve canonical domain terms; the glossary defines the domain, not the user's knowledge.
- Treat the diff as evidence of what changed, not automatic evidence of why. State when the rationale is documented. Label a plausible but undocumented rationale as an inference.
- Do not attribute intent to an author when the evidence shows only an effect.

If no change evidence is available, explain the visible design and state that the before-and-after comparison cannot be established.

## Calibrate once, then adapt

Before the first explanation in each invocation, follow [Personal calibration](references/personal-calibration.md). It defines the personal profile location, the first-use interview, persistence, and reuse of teaching artifacts.

Complete the initial interview before explaining the change. On subsequent invocations, use the saved profile without repeating the interview, including when the repository changes. Introduce unfamiliar project concepts briefly rather than treating missing knowledge entries as a reason to restart calibration.

Use familiar concepts as the starting point. Explain stated gaps and necessary new terms; avoid reteaching established knowledge. Keep facts, tradeoffs, and long-term consequences intact regardless of the user's level.

## Explain the decision

1. Lead with the practical conclusion in one or two plain sentences.
2. Describe the before-and-after behavior. Name the relevant files, symbols, interfaces, or data flows.
3. Identify the engineering choice. Explain where complexity moved, what became easier, and what became harder.
4. Trace one concrete request, input, failure, or future modification through the changed path.
5. Separate immediate effects from long-term consequences.

When architecture is involved, reason about modules, interfaces, seams, coupling, depth, and locality. Apply `codebase-design` when it is available. Introduce only the terms needed for this explanation, at the depth established by the personal profile.

## Assess long-term impact

Evaluate only the dimensions the change actually touches:

- Interface and compatibility: what callers must now know, and whether behavior, errors, configuration, or data formats changed.
- Coupling and locality: whether a future change stays in one module or spreads across callers.
- Testability: whether behavior can be verified through the module's interface or now requires knowledge of implementation details.
- Data and migration: whether stored data, events, schemas, rollout order, or rollback changed.
- Operations: effects on failure handling, performance, observability, deployment, and recovery.
- Ownership, reversibility, and future change cost: where the new responsibility lives, which likely extension becomes cheaper or more expensive, and how widely a reversal would spread.

For each important impact, connect the consequence to its mechanism. Distinguish a consequence already created by the change from a risk that appears only under stated conditions. Discuss security or scale only when the change provides evidence that they are relevant.

## Compose with show-me

When the user asks to see the change, requests a diff, or invokes `show-me`, apply that skill when it is available. Prefer the smallest actual diff or structural view that exposes the decision.

Do not repeat the visual in prose. Use the visual for code shape and before-and-after structure. Use prose for the choice, tradeoff, and long-term impact that the visual cannot show. Label a reconstructed or conceptual diff so it cannot be mistaken for repository evidence.

## Shape the answer

Use only the sections the change needs. For a substantial change, the default shape is:

- `In breve`
- `Cosa è cambiato`
- `Scelta ingegneristica`
- `Impatto nel tempo`
- `Rischi o aspetti da verificare`

Omit empty sections. Keep a small change to a few paragraphs. Prefer concrete nouns and verbs. Explain unfamiliar acronyms and technical terms according to the personal profile. Avoid baby talk, motivational filler, speculative alternatives, and implementation history that does not affect the decision.

Before finishing, verify that the answer identifies the change, the decision, and the long-term impact. Scan newly introduced terms against the profile; define unfamiliar terms at first use or replace them with a plain phrase. Mark every unsupported explanation of intent as an inference. Receiving this explanation alone is not evidence of learning.