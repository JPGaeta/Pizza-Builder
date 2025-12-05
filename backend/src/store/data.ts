import { Size, Ingredient, Pizza } from "../types";

export const sizes: Size[] = [
  { id: "sm", name: 'Small (10")', basePrice: 14.0 },
  { id: "md", name: 'Medium (12")', basePrice: 16.0 },
  { id: "lg", name: 'Large (14")', basePrice: 18.0 },
  { id: "xl", name: 'Extra Large (16")', basePrice: 20.0 },
  { id: "fam", name: 'Family (18")', basePrice: 22.0 },
];

export const ingredients: Ingredient[] = [
  { id: "tomato_sauce", name: "Tomato Sauce", extraPrice: 0.5 },
  { id: "mozzarella", name: "Mozzarella", extraPrice: 0.5 },
  { id: "extra_mozzarella", name: "Extra Mozzarella", extraPrice: 2.0 },
  { id: "gorgonzola", name: "Gorgonzola", extraPrice: 3.0 },
  { id: "parmesan", name: "Parmesan", extraPrice: 1.5 },
  { id: "pepperoni", name: "Pepperoni", extraPrice: 2.5 },
  { id: "bacon", name: "Crispy Bacon", extraPrice: 3.0 },
  { id: "chicken", name: "Grilled Chicken", extraPrice: 3.0 },
  { id: "onions", name: "Red Onions", extraPrice: 1.0 },
  { id: "tomato", name: "Sliced Tomatoes", extraPrice: 1.0 },
];

export const pizzas: Pizza[] = [];
