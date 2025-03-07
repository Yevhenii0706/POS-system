import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import { allUsers } from "../features/auth/authSlice";

const Statistics = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div className="statistic-layout">
      <div className="statistics">
        <div className="image">
          <img src={require("../images/order.png")} alt="..." />
        </div>
        <span className="statistic-title">Orders</span>
        <span className="statistic-count">{orders.length}</span>
      </div>
      <div className="statistics">
        <div className="image">
          <img src={require("../images/users.png")} alt="..." />
        </div>
        <span className="statistic-title">Users</span>
        <span className="statistic-count">{users.length}</span>
      </div>
      <div className="statistics">
        <div className="image">
          <img src={require("../images/product.png")} alt="..." />
        </div>
        <span className="statistic-title">Products</span>
        <span className="statistic-count">{products.length}</span>
      </div>
    </div>
  );
};

export default Statistics;
