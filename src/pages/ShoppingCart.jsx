import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  increase,
  decrease,
  productSubTotal,
  productTotalAmount,
  productTax,
  removeCartItem,
  clearCart,
} from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { clearValues } from "../features/product/productSlice";

const ShoppingCart = () => {
  const { cartItems, subTotal, totalAmount, tax } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productSubTotal());
    dispatch(productTax());
    dispatch(productTotalAmount());
  }, [dispatch, cartItems]);

  return (
    <div className="cart">
      <div className="cart-header" style={{height:"50px"}}>
        <div className="cart-title">
          <span>INVOICE</span>
        </div>
      </div>
      <div  style={{flex:1,overflowY:"auto"}}>
        {cartItems ? (
          cartItems.map((cart) => (
            <div className="cart-items" key={cart.productId}>
              <div className="image">
                {cart.image ? (
                  <img className="product-image" src={cart.image} alt="..." />
                ) : (
                  <img
                    className="default-image"
                    src={require("../images/product.png")}
                    alt="..."
                  />
                )}
              </div>

              <div className="info">
                <h4>{cart.name}</h4>

                <button
                  className="remove-item"
                  type="button"
                  onClick={() => {
                    dispatch(removeCartItem(cart.productId));
                  }}
                >
                  X
                </button>

                <div className="details">
                  <div className="price">
                    <p>$ {cart.price}</p>
                  </div>

                  <div className="count">
                    <button
                      className="increment-btn"
                      type="button"
                      onClick={() => {
                        dispatch(increase(cart.productId));
                      }}
                    >
                      +
                    </button>
                    <span className="amount">{cart.quantity}</span>
                    <button
                      className="decrement-btn"
                      type="button"
                      onClick={() => {
                        dispatch(decrease(cart.productId));
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Products Loading...</div>
        )}
      </div>

      <div
        className="total-card"
        style={{ height: "270px", background: "white",textAlign:"center" }}
      >
        <div className="total-items">
          <span className="items-count">Items ({cartItems.length})</span>
          <span className="items-price">$ {subTotal.toFixed(2)}</span>
        </div>
        <div className="item-taxs">
          <span className="item-tax">Tax (%8)</span>
          <span className="item-tax-price">$ {tax.toFixed(2)}</span>
        </div>
        <div className="divider"></div>
        <div className="total">
          <span className="total-text">Total </span>
          <span className="total-item-price">$ {totalAmount.toFixed(2)}</span>
        </div>

        <div className="pay">
          <button className="pay-btn" onClick={() => dispatch(clearCart())}>
            Reset
          </button>
          &nbsp;&nbsp;
          <button className="pay-btn" onClick={() => navigate("/cart")}>
            Pay Now
          </button>
        </div>
        <br />
        <span style={{fontWeight:"bold"}}>Copyright@2025</span>
      </div>
    </div>
  );
};

export default ShoppingCart;
