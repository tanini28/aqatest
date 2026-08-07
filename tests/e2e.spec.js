import {expect, test} from '@playwright/test';

import {newUser1} from '../data/testData';
import {cardData} from '../data/testData';

import {RegisterPage} from '../page-object/Register.page';
import {LoginPage} from '../page-object/Login.page';
import {CatalogPage} from '../page-object/Catalog.page';
import {BasketPage} from '../page-object/Basket.page';
import {CheckoutPage} from '../page-object/Checkout.page';
import {MyAccountPage} from '../page-object/MyAccount.page';

test.setTimeout(50 * 1000);
test('Create user, login, order 2 items, payment', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);
    const basketPage = new BasketPage(page);

    await registerPage.openLoginPage();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    const items =  await catalogPage.selectProduct();

    await expect(catalogPage.basketCount).toBeVisible();
    await expect(catalogPage.basketCount).toContainText('2', {timeout: 3000 });

    await catalogPage.gotoBasket();

//Check product details
    await expect(basketPage.firstProductItem).toHaveText(items.firstProduct.name);
    await expect(basketPage.secondProductItem).toHaveText(items.secondProduct.name);
    await expect(basketPage.firstItemPrice).toHaveText(items.firstProduct.price);
    await expect(basketPage.secondItemPrice).toHaveText(items.secondProduct.price);

    const firstProductPriceNumber  = Number((await basketPage.firstItemPrice.innerText()).replace(/\D/g, ''));
    const secondProductPriceNumber  = Number((await basketPage.secondItemPrice.innerText()).replace(/\D/g, ''));
    const totalNumber  = parseInt((await basketPage.totalValue.innerText()).replace(/[^\d.]/g, ''), 10);
    expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);

    await basketPage.checkTotalPrice();

    await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);

    await expect(checkoutPage.successOrder).toBeVisible({timeout: 8000});
    await expect(checkoutPage.page).toHaveURL('/checkout');

    await checkoutPage.goToMyAccount();

    await expect(checkoutPage.page).toHaveURL('/account');

    const totalPrice = Number(items.firstProduct.price.replace('$', '')) + Number(items.secondProduct.price.replace('$', ''));
    await expect(myAccountPage.totalAmountField).toContainText(`${totalPrice}`);

    await expect(myAccountPage.items.first()).toBeVisible();
    await expect(myAccountPage.items.last()).toBeVisible();
    await expect(myAccountPage.logoutButton).toBeEnabled();

    await myAccountPage.logout();
});