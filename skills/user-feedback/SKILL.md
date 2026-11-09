---
name: user-feedback
description: User preferences and hard rules (npm, no any, RU MR reviews, git safety). Use before any non-trivial task, review, or glab workflow.
---

# User feedback (global)

## Hard rules

- Surgical edits only — no full-file rewrites of established sources unless asked.
- No `any` in types or casts; use explicit types or `unknown`.
- Prefer `npm` unless the repo uses yarn/pnpm (lockfile + docs).

## Style

- Vue projects: check Quasar and VueUse before custom helpers.
- PR/MR reviews: **Russian**, **line numbers** on every point.
- MR comments: only lines in the diff; backlog ≠ MR nitpicks.

## Lead-manager / review

**Reviewer только по явному запросу пользователя:** `/git-reviewer`, «сделай ревью», Task `git-reviewer`, или явный review в формулировке задачи. **Не** запускать `git-reviewer` автоматически после `*-coder`.

- **Direct coder** (`/html-coder`, parent **Task** `*-coder` **без** lead): implement → **STATUS: IMPLEMENT_DONE** (или «готово») + summary. **Не** Task `git-reviewer`. **Запрещено** self-**STATUS: APPROVED**.
- **Lead** (`/lead-manager`): coder → **STATUS: IMPLEMENT_DONE**; lead **не** гоняет reviewer после каждого coder. Review loop (lead → `git-reviewer` → coder по **REVIEW_REPORT**) — **только** если user явно просил ревью. (Nested coder без `Task` — см. [Subagents FAQ](https://cursor.com/docs/subagents).)
- **External MR audit** / «пофикси треды MR» — отдельные явные режимы (`git-reviewer` mr-audit; треды → `*-coder`).
- Lead **не** правит `html` / `js` / `scss` / assets — даже «одна строка».

## Subagents (логи и отчёты)

When acting as a **subagent** (Task, `/html-coder`, `code-reviewer`, etc.):

- **`user_visible_high_level_summary`**, финальный ответ пользователю/оркестратору, статусные блоки, **REVIEW_REPORT**, перечень правок — **на русском**.
- Маркеры вроде **`STATUS: APPROVED`** / **`REVIEW_REPORT`** оставляй как есть (machine-readable).
- Код, пути, идентификаторы, команды shell/git — без перевода.
- Кратко и по делу; не дублируй diff простынёй на английском.

## Git / GitLab

- Commit, push, `glab mr create` — user must ask.
- Approve/merge — explicit ID/URL only.
- **Правки по MR-тредам:** **\*-coder** + skill `code-review` → MR thread fix. **Все replies** в JSON; waiver («Ссылки не трогаем», …) → **не править и не resolve** этот тред.
