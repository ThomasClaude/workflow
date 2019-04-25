const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'views', 'index.pug')
    }),
  ],
  // Adding loader
  module: {
    rules: [
      {
        // Babel loader
        test: /\.js$/i,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        }],
      },
      // Pug Loader
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      // Sass Loader
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  // Getting the entry files
  context: path.resolve(__dirname, 'src', 'assets', 'scripts'),
  // Compiling entry files
  entry: {
    // Setting all in one files
    main: [
      './main.js',
      './vendor.js',
    ],
  },
  output: {
    // Setting output directory
    path: path.resolve(__dirname, 'dist'),
    // Compiling all in the main.js
    filename: './assets/scripts/[name].js',
  },
  devServer: {
    // Setting devServer
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3333,
  },
};