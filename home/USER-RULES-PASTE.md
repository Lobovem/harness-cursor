# User Rules (required for “always apply”)

Per [Cursor Rules docs](https://cursor.com/docs/context/rules), **User Rules** live in **Customize → Rules** (not on disk as `.mdc`).

Copy the block below into **Customize → Rules → User Rules** once. Reload Agent chat after saving.

---

Karpathy: state assumptions; ask if unclear. Minimum code; no speculative scope. Surgical diffs only. Multi-step tasks: brief plan + verify steps.

Before coding: read this repo’s README, docs, and `package.json` scripts. Do not assume conventions from other projects.

Prefer npm unless the repo uses yarn/pnpm (lockfile). No `any`. Vue/Quasar repos: check VueUse and Quasar before custom helpers.

PR/MR reviews in Russian with line numbers. MR comments only on diff lines.

git commit, push, glab mr create/merge/approve/note — only when I ask; glab approve/merge — only with explicit MR ID/URL.

Hard gate (all repos): `%USERPROFILE%\.cursor\hooks.json` asks before mutating git/glab shell commands (see `policies/agent-rules.toml`).

Global skills and subagents: `~/.cursor/skills/`, `~/.cursor/agents/`. Index: `~/.cursor/AGENTS.md`.
