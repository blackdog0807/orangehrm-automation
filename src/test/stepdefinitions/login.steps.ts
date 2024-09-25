import { Given, When, Then } from '@cucumber/cucumber'
import { readFileSync } from 'fs'
import { browserManager } from '../utils/browserutils'
import { LoginPage } from '../pages/loginpage'
import { DashboardPage } from '../pages/dashboardpage'
import {pagesFixture} from "../hooks/pagesFixture"

Given('un usuario Administrador esta en la pagina de Login', {timeout: 30000}, async function () {
    try {
        await pagesFixture.page.goto("https://opensource-demo.orangehrmlive.com")
        const loginPage = new LoginPage(pagesFixture.page)
        await loginPage.loginButton.waitFor({timeout: 5000, state: 'visible'})
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")

    } catch (error) {
        console.error('Error capturado:', error)
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    }
})

When('el usuario ingresa el nombre de usuario {string} y la contraseña {string}', {timeout: 30000}, async function (username: string, password: string) {
    try {
        const loginPage = new LoginPage(pagesFixture.page)
        await loginPage.fillUsername(username)
        await loginPage.fillPassword(password)
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
        await loginPage.clickLogin()

    } catch (error) {
        console.error('Error capturado:', error)
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    }
})

Then('el usuario visualiza la pagina principal', {timeout: 30000}, async function () {
    try {
        const dashboardPage = new DashboardPage(pagesFixture.page)
        await dashboardPage.userDropDown.waitFor({timeout: 5000, state: 'visible' })
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    } catch (error) {
        console.error('Error capturado:', error)
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    }
})