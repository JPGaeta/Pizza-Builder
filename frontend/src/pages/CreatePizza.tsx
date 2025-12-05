import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { pizzaService } from "@/services/pizza";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Ingredient, Size } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  sizeId: z.string().min(1, "Size is required"),
  ingredientIds: z
    .array(z.string())
    .min(1, "At least one ingredient is required"),
});

export function CreatePizza() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      sizeId: "",
      ingredientIds: [],
    },
  });

  const { data: sizes, isLoading: isSizesLoading } = useQuery({
    queryKey: ["sizes"],
    queryFn: () => pizzaService.getPizzaSizes(),
  });
  const { data: ingredients, isLoading: isIngredientsLoading } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => pizzaService.getPizzaIngredients(),
  });
  const { mutate: createPizzaOrder, isPending: isCreatingPizzaOrder } =
    useMutation({
      mutationFn: (data: z.infer<typeof formSchema>) =>
        pizzaService.createPizzaOrder(data),
      onSuccess: (data) => {
        navigate("/search", { state: { pizzaId: data.id } });
      },
    });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      createPizzaOrder(data);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  if (isSizesLoading || isIngredientsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="m-10 flex flex-col items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <div className="flex flex-row items-center justify-start gap-4">
            <ArrowLeftIcon
              className="size-4 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <CardTitle className="text-4xl font-bold">Create Pizza</CardTitle>
          </div>
          <CardDescription>
            Select the size and ingredients to create a new pizza.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="pizza-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="customerName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-base">Customer Name</FieldLabel>
                    <Input
                      {...field}
                      id="customer-name"
                      placeholder="Add customer name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      disabled={isCreatingPizzaOrder}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="sizeId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldSet>
                    <FieldLegend>Size</FieldLegend>
                    <RadioGroup
                      name={field.name}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      {sizes?.map((pizzaSize: Size) => (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={pizzaSize.id}
                            id={pizzaSize.id}
                            checked={field.value === pizzaSize.id}
                            disabled={isCreatingPizzaOrder}
                          />
                          <Label
                            htmlFor={pizzaSize.id}
                            aria-disabled={isCreatingPizzaOrder}
                          >
                            {pizzaSize.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldSet>
                )}
              />
              <Controller
                name="ingredientIds"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldSet>
                    <FieldLegend>Ingredients</FieldLegend>
                    <div className="flex flex-col gap-3">
                      {ingredients?.map((ingredient: Ingredient) => (
                        <div
                          key={ingredient.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            value={ingredient.id}
                            id={ingredient.id}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                checked
                                  ? [...field.value, ingredient.id]
                                  : field.value.filter(
                                      (id) => id !== ingredient.id,
                                    ),
                              )
                            }
                            checked={field.value.includes(ingredient.id)}
                            disabled={isCreatingPizzaOrder}
                          />
                          <Label
                            htmlFor={ingredient.id}
                            aria-disabled={isCreatingPizzaOrder}
                          >
                            {ingredient.name}
                          </Label>
                        </div>
                      ))}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </FieldSet>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal" className="flex justify-end">
            <Button
              type="submit"
              form="pizza-form"
              className="cursor-pointer"
              disabled={isCreatingPizzaOrder}
            >
              {isCreatingPizzaOrder ? "Creating Pizza..." : "Create Pizza"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
