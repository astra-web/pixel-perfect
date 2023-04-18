const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const buildProdFolder = path.resolve(__dirname, 'build-prod');
const buildDevFolder = path.resolve(__dirname, 'build-dev');
const conf = {
  mode: 'development',

  entry: {
    content: './src/dialog/insert.js',
    background: './src/background/index.js',
  },

  output: {
    filename: '[name].js',
    path: buildDevFolder,
  },

  devtool: 'cheap-module-source-map',
};

module.exports = (env) => {
  const copyWebpackPluginOptions = [
  ];
  if (env.production) {
    conf.mode = 'production';
    conf.devtool = 'source-map';
    conf.output.path = buildProdFolder;
    conf.plugins = [
      new CopyWebpackPlugin(copyWebpackPluginOptions),
      new webpack.DefinePlugin({
        E2E: 'false',
      }),
    ];
  } else if (env.development) {
    conf.plugins = [
      new CopyWebpackPlugin(copyWebpackPluginOptions),
      new webpack.DefinePlugin({
        E2E: 'false',
      }),
      env.watch ? new ChromeExtensionReloader({
        entries: {
            contentScript: 'content',
            background: 'background',
        },
      }) : () => {
      },
    ];
  }
  return conf;
};