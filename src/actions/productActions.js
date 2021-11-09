import {
  Fetch_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from '../types';
export const fetchProducts = () => async (dispatch) => {
  const res = await fetch('http://localhost:5000/api/products');
  const data = await res.json();
  dispatch({
    type: Fetch_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (prodcuts, size) => async (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ''
          ? prodcuts
          : prodcuts.filter((x) => x.availableSize.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, order) => (dispatch) => {
  const sortedproducts = filteredProducts.slice();
  if (order === 'Latest') {
    sortedproducts.sort((a, b) => {
      return a._id < b._id ? 1 : -1;
    });
  } else
    sortedproducts.sort((a, b) => {
      return order === 'Heighest'
        ? a.price < b.price
          ? 1
          : -1
        : a.price > b.price
        ? 1
        : -1;
    });
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      order: order,
      items: sortedproducts,
    },
  });
};
