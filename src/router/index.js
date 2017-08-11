import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/Auth.vue'
import AuthSuccess from '../components/AuthSuccess.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    routes: [
      {
        path: '/',
        component: Auth
      },
      {
        path: '/success',
        component: AuthSuccess
      }
    ]
  })
}
