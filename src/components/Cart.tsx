import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Box} from "rebass";

import {Product, ProductContext} from "../Context";

import CardProduct from "./CartItem";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartProps = {};

function Cart({}: CartProps) {
  const {products} = useContext(ProductContext);
  const [cart, setCart] = useState<Map<Product["id"], CartItem>>(
    () => new Map<Product["id"], CartItem>(),
  );
  const cartRef: React.MutableRefObject<Map<Product["id"], CartItem> | undefined> = useRef();

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  const handleIncrement = useCallback((product: Product) => {
    const draft: Map<Product["id"], CartItem> = structuredClone(cartRef.current);
    const item = draft.get(product.id);

    if (item) {
      item.quantity += 1;
    } else {
      draft.set(product.id, {product, quantity: 1} as CartItem);
    }

    setCart(draft);
  }, []);

  const handleDecrement = useCallback((product: Product) => {
    const draft: Map<Product["id"], CartItem> = structuredClone(cartRef.current);
    const item = draft.get(product.id);

    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        draft.delete(product.id);
      }
    }

    setCart(draft);
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(4,1fr)",
        marginLeft: "200px",
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
