import { getLocalStorageToken } from "../../utils/localStorage";
import httpRequest from "../../utils/request";

const token = getLocalStorageToken();
httpRequest.defaults.headers.common["Authorization"] = token;

const orderCreate = async (cartItems) => {
  var kinds = [];
  for (var j = 0; j < cartItems.length; j++) {
    var index = -1;
    for (let i = 0; i < kinds.length; i++) {
      if (cartItems[j].companyId === kinds[i].companyId) {
        index = i;
        break;
      } 
    }
    if (index === -1) {
      const now = new Date();
      var tmp = {
        companyId: cartItems[j].companyId,
        customerName: "John Doe",
        invoiceType: "sale",
        invoiceDate: now.toLocaleDateString(),
        totalAmount: cartItems[j].quantity * cartItems[j].price,
        products: [],
      };
      tmp.products.push({
        serialNumber: tmp.products.length + 1,
        productId: cartItems[j].productId,
        quantity: cartItems[j].quantity,
        amount: cartItems[j].quantity * cartItems[j].price,
      });
      kinds.push(tmp);
    } else {
      kinds[index].totalAmount += cartItems[j].quantity * cartItems[j].price;
      kinds[index].products.push({
        serialNumber: kinds[index].products.length + 1,
        productId: cartItems[j].productId,
        quantity: cartItems[j].quantity,
        amount: cartItems[j].quantity * cartItems[j].price,
      });
    }
  }
  // localhost:5000/api/order/add-order
  //   for (let i = 0; i < kinds.length; i++) {
  const response = await httpRequest.post("/api/invoice/create", {
    companyId: "67b705e701a4e144f539ae10",
    customerName: "John Doe",
    invoiceType: "sale",
    invoiceDate: "2025-02-19T00:00:00Z",
    totalAmount: 4000.0,
    products: [
      {
        serialNumber: 1,
        productId: "67b72d02edd0b320999a8f19",
        quantity: 1,
        amount: 2000.0,
      },
      {
        serialNumber: 2,
        productId: "67b72d18edd0b320999a8f1c",
        quantity: 1,
        amount: 2000.0,
      },
    ],
  } );
  console.log(response.data);
  return response.data;
};

const getOrders = async () => {
  // localhost:5000/api/order/get-orders
  const response = await httpRequest.get("/order/get-orders");
  return response.data;
};

const removeOrder = async (order, thunkAPI) => {
  // localhost:5000/api/order/delete
  const response = await httpRequest.delete("/order/delete/" + order._id);
  return response.data;
};

const orderService = {
  orderCreate,
  getOrders,
  removeOrder,
};

export default orderService;
