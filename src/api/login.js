// import request from '@/utils/request'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    let mockData = {
      'data': {'result': true, 'user_id': 3, 'token': 'sit_5e8a63a4-09fa-4979-948c-60c789e31ac2'},
      'success': true
    }
    resolve(mockData)
  })
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    let rdName = ['呼延翔', '欧阳若萌', '长孙国栋', '司马子辰', '达奚佳昊', '拓跋晨涵', '端木佳玉', '尉迟慧嘉', '诸葛东东']
    let mockData = { "data": { "role": 2, "name": `${rdName[Math.floor(Math.random() * ((rdName.length - 1) - 0 + 1) + 0)]}` }, "success": true }
    resolve(mockData)
  })
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  return new Promise((resolve, reject) => {
    let mockData = {'data': {}, 'success': true}
    resolve(mockData)
  })
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
}

export function getMenu(role) {
  return new Promise((resolve, reject) => {
    class MenuItem {
      constructor() {
        this.icon = ''
        this.menuCode = ''
        this.menuId = 31
        this.menuLevel = 2
        this.menuName = ''
        this.sortOrder = 0
        this.url = ''
      }

      setCodeAndName(code, name) {
        this.menuCode = code
        this.menuName = name
        return this
      }

      setChildren(arr = []) {
        this.children = arr
        return this
      }
    }

    let bt_child_2 = new MenuItem().setCodeAndName('randomTool', '随机(idCard,bankCard...)')
    let bt_child_3 = new MenuItem().setCodeAndName('createCalendar', '生成日历')
    let baseTool = new MenuItem().setCodeAndName('', '基础工具').setChildren([bt_child_2, bt_child_3])


    let mockData = {
      data: {
        roleMenuList: [baseTool]
      },
      success: true
    }
    resolve(mockData)
  })
}
