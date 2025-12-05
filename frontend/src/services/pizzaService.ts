import type { CreatePizzaData, Pizza } from "@/types";
import api from "@/services/api";

export const pizzaService = {
  getSizes: async () => {
    const response = await api.get("/pizzas/sizes");
    return response.data;
  },

  getIngredients: async () => {
    const response = await api.get("/pizzas/ingredients");
    return response.data;
  },

  getAll: async (
    filters: { customerName?: string },
    ordering: { sortBy?: "finalPrice" | "createdAt"; order?: "asc" | "desc" },
  ) => {
    const query = new URLSearchParams({
      customerName: filters.customerName || "",
      sortBy: ordering.sortBy || "createdAt",
      order: ordering.order || "asc",
    });
    const response = await api.get(`/pizzas?${query.toString()}`);

    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/pizzas/${id}`);
    if (response.status === 404) {
      return [];
    }
    return response.data;
  },

  create: async (pizzaData: CreatePizzaData): Promise<Pizza> => {
    const response = await api.post("/pizzas", pizzaData);
    return response.data;
  },
};
