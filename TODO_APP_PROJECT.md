# Todo App — Simple Local Project Specification

**Document:** TODO_APP_PROJECT.md  
**Version:** 2.0  
**Status:** Implementation-ready specification  
**Purpose:** Build a simple Todo app with local CRUD only — no backend, no login.

---

# 1. Agent Instruction — Read This First

You are the primary software engineer for this project.

Before writing code:

1. Read this entire document.
2. Inspect the current repository.
3. Do not overwrite existing work without understanding it.
4. Follow the technology decisions in this document.
5. Work in small, verifiable steps.
6. Do not add dependencies unless there is a clear requirement.

The final result must be a working simple Todo application with local CRUD.

---

# 2. Product Goal

Build a simple Todo application with:

- task creation;
- task reading / listing;
- task editing;
- task completion toggle;
- task deletion;
- basic filtering (All / Active / Completed);
- optional local search;
- loading / empty states;
- local persistence (device storage only).

No backend. No login. No logout. No API. No database server.

---

# 3. Technology Stack

## Mobile

Use:

- React Native
- Expo
- TypeScript
- Expo Router
- Zustand or local React state for todos
- AsyncStorage (or Expo SecureStore only if needed) for local persistence
- React Hook Form for forms if useful
- Zod for client-side validation where appropriate

Do NOT use:

- Django
- Django REST Framework
- PostgreSQL
- any custom backend / REST API
- Flutter
- Dart
- Redux unless explicitly requested later
- authentication / login / register screens

---

# 4. Product Scope

## MVP Features

### Tasks only

- Create task
- View task list
- View / edit task details
- Mark complete / incomplete
- Delete task
- Filter: All / Active / Completed
- Optional search by title

### Task fields

Each task contains:

```text
id
title
description
completed
created_at
updated_at
completed_at
```

---

# 5. Explicit Non-Goals

Do NOT implement:

- backend / API / Django / PostgreSQL;
- user registration;
- login / logout;
- social login;
- team collaboration;
- real-time sync;
- push notifications;
- file attachments;
- recurring tasks;
- offline multi-device sync;
- payments;
- AI task generation.

---

# 6. User Stories

## Create Task

A user can create a task.

Acceptance criteria:

- title is required;
- title has a reasonable maximum length;
- description is optional;
- new task appears in the list;
- data is saved locally.

## View Tasks

A user can see their tasks.

Acceptance criteria:

- newest tasks appear first by default;
- empty state exists when there are no tasks;
- filter works: All / Active / Completed.

## Edit Task

A user can edit a task.

Acceptance criteria:

- title and description can be changed;
- updated timestamp changes;
- changes persist locally.

## Complete Task

A user can mark a task complete / incomplete.

Acceptance criteria:

- completed state is persisted;
- `completed_at` is set when completed;
- `completed_at` becomes null when reopened.

## Delete Task

A user can delete a task.

Acceptance criteria:

- confirmation is shown before delete;
- deleted task disappears from the list;
- deletion persists locally.

---

# 7. Data & Persistence

Store todos locally on the device.

Recommended:

```text
AsyncStorage
```

Suggested shape:

```json
[
  {
    "id": "uuid-or-string",
    "title": "Buy milk",
    "description": "From the store",
    "completed": false,
    "created_at": "2026-01-01T10:00:00Z",
    "updated_at": "2026-01-01T10:00:00Z",
    "completed_at": null
  }
]
```

Rules:

- generate a unique `id` on create;
- never lose data on app restart if persistence is enabled;
- keep CRUD logic in one place (store / service), not scattered in screens.

---

# 8. Mobile Project Structure

Create:

```text
apps/mobile/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── tasks/
│   │   ├── new.tsx
│   │   └── [id].tsx
│
├── src/
│   ├── components/
│   ├── features/
│   │   └── tasks/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── store/
│   │       ├── types/
│   │       └── utils/
│   ├── lib/
│   │   └── storage/
│   ├── theme/
│   ├── constants/
│   └── types/
│
├── assets/
├── app.json
├── package.json
└── tsconfig.json
```

---

# 9. Navigation

Use Expo Router.

Simple flow:

```text
Task List
  ├── Create Task
  └── Task Detail / Edit
```

No auth routes. No protected navigation.

---

# 10. State Strategy

Use one clear approach:

```text
Local UI state → useState / useReducer
Todo data → Zustand (or equivalent local store) + AsyncStorage
```

CRUD operations live in the store/service:

- createTask
- updateTask
- toggleComplete
- deleteTask
- getTasks / filter / search

Screens should call hooks/store methods — not write raw storage logic inline.

---

# 11. UI Screens

## Task List

Show:

- header;
- create button;
- filter controls (All / Active / Completed);
- optional search;
- task list;
- empty state;
- delete confirmation.

## Create Task

Show:

- title input;
- description input;
- create button;
- validation;
- loading / disabled submit if needed.

## Task Detail / Edit

Show:

- title;
- description;
- completion toggle;
- save;
- delete;
- validation.

---

# 12. UI Components

Reusable only when useful:

```text
Button
TextInput
Screen
EmptyState
TaskCard
TaskForm
ConfirmDialog
```

Avoid creating a component for every View.

---

# 13. Business Rules

### Completion

When `completed = true` → set `completed_at = now`  
When `completed = false` → set `completed_at = null`

### Update

Do not allow changing `id` or `created_at`.

### Delete

Always confirm before delete.

---

# 14. Development Phases

## PHASE 0 — Repository Inspection

1. Inspect repository.
2. Identify existing files.
3. Confirm this is a new / local-only project.
4. Create `PROJECT_PLAN.md`.

---

## PHASE 1 — Repository Foundation

Create:

```text
apps/mobile/
docs/
README.md
.gitignore
```

Configure TypeScript, ESLint, Prettier as needed.

---

## PHASE 2 — Mobile Bootstrap

Create Expo React Native TypeScript project.

Configure:

- Expo Router;
- TypeScript;
- theme;
- basic reusable components.

Create placeholder screens:

```text
Task List
Create Task
Edit Task
```

Validation: app starts, routes work.

---

## PHASE 3 — Local Todo Store + CRUD

Implement:

- task types;
- local store;
- AsyncStorage persistence;
- create / read / update / delete / toggle complete.

Validation: CRUD works in memory and after app reload.

---

## PHASE 4 — Task UI

Implement:

- TaskCard;
- TaskList;
- TaskForm;
- create screen;
- detail/edit screen;
- filter;
- optional search;
- delete confirmation;
- empty state.

---

## PHASE 5 — UX Polish

Improve:

- keyboard handling;
- safe areas;
- validation messages;
- disabled buttons;
- consistent spacing / theme;
- accessibility basics.

---

## PHASE 6 — Testing & Quality

- TypeScript typecheck
- ESLint
- basic component / store tests if practical

Critical flows:

```text
Create Task
View Tasks
Edit Task
Complete Task
Filter Tasks
Delete Task
Reload App → data still there
```

---

## PHASE 7 — Documentation

Update:

```text
README.md
docs/development.md
```

Include setup, run commands, and feature summary.

---

## PHASE 8 — Final Review

Check:

- [ ] No backend / auth code
- [ ] CRUD works
- [ ] Local persistence works
- [ ] Empty / error UX is clear
- [ ] Delete confirmation exists
- [ ] Docs are accurate

---

# 15. Final Acceptance Criteria

The project is complete if a user can:

1. start the Expo app;
2. create a task;
3. see it in the list;
4. edit it;
5. mark it complete / incomplete;
6. filter tasks;
7. delete a task;
8. close and reopen the app and still see saved tasks.

---

# 16. Important Principle

Keep it simple.

```text
Expo UI
  ↓
Local store (Zustand / hooks)
  ↓
AsyncStorage
```

No backend. No login. No over-engineering.

---

# 17. One-Line Mission

> Build a clean, simple Expo React Native Todo app with local CRUD and persistence, and no backend or authentication.
