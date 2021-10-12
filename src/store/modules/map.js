const map = {
  state: {
    config: '',
    currentModule: '',
  },
  mutations: {
    SET_CONFIG: (state, config) => {
      state.config = config;
    },
    SET_CURRENTMODULE: (state, currentModule) => {
      state.currentModule = currentModule;
    }
  },
  actions: {
    setConfig({
      commit
    }, config) {
      commit('SET_CONFIG', config)
    },
    setCurrentModule({
      commit
    }, currentModule) {
      commit('SET_CURRENTMODULE', currentModule)
    }
  }
}

export default map
