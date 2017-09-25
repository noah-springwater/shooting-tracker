import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      currentUser: {},
      currentDrill: '',
      listOfDrills: []
    },
    plugins: [
      createPersistedState({
        getState: (key) => Cookies.getJSON(key),
        setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: false })
      })
    ],
    actions: {
      SET_USER_AND_TEAM: ({ commit }) => {
        let user = firebase.auth().currentUser
        commit('CURRENT_USER', user)

        // if (user) {
        let setEmail = user.email.split('@')[1]

        switch (setEmail) {
          case 'gmail.com':
            commit('CURRENT_TEAM', 'University of San Francisco')
            break

          case 'yahoo.com':
            commit('CURRENT_TEAM', 'Vassar College')
            break

          default:
            commit('CURRENT_TEAM', '')
            break
        }
        // }
      },
      SET_PLAYER_DATA: ({ commit }, payload) => {
        let user = firebase.auth().currentUser
        let firstName = payload[0]
        let lastName = payload[1]
        let number = parseInt(payload[2])

        let fullName = firstName + ' ' + lastName
        console.log(fullName)

        if (user) {
          user.updateProfile({
            displayName: fullName
          }).then(() => {
            commit('SET_PLAYER_NUMBER', number)
            commit('SET_PLAYER_NAME', fullName)
          })
        }
      },
      CLEAR_STATE: ({ commit }) => {
        commit('CURRENT_USER', null)
        commit('CURRENT_TEAM', null)
        commit('SET_PLAYER_NUMBER', null)
        commit('SET_PLAYER_NAME', null)
      }
    },
    mutations: {
      CURRENT_USER: (state, user) => {
        state.currentUser = user
      },
      CURRENT_TEAM: (state, team) => {
        state.currentTeam = team
      },
      SET_PLAYER_NUMBER: (state, number) => {
        state.number = number
      },
      SET_PLAYER_NAME: (state, name) => {
        state.name = name
      }
    }
  })
}
