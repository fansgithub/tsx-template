

const merge = require('webpack-merge');
const prodConfig = require('./webpack.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const bundleAnalyzerConfig = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};

module.exports = merge(prodConfig, bundleAnalyzerConfig);
