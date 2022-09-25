import {useMemo, useState} from "react";
import {Box, Button, Flex, Text} from "rebass";

import {Product} from "../Context";

import {CartItem} from "./Cart";

type CartModalProps = {
  cart: Map<Product["id"], CartItem>;
  setCart: (newCart: Map<string, CartItem>) => void;
  cartQuantity: number;
};

const CartModal = ({cart, cartQuantity, setCart}: CartModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const totalCart = useMemo(() => {
    let total = 0;

    [...cart.values()].map(
      (product) =>
        (total +=
          product.quantity * Number(product.product.price.split("$")[1].split(",").join("."))),
    );

    return total.toFixed(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isPaid]);

  function handleClose() {
    setIsOpen(false);
    setIsPaid(false);
  }

  function handlePayment() {
    setCart(new Map<Product["id"], CartItem>());
    setIsPaid(true);
  }

  return (
    <Box sx={{position: "relative"}}>
      <Button color="black" sx={{":hover": {background: "gray"}}} onClick={() => setIsOpen(true)}>
        Ver carrito
      </Button>

      {isOpen && (
        <>
          <Box
            backgroundColor="black"
            height="100vh"
            sx={{position: "fixed", top: 0, left: 0, zIndex: 9, opacity: "50%"}}
            width="100vw"
          />
          <Flex
            backgroundColor="white"
            flexDirection="column"
            height="70vh"
            marginLeft="-28vw"
            marginTop="-28vh"
            p={2}
            sx={{position: "fixed", top: "50%", zIndex: 99, left: "50%", border: "2px solid black"}}
            width="70vw"
          >
            <Flex flexDirection="row">
              <Text flex={1} fontSize="2em" fontWeight="bold">
                Carrito
              </Text>
              <Button bg="red" color="black" onClick={handleClose}>
                X
              </Button>
            </Flex>
            <Flex flexDirection="column" height="100%" mt={2} overflowY="auto">
              {isPaid ? (
                <Text>Compra realizada</Text>
              ) : cart.size === 0 ? (
                <Text>Carrito vacío</Text>
              ) : (
                [...cart.values()].map(({product, quantity}, i) => (
                  <Box key={product.id}>
                    <Flex flex={1} flexDirection="row">
                      <Text flex={1} fontWeight="bold">
                        {i}. {product.name}
                      </Text>
                      <Flex flex={1} flexDirection="row" justifyContent="end">
                        <Text>
                          <span style={{fontWeight: "bold"}}>{quantity}</span> x{" "}
                        </Text>
                        <Text ml={2} width="70px">
                          {product.price}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                ))
              )}
            </Flex>
            <Flex flexDirection="row" mt={2}>
              <Box flex={1}>
                <Text fontWeight="bold">
                  Cantidad de productos: <span style={{fontWeight: "normal"}}>{cartQuantity}</span>
                </Text>
                <Text fontWeight="bold">
                  Total: <span style={{fontWeight: "normal"}}>$ {totalCart}</span>
                </Text>
              </Box>
              <Button
                bg="green"
                color="black"
                disabled={Number(totalCart) === 0}
                sx={{":disabled": {background: "gray"}}}
                onClick={handlePayment}
              >
                Pagar
              </Button>
            </Flex>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CartModal;
