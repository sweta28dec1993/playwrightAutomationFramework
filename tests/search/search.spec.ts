import { test, expect } from '@playwright/test';
import { SearchPage } from '../../framework/pages/SearchPage';
import { LoginPage } from '../../framework/pages/LoginPage';
import { TEST_DATA } from '../../framework/constants/TestData';

test.describe('Search functionality on OrangeHRM Dashboard', () => {
    let searchPage: SearchPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        // OrangeHRM requires login to reach the dashboard to search the menu
        loginPage = new LoginPage(page);
        searchPage = new SearchPage(page);
        
        await loginPage.navigateToLogin();
        await loginPage.login(TEST_DATA.login.validUser, TEST_DATA.login.validPassword);
        
        // Wait for dashboard to load
        await page.waitForURL('**/dashboard/index');
    });

    test('should search the navigation menu and display related results', async () => {
        const query = TEST_DATA.search.query; // e.g. "Admin"
        
        // Search the left hand menu
        await searchPage.searchFor(query);
        
        // Assert that results appeared (filter the menu items)
        const resultElement = await searchPage.getSearchResults();
        await resultElement.first().waitFor({ state: 'visible', timeout: 15000 });
        
        // Assert content is filtered correctly
        const content = await resultElement.first().textContent();
        expect(content?.toLowerCase()).toContain(query.toLowerCase());
    });
});
