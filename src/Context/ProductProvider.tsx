import {useReducer, FC} from "react";

import {Category} from "../Context/ProductContext";
import {products} from "../data/products.json";
import {categories} from "../data/categories.json";

import {Product} from "./ProductContext";

import {ProductContext, productReducer} from "./";

interface Props {
  children: React.ReactNode;
}

export interface ProductState {
  products: Product[];
  categories: Category[];
  selectedCategory: Category | null;
}

const PRODUCT_INITIAL_STATE: ProductState = {
  products,
  categories,
  selectedCategory: null,
};

export const ProductProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(productReducer, PRODUCT_INITIAL_STATE);

  function filterProductsByCategory(category?: Category | null) {
    const filteredProducts = products.filter((product) =>
      category ? product.sublevel_id === category?.id : true,
    );

    dispatch({type: "Product - Set Products", payload: filteredProducts});
  }

  function setCategory(category: Category | null) {
    dispatch({type: "Product - Set Category", payload: category});
    filterProductsByCategory(category);
  }

  return (
    <ProductContext.Provider
      value={{
        ...state,
        setCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
