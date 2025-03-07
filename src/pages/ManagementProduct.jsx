import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, productCreate } from "../features/product/productSlice";
import ClipLoader from "react-spinners/ClipLoader";
import EditProductItem from "../components/EditProductItem";
import Backdrop from "@mui/material/Backdrop";
import { Box, Fade, Modal, Typography } from "@mui/material";

import { FaPray } from "react-icons/fa";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ManagementProduct = () => {
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    price: 0,
    sku: "",
    stockLevel: 0,
    companyId: "67b705e701a4e144f539ae10",
  });

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const override = {
    display: "block",
    margin: "0 auto",
  };

  if (loading) {
    return <ClipLoader size={60} color="#ecc20e" cssOverride={override} />;
  }

  if (products.length === 0) {
    return (
      <div className="info-details">
        <div className="info">No products found...</div>
      </div>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(productCreate(formValue));
    // dispatch(clearValues());
  };
  return (
    
    <div className="product-area">
      <div className="company-category">
        <ul className="treeview">
          <span
            style={{ fontSize: "30px", color: "#800063", ntWeight: "bold" }}
          >
            Company
          </span>
          <br />
          <br />
          <li>
            <input type="checkbox" id="node1" />
            <label for="node1">TechVision Solutions</label>
          </li>
        </ul>
      </div>
      <div className="product-content">
        <button
          className="order-button"
          onClick={() => {
            setAddModalOpen(true);
          }}
          style={{ marginLeft: 0, width: "150px" }}
        >
          Add Product
        </button>
        <div className="product-grid" id="product-grid">
          {products.map((product) => (
            <EditProductItem key={product.productId} product={product} />
          ))}
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={addModalOpen}
          onClose={() => {
            setAddModalOpen(false);
          }}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={addModalOpen}>
            <Box sx={style}>
              <form className="form" onSubmit={handleSubmit}>
                <button className="exit" onClick={() => setAddModalOpen(false)}>
                  X
                </button>
                <div className="add-form">
                  <h1 className="new-product">New Product</h1>
                </div>

                <div className="form-input">
                  <input
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    value={formValue.name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-input">
                  <input
                    type="text"
                    placeholder="Product Description"
                    name="description"
                    value={formValue.description}
                    onChange={onChange}
                  />
                </div>

                <div className="form-input">
                  <input
                    type="number"
                    placeholder="Product price"
                    name="price"
                    value={formValue.price}
                    onChange={onChange}
                  />
                </div>

                <div className="form-input">
                  <input
                    type="text"
                    placeholder="Product sku"
                    name="sku"
                    value={formValue.sku}
                    onChange={onChange}
                  />
                </div>

                <div className="form-input">
                  <input
                    type="number"
                    placeholder="Product stockLevel"
                    name="stockLevel"
                    value={formValue.stockLevel}
                    onChange={onChange}
                  />
                </div>

                <div className="form-input">
                  <input
                    type="text"
                    placeholder="company"
                    name="companyId"
                    disabled
                    value={formValue.companyId}
                    onChange={onChange}
                  />
                </div>
                <div className="form-input">
                  <button className="product-btn">Add Product</button>
                </div>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default ManagementProduct;
