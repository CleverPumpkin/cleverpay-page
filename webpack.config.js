/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const argv = require('minimist')(process.argv.slice(2))

const isProduction = !!argv.prod

const rootPath = process.cwd()
const entry = argv.entryPath || path.join(rootPath, 'index.js')
const template = argv.templatePath || path.join(rootPath, 'index.html')
const output = argv.outputPath || path.join(rootPath, 'dist')

// Defining configuration JSON. It is required for everything to work
const cpPath = argv.cpPath || path.join(rootPath, 'cleverpay')
const cleverPayConfig = fs.readFileSync(path.join(cpPath, 'config.json'), {
  encoding: 'utf-8',
})

// Defining example JSON. It is optional, but has a priority over automatically generated examples.
let cleverPayExampleData
const examplePath = path.join(cpPath, 'example.json')
if (fs.existsSync(examplePath)) {
  cleverPayExampleData = fs.readFileSync(examplePath, { encoding: 'utf-8' })
} else {
  cleverPayExampleData = undefined
}

// Defining timer for automatically regenerating example data, to make payment page resistable to
// different combinations of incoming data
const regenerateTimer = 0

const commonConfig = {
  mode: isProduction ? 'production' : 'development',
  entry: { app: entry },
  devtool: isProduction ? false : 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].build.js',
    path: output,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProduction ? JSON.stringify('production') : JSON.stringify('development'),
        CPConfig: cleverPayConfig,
        CPExampleData: cleverPayExampleData,
        CPTimerRegenerateConfig: regenerateTimer,
      },
    }),
    new HtmlWebpackPlugin({ template }),
    new HtmlWebpackInlineSourcePlugin(),
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
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
}

if (isProduction) {
  module.exports = {
    ...commonConfig,
    plugins: [...commonConfig.plugins, new CleanWebpackPlugin()],
  }
} else {
  module.exports = {
    ...commonConfig,
    devServer: {
      host: '0.0.0.0',
    },
    plugins: [...commonConfig.plugins, new webpack.HotModuleReplacementPlugin()],
  }
}
