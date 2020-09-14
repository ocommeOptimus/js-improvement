const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    polyfill: "babel-polyfill",
    main: "./main.js",
    product: "./assets/js/product.js",
    cart: "./assets/js/cart.js",
    order: "./assets/js/order.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve('./assets', "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};