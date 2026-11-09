---
name: code-review
description: Review playbook for git-reviewer — internal uncommitted diff (REVIEW_REPORT) and external GitLab MR audit. MR thread fixes are done by coders (see MR thread fix section). Use when reviewing code or MRs.
---

# Code review

Read `user-feedback` skill first.

## Режимы (один субагент `git-reviewer`)

| Режим              | Когда                      | Команда / prompt                                      |
| ------------------ | -------------------------- | ----------------------------------------------------- |
| **internal**       | Локальный diff — **только** по явному запросу | `/git-reviewer`, «сделай ревью», Task git-reviewer: «internal, uncommitted diff» |
| **mr-audit**       | Ревью чужого MR в GitLab (явный режим)        | Task git-reviewer: «mr-audit MR !N» / `/git-reviewer`                            |
| **mr-fix-threads** | Пофиксить открытые треды (явный режим)        | **\*-coder**, не reviewer (см. ниже)                                             |

Reviewer **readonly** — не правит файлы репозитория.

---

## Internal (uncommitted diff)

**Кто вызывает reviewer** — см. `user-feedback` → **Lead-manager / review**. Default после coder: **без** review. Цикл coder↔reviewer до **STATUS: APPROVED** — **не** обязательный default.

### Direct coder (L1)

После implement → **STATUS: IMPLEMENT_DONE** / готово. **Не** авто-Task `git-reviewer`. **Запрещено** self-**STATUS: APPROVED**.

Task `git-reviewer` — только если user явно просил ревью (`/git-reviewer`, «сделай ревью», Task git-reviewer). Тогда на **REVIEW_REPORT** — fix → снова reviewer по запросу / до **STATUS: APPROVED**, если user держит цикл.

### Lead path (L2 coder)

Coder только **IMPLEMENT_DONE**. Lead **не** стартует reviewer после каждого coder. Цикл lead → git-reviewer → coder — **только** при явном запросе ревью (`lead-manager.md`).

### git-reviewer checklist (internal)

1. Run repo lint/format/typecheck from `package.json`.
2. Every planned change present in the diff.
3. Match **this repo’s** conventions (README, docs, `.cursor/rules`).
4. Karpathy: surgical, minimal scope.
5. **REVIEW_REPORT** (пункты **на русском**, path + строка) or **STATUS: APPROVED**.
6. Summary — **русский** (`user-feedback` → Subagents).

**Без** `glab` в режиме internal.

---

## External MR audit (git-reviewer, mr-audit)

1. `git fetch origin`
2. `glab mr view <ID>` — ветка, URL
3. `glab mr diff <ID>` — scope = diff only
4. Отчёт на русском, нумерация, **только строки из diff**:

**Критические:** [№] - **[path]** | **Строка [N]**: …

**Стиль:** [№] - **[path]** | **Строка [N]**: …

**Предложения:** [№] - **[path]**: …

5. По запросу — inline: `glab mr note create <ID> --file … --line … -m "…"`

Reviewer **не** фиксит код и **не** resolve треды в этом режиме (только audit + комменты).

---

## MR thread fix (\*-coder, не git-reviewer)

Задача: «пофикси треды MR !N» → **html-coder** / **vue-coder** / …

### Источник правды

1. `git fetch origin`
2. `glab mr view <ID>` — checkout/pull **source branch** MR при необходимости
3. `glab mr note list <ID> -F json` — **все** discussions, **все** notes (replies)

Не опираться на текст ревью из чата. Тред **удалён** в GitLab → skip.

### Skip (не править, не resolve)

**Сначала** прочитать **каждый** `notes[]` в discussion (не только первый DiffNote). Reply автора/ревьюера важнее исходного замечания.

- Discussion **`resolved: true`** — уже закрыт, skip
- Тред **удалён** в GitLab — skip
- **Любой reply** с отказом от правки (waiver) → **skip целиком** для этого discussion:
  - «не надо фиксить», «не трогать», «не править», «можно не фиксить»
  - «оставил так», «оставляем так», «оставить как есть», «так и надо», «так задумано»
  - «**Ссылки не трогаем**», «**пока так и оставляем**» (и аналоги про URL/href/storeUrl)
  - «wontfix», «as is», «lgtm» (RU/EN, регистр не важен)
- **`resolvable: false`**, только инфо (squash, CI) — skip без явной просьбы менять код

**Запрещено** при waiver: менять код «по смыслу первого коммента», **`glab mr note resolve`** для этого треда. В отчёте: **skip | waiver: «…»**.

Если в треде несколько тем (например blurb + ссылка), а waiver только про часть — **не трогать** то, что пользователь исключил; остальное — только если в reply **явно** попросили исправить.

### Fix + resolve

- **`resolved: false`**, diff-note, **нет** waiver-reply → surgical fix **строго** по первому review-note (не расширять scope)
- **`glab mr note resolve 9 <prefix>`** — **только** после реального fix в коде для **этого** треда
- Copy/тексты: `git show origin/<source_branch>:<path>` — **не выдумывать**

### Отчёт coder (русский)

Таблица: discussion prefix | fix / skip / resolved | файл | причина skip.

После MR thread fix — internal review (**Task git-reviewer internal**) **только** если user явно попросил ревью.
