# mbio-playwright-framework

A Playwright test framework for the `mbio` website, built with TypeScript and page objects.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

## Run tests

### Run all tests

```bash
npx playwright test
```

> By default Playwright uses 2 workers for this repository. To increase the worker count, add `--workers={number of workers}` to the command.

### Run all tests with more workers

```bash
npx playwright test --workers=3
```

### Run a single test file

```bash
npx playwright test tests/navigation/navigation.spec.ts
```

### Run tests by name

```bash
npx playwright test -g "MARK004"
```

### View HTML report after tests

```bash
npx playwright show-report
```

## Project structure

- `pages/` — page object models for reusable selectors and actions
- `tests/` — Playwright test suites grouped by feature area
- `playwright.config.ts` — test runner configuration
- `package.json` — project dependencies

## Notes

- Tests use `https://mb.io/en-AE` as the base URL.
- The project is configured to run headed browsers by default.
- CI runs with retries enabled and a single worker.
- For Task 2, a separate file named `Task2.md` has been created.
- The Google Play Store download app icon is currently missing from the target page.
