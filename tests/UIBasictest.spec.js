const {test, expect} = require('@playwright/test');
import * as allure from "allure-js-commons";

test("Browser Context Playwright test", async ({browser}) => {  // .only specifies we want to run only this test. browser is a fixture
    const context = await browser.newContext();
    const page = await context.newPage();
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const validUsername = "rahulshettyacademy"
    const validPassword = "learning"

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await usernameField.type("rahulshetty");
    await passwordField.type(validPassword);
    await page.locator("#signInBtn").click();

    console.log(await page.locator("[style*='block']").textContent());   // textContext extracts the content from an element by 30s (set in the playwright.config.js)
    await expect(page.locator("[style*='block']")).toContainText(/Incorrect username\/password/);

    await usernameField.fill("");
    await usernameField.type(validUsername);
    await signInBtn.click();

    await expect(page.getByText("Shop Name")).toBeVisible();
});

test("Page Playwright test", async ({page}) => {
    await page.goto("https://www.google.com.mx/");

    console.log(await page.title());
    await expect(page).toHaveTitle(/Google/)    // You could use ("Google") too.
});

test("UI Controls", async ({page}) => {
    await allure.issue("https://www.google.com.mx", "Google");    // Testing the inclusion of an issue in the Allure Report document.

    const usernameField = page.locator("#username");
    const dropdown = page.locator("select.form-control");
    const radioTxtStudy = page.locator(".radiotextsty").last();
    const blinkingTxt = page.locator("[href*='documents-request']");
    const signInBtn = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await radioTxtStudy.click();
    await page.locator("#okayBtn").click();
    await dropdown.selectOption("consult");
    // Assertion
    await expect(radioTxtStudy).toBeChecked();

    await page.locator("#terms").click();
    // Assertion
    await expect(page.locator("#terms")).toBeChecked();
    
    await page.locator("#terms").uncheck();
    // Assertion
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    // Assertion
    await expect(blinkingTxt).toHaveAttribute("class", "blinkingText");
    // await page.pause();
});

test.only("@Child window handling", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator("[href*='documents-request']");
    const usernameField = page.locator("#username");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const [newPage] = await Promise.all(    // Takes an iterable of promises as input and returns a single Promise.
        [
            context.waitForEvent('page'),   // Listen for any new page pending, rejected, fulfilled
            documentLink.click(),
        ]
    ); // A new window is open

    const childPageTxt = await newPage.locator(".red").textContent();
    const arrayText = childPageTxt.split("@");
    const domain = arrayText[1].split(" ")[0];

    console.log(domain);
    await page.locator("#username").type(domain);
    await page.pause();

    console.log(await page.locator("#username").textContent());

});

