module.exports = {
  dev: {
    devtool: 'cheap-module-source-map',
    publicPath: '/',
    staticPath: './static',
    assetsPath: 'assets',
    NODE_ENV: 'development'
  },
  build: {
    devtool: false,
    publicPath: '',
    staticPath: './static',
    assetsPath: './assets',
    NODE_ENV: 'production'
  },
  subsystem: { // 打包子系统相关配置
    devtool: false,
    publicPath: './',
    staticPath: './static',
    assetsPath: './assets',
    NODE_ENV: 'production'
    // NODE_ENV: 'development'
  }
}
