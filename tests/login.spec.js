const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test('logs in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  const inventoryPage = new InventoryPage(page);
  await expect(inventoryPage.title).toHaveText('Products');
});

test('shows error message for wrong password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'wrong_password');

  await expect(loginPage.errorMessage).toContainText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

test('shows error message for locked-out user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
});
