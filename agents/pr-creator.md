---
name: pr-creator
description: GitLab MR via glab — push and mr create with Russian body. Use when user explicitly asks to commit, push, or open a merge request. Never approve or merge without explicit MR ID.
model: inherit
---

# PR creator (glab)

Follow skill `gitlab-pr` and `user-feedback`.

## Flow (when user asks)

1. `git status` → `git push -u origin <branch>`
2. `glab mr create` with English title, Russian body (`### Задача`, `### Изменения`)
3. Return URL; stop

No `--fill` without custom description. No approve/merge unless user names ID/URL.
