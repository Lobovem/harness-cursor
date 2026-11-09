# Global Cursor context (user machine)

Aligned with [Cursor docs](https://cursor.com/docs/context/subagents): subagents, [skills](https://cursor.com/docs/context/skills), [rules](https://cursor.com/docs/context/rules).

This file is a **human index** only. Cursor does not load `~/AGENTS.md` globally — use paths below.

## User Rules (always on)

**Customize → Rules → User Rules** in the IDE.

Paste from `USER-RULES-PASTE.md`. User rules are not stored as `~/.cursor/rules/*.mdc`.

## Shell policy (git / glab)

| What                          | Path                                                                    |
| ----------------------------- | ----------------------------------------------------------------------- |
| Source (TOML, from verbatica) | `policies/agent-rules.toml` (linked → `~/.cursor/policies`)             |
| Enforcement (primary)         | `home/hooks.json` → `~/.cursor/hooks.json` → `hooks/git-glab-policy.mjs` |
| Auto-review (secondary)       | `home/permissions.json` → `~/.cursor/permissions.json`                  |

`beforeShellExecution`: **ask** on `git add|commit|push` and `glab mr create|merge|approve|note`; everything else **allow**. Reload Cursor after editing hooks. Debug: **Hooks** output channel.

## Subagents

Path: `%USERPROFILE%\.cursor\agents\*.md`  
Docs: [Subagents](https://cursor.com/docs/context/subagents)

| File                    | Invoke                                          |
| ----------------------- | ----------------------------------------------- |
| `lead-manager.md`       | `/lead-manager` or natural language             |
| `html-coder.md`         | `/html-coder` (static HTML/SCSS/JS)             |
| `vue-coder.md`          | `/vue-coder` (Vue/Quasar)                       |
| `react-coder.md`        | `/react-coder` (React web)                      |
| `react-native-coder.md` | `/react-native-coder` (RN/Expo)                 |
| `code-reviewer.md`      | `/git-reviewer` (readonly; не auto после coder) |
| `pr-creator.md`         | `/pr-creator`                                   |
| `system-architect.md`   | `/system-architect` (readonly)                  |

Frontmatter: `name`, `description`, `model: inherit`, optional `readonly`, `is_background`.

Only **top-level** `.md` files in `agents/` — no nested reference markdown with `---` pairs.

## Commands

Path: `%USERPROFILE%\.cursor\commands\*.md` — **intentionally empty**.

Roles live in **subagents** (`/html-coder`, `/lead-manager`). Playbooks live in **skills**. A command is only a reusable prompt pasted into the **current** chat (no isolated context, no extra tools). Cursor built-ins (`/create-skill`, …) still appear in `/`.

## Skills

Paths (both work):

- `%USERPROFILE%\.cursor\skills\<folder>/SKILL.md`
- `%USERPROFILE%\.agents\skills\` (junction → `.cursor\skills`)

`name` in frontmatter **must match** the parent folder name. Use `paths` for file-scoped skills (not legacy `globs`).

View in **Customize → Skills**. Cloud: **Settings → Agents → Sync Skills for Cloud Agents**.

| Skill                                             | Notes                       |
| ------------------------------------------------- | --------------------------- |
| `work-mandates`                                   | Start of coding tasks       |
| `user-feedback`                                   | Hard preferences            |
| `karpathy-guidelines`                             | Behavior                    |
| `vue`, `vueuse`, `vue-quasar-web`                 | Frontend                    |
| `code-review`, `gitlab-pr`                        | Workflows                   |
| `skill-brand-architect`, `skill-capacitor-mobile` | When repo has brands/native |
| `find-skills`                                     | `npx skills find`           |

Built-in Cursor skills live in `skills-cursor/` — do not edit.

## Project-only (per repo)

| Type              | Path                                                         |
| ----------------- | ------------------------------------------------------------ |
| Project rules     | `<repo>/.cursor/rules/*.mdc`                                 |
| Project skills    | `<repo>/.cursor/skills/` or `.agents/skills/`                |
| Project subagents | `<repo>/.cursor/agents/` (override same name in user agents) |
| AGENTS.md         | `<repo>/AGENTS.md` or nested dirs                            |

## Subagents vs skills vs commands (docs)

- **Subagent** — separate context, parallel work, multi-step role (`lead-manager`, `git-reviewer`).
- **Skill** — instructions loaded into current agent (`gitlab-pr`, `vue`).
- **Command** — slash prompt in the current chat. Not used here.

Do not duplicate: one-shot playbook → skill; isolated role → subagent.
