import {
  Fetch_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from '../types';

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case Fetch_PRODUCTS:
      return { items: action.payload, filtredItems: action.payload };
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        filtredItems: action.payload.items,
        size: action.payload.size,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        filtredItems: action.payload.items,
        order: action.payload.order,
      };
    default:
      return state;
  }
};
