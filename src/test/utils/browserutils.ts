import path from 'path'
import {promises as fs} from 'fs'
import { Page } from 'playwright'

export class BrowserManager {

  public async takeScreenshot(page: Page): Promise<string> {
    const time = new Date()
    const timestamp = time.toISOString().replace(/:/g, '-').split('.')[0]
    const screenshotPath = path.join('src/test/evidence', `screenshot_${timestamp}.png`)

    await fs.mkdir(path.dirname(screenshotPath), { recursive: true })
    await page.screenshot({ path: screenshotPath, fullPage: true })

    return screenshotPath
  }
}

export const browserManager = new BrowserManager()