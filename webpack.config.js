const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const buildProdFolder = path.resolve(__dirname, 'build-prod');
const buildDevFolder = path.resolve(__dirname, 'build-dev');
const buildE2eFolder = path.resolve(__dirname, 'build-e2e');
const conf = {
  mode: 'development',

  entry: {
    background: './src/background.js',
    content: './src/content.js',
    e2eTestCommandsBridge: './src/e2eTestCommandsBridge.js',
  },

  output: {
    filename: '[name].js',
    path: buildDevFolder,
  },

  devtool: 'eval-source-map',
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
  } else if (env.e2e) {
    conf.mode = 'production';
    conf.devtool = 'source-map';
    conf.output.path = buildE2eFolder;
    conf.plugins = [
      new CopyWebpackPlugin(copyWebpackPluginOptions),
      new webpack.DefinePlugin({
        E2E: 'true',
      }),
    ];
  }
  return conf;
};