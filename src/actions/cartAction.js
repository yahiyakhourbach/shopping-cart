import { ADD_TO_CART, DELETE_FROM_CART } from '../types';
import { setCartItems } from '../utile';

export const addtocart = (product) => (dispatch, getState) => {
  let shoudUpdat = false;
  let cartItems = getState().cart.cartItems.slice();
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      x.count++;
      shoudUpdat = true;
    }
  });
  if (!shoudUpdat) {
    cartItems.push({ ...product, count: 1 });
  }
  setCartItems(cartItems);
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  setCartItems(cartItems);
};

export const RemoveFromCart = (product, items) => (dispatch) => {
  let cartItems = items.slice();
  cartItems = cartItems.filter((x) => x._id !== product._id);
  setCartItems(cartItems);
  dispatch({
    type: DELETE_FROM_CART,
    payload: { cartItems },
  });
};
