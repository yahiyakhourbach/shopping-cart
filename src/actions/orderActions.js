import { ClEAR_CART, CLEAR_ORDER, CREATE_ORDER } from '../types';

export const createOrder = (order) => (dispatch) => {
  fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: CREATE_ORDER,
        payload: data,
      });
    });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
