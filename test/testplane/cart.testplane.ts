import { urlFullPath } from "../urlCreator/urlCreator";
import { clearCart } from "../urlCreator/clearCart";

describe("cart", () => {
  beforeEach(async ({ browser }) => {
    await clearCart(browser);
  });

  it("Тест проверяет : что в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/catalog/0"));
    const cartLink = await browser.$('a[href="/hw/store/cart"]');
    await cartLink.waitForExist();
    ``;
    // Добавляем первый товар в корзину
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();
    // Добавляем второй товар в корзину
    await browser.url(urlFullPath("/catalog/1"));
    await addToCartButton.click();
    // Добавляем третий товар в корзину
    await browser.url(urlFullPath("/catalog/2"));
    await addToCartButton.click();
    //Проверяем
    const cartLinkText = await cartLink.getText();
    expect(cartLinkText).toContain("(3)");
  });

  it("Тест проверяет : что в корзине должна отображаться таблица с добавленными в нее товарами", async ({
    browser,
  }) => {
    // Переходим на страницу первого товара и добавляем его в корзину
    await browser.url(urlFullPath("/catalog/0"));
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();

    // Переходим на страницу второго товара и добавляем его в корзину
    await browser.url(urlFullPath("/catalog/1"));
    await addToCartButton.click();

    // Переходим на страницу корзины
    await browser.url(urlFullPath("/cart"));

    // Проверяем наличие таблицы корзины и её строк
    const cartTable = await browser.$(".Cart-Table");

    const cartTableRows = await cartTable.$$("tbody tr");
    expect(cartTableRows.length).toBeGreaterThan(0);

    // Можно добавить дополнительные проверки на содержимое строк, например:
    for (let i = 0; i < cartTableRows.length; i++) {
      const row = cartTableRows[i];
      const productName = await row.$(".Cart-Name");
      const productPrice = await row.$(".Cart-Price");
      const productCount = await row.$(".Cart-Count");
      const productTotal = await row.$(".Cart-Total");

      expect(await productName.isDisplayed()).toBe(true);
      expect(await productPrice.isDisplayed()).toBe(true);
      expect(await productCount.isDisplayed()).toBe(true);
      expect(await productTotal.isDisplayed()).toBe(true);

      // Проверяем, что значения не пустые или undefined
      expect(await productName.getText()).not.toBe("");
      expect(await productPrice.getText()).not.toBe("");
      expect(await productCount.getText()).not.toBe("");
      expect(await productTotal.getText()).not.toBe("");
    }
  });

  it("Тест проверяет : что в корзине должна быть кнопка 'очистить корзину', по нажатию на которую все товары должны удаляться", async ({
    browser,
  }) => {
    // Добавляем товары в корзину
    await browser.url(urlFullPath("/catalog/0"));
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();

    await browser.url(urlFullPath("/catalog/1"));
    await addToCartButton.click();

    // Переходим в корзину
    await browser.url(urlFullPath("/cart"));
    const cartTable = await browser.$(".Cart-Table");
    expect(cartTable).toExist();

    // Проверяем количество товаров в корзине до очистки
    const cartTableRows = await cartTable.$$("tbody tr");
    expect(cartTableRows.length).toBe(2);

    // Нажимаем на кнопку очистки корзины
    const clearButton = await browser.$(".Cart-Clear");
    expect(clearButton).toExist();
    await clearButton.click();

    // Подождем немного, чтобы убедиться, что корзина очистилась
    await browser.pause(1000);

    // Проверяем, что корзина действительно пуста
    const emptyCartMessage = await browser.$(".Cart .col");
    const isEmptyCartMessageDisplayed = await emptyCartMessage.isDisplayed();
    expect(isEmptyCartMessageDisplayed).toBe(true);
  });

  it("Тест проверяет : что для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа", async ({
    browser,
  }) => {
    // Добавляем товары в корзину
    await browser.url(urlFullPath("/catalog/0"));
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();

    await browser.url(urlFullPath("/catalog/1"));
    await addToCartButton.click();

    await browser.url(urlFullPath("/catalog/2"));
    await addToCartButton.click();

    // Переходим в корзину
    await browser.url(urlFullPath("/cart"));
    const cartTable = await browser.$(".Cart-Table");
    expect(cartTable).toExist();

    // Проверяем, что все товары отображаются корректно
    const cartTableRows = await cartTable.$$("tbody tr");
    expect(cartTableRows.length).toBe(3);

    for (let i = 0; i < cartTableRows.length; i++) {
      const row = cartTableRows[i];
      const productName = await row.$(".Cart-Name");
      const productPrice = await row.$(".Cart-Price");
      const productCount = await row.$(".Cart-Count");
      const productTotal = await row.$(".Cart-Total");

      expect(await productName.isDisplayed()).toBe(true);
      expect(await productPrice.isDisplayed()).toBe(true);
      expect(await productCount.isDisplayed()).toBe(true);
      expect(await productTotal.isDisplayed()).toBe(true);

      // Проверяем, что значения не пустые или undefined
      expect(await productName.getText()).not.toBe("");
      expect(await productPrice.getText()).not.toBe("");
      expect(await productCount.getText()).not.toBe("");
      expect(await productTotal.getText()).not.toBe("");
    }

    // Проверяем отображение общей суммы заказа
    const orderPrice = await cartTable.$(".Cart-OrderPrice");
    expect(await orderPrice.isDisplayed()).toBe(true);
    expect(await orderPrice.getText()).not.toBe("");
  });

  it("Тест проверяет : что если корзина пустая, должна отображаться ссылка на каталог товаров", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/cart"));
    const emptyCartMessage = await browser.$(".Cart");
    const isEmptyCartMessageDisplayed = await emptyCartMessage.isDisplayed();
    const emptyCartText = await emptyCartMessage.getText();
    expect(emptyCartText.includes("Cart is empty"));
    const catalogLink = await browser.$(".Cart a[href='/hw/store/catalog']");
    expect(catalogLink).toExist();
  });

  it("Тест проверяет : корректность отображаемого имени", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/catalog"));
    const productName = await browser
      .$('[data-testid="26"] .ProductItem-Name')
      .getText();
    const link = await browser.$('[data-testid="26"] .card-link');
    await link.click();
    await browser.url(urlFullPath("/catalog/26"));
    const name = await browser.$(".ProductDetails-Name").getText();
    console.log(productName, name);
    expect(productName).toEqual(name);
  });

  it("Тест проверяет : что после оформления заказа появилась надпись об успехе", async function ({
    browser,
  }) {
    await browser.execute(() => localStorage.clear());
    await browser.url(urlFullPath("/catalog/0"));
    const button = await browser.$(".ProductDetails-AddToCart");
    await button.waitForExist();
    await button.click();
    await browser.url(urlFullPath("/cart"));
    const nameInput = await browser.$(".Form-Field_type_name");
    await nameInput.waitForExist();
    await nameInput.setValue("Alexander");
    const phoneInput = await browser.$(".Form-Field_type_phone");
    await phoneInput.waitForExist();
    await phoneInput.setValue("88005553535");
    const addressInput = await browser.$(".Form-Field_type_address");
    await addressInput.waitForExist();
    await addressInput.setValue("planet 32");
    const formButton = await browser.$(".Form-Submit");
    await formButton.waitForExist();
    await formButton.click();
    const success = await browser.$(".alert-success");
    await success.waitForExist({ timeout: 6000, timeoutMsg: "fail" });
    const isDisplayed = await success.isDisplayed();
    expect(isDisplayed).toBe(true);
    const cartNumber = await browser.$(".Cart-Number");
    await cartNumber.waitForExist();
    const cartNumberText = await cartNumber.getText();
    expect(cartNumberText).toBe("1");
  });
});
