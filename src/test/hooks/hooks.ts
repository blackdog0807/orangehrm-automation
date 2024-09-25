import {AfterAll, BeforeAll} from "@cucumber/cucumber"
import { chromium, Browser, Page } from "playwright"
import {pagesFixture} from "./pagesFixture"

let page: Page
let browser: Browser

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    pagesFixture.page = page
})

AfterAll(async function () {
    await page.close()
    await browser.close()
})