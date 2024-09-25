import {Locator, Page} from "@playwright/test"

export class ViewPersonalDetailsPage {
    private page: Page
    public readonly personalDetailsHeading: Locator
    public readonly employeeIdTextBox: Locator
    public readonly employeeFirstNameTextBox: Locator
    public readonly employeeMiddleNameTextBox: Locator
    public readonly employeeLastNameTextBox: Locator
    public readonly licenseTextBox: Locator
    public readonly licenseExpiryDateTextbox: Locator
    public readonly nationalitySelector: Locator
    public readonly maritalStatusSelector: Locator
    public readonly dateOfBirthTextBox: Locator
    public readonly genderMaleInput: Locator
    public readonly genderFemaleInput: Locator
    public readonly saveButton: Locator

    constructor(page: Page) {
        this.page = page
        this.personalDetailsHeading = page.getByRole('heading', {name: "Personal Details"})
        this.employeeIdTextBox = page.locator('//div[label[text()="Employee Id"]]//following-sibling::div//input')
        this.employeeFirstNameTextBox = page.getByPlaceholder('First Name')
        this.employeeMiddleNameTextBox = page.getByPlaceholder('Middle Name')
        this.employeeLastNameTextBox = page.getByPlaceholder('Last Name')
        this.licenseTextBox = page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/}).getByRole('textbox').first()
        this.licenseExpiryDateTextbox = page.getByPlaceholder('yyyy-dd-mm').first()
        this.nationalitySelector = page.locator('//div[label[text()="Nationality"]]//following-sibling::div//i')
        this.maritalStatusSelector = page.locator('//div[label[text()="Marital Status"]]//following-sibling::div//i')
        this.dateOfBirthTextBox = page.locator('div').filter({ hasText: /^Date of BirthGenderMaleFemale$/}).getByPlaceholder('yyyy-dd-mm')
        this.genderMaleInput = page.locator('label').filter({ hasText: /^Male$/ }).locator('span')
        this.genderFemaleInput = page.locator('label').filter({ hasText: /^Female$/ }).locator('span')
        this.saveButton = page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button')
    }

    async fillLicenseTextBox(license: string) {
        await this.licenseTextBox.fill(license)
    }

    async fillLicenseExpiryTextBox(expirydate: string) {
        await this.licenseExpiryDateTextbox.fill(expirydate)
    }

    async selectNationalityListBox(nationality: string) {
        await this.nationalitySelector.click()
        let nationalityOption: Locator
        nationalityOption = this.page.getByRole('option', {name: nationality})
        await nationalityOption.click()
    }

    async selectMaritalStatusListBox(maritalStatus: string) {
        await this.maritalStatusSelector.click()
        let maritalStatusOption: Locator
        maritalStatusOption = this.page.getByRole('option', {name: maritalStatus})
        await maritalStatusOption.click()
    }

    async fillDateOfBirthTextBox(dateOfBirth: string) {
        await this.dateOfBirthTextBox.fill(dateOfBirth)
    }

    async selectGenderInput(gender: string) {
        if(gender == 'Male') {
            await this.genderMaleInput.click()
        } else {
            await this.genderFemaleInput.click()
        }
    }

    async clickSaveButton() {
        await this.saveButton.click()
    }

    async inputValueEmployeeIdTextBox(): Promise<string> {
        return await this.employeeIdTextBox.inputValue()
    }

    async inputValueFirstNameBox(): Promise<string> {
        return await this.employeeFirstNameTextBox.inputValue()
    }

    async inputValueMiddleNameBox(): Promise<string> {
        return await this.employeeMiddleNameTextBox.inputValue()
    }

    async inputValueLastNameBox(): Promise<string> {
        return await this.employeeLastNameTextBox.inputValue()
    }
}