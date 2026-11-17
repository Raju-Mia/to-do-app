# Todo App — Full Build Guide (Development + Production)

**Share this file with friends.**  
One guide for running the app while coding **and** building real Android install files with **Expo + EAS**.

| Mode | What you get | Best for |
|------|----------------|----------|
| **Development** | Live reload with Expo Go / Expo start | Daily coding + testing |
| **Production** | Standalone **APK** or **AAB** | Sharing install / Play Store |

**Platform focus:** Android  
**App path:** `apps/mobile`  
**Stack:** React Native + Expo + TypeScript (local CRUD, no backend)

---

## 0) Quick map (read this first)

```text
DEVELOPMENT
  computer runs Metro
  phone opens Expo Go
  code changes reload fast
  no Play Store file yet

PRODUCTION / SHAREABLE BUILD
  EAS Build (Expo cloud)
  creates APK (easy install) or AAB (Play Store)
  installs as a real app (not Expo Go)
```

### Cheat sheet

```bash
# Development
cd apps/mobile
npm install
npx expo start

# Production-ready EAS setup (once)
npx eas-cli login
npx eas build:configure

# APK for friends (install directly)
npx eas build -p android --profile preview

# AAB for Google Play
npx eas build -p android --profile production
```

---

# PART A — Development build / run guide

Use this every day while coding.

## A1. What you need

### Computer

- Node.js LTS (`node -v` should work)
- npm (`npm -v`)
- Git
- This project cloned/copied on disk

### Android phone

1. Install **Expo Go** from Play Store
2. Computer and phone on the **same Wi‑Fi**
3. (Optional but useful) Enable USB debugging:
   - Settings → About phone → tap **Build number** 7 times
   - Developer options → **USB debugging** ON

## A2. Install project dependencies

```bash
cd apps/mobile
npm install
```

## A3. Start the development server

```bash
cd apps/mobile
npx expo start
```

You should see a QR code and a URL.

## A4. Open the app on your Android phone

### Option 1 — Expo Go (easiest)

1. Open **Expo Go**
2. Scan the QR code from the terminal
3. Wait for the bundle to load

### Option 2 — USB cable

1. Connect phone with USB
2. Allow USB debugging
3. Check:

```bash
adb devices
```

4. In the Expo terminal, press `a`

## A5. Development keyboard shortcuts

In the terminal where Expo is running:

| Key | Action |
|-----|--------|
| `a` | Open on Android |
| `r` | Reload app |
| `m` | Developer menu |
| `j` | Debugger tools |
| `Ctrl + C` | Stop server |

## A6. What “development build” means here

For this Todo app (simple local app):

- **Daily development = Expo Go + `npx expo start`**
- You do **not** need a custom native dev client for MVP

If later you add native modules Expo Go does not support, then use:

```bash
npx eas build -p android --profile development
```

and install that **development build** instead of Expo Go.  
For now, Expo Go is enough.

## A7. Development test checklist

Before asking for a production build, verify:

- [ ] App opens on phone
- [ ] Create task works
- [ ] Edit task works
- [ ] Complete / incomplete works
- [ ] Filter works (All / Active / Completed)
- [ ] Search works
- [ ] Delete with confirmation works
- [ ] Kill app and reopen → tasks still there

## A8. Common development problems

### QR code does not connect

- Same Wi‑Fi?
- Try USB + `adb devices` + press `a`
- Restart:

```bash
npx expo start --clear
```

### Changes not showing

- Save the file
- Press `r` to reload
- Restart Expo server

### Red error screen

- Read the first error line
- Fix the file/line shown
- Reload

---

# PART B — Production / shareable build guide (Expo EAS)

Use this when you want a **real Android app file** for yourself or friends.

## B1. APK vs AAB (important)

| Format | Use when |
|--------|----------|
| **APK** | Install directly on Android phones / share with friends |
| **AAB** | Upload to **Google Play Store** |

This project’s EAS profiles:

| Profile | Output | Command |
|---------|--------|---------|
| `preview` | **APK** | friend-install / internal test |
| `production` | **AAB** | Play Store release |
| `development` | Dev client (optional later) | advanced native testing |

## B2. One-time setup

### 1) Create / login Expo account

```bash
cd apps/mobile
npx eas-cli login
```

Or create account at: [https://expo.dev](https://expo.dev)

### 2) Confirm Android package name

In `apps/mobile/app.json`, Android needs a unique package id, for example:

```json
"android": {
  "package": "com.yourname.todo"
}
```

This project uses a package name already (see `app.json`).  
If you fork the project, change it to your own id before publishing.

### 3) Configure EAS in the project

```bash
cd apps/mobile
npx eas build:configure
```

This uses / creates `eas.json` in `apps/mobile`.

If `eas.json` already exists in this repo, you can skip recreate and just use it.

## B3. Build an APK for friends (preview)

```bash
cd apps/mobile
npx eas build -p android --profile preview
```

What happens:

1. Expo uploads your project
2. EAS builds Android in the cloud
3. You get a download link for the **APK**

Then:

1. Open the build page on expo.dev
2. Download the APK
3. Send to your friend (Drive / Telegram / etc.)
4. On phone: open APK → allow install from that source if asked → Install

> This installs a **standalone app**. Friends do **not** need Expo Go for this APK.

## B4. Build an AAB for Play Store (production)

```bash
cd apps/mobile
npx eas build -p android --profile production
```

Then:

1. Download the **AAB** from Expo
2. Upload to Google Play Console
3. Complete store listing, content rating, etc.
4. Submit for review

## B5. Install / share flow (simple)

```text
You
  → run EAS preview build
  → download APK
  → send APK to friend
Friend
  → install APK
  → open Todo app
  → create tasks (saved on their phone)
```

No backend server. No login. Each phone keeps its own local tasks.

## B6. Versioning before each release

In `apps/mobile/app.json`:

```json
"version": "1.0.0"
```

For Android store updates, also bump:

```json
"android": {
  "versionCode": 1
}
```

Increase `versionCode` every Play Store upload (1, 2, 3…).

## B7. Production test checklist (before sharing)

Test the **installed APK**, not only Expo Go:

- [ ] Fresh install opens
- [ ] Create / edit / complete / delete works
- [ ] Filters + search work
- [ ] App restart keeps data
- [ ] Works offline
- [ ] No crash on empty list
- [ ] Delete confirmation appears
- [ ] Tested on at least one real Android phone

## B8. Useful EAS commands

```bash
# login
npx eas-cli login

# who am I
npx eas-cli whoami

# configure project
npx eas build:configure

# APK for sharing
npx eas build -p android --profile preview

# AAB for Play Store
npx eas build -p android --profile production

# optional: local credentials / check
npx eas credentials
```

Build status / download links: [https://expo.dev](https://expo.dev) → your project → Builds

## B9. Common production problems

### “Package name missing”

Add `android.package` in `app.json`, then rebuild.

### Build failed on Expo

- Open the build logs on expo.dev
- Fix the first real error
- Run the same command again

### Friend cannot install APK

- They must allow install from that file source
- APK must match their CPU (EAS Android APK usually works on normal phones)
- Send the full file again if download was incomplete

### Data is empty after reinstall

Expected. Uninstalling the app clears AsyncStorage local data.

---

# PART C — Friend share script (copy/paste)

Send this short message with the APK:

```text
Todo App (Android)

1) Download this APK
2) Open the file on your phone
3) Allow install if Android asks
4) Open "Todo"
5) Create tasks — they save on your phone only

No login. No internet required after install.
```

---

# PART D — Which path should I use?

| Goal | Use |
|------|-----|
| I am coding now | **Part A Development** (`npx expo start` + Expo Go) |
| I want to test like a real app | **Part B preview APK** |
| I want to share with friends quickly | **Part B preview APK** |
| I want Google Play release | **Part B production AAB** |

---

# PART E — Related docs

- Architecture: `docs/architecture.md`
- Android beginner setup: `docs/android-beginner-guide.md`
- Daily coding workflow: `docs/development.md`
- Project plan: `PROJECT_PLAN.md`

---

## One-line summary

**Develop with Expo Go. Share with EAS preview APK. Publish with EAS production AAB.**
