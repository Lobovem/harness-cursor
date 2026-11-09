# Not loaded by Cursor

Per [Cursor Rules documentation](https://cursor.com/docs/context/rules):

| Rule type | Location |
|-----------|----------|
| **Project** rules | `<repo>/.cursor/rules/*.mdc` |
| **User** rules | **Customize → Rules** in the IDE (not this folder) |
| **Team** rules | Cursor dashboard (Team/Enterprise) |

Files that used to live here were moved to:

- **Always-on behavior** → paste from `../USER-RULES-PASTE.md` into Customize → Rules
- **On-demand workflows** → `../skills/` (`work-mandates`, `vue-quasar-web`, `code-review`, `gitlab-pr`, …)
- **Roles with context isolation** → `../agents/` (subagents)

Delete obsolete `.mdc` files in this folder if any remain.
