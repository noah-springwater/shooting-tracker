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
      listOfDrills: [],
      initialLogin: true
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

        if (user) {
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
        } else {
          commit('CURRENT_TEAM', null)
        }
      }
      // SET_PLAYER_INFO: ({ commit }, payload) => {
      //   let user = firebase.auth().currentUser
      //   if (user) {
      //     let fullName = payload[0]
      //     let number = payload[1]
      //     if (number) {
      //       commit('SET_PLAYER_NUMBER', number)
      //       commit('SET_PLAYER_NAME', fullName)
      //       commit('SET_LOGIN')
      //     }
      //   } else {
      //     commit('SET_PLAYER_NUMBER', null)
      //     commit('SET_PLAYER_NAME', null)
      //     // commit('SET_LOGIN')
      //   }
      // }
    },
    mutations: {
      CURRENT_USER: (state, user) => {
        state.currentUser = user
      },
      USER_FIRST_NAME: (state, firstName) => {
        state.firstName = firstName
      },
      USER_LAST_NAME: (state, lastName) => {
        state.lastName = lastName
      },
      CURRENT_DRILL: (state, currentDrill) => {
        state.currentDrill = currentDrill
      },
      ADD_DRILL: (state, newDrill) => {
        state.listOfDrills.push(newDrill)
      },
      CURRENT_TEAM: (state, team) => {
        state.currentTeam = team
      },
      INITIAL_LOGIN: (state) => {
        state.initialLogin = true
      },
      // SET_LOGIN: (state) => {
      //   state.initialLogin = false
      // },
      SET_PLAYER_NUMBER: (state, number) => {
        state.number = number
      },
      SET_PLAYER_NAME: (state, name) => {
        state.name = name
      },
      CHECK_LOGIN: (state) => {
      }
    }
  })
}
