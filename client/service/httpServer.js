import axios from 'axios'
import store from '@client/store/index'
import $config from '@/config/index'
import QS from 'qs'

// 生产环境配置axios.defaults.baseURL,开发环境使用proxy代理
if (process.env.VUE_APP_ENV_NAME !== 'development') {
  axios.defaults.baseURL = $config.baseURL
}

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.timeout = 30000  // 超时时间30秒

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = store.getters.authorization
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器及异常处理
axios.interceptors.response.use(response => {
  if (response.data.status) {
    return Promise.resolve(response.data)
  } else {
    store.dispatch('showMessage', {
      type: 'error',
      message: response.data.message || response.data.msg || response.data.errMsg
    })
    return Promise.reject(response)
  }
}, err => {
  if (err && err.response) {
    switch(err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '没有访问权限，拒绝访问'
        break
      case 404:
        err.message = '请求错误，未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = err.response.data.message
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      default:
        err.message = `连接错误${err.response.msg}`
    }
  } else {
    err.message = '连接到服务器失败'
  }
  store.dispatch('showMessage', {
    type: 'error',
    message: err.message || err.response.msg
  })
  return Promise.reject(err.response)
})

// 下载文件
let downloadFile = (url) => {
  window.open(url)
}

export default {
  // get请求
  get(url, param, responseType, header) {
    return axios({
      method: 'get',
      url,
      headers: {
        ...(header || {})
      },
      responseType: responseType,
      params: param || {}
    })
  },
  // post 请求
  post(url, param, header) {
    return axios({
      method: 'post',
      url,
      headers: {
        ...(header || {}),
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: param || {}
    })
  },
  // 发送表单文件
  // qs.stringify()将对象序列化成URL的形式，以&进行拼接
  // qs.parse()将URL解析成对象的形式
  postFormData(url, param, header) {
    return axios({
      method: 'post',
      url,
      headers: {
        ...(header || {}),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: QS.stringify(param || {})
    })
  },
  // put 请求
  put(url, param, header) {
    return axios({
      method: 'put',
      url,
      headers: {
        ...(header || {}),
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: param || {}
    })
  },
  // delete 请求
  delete(url, param, header) {
    return axios({
      method: 'delete',
      url,
      headers: {
        ...(header || {})
      },
      params: param || {}
    })
  },
  // 导出文件 非Promise方法
  getFile(url, params) {
    let tempParams = {
      ...(params || {})
    }
    // 拼接下载地址
    let list = []
    for (let key in tempParams) {
      list.push(key.toString() + '=' + tempParams[key])
    }
    url = $config.baseURL + url + '?' + list.join('&')
    url = encodeURI(url)
    downloadFile(url)
  }
}