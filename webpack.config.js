const path = require("path");
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    filename: "./js/bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new BabiliPlugin()
  ],
  devtool: "source-map"
};