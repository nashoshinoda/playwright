const {test, expect} = require('@playwright/test');

test.only("Browser Context Playwright test", async ({page}) => {  // .only specifies we want to run only this test. browser is a fixture
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle'); // Wait until the API response ended.
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();

    console.log(titles);

});
