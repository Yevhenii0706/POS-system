import httpRequest from "../../utils/request";
import {
  deleteLocalStorageCart,
  getLocalStorageToken,
} from "../../utils/localStorage";
import { clearCart } from "../cart/cartSlice";
// import axios from "axios";

const token = getLocalStorageToken();
httpRequest.defaults.headers.common["Authorization"] = token;

const companyCreate = async (company) => {
  // localhost:5000/api/product/add-product
  console.log({
    name: company.name,
    email: "contact123@techvisionsolutions.com",
    phone: company.phone,
    address: company.address,
    website: company.website,
    industry: "Software Development and AI Consulting",
    foundedYear: 2021,
  });
  const response = await httpRequest.post("/createCompany", company);
  return {
    responseState: response.responseCode,
    // data: productData.data.responseMessage.products,
  };
};

const companyService = {
  companyCreate,
};

export default companyService;
