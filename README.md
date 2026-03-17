# Playwright UI Automation Framework

This repository provides a modular, robust UI Test Automation framework built atop [Playwright](https://playwright.dev/) answering the core requirements for an organized codebase, reusable patterns, reporting, and CI/CD integrations.

## Target Applications
This framework includes sample end-to-end tests for `https://the-internet.herokuapp.com`:
- **Login Flow**: Valid and invalid login authentication.
- **Search/Lookup Flow**: Simulated lookup query input and validation on the forgot password page.

## Project Structure
- `tests/` - Feature grouped test spec files logic.
- `framework/` - Abstracted UI interaction base pages (`BasePage`) and Page Object Models (`LoginPage`, `SearchPage`), along with helper utilities (`Constants.ts`, `Logger.ts`).
- `.env` - Environment variable configuration (e.g., `BASE_URL`).
- `ci/` - Automation setup explanations.
- `docs/` - Deeper dive on framework architecture.

## Getting Started

### Prerequisites
- Node.js (Version LTS recommended).

### Installation
Clone the repository, then install project dependencies and Playwright browser binaries:

```bash
npm install
npx playwright install --with-deps
```

### Running Tests

Run all tests in headline mode:
```bash
npx playwright test --headed
```

Run tests specifically for Google Chrome only:
```bash
npx playwright test --project=chromium
```

## Reporting & Debugging

The framework uses multiple reporting strategies out-of-the-box (`playwright.config.ts`):
- **HTML Report**: Automatically generated at `playwright-report/index.html`.
- **JUnit XML Report**: Generated at `playwright-report/results.xml` (perfect for CI/CD integrations).

### Tracing and Screenshots
On failure, Playwright is configured to automatically retain:
- High resolution **Screenshots**
- Full **Video** recordings of the test execution
- Comprehensive **Traces** (viewable via `npx playwright show-trace path/to/trace.zip`)

## Continuous Integration
Tests are configured to automatically trigger on GitHub push and PR creations against master/main using **GitHub Actions**. Refer to the `.github/workflows/ui-tests.yml` or `ci/README.md` for specifics on the CD workflow pipeline.
