import express from "express";
import cors from "cors";
import {
  createPizzaFlavor,
  getPizzaById,
  getPizzaIngredients,
  getPizzas,
  getPizzaSizes,
} from "./controllers/pizza.controller";
import {
  createPizzaValidator,
  getPizzaByIdValidator,
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
app.get("/pizzas", validate(getPizzaOrdersValidator, "query"), getPizzas);
app.get(
  "/pizzas/:pizzaId",
  validate(getPizzaByIdValidator, "params"),
  getPizzaById
);
app.post("/pizzas", validate(createPizzaValidator, "body"), createPizzaFlavor);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
