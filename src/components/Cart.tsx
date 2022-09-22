import {useState} from "react";
import {Box} from "rebass";

import {CartItem, Product} from "../App";

import CardProduct from "./CardProduct";

type CartProps = {
  products: Product[];
};

function Cart({products}: CartProps) {
  const [cart, setCart] = useState<Map<Product["id"], CartItem>>(
    () => new Map<Product["id"], CartItem>(),
  );

  function handleIncrement(product: Product) {
    const draft: Map<Product["id"], CartItem> = structuredClone(cart);
    const item = draft.get(product.id);

    if (item) {
      item.quantity += 1;
    } else {
      draft.set(product.id, {quantity: 1, product} as CartItem);
    }

    setCart(draft);
  }

  function handleDecrement(product: Product) {
    const draft: Map<Product["id"], CartItem> = structuredClone(cart);
    const item = draft.get(product.id);

    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        draft.delete(product.id);
      }
    }

    setCart(draft);
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(4,1fr)",
      }}
    >
      {products.map((product) => {
        return (
          <CardProduct
            key={product.id}
            cart={cart}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            product={product}
          />
        );
      })}
    </Box>
  );
}

export default Cart;
