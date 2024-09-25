import { Locator, Page } from '@playwright/test'

export class PIMPage {
    public readonly pimLink: Locator
    public readonly moreListItem: Locator


    constructor(page: Page) {
        this.pimLink = page.getByRole('link', {name: 'PIM'})
        this.moreListItem = page.locator('//span[text()="More "]')
    }

    async clickPimLink() {
        await this.pimLink.click()
    }

    async clickMoreListItem() {
        await this.moreListItem.click()
    }
}