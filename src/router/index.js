import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/Auth.vue'
import AuthSuccess from '../components/AuthSuccess.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Auth',
      component: Auth
    },
    {
      path: '/auth',
      // name: 'Auth',
      component: Auth
    },
    {
      path: '/success',
      // name: 'AuthSuccess',
      component: AuthSuccess
    }
  ]
})
