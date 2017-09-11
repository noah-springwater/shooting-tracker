import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('@/components/LogIn')
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('@/components/SignUp')
    },
    {
      path: '/home/:id',
      name: 'HomePage',
      component: () => import('@/components/HomePage'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/')
  } else if (!requiresAuth && currentUser) {
    next('home/:id')
  } else {
    next()
  }
})

export default router
