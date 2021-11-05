import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: '',
      cartItems: [],
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
    console.log('hello');
  };
  /*RemoveItem function */
  RemoveItem = (item) => {
    const cartItems = this.state.cartItems
      .slice()
      .filter((x) => x._id !== item._id);

    console.log(cartItems);
    this.setState({ cartItems: cartItems });
  };

  filterProduct = (event) => {
    if (event.target.value === '') {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        products: data.products.filter(
          (product) => product.availablesize.indexOf(event.target.value) >= 0
        ),
        size: event.target.value,
      });
    }
  };
  sortProdcut = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'Lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'Highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };

  render() {
    return (
      <div className="grid-container">
        <header className="header">
          <a href="/">Shopping Cart</a>
        </header>
        <main className="main">
          <div className="content">
            <div className="main-content">
              <Filter
                count={this.state.products.length}
                filterProduct={this.filterProduct}
                size={this.state.size}
                sort={this.state.sort}
                sortProduct={this.sortProdcut}
              />
              <Products
                products={this.state.products}
                AddToCart={this.AddToCart}
              />
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
    );
  }
}

export default App;
