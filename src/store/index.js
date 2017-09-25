import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
    },
    plugins: [
      createPersistedState({
        getState: (key) => Cookies.getJSON(key),
        setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: false })
      })
    ],
    actions: {
      SET_PLAYER_DATA: ({ commit }) => {
        commit('TEST')
      }
    },
    mutations: {
      TEST: () => {
        console.log('test working')
      }
    }
  })
}
