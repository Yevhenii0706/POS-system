import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import ProductItem from "../components/ProductItem";
import ClipLoader from "react-spinners/ClipLoader";

const Products = () => {
  // const { loading, products } = useSelector((state) => state.product);
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

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
  return (
    <div className="product-area">
      <div className="company-category">
        <ul className="treeview">
          <span style={{ fontSize: "30px", color: "#800063", ntWeight: "bold" }}>Company</span>
          <br />
          <br />
          <li>
            <input type="checkbox" id="node1" />
            <label for="node1">TechVision Solutions</label>
          </li>
        </ul>
      </div>
      <div className="product-content">
        <div className="product-grid" id="product-grid">
          {products.map((product) => (
            <ProductItem key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
