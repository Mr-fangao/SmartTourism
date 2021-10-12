<template>
  <div class="chartbg">
    <div class="div1 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">服务对象分析</div>
      </div>
      <div class="flexRow">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div id="chartSAX" style=" height:250px; "></div>
          </div>
        </div>
        <div class="listtab">
          <div class="stitle">男：</div>
          <div class="num color1">{{man}}</div>
          <div class="stitle">女：</div>
          <div class="num color2">{{woman}}</div>
        </div>
      </div>
    </div>

    <div class="div2 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">资金投入及服务人员</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartZJ" style=" height:350px;  "></div>
        </div>
      </div>
    </div>
    <div class="div3 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">服务类型</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartLX" style=" height:350px;  "></div>
        </div>
      </div>
    </div>

    <div class="div4 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">活动类型</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div id="chartHD" style=" height:350px;  "></div>
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
  components: { countTo, vueSeamlessScroll, swiper, swiperSlide },
  mounted() {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/ylfw.ashx"
      })
      .then(res => {
        if (res.data) {
          if (res.data.length == 0) return;
          this.data = res.data;

          var saxOption = echartsUtils.getEchartsConfig_EX(
            "column",
            this.data[1].xAxis,
            this.data[1].data,
            this.data[1].title,
            this.data[1].xUnit,
            this.data[1].legend
          );
          this.data[1].data[0].forEach(element => {
            this.man += parseInt(element);
          });
          this.data[1].data[1].forEach(element => {
            this.woman += parseInt(element);
          });
          this.timer1 = echartsUtils.chartInit("chartSAX", saxOption, "1");

          var zjOption = echartsUtils.getEchartsConfig_EXS(
            this.data[2].chartType.toLowerCase(),
            this.data[2].xAxis,
            this.data[2].data,
            this.data[2].title,
            this.data[2].yAxis,
            this.data[2].legend,
            2, //线和柱状图
            1 //线状开始索引
          );
          this.timer2 = echartsUtils.chartInit("chartZJ", zjOption, "1");
          var lxOption = echartsUtils.getEchartsConfig_EX2(
            this.data[4].chartType.toLowerCase(),
            this.data[4].xAxis,
            this.data[4].data,
            this.data[4].title,
            this.data[4].xUnit,
            this.data[4].legend,
            this.data[4].stack
          );

          this.timer4 = echartsUtils.chartInit("chartLX", lxOption, "1");
          var hdOption = echartsUtils.getEchartsConfig_EX(
            this.data[5].chartType.toLowerCase(),
            this.data[5].xAxis,
            this.data[5].data,
            this.data[5].title,
            this.data[5].xUnit,
            this.data[5].legend
          );
          this.timer5 = echartsUtils.chartInit("chartHD", hdOption, "1");
        }
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
  .list_cell0 {
    width: 30%;
  }
  .list_cell1 {
    width: 26%;
  }
  .list_cell2 {
    width: 44%;
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
