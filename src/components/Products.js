import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchProducts, filterProducts } from '../actions/productActions.js';
import { addtocart } from '../actions/cartAction.js';
Modal.setAppElement('#root');
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModel = (product) => {
    this.setState({ product });
  };
  closeModel = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {!this.props.products ? (
              <div>loading...</div>
            ) : (
              this.props.filtredProducts.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={`#${product._id}`}
                      onClick={() => {
                        this.openModel(product);
                      }}
                    >
                      <img src={product.image} alt={product.title} />
                      <p> {product.title}</p>
                    </a>
                    <div className="product-price">
                      <div> {product.price}$</div>
                      <button
                        className="button primary"
                        onClick={() => {
                          this.props.addtocart(product, this.props.cartItems);
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </Fade>
        {product && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModel}
            style={{
              overlay: { backgroundColor: 'gray' },
            }}
          >
            <Zoom>
              <button
                className="model-close"
                onClick={() => {
                  this.closeModel();
                }}
              >
                X
              </button>
              <div className="product-container">
                <div className="product-img">
                  <img src={product.image} alt={product.title} />
                </div>
                <div class="product-detailes">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <div>
                    Available Sizes:{' '}
                    {product.availablesize.map((x) => {
                      return (
                        <span>
                          <button>{x}</button>{' '}
                        </span>
                      );
                    })}
                  </div>
                  <div className="product-modal-price">
                    <div>{product.price}$</div>
                    <button
                      className="primary"
                      onClick={() => {
                        this.props.addtocart(product, this.props.cartItems);
                        this.closeModel();
                      }}
                    >
                      Add To Card
                    </button>
                  </div>
                </div>
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
    products: state.products.items,
    filtredProducts: state.products.filtredItems,
    cartItems: state.cart.cartItems,
  }),
  {
    fetchProducts,
    filterProducts,
    addtocart,
  }
)(Products);
