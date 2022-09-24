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

interface ContextProps {
  products: Product[];
  categories: Category[];
  selectedCategory: Category | null;
  setCategory: (category: Category | null) => void;
}

export const ProductContext = createContext({} as ContextProps);
