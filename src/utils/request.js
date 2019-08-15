import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { isBase64Encode, formatString } from './index'
import {
  Base64
} from 'js-base64'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000, // 请求超时时间,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // config.headers['Content-Type'] = ''
  if (config.method === 'post') {
    config.data = {
      ...config.data
      // userId: store.state.user.workNum,
      // userName: store.state.user.name,
    }
  } else {
    config.params = {
      ...config.params
      // userId: store.state.user.workNum,
      // userName: store.state.user.name,
    }
  }
  // 自定义参数 判断请求参数是否需要base64传递
  let p = config.data || config.params || {}
  console.log(JSON.stringify(p, null, 4))
  const isBase64 = p._base64
  if (isBase64) {
    delete p._base64
    p = Base64.encode(JSON.stringify(p))
    if (config.hasOwnProperty('data')) {
      config.data = p
    } else {
      config.url += '?' + p
      delete config.params
      // config.params = p
    }
  }
  const isJSON = p._json
  if (isJSON) {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    delete p._json
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    let res = response.data
    if (typeof res === 'string' && isBase64Encode(res)) {
      res = eval('(' + Base64.decode(formatString(res)) + ')')
    }
    if (res.success) {
      console.group(response.config.url)
      console.log(JSON.parse(JSON.stringify(res)))  // 这样取消vue的setter 和 getter 使打印更干净
      console.groupEnd()
      return res.data
    } else {
      console.warn(res)
      return Promise.reject(res)
    }
    // if (!res.success) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject('error')
    // } else {
    //   return res
    // }
  },
  error => {
    console.error(error)
    // console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
