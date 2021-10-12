<template>
  <div class="chartbg">
    <div class="div1 chart">
      <div id="chartZG" style=" height:900px;"></div>
    </div>
    <div class="div2 chart">
      <div class="list_title">
        <span
          :class="'list_cell'+cellKey"
          v-for="(cell,cellKey) in dataTableSZ.cells"
          :key="cellKey"
        >{{cell}}</span>
      </div>
      <vue-seamless-scroll
        :data="dataTableSZ.rows"
        style="height:850px;overflow:hidden"
        :class-option="autoScrollOption"
      >
        <div class="list_content">
          <div class="list_contentInfo">
            <ul>
              <li v-for="(row,rowKey) in dataTableSZ.rows" :key="rowKey">
                <span
                  :class="'list_cell'+row_cellKey"
                  v-for="(row_cell,row_cellKey) in row"
                  :key="row_cellKey"
                >{{row_cell}}</span>
              </li>
            </ul>
          </div>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import echartsUtils from "js/echartsUtilsYW.js";
import countTo from "vue-count-to";

import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      dataTableSZ: {
        cells: [],
        rows: []
      },
      data: [],
      autoScrollOption: {
        autoPlay: true, //自动播放
        step: 0.2, //滚动速度（步长）
        limitMoveNum: 6, //开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      kqUpTime: "",
      szUpTime: "",
      //判断是都是初始化，0是初始进入
      isFirst: 0
    };
  },
  methods: {
    chartAction(ID, chart_Option) {
      var _this = this;
      var chart = echarts.init(document.getElementById(ID));
      chart.on("click", function(param) {
        _this.fixPoint(param.name, param.seriesName);
      });
      chart.setOption(chart_Option);
    },
    fixPoint(name, type) {
      webAPI.server
        .get({
          url:
            this.GLOBAL.weburl_Onemap + "/handler/zhddson/331_xx.ashx?csq=" +
            name +
            "&hg=" +
            type
        })
        .then(res => {
          this.dataTableSZ.cells = res.data[0].cells;
          res.data[0].rows.forEach(row => {
            if (row[2].length > 26) {
              row[2] = row[2].substring(0, 25) + "...";
            }
            if (row[3].length > 26) {
              row[3] = row[3].substring(0, 25) + "...";
            }
          });
          this.dataTableSZ.rows = res.data[0].rows;
        });
    }
  },
  components: {  countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        url: this.GLOBAL.weburl_Onemap + "/handler/zhddson/331.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        var zgOption = echartsUtils.getEchartsConfig_EX2(
          res.data[0].chartType.toLowerCase(),
          res.data[0].xAxis,
          res.data[0].data,
          res.data[0].title,
          res.data[0].xUnit,
          res.data[0].legend,
          res.data[0].stack
        );
        zgOption.grid.top = "50px";
        zgOption.grid.left = "2%";
        zgOption.grid.right = "12%";
        zgOption.series[1].label = {
          normal: {
            show: true,
            position: "right",
            color: "white",
            formatter: function(params) {
              for (let index = 0; index < res.data[1]["list"].length; index++) {
                const element = res.data[1]["list"][index];
                if (element["name"] == params.name) {
                  return element["value"];
                }
              }
            }
          }
        };

        this.timer4 = this.chartAction("chartZG", zgOption, "1");
        this.fixPoint(
          zgOption.yAxis.data[zgOption.yAxis.data.length - 1],
          zgOption.series[0].name
        );
      });
  },

  destroyed() {
    clearInterval(this.timerKq);
  }
};
</script>
<style lang="less" scoped>
.chartbg {
  background: #f6f6f6;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  .chart {
    width: 48%;
    margin: 1%;
    .panel_headerTitle {
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    .panelDataChart {
    }
  }
}
.div1 {
  width: 50%;
  float: left;
}
.div2 {
  width: 50%;
  float: left;
  .panelDataChart {
    margin-top: 30px;
    span {

      font-size: 1.4rem;
      text-align: center;
      display: block;
      font-weight: bold;
    }
  }
  .list_title {
    color: #000;
    font-size: 1.4rem;
    text-align: center;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(to bottom,#f7f7f7,#e6e6e6);
    border: 1px solid #d6d6d6;
    text-align: center;
  }
  .list_content {
    font-size: 1.4rem;
    text-align: center;
    line-height: 2rem;
    vertical-align: bottom;
    li {
      padding: 4px 0;
      background: #FFF;
       border-left: 1px solid #d6d6d6;
        border-right: 1px solid #d6d6d6;
    }
    li:nth-child(odd){
      background: #eeeeee;
    }
  }
  .list_cell0 {
    display: inline-block;
    width: 10%;
  }
  .list_cell1 {
    width: 10%;
    display: inline-block;
  }
  .list_cell2 {
    width: 40%;
    display: inline-block;
  }
  .list_cell3 {
    width: 40%;
    display: inline-block;
  }
  .list_cell4 {
    display: none;
  }
  .list_cell5 {
    display: none;
  }
}
</style>
