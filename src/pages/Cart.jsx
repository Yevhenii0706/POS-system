import { React, useEffect } from "react";
import { FaHome, FaTimes } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import {
  clearCart,
  increase,
  decrease,
  productSubTotal,
  productTotalAmount,
  productTax,
  removeCartItem,
} from "../features/cart/cartSlice";
import { orderCreate } from "../features/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteLocalStorageCart } from "../utils/localStorage";

const Cart = () => {
  const { cartItems, subTotal, totalAmount, tax } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productSubTotal());
    dispatch(productTax());
    dispatch(productTotalAmount());
  }, [dispatch, cartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(orderCreate(cartItems));
    dispatch(clearCart());
    deleteLocalStorageCart();
    navigate("/dashboard/orders");
  };

  if (cartItems.length === 0) {
    return (
      <div className="info-details">
        <div className="icon-info">
          <div className="icon">
            <Link to="/dashboard">
              <FaHome className="icon-cart" />
            </Link>
          </div>
          <span>Return to the main page and add products to the cart.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <a href="/dashboard" className="logo">
            Shopping Cart
          </a>
          <ul className="navigation">
            <li className="cart-items">Cart Items: {cartItems.length}</li>
          </ul>
        </header>
      </div>

      <div id="shop-container">
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <button className="pay-button" onClick={handleSubmit}>
            Pay Now
          </button>
        </div>
        <div id="cart">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <td></td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {cartItems ? (
                cartItems.map((product) => (
                  <tr key={product.productId}>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeCartItem(product.productId));
                        }}
                      >
                        <FaTimes />
                      </button>
                    </td>
                    <td>
                      {product.image ? (
                        <img
                          className="product-image"
                          src={product.image}
                          alt="..."
                        />
                      ) : (
                        <img
                          className="default-image"
                          src={require("../images/product.png")}
                          alt="..."
                        />
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>$ {product.price.toFixed(2)}</td>
                    <td>
                      <div className="count">
                        <button
                          className="increment-btn"
                          type="button"
                          onClick={() => {
                            dispatch(increase(product.productId));
                          }}
                        >
                          +
                        </button>
                        <span className="amount">{product.quantity}</span>
                        <button
                          className="decrement-btn"
                          type="button"
                          onClick={() => {
                            dispatch(decrease(product.productId));
                          }}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>$ {(product.price * product.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <div>Products Loading...</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
