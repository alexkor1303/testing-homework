import React from "react";
import { render } from "@testing-library/react";
import { it, expect } from "@jest/globals";
import { Provider } from "react-redux";
import { describe } from "@jest/globals";
import { Application } from "../../src/client/Application";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

function getAppPage(page: string) {
  const store = initStore(new ExampleApi(page), new CartApi());
  const application = (
    <MemoryRouter initialEntries={[page]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  return application;
}
describe("Проверяет что в магазине должны быть страницы: главная, каталог, условия доставки, контакты:", () => {
  it('по адресу "/" должна открываться страница "Home"', () => {
    const application = getAppPage("/");
    const { container } = render(application);
    const mainDiv = container.getElementsByClassName("Home")[0];
    expect(mainDiv).toBeTruthy();
  });
  it('по адресу "/catalog" должна открываться страница "Каталог"', () => {
    const application = getAppPage("/catalog");
    const { container } = render(application);
    const mainDiv = container.getElementsByClassName("Catalog")[0];
    expect(mainDiv).toBeTruthy();
  });
  it('по адресу "/delivery" должна открываться страница "Каталог"', () => {
    const application = getAppPage("/delivery");
    const { container } = render(application);
    const mainDiv = container.getElementsByClassName("Delivery")[0];
    expect(mainDiv).toBeTruthy();
  });
  it('по адресу "/contacts" должна открываться страница "Каталог"', () => {
    const application = getAppPage("/contacts");
    const { container } = render(application);
    const mainDiv = container.getElementsByClassName("Contacts")[0];
    expect(mainDiv).toBeTruthy();
  });
});
