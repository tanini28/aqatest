import {expect} from "@playwright/test";

export class BasketPage{
    constructor(page, tabletNameValue, coffeeMachineNameValue, tabletPriceValue, coffeeMachinePriceValue) {
        this.page = page;
        this.firstProductItem = page.locator('[id="cart-item-name-5"]');
        this.secondProductItem = page.locator('[id="cart-item-name-6"]');

        this.firstItemPrice = page.locator('[id="cart-item-price-5"]');
        this.secondItemPrice = page.locator('[id="cart-item-price-6"]');

        this.totalValue = page.locator('[id="cart-total"]');
        this.checkoutButton = page.locator('[id="cart-checkout-button"]');

        this.removeFirstItemButton = page.locator('[id="cart-item-decrease-5"]');
        this.addFirstItemButton = page.locator('[id="cart-item-increase-5"]');

        this.tabletNameValue = tabletNameValue;
        this.coffeeMachineNameValue = coffeeMachineNameValue;
        this.tabletPriceValue = tabletPriceValue;
        this.coffeeMachinePriceValue = coffeeMachinePriceValue;

    }

    async compareProductDetails(){
        await expect(this.firstProductItem).toHaveText(this.tabletNameValue);
        await expect(this.secondProductItem).toHaveText(this.coffeeMachineNameValue);
        await expect(this.firstItemPrice).toHaveText(this.tabletPriceValue);
        await expect(this.secondItemPrice).toHaveText(this.coffeeMachinePriceValue);
    }

    async checkTotalPrice(){
        const firstProductPriceNumber  = Number((await this.firstItemPrice.innerText()).replace(/\D/g, ''));
        const secondProductPriceNumber  = Number((await this.secondItemPrice.innerText()).replace(/\D/g, ''));
        const totalNumber  = parseInt((await this.totalValue.innerText()).replace(/[^\d.]/g, ''), 10);
        expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
        await this.checkoutButton.click();
        await this.page.waitForURL('https://aqa-app.vercel.app/checkout');



    }
}