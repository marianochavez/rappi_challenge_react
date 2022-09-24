import {Category, Product} from "./ProductContext";
import {ProductState} from "./ProductProvider";

type ProductActionType =
  | {type: "Product - Set Category"; payload: Category | null}
  | {type: "Product - Set Products"; payload: Product[]};

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

    default:
      return state;
  }
};
