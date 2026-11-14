const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { CartPage } = require('../pages/CartPage');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

});

test('adds one product to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await expect(inventoryPage.cartBadge).toHaveText('1');

});

test('adds two products to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
  await expect(inventoryPage.cartBadge).toHaveText('2');

});

test('removes a product from the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.removeItem('sauce-labs-bike-light');
  await expect(inventoryPage.cartBadge).toBeHidden();

});

test('completes the full checkout', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.openCart();
  const cartPage = new CartPage(page);
  await expect(cartPage.title).toHaveText('Your Cart');
  await cartPage.checkout();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
  await checkoutPage.finishOrder();
  await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});

