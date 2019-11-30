/**
 * 公共配置文件
 */
import $config from '../../config'

const confgiDict = {
  // 开发环境
  development: {
    baseURL: 'http://localhost:4000'
  },
  // 生产环境
  production: {
    baseURL: $config.baseURL
  }
}

const currentConfigKey = process.env.NODE_ENV
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'development'

const configObj = {
  ...confgiDict[currentConfigKey],
  isDevlop: (isDev || isTest),
  // h5模式宽高
  canvasH5Width: 400,
  canvasH5Height: 650
}

export default configObj