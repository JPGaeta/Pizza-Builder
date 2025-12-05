import express from "express";
import cors from "cors";
import {
  createPizzaOrder,
  getPizzaIngredients,
  getPizzaOrderById,
  getPizzaOrders,
  getPizzaSizes,
} from "./controllers/pizza.controller";
import {
  createPizzaValidator,
  getPizzaOrderByIdValidator,
  getPizzaOrdersValidator,
} from "./validators/pizza.validator";
import { validate } from "./middleware/validate.middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.get("/pizzas/sizes", getPizzaSizes);
app.get("/pizzas/ingredients", getPizzaIngredients);
app.get("/pizzas", validate(getPizzaOrdersValidator, "query"), getPizzaOrders);
app.get(
  "/pizzas/:orderId",
  validate(getPizzaOrderByIdValidator, "params"),
  getPizzaOrderById
);
app.post("/pizzas", validate(createPizzaValidator, "body"), createPizzaOrder);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
