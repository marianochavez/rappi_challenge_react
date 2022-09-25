import {createContext} from "react";

export type Category = {
  id: number;
  name: string;
  sublevels?: Category[];
};

export type Product = {
  quantity: number;
  price: string;
  available: boolean;
  sublevel_id: number;
  name: string;
  id: string;
};

export type Filters = {
  available: boolean;
  minPrice: number;
  maxPrice: number;
  quantity: number;
};

export type Sorters = {
  available: boolean;
  price: boolean;
  quantity: boolean;
};

interface ContextProps {
  products: Product[];

  categories: Category[];
  selectedCategory: Category | null;
  setCategory: (category: Category | null) => void;

  filters: Filters;
  setFilters(newFilters: Filters): void;

  sorters: Sorters;
  setSorters: (newSorters: Sorters) => void;
}

export const ProductContext = createContext({} as ContextProps);
