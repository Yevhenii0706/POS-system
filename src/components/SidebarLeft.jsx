import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaShopify,
  FaSignInAlt,
  FaWpforms,
  FaUserTag,
  FaPlus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const SidebarLeft = () => {

  const user = useSelector((state) => state.auth.user);

  console.log("user === > ", user);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <div className="menu-links">
        <Link to="/dashboard">
          <FaHome className="menu-icon" />
          Home
        </Link>
        <Link to="/dashboard/orders">
          <FaShopify className="menu-icon" />
          Orders
        </Link>
        {(user.role === "admin") ? (
          <Link to="/dashboard/manage">
            <FaWpforms className="menu-icon" />
            Manange
          </Link>
        ) : ""}

        <Link to="/cart">
          <FaShoppingCart className="menu-icon" />
          Cart
        </Link>
        <Link to="/reset">
          <FaUserTag className="menu-icon" style={{ textAlign: "center" }} />
          Reset
        </Link>
        <Link to="/register">
          <FaPlus className="menu-icon" style={{ textAlign: "center" }} />
          Add
        </Link>
      </div>

      <div className="user-info">
        <button className="logout-btn" onClick={logoutUser}>
          <FaSignInAlt className="logout-icon" />
        </button>
      </div>
    </>
  );
};

export default SidebarLeft;
