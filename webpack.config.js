/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.argv.includes('--prod')

const commonConfig = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    sdk: './src/index.ts',
  },
  devtool: isProduction ? false : 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].build.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProduction ? JSON.stringify('production') : JSON.stringify('stage'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
}

if (isProduction) {
  module.exports = {
    ...commonConfig,
    plugins: [...commonConfig.plugins, new CleanWebpackPlugin(['dist'])],
  }
} else {
  module.exports = {
    ...commonConfig,
    devServer: {
      host: 'cleverpay.local',
    },
    plugins: [
      ...commonConfig.plugins,
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  }
}
