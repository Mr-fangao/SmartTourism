<template>
  <div class="chartbg">
    <div class="div1 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">重点企业绝对额前十</div>
      </div>
      <div class="flexRow">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div id="chartTop" style=" height:350px; "></div>
          </div>
        </div> 
      </div>
    </div>

    <div class="div2 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">重点企业绝对额后十</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartLast" style=" height:350px;  "></div>
        </div>
      </div>
    </div>
    <div class="div3 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">行业分类</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartFL" style=" height:350px;  "></div>
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
      man: 0,
      woman: 0,
      zlzx: 0,
      cws: 0,
      lrs: 0,
      shhyy: 0,
      data: {
        cells: [],
        rows: []
      },
      dataTableJH: {},
      dataTableZJ: {},
      autoScrollOption: {
        autoPlay: true, //自动播放
        step: 0.2, //滚动速度（步长）
        limitMoveNum: 6, //开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      }
    };
  },
  methods: {},
  components: {  countTo, vueSeamlessScroll, swiper, swiperSlide },
  mounted() {
    webAPI.server
      .get({ 
        url: this.GLOBAL.weburl_Onemap + "/handler/jjfz.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;
console.log(1)
       var jdeOption = echartsUtils.getEchartsConfig_EX2(
          this.data[11].chartType.toLowerCase(),
          this.data[11].xAxis,
          this.data[11].data,
          this.data[11].title,
          "",
          this.data[11].legend
        ); 
        var leftLabel = {
          normal: { position: "right", show: true }
        };
        jdeOption.series[0].barWidth = "50%";
        jdeOption.series[0].label = leftLabel; 
        this.timer11 = echartsUtils.chartInit("chartTop", jdeOption, "1");
        var jde2Option = echartsUtils.getEchartsConfig_EX2(
          this.data[12].chartType.toLowerCase(),
          this.data[12].xAxis,
          this.data[12].data,
          this.data[12].title,
          "",
          this.data[12].legend,
          null,
          "right"
        );
        var rightLabel = {
          normal: { position: "left", show: true }
        };
        jde2Option.series[0].label = rightLabel; 
        jdeOption.series[0].barWidth = "50%"; 
        this.timer12 = echartsUtils.chartInit("chartLast", jde2Option, "1");

        var flOption = echartsUtils.getEchartsConfig(
          this.data[14].chartType.toLowerCase(),
          this.data[14].xAxis,
          this.data[14].data,
          this.data[14].title,
          this.data[14].xUnit
        );

        this.timer1 = echartsUtils.chartInit("chartFL", flOption);
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
    margin-top: 15px;
    span {
      color: #2bc6f4;
      font-size: 1.6rem;
      text-align: center;
      display: block;
      font-weight: bold;
    }
  }
  .listtab {
    text-align: center;
    font-size: 1.2rem;
    div {
      display: inline-block;

      font-size: 14px;
      text-align: center;
      margin: 3px 0;
    }
    .stitle {
      width: 50px;
      text-align: right;
    }
    .num {
      width: 70px;
      //margin-left: 10px;
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      background: hsla(0, 0%, 100%, 0.02);
      font-size: 1.4rem;
      font-weight: bold;
      padding: 3px 5px;
      //font-family: "myfont2";
    }
    .color1 {
      color: #c23531;
    }
    .color2 {
      color: #2f4554;
    }
  }
}
.div2 {
 .panelDataChart {
    margin-top: 15px;
 } 
}
.div3 {

}
.div4 {

  .panelDataChart {
    margin-left: 40px;
    margin-right: 40px;
  }
}
</style>
