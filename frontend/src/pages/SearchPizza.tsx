import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pizzaService } from "@/services/pizzaService";
import { formatDateTimeUS } from "@/utils/formatDateTimeUS";
import type { Pizza } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import z, { ZodError } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { FieldError } from "@/components/ui/field";

const formSchema = z.object({
  pizzaId: z.uuidv4("Pizza ID is required and must be a valid UUID v4"),
});

export const SearchPizza = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const pizzaIdCreated = location.state?.pizzaId;

  const { data: pizza, isLoading } = useQuery<Pizza | null>({
    queryKey: ["pizza", appliedSearch],
    queryFn: () => pizzaService.getPizzaOrderById(appliedSearch),
    enabled: !!appliedSearch,
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    setSearch(e.target.value);
  }

  function handleSearch() {
    try {
      formSchema.parse({ pizzaId: search });
      setError(null);
      setAppliedSearch(search);
    } catch (err) {
      if (err instanceof ZodError) {
        const firstError = err.issues[0]?.message;
        setError(firstError);
        setAppliedSearch("");
      }
    }
  }

  useEffect(() => {
    if (pizzaIdCreated) {
      setAppliedSearch(pizzaIdCreated);
      setSearch(pizzaIdCreated);
    }
  }, []);

  return (
    <div className="mx-auto my-10 flex max-w-5xl flex-col content-center justify-center gap-6 px-4">
      <Card className="p-10">
        <CardHeader>
          <div className="flex flex-row items-center justify-start gap-4">
            <ArrowLeftIcon
              className="size-4 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <CardTitle className="text-4xl font-bold">Search Pizza</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2">
            <Input
              type="text"
              placeholder="Search by pizza id"
              aria-invalid={error ? true : false}
              value={search}
              onChange={(e) => handleOnChange(e)}
            />
            <Button
              type="submit"
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleSearch()}
            >
              Search
            </Button>
          </div>
          {error && <FieldError className="mt-2">{error}</FieldError>}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center py-10">Loading...</div>
      )}

      {pizza && (
        <Card className="p-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Pizza Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-muted-foreground text-sm font-medium">
                  Order ID
                </label>
                <Input value={pizza.id} disabled className="bg-muted" />
              </div>

              <div className="grid gap-2">
                <label className="text-muted-foreground text-sm font-medium">
                  Customer Name
                </label>
                <Input
                  value={pizza.customerName}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-muted-foreground text-sm font-medium">
                  Size
                </label>
                <Input
                  value={`${pizza.size.name} (Base: $${pizza.size.basePrice.toFixed(2)})`}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-muted-foreground text-sm font-medium">
                  Ingredients
                </label>
                <div className="flex flex-wrap gap-2">
                  {pizza.ingredients.map((ingredient) => (
                    <span
                      key={ingredient.id}
                      className="bg-primary/10 rounded-full px-3 py-1 text-sm"
                    >
                      {ingredient.name} (+${ingredient.extraPrice.toFixed(2)})
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-muted-foreground text-sm font-medium">
                  Final Price
                </label>
                <Input
                  value={`$${pizza.finalPrice.toFixed(2)}`}
                  disabled
                  className="bg-muted font-semibold"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-muted-foreground text-sm font-medium">
                  Created At
                </label>
                <Input
                  value={formatDateTimeUS(pizza.createdAt)}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
