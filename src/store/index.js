import Vue from 'vue'
import Vuex from 'vuex'

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
    getters: {
      myUser: (state) => {
        state.currentUser
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
