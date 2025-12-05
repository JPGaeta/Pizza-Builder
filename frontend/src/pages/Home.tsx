import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-5xl font-bold">Pizza Builder</h1>
      </div>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">
        <Link to="/create" className="group">
          <Card className="h-30 transition-all hover:scale-105 hover:shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="group-hover:text-primary text-2xl">
                Create Pizza
              </CardTitle>
              <CardDescription>
                Build your custom pizza with your favorite ingredients
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/list" className="group">
          <Card className="h-30 transition-all hover:scale-105 hover:shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="group-hover:text-primary text-2xl">
                List Pizzas
              </CardTitle>
              <CardDescription>
                View all pizzas with sorting and filtering
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/search" className="group">
          <Card className="h-30 transition-all hover:scale-105 hover:shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="group-hover:text-primary text-2xl">
                Search Pizza
              </CardTitle>
              <CardDescription>Find a specific pizza by its ID</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};
