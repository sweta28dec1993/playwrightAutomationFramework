# Framework Guide

This document explains the architecture and design patterns used in the Playwright UI Automation Framework.

## Directory Structure

- `tests/`: Contains the actual spec test files grouped by feature (e.g., `tests/login`, `tests/search`).
- `framework/`: Houses reusable automation layers.
  - `pages/`: Contains the Page Object Models (POMs) representing the web pages being tested.
  - `utils/`: Includes general utilities like loggers and test data generators.
- `ci/`: Documentation on Continuous Integration flows.
- `docs/`: Expanded documentation guides.

## Page Object Model (POM) Design

We use a BasePage class containing shared automation actions (clicks, fills， waiting logic, text validation, etc.). Operations are intentionally wrapped to incorporate Logging so we automatically capture every user interaction step without scattering `console.log` statements throughout test files.

Every Page Object should extend the `BasePage`.

```typescript
import { BasePage } from './BasePage';

export class MyCustomPage extends BasePage {
    // Locators 
    private readonly myButton: Locator;

    constructor(page) {
        super(page);
        this.myButton = page.locator('#my-btn');
    }

    async clickMyButton() {
        await this.clickElement(this.myButton, 'My Button');
    }
}
```

## Creating New Tests
Test execution is managed via Playwright's test runner which already injects the browser Page context automatically. Instantiate your custom Page Objects within tests blocks (or hooks like `beforeEach`). Maintain assertions inside the `test` specification blocks rather than inside POM classes when possible.
