import {memo} from "react";
import {Box, Button, Flex, Text} from "rebass";

import {Product} from "../context";

import {CartItem} from "./Cart";

type CardItemProps = {
  product: Product;
  cart: Map<Product["id"], CartItem>;
  handleIncrement: (product: Product) => void;
  handleDecrement: (product: Product) => void;
};

function CardItem({product, cart, handleIncrement, handleDecrement}: CardItemProps) {
  const item = cart.get(product.id);

  return (
    <Box bg="FloralWhite" p={2} style={{border: "1px solid black", borderRadius: "15px"}}>
      <Text fontWeight="bold" p={1}>
        {product.name}
      </Text>
      <Text p={1}>{product.price}</Text>
      <Text p={1}>{product.available ? "Disponible" : "No disponible"}</Text>
      <Text p={1}>Stock: {product.quantity}</Text>
      <Flex alignItems="center" p={1} style={{gap: 3}}>
        <Button bg="gray" color="white" p={1} px={2} onClick={() => handleDecrement(product)}>
          -
        </Button>
        {item?.quantity || 0}

        <Button bg="gray" color="white" p={1} px={2} onClick={() => handleIncrement(product)}>
          +
        </Button>
      </Flex>
    </Box>
  );
}

export default memo(
  CardItem,
  (preValues, nextValues) =>
    preValues.cart.get(nextValues.product.id)?.quantity ===
    nextValues.cart.get(nextValues.product.id)?.quantity,
);
