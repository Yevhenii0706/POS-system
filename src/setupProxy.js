const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // This means only requests starting with "/api" will be proxied
    createProxyMiddleware({
      target: "https://inventory-r06h.onrender.com", // Backend API URL
      changeOrigin: true, // Changes the origin of the request to match the backend
    })
  );
};
