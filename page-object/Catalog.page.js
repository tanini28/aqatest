import {expect} from "@playwright/test";

export class CatalogPage {
    constructor(page) {
        this.page = page;
        this.coffeeMachineProduct = page.locator('[id="product-add-6"]');
        this.tabletProduct = page.locator('[id="product-add-5"]');
        this.basketCount = page.locator('[id="cart-count"]');

        this.tabletName = page.locator('[id="product-name-5"]');
        this.coffeMachineName = page.locator('[id="product-name-6"]');
        this.tabletPrice = page.locator('[id="product-price-5"]');
        this.coffeeMachinePrice = page.locator('[id="product-price-6"]');

        this.tabletNameValue = "";
        this.coffeeMachineNameValue = "";
        this.tabletPriceValue = "";
        this.coffeeMachinePriceValue = "";
    }

    async selectProduct() {
        await this.coffeeMachineProduct.click({delay: 2000});
        await this.tabletProduct.click({delay: 2000});
        await this.page.waitForLoadState("networkidle");
        await this.basketCount.waitFor();
        await expect(this.basketCount).toBeVisible();
        await expect(this.basketCount).toContainText('2', {timeout: 3000 });
        await this.saveProductInfo();
        await this.basketCount.click();
    }

    async saveProductInfo(){
        this.tabletNameValue = await this.tabletName.innerText();
        this.coffeeMachineNameValue = await this.coffeMachineName.innerText();
        this.tabletPriceValue = await this.tabletPrice.innerText();
        this.coffeeMachinePriceValue = await this.coffeeMachinePrice.innerText();


    }
}