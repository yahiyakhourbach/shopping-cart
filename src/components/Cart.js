import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { RemoveFromCart } from '../actions/cartAction';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false };
  }
  render() {
    return (
      <div>
        {this.props.cartItems.length === 0 ? (
          <div className="cart cart-header">your cart is empty</div>
        ) : (
          <>
            <div className="cart cart-header">
              you have {this.props.cartItems.length} in your shopping cart
            </div>
            <div>
              <Fade top cascade>
                <ul className="cart-body">
                  {this.props.cartItems.map((item) => (
                    <li key={item._id}>
                      <div className="cartItem-container">
                        <div className="cartItem-image">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="cartItem-body">
                          <div>{item.title}</div>
                          <div>
                            <div className="cartItem-detailes">
                              <div>
                                {item.count} X {item.price}
                              </div>
                              <button
                                onClick={() => {
                                  this.props.RemoveFromCart(
                                    item,
                                    this.props.cartItems
                                  );
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Fade>
            </div>
            <div className="cart-checkout">
              <div>
                {this.props.cartItems
                  .reduce((a, b) => {
                    return a + b.price * b.count;
                  }, 0)
                  .toFixed(2)}
                $
              </div>
              <button
                className="primary"
                onClick={() => {
                  this.setState({ showForm: true });
                }}
              >
                {' '}
                procced
              </button>
            </div>
          </>
        )}
        {this.state.showForm && (
          <div className="sheckout-container">
            <Fade bottom cascade>
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" />
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({ showForm: false });
                    }}
                  >
                    {' '}
                    Cancel
                  </button>
                  <button type="submit" className="primary">
                    checkout
                  </button>
                </div>
              </form>
            </Fade>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { RemoveFromCart }
)(Cart);

/*connect(
  (state) => ({
    cartItems: state.cart.items,
  }),
  RemoveFromCart
)(Cart);
 */

/*onClick={() => {
  this.props.RemoveFromCart(item);
 }} */
