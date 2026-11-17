# Todo App — Architecture (Simple, Local, Android-first)

This document describes a **clean but simple** architecture for a React Native (Expo) Todo app with **local CRUD only**. No backend. No login.

---

## 1. Goal of this architecture

Keep the app easy to understand for beginners, while still using professional habits:

- clear folders
- one place for business rules
- screens stay thin
- data survives app restart
- easy to test and extend later

---

## 2. High-level architecture

```text
┌─────────────────────────────────────────────┐
│                 UI Layer                    │
│  Screens (Expo Router) + Components         │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│              Feature Layer                  │
│  Tasks: hooks, store, types, utils          │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│            Persistence Layer                │
│  AsyncStorage (local device storage)        │
└─────────────────────────────────────────────┘
```

### What each layer does

| Layer | Responsibility | Example |
|-------|----------------|---------|
| **UI** | Show screens, buttons, forms | Task list screen, create form |
| **Feature** | Todo rules and CRUD logic | create, edit, delete, complete |
| **Persistence** | Save / load data on phone | AsyncStorage |

Rule: screens should not talk to AsyncStorage directly. They talk to the store/hooks.

---

## 3. Recommended folder structure

```text
to-do/
├── apps/
│   └── mobile/                      # Expo React Native app
│       ├── app/                     # Screens (Expo Router)
│       │   ├── _layout.tsx          # Root layout
│       │   ├── index.tsx            # Task list (home)
│       │   └── tasks/
│       │       ├── new.tsx          # Create task
│       │       └── [id].tsx         # Edit / detail task
│       │
│       ├── src/
│       │   ├── components/          # Shared UI (Button, EmptyState…)
│       │   ├── features/
│       │   │   └── tasks/
│       │   │       ├── components/  # TaskCard, TaskForm…
│       │   │       ├── hooks/       # useTasks, useTaskActions…
│       │   │       ├── store/       # Zustand store + CRUD
│       │   │       ├── types/       # Task type
│       │   │       └── utils/       # filters, dates, id helpers
│       │   ├── lib/
│       │   │   └── storage/         # AsyncStorage helpers
│       │   ├── theme/               # colors, spacing, typography
│       │   ├── constants/           # app constants
│       │   └── types/               # shared types
│       │
│       ├── assets/                  # icons, images
│       ├── app.json
│       ├── package.json
│       └── tsconfig.json
│
├── docs/
│   ├── architecture.md
│   ├── android-beginner-guide.md
│   └── development.md
│
├── README.md
├── PROJECT_PLAN.md
├── TODO_APP_PROJECT.md
└── TODO_APP_MASTER_PROMPT.md
```

---

## 4. Technologies & tools (Android)

### App stack

| Tool | Why |
|------|-----|
| **React Native** | Build Android apps with JavaScript/TypeScript |
| **Expo** | Easiest beginner setup; no hard native config at first |
| **TypeScript** | Safer code, fewer bugs |
| **Expo Router** | File-based navigation (simple screens) |
| **Zustand** | Small, easy store for todos |
| **AsyncStorage** | Save todos on the phone |
| **React Hook Form + Zod** (optional) | Clean forms + validation |

### Development tools

| Tool | Why |
|------|-----|
| **Node.js (LTS)** | Runs Expo / npm |
| **VS Code or Cursor** | Code editor |
| **Expo Go** (phone app) | Fast testing on Android during development |
| **Android Studio** | Emulator + USB debugging + release tooling |
| **EAS Build** (Expo) | Build APK / AAB for release |

---

## 5. Data model

```ts
type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;   // ISO date string
  updated_at: string;
  completed_at: string | null;
};
```

### Business rules

1. `title` is required.
2. On create → generate unique `id`, set timestamps.
3. On complete → `completed = true` and `completed_at = now`.
4. On reopen → `completed = false` and `completed_at = null`.
5. On delete → confirm first, then remove and save.
6. Filters: **All / Active / Completed**.

---

## 6. State & data flow

```text
User taps "Add Task"
        ↓
Screen calls store action: createTask(...)
        ↓
Store updates tasks in memory
        ↓
Store saves JSON list to AsyncStorage
        ↓
UI re-renders with new list
```

### Recommended store actions

```text
loadTasks()
createTask({ title, description })
updateTask(id, { title, description })
toggleComplete(id)
deleteTask(id)
setFilter('all' | 'active' | 'completed')
setSearch(text)
```

---

## 7. Screen map (Android)

```text
Home (Task List)
  ├── FAB / button → Create Task
  ├── Tap task → Edit Task
  ├── Toggle checkbox → Complete / Incomplete
  └── Delete → Confirm → Remove
```

No auth screens. No API screens.

---

## 8. Architecture principles (keep it clean)

1. **One feature folder** for todos (`features/tasks`).
2. **Screens are thin** — UI only, little logic.
3. **Store owns CRUD rules**.
4. **Storage helper owns save/load only**.
5. **Reuse small components** (`TaskCard`, `Button`, `EmptyState`).
6. **Do not over-engineer** — no Redux, no backend, no complex layers.

---

## 9. What we intentionally skip (for now)

- Django / REST API / PostgreSQL
- Login / logout / accounts
- Cloud sync
- Push notifications
- iOS-focused setup (we focus on Android first)

This keeps the architecture professional **and** beginner-friendly.
