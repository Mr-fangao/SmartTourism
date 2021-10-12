<template>
  <div class="chartbg">
    <div class="div1 chart">
      <div class="panel_header">
        <!-- <div class="panel_headerTitle">近五年发展趋势</div> -->
        <div class="panel_headerTitle">企业数量</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartQS"
            style=" height:245px; "
          ></div>
        </div>
      </div>
    </div>

    <div class="div2 chart">
      <div class="panel_header">
        <!-- <div class="panel_headerTitle">经济发展三驾马车</div> -->
        <div class="panel_headerTitle">经济指标</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartMC"
            style=" height:245px;"
          ></div>
        </div>
      </div>
    </div>
    <div class="div3 chart">
      <div class="panel_header">
        <!-- <div class="panel_headerTitle">招商引资成果</div> -->
        <div class="panel_headerTitle">产业结构</div>
      </div>
      <div class="flexRow">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartSJ"
              style=" height:245px;"
            ></div>
          </div>
        </div>
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartXZ"
              style=" height:245px;"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="div4 chart">
      <div class="panel_header">
        <!-- <div class="panel_headerTitle">对外贸易平稳发展</div> -->
        <div class="panel_headerTitle">水</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartMY"
            style=" height:245px;"
          ></div>
        </div>
      </div>
    </div>
    <div class="div5 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">电</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartSR"
            style=" height:245px;"
          ></div>
        </div>
      </div>
    </div>
    <div class="div6 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">气</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartq"
            style=" height:245px;"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echartsUtils from "js/echartsUtilsYW.js";
import countTo from "vue-count-to";

import vueSeamlessScroll from "vue-seamless-scroll";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      dataTableRC: {
        cells: [],
        rows: []
      },
      dataTableQD: {
        cells: [],
        rows: []
      },
      data: [],

      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      type: "left"
    };
  },
  methods: {},
  components: { countTo, vueSeamlessScroll, swiper, swiperSlide },
  mounted() {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        // url: this.GLOBAL.weburl_Onemap + "/handler/jjfz.ashx"
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/jjfz.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        var qsOption = echartsUtils.getEchartsConfig(
          this.data[0].chartType.toLowerCase(),
          this.data[0].xAxis,
          this.data[0].data,
          this.data[0].title,
          this.data[0].xUnit
        );

        this.timer3 = echartsUtils.chartInit("chartQS", qsOption, "1");
        var mcOption = echartsUtils.getEchartsConfig_EX(
          this.data[3].chartType.toLowerCase(),
          this.data[3].xAxis,
          this.data[3].data,
          this.data[3].title,
          this.data[3].xUnit,
          this.data[3].legend
        );
        this.timer4 = echartsUtils.chartInit("chartMC", mcOption, "1");
        // 产业结构 柱
        var sjOption = echartsUtils.getEchartsConfig_EX(
          this.data[4].chartType.toLowerCase(),
          this.data[4].xAxis,
          this.data[4].data,
          this.data[4].title,
          this.data[4].xUnit,
          this.data[4].legend
        );
        this.timer5 = echartsUtils.chartInit("chartSJ", sjOption, "1");
        // 产业占比
        var chart5_Option = echartsUtils.getEchartsConfig_EX_WT(
          this.data[5].chartType.toLowerCase(),
          this.data[5].xAxis,
          this.data[5].data,
          this.data[5].title,
          this.data[5].xUnit,
          []
        );
        chart5_Option.legend.orient = "horizontal";
        chart5_Option.legend.x = "center";
        chart5_Option.legend.y = "top";
        chart5_Option.series[0].center = ["50%", "50%"];
        chart5_Option.series[0].radius = ["35", "70"];
        chart5_Option.series[0].roseType = "radius";
        console.log(chart5_Option, "sdsss");
        chart5_Option.legend.x = "center";
        chart5_Option.legend.y = "top";
        chart5_Option.legend.orient = "horizontal";
        this.timer5 = echartsUtils.chartInit("chartXZ", chart5_Option, "1");
        // 水
        var myOptionS = echartsUtils.getEchartsConfig_EX_WT(
          this.data[9].chartType.toLowerCase(),
          this.data[9].xAxis,
          this.data[9].data,
          this.data[9].title,
          this.data[9].xUnit,
          this.data[9].legend,
          "",
          1
        );
        this.timer9 = echartsUtils.chartInit("chartMY", myOptionS, "1");
        // 电
        var srOption = echartsUtils.getEchartsConfig_EX_WT(
          this.data[7].chartType.toLowerCase(),
          this.data[7].xAxis,
          this.data[7].data,
          this.data[7].title,
          this.data[7].xUnit,
          this.data[7].legend,
          "",
          1
        );
        this.timer7 = echartsUtils.chartInit("chartSR", srOption, "1");
        var chartq = echartsUtils.getEchartsConfig_EX(
          this.data[8].chartType.toLowerCase(),
          this.data[8].xAxis,
          [this.data[8].data],
          this.data[8].title,
          this.data[8].xUnit,
          this.data[8].legend
        );
        this.timer8 = echartsUtils.chartInit("chartq", chartq, "1");
      });
  },
  destroyed() {
    clearInterval(this.time2);
    clearInterval(this.timeALL);
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
  overflow-y: auto;
  .chart {
    //background: #fff;
    //border-radius: 4px;
    width: 46%;
    margin: 0 2%;
    //box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.03);
    .panel_headerTitle {
      //text-align: center;
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    .panelDataChart {
    }
  }
}
.div1 {
  .panelDataChart {
    margin-top: 10px;
  }
}
.div2 {
  .panelDataChart {
    margin-top: 10px;
  }
}
.div3 {
  width: 99% !important;
  .flexRow {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .panelDataChart {
      width: 48%;
      margin: 0 1%;
    }
  }
  //display: flex;
  //flex-wrap: nowrap;
}
.div4 {
}
.div5 {
}
</style>
