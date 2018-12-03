import Vue from 'vue'
import Vuex from 'vuex'
import pacientes from './modules/pacientes'
import medicos from './modules/medicos'

import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pacientes,
    medicos
  },
  getters: {
    getField
  },
  mutations: {
    updateField
  }
})
