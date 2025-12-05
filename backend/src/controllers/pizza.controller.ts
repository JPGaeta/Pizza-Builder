import { Request, Response } from "express";
import {
  createPizza,
  findAllPizzaOrderById,
  findAllPizzas,
  findAllPizzaSizes,
  findPizzaIngredients,
} from "../services/pizza.service";
import { CreatePizza, SortField, SortOrder } from "../types";

export const getPizzaSizes = (_: Request, res: Response) => {
  const pizzaSizes = findAllPizzaSizes();
  res.status(200).json(pizzaSizes);
};

export const getPizzaIngredients = (_: Request, res: Response) => {
  const pizzaIngredients = findPizzaIngredients();
  res.status(200).json(pizzaIngredients);
};

export const getPizzaOrders = (req: Request, res: Response) => {
  const { customerName, sortBy, order } = req.query as {
    customerName?: string;
    sortBy?: SortField;
    order?: SortOrder;
  };

  const pizzaOrders = findAllPizzas({
    customerName,
    sortBy,
    order,
  });

  res.status(200).json(pizzaOrders);
};

export const getPizzaOrderById = (req: Request, res: Response) => {
  const { orderId } = req.params;

  const pizzaOrder = findAllPizzaOrderById(orderId);
  if (!pizzaOrder) {
    return res.status(404).json({ error: "Pizza not found" });
  }
  res.status(200).json(pizzaOrder);
};

export const createPizzaFlavor = (req: Request, res: Response) => {
  try {
    const data = req.body as CreatePizza;
    const pizza = createPizza(data);
    res.status(201).json(pizza);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
