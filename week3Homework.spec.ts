import { chromium, expect, test } from "@playwright/test";

test("Create Lead", async ({ page }) => {
    await page.goto("https://login.salesforce.com/")
    await page.locator("#username").fill("rathinavel@testleaf.com")
    await page.locator("#password").fill("Sales@123")
    await page.locator("#Login").click()
    await page.waitForTimeout(3000)
    await page.locator(".slds-icon-waffle").click()
    await page.locator("button[aria-label='View All Applications']").click()
    await page.locator("//p[text()='Sales']").click()
    await page.locator("[title='Leads'] span").click()
    await page.locator("//button[text()='New']").click()
    await page.locator("[name='salutation']").click()
    let salute = "Mr."
    let salutationDropDownValues = await page.locator("//span[@class='slds-media__body']/span").all()
    for (const element of salutationDropDownValues) {
        let salutation = await element.innerText()
        if (salutation == salute) {
            await element.click()
            break
        }
    }
    let leadName = "Rathinavel"
    await page.locator("//input[@name='lastName']").fill(leadName)
    await page.locator("[name='Company']").fill("KPMG Global Services")
    await page.locator("[name='SaveEdit']").click()
    let leadNameCreated = await page.locator("[slot='primaryField']").innerText()
    let expectedValue = salute + " " + leadName
    expect(leadNameCreated).toContain(expectedValue)
})

test("Edit Lead", async ({ page }) => {
    await page.goto("http://leaftaps.com/opentaps/control/main")
    await page.locator("#username").fill("demosalesManager")
    await page.locator("#password").fill("crmsfa")
    await page.locator(".decorativeSubmit").click()
    await page.locator(".crmsfa a img").click()
    await page.locator("//a[text()='Leads']").click()
    await page.locator("//a[text()='Create Lead']").click()
    let companyName = "Testleaf"
    await page.locator("td [name='companyName']").fill(companyName)
    let firstName = "Rathinavel"
    let lastName = "T K"
    await page.locator("td [name='firstName']").fill(firstName)
    await page.locator("td [name='lastName']").fill(lastName)
    await page.locator(".smallSubmit").click()
    await page.locator("//a[text()='Edit']").click()
    let upadatedCompanyName = "KPMG Global Services"
    await page.locator("td [name='companyName']").fill(upadatedCompanyName)
    await page.locator("[value='Update']").click()
})

test("Create Individuals", async ({ page }) => {
    await page.goto("https://login.salesforce.com/")
    await page.locator("#username").fill("rathinavel@testleaf.com")
    await page.locator("#password").fill("Sales@123")
    await page.locator("#Login").click()
    await page.waitForTimeout(3000)
    await page.locator(".slds-icon-waffle").click()
    await page.locator("button[aria-label='View All Applications']").click()
    await page.locator("//p[text()='Individuals']").click()
    await page.locator("((//span[contains(text(), 'Individuals')])[1]/parent::a[contains(@title,'Individuals')])//following-sibling::one-app-nav-bar-item-dropdown").click()
    await page.locator("//span[text()='New Individual']").click()
    let lastName = "TKR"
    await page.getByPlaceholder("Last Name").fill(lastName)
    await page.locator("//button[@title='Save']/span").click()
    let individualTitle = page.locator("div[title='" + lastName + "']")
    await expect(individualTitle).toBeVisible()
})

test("Edit Individuals", async ({ page }) => {
    await page.goto("https://login.salesforce.com/")
    await page.locator("#username").fill("rathinavel@testleaf.com")
    await page.locator("#password").fill("Sales@123")
    await page.locator("#Login").click()
    await page.waitForTimeout(3000)
    await page.locator(".slds-icon-waffle").click()
    await page.locator("button[aria-label='View All Applications']").click()
    await page.locator("//p[text()='Individuals']").click()
    await page.locator("(//span[contains(text(), 'Individuals')])[1]/parent::a[contains(@title,'Individuals')]").click()
    let lastName = "TKR"
    await page.locator("[name='Individual-search-input']").fill(lastName)
    await page.locator("[name='Individual-search-input']").press("Enter")
    await page.locator("(//td[contains(@class,'slds-cell-edit')])[6]").click()
    await page.locator("//div[text()='Edit']").click()
    let salute = "Mr."
    let salutationDropDownValues = await page.locator(".select-options li a").all()
    for (const element of salutationDropDownValues) {
        let salutation = await element.innerText()
        if (salutation == salute) {
            await element.click()
            break
        }
    }
    let firstName = "Gokul"
    await page.getByPlaceholder("First Name").fill(firstName)
    await page.locator("//button[@title='Save']/span").click()

    let individualTitle = page.locator("//a[contains(@title,'" + firstName + "')]")
    await expect(individualTitle).toBeVisible()
})