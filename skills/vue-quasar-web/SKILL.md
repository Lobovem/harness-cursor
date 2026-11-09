---
name: vue-quasar-web
description: Generic Vue 3, Quasar, and Pinia conventions for web apps. Use when editing Vue, TypeScript, or SCSS unless the repo documents different rules.
paths:
  - "**/*.vue"
  - "**/*.ts"
  - "**/*.scss"
---

# Vue / Quasar (web)

Repo docs override this skill.

## Before coding

- Confirm auto-import and import rules in project onboarding or `.cursor/rules`.
- Match naming and folder layout of neighboring files.

## Defaults (if docs are silent)

- `<script setup lang="ts">`, strict props/emits.
- Pinia + composables; Quasar components consistent with the repo.
- Scoped SCSS in components unless the repo differs.
- No `any`; check VueUse and Quasar before custom helpers.

## Verify

Use this repo’s typecheck/lint commands from `package.json`.
