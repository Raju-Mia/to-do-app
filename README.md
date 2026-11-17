# Todo App (Android, Local CRUD)

A simple **React Native + Expo** Todo app for Android.

- Create, edit, complete, and delete tasks
- Filter tasks (All / Active / Completed)
- Save data on the phone with AsyncStorage
- No backend
- No login

---

## Share this with friends

**Full development + production build guide (Expo / EAS):**

➡️ **[docs/build-guide.md](docs/build-guide.md)**

That one file covers:

- Development run (Expo Go)
- Production APK for direct install
- Production AAB for Google Play
- Copy/paste share instructions

---

## Repository structure

```text
to-do/
├── apps/
│   └── mobile/          # Expo React Native app
├── docs/
│   ├── build-guide.md              ← DEV + PROD build (share this)
│   ├── architecture.md
│   ├── android-beginner-guide.md
│   └── development.md
├── PROJECT_PLAN.md
├── TODO_APP_PROJECT.md
├── TODO_APP_MASTER_PROMPT.md
├── .gitignore
└── README.md
```

---

## Run in development

```bash
cd apps/mobile
npm install
npx expo start
```

Open with **Expo Go** on Android (scan QR), or press `a` with USB debugging.

---

## Build for sharing / production (EAS)

```bash
cd apps/mobile

# login once
npx eas-cli login

# APK for friends (direct install)
npx eas build -p android --profile preview

# AAB for Google Play
npx eas build -p android --profile production
```

Details: [docs/build-guide.md](docs/build-guide.md)

---

## Docs

1. [Build guide — Development + Production](docs/build-guide.md) ← start here to share
2. [Architecture](docs/architecture.md)
3. [Android beginner guide](docs/android-beginner-guide.md)
4. [Development workflow](docs/development.md)
5. [Project plan](PROJECT_PLAN.md)

---

## Current status

| Phase | Status |
|-------|--------|
| 0 — Plan / docs | Done |
| 1 — Foundation | Done |
| 2 — Expo bootstrap | Done |
| 3 — Local CRUD + storage | Done |
| 4 — Task UI | Done |
| 5 — UX polish | Next |
| 6+ — Test / docs / release | Pending |
