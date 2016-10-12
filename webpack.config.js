'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./libs/parts');
const path = require('path');
const pkg = require('./package.json');
const validate = require('webpack-validator');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  assets: path.join(__dirname, 'app', 'assets'),
  build: path.join(__dirname, 'build')
};

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: ['babel-polyfill', path.join(PATHS.app, 'components', 'App.jsx')]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      favicon: path.join(PATHS.app, 'assets', 'favicon.ico'),
      inject: false,
      links: ['https://fonts.googleapis.com/css?family=Open+Sans:300,400'],
      mobile: true,
      template: require('html-webpack-template'),
      title: 'Mubla'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // Mock node.js fs module. mime.js sub-dependency tries to require it.
  node: {
    fs: 'empty'
  }
};

let config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
  case 'stats':
    config = merge(
        common,
        {
          devtool: 'source-map',
          output: {
    	    path: PATHS.build,
            // Tweak this to match your GitHub project name for gh-pages deploy
            publicPath: '/dounan-mubla/',
            filename: '[name].[chunkhash].js',
            // This is used for require.ensure. The setup
            // will work without but this is useful to set.
            chunkFilename: '[chunkhash].js'
          }
        },
        parts.clean(PATHS.build),
        parts.setFreeVariable('process.env.NODE_ENV', 'production'),
        parts.extractBundle({
          name: 'vendor',
          entries: Object.keys(pkg.dependencies)
        }),
        parts.loadImages(PATHS.assets),
        parts.loadFonts(PATHS.assets),
        parts.extractCSS(PATHS.app),
        // purifyCSS must come after extractCSS
        // NOTE: commented out because it removes classes with css-loader local scope
        // parts.purifyCSS([PATHS.build]),
        parts.dedupe(),
        parts.minify()
    );
    break;
  default:
    config = merge(
        common,
        {
          devtool: 'eval-source-map',
          output: {
            path: PATHS.build,
            filename: '[name].js'
          }
        },
        parts.devServer({
          // Customize host/port here if needed
          host: process.env.HOST,
          port: process.env.PORT
        }),
        parts.setupCSS(PATHS.app),
        parts.loadImages(PATHS.assets),
        parts.loadFonts(PATHS.assets)
    );
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
  quiet: true
});

