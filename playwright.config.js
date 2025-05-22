// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests', // ./tests will run all the tests. Adding a '/' at the end let us specify a single test case.
  reporter: 'allure-playwright',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    launchOptions: {
      args: ["--start-maximized"]
    }
  },
  projects: [
    {
      name: 'firefox',
      use: {
        viewport: null, // Not specific viewport
        headless: false // Open the browser
      },
    },
  ],
});

module.exports = config;
