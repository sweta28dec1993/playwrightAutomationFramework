import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../framework/pages/LoginPage';
import { TEST_DATA } from '../../../framework/constants/TestData';

test.describe('Login functionality on OrangeHRM', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });

    test('should login with valid credentials and verify dashboard', async () => {

        await loginPage.login(TEST_DATA.login.validUser, TEST_DATA.login.validPassword);

        const secureHeader = await loginPage.getSecureAreaHeader();
        expect(secureHeader).toContain('Dashboard');
    });

    test('should display error with invalid credentials', async () => {
        await loginPage.login(TEST_DATA.login.invalidUser, TEST_DATA.login.invalidPassword);

        const flashMessage = await loginPage.getFlashMessage();
        expect(flashMessage).toContain('Invalid credentials');
    });
});
