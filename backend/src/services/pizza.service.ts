import { ingredients, pizzas, sizes } from "../store/data";
import { CreatePizza, Pizza, SortField, SortOrder } from "../types";
import { calculateFinalOrderPrice, filterPizzas, sortPizzas } from "../utils";

export const findAllPizzaSizes = () => {
  return sizes;
};

export const findPizzaIngredients = () => {
  return ingredients;
};

export const findAllPizzas = (filters: {
  customerName?: string;
  sortBy?: SortField;
  order?: SortOrder;
}): Pizza[] => {
  const { customerName, sortBy, order } = filters;
  let result = pizzas;

  if (customerName) {
    result = filterPizzas(result, customerName);
  }
  if (sortBy) {
    result = sortPizzas(result, sortBy, order);
  }

  return result;
};

export const findAllPizzaOrderById = (id: string) => {
  return pizzas.find((pizza) => pizza.id === id);
};

export const createPizza = (pizzaData: CreatePizza) => {
  const { customerName, sizeId, ingredientIds } = pizzaData;
  const selectedSize = sizes.find((size) => size.id === sizeId);
  const selectedIngredients = ingredients.filter((ingredient) =>
    ingredientIds.includes(ingredient.id)
  );
  const finalPrice = calculateFinalOrderPrice(
    selectedSize!,
    selectedIngredients
  );

  const pizza: Pizza = {
    id: crypto.randomUUID(),
    customerName,
    size: selectedSize!,
    ingredients: selectedIngredients,
    finalPrice,
    createdAt: new Date(),
  };
  pizzas.push(pizza);

  return pizza;
};
