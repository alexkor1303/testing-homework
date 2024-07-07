export const mockRequest = (request) => {
  if (request.url() === "http://localhost:3000/hw/store/products") {
    request.response({
      content: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify([
        { id: 0, name: "Fantastic kogtetochka", price: 773 },
        { id: 1, name: "Generic kogtetochka", price: 704 },
        { id: 2, name: "Intelligent kogtetochka", price: 883 },
        { id: 3, name: "Incredible kogtetochka", price: 641 },
        { id: 4, name: "Licensed kogtetochka", price: 339 },
        { id: 5, name: "Gorgeous kogtetochka", price: 745 },
        { id: 6, name: "Modern kogtetochka", price: 47 },
        { id: 7, name: "Small kogtetochka", price: 234 },
        { id: 8, name: "Luxurious kogtetochka", price: 538 },
        { id: 9, name: "Fantastic kogtetochka", price: 859 },
        { id: 10, name: "Intelligent kogtetochka", price: 532 },
        { id: 11, name: "Rustic kogtetochka", price: 733 },
        { id: 12, name: "Incredible kogtetochka", price: 657 },
        { id: 13, name: "Fantastic kogtetochka", price: 836 },
        { id: 14, name: "Rustic kogtetochka", price: 502 },
        { id: 15, name: "Awesome kogtetochka", price: 574 },
        { id: 16, name: "Recycled kogtetochka", price: 939 },
        { id: 17, name: "Tasty kogtetochka", price: 283 },
        { id: 18, name: "Refined kogtetochka", price: 797 },
        { id: 19, name: "Handcrafted kogtetochka", price: 258 },
        { id: 20, name: "Modern kogtetochka", price: 322 },
        { id: 21, name: "Modern kogtetochka", price: 510 },
        { id: 22, name: "Elegant kogtetochka", price: 42 },
        { id: 23, name: "Generic kogtetochka", price: 591 },
        { id: 24, name: "Awesome kogtetochka", price: 152 },
        { id: 25, name: "Electronic kogtetochka", price: 115 },
        { id: 26, name: "Small kogtetochka", price: 661 },
      ]),
    });
    return;
  }

  if (request.url() === "http://localhost:3000/hw/store/api/products/1") {
    request.respond({
      content: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        id: 1,
        name: "Generic kogtetochka",
        description: "Really Incredible kogtetochka for Thai",
        price: 704,
        color: "indigo",
        material: "Concrete",
      }),
    });
    return;
  }
  if (request.url() === "http://localhost:3000/hw/store/api/products/1") {
    request.respond({
      content: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        id: 1,
        name: "Generic kogtetochka",
        description: "Really Incredible kogtetochka for Thai",
        price: 704,
        color: "indigo",
        material: "Concrete",
      }),
    });
    return;
  }
  request.continue();
};
