import { urlFullPath } from "../urlCreator/urlCreator";
import { clearCart } from "../urlCreator/clearCart";
describe("Тесты которые проверяют работу каталога", () => {
  beforeEach(async ({ browser }) => {
    await clearCart(browser);
  });

  it("Проверяет что в каталоге должны отображаться товары, список которых приходит с сервера :", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/catalog"));
    const productCards = await Promise.all(await browser.$$(".ProductItem"));
    expect(productCards.length).toBeGreaterThan(20);
  });

  it("Проверяет что для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре :", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/catalog"));
    const productCards = await browser.$$(".ProductItem");
    for (let product of productCards) {
      const productName = await product.$(".ProductItem-Name");
      await productName.waitForExist();
      const productNameText = await productName.getText();

      const productPrice = await product.$(".ProductItem-Price");
      await productPrice.waitForExist();
      const productPriceText = await productPrice.getText();

      const productDetailsLink = await product.$(".ProductItem-DetailsLink");
      await productDetailsLink.waitForExist();
      const productDetailsLinkHref = await productDetailsLink.getAttribute(
        "href"
      );

      expect(productNameText).toBeTruthy();
      expect(productPriceText).toBeTruthy();
      expect(productDetailsLinkHref).toMatch(/\/hw\/store\/catalog\/\d+/);
      //   console.log(`Product Name: ${productNameText}`);
      //   console.log(`Product Price: ${productPriceText}`);
      //   console.log(`Product Details Link: ${productDetailsLinkHref}`);
    }
  });

  it("Проверяет что на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка 'добавить в корзину'", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/catalog/5"));
    const product = await browser.$(".Product");
    await product.waitForExist();
    expect(await product.isDisplayed()).toBe(true);

    // Проверка наличия имени товара
    const productName = await browser.$(".ProductDetails-Name");
    expect(await productName.isDisplayed()).toBe(true);

    // Проверка наличия описания товара
    const productDescription = await browser.$(".ProductDetails-Description");
    expect(await productDescription.isDisplayed()).toBe(true);

    // Проверка наличия цены товара
    const productPrice = await browser.$(".ProductDetails-Price");
    expect(await productPrice.isDisplayed()).toBe(true);

    // Проверка наличия цвета товара
    const productColor = await browser.$(".ProductDetails-Color");
    expect(await productColor.isDisplayed()).toBe(true);

    // Проверка наличия материала товара
    const productMaterial = await browser.$(".ProductDetails-Material");
    expect(await productMaterial.isDisplayed()).toBe(true);

    // Проверка наличия кнопки 'добавить в корзину'
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    expect(await addToCartButton.isDisplayed()).toBe(true);
  });

  it("Проверяет что если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом :", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/catalog/0"));
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    // Нажимаем на кнопку в корзину
    await addToCartButton.click();
    // ждем появления элемента уведомления Item in cart
    const cartBadge = await browser.$(".CartBadge.text-success.mx-3");
    expect(await cartBadge.isDisplayed()).toBe(true);
    //переходим в каталог и проверяем там появления надписи в карточке
    const catalogLink = await browser.$("a[href='/hw/store/catalog']");
    await catalogLink.click();
    const cartBadgeInCatalog = await browser.$(".CartBadge.text-success.mx-3");
    expect(await cartBadgeInCatalog.isDisplayed()).toBe(true);
  });

  it("Проверяет что если товар уже добавлен в корзину, повторное нажатие кнопки 'добавить в корзину' должно увеличивать его количество:", async ({
    browser,
  }) => {
    //Заходим в товар 0
    await browser.url(urlFullPath("/catalog/0"));
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    //Кликаем на товар
    await addToCartButton.click();
    //Проверяем количество в корзине
    const cartLink = await browser.$("a[href='/hw/store/cart']");
    await cartLink.click();
    // Находим элемент с количеством товара в корзине
    const cartCountElement = await browser.$(".Cart-Count");
    // Получаем текстовое содержимое элемента
    const initialCartItemCount = await cartCountElement.getText();
    //Идем обратно в каталог снова добавляем элемен в корзину
    await browser.url(urlFullPath("/catalog/0"));
    await addToCartButton.waitForExist();
    await addToCartButton.click();
    // проверяем что количество увеличилось
    await cartLink.click();
    const newCartItemCount = await cartCountElement.getText();
    expect(parseInt(newCartItemCount)).toBeGreaterThan(
      parseInt(initialCartItemCount)
    );
  });

  it("Проверяет что содержимое корзины должно сохраняться между перезагрузками страницы для двух товаров", async ({
    browser,
  }) => {
    // Добавляем первый товар в корзину
    await browser.url(urlFullPath("/catalog/0"));
    const addToCartButton1 = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton1.click();
    // Добавляем второй товар в корзину
    await browser.url(urlFullPath("/catalog/1"));
    const addToCartButton2 = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton2.click();
    // Переходим в корзину и удостоверяемся, что оба товара добавлены
    const cartLink = await browser.$("a[href='/hw/store/cart']");
    await cartLink.click();
    // Проверяем, что оба товара отображаются в корзине
    const cartItemCountElements = await browser.$$(".Cart-Count");
    expect(cartItemCountElements.length).toBe(2);
    // Читаем количество каждого товара
    const initialCartItemCount1 = await cartItemCountElements[0].getText();
    const initialCartItemCount2 = await cartItemCountElements[1].getText();
    // Перезагружаем страницу
    await browser.refresh();
    // Проверяем, что количество товаров в корзине не изменилось
    const refreshedCartItemCountElements = await browser.$$(".Cart-Count");
    const refreshedCartItemCount1 =
      await refreshedCartItemCountElements[0].getText();
    const refreshedCartItemCount2 =
      await refreshedCartItemCountElements[1].getText();
    // Сравниваем количество до и после перезагрузки для каждого товара
    expect(refreshedCartItemCount1).toBe(initialCartItemCount1);
    expect(refreshedCartItemCount2).toBe(initialCartItemCount2);
  });

  it("Проверяет что кнопка нужного размера", async ({ browser }) => {
    await browser.url(urlFullPath("/catalog/0"));
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    expect(addToCartButton).toExist();
    const buttonClasses = await addToCartButton.getAttribute("class");
    expect(buttonClasses).toContain("btn-lg");
    expect(buttonClasses).not.toContain("btn-sm");
  });
});
