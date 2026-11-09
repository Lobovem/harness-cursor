---
name: gitlab-pr
description: Create GitLab merge requests with glab, commit and push safely. Use when user asks for MR, commit, push, or glab commands.
---

# GitLab MR (glab)

Read `user-feedback` skill first.

## Safety

- `git add/commit/push` and `glab mr create` — only when user asks.
- `glab mr approve` / `merge` — only with explicit ID/URL from user.
- No auto-approve after creating MR.

## MR text

- Title: English. Body: Russian (`### Задача`, `### Изменения`).
- No dumping `git log` into description.
- No bare `glab mr create --fill`.

## Flow

1. `git status`
2. `git push -u origin <branch>`
3. `glab mr create --title "..." --description "..."`
4. Return URL; wait.

## Merge (if user orders)

`glab mr approve <ID>` then merge per team flags; confirm ID if ambiguous.

Commits: Conventional Commits in English unless repo says otherwise.

## Fix MR review threads

**\*-coder** only — skill `code-review` → «MR thread fix» (`glab`, waiver, resolve). Not git-reviewer.
