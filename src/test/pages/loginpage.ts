import { Locator, Page } from '@playwright/test'

export class LoginPage {
    public readonly usernameTextbox: Locator
    public readonly passwordTextbox: Locator
    public readonly loginButton: Locator

    constructor(page: Page) {
        this.usernameTextbox = page.getByRole('textbox',{name: "Username"})
        this.passwordTextbox = page.getByRole('textbox',{name: "Password"})
        this.loginButton = page.getByRole('button', {name: "Login"})
    }

    async fillUsername(username: string) {
        await this.usernameTextbox.fill(username)
    }

    async fillPassword(password: string) {
        await this.passwordTextbox.fill(password)
    }

    async clickLogin() {
        await this.loginButton.click()
    }
}