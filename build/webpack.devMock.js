const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const port = require('../package.json').config.port;
const detect = require('detect-port-alt')

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'cheap-source-map',
};

const webpackConfig = merge(baseConfig, devConfig);

console.log(webpackConfig.output)

detect(port)
  .then(_port => {
    if (port == _port) {
      console.log(`port: ${port} was not occupied`);
    } else {
      console.log(`port: ${port} was occupied, try port: ${_port}`);
    }
    detect(_port+1).then(mockServerPort=>{
      const complier = webpack(webpackConfig)
      const server = new WebpackDevServer(complier, {
        hot: true,
        open: true,
        stats: 'errors-only',
        useLocalIp: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        proxy: {
          '/api': {
              target: `http://localhost:${mockServerPort}`,
              pathRewrite: {'/api': ''}
          }
        }
      })
      server.listen(_port)
      //startMockServer(mockServerPort)
    })
  })
  .catch(err => {
    console.log(err);
  });