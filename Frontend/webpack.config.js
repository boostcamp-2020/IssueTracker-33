const path = require('path');
const webpack = require('webpack');
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
  resolve: {
    fallback: { path: require.resolve('path-browserify') },
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
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'Views/index.html',
      inject: false,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
