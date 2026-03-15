const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: false, // ← ADD
            babelrc: false, // ← ADD
            presets: [
              ["@babel/preset-env", { modules: false }], // ← modules: false
              ["@babel/preset-react", { runtime: "automatic" }], // ← runtime: automatic
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "hostApp",
      filename: "remoteEntry.js",
      remotes: {
        productApp: "productApp@http://mfe.local/product/remoteEntry.js",
        cartApp: "cartApp@http://mfe.local/cart/remoteEntry.js",
        hostApp: "hostApp@http://mfe.local/remoteEntry.js",
      },
      exposes: {
        "./useCounter": "./src/store/useCounter",
        "./eventBus": "./src/store/event",
        "./productCountRxjs": "./src/store/rsjx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
