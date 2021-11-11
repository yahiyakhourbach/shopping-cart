import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { RemoveFromCart, clearCart } from '../actions/cartAction';
import { createOrder, clearOrder } from '../actions/orderActions';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false, name: '', email: '', address: '' };
  }

  creatOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
    localStorage.clear('cartItems');
    this.props.clearCart();
    this.setState({ showForm: false });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        {!this.props.cartItems.length ? (
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
              <form autoComplete="off" onSubmit={this.creatOrder}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" onChange={this.handleInput} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleInput}
                  />
                </div>
                <div className="form-group">
                  <label>address</label>
                  <input
                    type="text"
                    name="address"
                    onChange={this.handleInput}
                  />
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
        {this.props.order && (
          <Modal
            isOpen={true}
            style={{
              overlay: {
                backgroundColor: 'gray',
              },
              content: {
                height: '40rem',
                width: '60rem',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              },
            }}
          >
            <Zoom>
              <button onClick={this.closeModal}>x</button>
              <div className="order-detailes">
                <p>congrats you placed an Order</p>
                <ul>
                  <li>
                    <h2>Order:{this.props.order._id}</h2>
                  </li>
                  <li>
                    <div>Name:</div>
                    <div>{this.props.order.name}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{this.props.order.total}</div>
                  </li>
                  <li>
                    <div>address:</div>
                    <div>{this.props.order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{this.props.order.createdAt}</div>
                  </li>
                  <li>
                    <div className="prodcut-order">
                      {this.props.order.cartItems.map((item) => (
                        <>
                          <div>
                            cartItems:
                            {item.count} x {item.title}
                          </div>
                        </>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
  }),
  { RemoveFromCart, createOrder, clearOrder, clearCart }
)(Cart);
