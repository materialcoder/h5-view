const path = require('path')

const devServer = {
  // port: 8088,
  disableHostCheck: true,
  proxy: {
    '/': {
      target: 'http://localhost:4000',
      ws: false,
      changeOrigin: true,
      pathRewrite: {}
    }
  }
}

module.exports = {
  devServer: devServer,
  // 输出文件目录
  assetsDir: 'static',
  pages: {        
    index: {            
      entry: "client/main.js",

    }    
  },
  // 扩展 webpack 配置
  chainWebpack: config => {
    config.resolve.alias
			.set('@', path.resolve('client'))
			.set('@client', path.resolve('client'))
			.set('@plugins', path.resolve('plugins'))
			.set('@server', path.resolve('server'))
    config.module
      .rule('js')
      .include.add(/engine-templates/).end()
      .include.add(/client/).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }
}
