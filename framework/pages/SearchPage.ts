import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { PAGE_ROUTE } from '../constants/PageRoute';

export class SearchPage extends BasePage {

    private readonly searchInputBox: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInputBox = page.locator('.oxd-main-menu-search input');
    }

    async navigateToSearchEngine(): Promise<void> {
        await this.goto(PAGE_ROUTE.search);
    }

    async searchFor(query: string): Promise<void> {
        await this.fillInput(this.searchInputBox.first(), query, 'Search Input Box');
    }


    async getSearchResults(): Promise<Locator> {
        return this.page.locator('.oxd-main-menu-item-wrapper');
    }
}
