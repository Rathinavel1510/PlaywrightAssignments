import { chromium, firefox, test } from "@playwright/test";

test("Log in to Salesforce", async ({ page }) => {
    await page.goto("https://login.salesforce.com/");
    await page.locator("#username").fill("rathinavel@testleaf.com");
    await page.locator("#password").fill("Sales@123");
    await page.locator("#Login").click();

    await page.waitForTimeout(20000)
    await page.waitForLoadState()
    const pageTitle = await page.title()
    const currentPageUrl = page.url()
    console.log("Page title is "+ pageTitle)
    console.log(currentPageUrl)
})

test("Red Bus and Flipkart", async () => {
    const browserInstance = await firefox.launch({ headless: false, channel: "firefox" })
    const browserContext = await browserInstance.newContext()
    const page = await browserContext.newPage()
    await page.goto("https://www.redbus.in");
  
    const browserInstance1 = await chromium.launch({ headless: false, channel: "msedge" })
    const browserContext1 = await browserInstance1.newContext()
    const page1 = await browserContext1.newPage()
    await page1.goto("https://www.flipkart.com");
    
    const pageTitle = await page.title()
    const currentPageUrl = page.url()
    console.log("Page title is "+ pageTitle)
    console.log("Page url is "+currentPageUrl)

    const pageTitle1 = await page1.title()
    const currentPageUrl1 = page1.url()
    console.log("Page title is "+ pageTitle1)
    console.log("Page url is "+currentPageUrl1)
})