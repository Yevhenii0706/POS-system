import httpRequest from "../../utils/request";
//const API_URL = '/api/auth/register'

const register = async (user) => {
  const response = await httpRequest.post("/users/register", user);
  return response.data;
};

const login = async (user) => {
  const response = await httpRequest.post("/login", user);
  console.log("loginErr ====> ", response);
  return response.data;
};

const logout = async () => {
  return "logout";
};

const allUsers = async () => {
  const response = await httpRequest.get("/auth/users");
  return response.data;
};

const resetPass = async (prop) => {
  const response = httpRequest.post(
    "/auth/reset-password/confirm",
    JSON.stringify(prop)
  );
  console.log("err------->", response);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  allUsers,
  resetPass,
};

export default authService;
