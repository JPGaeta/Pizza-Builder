import { filterPizzas, sortPizzas } from "../../src/utils";

describe("filter and sort pizzas", () => {
  const pizzas = [
    {
      id: crypto.randomUUID(),
      customerName: "Joao Test",
      size: { id: "sm", name: "Small", basePrice: 8 },
      ingredients: [{ id: "1", name: "Cheese", extraPrice: 1.5 }],
      finalPrice: 9.5,
      createdAt: new Date("2025-12-05T13:00:00Z"),
    },
    {
      id: crypto.randomUUID(),
      customerName: "John Test",
      size: { id: "xl", name: "Extra Large", basePrice: 20 },
      ingredients: [{ id: "mozzarella", name: "Mozzarella", extraPrice: 0.5 }],
      finalPrice: 20.5,
      createdAt: new Date("2025-12-05T14:00:00Z"),
    },
    {
      id: crypto.randomUUID(),
      customerName: "Gabriella Test",
      size: { id: "md", name: "Medium", basePrice: 16 },
      ingredients: [
        { id: "mozzarella", name: "Mozzarella", extraPrice: 0.5 },
        { id: "pepperoni", name: "Pepperoni", extraPrice: 2.5 },
      ],
      finalPrice: 19,
      createdAt: new Date("2025-12-03T15:00:00Z"),
    },
    {
      id: crypto.randomUUID(),
      customerName: "Patricia Test",
      size: { id: "fam", name: "Family", basePrice: 22 },
      ingredients: [
        { id: "mozzarella", name: "Mozzarella", extraPrice: 0.5 },
        { id: "chicken", name: "Grilled Chicken", extraPrice: 3.0 },
      ],
      finalPrice: 25.5,
      createdAt: new Date("2025-12-02T16:00:00Z"),
    },
  ];

  it("should return all pizzas when no filters are provided", () => {
    const result = filterPizzas(pizzas, "");
    expect(result).toEqual(pizzas);
  });

  it("should filter pizza by customer name", () => {
    const result = filterPizzas(pizzas, "Joao Test");
    expect(result).toEqual([pizzas[0]]);
  });

  it("should sort pizza by final price in ascending order", () => {
    const result = sortPizzas(pizzas, "finalPrice", "asc");
    expect(result).toEqual([pizzas[0], pizzas[2], pizzas[1], pizzas[3]]);
  });

  it("should sort pizza by final price in descending order", () => {
    const result = sortPizzas(pizzas, "finalPrice", "desc");
    expect(result).toEqual([pizzas[3], pizzas[1], pizzas[2], pizzas[0]]);
  });

  it("should sort pizza by created at in ascending order", () => {
    const result = sortPizzas(pizzas, "createdAt", "asc");
    expect(result).toEqual([pizzas[3], pizzas[2], pizzas[0], pizzas[1]]);
  });

  it("should sort pizza by created at in descending order", () => {
    const result = sortPizzas(pizzas, "createdAt", "desc");
    expect(result).toEqual([pizzas[1], pizzas[0], pizzas[2], pizzas[3]]);
  });
});
