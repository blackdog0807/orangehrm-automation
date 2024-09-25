import {Locator, Page} from "@playwright/test"

export class ViewEmployeeListPage {
    public readonly employeeListLink: Locator
    public readonly employeeInformationHeading: Locator
    public readonly employeeNameTextBox: Locator
    public readonly employeeIDTextBox: Locator
    public readonly employeeSearchButton: Locator
    public readonly employeesTable: Locator

    constructor(page: Page) {
        this.employeeListLink = page.getByRole('link', {name: 'Employee List'})
        this.employeeInformationHeading = page.getByRole('heading', {name: 'Employee Information'})
        this.employeeNameTextBox = page.getByPlaceholder('Type for hints...').first()
        this.employeeIDTextBox = page.getByRole('textbox').nth(2)
        this.employeeSearchButton = page.getByRole('button', { name: 'Search' })
        this.employeesTable = page.locator('div.oxd-table-row--clickable').first()
    }

    async clickEmployeeLink() {
        await this.employeeListLink.click()
    }

    async fillEmployeeNameTextBox(employeeName: string) {
        await this.employeeNameTextBox.fill(employeeName)
    }

    async fillEmployeeIDTextBox(employeeId: string) {
        await this.employeeIDTextBox.fill(employeeId)
    }

    async clickEmployeeSearchButton() {
        await this.employeeSearchButton.click()
    }

    async findInEmployeesTable(employeeId: string, employeeName: string, employeeLastName: string) {
        const secondDiv = await this.employeesTable.locator('div.oxd-padding-cell').nth(1)
        const thirdDiv = await this.employeesTable.locator('div.oxd-padding-cell').nth(2)
        const fourthDiv = await this.employeesTable.locator('div.oxd-padding-cell').nth(3)

        const secondDivText = await secondDiv.innerText()
        const thirdDivText = await thirdDiv.innerText()
        const fourthDivText = await fourthDiv.innerText()

        const idIsCorrect = secondDivText === employeeId
        const nameIsCorrect = thirdDivText === employeeName
        const lastNameIsCorrect = fourthDivText === employeeLastName

        if (!idIsCorrect && !nameIsCorrect && !lastNameIsCorrect) {
            throw new Error(`Employee not found. Expected: [ID: ${employeeId}, Name: ${employeeName}, LastName: ${employeeLastName}], Found: [ID: ${secondDivText}, Name: ${thirdDivText}, LastName: ${fourthDivText}]`)
        } else {
            return true
        }
    }
}