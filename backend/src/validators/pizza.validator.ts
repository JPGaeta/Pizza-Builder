import z from "zod";
import { ingredients, sizes } from "../store/data";

const validSizeIds = sizes.map((size) => size.id);
const validIngredientIds = ingredients.map((ingredient) => ingredient.id);

export const createPizzaValidator = z.object({
  customerName: z
    .string()
    .min(1, "Customer name is required")
    .max(100, "Customer name too long"),
  sizeId: z
    .string()
    .min(1, "Size is required")
    .refine((id) => validSizeIds.includes(id), {
      message: `Size must be one of: ${validSizeIds.join(", ")}`,
    }),
  ingredientIds: z
    .array(z.string())
    .nonempty({ message: "At least one ingredient is required" })
    .refine(
      (ids: string[]) => ids.every((id) => validIngredientIds.includes(id)),
      {
        message: `Ingredients must be one of: ${validIngredientIds.join(", ")}`,
      }
    ),
});

export const getPizzaOrdersValidator = z.object({
  customerName: z.string().optional(),
  sortBy: z.enum(["finalPrice", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const getPizzaOrderByIdValidator = z.object({
  orderId: z.uuidv4("Order ID is required and must be a valid UUID v4"),
});
