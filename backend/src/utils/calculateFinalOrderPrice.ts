import { Ingredient, Size } from "../types";

export const calculateFinalOrderPrice = (
  size: Size,
  ingredients: Ingredient[]
) => {
  const ingredientsTotal = ingredients.reduce(
    (sum, ingredient) => sum + ingredient.extraPrice,
    0
  );
  return size.basePrice + ingredientsTotal;
};
