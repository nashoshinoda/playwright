const {test, expect} = require('@playwright/test');

test("Browser Context Playwright test", async ({browser}) => {  // browser is a fixture
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());
});

test("Page Playwright test", async ({page}) => {
    await page.goto("https://www.google.com.mx/");

    console.log(await page.title());
    await expect(page).toHaveTitle(/Google/)    // You could use ("Google") too.
});

