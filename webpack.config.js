const webpack = require('webpack'),
      path = require('path'),
      copyWebpackPlugin = require('copy-webpack-plugin'),
      htmlWebpackPlugin = require('html-webpack-plugin'),
      extractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new extractTextPlugin('library.[hash].css'),
      extractSCSS = new extractTextPlugin('app.[hash].css')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    bundle: path.resolve(__dirname, 'src/init.jsx')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'app')
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader?cacheDirectory', exclude: [/node_modules/]},
      {test: /\.pug$/, use: ['pug-loader']}
    ]
  },
  plugins: [
    new htmlWebpackPlugin({template: path.resolve(__dirname, 'src/index.pug')}),
    new copyWebpackPlugin([{from: path.resolve(__dirname, 'src/img'), to: 'img'}]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'manifest'})
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

if(isProduction){
  config.devtool = "source-map"
  config.module.rules.push({test: /\.css$/, use: extractCSS.extract(['css-loader'])})
  config.module.rules.push({test: /\.scss$/, use: extractSCSS.extract(['css-loader', 'sass-loader'])})
  config.plugins.push(extractCSS)
  config.plugins.push(extractSCSS)
}
else{
  config.devtool = "cheap-module-eval-source-map"
  config.module.rules.push({test: /\.scss$/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]})
  config.module.rules.push({test: /\.css$/, use: ['style-loader', 'css-loader']})
  config.devServer = {
    contentBase: path.resolve(__dirname, 'app'),
    port: 3000,
    historyApiFallback: true,
    proxy: {},
    stats: {colors: true}
  }
}

module.exports = config