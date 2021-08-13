const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    react: path.resolve("./node_modules/react"),
    "react-router": path.resolve("./node_modules/react-router"),
    "react-router-dom": path.resolve("./node_modules/react-router-dom"),
  })
);
