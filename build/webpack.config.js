import path from 'path'
import webpack from 'webpack'
import process from 'process'

const isProduction = (process.env.NODE_ENV === 'production')

let config = {
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

  plugins: [
    isProduction ? [new webpack.optimize.UglifyJsPlugin()] : [],
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'views', 'index.pug')
    }),
  ]
}


function scripts() {

  return new Promise(resolve => webpack(config, (err, stats) => {

    if (err) console.log('Webpack', err)

    console.log(stats.toString({ /* stats options */ }))

    resolve()
  }))
}

module.exports = { config, scripts }
