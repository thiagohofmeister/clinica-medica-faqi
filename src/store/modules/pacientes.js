import api from '@/api'

export default {
  namespaced: true,
  state: {
    fetching: false,
    pacientes: []
  },
  actions: {
    fetchPacientes ({ state, commit }) {
      commit('fetching', true)

      api.getPacientes()
        .then(pacientes => commit('fetchPacientes', pacientes))
        .catch(() => commit('fetchPacientes', []))
        .then(() => commit('fetching', false))
    }
  },
  mutations: {
    fetchPacientes (state, pacientes) {
      state.pacientes = pacientes
    },
    fetching (state, flag) {
      state.fetching = flag
    }
  }
}
