const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
  const monthNumber = "6",
    day = "15",
    year = "2027",
    calendarSelector = ".react-date-picker__inputGroup";
  const expectedResult = [monthNumber, day, year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(calendarSelector).click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(monthNumber) - 1)
    .click();
  await page.locator("//abbr[text()='" + day + "']").click();

  const calendarInputs = await page.locator(
    "input.react-date-picker__inputGroup__input"
  );

  for (let index = 0; index < calendarInputs.length; index++) {
    const value = calendarInputs[index].getAttribute("value");

    expect(value).toEqual(expectedResult[index]);
  }

  await page.pause();
});
