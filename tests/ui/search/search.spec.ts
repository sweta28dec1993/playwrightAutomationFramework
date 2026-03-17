import { test, expect } from '@playwright/test';
import { SearchPage } from '../../../framework/pages/SearchPage';
import { LoginPage } from '../../../framework/pages/LoginPage';
import { TEST_DATA } from '../../../framework/constants/TestData';

test.describe('Search functionality on OrangeHRM Dashboard', () => {
    let searchPage: SearchPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        searchPage = new SearchPage(page);

        await loginPage.navigateToLogin();
        await loginPage.login(TEST_DATA.login.validUser, TEST_DATA.login.validPassword);

        await page.waitForURL('**/dashboard/index');
    });

    test('should search the navigation menu and display related results', async () => {
        const query = TEST_DATA.search.query;
        await searchPage.searchFor(query);

        const resultElement = await searchPage.getSearchResults();
        await resultElement.first().waitFor({ state: 'visible', timeout: 15000 });

        const content = await resultElement.first().textContent();
        expect(content).not.toBeNull();
        expect(content?.toLowerCase()).toContain(query.toLowerCase());
    });
});
