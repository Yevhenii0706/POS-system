import React, { useState } from "react";
import OrderPrint from "../components/OrderPrint";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeOrder } from "../features/order/orderSlice";

const OrderItem = ({ order }) => {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const deleteOrder = (order) => {
  //   dispatch(removeOrder(order));
  //   navigate("/dashboard");
  // };
  // <div className="order-details" key={order._id}>
  //   <div className="order-title">
  //     <span className="order-id">Order Id: # {order._id}</span>
  //     <span className="order-time"> Customer: {order.customer} </span>
  //   </div>

  //   <div className="order-total">
  //     <span className="qta">
  //       Sold :
  //       {order.cartItems.reduce((prev, cur) => {
  //         return prev + cur.quantity;
  //       }, 0)}
  //     </span>

  //     <span className="order-price-detail">
  //       <span className="order-price">$ {order.totalAmount.toFixed(2)}</span>
  //     </span>
  //   </div>

  //   {(order.user === user._id || user.admin === true) && (
  //     <div>
  //       <button
  //         className="order-delete"
  //         onClick={() => {
  //           deleteOrder(order);
  //         }}
  //       >
  //         X
  //       </button>
  //     </div>
  //   )}
  // </div>
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };
  return (
    <div className="order-box">
      <div className="order-header" onClick={toggleDetails}>
        <div>
          <div>{order.customerName}</div>
          <span>
            {order.products.length} Items ${order.totalAmount}{" "}
            {new Date(order.invoiceDate).toLocaleDateString()}
          </span>
        </div>
        <div className="toggle-btn">
          {isDetailsVisible ? "▲" : "▼"}
          <OrderPrint order={order} />
        </div>
      </div>
      {isDetailsVisible && (
        <div className="order-details">
          <div className="product-list">
            {order.products.map((prod) => {
              return (
                <div className="product">
                  {prod.image ? (
                    <img className="product-image" src={prod.image} alt="..." />
                  ) : (
                    <img
                      className="default-image"
                      src={require("../images/product.png")}
                      alt="..."
                    />
                  )}
                  <div className="product-info">
                    <div className="product-name">{prod.productId}</div>
                    <div className="product-price">
                      {prod.quantity} ${prod.amount}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
