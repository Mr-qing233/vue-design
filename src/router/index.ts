import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect(to) {
        return {
          path: '/home'
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      redirect: '/search',
      children: [
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/SearchView.vue')
        },
        {
          path: '/borrow',
          name: 'borrow',
          component: () => import('../views/BorrowView.vue')
        },
        {
          path: '/storage',
          name: 'storage',
          component: () => import('../views/StorageView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const privilege = window.localStorage.getItem('privilege')
  // const privilege = null
  console.log(privilege)

  if (!privilege && to.path != '/login') {
    ElMessage({
      showClose: true,
      type: 'error',
      message: '请登录系统'
    })
    return '/login'
  } else if (privilege && to.path == '/login') {
    ElMessage({
      showClose: true,
      message: '您已登录'
    })
    return '/home'
  } else if (privilege != '1' && to.path == '/storage') {
    ElMessage({
      showClose: true,
      type: 'error',
      message: '权限不足'
    })
    return '/home'
  }
  return undefined //否则默认导航
})

export default router
