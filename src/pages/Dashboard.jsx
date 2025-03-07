import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "../components/SidebarLeft";
import ShoppingCart from "../pages/ShoppingCart";
import { useSelector } from "react-redux";
const Dashboard = () => {
  // const userDt = useSelector((state) => state.auth);

  // console.log("userDt=============>", userDt.user.data.user);

  return (
    <>
      <div className="container" style={{position:"relative"}}>
        <div className="sidebarLeft">
          <SidebarLeft />
        </div>

        {/* Dynamic Page */}
        <div className="main-content" style={{maxHeight:"100vh"}}>
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
