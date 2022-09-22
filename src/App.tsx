import React, {useMemo, useState} from "react";
import {Box, Text} from "rebass";

import Cart from "./components/Cart";
import Menu from "./components/Menu";
import {categories} from "./data/categories.json";
import {products} from "./data/products.json";

export type Category = {
  id: number;
  name: string;
  sublevels?: Category[];
};

export type Product = {
  quantity: number;
  price: string;
  available: boolean;
  sublevel_id: number;
  name: string;
  id: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

function App() {
  const [category, setCategory] = useState<Category | null>();

  const matches = useMemo(
    () => products.filter((product) => (category ? product.sublevel_id === category?.id : true)),
    [category],
  );

  return (
    <Box>
      <Menu categories={categories} onCategoryClick={(category) => setCategory(category)} />
      {category && (
        <Text fontSize="18px" py={3}>
          Categoria seleccionada: <span style={{fontWeight: "bold"}}>{category.name}</span>
        </Text>
      )}
      <Cart products={matches} />
    </Box>
  );
}

export default App;
