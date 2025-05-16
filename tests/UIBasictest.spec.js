const {test, expect} = require('@playwright/test');

test.only("Browser Context Playwright test", async ({browser}) => {  // .only specifies we want to run only this test. browser is a fixture
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

