//引入全局组件
import panelChangeTab from "@/components//panelChangeTab";
import panelChangeTabNew from "@/components//panelChangeTabNew";

function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    Vue.component('panelChangeTab', panelChangeTab) //地图
    Vue.component('panelChangeTabNew', panelChangeTabNew) //地图

}
export default plugin