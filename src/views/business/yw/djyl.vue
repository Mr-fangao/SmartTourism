<template>
  <div class="chartbg">
    <div class="div1 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">党员年龄分析</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartSAX"
            style=" height:350px; "
          ></div>
        </div>
      </div>
    </div>
    <div class="div2 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">党员人数</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartQS"
            style=" height:350px;  "
          ></div>
        </div>
      </div>
    </div>
    <div class="div3 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">党组织生活</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartSH"
            style=" height:350px;  "
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
        // url: this.GLOBAL.weburl_Onemap + "/handler/djyl.ashx"
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/djyl.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        var saxOption = echartsUtils.getEchartsConfig_EX2(
          this.data[2].chartType.toLowerCase(),
          this.data[2].xAxis,
          this.data[2].data,
          this.data[2].title,
          this.data[2].xUnit,
          this.data[2].legend
        );
        this.timer2 = echartsUtils.chartInit("chartSAX", saxOption, "1");

        var qsOption = echartsUtils.getEchartsConfig(
          this.data[3].chartType.toLowerCase(),
          this.data[3].xAxis,
          this.data[3].data,
          this.data[3].title,
          this.data[3].xUnit
        );
        this.timer3 = echartsUtils.chartInit("chartQS", qsOption, "1");

        var shOption = echartsUtils.getEchartsConfig_EX2(
          this.data[4].chartType.toLowerCase(),
          this.data[4].xAxis,
          this.data[4].data,
          this.data[4].title,
          this.data[4].xUnit,
          this.data[4].legend,
          this.data[4].stack
        );
        console.log(shOption);
        this.timer4 = echartsUtils.chartInit("chartSH", shOption, "1");
        this.zbList = this.data[5]["list"];
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
  .chart {
    //background: #fff;
    //border-radius: 4px;
    width: 48%;
    margin: 1%;
    //box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.03);
    .panel_headerTitle {
      //text-align: center;
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    .panelDataChart {
      //padding: 10px 20px 0 0;
    }
  }
}
.div1 {
}
.div2 {
}
.div3 {
}
.div4 {
}
</style>
