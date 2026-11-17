# Android Beginner Guide — Build, Test & Release the Todo App

This guide assumes you are new to app development and focusing on **Android only**.

**Want the shareable Development + Production Expo/EAS guide?**  
➡️ Use **`docs/build-guide.md`** (best file to send to friends).

Follow the steps in order.

---

## Part A — What you will build

A simple Todo app on Android:

- Create tasks
- View tasks
- Edit tasks
- Complete / incomplete
- Delete tasks
- Filter: All / Active / Completed
- Save data on the phone (no internet needed)

Stack: **React Native + Expo + TypeScript**

---

## Part B — Tools you need

### 1) On your computer (Linux)

Install:

1. **Node.js LTS** (includes `npm`)
2. **Git**
3. **Cursor / VS Code**
4. **Android Studio** (for emulator, USB drivers/tools, later builds)
5. Optional: **Expo CLI** via `npx` (you do not need a global install)

### 2) On your Android phone

Install from Play Store:

- **Expo Go** (for day-to-day testing during development)

Enable developer options:

1. Open **Settings → About phone**
2. Tap **Build number** 7 times
3. Go back → **Developer options**
4. Turn on **USB debugging**
5. (Optional) Turn on **Wireless debugging** if you prefer Wi‑Fi testing

---

## Part C — Project architecture (simple)

```text
UI Screens  →  Task Store (CRUD)  →  AsyncStorage (phone memory)
```

See full details in:

- `docs/architecture.md`

You will create code mainly in:

```text
apps/mobile/app/                 # screens
apps/mobile/src/features/tasks/  # todo logic
apps/mobile/src/components/      # reusable UI
```

---

## Part D — Set up development environment

### Step 1: Install Node.js

Check:

```bash
node -v
npm -v
```

If missing, install Node.js LTS from the official Node website or your package manager.

### Step 2: Install Android Studio (recommended)

Why:

- Android emulator
- platform tools (`adb`)
- help with release builds later

After install:

1. Open Android Studio
2. Install Android SDK
3. Create one virtual phone (AVD), e.g. Pixel device
4. Confirm `adb` works:

```bash
adb version
```

### Step 3: Create the Expo app (when you start coding)

From the project root:

```bash
cd /home/raju/Personal/app/to-do
npx create-expo-app@latest apps/mobile --template tabs
```

(Or use a blank TypeScript template if preferred.)

Then:

```bash
cd apps/mobile
npm install
```

### Step 4: Install app libraries

```bash
npx expo install @react-native-async-storage/async-storage
npm install zustand
```

Optional form libs later:

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## Part E — Build the app step by step

Follow this order. Do not skip ahead.

### Phase 0 — Plan check

- Read `docs/architecture.md`
- Confirm goal: local CRUD only, Android first

### Phase 1 — Project foundation

- Create folders: `apps/mobile`, `docs`
- Add `.gitignore`, `README.md`

### Phase 2 — App shell

- Expo app starts
- Navigation works
- Screens exist (even with fake data):
  - Task List
  - Create Task
  - Edit Task

### Phase 3 — Local CRUD + storage

Implement:

- create
- list
- update
- toggle complete
- delete
- save/load with AsyncStorage

Test: close app → reopen → tasks still there

### Phase 4 — Real UI

- Task cards
- Filters (All / Active / Completed)
- Empty state
- Delete confirmation
- Form validation (title required)

### Phase 5 — Polish

- Keyboard behavior
- Loading / disabled buttons
- Consistent spacing and colors
- Basic accessibility labels

### Phase 6 — Quality checks

```bash
cd apps/mobile
npx tsc --noEmit
npm run lint
```

### Phase 7 — Docs + release readiness

- Update README
- Test on real phone
- Build APK/AAB when ready

---

## Part F — Connect an Android phone for testing

You have 2 good options.

### Option 1 — Expo Go (easiest for beginners)

Best for daily development.

1. Install **Expo Go** on your Android phone
2. Computer and phone on the **same Wi‑Fi**
3. In terminal:

```bash
cd apps/mobile
npx expo start
```

4. Scan the QR code with Expo Go  
   (or open the link shown in the terminal)

If QR fails:

- press `a` in the Expo terminal to open on Android
- or type the URL manually in Expo Go

### Option 2 — USB cable + `adb`

1. Enable **USB debugging** on phone
2. Connect USB cable
3. Accept “Allow USB debugging?” on phone
4. Check connection:

```bash
adb devices
```

You should see your device listed.

5. Start Expo:

```bash
cd apps/mobile
npx expo start
```

6. Press `a` to open on the Android device

---

## Part G — Run and debug on a physical phone

### Run

```bash
cd apps/mobile
npx expo start
```

Then open with Expo Go (QR) or press `a`.

### Useful Expo terminal keys

| Key | Action |
|-----|--------|
| `a` | Open on Android |
| `r` | Reload app |
| `j` | Open debugger tools |
| `m` | Developer menu |

### Debug checklist for beginners

1. **App does not open**
   - Same Wi‑Fi?
   - Firewall blocking?
   - Try USB + `adb devices`
2. **Changes not showing**
   - Press `r` to reload
   - Restart Expo (`Ctrl + C`, then `npx expo start` again)
3. **Red error screen**
   - Read the top error message
   - Check the file/line mentioned
   - Fix → save → reload
4. **Data missing after restart**
   - Confirm AsyncStorage save runs after each CRUD action

### View logs

In the same terminal where Expo is running, logs appear automatically.

Or:

```bash
adb logcat *:S ReactNative:V ReactNativeJS:V
```

---

## Part H — How to test properly before release

### Manual test checklist (must pass)

- [ ] Create a task with title only
- [ ] Create a task with title + description
- [ ] Reject empty title
- [ ] Edit title/description
- [ ] Mark complete
- [ ] Mark incomplete again
- [ ] Filter All / Active / Completed
- [ ] Delete with confirmation
- [ ] Cancel delete keeps the task
- [ ] Kill app completely and reopen → data still exists
- [ ] Rotate phone / leave app / return → no crash
- [ ] Test on a real Android phone (not only emulator)

### Suggested test order

1. Happy path (create → edit → complete → delete)
2. Edge cases (empty title, long title, empty list)
3. Persistence (reopen app)
4. UI states (empty list, many tasks)

---

## Part I — Build a release version (APK / AAB)

For production-like installs, use **EAS Build** (recommended with Expo).

### APK vs AAB

| Format | Use for |
|--------|---------|
| **APK** | Direct install on your phone for testing |
| **AAB** | Upload to Google Play Store |

### Step 1 — Create Expo account & login

```bash
cd apps/mobile
npx eas-cli login
```

### Step 2 — Configure EAS

```bash
npx eas build:configure
```

### Step 3 — Build Android APK (for testing install)

```bash
npx eas build -p android --profile preview
```

(Exact profile names depend on your `eas.json`. A preview/APK profile is ideal for direct phone install.)

### Step 4 — Build Android AAB (for Play Store)

```bash
npx eas build -p android --profile production
```

### Step 5 — Install APK on phone

1. Download the APK from the Expo build page
2. Transfer to phone
3. Allow install from that source if prompted
4. Install and open
5. Re-run the manual test checklist on the installed build

> Note: Expo Go is for development. Release APK/AAB is a real standalone app.

---

## Part J — Beginner learning path (recommended order)

1. Learn what a screen is (`app/index.tsx`)
2. Learn components (`TaskCard`)
3. Learn state/store (Zustand)
4. Learn save/load (AsyncStorage)
5. Connect UI → store → storage
6. Test on phone every day
7. Only then build APK

---

## Part K — Common beginner mistakes

1. Putting AsyncStorage code inside every screen
2. Building APK too early before CRUD works
3. Testing only on emulator
4. Skipping delete confirmation
5. Forgetting to reload after code changes
6. Mixing backend/auth ideas into this simple local app

---

## Quick command cheat sheet

```bash
# start development server
cd apps/mobile
npx expo start

# check connected Android phone
adb devices

# typecheck
npx tsc --noEmit

# build Android (EAS)
npx eas build -p android --profile preview
npx eas build -p android --profile production
```

---

## Next document

- Architecture details: `docs/architecture.md`
- Day-to-day coding plan: `docs/development.md`
