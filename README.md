# Habit Tracker PWA

A client-side habit tracker built with Next.js, React, TypeScript, and Tailwind CSS. Users can sign up, log in, create habits, mark daily completions, see streaks, and log out. App data is stored in browser storage for this stage of the project.

## Prerequisites

- Node.js 20 or newer
- npm

## Install Dependencies

```bash
npm install
```

If you plan to run end-to-end tests locally, install the Playwright browser binaries:

```bash
npx playwright install
```

## Run the App

Start the local development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

To run the production build locally:

```bash
npm run build
npm run start
```

## Run Tests

Run all tests:

```bash
npm test
```

Run only unit tests with coverage:

```bash
npm run test:unit
```

Run only integration tests:

```bash
npm run test:integration
```

Run only end-to-end tests:

```bash
npm run test:e2e
```

The Playwright config builds and starts the app automatically before e2e tests. It uses http://localhost:3000 as the base URL and reuses an existing local server outside CI when one is already running.

## Other Useful Commands

```bash
npm run lint
npm run build
```

## Required Test Files

| Test file | Type | What it verifies |
| --- | --- | --- |
| `tests/unit/habits.test.ts` | Unit | `toggleHabitCompletion` adds a missing completion date, removes an existing date, avoids mutating the original habit, and prevents duplicate completion dates. |
| `tests/unit/slug.test.ts` | Unit | `getHabitSlug` lowercases habit names, trims and collapses spaces, hyphenates words, and removes unsupported characters. |
| `tests/unit/streaks.test.ts` | Unit | `calculateCurrentStreak` handles empty completions, requires today to be completed, counts consecutive days, ignores duplicate dates, and stops when a day is missing. |
| `tests/unit/validators.test.ts` | Unit | `validateHabitName` rejects blank names, enforces the 60-character limit, and returns a trimmed value for valid names. |
| `tests/integration/auth-flow.test.tsx` | Integration | Signup creates a persisted session, duplicate signup emails show an error, login creates an active session, and invalid credentials show an error. |
| `tests/integration/habit-form.test.tsx` | Integration | Habit form validation, creating habits, editing existing habits, confirmed deletion, and completion toggling with streak updates. |
| `tests/e2e/app.spec.ts` | End-to-end | A full user path: splash screen, signup, dashboard access, habit creation, marking a habit complete, streak display, and logout redirect. |
| `tests/setup.ts` | Test setup | Loads `@testing-library/jest-dom` matchers for Vitest and React Testing Library assertions. |

## Coverage

Unit tests run with V8 coverage enabled through `vitest.config.ts`. Coverage is collected for `src/lib/**`, excludes `src/lib/storage.ts`, and requires at least 80% line coverage.

## Assumptions and Trade-offs

- Authentication is intentionally local-only. Users, sessions, and habits are stored in `localStorage` or `sessionStorage`; there is no backend, password hashing, or server-side session validation.
- Habit frequency is currently fixed to `daily`, matching the available streak logic and UI behavior.
- The PWA service worker is registered from `/sw.js` when supported by the browser.
- Unit coverage focuses on pure logic in `src/lib/**`; storage is excluded because it depends directly on browser storage APIs.
- Integration tests use jsdom and mocked navigation/storage boundaries where needed instead of a real browser.
- E2E coverage uses Chromium only, which keeps the test suite faster but does not prove behavior across every browser engine.
