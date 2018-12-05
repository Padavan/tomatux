const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'app'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.join(__dirname, 'app'),
      'node_modules'
    ]
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
  },
  optimization: {
    noEmitOnErrors: true,
    nodeEnv: 'production',
  },
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: false,
    hash: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: 'body',
      filename: 'client.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: ['/node_modules/'],
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },

    ]
  }
};
