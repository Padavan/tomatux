const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve(appDirectory, 'src'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(appDirectory, 'build'),
    // publicPath: '/'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
    modules: [
      path.join(appDirectory, 'src'),
      'node_modules'
    ]
  },
  optimization: {
    nodeEnv: 'development'
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    hotOnly: true,
    compress: true,
    https: false,
  },
  target: 'web',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   exclude: ['/node_modules/'],
      //   use: 'babel-loader',
      // },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        enforce: 'pre',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 0,
              localsConvention: "camelCase",
            }
          }
        ]
      }
    ]
  },
  plugins:
  [
    new HtmlWebpackPlugin({
      template: './src/index.html',
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
    new BundleAnalyzerPlugin({
      analyzerPort: '3001',
      openAnalyzer: false,
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
