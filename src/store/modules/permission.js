import { constantRouterMap } from '@/router'
import { parseMenuList } from '@/utils/walker'
import { getMenu } from '@/api/login'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        getMenu().then(response => {
          const accessedRouters = parseMenuList(response.data.roleMenuList)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      })
    }
  }
}

export default permission
