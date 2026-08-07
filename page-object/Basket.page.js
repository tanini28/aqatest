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

    }

    async checkTotalPrice(){
        await this.checkoutButton.click();
        await this.page.waitForURL('/checkout');
    }
}