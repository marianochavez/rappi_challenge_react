import {useReducer, FC, useRef, MutableRefObject} from "react";

import {Category, Filters} from "../Context/ProductContext";
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
  filters: Filters;
}

const PRODUCT_INITIAL_STATE: ProductState = {
  products,
  categories,
  selectedCategory: null,
  filters: {
    avaible: true,
    minPrice: 0,
    maxPrice: -1,
    quantity: -1,
  },
};

export const ProductProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(productReducer, PRODUCT_INITIAL_STATE);
  const filteredProductsRef: MutableRefObject<Product[] | undefined> = useRef();

  function filterProductsByCategory(category?: Category | null) {
    const filteredProducts = products.filter((product) =>
      category ? product.sublevel_id === category?.id : true,
    );

    filteredProductsRef.current = filteredProducts;
    dispatch({type: "Product - Set Products", payload: filteredProducts});
  }

  function setCategory(category: Category | null) {
    dispatch({type: "Product - Set Category", payload: category});
    filterProductsByCategory(category);
  }

  function setFilters(newFilters: Filters) {
    let draft: Product[] = structuredClone(filteredProductsRef.current ?? products);

    if (PRODUCT_INITIAL_STATE.filters.avaible !== newFilters.avaible) {
      draft = draft.filter((product) => product.available === newFilters.avaible);
    }
    if (PRODUCT_INITIAL_STATE.filters.minPrice !== newFilters.minPrice) {
      draft = draft.filter(
        (product) =>
          Number(product.price.split("$")[1].split(",").join(".")) >= Number(newFilters.minPrice),
      );
    }
    if (PRODUCT_INITIAL_STATE.filters.maxPrice !== newFilters.maxPrice) {
      draft = draft.filter(
        (product) =>
          Number(product.price.split("$")[1].split(",").join(".")) <= newFilters.maxPrice,
      );
    }
    if (PRODUCT_INITIAL_STATE.filters.quantity !== newFilters.quantity) {
      draft = draft.filter((product) => product.quantity >= Number(newFilters.quantity));
    }

    dispatch({type: "Product - Set Filters", payload: newFilters});
    dispatch({type: "Product - Set Products", payload: draft});
  }

  return (
    <ProductContext.Provider
      value={{
        ...state,
        setCategory,
        setFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
