import { Pizza, SortField, SortOrder } from "../types/pizza";

export const filterPizzas = (pizzas: Pizza[], customerName: string): Pizza[] =>
  pizzas.filter((pizza) =>
    pizza.customerName.toLowerCase().includes(customerName.toLowerCase())
  );

export const sortPizzas = (
  pizzas: Pizza[],
  sortBy: SortField,
  order: SortOrder = "asc"
): Pizza[] => {
  const sorted = [...pizzas].sort((a, b) => {
    const aValue =
      sortBy === "finalPrice" ? a.finalPrice : a.createdAt.getTime();
    const bValue =
      sortBy === "finalPrice" ? b.finalPrice : b.createdAt.getTime();
    return aValue - bValue;
  });

  return order === "desc" ? sorted.reverse() : sorted;
};
