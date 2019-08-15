// 动态路由解析生成器
import Layout from '@/views/layout/Layout'
import { children } from '@/router/index'

function createFather (menuCode, name, icon) {
  if (menuCode === undefined || menuCode.toString().length === 0 || menuCode.toString().indexOf('#') >= 0) {
    menuCode = name
  }
  return {
    path: '/' + menuCode,
    component: Layout,
    name: name,
    meta: {title: name, icon: icon, noCache: true},
    children: []
  }
}

function fetchChild (menuCode) {
  const child = children[menuCode]
  if (child === undefined) return null
  return child
}

function isFather (item) {
  return (item.hasOwnProperty('children') && item.children !== null)
}

export function parseMenuList (menuList) {
  let fathers = []
  for (const menuItem of menuList) {
    // noinspection JSUnresolvedVariable
    const father = createFather(menuItem.menuCode, menuItem.menuName, menuItem.menuIco)
    fathers.push(father)
    if (isFather(menuItem)) {
      for (const menuChild of menuItem.children) {
        // noinspection JSUnresolvedVariable
        const child = fetchChild(menuChild.menuCode)
        if (child !== null) {
          father.children.push(child)
        }
      }
      if (father.children.length > 0) {
        father.redirect = father.path + '/' + father.children[0].path
      }
    }
  }
  fathers.push(fetchChild(0))
  return fathers
}
