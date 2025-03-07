import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Backdrop from "@mui/material/Backdrop";
import { addToCart } from "../features/cart/cartSlice";

import {
  setEditProduct,
  removeProduct,
} from "../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  productSubTotal,
  productTax,
  productTotalAmount,
} from "../features/cart/cartSlice";
import { Box, Fade, Modal, Typography } from "@mui/material";

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
const EditProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const addCart = (product) => {
    dispatch(addToCart(product));
  };

  const removeItem = (product) => {
    dispatch(removeProduct(product));
  };

  const editModal = () => {
    setEditModalOpen(true);
  };

  const removeModal = () => {
    setRemoveModalOpen(true);
  };

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(productSubTotal());
    dispatch(productTax());
    dispatch(productTotalAmount());
  }, [dispatch, cartItems]);

  const setEdit = (product) => {
    const { name, description, sku, price, stockLevel, qrCode } = product;

    dispatch(
      setEditProduct({
        name,
        description,
        sku,
        price,
        stockLevel,
        qrCode,
        editProductId: product.productId,
      })
    );

    navigate("/dashboard/form");
  };

  /* <div className="product-cart-detail">
        <h4>{product.name}</h4>
        <p className="product-price">$ {product.price}</p>
        <span className="stock-status">
          <span className="stock">{product.stock} stock</span>
          <span className="available">available</span>
        </span>
      </div>

      <div className="add-product-cart">
        <button
          className="add-cart"
          type="submit"
          onClick={() => {
            addCart(product);
          }}
        >
          Add Cart
        </button>
      </div> */

  /* {product.user.toString() === user._id && (
        <div>
          <button
            className="product-delete"
            type="button"
            onClick={() => {
              removeItem(product);
            }}
          >
            X
          </button>
          <button
            className="product-update"
            type="button"
            onClick={() => {
              setEdit(product);
            }}
          >
            <FaEdit />
          </button>
        </div>
      )} */
  // </div>
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img className="product-image" src={product.image} alt="..." />
        ) : (
          <img
            className="default-image"
            src={require("../images/product.png")}
            alt="..."
          />
        )}
      </div>
      <div className="product-content">
        <div className="product-name">{product.name}</div>
        <div className="product-price">${product.price}</div>
        <div className="product-description">{product.description}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        >
          <button
            className="order-button"
            onClick={() => {
              editModal(product);
            }}
            style={{ marginLeft: 0 }}
          >
            Edit
          </button>
          <button
            className="order-button"
            onClick={() => {
              removeModal(product);
            }}
          >
            Remove
          </button>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={editModalOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditProductItem;
