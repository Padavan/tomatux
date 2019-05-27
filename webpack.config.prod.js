const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'app'),
  },
  output: {
    filename: '[name].js',
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
    minimizer: [new TerserPlugin()],
    // splitChunks: {
    //   chunks: 'async',
    //   maxAsyncRequests: 3,
    //   maxInitialRequests: 3,
    //   name: true,
    //   automaticNameDelimiter: '.',
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: 'initial',
    //       maxSize: 1000000,
    //       minSize: 300000,
    //       priority: 1
    //     }
    //   },
    // }
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
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
        { from: 'public' }
    ]),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },

    ]
  }
};
