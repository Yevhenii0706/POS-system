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
  var response = null;
  for (let i = 0; i < kinds.length; i++) {
    response = await httpRequest.post("/invoice/create", kinds[i]);
  }
  return response.data;
};

const getOrders = async () => {
  // localhost:5000/api/order/get-orders
  const response = await httpRequest.post("/invoices", {
    companyId: "67b705e701a4e144f539ae10",
    page: 1,
    startDate: "2024-01-01",
    endDate: "2026-02-15",
  });
  console.log(response);
  // const response = {
  //   responseCode: "200",
  //   responseMessage: "Invoices retrieved successfully",
  //   data: {
  //     totalInvoices: 13,
  //     totalPages: 2,
  //     currentPage: 1,
  //     invoices: [
  //       {
  //         _id: "67c9a9c8e934cdb9ab3ccea0",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-06T13:57:28.296Z",
  //         updatedAt: "2025-03-06T13:57:28.296Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67c9a9c8e934cdb9ab3ccea2",
  //             invoiceMasterId: "67c9a9c8e934cdb9ab3ccea0",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67c9a9c8e934cdb9ab3ccea3",
  //             invoiceMasterId: "67c9a9c8e934cdb9ab3ccea0",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca17288fb65d5f033fdda2",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-06T21:44:08.923Z",
  //         updatedAt: "2025-03-06T21:44:08.923Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca17298fb65d5f033fdda4",
  //             invoiceMasterId: "67ca17288fb65d5f033fdda2",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca17298fb65d5f033fdda5",
  //             invoiceMasterId: "67ca17288fb65d5f033fdda2",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca18fd8fb65d5f033fddaa",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-06T21:51:57.579Z",
  //         updatedAt: "2025-03-06T21:51:57.579Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca18fd8fb65d5f033fddac",
  //             invoiceMasterId: "67ca18fd8fb65d5f033fddaa",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca18fd8fb65d5f033fddad",
  //             invoiceMasterId: "67ca18fd8fb65d5f033fddaa",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca3d2c335611b485ef6721",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-07T00:26:20.921Z",
  //         updatedAt: "2025-03-07T00:26:20.921Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca3d2d335611b485ef6723",
  //             invoiceMasterId: "67ca3d2c335611b485ef6721",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca3d2d335611b485ef6724",
  //             invoiceMasterId: "67ca3d2c335611b485ef6721",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca3d36335611b485ef6729",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-07T00:26:30.653Z",
  //         updatedAt: "2025-03-07T00:26:30.653Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca3d36335611b485ef672b",
  //             invoiceMasterId: "67ca3d36335611b485ef6729",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca3d36335611b485ef672c",
  //             invoiceMasterId: "67ca3d36335611b485ef6729",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca439a335611b485ef6736",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-07T00:53:46.173Z",
  //         updatedAt: "2025-03-07T00:53:46.173Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca439a335611b485ef6738",
  //             invoiceMasterId: "67ca439a335611b485ef6736",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca439a335611b485ef6739",
  //             invoiceMasterId: "67ca439a335611b485ef6736",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca43bf335611b485ef673f",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-07T00:54:23.941Z",
  //         updatedAt: "2025-03-07T00:54:23.941Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca43c0335611b485ef6741",
  //             invoiceMasterId: "67ca43bf335611b485ef673f",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca43c0335611b485ef6742",
  //             invoiceMasterId: "67ca43bf335611b485ef673f",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca43c0335611b485ef6743",
  //             invoiceMasterId: "67ca43bf335611b485ef673f",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca43e4335611b485ef6748",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-07T00:55:00.660Z",
  //         updatedAt: "2025-03-07T00:55:00.660Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca43e4335611b485ef674a",
  //             invoiceMasterId: "67ca43e4335611b485ef6748",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca43e4335611b485ef674b",
  //             invoiceMasterId: "67ca43e4335611b485ef6748",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca493b335611b485ef6754",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-07T01:17:47.182Z",
  //         updatedAt: "2025-03-07T01:17:47.182Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca493b335611b485ef6756",
  //             invoiceMasterId: "67ca493b335611b485ef6754",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca493b335611b485ef6757",
  //             invoiceMasterId: "67ca493b335611b485ef6754",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //       {
  //         _id: "67ca4a4c335611b485ef675d",
  //         companyId: "67b705e701a4e144f539ae10",
  //         customerName: "John Doe",
  //         invoiceType: "sale",
  //         createdBy: "67b8797fa0af6741274ab194",
  //         invoiceDate: "2025-02-19T00:00:00.000Z",
  //         totalAmount: 4000,
  //         createdAt: "2025-03-07T01:22:20.623Z",
  //         updatedAt: "2025-03-07T01:22:20.623Z",
  //         __v: 0,
  //         products: [
  //           {
  //             _id: "67ca4a4c335611b485ef675f",
  //             invoiceMasterId: "67ca4a4c335611b485ef675d",
  //             serialNumber: 1,
  //             productId: "67b72d02edd0b320999a8f19",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //           {
  //             _id: "67ca4a4c335611b485ef6760",
  //             invoiceMasterId: "67ca4a4c335611b485ef675d",
  //             serialNumber: 2,
  //             productId: "67b72d18edd0b320999a8f1c",
  //             quantity: 1,
  //             amount: 2000,
  //             __v: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // };
  return response.data.data;
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
