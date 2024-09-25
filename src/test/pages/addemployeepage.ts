import {Locator, Page} from "@playwright/test"

export class AddEmployeePage {
    public readonly addEmployeeLink: Locator
    public readonly attachPhotoInput: Locator
    public readonly firstNameTextBox: Locator
    public readonly middleNameTextBox: Locator
    public readonly lastNameTextBox: Locator
    public readonly idTextBox: Locator
    public readonly saveButton: Locator

    constructor(page: Page) {
        this.addEmployeeLink = page.getByRole('link', {name: 'Add Employee'})
        this.attachPhotoInput = page.locator("input[type='file']")
        this.firstNameTextBox = page.getByRole('textbox', {name: 'First Name'})
        this.middleNameTextBox = page.getByRole('textbox', {name: 'Middle name'})
        this.lastNameTextBox = page.getByRole('textbox', {name: 'Last Name'})
        this.idTextBox = page.locator('form').getByRole('textbox').nth(4)
        this.saveButton = page.getByRole('button', {name: 'Save'})
    }

    async clickAddEmployeeLink() {
        await this.addEmployeeLink.click()
    }

    async attachProfilePhoto(photo: string) {
        await this.attachPhotoInput.setInputFiles(photo)
    }

    async fillFirstNameTextBox(firstName: string) {
        await this.firstNameTextBox.fill(firstName)
    }

    async fillMiddleNameTextBox(middleName: string) {
        await this.middleNameTextBox.fill(middleName)
    }

    async fillLastNameTextBox(lastName: string) {
        await this.lastNameTextBox.fill(lastName)
    }

    async fillIdTextBox() {
        await this.idTextBox.fill('')
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            result += characters[randomIndex]
        }
        await this.idTextBox.fill(result)
    }

    async clickSaveButton() {
        await this.saveButton.click()
    }
}