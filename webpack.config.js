var webpack            = require('webpack');
var { resolve, join }  = require('path');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
// var CleanWebpackPlugin = require('clean-webpack-plugin');
var WorkboxPlugin      = require('workbox-webpack-plugin');

var OUTPUT_PATH     = resolve('dist');
var webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

var polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor', 'bundles'),
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }
];

var workboxCli = {
  clientsClaim: true,
  skipWaiting: true
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: OUTPUT_PATH,                                                                                                    
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              babelrc: false,
              presets: [
                ['@babel/env', {
                  targets: {
                    browsers: [
                      'last 2 versions',
                      'not IE <= 10',
                    ],
                  },
                }]
              ],
              plugins: [
                ['@babel/transform-modules-commonjs', {}],
              ]
            }
          }
        ]
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(polyfills),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    }),
    new WorkboxPlugin.GenerateSW(workboxCli)
  ]
}
