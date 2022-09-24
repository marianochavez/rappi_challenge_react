import {useContext} from "react";
import {Box, Text} from "rebass";

import {ProductContext} from "../Context";

import Filter from "./Filter";
import Menu from "./Menu";

export default function SideBar() {
  const {categories, selectedCategory, setCategory} = useContext(ProductContext);

  return (
    <Box backgroundColor="white" height="100vh" sx={{position: "fixed"}} width="200px">
      <Menu categories={categories} onCategoryClick={setCategory} />
      {selectedCategory && (
        <Text fontSize="18px" py={3}>
          Categoria: <span style={{fontWeight: "bold"}}>{selectedCategory.name}</span>
        </Text>
      )}
      <Filter />
    </Box>
  );
}
