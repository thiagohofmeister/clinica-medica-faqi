import api from '@/api'

export default {
  namespaced: true,
  state: {
    fetching: false,
    medicos: []
  },
  actions: {
    fetchMedicos ({ state, commit }) {
      commit('fetching', true)

      api.getMedicos()
        .then(medicos => commit('fetchMedicos', medicos))
        .catch(() => commit('fetchMedicos', []))
        .then(() => commit('fetching', false))
    }
  },
  mutations: {
    fetchMedicos (state, medicos) {
      state.medicos = medicos
    },
    fetching (state, flag) {
      state.fetching = flag
    }
  }
}
