const getters = {
  config: state => state.map.config,
  currentModule: state => state.map.currentModule,
  chartPopulationAnalysis: state => state.data.chartPopulationAnalysis,
  chartDealCount: state => state.data.chartDealCount,
  chartDealPrice: state => state.data.chartDealPrice,
  chartOccupancy: state => state.data.chartOccupancy,
  chartFinanceAnalysis: state => state.data.chartFinanceAnalysis,
  chartBuildProcess: state => state.data.chartBuildProcess,
  chartHome: state => state.data.chartHome,
}
export default getters
