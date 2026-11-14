const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    launchOptions: { slowMo: 700 },
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-test',
  },
});
