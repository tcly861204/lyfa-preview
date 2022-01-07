const path = require('path')
module.exports = {
  mode: "production",
  entry: {
    preview: './src/main.js'
  },
  output: {
    filename: '[name].min.js',
    library: 'Preview',
    libraryExport: "default",
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'url-loader'
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
  }
}

