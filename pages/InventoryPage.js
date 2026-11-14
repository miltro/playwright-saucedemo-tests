class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.title = page.getByTestId('title');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async addToCart(product) {
    await this.page.locator(`#add-to-cart-${product}`).click();
  }

  async removeItem(product) {
    await this.page.locator(`#remove-${product}`).click();
  }

}
module.exports = { InventoryPage };