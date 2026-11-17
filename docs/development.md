# Development Guide — Simple Android Todo App

Day-to-day coding guide.

For the **full Development + Production Expo/EAS build guide** (share with friends):

➡️ **`docs/build-guide.md`**

For phone USB/setup basics: `docs/android-beginner-guide.md`.

---

## Stack reminder

- React Native + Expo + TypeScript
- Expo Router
- Zustand + AsyncStorage
- Android first
- No backend, no login

---

## Daily workflow (Development)

1. Open project in Cursor
2. Start app:

```bash
cd apps/mobile
npx expo start
```

3. Open on Android phone (Expo Go QR code, or press `a`)
4. Code one small feature
5. Reload and test on phone
6. Commit when the feature works

---

## Production / share builds (short)

```bash
cd apps/mobile
npx eas-cli login
npx eas build -p android --profile preview      # APK for friends
npx eas build -p android --profile production  # AAB for Play Store
```

Full steps, checklists, and troubleshooting: **`docs/build-guide.md`**

---

## Feature build order

1. Task type + empty store
2. Create task
3. List tasks
4. Persist with AsyncStorage
5. Toggle complete
6. Edit task
7. Delete + confirm
8. Filters
9. Polish UI
10. Release testing

---

## Coding rules

1. Keep screens thin
2. Put CRUD in `features/tasks/store`
3. Put storage helpers in `lib/storage`
4. Prefer small reusable components
5. Validate title before create/update
6. Always test persistence after CRUD changes

---

## Definition of done for each feature

A feature is done only when:

- it works on a real Android phone
- TypeScript has no new errors
- empty/error cases are handled if relevant
- data still correct after app restart (for CRUD features)
