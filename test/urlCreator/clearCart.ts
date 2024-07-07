import { urlFullPath } from "./urlCreator";
export const clearCart = async (browser) => {
  await browser.url(urlFullPath("/"));
  await browser.url(urlFullPath("/cart"));

  // Проверяем наличие элемента, указывающего на пустую корзину
  const emptyCartMessage = await browser.$(".Cart");
  const isEmptyCartMessageDisplayed = await emptyCartMessage.isDisplayed();
  if (isEmptyCartMessageDisplayed) {
    const emptyCartText = await emptyCartMessage.getText();
    if (emptyCartText.includes("Cart is empty")) {
      return; // Если корзина пуста, выходим из функции
    }
  } else {
    // Проверяем наличие таблицы товаров в корзине
    const cartTable = await browser.$(".Cart-Table");
    const isCartTableDisplayed = await cartTable.isDisplayed();
    if (!isCartTableDisplayed) {
      return; // Если таблица не отображается, выходим из функции
    }
  }
  // Если корзина не пуста, ищем и нажимаем кнопку очистки корзины
  const clearCartButton = await browser.$(".Cart-Clear");
  if (await clearCartButton.isDisplayed()) {
    await clearCartButton.click();
  }
};
