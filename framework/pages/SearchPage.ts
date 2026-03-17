import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { PAGE_ROUTE } from '../constants/PageRoute';

export class SearchPage extends BasePage {
    // Locators
    private readonly searchInputBox: Locator;

    constructor(page: Page) {
        super(page);
        // OrangeHRM has a prominent search box in the left-hand navigation menu
        this.searchInputBox = page.locator('.oxd-main-menu-search input');
    }

    /**
     * Navigate to the search engine / dashboard
     */
    async navigateToSearchEngine(): Promise<void> {
        await this.goto(PAGE_ROUTE.search);
    }

    /**
     * Perform a search query in the left nav menu.
     */
    async searchFor(query: string): Promise<void> {
        await this.fillInput(this.searchInputBox.first(), query, 'Search Input Box');
    }
    
    /**
     * Get the search results locator to verify (the matching menu item)
     */
    async getSearchResults(): Promise<Locator> {
        // OrangeHRM filters the menu items live as you type
        return this.page.locator('.oxd-main-menu-item-wrapper');
    }
}
