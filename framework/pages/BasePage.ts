import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string): Promise<void> {
        Logger.step(`Navigating to URL: ${url}`);
        try {
            await this.page.goto(url);
        } catch (error) {
            Logger.error(`Failed to navigate to URL: ${url}`, error);
            throw error;
        }
    }

    async clickElement(locator: Locator, description: string): Promise<void> {
        Logger.step(`Clicking on: ${description}`);
        try {
            await locator.waitFor({ state: 'visible' });
            await locator.click();
        } catch (error) {
            Logger.error(`Failed to click on: ${description}`, error);
            throw error;
        }
    }

    async fillInput(locator: Locator, text: string, description: string): Promise<void> {
        Logger.step(`Filling text into: ${description}`);
        try {
            await locator.waitFor({ state: 'visible' });
            await locator.fill(text);
        } catch (error) {
            Logger.error(`Failed to fill text into: ${description}`, error);
            throw error;
        }
    }

    async getText(locator: Locator, description: string): Promise<string | null> {
        Logger.step(`Getting text from: ${description}`);
        try {
            await locator.waitFor({ state: 'visible' });
            return await locator.textContent();
        } catch (error) {
            Logger.error(`Failed to get text from: ${description}`, error);
            throw error;
        }
    }

    /**
     * Check if an element is visible.
     */
    async isVisible(locator: Locator, description: string): Promise<boolean> {
        Logger.step(`Checking visibility for: ${description}`);
        try {
            return await locator.isVisible();
        } catch (error) {
            Logger.error(`Failed to check visibility for: ${description}`, error);
            return false;
        }
    }

    /**
     * Get the HTML content of the page.
     */
    async getPageContent(): Promise<string> {
        try {
            return await this.page.content();
        } catch (error) {
            Logger.error(`Failed to get page content`, error);
            throw error;
        }
    }
}
