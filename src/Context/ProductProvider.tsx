import {useReducer, FC, useRef, MutableRefObject} from "react";

import {Category, Filters, Sorters} from "../Context/ProductContext";
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
  sorters: Sorters;
}

const PRODUCT_INITIAL_STATE: ProductState = {
  products,
  categories,
  selectedCategory: null,
  filters: {
    available: false,
    minPrice: 0,
    maxPrice: -1,
    quantity: -1,
  },
  sorters: {
    available: false,
    price: false,
    quantity: false,
  },
};

export const ProductProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(productReducer, PRODUCT_INITIAL_STATE);
  const filteredProductsByCategory: MutableRefObject<Product[] | undefined> = useRef();
  const filteredProducts: MutableRefObject<Product[] | undefined> = useRef();

  function filterProductsByCategory(category?: Category | null) {
    const filteredProducts = products.filter((product) =>
      category ? product.sublevel_id === category?.id : true,
    );

    filteredProductsByCategory.current = filteredProducts;
    dispatch({type: "Product - Set Products", payload: filteredProducts});
  }

  function setCategory(category: Category | null) {
    dispatch({type: "Product - Set Category", payload: category});
    filterProductsByCategory(category);
  }

  function setFilters(newFilters: Filters) {
    let draft: Product[] = structuredClone(filteredProductsByCategory.current ?? products);

    if (PRODUCT_INITIAL_STATE.filters.available !== newFilters.available) {
      draft = draft.filter((product) => product.available === newFilters.available);
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

    filteredProducts.current = draft;
    dispatch({type: "Product - Set Filters", payload: newFilters});
    dispatch({type: "Product - Set Products", payload: draft});
  }

  function setSorters(newSorters: Sorters) {
    let draft: Product[] = structuredClone(
      filteredProducts.current ?? filteredProductsByCategory.current ?? products,
    );

    if (state.sorters.available !== newSorters.available) {
      newSorters.available
        ? // asc
          (draft = draft.sort((a, b) => Number(b.available) - Number(a.available)))
        : // desc
          (draft = draft.sort((a, b) => Number(a.available) - Number(b.available)));
    } else if (state.sorters.price !== newSorters.price) {
      newSorters.price
        ? // asc
          (draft = draft.sort(
            (a, b) =>
              Number(a.price.split("$")[1].split(",").join(".")) -
              Number(b.price.split("$")[1].split(",").join(".")),
          ))
        : // desc
          (draft = draft.sort(
            (a, b) =>
              Number(b.price.split("$")[1].split(",").join(".")) -
              Number(a.price.split("$")[1].split(",").join(".")),
          ));
    } else if (state.sorters.quantity !== newSorters.quantity) {
      newSorters.quantity
        ? // asc
          (draft = draft.sort((a, b) => a.quantity - b.quantity))
        : // desc
          (draft = draft.sort((a, b) => b.quantity - a.quantity));
    }

    dispatch({type: "Product - Set Sorters", payload: newSorters});
    dispatch({type: "Product - Set Products", payload: draft});
  }

  return (
    <ProductContext.Provider
      value={{
        ...state,
        setCategory,
        setFilters,
        setSorters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
