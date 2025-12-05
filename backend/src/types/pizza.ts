import Ingredient from "./ingredient";
import Size from "./size";

type SortField = "finalPrice" | "createdAt";
type SortOrder = "asc" | "desc";

interface Pizza {
  id: string;
  customerName: string;
  size: Size;
  ingredients: Ingredient[];
  finalPrice: number;
  createdAt: Date;
}

interface CreatePizza {
  customerName: string;
  sizeId: string;
  ingredientIds: string[];
}

export type { Pizza, CreatePizza, SortField, SortOrder };
