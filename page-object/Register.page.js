
export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.registerBtn = page.locator('[id="login-register-button"]');
        this.firstNameField = page.locator('[id="register-first-name"]');
        this.lastNameField = page.locator('[id="register-last-name"]');
        this.emailField = page.locator('[id="register-email"]');
        this.passwordField = page.locator('[id="register-password"]');
        this.cityField = page.locator('[id="register-city"]');
        this.countryDropDown = page.locator('[id="register-country"]');
        this.phoneField = page.locator('[id="register-phone"]');
        this.streetField = page.locator('[id="register-street"]');
        this.zipCodeField = page.locator('[id="register-zip"]');
        this.submitRegistrationBtn = page.locator('[id="register-button"]');
    }

    async navigate() {
        await this.page.goto('https://aqa-app.vercel.app/login');
    }

    async fillRegistrationForm(testData){
        await this.registerBtn.waitFor();
        await this.registerBtn.click();
        await this.firstNameField.waitFor();
        await this.firstNameField.fill(testData.firstName);
        await this.lastNameField.waitFor();
        await this.lastNameField.fill(testData.lastName);
        await this.emailField.waitFor();
        await this.emailField.fill(testData.email);
        await this.passwordField.waitFor();
        await this.passwordField.fill(testData.password);
        await this.cityField.waitFor();
        await this.cityField.fill(testData.city);
        await this.countryDropDown.waitFor();
        await this.countryDropDown.selectOption(testData.country);
        await this.phoneField.waitFor();
        await this.phoneField.fill(testData.phoneNumber);
        await this.streetField.waitFor();
        await this.streetField.fill(testData.street);
        await this.zipCodeField.waitFor();
        await this.zipCodeField.fill(testData.zipCode);
        await this.submitRegistrationBtn.click();

    }

}