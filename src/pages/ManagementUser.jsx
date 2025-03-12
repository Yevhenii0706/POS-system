import React from "react";
import { Link } from "react-router-dom";
const ManagementUser = () => {
  return (
    <div className="">
      <button
        className="order-button"
        style={{ marginLeft: 0, width: "150px" }}
      >
        <Link to="/register">Add User</Link>
      </button>
    </div>
  );
};

export default ManagementUser;
