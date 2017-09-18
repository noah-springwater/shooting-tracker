import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      currentUser: {},
      currentDrill: '',
      listOfDrills: [],
      currentTeam: '',
      player: 'Johnny Mrlik'
    },
    actions: {
      SET_USER_AND_TEAM: ({ commit }) => {
        let user = firebase.auth().currentUser
        commit('CURRENT_USER', user)

        if (user) {
          let setEmail = user.email.split('@')[1]
          if (setEmail === 'gmail.com') {
            commit('CURRENT_TEAM', 'USF')
          } else {
            commit('CURRENT_TEAM', 'Vassar')
          }
        } else {
          commit('CURRENT_TEAM', null)
        }
      }
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
      }
    }
  })
}
