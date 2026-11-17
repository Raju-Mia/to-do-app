# PROJECT PLAN — Simple Android Todo App

**Status:** Phase 4 complete — Task UI components + screens polished  
**Platform focus:** Android first  
**App type:** Local-only CRUD (no backend, no login)

---

## 1. Goal

Build a clean, beginner-friendly Todo app with:

- Create / Read / Update / Delete tasks
- Complete / incomplete toggle
- Filter: All / Active / Completed
- Local save on phone (AsyncStorage)

---

## 2. Architecture summary

```text
Screens (Expo Router)
   ↓
Tasks feature (Zustand store + hooks)
   ↓
AsyncStorage (local persistence)
```

Full details: `docs/architecture.md`

---

## 3. Technologies

| Area | Choice |
|------|--------|
| App framework | React Native + Expo |
| Language | TypeScript |
| Navigation | Expo Router |
| State | Zustand |
| Storage | AsyncStorage |
| Forms (optional) | React Hook Form + Zod |
| Dev testing | Expo Go on Android phone |
| Release | EAS Build → APK / AAB |

---

## 4. Implementation phases

| Phase | Focus |
|-------|-------|
| 0 | Inspect repo / confirm plan |
| 1 | Foundation folders + README |
| 2 | Expo mobile bootstrap + screens |
| 3 | Local store + CRUD + persistence |
| 4 | Task UI (list/create/edit/filter/delete) |
| 5 | UX polish |
| 6 | Quality checks |
| 7 | Docs |
| 8 | Final review + release testing |

---

## 5. Beginner Android path

Follow this document first:

- `docs/android-beginner-guide.md`

It explains:

- environment setup
- connecting an Android phone
- running / debugging
- APK / AAB release
- pre-release testing checklist

---

## 6. Key docs

| File | Purpose |
|------|---------|
| `docs/architecture.md` | Clean project architecture |
| `docs/android-beginner-guide.md` | Step-by-step Android beginner guide |
| `docs/development.md` | Daily coding workflow |
| `TODO_APP_PROJECT.md` | Full product specification |
| `TODO_APP_MASTER_PROMPT.md` | Agent implementation prompt |

---

## 7. Success criteria

Done when a beginner can:

1. run the app on an Android phone
2. perform full CRUD
3. reopen the app and still see tasks
4. build an APK for install testing
