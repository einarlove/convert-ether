import webpack from 'webpack'
import path from 'path'

const debug = process.env.NODE_ENV !== 'production'
const devtool = debug && 'eval'

const entries = {
  bundle: ['./src/index.js', './src/index.html'],
}

const output = {
  path: path.join(__dirname, '/build'),
  filename: '[name].js',
  publicPath: '/',
  pathinfo: debug,
}

const loaders = [
  {
    test: /\.jsx?$/,
    loader: debug ? 'react-hot!babel?stage=0&cacheDirectory' : 'babel?stage=0',
    exclude: /node_modules/,
  },
  {test: /\.json$/, loader: 'json', exclude: /node_modules/},
  {test: /\.css$/, loader: 'style!css!postcss', exclude: /node_modules/},
  {test: /\.svg$/, include: /assets/, loader: 'raw'}, // Embed SVG icons
  {
    test: /.(png|jpg|svg)$/,
    loader: 'url?limit=5000&name=images/[name].[ext]',
    exclude: [/node_modules/, /assets/],
  },
  {test: /\.(eot|ttf|woff2?)$/, loader: 'file?name=fonts/[name].[ext]'},
  {test: /\.html$/, loader: 'file?name=[name].[ext]'},
]

const plugins = [
  new webpack.PrefetchPlugin('react'),
]

const resolve = {
  extensions: ['', '.js', '.jsx', '.json', '.css', '.styl'],
  modulesDirectories: ['node_modules', './src'],
  alias: {},
}

const postcss = [
  require('postcss-nested'),
  require('postcss-calc'),
  require('postcss-color-function')(),
  require('postcss-easings'),
  require('postcss-focus'),
  require('autoprefixer-core')(),
]

// Minification
if (!debug) {
  plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        drop_console: true,
        screw_ie8: true,
        warnings: false,
      },
    })
  )
}

module.exports = {
  debug,
  devtool,
  entry: entries,
  output,
  module: {
    loaders,
  },
  postcss,
  plugins,
  resolve,
}
