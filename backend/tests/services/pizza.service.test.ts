import { createPizza } from "../../src/services/pizza.service";

describe("pizza service", () => {
  it("should create a pizza", () => {
    const pizza = createPizza({
      customerName: "John Doe",
      sizeId: "sm",
      ingredientIds: ["mozzarella", "pepperoni"],
    });
    expect(pizza).toBeDefined();
    expect(pizza.id).toBeDefined();
    expect(pizza.customerName).toBe("John Doe");
    expect(pizza.size.id).toBe("sm");
    expect(pizza.ingredients.length).toBe(2);
    expect(pizza.ingredients[0].id).toBe("mozzarella");
    expect(pizza.ingredients[1].id).toBe("pepperoni");
    expect(pizza.finalPrice).toBe(17);
    expect(pizza.createdAt).toBeInstanceOf(Date);
  });
});
