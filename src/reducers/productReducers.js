import { Fetch_PRODUCTS } from '../types';

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case Fetch_PRODUCTS:
      return { items: action.payload };
    default:
      return state;
  }
};
