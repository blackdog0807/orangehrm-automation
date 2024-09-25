import { Then, When } from "@cucumber/cucumber"
import { readFileSync } from "fs"
import { browserManager } from "../utils/browserutils"
import { pagesFixture } from "../hooks/pagesFixture"
import { PIMPage } from "../pages/pimpage"
import { ViewEmployeeListPage } from "../pages/viewemployeelistpage"
import { AddEmployeePage } from "../pages/addemployeepage"
import { ViewPersonalDetailsPage } from "../pages/viewpersonaldetailspage"

When('el usuario ingresa a las seccion PIM', {timeout: 30000}, async function () {
    try{
        let pimPage = new PIMPage(pagesFixture.page)

        await pimPage.clickPimLink()

        let employeeListPage = new ViewEmployeeListPage(pagesFixture.page)

        await employeeListPage.employeeInformationHeading.waitFor({timeout: 5000, state: 'visible'})

        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    } catch (error) {
        console.error('Error capturado:', error)
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    }
})

Then('el usuario crea un nuevo empleado con foto {string}, nombre {string}, segundo nombre {string} y apellido {string}', {timeout: 30000}, async function (photo: string, firstname: string, middlename: string, lastname: string) {
    try {
        let pimPage = new PIMPage(pagesFixture.page)
        let addEmployeePage = new AddEmployeePage(pagesFixture.page)

        if(!await addEmployeePage.addEmployeeLink.isVisible()){
            await pimPage.clickMoreListItem()
            await addEmployeePage.clickAddEmployeeLink()
        } else {
            await addEmployeePage.clickAddEmployeeLink()
        }

        await addEmployeePage.saveButton.waitFor({timeout: 5000, state: 'visible'})

        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")

        await addEmployeePage.attachProfilePhoto(photo)
        await addEmployeePage.fillFirstNameTextBox(firstname)
        await addEmployeePage.fillMiddleNameTextBox(middlename)
        await addEmployeePage.fillLastNameTextBox(lastname)
        await addEmployeePage.fillIdTextBox()

        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")

        await addEmployeePage.clickSaveButton()
    } catch (error) {
        console.error('Error capturado:', error)
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    }
})

When('el usuario detalla los datos personales del nuevo empleado con licencia de conducir {string}, fecha de expiracion de licencia {string}, nacionalidad {string}, estado civil {string}, fecha de cumpleaños {string} y genero {string}', {timeout: 30000}, async function ( license: string, expirydate: string, nationality: string, maritalStatus: string, birthDate: string, gender: string) {
    try {
        let personalDetalisPage = new ViewPersonalDetailsPage(pagesFixture.page)

        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")

        this.employeeId = await personalDetalisPage.inputValueEmployeeIdTextBox()
        this.employeeFirstName = await personalDetalisPage.inputValueFirstNameBox()
        this.employeeMiddleName = await personalDetalisPage.inputValueMiddleNameBox()
        this.employeeName = this.employeeFirstName + " " + this.employeeMiddleName
        this.employeeLastName = await personalDetalisPage.inputValueLastNameBox()

        await pagesFixture.page.waitForLoadState('networkidle')

        await personalDetalisPage.fillLicenseTextBox(license)
        await personalDetalisPage.fillLicenseExpiryTextBox(expirydate)
        await personalDetalisPage.selectNationalityListBox(nationality)
        await personalDetalisPage.selectMaritalStatusListBox(maritalStatus)
        await personalDetalisPage.fillDateOfBirthTextBox(birthDate)
        await personalDetalisPage.selectGenderInput(gender)

        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")

        await personalDetalisPage.clickSaveButton()
    } catch (error) {
        console.error('Error capturado:', error)
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    }
})
Then('el usuario valida la creacion del nuevo empleado', async function () {
    try {
        let pimPage = new PIMPage(pagesFixture.page)
        let employeeListPage = new ViewEmployeeListPage(pagesFixture.page)

        if(!await employeeListPage.employeeListLink.isVisible()){
            await pimPage.clickMoreListItem()
            await employeeListPage.clickEmployeeLink()
        } else {
            await employeeListPage.clickEmployeeLink()
        }

        await employeeListPage.employeeInformationHeading.waitFor({timeout: 5000, state: 'visible'})

        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")

        await employeeListPage.fillEmployeeNameTextBox(this.employeeName + " " + this.employeeLastName)

        await employeeListPage.fillEmployeeIDTextBox(this.employeeId)

        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")

        await employeeListPage.clickEmployeeSearchButton()

        await employeeListPage.findInEmployeesTable(this.employeeId, this.employeeName, this.employeeLastName)

        await employeeListPage.employeesTable.waitFor({timeout: 5000, state: 'visible'})

        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    } catch (error) {
        console.error('Error capturado:', error)
        this.attach(readFileSync(await browserManager.takeScreenshot(pagesFixture.page)), "image/png")
    }
})