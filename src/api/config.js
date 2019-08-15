/**
 * 配置不同环境接口前缀
 * 如果未配置dev为默认配置
 * @param {*} base
 * @example
 * {
 *   dev: 'dev环境配置信息',
 *   sit: 'sit环境配置信息',
 *   prod: '线上环境配置信息'
 * }
 */
function conf(base = {}) {
  if (process.env.NODE_ENV === 'production') { // 生产环境下
    var env = process.env.VUE_APP_SERVER_ENV || 'dev'
    return base[env] || base['dev']
  }
  // 开发环境
  return base['dev']
}

export const BASE_API = conf({
  dev: 'http://localhost:3000',
  sit: 'http://192.168.200.141:3001',
  prod: 'http://192.168.200.141:3002'
})
