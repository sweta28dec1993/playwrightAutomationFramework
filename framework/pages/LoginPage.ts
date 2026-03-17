import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { PAGE_ROUTE } from '../constants/PageRoute';

export class LoginPage extends BasePage {
    // Locators
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly flashMessage: Locator;
    private readonly headerArea: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.flashMessage = page.locator('.oxd-alert-content-text'); // Invalid credentials alert
        this.headerArea = page.locator('.oxd-topbar-header-breadcrumb h6'); // Dashboard header
    }

    /**
     * Navigate to the login page.
     */
    async navigateToLogin(): Promise<void> {
        await this.goto(PAGE_ROUTE.login);
    }

    async login(username: string, pass: string): Promise<void> {
        await this.fillInput(this.usernameInput, username, 'Username Field');
        await this.fillInput(this.passwordInput, pass, 'Password Field');
        await this.clickElement(this.loginButton, 'Login Button');
    }

    async getFlashMessage(): Promise<string | null> {
        return await this.getText(this.flashMessage, 'Flash Message Alert');
    }

    async getSecureAreaHeader(): Promise<string | null> {
        return await this.getText(this.headerArea, 'Secure Area Header');
    }
}
