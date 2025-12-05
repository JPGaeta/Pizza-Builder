import { ZodError } from "zod";
import { createPizzaValidator } from "../../src/validators/pizza.validator";

describe("pizza validator", () => {
  it("should validate create pizza", () => {
    const result = createPizzaValidator.safeParse({
      customerName: "John Doe",
      sizeId: "sm",
      ingredientIds: ["mozzarella", "pepperoni"],
    });
    expect(result.success).toBe(true);
  });

  it("should not validate create pizza with customer name too long", () => {
    const result = createPizzaValidator.safeParse({
      customerName: "A".repeat(101),
      sizeId: "sm",
      ingredientIds: ["mozzarella", "pepperoni"],
    });
    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ZodError);
  });

  it("should not validate create pizza with no customer name", () => {
    const result = createPizzaValidator.safeParse({
      customerName: "",
      sizeId: "sm",
      ingredientIds: ["mozzarella", "pepperoni"],
    });
    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ZodError);
  });

  it("should not validate create pizza with no size id", () => {
    const result = createPizzaValidator.safeParse({
      customerName: "John Doe",
      sizeId: "",
      ingredientIds: ["mozzarella", "pepperoni"],
    });
    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ZodError);
  });

  it("should not validate create pizza with invalid size id", () => {
    const result = createPizzaValidator.safeParse({
      customerName: "John Doe",
      sizeId: "invalid",
      ingredientIds: ["mozzarella", "pepperoni"],
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ZodError);
  });

  it("should not validate create pizza with no ingredient ids", () => {
    const result = createPizzaValidator.safeParse({
      customerName: "John Doe",
      sizeId: "sm",
      ingredientIds: [],
    });
    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ZodError);
  });

  it("should not validate create pizza with invalid ingredient ids", () => {
    const result = createPizzaValidator.safeParse({
      customerName: "John Doe",
      sizeId: "sm",
      ingredientIds: ["invalid"],
    });
    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ZodError);
  });
});
