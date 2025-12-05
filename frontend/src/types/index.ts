export interface CreatePizzaData {
  customerName: string;
  sizeId: string;
  ingredientIds: string[];
}

export interface Pizza {
  id: string;
  customerName: string;
  size: Size;
  ingredients: Ingredient[];
  finalPrice: number;
  createdAt: Date;
}

export interface Size {
  id: string;
  name: string;
  basePrice: number;
}

export interface Ingredient {
  id: string;
  name: string;
  extraPrice: number;
}

export type SortableFields = "finalPrice" | "createdAt";

export interface SortConfig {
  sortBy: SortableFields;
  order: "asc" | "desc";
}
