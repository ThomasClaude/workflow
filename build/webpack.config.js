const debug = process.env.NODE_ENV !== "production";
import webpack from 'webpack';

module.exports = {
  context: __dirname + '/../src',
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./assets/scripts/**/*.js",
  output: {
    path: __dirname + "/dist/assets/scripts/wep",
    filename: "main.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};