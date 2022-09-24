import {memo, useState} from "react";
import {Box, Button, Flex, Text} from "rebass";

import {Category} from "../Context";

type MenuProps = {
  categories: Category[];
  onCategoryClick: (category: Category | null) => void;
  style?: React.CSSProperties;
};

type MenuItemProps = {
  category: Category;
  onClick: (category: Category | null) => void;
};

function MenuItem({category, onClick}: MenuItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleCollapse(event: any) {
    if (!isCollapsed) {
      event.stopPropagation();
      onClick(null);
    }

    setIsCollapsed((isCollapsed) => !isCollapsed);
  }

  return (
    <Flex key={category.id} flexDirection="column">
      <Flex alignItems="center" onClick={() => onClick(category)}>
        <Text fontSize="16px" mr={2} style={{cursor: "pointer"}}>
          {category.name}
        </Text>
        {category.sublevels && (
          <Button
            bg="AntiqueWhite"
            color="gray"
            my={1}
            p={1}
            style={{cursor: "pointer"}}
            onClick={handleCollapse}
          >
            {isCollapsed ? "Mostrar" : "Cerrar"}
          </Button>
        )}
      </Flex>
      {category.sublevels && !isCollapsed && (
        <Menu categories={category.sublevels} style={{marginLeft: 20}} onCategoryClick={onClick} />
      )}
    </Flex>
  );
}

function Menu({categories, onCategoryClick, style}: MenuProps) {
  return (
    <Box style={style}>
      {categories.map((category) => (
        <MenuItem key={category.id} category={category} onClick={onCategoryClick} />
      ))}
    </Box>
  );
}

export default memo(
  Menu,
  (prevValues, nextValues) => prevValues.categories === nextValues.categories,
);
