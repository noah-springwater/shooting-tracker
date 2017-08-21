// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import firebase from 'firebase'
import { createStore } from './store'
import { createRouter } from './router'
import { config } from './helpers/firebaseConfig'
import Vuefire from 'vuefire'

Vue.use(Router)
Vue.use(Vuefire)

Vue.config.productionTip = false

const store = createStore()
const router = createRouter()

firebase.initializeApp(config)
const db = firebase.database()
const playersRef = db.ref('players')
const drillsRef = db.ref('players/drills')
/* eslint-disable no-new */
new Vue({
  store,
  router,
  created () {
    // firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/home/' + user.uid)
      } else {
        this.$router.push('/')
      }
    })
  },
  firebase: {
    playersRef,
    drillsRef
  },
  el: '#app',
  template: '<App/>',
  components: { App }
})
