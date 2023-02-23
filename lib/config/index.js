/*eslint-disable no-undef*/
'use strict';
const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/cloudtest': {
        target: `http://10.5.23.202:8038`,
        changeOrigin: true,
        secure: false
      },
    },
    host: '0.0.0.0',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    cacheBusting: true,
    cssSourceMap: false,
    devtool: 'cheap-module-source-map',
  },

  build: {
    // Paths
    assetsRoot: path.resolve('./dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */
    productionSourceMap:false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  }
};
