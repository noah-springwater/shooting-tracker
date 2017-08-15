import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '../components/LogIn'
import HomePage from '../components/HomePage'

Vue.use(Router)

export function createRouter () {
  return new Router({
    routes: [
      {
        path: '/',
        component: LogIn
      },
      {
        path: '/home',
        component: HomePage
      }
    ]
  })
}
