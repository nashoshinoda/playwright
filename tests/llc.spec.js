import { test, expect } from "@playwright/test";

test("Playwright Special locators", async ({ page }) => {
  const username = "Nasho Shinoda",
    email = "nasho.shinoda@gmail.com",
    password = "Testing123",
    productName = "iphone X";

  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.locator("input.form-control[name='name']").fill(username);
  await page.locator("input.form-control[name='email']").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Gender").selectOption("Male");
  await page.getByLabel("Employed").check();
  await page.getByRole("button", { name: /submit/i }).click();

  expect(
    await page
      .getByText("Success! The Form has been submitted successfully!.")
      .isVisible()
  );

  // Navigate to the Shop page.
  await page.getByRole("link", { name: /shop/i }).click();
  expect(await page.locator("h1.my-4").isVisible());

  // Pick the product iPhone X
  await page
    .locator("app-card")
    .filter({ hasText: productName })
    .getByRole("button", { name: /Add /i })
    .click();

  // Go to the Checkout page
  await page.locator(".nav-item.active a").click();
  expect(await page.locator("h4.media-heading a")).toContainText(productName);

  await page.pause();
});
