import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  //映射关系：path =》 component
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/message',
      component: () => import('@/views/message/message.vue'),
      children: [
        {
          path: '/message/car-message',
          component: () => import('../views/message/car-message.vue')
        }
      ]
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue'),
      children: [
        {
          path: '/main/analysis/overview',
          component: () => import('../views/main/analysis/overview/overview.vue')
        },
        {
          path: '/main/analysis/dashboard',
          component: () => import('../views/main/analysis/dashboard/dashboard.vue')
        },
        {
          path: '/main/system/user',
          component: () => import('../views/main/system/user/user.vue')
        },
        {
          path: '/main/system/role',
          component: () => import('../views/main/system/role/role.vue')
        },
        {
          path: '/main/system/add-car',
          component: () => import('../views/main/system/add-car/add-car.vue')
        },
        {
          path: '/main/system/add-user',
          component: () => import('../views/main/system/add-user/add-user.vue')
        }
      ]
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

//导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/main' && !token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
export default router
