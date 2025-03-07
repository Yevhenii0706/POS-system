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
  console.log(products);

  return (
    <div className="product-area">
      <div className="company-category">
        <ul className="treeview">
          <li>
            <input type="checkbox" id="node1" />
            <label for="node1">Parent 1</label>
          </li>

          <li>
            <input type="checkbox" id="node2" />
            <label for="node2">Parent 1</label>
          </li>

          <li>
            <input type="checkbox" id="node3" />
            <label for="node3">Parent 1</label>
          </li>

          <li>
            <input type="checkbox" id="node4" />
            <label for="node4">Parent 1</label>
          </li>

          <li>
            <input type="checkbox" id="node5" />
            <label for="node5">Parent 1</label>
          </li>

          <li>
            <input type="checkbox" id="node6" />
            <label for="node6">Parent 1</label>
          </li>

          <li>
            <input type="checkbox" id="node7" />
            <label for="node7">Parent 1</label>
          </li>
        </ul>
      </div>
      <div className="product-content">
        <div class="product-grid" id="product-grid">
          {products.map((product) => (
            <ProductItem key={product.productId} product={product} />
          ))}
        </div>

        
        
      </div>
    </div>
  );
};

export default Products;
