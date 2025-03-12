import httpRequest from "../../utils/request";
import {
  deleteLocalStorageCart,
  getLocalStorageToken,
} from "../../utils/localStorage";
import { clearCart } from "../cart/cartSlice";

const token = getLocalStorageToken();
httpRequest.defaults.headers.common["Authorization"] = token;

const productCreate = async (product) => {
  console.log(product);
  const response = await httpRequest.post("/createProduct", {
    name: product.name,
    description: product.description,
    price: Number(product.price),
    sku: product.sku,
    stockLevel: Number(product.stockLevel),
    companyId: product.companyId,
  });
  var productData = await httpRequest.post("/inventory/getProductCatalog", {
    companyId: "67b705e701a4e144f539ae10",
    threshold: "7",
  });
  return {
    responseState: response.responseCode,
    data: productData.data.responseMessage.products,
  };
};

const getProducts = async () => {
  var response = await httpRequest.post("/inventory/getProductCatalog", {
    companyId: "67b705e701a4e144f539ae10",
    threshold: "7",
  });
  return response.data?.responseMessage.products;
};

const editProduct = async (product) => {
  var productData = await httpRequest.post("/inventory/getProductCatalog", {
    companyId: "67b705e701a4e144f539ae10",
    threshold: "7",
  });
  console.log(productData.data.responseMessage.products);

  return {
    data: productData.data.responseMessage.products,
  };
};

const categoryProductFilter = async (product) => {
  const { category } = product;
  const response = await httpRequest.get("/product/product-filter/" + category);
  return response.data;
};

const removeProduct = async (product, thunkAPI) => {
  const response = await httpRequest.post("/product/delete", {
    companyId: product.companyId,
    productId: product.productId,
  });
  deleteLocalStorageCart();
  thunkAPI.dispatch(clearCart());
  console.log(response.data);
  if (response.data) return product.productId;
  return false;
};

const productService = {
  productCreate,
  getProducts,
  editProduct,
  categoryProductFilter,
  removeProduct,
};

export default productService;
