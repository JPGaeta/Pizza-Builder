import { calculateFinalOrderPrice } from "../../src/utils";
import { Size, Ingredient } from "../../src/types";

describe("calculateFinalOrderPrice", () => {
  const smallSize: Size = { id: "sm", name: "Small", basePrice: 8 };
  const largeSize: Size = { id: "lg", name: "Large", basePrice: 12 };

  const cheese: Ingredient = {
    id: "mozzarella",
    name: "Cheese",
    extraPrice: 1.5,
  };
  const pepperoni: Ingredient = {
    id: "pepperoni",
    name: "Pepperoni",
    extraPrice: 2,
  };
  const mushrooms: Ingredient = {
    id: "mushrooms",
    name: "Mushrooms",
    extraPrice: 1,
  };

  it("should return base price when no ingredients", () => {
    const result = calculateFinalOrderPrice(smallSize, []);
    expect(result).toBe(8);
  });

  it("should add ingredient price to base price", () => {
    const result = calculateFinalOrderPrice(smallSize, [cheese]);
    expect(result).toBe(9.5);
  });

  it("should sum multiple ingredients correctly", () => {
    const result = calculateFinalOrderPrice(smallSize, [
      cheese,
      pepperoni,
      mushrooms,
    ]);
    expect(result).toBe(12.5);
  });

  it("should work with different sizes", () => {
    const result = calculateFinalOrderPrice(largeSize, [cheese, pepperoni]);
    expect(result).toBe(15.5);
  });
});
