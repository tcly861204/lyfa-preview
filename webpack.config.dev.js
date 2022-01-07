const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: "development",
  entry: './src/main.js',
  output: {
    publicPath: '/',
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: true,
      inject: 'body'
    })
  ]
}