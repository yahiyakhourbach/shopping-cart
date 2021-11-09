import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
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
                <Products />
              </div>
              <div className="sidebare">
                <Cart />
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
