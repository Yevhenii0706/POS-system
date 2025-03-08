import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import OrderItem from "../components/OrderItem";
import Footer from "./Footer";

const Orders = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  console.log(orders)

  return (
    <>
      {orders.invoices
        ? orders.invoices.map((order) => <OrderItem key={order._id} order={order} />)
        : "Loading..."}
    </>
  );
};

export default Orders;
