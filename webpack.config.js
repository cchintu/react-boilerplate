const HtmlWebPackPlugin = require("html-webpack-plugin");
let path = require("path");
let nodeExternals = require("webpack-node-externals");
const moduleObj = {
  rules: [
    { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
  ],
};

const client = {
  entry: { client: "./src/client/index.js" },
  target: "web",
  mode: "development",
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/public"),
  },
  module: moduleObj,
  plugins: [new HtmlWebPackPlugin({ template: "src/client/index.html" })],
};
const server = {
  entry: { server: "./src/server/index.js" },
  target: "node",
  mode: "development",
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
  module: moduleObj,
  externals: [nodeExternals()],
};
module.exports = [client, server];
