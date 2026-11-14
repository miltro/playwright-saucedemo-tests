const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { CartPage } = require('../pages/CartPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.title).toHaveText('Your Cart');
    await cartPage.checkout();
});

test('shows error when first name is empty', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutForm('', 'Doe', '12345');
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
});

test('shows error when last name is empty', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutForm('John', '', '12345');
    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
});

test('shows error when postal code is empty', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutForm('John', 'Doe', '');
    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
});