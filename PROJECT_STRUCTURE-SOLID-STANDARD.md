# Project Structure & Maintenance Guidelines

This document explains how our React Native (TypeScript) codebase is organized and the rules every contributor must follow to keep it clean, scalable, and easy to maintain.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Folder Structure](#2-folder-structure)
3. [Folder Responsibilities](#3-folder-responsibilities)
4. [Feature Module Structure](#4-feature-module-structure)
5. [Naming Conventions](#5-naming-conventions)
6. [Import & Path Alias Rules](#6-import--path-alias-rules)
7. [Component Guidelines](#7-component-guidelines)
8. [State Management](#8-state-management)
9. [API & Services Layer](#9-api--services-layer)
10. [Styling & Theme](#10-styling--theme)
11. [Navigation](#11-navigation)
12. [Environment & Configuration](#12-environment--configuration)
13. [Testing](#13-testing)
14. [Git Workflow](#14-git-workflow)
15. [Code Review Checklist](#15-code-review-checklist)
16. [How to Add a New Feature](#16-how-to-add-a-new-feature)
17. [Do's and Don'ts](#17-dos-and-donts)
18. [Project Documentation Guidelines](#18-project-documentation-guidelines)

---

## 1. Architecture Overview

We use a **feature-based architecture**. Code is grouped by business feature (auth, products, cart, orders) instead of by file type.

**Why:**

- Easy to find everything related to one feature
- Features can be developed independently by different developers
- Deleting or refactoring a feature is safe and contained
- Scales well as the app and team grow

**Core principles:**

| Principle | Meaning |
|---|---|
| Separation of concerns | UI, logic, and data access live in separate layers |
| Single responsibility | One file does one job |
| Feature isolation | Features do not depend on each other's internals |
| Reusability | Shared code lives in `components/`, `hooks/`, `utils/` |
| Type safety | Everything is typed; avoid `any` |

---

## 2. Folder Structure

```
my-app/
├── src/
│   ├── app/                      # App entry & global setup
│   │   ├── App.tsx
│   │   ├── providers/
│   │   └── navigation/
│   │       ├── RootNavigator.tsx
│   │       ├── AuthNavigator.tsx
│   │       ├── MainTabNavigator.tsx
│   │       └── types.ts
│   │
│   ├── features/                 # Self-contained feature modules
│   │   ├── auth/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── profile/
│   │
│   ├── components/               # Shared reusable UI
│   │   ├── ui/
│   │   ├── layout/
│   │   └── feedback/
│   │
│   ├── services/                 # Core infrastructure
│   │   ├── api/
│   │   ├── storage/
│   │   ├── notifications/
│   │   └── analytics/
│   │
│   ├── store/                    # Global state
│   ├── hooks/                    # Global hooks
│   ├── theme/                    # Design system
│   ├── utils/                    # Pure helper functions
│   ├── constants/
│   ├── types/                    # Global TypeScript types
│   ├── localization/             # i18n (en, bn)
│   └── assets/
│
├── docs/                         # Project documentation (guides for humans)
│   ├── architecture.md
│   ├── api.md
│   ├── development.md
│   ├── build-guide.md
│   └── android-beginner-guide.md # optional / platform-specific
│
├── __tests__/
├── e2e/
├── android/
├── ios/
├── README.md                     # Project entry point (links into docs/)
├── PROJECT_PLAN.md               # High-level plan / milestones (optional)
├── .env.development
├── .env.production
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── babel.config.js
├── tsconfig.json
├── app.json
└── package.json
```

---

## 3. Folder Responsibilities

| Folder | Purpose | Allowed Content | Not Allowed |
|---|---|---|---|
| `app/` | App bootstrap, providers, navigation | Root component, navigators | Business logic |
| `features/` | Business features | Screens, components, hooks, services, store for that feature | Code shared by other features |
| `components/` | Shared UI used by 2+ features | Button, Input, Modal, Loader | Feature-specific logic, API calls |
| `services/` | Infrastructure | API client, storage wrapper, push setup | UI code |
| `store/` | Global app state | Store setup, global slices | Feature-only state |
| `hooks/` | Global reusable hooks | `useDebounce`, `useKeyboard` | Feature-specific hooks |
| `theme/` | Design tokens | Colors, spacing, typography | Hardcoded values elsewhere |
| `utils/` | Pure functions | Formatters, validators | Side effects, React code |
| `constants/` | Static values | Config, routes, storage keys | Dynamic values |
| `types/` | Global types | API types, ambient declarations | Feature-specific types |
| `localization/` | Translations | `en.json`, `bn.json` | Hardcoded UI text |
| `assets/` | Static files | Images, fonts, icons, Lottie | Code |
| `docs/` | Human project documentation | Architecture, API, setup, build, testing guides | App source code, secrets |

**Rule of thumb:** if only one feature uses it, keep it inside that feature. Move it to a shared folder only when a second feature needs it.

**Docs rule of thumb:** if a human needs it to understand, set up, build, or maintain the project, put it in `docs/` (and link it from `README.md`).

---

## 4. Feature Module Structure

Every feature follows the same layout:

```
features/products/
├── screens/
│   ├── ProductListScreen.tsx
│   └── ProductDetailScreen.tsx
├── components/
│   ├── ProductCard.tsx
│   └── ProductFilter.tsx
├── hooks/
│   └── useProducts.ts
├── services/
│   └── productsApi.ts
├── store/                 # Only if the feature needs its own client state
│   └── productsStore.ts
├── types.ts
├── constants.ts           # Optional
└── index.ts               # Public API of the feature
```

### Layer responsibilities

| Layer | Responsibility |
|---|---|
| `screens/` | Compose UI, connect hooks. **No heavy logic.** |
| `components/` | Presentational pieces used by this feature's screens |
| `hooks/` | Business logic, data fetching, derived state |
| `services/` | Raw API calls only |
| `store/` | Client-side state for this feature |
| `types.ts` | Types and interfaces for this feature |
| `index.ts` | Exports what other parts of the app may use |

### Public API (`index.ts`)

Only export what other modules need:

```ts
// features/products/index.ts
export { ProductListScreen } from './screens/ProductListScreen';
export { useProducts } from './hooks/useProducts';
export type { Product } from './types';
```

Other code must import from the feature root, never from its internal files.

---

## 5. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Folders | `kebab-case` or `camelCase` (be consistent) | `features/order-history` |
| Components | `PascalCase.tsx` | `ProductCard.tsx` |
| Screens | `PascalCase` + `Screen` suffix | `LoginScreen.tsx` |
| Hooks | `camelCase` with `use` prefix | `useAuth.ts` |
| Services / API | `camelCase` + `Api` suffix | `authApi.ts` |
| Stores | `camelCase` + `Store` / `Slice` | `cartStore.ts` |
| Utils | `camelCase` | `formatCurrency.ts` |
| Types / Interfaces | `PascalCase` | `User`, `OrderStatus` |
| Constants | `UPPER_SNAKE_CASE` | `API_TIMEOUT` |
| Test files | Same name + `.test` | `ProductCard.test.tsx` |
| Booleans | Prefix with `is`, `has`, `should` | `isLoading`, `hasError` |
| Event handlers | `handle` prefix; props use `on` | `handlePress`, `onPress` |

---

## 6. Import & Path Alias Rules

### Alias setup

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

```js
// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', { root: ['./src'], alias: { '@': './src' } }],
  ],
};
```

### Import rules

```ts
// ✅ Good
import { Button } from '@/components/ui';
import { useAuth } from '@/features/auth';

// ❌ Bad: deep relative path
import { Button } from '../../../components/ui/Button';

// ❌ Bad: reaching into another feature's internals
import { LoginForm } from '@/features/auth/components/LoginForm';
```

### Import order

1. React / React Native
2. Third-party libraries
3. Absolute imports (`@/...`)
4. Relative imports (`./...`)
5. Types
6. Styles

### Dependency direction

```
screens → hooks → services → api client
   ↓
components → theme
```

- `components/` must **never** import from `features/`.
- Features must **never** import from another feature's internals.
- `utils/` must **never** import React or app state.

---

## 7. Component Guidelines

- One component per file.
- Keep components under roughly **200 lines**. Split if larger.
- Use functional components and hooks only.
- Define a typed `Props` interface for every component.
- Keep screens thin: no inline API calls or complex logic.
- Wrap with `React.memo` only when profiling shows a benefit.
- Use `FlatList` / `FlashList` for long lists, never `ScrollView` with `.map()`.

```tsx
// components/ui/Button.tsx
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button = ({ title, onPress, disabled = false }: ButtonProps) => (
  <Pressable
    style={[styles.button, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
  },
  disabled: { opacity: 0.5 },
  text: { color: colors.white, textAlign: 'center' },
});
```

---

## 8. State Management

| State type | Tool | Example |
|---|---|---|
| Server data | TanStack React Query | Product list, orders |
| Global client state | Zustand / Redux Toolkit | Auth session, cart |
| Local UI state | `useState` / `useReducer` | Modal open, input value |
| Form state | React Hook Form + Zod | Login, checkout |
| Persistent data | MMKV / SecureStore | Tokens, settings |

**Rules:**

- Do not store server data in global stores; use React Query.
- Keep state as close to where it is used as possible.
- Store tokens only in secure storage, never in plain AsyncStorage.

---

## 9. API & Services Layer

```
services/api/
├── client.ts          # Axios instance, interceptors, token refresh
├── endpoints.ts       # All endpoint paths
└── errorHandler.ts    # Normalize API errors
```

**Rules:**

- All HTTP calls go through the shared `client.ts`.
- Feature API files contain only request functions, with typed inputs and outputs.
- Components never call Axios or `fetch` directly.
- Handle errors in one place (`errorHandler.ts`) and show user-friendly messages.

```ts
// features/products/services/productsApi.ts
import { api } from '@/services/api/client';
import { ENDPOINTS } from '@/services/api/endpoints';
import type { Product } from '../types';

export const productsApi = {
  getAll: (params?: { page?: number }) =>
    api.get<Product[]>(ENDPOINTS.products.list, { params }),
  getById: (id: string) =>
    api.get<Product>(ENDPOINTS.products.detail(id)),
};
```

```ts
// features/products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/productsApi';

export const useProducts = (page = 1) =>
  useQuery({
    queryKey: ['products', page],
    queryFn: () => productsApi.getAll({ page }).then((r) => r.data),
  });
```

---

## 10. Styling & Theme

- **Never hardcode** colors, font sizes, or spacing. Use `theme/`.
- Use `StyleSheet.create` (or NativeWind if adopted project-wide; do not mix).
- Support light and dark mode through theme tokens.
- Use consistent spacing scale (e.g., 4, 8, 12, 16, 24, 32).

```ts
// theme/spacing.ts
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
```

---

## 11. Navigation

- Define all route names and param types in `app/navigation/types.ts`.
- Group navigators by flow: Auth, Main (tabs), and nested stacks.
- Use typed hooks (`useNavigation<NavigationProp>()`), never untyped navigation.
- Keep route names in `constants/routes.ts`; do not use raw strings.

---

## 12. Environment & Configuration

- Keep secrets and URLs in `.env.*` files.
- **Never commit** `.env.production` or any secret to Git. Commit a `.env.example` instead.
- Read environment values in one place only: `constants/config.ts`.

```ts
// constants/config.ts
export const config = {
  apiUrl: process.env.API_URL ?? '',
  env: process.env.APP_ENV ?? 'development',
};
```

---

## 13. Testing

| Type | Tool | Location |
|---|---|---|
| Unit | Jest | Next to file or `__tests__/` |
| Component | React Native Testing Library | Next to component |
| E2E | Detox / Maestro | `e2e/` |

**Rules:**

- Test hooks, utils, and validators first; they give the most value per line.
- Test behavior, not implementation details.
- Every bug fix should include a regression test.
- Aim for meaningful coverage on business logic (target 70%+), not 100% on UI.

---

## 14. Git Workflow

### Branch naming

```
feature/<short-description>     feature/add-order-tracking
fix/<short-description>         fix/cart-total-bug
chore/<short-description>       chore/update-dependencies
refactor/<short-description>    refactor/auth-hooks
```

### Commit messages (Conventional Commits)

```
feat(cart): add quantity update
fix(auth): handle expired refresh token
refactor(products): extract filter hook
docs: update structure guide
chore: bump react-native to 0.76
```

### Pull request rules

- Keep PRs small and focused (ideally under 400 changed lines).
- Link the related task/issue.
- Include screenshots or screen recordings for UI changes.
- At least **one approval** required before merge.
- CI (lint, type-check, tests) must pass.

---

## 15. Code Review Checklist

- [ ] Code is in the correct folder and follows the feature structure
- [ ] No cross-feature internal imports
- [ ] No hardcoded colors, spacing, strings, or URLs
- [ ] Props, API responses, and navigation params are typed (no `any`)
- [ ] Logic is in hooks/services, not inside screens
- [ ] Loading, error, and empty states are handled
- [ ] No unused imports, variables, or `console.log`
- [ ] Text goes through localization (en / bn)
- [ ] Tests added or updated
- [ ] No secrets committed

---

## 16. How to Add a New Feature

1. Create the folder: `src/features/<feature-name>/`
2. Add the standard subfolders: `screens/`, `components/`, `hooks/`, `services/`, `types.ts`, `index.ts`
3. Define types in `types.ts`
4. Write API functions in `services/`
5. Wrap them in React Query hooks in `hooks/`
6. Build presentational components in `components/`
7. Compose screens in `screens/`
8. Export the public API from `index.ts`
9. Register routes in `app/navigation/` and add types
10. Add translations to `en.json` and `bn.json`
11. Write tests and open a PR

---

## 17. Do's and Don'ts

### Do

- Keep files small and focused
- Use absolute imports with `@/`
- Reuse shared components before creating new ones
- Handle loading, error, and empty states on every screen
- Run lint, type-check, and tests before pushing
- Update this document when the structure changes

### Don't

- Don't put business logic inside screens or JSX
- Don't call APIs directly from components
- Don't import from another feature's internal files
- Don't hardcode strings, colors, or URLs
- Don't use `any` to silence type errors
- Don't commit `.env` secrets or `console.log` debugging
- Don't create `utils` dumping grounds; place helpers near where they are used first
- Don't put project docs only in chat history — write them into `docs/`
- Don't duplicate the same long guide in many places; keep one source of truth and link it

---

## 18. Project Documentation Guidelines

All project documentation for humans lives here:

```text
docs/
```

`README.md` at the repo root is the **entry point**. It should stay short and link into `docs/`.

### 18.1 Recommended `docs/` layout

```text
docs/
├── architecture.md          # System design, folders, data flow (RN ↔ Django API)
├── api.md                   # API contract notes for the mobile app (endpoints, auth, errors)
├── development.md           # Daily coding workflow, scripts, conventions
├── build-guide.md           # Dev run + production build (APK/AAB, later iOS if needed)
├── android-beginner-guide.md# Optional beginner Android setup / phone testing
├── testing.md               # Manual + automated test strategy (optional)
└── changelog.md             # Release notes (optional)
```

Root-level docs that are also allowed:

| File | Purpose |
|------|---------|
| `README.md` | Quick start + links to `docs/` |
| `PROJECT_PLAN.md` | Milestones / phases (optional) |
| `PROJECT_STRUCTURE-SOLID-STANDARD.md` | This structure & maintenance standard |
| `.env.example` | Safe env template (no secrets) |

### 18.2 What goes in `docs/` vs what does not

| Put in `docs/` | Do NOT put in `docs/` |
|---|---|
| Architecture decisions | Source code |
| Setup / run instructions | Secrets, tokens, passwords |
| Build & release steps | Large binary files |
| API usage notes for mobile | One-off personal notes with no project value |
| Testing checklists | Duplicate copies of the same guide |
| Beginner onboarding guides | Generated build artifacts |

### 18.3 Documentation rules

1. **One source of truth** — each topic has one main file; other files only link to it.
2. **README stays short** — purpose, stack, quick start, and links.
3. **Write for the next developer** — assume a new teammate (or future you) is reading.
4. **Keep docs next to reality** — if structure/commands change, update docs in the same PR.
5. **Prefer clear steps** — especially for Android setup, phone testing, and release builds.
6. **No secrets in docs** — use placeholders like `YOUR_API_URL`, never real keys.
7. **Name files clearly** — use kebab-case: `build-guide.md`, `android-beginner-guide.md`.

### 18.4 Minimum docs for an API-based React Native + Django project

For a production-oriented app (React Native client + Django REST API), keep at least:

| Doc | Must answer |
|-----|-------------|
| `README.md` | What is this? How do I start? |
| `docs/architecture.md` | How mobile and backend connect |
| `docs/api.md` | Auth, base URL, main endpoints, error shape |
| `docs/development.md` | Install, run, lint, test commands |
| `docs/build-guide.md` | Dev run + Android APK/AAB (and iOS later if needed) |

### 18.5 How to add or update a doc

1. Create or edit the file under `docs/`.
2. Add/update a link in `README.md` if it is an important guide.
3. Use a commit message like: `docs: add android build guide`
4. In the PR, note what changed for readers (setup steps, architecture, API, etc.).

### 18.6 README template (short)

```md
# My App

Short description.

## Stack
- React Native + TypeScript
- Django REST API (backend)

## Quick start
1. ...
2. ...

## Docs
- Architecture: docs/architecture.md
- API: docs/api.md
- Development: docs/development.md
- Build: docs/build-guide.md
```

---

## Maintenance of This Document

- **Owner:** Tech lead / senior developer
- **Review cadence:** Every quarter, or when the architecture changes
- **Changes:** Propose through a PR; the team must approve

| Version | Date | Author | Notes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | Team | Initial version |
| 1.1 | 2026-03-17 | Team | Added `docs/` folder + project documentation guidelines |
