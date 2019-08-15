import routermapping from '@/assets/constant/routermapping'

const baseCenter = {
  [routermapping['randomTool']] : {
    path: '/baseCenter/randomTool',
    name: 'randomTool',
    // hidden: false,
    meta: { title: '随机生成工具', icon: 'table', noCache: true },
    component: () => import('@/views/baseCenter/pages/randomTool'),
  },
  [routermapping['createCalendar']] : {
    path: '/baseCenter/createCalendar',
    name: 'createCalendar',
    // hidden: false,
    meta: { title: '生成日历', icon: 'table', noCache: true },
    component: () => import('@/views/baseCenter/pages/createCalendar'),
  }
}

export default baseCenter
