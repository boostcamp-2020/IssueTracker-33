const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './Views/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_module/,
        use: 'babel-loader',
      },
    ],
  },

  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
  },
  devServer: {
    port: 8000,
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'Views/index.html',
      inject: false,
    }),
  ],
};
