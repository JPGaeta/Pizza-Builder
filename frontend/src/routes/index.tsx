import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListPizzas } from "@/pages/ListPizzas";
import { CreatePizza } from "@/pages/CreatePizza";
import { SearchPizza } from "@/pages/SearchPizza";
import { Home } from "@/pages/Home";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPizzas />} />
        <Route path="/create" element={<CreatePizza />} />
        <Route path="/search" element={<SearchPizza />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
