import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pizzaService } from "@/services/pizzaService";
import type { Pizza, SortableFields } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDateTimeUS } from "@/utils/formatDateTimeUS";
import { Card, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormattedPizzaOrder {
  id: string;
  customerName: string;
  finalPrice: string;
  createdAt: string;
}

function formatRowsData(pizzaOrders: Pizza[]): FormattedPizzaOrder[] {
  return pizzaOrders?.map((pizzaOrder) => ({
    id: pizzaOrder.id,
    customerName: pizzaOrder.customerName,
    finalPrice: `$ ${pizzaOrder.finalPrice.toFixed(2)}`,
    createdAt: formatDateTimeUS(pizzaOrder.createdAt),
  }));
}

export const ListPizzas = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sort, setSort] = useState<{
    sortBy: SortableFields;
    order: "asc" | "desc";
  }>({
    sortBy: "createdAt",
    order: "asc",
  });

  const { data: pizzasOrders, isLoading } = useQuery({
    queryKey: ["pizzasOrders", appliedSearch, sort],
    queryFn: () =>
      pizzaService.getAllPizzasOrders(
        { customerName: appliedSearch },
        { sortBy: sort.sortBy as SortableFields, order: sort.order },
      ),
  });

  const formattedRowsData = formatRowsData(pizzasOrders);

  const handleSort = (field: SortableFields) => {
    setSort((prev) => ({
      sortBy: field,
      order: prev.sortBy === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="mx-auto my-10 flex max-w-5xl flex-col content-center justify-center px-4">
      <Card className="p-10">
        <div className="flex flex-row justify-between">
          <div className="w-1/2">
            <div className="flex flex-row items-center justify-start gap-4">
              <ArrowLeftIcon
                className="size-4 cursor-pointer"
                onClick={() => navigate("/")}
              />
              <CardTitle className="text-4xl font-bold">Pizzas List</CardTitle>
            </div>
          </div>
          <div className="flex w-1/2 flex-row gap-2">
            <Input
              type="text"
              placeholder="Search by customer name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type="submit"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setAppliedSearch(search)}
            >
              Search
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-10">
            Loading...
          </div>
        )}

        {formattedRowsData?.length > 0 && (
          <div className="bg-card border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pizza Id</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("finalPrice")}
                  >
                    Final Price{" "}
                    {sort.sortBy === "finalPrice" &&
                      (sort.order === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created At{" "}
                    {sort.sortBy === "createdAt" &&
                      (sort.order === "asc" ? "↑" : "↓")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formattedRowsData?.map((pizzaOrder: FormattedPizzaOrder) => (
                  <TableRow key={pizzaOrder.id}>
                    <TableCell>{pizzaOrder.id}</TableCell>
                    <TableCell>{pizzaOrder.customerName}</TableCell>
                    <TableCell>{pizzaOrder.finalPrice}</TableCell>
                    <TableCell>
                      {pizzaOrder.createdAt.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};
