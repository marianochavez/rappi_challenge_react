import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Box, Flex, Text} from "rebass";

import {Product, ProductContext} from "../context";

import CardProduct from "./CartItem";
import CartModal from "./CartModal";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartProps = {};

function Cart({}: CartProps) {
  const {products} = useContext(ProductContext);
  const [cart, setCart] = useCartLocalStorage();
  const [cartQuantity, setCartQuantity] = useState(0);
  const cartRef: React.MutableRefObject<Map<Product["id"], CartItem> | undefined> = useRef();

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  const handleIncrement = useCallback(
    (product: Product) => {
      const draft: Map<Product["id"], CartItem> = structuredClone(cartRef.current);
      const item = draft.get(product.id);

      if (item) {
        item.quantity += 1;
      } else {
        draft.set(product.id, {product, quantity: 1} as CartItem);
      }
      setCartQuantity((quantity) => ++quantity);

      setCart(draft);
    },
    [setCart],
  );

  const handleDecrement = useCallback(
    (product: Product) => {
      const draft: Map<Product["id"], CartItem> = structuredClone(cartRef.current);
      const item = draft.get(product.id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          draft.delete(product.id);
        }
        setCartQuantity((quantity) => --quantity);
      }

      setCart(draft);
    },
    [setCart],
  );

  return (
    <Box>
      <Flex alignItems="center" flexDirection="row" p={2}>
        <Text flex={1} marginLeft="200px">
          Items en el carrito: <span style={{fontWeight: "bold"}}>{cartQuantity}</span>
        </Text>
        <CartModal cart={cart} cartQuantity={cartQuantity} setCart={setCart} />
      </Flex>

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
    </Box>
  );
}

export default Cart;

export function useCartLocalStorage(): [
  Map<Product["id"], CartItem>,
  (newCart: Map<Product["id"], CartItem>) => void,
] {
  const initialValue = new Map<Product["id"], CartItem>();
  const [cart, setStoredCart] = useState<Map<Product["id"], CartItem>>(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart) {
      return new Map(cart.map((item: Record<Product["id"], CartItem>) => [item[0], item[1]]));
    } else {
      return initialValue;
    }
  });

  function setCart(newCart: Map<Product["id"], CartItem>) {
    setStoredCart(newCart);
    localStorage.setItem("cart", JSON.stringify(Array.from(newCart)));
  }

  return [cart, setCart];
}
