import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    plugins: [
      createPersistedState({
        getState: (key) => Cookies.getJSON(key),
        setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: false })
      })
    ],
    actions: {
      SET_PLAYER_DATA: ({ commit }) => {
        let user = firebase.auth().currentUser

        // SET TEAM NAME
        let setEmail = user.email.split('@')[1]
        switch (setEmail) {
          case 'gmail.com':
            commit('SET_CURRENT_TEAM', 'University of San Francisco')
            break

          case 'yahoo.com':
            commit('SET_CURRENT_TEAM', 'Vassar College')
            break

          default:
            commit('SET_CURRENT_TEAM', '')
            break
        }

        // CHECKS FOR INITIAL LOGIN
        if (user.displayName) {
          commit('IS_NOT_INITIAL_LOGIN')
        } else {
          commit('IS_INITIAL_LOGIN')
        }
      },
      CLEAR_STATE: ({ commit }) => {
        commit('SET_CURRENT_TEAM', null)
        commit('SET_CURRENT_PLAYER_NAME', null)
        commit('NULLIFY_INITIAL_STATE')
      }
    },
    mutations: {
      SET_CURRENT_TEAM: (state, teamName) => {
        state.team = teamName
      },
      SET_CURRENT_PLAYER_NAME: (state, playerName) => {
        state.playerName = playerName
      },
      NULLIFY_INITIAL_STATE: (state) => {
        state.initialLogin = null
      },
      IS_INITIAL_LOGIN: (state) => {
        state.initialLogin = true
      },
      IS_NOT_INITIAL_LOGIN: (state) => {
        state.initialLogin = false
      }
    }
  })
}
