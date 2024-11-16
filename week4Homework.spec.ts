import { chromium, expect, test } from "@playwright/test";
import path from "path";

test("Merge Lead", async ({ context, page }) => {
    await page.goto("http://leaftaps.com/opentaps/control/main")
    await page.locator("#username").fill("demosalesManager")
    await page.locator("#password").fill("crmsfa")
    await page.locator(".decorativeSubmit").click()
    await page.locator(".crmsfa a img").click()
    await page.locator("//a[text()='Leads']").click()
    await page.locator("//a[text()='Merge Leads']").click()

    const pagePromise = context.waitForEvent(`page`)
    await page.locator(".twoColumnForm tr a>img").first().click()
    const firstLeadPage = await pagePromise
    await firstLeadPage.locator("tbody td:first-child div>a").first().click()

    const pagePromise1 = context.waitForEvent(`page`)
    await page.locator(".twoColumnForm tr a>img").last().click()
    const secondLeadPage = await pagePromise1
    await secondLeadPage.locator("tbody td:first-child div>a").nth(2).click()

    page.on(`dialog`, alertType => {
        const alertMessage = alertType.message()
        const dialogType = alertType.type()
        console.log(`${dialogType} having the message as ${alertMessage}`)
        alertType.accept()
    })
    await page.locator("//a[text()='Merge']").click()

    page.waitForTimeout(3000)
    await expect(page).toHaveTitle("View Lead | opentaps CRM")
})

test(`File Upload`, async ({ page }) => {
    await page.goto("https://login.salesforce.com/")
    await page.locator("#username").fill("rathinavel@testleaf.com")
    await page.locator("#password").fill("Sales@123")
    await page.locator("#Login").click()
    await page.waitForTimeout(3000)
    await page.locator(".slds-icon-waffle").click()
    await page.locator("button[aria-label='View All Applications']").click()
    await page.locator("//input[@class='slds-input']").fill("Accounts")
    await page.locator("//mark[text()='Accounts']").click()
    await page.locator("div[title='New']").click()
    const accountName = "Testleaf"
    await page.locator("(//input[@class='slds-input'])[2]").fill(accountName)

    await page.locator("(//div[@class='slds-combobox_container'])[1]").click()
    await page.locator("//span[text()='Warm']").click()

    await page.locator("(//div[@class='slds-combobox_container'])[3]").click()
    await page.locator("//span[text()='Prospect']").click()

    await page.locator("(//div[@class='slds-combobox_container'])[5]").click()
    await page.locator("//span[text()='Banking']").click()

    await page.locator("(//div[@class='slds-combobox_container'])[4]").click()
    await page.locator("//span[text()='Public']").click()

    await page.locator("//button[text()='Save']").click()

    const actualAccountName = await page.locator("[slot='primaryField']").innerText()
    expect(accountName).toContain(actualAccountName)
    await page.locator("(//label[contains(@id, 'file-selector')]/span)[1]")
        .setInputFiles(path.join(__dirname, "../data/test.txt"))

    const doneButton = page.locator("//span[text()='Done']")
    await page.waitForSelector("//span[text()='Done']")
    await expect(doneButton).toBeEnabled()
    await doneButton.click()
    const uploadedFile = await page.locator("//span[@title='test']").innerText()
    expect("test").toContain(uploadedFile)
})

test(`Frame`, async ({ page }) => {
    await page.goto("https://dev240505.service-now.com/login.do")
    await page.locator("#user_name").fill("admin")
    await page.locator("#user_password").fill("AvrkKo-3+3JT")
    await page.locator("#sysverb_login").click()
    await page.locator("div[aria-label='All']").click()
    //await page.locator("input[placeholder='Filter']").fill("Service Catalog")
    //await page.locator("input[placeholder='Filter']").press('enter')
    await page.locator(".snf-collapsible-list-holder li:nth-child(3) span[class='label']").click()

    const serviceCatalogPageFrame = page.frameLocator("#gsft_main")
    await serviceCatalogPageFrame.locator("a[aria-label*='Mobiles'] h2").click()
    await serviceCatalogPageFrame.locator("//strong[text()='Apple iPhone 13']").click()
    await serviceCatalogPageFrame.locator("//label[text()='No']").click()
    await serviceCatalogPageFrame.locator("select[class*='form-control cat_item_option']").selectOption({value:'500MB'})
    //await serviceCatalogPageFrame.locator("select[class*='form-control cat_item_option'] option[value='500MB']").click()
    await serviceCatalogPageFrame.locator("(//input[@value='starlight']/parent::span)/child::label").click()
    await serviceCatalogPageFrame.locator("(//div[@role='radiogroup'])[3]/span/label").nth(2).click()
    await serviceCatalogPageFrame.locator("#oi_order_now_button").click()
    const requestNumber = await serviceCatalogPageFrame.locator("#requesturl b").innerText()
    const expectedTitle = "Order Status: "+requestNumber+" | ServiceNow"
    const orderStatus = await serviceCatalogPageFrame.locator("//span[contains(text(), 'In progress')]").innerText()
    
    await expect(page).toHaveTitle(expectedTitle)
    expect(orderStatus).toContain("Waiting for Approval (In progress)")
})