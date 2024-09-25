import { Locator, Page } from '@playwright/test'

export class DashboardPage {
    public readonly userDropDown: Locator

    constructor(page: Page) {
        this.userDropDown = page.locator("li[class='oxd-userdropdown']")
    }

}