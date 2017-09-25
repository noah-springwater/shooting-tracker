// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import firebase from 'firebase'
import { createStore } from './store'
import router from './router'
import { config } from './helpers/firebaseConfig'
import Vuefire from 'vuefire'

Vue.use(Router)
Vue.use(Vuefire)

Vue.config.productionTip = false

const store = createStore()
let app
firebase.initializeApp(config)
const db = firebase.database()
const teamsRef = db.ref('teams')

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      store,
      router,
      created () {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.$router.push('/home/' + user.uid)
            this.$store.dispatch('SET_PLAYER_DATA')
          } else {
            this.$router.push('/')
            this.$store.dispatch('CLEAR_STATE')
          }
        })
      },
      firebase: {
        teamsRef
      },
      el: '#app',
      template: '<App/>',
      components: { App }
    })
  }
})
/* eslint-disable no-new */
