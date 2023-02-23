const path = require('path');
const ip = require('ip');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge, mergeWithRules } = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const baseWebpackConfig = require('./base.config')
const loaderUtil = require('./loader');
const config = require('../config');
const mergeConfig = require('../utils/merge')
const webpack = require('webpack')


let devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    hot: true
  },
  stats: 'minimal', // 只在发生错误或新的编译开始时输出
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': require('../config/dev.env')
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve('public/index.html'),
      filename: 'index.html',
      timestamp: new Date().getTime(),
      inject: 'body',
      css: [],
      js: []
    }),
    new FriendlyErrorsPlugin()
  ],
  module: {
    rules: loaderUtil.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },

})

if (!devWebpackConfig.plugins) {
  devWebpackConfig.plugins = []
}
if (process.env.mergeConfig) {
  const mergeOption = require(process.env.mergeConfig)
  devWebpackConfig = mergeConfig(devWebpackConfig, mergeOption)
}



module.exports = new Promise((resolve, reject) => {
  // 自动获取可用端口
  portfinder.basePort = devWebpackConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      const protocol = devWebpackConfig.devServer.https ? 'https' : 'http';
      devWebpackConfig.devServer.port = port;
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              'App runing at: ',
              `- Local: ${protocol}://localhost:${port}`,
              `- Network: ${protocol}://${ip.address()}:${port}`,
            ],
          },
          onErrors: loaderUtil.createNotifierCallback()
        })
      );
      resolve(devWebpackConfig);
    }
  });
});