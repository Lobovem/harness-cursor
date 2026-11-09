---
name: work-mandates
description: Core workflow for every coding task — read repo docs first, Karpathy surgical changes, use package.json scripts. Use at the start of implementation, refactors, or unfamiliar codebases.
---

# Work mandates

## Discover this repo first

Before refactors or unfamiliar areas:

- `README.md`, `docs/`, repo `AGENTS.md` / `GEMINI.md`
- `.cursor/rules/` in the project if present
- `package.json` scripts (lint, format, typecheck, test)

Do not assume auto-imports, layout, or commands from another project.

## Behavior

- State assumptions; ask if unclear.
- Minimum code; no speculative features or abstractions.
- Surgical diffs — every changed line traces to the request.
- Multi-step work: short plan with verify steps.

## Related skills

- `karpathy-guidelines`, `user-feedback`
- Vue stack → `vue`, `vueuse`, `vue-quasar-web`
- GitLab → `gitlab-pr` / `pr-creator`
- Review → `code-review` + **git-reviewer** — **только** по явному запросу user (`/git-reviewer`, «сделай ревью»); не после каждого coder

## After changes

Run this repository’s format/lint/typecheck on touched files.
