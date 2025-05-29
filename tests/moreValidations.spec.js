const { test, expect } = require("@playwright/test");

test("Popup validations", async ({ page }) => {
  const expectedResult = "13,522";
  await page.goto("https://rahulshettyacademy.com/AutomationPractice");
  /*
    await page.goto("https://www.google.com.mx");
    // Navigation methods
    await page.goBack();
    await page.goForward();
    */
  await page.locator("#show-textbox").click(); // Clicking the Show button.
  await expect(page.locator("#displayed-text")).toBeVisible(); // Validating the Input field is shown.

  await page.getByRole("button", { name: /Hide/i }).click(); // Clicking the Hide button.
  await expect(page.locator("#displayed-text")).toBeHidden(); // Validating the Input field is hidden.

  await page.locator("#confirmbtn").click(); // Clicking the Confirm button to open a pop-up confirmation message.
  await page.on("dialog", (dialog) => dialog.accept()); // Clicking the Accept button from the pop-up confirmation message.

  await page.locator("#confirmbtn").click(); // Clicking the Confirm button to open a pop-up confirmation message.
  await page.on("dialog", (dialog) => dialog.dismiss()); // Clicking the Cancel button from the pop-up confirmation message.

  await page.locator("#mousehover").hover(); // Handling the mouse over method.

  // Handling iframes
  const iframe = await page.frameLocator("#courses-iframe");

  await iframe.locator("li a[href*='lifetime-access']:visible").click();

  const numberOfAllAccessPage = await iframe
    .locator(".text h2 span")
    .textContent();
  expect(numberOfAllAccessPage === expectedResult) < (await page.pause());
});
