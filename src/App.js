import React from 'react';
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
    };
  }
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
    console.log(event.target.value);
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebare">shopping cart</div>
          </div>
        </main>
        <footer className="footer"> all Right is reserved</footer>
      </div>
    );
  }
}

export default App;
