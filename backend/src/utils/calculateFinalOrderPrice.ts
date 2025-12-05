import Ingredient from "../types/ingredient";
import Size from "../types/size";

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
