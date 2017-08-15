// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import firebase from 'firebase'
import { createStore } from './store'
import { createRouter } from './router'
import { config } from './helpers/firebaseConfig'

Vue.use(Router)
Vue.config.productionTip = false

const store = createStore()
const router = createRouter()
/* eslint-disable no-new */
new Vue({
  store,
  router,
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/home')
      } else {
        this.$router.push('/')
      }
    })
  },
  el: '#app',
  template: '<App/>',
  components: { App }
})
