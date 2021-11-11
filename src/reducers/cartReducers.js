import { ADD_TO_CART, ClEAR_CART, DELETE_FROM_CART } from '../types';
import { cartItems } from '../utile';

export const cartReducer = (state = { cartItems: cartItems() }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case DELETE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    case ClEAR_CART:
      return { cartItems: [] };
    default:
      return state;
  }
};
