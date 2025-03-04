import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "../components/SidebarLeft";
import ShoppingCart from "../pages/ShoppingCart";
import { useSelector } from "react-redux";
const Dashboard = () => {

  const userDt = useSelector((state) => state.auth);

  console.log("userDt=============>", userDt.user.data.user);
  
  return (
    <>
      <div className="container">
        <div className="sidebarLeft">
          <SidebarLeft />
        </div>

        {/* Dynamic Page */}
        <div className="main-content">
          <Outlet />
        </div>

        <div className="sidebarRight">
          <ShoppingCart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
