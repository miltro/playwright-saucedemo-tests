class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.completeHeader = page.getByTestId('complete-header');
        this.title = page.getByTestId('title');
        this.errorMessage = page.getByTestId('error');
    }

    async fillCheckoutForm(name, surname, postalCode) {
        await this.firstNameInput.fill(name);
        await this.lastNameInput.fill(surname);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }

}

module.exports = { CheckoutPage };