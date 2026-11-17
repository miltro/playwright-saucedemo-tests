# Playwright SauceDemo Tests

Automated end-to-end UI tests for [saucedemo.com](https://www.saucedemo.com), a demo e-commerce site built for practicing test automation, plus API tests for [JSONPlaceholder](https://jsonplaceholder.typicode.com), a fake REST API.

The project uses **Playwright** with **JavaScript** and follows the **Page Object Model (POM)** pattern.

## Tech stack

- [Playwright](https://playwright.dev/) – test runner and browser automation
- JavaScript (Node.js)
- Page Object Model
- Playwright `request` fixture for API testing
- [Postman](https://www.postman.com/) for manual and scripted API testing

## Test coverage

### Login (`tests/login.spec.js`)
- Successful login with valid credentials
- Login with a wrong password shows an error message
- Login with a locked-out user shows an error message

### Cart and checkout (`tests/cart.spec.js`)
- Adding one product to the cart updates the cart badge
- Adding two products to the cart updates the cart badge
- Removing a product from the cart hides the cart badge
- Full checkout flow: add product → cart → checkout form → finish → order confirmation

### Checkout form validation (`tests/checkout-form.spec.js`)
- Empty first name shows "First Name is required"
- Empty last name shows "Last Name is required"
- Empty postal code shows "Postal Code is required"

### API – CRUD (`tests/api.spec.js`)
- GET a single user returns 200 and the correct data (incl. nested `address.city`)
- GET a non-existent user returns 404
- GET the user list returns 10 users
- POST creates a new post (201) and returns the sent data
- PUT updates a post (200) and returns the new title
- DELETE removes a post (200)

> JSONPlaceholder is a fake API: it does not really save, change or delete data. A real DELETE test would also verify the post is gone (GET → 404); this check is included as a comment in the test.

### Postman collection (`postman/`)
- The same CRUD scenarios as a Postman collection with `pm.test` scripts (10 tests)
- Uses a `{{baseUrl}}` collection variable
- To run it: in Postman click **Import**, select the file from `postman/`, then run the collection with the **Collection Runner**

## Project structure

```
pages/                   Page Objects (locators + actions for each page)
  LoginPage.js
  InventoryPage.js
  CartPage.js
  CheckoutPage.js
tests/                   Test files
  login.spec.js
  cart.spec.js
  checkout-form.spec.js
  api.spec.js
postman/                 Postman collection (API tests)
playwright.config.js     Playwright configuration
```

## How to run

Requirements: [Node.js](https://nodejs.org/) installed.

```bash
# install dependencies
npm install

# install the Chromium browser for Playwright
npx playwright install chromium

# run all tests
npm test

# run tests in Playwright UI mode
npm run test:ui

# open the HTML report after a test run
npx playwright show-report
```

> Note: the config runs the browser in headed mode with `slowMo` so the test steps are easy to follow while learning. Set `headless: true` and remove `slowMo` in `playwright.config.js` for faster runs.

## What I practiced

- Writing positive and negative test cases
- Finding locators with browser DevTools (`id`, `class`, `data-test` attributes)
- Assertions: `toHaveText`, `toContainText`, `toBeHidden`, `toHaveURL`, `toBe`, `toHaveLength`
- Avoiding false positives by deliberately breaking tests
- `beforeEach` hooks to avoid repeated setup
- Page Object Model with JavaScript classes
- API testing: HTTP methods (CRUD), status codes, checking JSON response bodies
- Postman: collections, variables, test scripts and the Collection Runner
- Verifying state, not just status codes (and recognizing test environment limitations)
- Git and GitHub basics
