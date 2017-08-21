import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    routes: [
      {
        path: '/',
        component: () => import('@/components/LogIn')
      },
      {
        path: '/home/:id',
        component: () => import('@/components/HomePage')
      }
    ]
  })
}
