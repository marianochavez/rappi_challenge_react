import {Category, Filters, Product, Sorters} from "./ProductContext";
import {ProductState} from "./ProductProvider";

type ProductActionType =
  | {type: "Product - Set Category"; payload: Category | null}
  | {type: "Product - Set Products"; payload: Product[]}
  | {type: "Product - Set Filters"; payload: Filters}
  | {type: "Product - Set Sorters"; payload: Sorters};

export const productReducer = (state: ProductState, action: ProductActionType): ProductState => {
  switch (action.type) {
    case "Product - Set Category":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "Product - Set Products":
      return {
        ...state,
        products: action.payload,
      };
    case "Product - Set Filters":
      return {
        ...state,
        filters: action.payload,
      };

    case "Product - Set Sorters":
      return {
        ...state,
        sorters: action.payload,
      };

    default:
      return state;
  }
};
