<template>
  <div>
    <div class="panel pt1">
      <div class="panel_header">
        <div v-if="data.length > 0" class="panel_headerTitle">
          {{ JBQKDataList.title }}
        </div>
      </div>
      <div class="flexRow">
        <div
          v-if="data.length > 0"
          class="iconcardPanel"
          v-for="(item, index) in JBQKDataList.list"
        >
          <!-- <div class="title">{{item.name}}</div>
          <div class="container">
            <span>
              <countTo
                :startVal="0"
                :endVal="parseFloat(item.value)"
                :duration="2000"
                :decimals="item.value.indexOf('.')>-1?2:0"
              ></countTo>
            </span>{{item.unit}}
          </div> -->
          <div class="card-item">
            <div class="card">
              <div :class="'card-count' + index">
                <countTo
                  :startVal="0"
                  :endVal="parseFloat(item.value)"
                  :duration="2000"
                  :decimals="item.value.indexOf('.') > -1 ? 2 : 0"
                ></countTo>
              </div>
              <div class="card-name">{{ item.name }}</div>
              <div class="card-unit">{{ item.unit }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <!-- <div
          v-if="data.length>0"
          class="panel_headerTitle"
        >{{data[1].title}}</div> -->
        <div class="panel_headerTitle">户籍人口年龄段占比分析</div>
      </div>
      <div class="panelDataChart" style="display: flex">
        <div class="panelDataChart_part">
          <div id="chartNL" style="height: 186px; width: 204px"></div>
          <!-- <highcharts :options="chartOptions" id="container"></highcharts> -->
        </div>
        <div class="panelDataChart_part">
          <div
            id="chartCZRKNLD"
            style="position: relative; left: 30px; height: 186px; width: 204px"
          ></div>
        </div>
      </div>
    </div>
    <div class="panel pt3">
      <div class="panel_header">
        <!-- <div
          v-if="data.length>0"
          class="panel_headerTitle"
        >{{data[2].title}}</div> -->
        <div class="panel_headerTitle">户籍人口和流动人口分析</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartRKFX" style="position: absolute;
    left: -19px;
    top: 81px;
    width: 468px;
    height: 272px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 智慧乡镇:网格管理
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";
// import { Chart } from "highcharts-vue";
export default {
  data() {
    return {
      JBQKDataList: {},
      data: [],
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20,
      },
      chartOptions: {},
    };
  },
  methods: {
    handlerNum(numStr) {
      return parseFloat(numStr);
    },
  },
  components: { countTo },
  mounted() {
    webAPI.server
      .get({
        // url: "static/json/zhxz/zhdd/jbqk.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/jbqk.ashx",
      })
      .then((res) => {
        if (res.data.length == 0) return;
        this.data = res.data;
        // 基本情况
        this.JBQKDataList = this.data[0];

        // 常住人口年龄段占比分析
        var pleYearOption = echartsUtils.getEchartsConfig(
          this.data[1].chartType.toLowerCase(),
          this.data[1].legend,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit
        );
        pleYearOption.series[1].label.normal.padding = [0, -40, 12];
        pleYearOption.series[0].center = ["55%", "50%"];
        pleYearOption.series[1].center = ["-45%", "50%"];
        pleYearOption.series[1].radius = ["50", "95"];
        pleYearOption.series[1].roseType = "radius";
        // this.timer7 = echartsUtils.chartInit("chartCZRKNLD", pleYearOption);
        // 常住人口性别比例分析
        var pieSexOption = {
          tooltip: {
            trigger: "item",
            formatter: "{b} \n {d}%",
            show: false,
          },
          legend: {
            show: false,
          },
          series: [
            {
              // name: "访问来源",
              type: "pie",
              radius: "85%",
              center: ["45%", "50%"],
              color: ["#007aff", "#00d7e9"],
              data: this.data[1].data[0],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
              labelLine: {
                normal: {
                  //length: 0.1, // 改变标示线的长度
                  lineStyle: {},
                },
              },
              label: {
                position: "inside",
                color: "#ffffff",
                formatter: "{b}: {d}%",
                fontSize: 12,
              },
            },
          ],
        };
        this.timer7 = echartsUtils.chartInit("chartCZRKNLD", pieSexOption);
        var pieAgeOption = {
          tooltip: {
            trigger: "item",
            formatter: "{b} : {d}%",
            show: false,
          },
          legend: {
            show: false,
          },
          grid: {},
          series: [
            {
              // name: "访问来源",
              type: "pie",
              radius: "85%",
              center: ["50%", "50%"],
              color: ["#f9a110", "#5879f6", "#abdf4a", "#045ed6"],
              data: this.data[1].data[1],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
              labelLine: {
                normal: {
                  length: 1, // 改变标示线的长度
                  lineStyle: {},
                },
              },
              label: {
                position: "inner",
                color: "#ffffff",
                formatter: "{b}\n{d}%",
                fontSize: "12",
              },
            },
          ],
        };
        this.timer9 = echartsUtils.chartInit("chartNL", pieAgeOption);
        //双轴
        // var chart8_Option = echartsUtils.getEchartsConfig_EXS(
        //   this.data[2].chartType.toLowerCase(),
        //   this.data[2].xAxis,
        //   this.data[2].data,
        //   this.data[2].title,
        //   this.data[2].yAxis,
        //   this.data[2].legend,
        //   3, // 线和柱状图
        //   2 // 线状开始索引
        // );

        var chart8_Option = echartsUtils.getEchartsConfig_EX(
          this.data[2].chartType.toLowerCase(),
          this.data[2].xAxis,
          this.data[2].data,
          this.data[2].title,
          this.data[2].xUnit,
          this.data[2].legend
        );
        chart8_Option.series[0].symbolSize = 5;
        chart8_Option.series[1].symbolSize = 5;//设置折点大小
        chart8_Option.legend.show = true;
        chart8_Option.legend.itemWidth = 7; // 图例图形宽度
        chart8_Option.legend.itemHeight = 7; // 图例图形高度
        chart8_Option.legend.left = "300"
        chart8_Option.yAxis.scale = true;
        // chart8_Option.series.forEach(el=>{
        //   el.areaStyle = 'none'
        // })
        chart8_Option.xAxis.axisLabel.rotate = 0;
        this.timer8 = echartsUtils.chartInit("chartRKFX", chart8_Option, "1");
      });
  },
  destroyed() {
    clearInterval(this.timerWG);
  },
};
</script>
<style lang="less" scoped>
.lg_main {
  .pt1 {
    .flexRow {
      position: relative;
      width: 95%;
      top: 20px;
      // -webkit-box-pack: justify;
      // justify-content: space-between;
      // width: 440px;
      // height: 250px;
    }
    .iconcardPanel {
      // width: 35%;
      border: 1px solid #1c3c9c;
      margin: 1rem 0 1rem 0;
      border: none;
      padding-left: 0;
      display: flex;
      justify-content: space-around;
      width: 114px;
      height: 127px;

      .container {
        text-align: center;
        background: #0a4f84;
        padding: 10px 5px;
        margin-top: 5px;
        > span {
          font-size: 2.4rem;
        }
        &:before,
        &:after {
          display: none;
        }
      }
      &:before,
      &:after {
        display: none;
      }
      .title {
        height: 2rem;
        line-height: 2rem;
        text-align: center;
      }
    }
    .iconcardPanel:before {
      left: 40px;
      width: 50px;
      height: 50px;
    }
    .iconcardPanel:nth-child(1) {
      transform: scale(0.7,0.9);
      left: -70px;
      display: block;
    }
    .iconcardPanel:nth-child(2) {
      transform: scale(1,1.2);
      left: -40px;
      display: block;
    }
    .iconcardPanel:nth-child(3) {
      transform: scale(0.7,0.9);
      left: 2px;
      display: block;
    }
    .card-item {
      width: 150px;
      height: 127px;
      text-align: center;
      background: url("~static/images/dsj/bg6.png") 0 0 no-repeat;
      background-size: 100% 100%;
      display: flex;
      .card {
        align-self: center;
        margin: 0 auto;
        .card-count0 {
          // font-size: 3rem;
          width: 62px;
          height: 24px;
          font-size: 25px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #0ce0ff;
          line-height: 20px;
        }
        .card-count1 {
          transform: scale(1,1);
          width: 62px;
          height: 24px;
          font-size: 27px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #00ff60;
          line-height: 20px;
        }
        .card-count2 {
          width: 62px;
          height: 24px;
          font-size: 25px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #fffc06;
          line-height: 18px;
        }
        .card-name {
          width: 63px;
          height: 17px;
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #21c0f4;
          line-height: 21px;
        }
        .card-unit {
          width: 50px;
          height: 12px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #21c0f4;
          line-height: 21px;
          position: relative;
          left: 6px;
        }
      }
    }
  }
  .pt2 {
    position: relative;
    top: 35px;
    margin-top: 50px;
    .panelDataChart {
      position: relative;
      top: 25px;
      margin: 20px 10px;
      span {
        // color: #2bc6f4;
        font-size: 1.4rem;
        text-align: center;
        display: block;
        font-weight: bold;
      }
    }
  }
  .pt3 {
    position: relative;
    margin-top: 50px;
    top: 80px;
  }
}
</style>
