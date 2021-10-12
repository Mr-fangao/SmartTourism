const map = {
  state: {
    chartPopulationAnalysis: null,
    chartDealCount: null,
    chartDealPrice: null,
    chartOccupancy: null,
    chartFinanceAnalysis: null,
    chartBuildProcess: null,
    chartHome: null,
  },
  mutations: {
    SET_chartPopulationAnalysis: (state, data) => {
      state.chartPopulationAnalysis = data;
    },
    SET_chartDealCount: (state, data) => {
      state.chartDealCount = data;
    },
    SET_chartDealPrice: (state, data) => {
      state.chartDealPrice = data;
    },
    SET_chartOccupancy: (state, data) => {
      state.chartOccupancy = data;
    },
    SET_chartFinanceAnalysis: (state, data) => {
      state.chartFinanceAnalysis = data;
    },
    SET_chartBuildProcess: (state, data) => {
      state.chartBuildProcess = data;
    },
    SET_chartHome: (state, data) => {
      state.chartHome = data;
    },
  },
  actions: {
    setChartPopulationAnalysis({
      commit
    }, data) {
      commit('SET_chartPopulationAnalysis', data)
    },
    setChartDealCount({
      commit
    }, data) {
      commit('SET_chartDealCount', confdataig)
    },
    setChartDealPrice({
      commit
    }, data) {
      commit('SET_chartDealPrice', data)
    },
    setChartOccupancy({
      commit
    }, data) {
      commit('SET_chartOccupancy', confidatag)
    },
    setChartFinanceAnalysis({
      commit
    }, data) {
      commit('SET_chartFinanceAnalysis', data)
    },
    setChartBuildProcess({
      commit
    }, data) {
      commit('SET_chartBuildProcess', data)
    },
    setChartHome({
      commit
    }, data) {
      commit('SET_chartHome', data)
    },
  }
}

export default map
