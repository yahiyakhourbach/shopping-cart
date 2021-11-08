import { Fetch_PRODUCTS } from '../types';
export const fetchProducts = () => async (dispatch) => {
  const res = await fetch('/api/products');
  const data = await res.json();
  dispatch({
    type: Fetch_PRODUCTS,
    payload: data,
  });
};
