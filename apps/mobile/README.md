# Todo Mobile (`apps/mobile`)

Expo React Native Todo app — Android-first, local CRUD.

## Phase 4 status

- Shared Task UI: `TaskCard`, `TaskList`, `TaskForm`, `TaskFilters`, `TaskMeta`
- Shared states: Loading / Empty / Error
- Create + edit screens use shared form
- Delete confirmation dialog
- Search + filters on the list screen

## Run on Android

```bash
cd apps/mobile
npm install
npx expo start
```

Then open with **Expo Go** on your Android phone.

## Scripts

```bash
npm start
npm run android
npm run typecheck
npm run lint
```

## Architecture

```text
Screens → Task UI components → hooks → Zustand → AsyncStorage
```

## Build guides

Full **Development + Production** Expo/EAS guide (share with friends):

➡️ `../../docs/build-guide.md`

```bash
# Development
npx expo start

# Shareable APK
npx eas build -p android --profile preview

# Play Store AAB
npx eas build -p android --profile production
```

## Next

**Phase 5** — UX polish (keyboard, disabled states, accessibility refinements).
