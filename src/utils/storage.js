

// 设置缓存
function setStorage(key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(key, value)
  }
}
function setStorageJSON(key, value) {
  if (window.localStorage) {
    if (Object.prototype.toString.call(value) == '[object Object]')
      window.localStorage.setItem(key, JSON.stringify(value))
  }
}

// 读取缓存
function getStorage(key) {
  if (window.localStorage) {
    return window.localStorage.getItem(key) || null
  }
  return null
}
function getStorageJSON(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (e) {
    return null
  }
}

// 设置有效期缓存  类cookie
function setStorageExpires(key, value, expire) {
  let exp = new Date()
  exp.setTime(exp.getTime() * 24 * 60 * 60 * 1000 * 1000) // 1000d
  let data = {
    data: value,
    expires: expires ||  exp.toGMTString()
  }
  if (window.localStorage) {
    setStorage(key, JSON.stringify(data))
  }
}

// 读取有效期缓存  类cookie
function getStorageExpires(key) {
  let value = getStorage(key)
  try {
    let result = JSON.parse(value)
    if (Object.prototype.toString.call(result) == '[object Object]') {
      let expires = result.expires
      if (!expires) {
        return result
      } else if (expires - new Date() > 0) {
        return result.data
      } else {
        window.localStorage.setItem(key, '')
      }
    } else {
      return result
    }
  } catch (e) {
    return vaue
  }
}


export {
  setStorage,
  setStorageJSON,
  getStorage,
  getStorageJSON,
  setStorageExpires,
  getStorageExpires
}
