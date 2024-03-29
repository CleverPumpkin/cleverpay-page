const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const argv = require("minimist")(process.argv.slice(2));
const isProduction = !!argv.prod;

const commonConfig = {
  mode: isProduction ? "production" : "development",
  entry: { app: "./src/index.js" },
  devtool: isProduction ? false : "inline-source-map",
  output: {
    filename: "[name].build.js",
    path: path.join(process.cwd(), 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isProduction
          ? JSON.stringify("production")
          : JSON.stringify("development")
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inlineSource: ".js$"
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src']
          }
        }
      },      
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|ttf|woff2)$/i,
        use: 'url-loader',
      },
    ]
  }
};

if (isProduction) {
  module.exports = {
    ...commonConfig,
    plugins: [...commonConfig.plugins, new CleanWebpackPlugin()]
  };
} else {
  module.exports = {
    ...commonConfig,
    devServer: {
      host: "0.0.0.0"
    },
    plugins: [...commonConfig.plugins, new webpack.HotModuleReplacementPlugin()]
  };
}
