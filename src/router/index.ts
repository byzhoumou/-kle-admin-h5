// 这里导入这两个路由函数 下面调用设置路由模式
//        history模式         哈希模式
import { useUserStore } from '@/stores'
// 如何得到路由实例 createRouter()
// 如何设置路由模式 history
// history 模式 createWebHistory()// hash 模式 createwebHashHistory()
import { createRouter, createWebHistory } from 'vue-router'
// 进度条组件
import NProgress from 'nprogress'
// 进度条组件样式
import 'nprogress/nprogress.css'
// 关闭上面进度条组件的转圈圈样式
NProgress.configure({
  showSpinner: false
})

const router = createRouter({
  // createWebHistory这个函数有个默认参数是'/' 路由的基础路由
  // (import.meta.env.BASE_URL) 在vite.config.ts文件中控制
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由给规则配置
  routes: [
    {
      // 一级路由
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      // 设置路由标题
      meta: { title: '登录' }
    },
    {
      // 一级路由
      // 家庭档案
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      // 设置路由标题
      meta: { title: '家庭档案' }
    },
    {
      // 一级路由
      path: '/consult/fast',
      component: () => import('@/views/consult/ConsultFast.vue'),
      // 设置路由标题
      meta: { title: '极速问诊' }
    },
    {
      // 一级路由
      path: '/consult/dep',
      component: () => import('@/views/consult/ConsultDep.vue'),
      // 设置路由标题
      meta: { title: '选择科室' }
    },
    {
      // 一级路由
      path: '/consult/illness',
      component: () => import('@/views/consult/ConsultIllness.vue'),
      // 设置路由标题
      meta: { title: '病情描述' }
    },
    {
      // 一级路由
      path: '/consult/pay',
      component: () => import('@/views/consult/ConsultPay.vue'),
      // 设置路由标题
      meta: { title: '问诊支付' }
    },
    {
      // 一级路由
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      // 2级路由
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    }
  ]
})

// 全局前置导航守卫
router.beforeEach((to) => {
  // 开启进度条
  NProgress.start()
  // 获取用户仓库的token
  const store = useUserStore()
  // 白名单 不需要登录的页面
  const whiteList = ['/login']
  // 如果没有token并且不在白名单，重定向到登录
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})

// 全局后置导航守卫
router.afterEach((to) => {
  //                                 默认字符窜拼接 防止没有title他就undefined
  document.title = `${to.meta.title || ''}-优医问诊`
  // 关闭进度条
  NProgress.done()
})
export default router
