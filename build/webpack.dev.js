
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    stats: 'errors-only',
    useLocalIp: true,
    disableHostCheck: false,
    host: '0.0.0.0',
    proxy: {
      '/oauth/token': {
				target: 'http://192.168.140.200:45001',
			},
			'/api': {
				target: 'http://192.168.140.200:45001',
			},
    }
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
