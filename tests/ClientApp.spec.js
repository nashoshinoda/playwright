const { test, expect } = require('@playwright/test');

test('@Webst Client App login', async ({ page }) => {
    const email = "anshika@gmail.com";
    const productName = 'ADIDAS ORIGINAL';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); // Wait until the API response ended.
    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
        // Add to cart
            await products.nth(i).locator("text= Add To Cart").click();

            break;  // Stops the IF loop
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const productExists = await page.locator("h3:has-text('"+ productName +"')").isVisible();

    // Assertion
    expect(productExists).toBeTruthy();

    // Go to the checkout page.
    await page.locator("text=Checkout").click();

    // Country auto-suggestive dropdown
    await page.locator("input[placeholder*=Country]").pressSequentially("ind");
    const countryDropdown = await page.locator(".ta-results");

    await countryDropdown.waitFor();
    const countryOptionsCount = await countryDropdown.locator("button").count();

    for (let i = 0; i < countryOptionsCount; ++i) {
        const countryName = await countryDropdown.locator("button").nth(i).textContent();

        if (countryName === " India") {
            // Click the country
            await countryDropdown.locator("button").nth(i).click();

            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    // Click on the Place Order button.
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    // Go to the Orders History page.
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const ordersRows = await page.locator("tbody tr");

    for (let i = 0; i < await ordersRows.count(); ++i) {
        const orderRowId = await ordersRows.nth(i).locator("th").textContent();

        if (orderId.includes(orderRowId)) {
            await ordersRows.nth(i).locator("button").first().click();

            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();

});