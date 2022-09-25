import React, {useContext, useState} from "react";
import {Box, Button, Flex, Text} from "rebass";

import {ProductContext, Sorters} from "../context";

const SortBar = () => {
  const {sorters, setSorters} = useContext(ProductContext);
  const [isTouched, setIsTouched] = useState({available: false, price: false, quantity: false});

  function handleSort(id: string) {
    let draft: Sorters = structuredClone(sorters);

    if (id === "available") {
      draft.available = !draft.available;
      setIsTouched({price: false, quantity: false, available: true});
    } else if (id === "price") {
      draft.price = !draft.price;
      setIsTouched({price: true, quantity: false, available: false});
    } else if (id === "quantity") {
      draft.quantity = !draft.quantity;
      setIsTouched({price: false, quantity: true, available: false});
    }

    setSorters(draft);
  }

  return (
    <Flex flexDirection="column" ml="200px" my={2}>
      <Text alignSelf="end" fontWeight="bold">
        Ordenar por
      </Text>
      <Flex alignSelf="end" flexDirection="row">
        <Flex alignItems="center" bg="lightgray">
          <Box mx={2}>Precio</Box>
          <Button
            bg="transparent"
            color="black"
            py={1}
            sx={{":hover": {background: "gray"}}}
            onClick={() => handleSort("price")}
          >
            {!isTouched.price ? "-" : sorters.price ? "🔼" : "🔽"}
          </Button>
        </Flex>
        <Flex alignItems="center" bg="lightgray">
          <Box mx={2}>Disponibilidad</Box>
          <Button
            bg="transparent"
            color="black"
            py={1}
            sx={{":hover": {background: "gray"}}}
            onClick={() => handleSort("available")}
          >
            {!isTouched.available ? "-" : sorters.available ? "🔼" : "🔽"}
          </Button>
        </Flex>
        <Flex alignItems="center" bg="lightgray">
          <Box mx={2}>Cantidad</Box>
          <Button
            bg="transparent"
            color="black"
            id="quantity"
            py={1}
            sx={{":hover": {background: "gray"}}}
            onClick={() => handleSort("quantity")}
          >
            {!isTouched.quantity ? "-" : sorters.quantity ? "🔼" : "🔽"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SortBar;
