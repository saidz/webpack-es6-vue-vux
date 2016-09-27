// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {
      '/api': {
        path: '/api',
        target:'https://testzswx.cheanjia.com/',
        changeOrigin: true,
        ssl: false,
        headers:{
          cookie:'csrf-token=1474862642##9c58b768169f9b17df4ca721e9786387f1929fe5;session=e5488bb6-aa99-45d5-9193-2f0e48f7aaef',
          host: 'testzswx.cheanjia.com'
        }
      },
      '/auth': {
        path: '/auth',
        target: 'https://testzswx.cheanjia.com/',
        changeOrigin: true,
        ssl: false,
        headers:{
          cookie:'csrf-token=1474862642##9c58b768169f9b17df4ca721e9786387f1929fe5;session=e5488bb6-aa99-45d5-9193-2f0e48f7aaef',
          host: 'testzswx.cheanjia.com'
        }
      }
    }
  }
}
