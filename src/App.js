import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';
import { cartItems, setCartItems } from './utile';
import store from './store';
import { Provider } from 'react-redux';
const cartItem = cartItems();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: '',
      cartItems: cartItem,
    };
  }
  /* implementing add to cart*/
  AddToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let itemUpdate = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        itemUpdate = true;
      }
    });

    if (!itemUpdate) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems: cartItems });
    setCartItems(cartItems);
  };
  /*RemoveItem function */
  RemoveItem = (item) => {
    const cartItems = this.state.cartItems
      .slice()
      .filter((x) => x._id !== item._id);
    this.setState({ cartItems: cartItems });
    setCartItems(cartItems);
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header className="header">
            <a href="/">Shopping Cart</a>
          </header>
          <main className="main">
            <div className="content">
              <div className="main-content">
                <Filter />
                <Products AddToCart={this.AddToCart} />
              </div>
              <div className="sidebare">
                <Cart
                  cartItems={this.state.cartItems}
                  RemoveItem={this.RemoveItem}
                />
              </div>
            </div>
          </main>
          <footer className="footer"> all Right is reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
