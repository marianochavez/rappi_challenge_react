import {Box, Flex} from "rebass";
import {Input, Label, Slider} from "@rebass/forms";
import React, {useContext} from "react";

import {ProductContext} from "../Context";

const Filter = () => {
  const {filters, setFilters} = useContext(ProductContext);

  function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const filterName = event.target.name;
    let value;

    if (filterName === "avaible") {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    const newFilters = structuredClone(filters);

    newFilters[filterName] = value;
    setFilters(newFilters);
  }

  return (
    <Box mr={2} mt={2} p={2} sx={{border: "1px solid black"}}>
      <Flex flexDirection="column">
        <Box>
          <Label>Disponibilidad</Label>
          <input
            checked={filters.avaible}
            id="avaible"
            name="avaible"
            type="checkbox"
            onChange={handleFilter}
          />
        </Box>
        <Box>
          <Label>Precio Mínimo: {filters.minPrice === 0 ? "" : filters.minPrice}</Label>
          <Slider min={0} name="minPrice" value={filters.minPrice} onChange={handleFilter} />
        </Box>
        <Box>
          <Label>Precio Máximo: {filters.maxPrice === -1 ? "" : filters.maxPrice}</Label>
          <Slider min={0} name="maxPrice" value={filters.maxPrice} onChange={handleFilter} />
        </Box>
        <Box>
          <Label>Cantidad</Label>
          <Input
            min={1}
            name="quantity"
            type="number"
            value={filters.quantity === -1 ? "" : filters.quantity}
            onChange={handleFilter}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Filter;
