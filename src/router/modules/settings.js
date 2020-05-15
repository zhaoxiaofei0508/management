import Layout from '@/views/layout/Layout'

const manageRouter = {
  path: '/plan/planSearch',
  component: Layout,
  redirect: '/plan/planSearch',
  name:'/plan/planSearch',
  meta:{
    title:'设置',
    icon:'documentation'
  },
  children: [
    {
      path: '/plan/planSend',
      name:'planSend',
      component: () => import('@/views/plan/planSend'),
      meta: { title: '计划下发', noCache: true}
		}
  ]
}
export default manageRouter