import { urlFullPath } from "../urlCreator/urlCreator";

describe("Проверяет что страницы главная, условия доставки, контакты должны иметь статическое содержимое", () => {
  it("- вёрстка должна адаптироваться под ширину экрана", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/"));
    // Установим ширину окна браузера в 1200px и проверим вёрстку
    await browser.setWindowSize(1200, 800);
    const layoutLarge = await browser.$("body");
    expect(layoutLarge).toExist();
    // Установим ширину окна браузера в 576px и проверим вёрстку
    await browser.setWindowSize(576, 800);
    const layoutSmall = await browser.$("body");
    expect(layoutSmall).toExist();
  });
  it("- в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/"));

    const header = await browser.$("nav.navbar");
    expect(header).toExist();

    const links = [
      { href: "/hw/store/catalog", text: "Catalog" },
      { href: "/hw/store/delivery", text: "Delivery" },
      { href: "/hw/store/contacts", text: "Contacts" },
      { href: "/hw/store/cart", text: "Cart" },
    ];

    for (const link of links) {
      const navLink = await header.$(`a.nav-link[href='${link.href}']`);
      expect(navLink).toExist();
      const linkText = await navLink.getText();
      expect(linkText).toBe(link.text);
    }
  });

  it("- название магазина в шапке должно быть ссылкой на главную страницу", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/"));

    const navbar = await browser.$("nav.navbar");
    expect(navbar).toExist();
    const homeLink = await navbar.$("a.Application-Brand[href='/hw/store']");
    expect(homeLink).toExist();

    const linkText = await homeLink.getText();
    expect(linkText).toBe("Kogtetochka store");
  });

  it("- на ширине меньше 576px навигационное меню должно скрываться за 'гамбургер'", async ({
    browser,
  }) => {
    await browser.url(urlFullPath("/"));

    // Установим ширину окна браузера в 575px для проверки "гамбургера"
    await browser.setWindowSize(575, 800);

    const hamburgerButton = await browser.$(".navbar-toggler");
    expect(hamburgerButton).toExist(); // Проверяем наличие кнопки "гамбургер"

    await hamburgerButton.click(); // Открываем меню

    const navMenu = await browser.$(".navbar-collapse");
    expect(await navMenu.isDisplayed()).toBe(true); // Проверяем, что меню отображается

    // Проверка закрытия меню при выборе элемента
    const menuItem = await navMenu.$("a[href='/hw/store/catalog']");
    await menuItem.click();

    expect(await navMenu.isDisplayed()).toBe(false); // Проверяем, что меню скрывается после выбора элемента
  });
});
