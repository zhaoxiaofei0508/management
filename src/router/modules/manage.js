import Layout from '@/views/layout/Layout'

const manageRouter = {
  path: '/plan/planSearch',
  component: Layout,
  redirect: '/plan/planSearch',
  name:'/plan/planSearch',
  meta:{
    title:'首页',
    icon:'documentation'
  },
  children: [
    {
      path: '/plan/planSearch',
      name:'/plan/planSearch',
      component: () => import('@/views/plan/planSearch'),
      meta: { title: '首页', noCache: true}
    }
  ]
}
export default manageRouter
