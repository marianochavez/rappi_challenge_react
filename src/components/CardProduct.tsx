import {Box, Button, Flex, Text} from "rebass";

import {CartItem, Product} from "../App";

type CardProductProps = {
  product: Product;
  cart: Map<Product["id"], CartItem>;
  handleIncrement: (product: Product) => void;
  handleDecrement: (product: Product) => void;
};

export default function CardProduct({
  product,
  cart,
  handleIncrement,
  handleDecrement,
}: CardProductProps) {
  const item = cart.get(product.id);

  return (
    <Box bg="FloralWhite" p={2} style={{border: "1px solid black", borderRadius: "15px"}}>
      <Text fontWeight="bold" p={1}>
        {product.name}
      </Text>
      <Text p={1}>{product.price}</Text>
      <Flex alignItems="center" style={{gap: 3}}>
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
