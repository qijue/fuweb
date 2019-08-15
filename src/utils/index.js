/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function formatString(value) {
  if (value == null || value == "" || value == undefined) {
    return "";
  } else {
    var str = value.replace(/\ +/g, "");
    str = str.replace(/[\r\n]/g, "");
    return str;
  }

}
export function isBase64Encode(str) {
  str = formatString(str)
  var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
  if (base64regex.test(str)) {
    return true
  } else {
    return false
  }
}

export function guid(split = '') {
  let guid = ''
  for (let i = 1; i <= 32; i++) {
      const n = Math.floor(Math.random() * 16.0).toString(16)
      guid += n
      if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
        guid += split
      }
  }
  return guid
}

import calendar from './lib/calendar'

import {
  setStorage, setStorageJSON, getStorage, getStorageJSON, setStorageExpires, getStorageExpires
} from './storage'

import {
  getRandName,
  getRandBankCard,
  getRandMobile
} from './string'

import {
  getAddress,
  getAreaInfo,
  getCardIdInfo,
  getRandCardId
} from './cardId'

export {
  calendar,
  setStorage,
  setStorageJSON,
  getStorage,
  getStorageJSON,
  setStorageExpires,
  getStorageExpires,
  getRandName,
  getRandBankCard,
  getRandMobile,
  getAddress,
  getAreaInfo,
  getCardIdInfo,
  getRandCardId
}
