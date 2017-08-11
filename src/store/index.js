import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      INCREMENT: (state, payload) => {
        state.count += payload.amount
      }
    }
  })
}
