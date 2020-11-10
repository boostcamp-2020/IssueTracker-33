const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  const envList = dotenv.config({ path: `./${options.mode || 'development'}.env` }).parsed;

  return {
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
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env.API_VERSION': JSON.stringify(process.env.API_VERSION),
        'process.env.WEB_URL': JSON.stringify(process.env.WEB_URL),
      }),
    ],
  };
};
