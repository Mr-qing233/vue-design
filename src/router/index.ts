import { createRouter, createWebHistory } from 'vue-router'

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
    }
  ]
})

export default router
