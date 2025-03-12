import axios from "axios";
import { getLocalStorageToken } from "./localStorage";

const token = getLocalStorageToken();

console.log("token", token);
const httpRequest = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  baseURL: "https://pos-03zq.onrender.com/api",
  credentials: "include",
});

export default httpRequest;
