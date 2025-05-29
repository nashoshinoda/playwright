const { test, expect } = require("@playwright/test");

test("@Webst Client App login", async ({ page }) => {
  const email = "anshika@gmail.com";
  const productName = "ADIDAS ORIGINAL";

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForLoadState("networkidle"); // Wait until the API response ended.
  await page.locator(".card-body b").first().waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: /Add To Cart/i })
    .click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: /Cart/i })
    .click();
  await page.locator("div li").first().waitFor();
  expect(await page.getByText(productName)).toBeVisible();

  await page.getByRole("button", { name: /checkout/i }).click(); // Go to the checkout page.

  await page.getByPlaceholder("Select Country").pressSequentially("ind"); // Country auto-suggestive dropdown
  await page.getByRole("button", { name: /india/i }).nth(1).click(); // Select India from the auto-suggestive dropdown
  await page.getByText("PLACE ORDER").click(); // Press the PLACE ORDER button.
  await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

  await page.pause();
});
