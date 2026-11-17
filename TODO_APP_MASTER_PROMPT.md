# Todo App — Master AI Agent Prompt (Simple Local App)

Use this file when you want an AI coding agent to start implementing the simple Todo App.

---

## MASTER PROMPT

You are a senior mobile engineer.

You must build the Todo App according to:

- `TODO_APP_PROJECT.md`

Read the file completely before writing code.

### Technology

Mobile only:

- React Native
- Expo
- TypeScript
- Expo Router
- Zustand (or local React state) for todos
- AsyncStorage for persistence
- React Hook Form where useful
- Zod where useful

### Absolute Restrictions

Do NOT use:

- Django
- Django REST Framework
- PostgreSQL
- any backend / REST API
- login / register / logout
- Flutter
- Dart
- hard-coded secrets (none needed)

### Required Architecture

```text
Screen
↓
Task hooks / store
↓
Local persistence (AsyncStorage)
```

No network API layer.

---

# EXECUTION RULE

Do not build everything in one blind step.

Execute these phases sequentially:

```text
PHASE 0
Repository inspection

PHASE 1
Repository foundation

PHASE 2
Mobile bootstrap

PHASE 3
Local Todo store + CRUD

PHASE 4
Task UI

PHASE 5
UX polish

PHASE 6
Testing & quality

PHASE 7
Documentation

PHASE 8
Final review
```

After each phase:

1. validate;
2. fix errors;
3. summarize;
4. continue only when stable.

---

# PHASE 0

Inspect repository and create:

```text
PROJECT_PLAN.md
```

---

# PHASE 1

Create:

```text
apps/mobile
docs
README.md
.gitignore
```

---

# PHASE 2

Initialize Expo app with:

- TypeScript
- Expo Router
- theme
- placeholder screens: list / create / edit

Validate: app starts and navigation works.

---

# PHASE 3

Implement local CRUD:

```text
create
read / list
update
toggle complete
delete
```

Persist with AsyncStorage.

---

# PHASE 4

Build UI:

```text
Task List
Create Task
Edit Task
Filter (All / Active / Completed)
Optional search
Empty state
Delete confirmation
```

---

# PHASE 5

Polish UX:

- keyboard
- safe areas
- validation
- loading / disabled states
- accessibility basics
- consistent theme

---

# PHASE 6

Run quality checks:

- TypeScript
- ESLint
- basic tests if practical

Critical flows:

```text
Create
List
Edit
Complete
Filter
Delete
Reload → data remains
```

---

# PHASE 7

Update docs:

```text
README.md
docs/development.md
```

---

# PHASE 8

Final review: no backend, no auth, CRUD works, persistence works.

Then provide a short implementation report.

---

# FINAL REPORT FORMAT

```text
# Todo App Implementation Report

## Status
Complete / Partial / Blocked

## Architecture
...

## Mobile
...

## Persistence
...

## CRUD
...

## Testing
...

## Files Created
...

## Known Issues
...

## Recommended Next Steps
...
```
