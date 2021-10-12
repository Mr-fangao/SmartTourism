<template>
  <div class="chartbg">
    <div class="div1 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">规上企业研发投入及企业专利数</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartGS" style=" height:250px; "></div>
        </div>
      </div>
    </div>
    <div class="div2 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">各类科技企业数量</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartQY" style=" height:250px;  "></div>
        </div>
      </div>
    </div>
    <div class="div3 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">产学研合作数</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartHz" style=" height:240px;  "></div>
        </div>
      </div>
    </div>
    <div class="div4 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">科技项目立项数</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartLX" style=" height:240px;   "></div>
        </div>
      </div>
    </div>
    <div class="div5 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">研发机构数</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartJG" style=" height:250px;"></div>
        </div>
      </div>
    </div>
    <div class="div6 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">领军人才数量统计</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartLJ" style=" height:300px; "></div>
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
        autoPlay: true, //自动播放
        step: 0.2, //滚动速度（步长）
        limitMoveNum: 6, //开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      type: "left"
    };
  },
  methods: {},
  components: {  countTo, vueSeamlessScroll, swiper, swiperSlide },
  mounted() {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/rckc.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        var gsOption = echartsUtils.getEchartsConfig_EXS(
          this.data[0].chartType.toLowerCase(),
          this.data[0].xAxis,
          this.data[0].data,
          this.data[0].title,
          this.data[0].yAxis,
          this.data[0].legend,
          2, //线和柱状图
          2 //线状开始索引
        );
        this.timer0 = echartsUtils.chartInit("chartGS", gsOption, "1");

        var qyOption = echartsUtils.getEchartsConfig_EX2(
          this.data[3].chartType.toLowerCase(),
          this.data[3].xAxis,
          this.data[3].data,
          this.data[3].title,
          this.data[3].xUnit,
          this.data[3].legend
        );
        this.timer3 = echartsUtils.chartInit("chartQY", qyOption, "1");

        var hzOption = echartsUtils.getEchartsConfig(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit
        );
        this.timer1 = echartsUtils.chartInit("chartHz", hzOption, "1");
        var lxOption = echartsUtils.getEchartsConfig(
          this.data[2].chartType.toLowerCase(),
          this.data[2].xAxis,
          this.data[2].data,
          this.data[2].title,
          this.data[2].xUnit
        );
        this.timer2 = echartsUtils.chartInit("chartLX", lxOption, "1");
        var jgOption = echartsUtils.getEchartsConfig(
          this.data[4].chartType.toLowerCase(),
          this.data[4].xAxis,
          this.data[4].data,
          this.data[4].title,
          this.data[4].xUnit
        );
        this.timer4 = echartsUtils.chartInit("chartJG", jgOption);
        var ljOption = echartsUtils.getEchartsConfig(
          this.data[6].chartType.toLowerCase(),
          this.data[6].xAxis,
          this.data[6].data,
          this.data[6].title,
          this.data[6].xUnit
        );
        this.timer6 = echartsUtils.chartInit("chartLJ", ljOption, "1");
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
      //padding: 10px 20px 0 0;
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
}
.div4 {
}
.div5 {
}
.div6 {
  .panelDataChart {
    margin-top: -30px;
  }
}
</style>
