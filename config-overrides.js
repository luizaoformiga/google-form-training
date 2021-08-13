const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

const rootImport = {
  // eslint-disable-next-line no-useless-computed-key
  ["@"]: path.resolve(__dirname, "src"),
};

module.exports = override(addWebpackAlias(rootImport));
