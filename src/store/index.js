import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    health: {
      healthDetailMore: [],
      currentPage: ''
    }
  },
  mutations: {
    CHANGEHEALTH(state, data) {
      state.health.healthDetailMore = data
    },
    CHANGECURRENTPAGE(state, data) {
      state.health.currentPage = data
    }
  }
})
