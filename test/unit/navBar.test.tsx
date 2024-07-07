import React from "react";
import { render } from "@testing-library/react";
import { it, expect } from "@jest/globals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { describe } from "@jest/globals";
import { Application } from "../../src/client/Application";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import events from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Тестирование элементов навигации", () => {
  const basename = "/";
  const store = initStore(new ExampleApi(basename), new CartApi());

  const application = (
    <BrowserRouter basename={basename}>
      <Provider store={store}>
        <Application />
      </Provider>
    </BrowserRouter>
  );

  it("Проверяет что все необходимые ссылки присутствуют", () => {
    const { getAllByRole } = render(application);
    const links = getAllByRole("link");
    const pagesLinks = links.map((link) => link.textContent);
    expect(pagesLinks).toStrictEqual([
      "Kogtetochka store",
      "Catalog",
      "Delivery",
      "Contacts",
      "Cart",
    ]);
  });

  it("Проверяет все ссылки ведут на правильные страницы", () => {
    const { getByRole } = render(application);
    const homeLink = getByRole("link", { name: /kogtetochka store/i });
    const catalogLink = getByRole("link", { name: /catalog/i });
    const deliveryLink = getByRole("link", { name: /delivery/i });
    const contactsLink = getByRole("link", { name: /contacts/i });
    const cartLink = getByRole("link", { name: /cart/i });
    expect(homeLink.getAttribute("href")).toBe("/");
    expect(catalogLink.getAttribute("href")).toBe("/catalog");
    expect(deliveryLink.getAttribute("href")).toBe("/delivery");
    expect(contactsLink.getAttribute("href")).toBe("/contacts");
    expect(cartLink.getAttribute("href")).toBe("/cart");
  });

  it("Название магазина в шапке должно быть ссылкой на главную страницу", () => {
    const { container } = render(application);
    const mainLink = container.getElementsByClassName("Application-Brand")[0];
    expect(mainLink).toBeTruthy();
    const href = mainLink.getAttribute("href");
    expect(href).toBe("/");
  });

  it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
    const { container } = render(application);
    const navbarWrapper = container.querySelector(
      ".Application-Menu.collapse.navbar-collapse"
    );
    const navbarToggler = container.querySelector(
      ".Application-Toggler.navbar-toggler"
    );
    const navbarLinks = container.querySelectorAll(".navbar-nav .nav-link");
    if (!navbarWrapper || !navbarToggler || navbarLinks.length === 0) {
      throw new Error("Не удалось найти необходимые элементы для теста");
    }
    await events.click(navbarToggler);
    await events.click(navbarLinks[0]);
    expect(navbarWrapper.classList).toContain("collapse");
  });
});
