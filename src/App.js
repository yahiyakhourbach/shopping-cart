import React from 'react';
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

  render() {
    return (
      <div className="grid-container">
        <header className="header">
          <a href="/">Shopping Cart</a>
        </header>
        <main className="main">
          <div className="content">
            <div className="main-content">
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
