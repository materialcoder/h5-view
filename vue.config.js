const path = require('path')

module.exports = {    
  pages: {        
    index: {            
      entry: "client/main.js"        
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
