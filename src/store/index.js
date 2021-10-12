import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'
import data from './modules/data'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    map,
    data
  },
  getters
})

export default store
