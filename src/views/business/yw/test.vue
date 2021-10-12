<template>
  <div  >
     <div id="chartGS" style=" height:220px;width:450px "></div>
     <div id="chartHz" style=" height:220px;width:450px  "></div>
     <div id="chartJG" style=" height:220px;width:450px  "></div>
  </div>
</template>
<script>
import echartsUtils from "js/echartsUtilsYW.js";
import countTo from "vue-count-to";

import vueSeamlessScroll from "vue-seamless-scroll";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
      type : "left" 
    };
  },
  methods: {
     moveDiv(type){
        
            clearInterval(this.time2); 
            this.time2=null
        this.time2 = setInterval(() => { 
        var ele6;
        ele6 = document.getElementById("pt6");
        var ele7;
        ele7 = document.getElementById("pt7"); 
          if (type == "left" &&  ele6.scrollLeft < 500) {
            ele6.scrollLeft = ele6.scrollLeft + 20;
            ele7.scrollLeft = ele7.scrollLeft + 20;
          } 
          
           if (type == "right" &&  ele6.scrollLeft>0) {
            ele6.scrollLeft = ele6.scrollLeft - 20;
            ele7.scrollLeft = ele7.scrollLeft - 20;
          }
           
          if (ele6.scrollLeft >= 500 || ele6.scrollLeft <= 0) {
             this.type = type == "left" ? "right" : "left";
            clearInterval(this.time2); 
            this.time2=null
          } 
      }, 10);
     }

  },
  components: {  countTo,vueSeamlessScroll, swiper,swiperSlide }, 
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
        var hzOption = echartsUtils.getEchartsConfig(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit
        ); 
        this.timer1 = echartsUtils.chartInit("chartHz", hzOption, "1");  
        var jgOption = echartsUtils.getEchartsConfig(
          this.data[4].chartType.toLowerCase(),
          this.data[4].xAxis,
          this.data[4].data,
          this.data[4].title,
          this.data[4].xUnit
        ); 
        this.timer4 = echartsUtils.chartInit("chartJG", jgOption);
        this.dataTableRC.cells = this.data[5].cells;
        this.data[5].rows.forEach(row => {
          if (row[0].length > 11) {
            row[0] = row[0].substring(0, 10) + "...";
          }
        });
        this.dataTableRC.rows = this.data[5].rows;

        var ljOption = echartsUtils.getEchartsConfig(
          this.data[6].chartType.toLowerCase(),
          this.data[6].xAxis,
          this.data[6].data,
          this.data[6].title,
          this.data[6].xUnit
        );
        this.timer6 = echartsUtils.chartInit("chartLJ", ljOption, "1");

        this.dataTableQD.cells = this.data[7].cells;
        this.data[7].rows.forEach(row => {
          if (row[1].length > 11) {
            row[1] = row[1].substring(0, 10) + "...";
          }
          if (row[2].length > 4) {
            row[2] = row[2].substring(0, 3) + "...";
          }
        });
        this.dataTableQD.rows = this.data[7].rows;
      }); 
   
  },
  destroyed() {
    clearInterval(this.time2);
    clearInterval(this.timeALL);
  }
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 26% 48% 26%;
  grid-template-rows: 33% 33% 29% 5%;
  .pt1 {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt2 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt3 {
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt4 {
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt5 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    grid-column-end: 4;
  }
  .pt6 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
  }
  .pt7 {
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 3;
    grid-column-end: 4;
  }
}
.lg_main {
  background: url("~static/images4800/line.png") right 0px no-repeat;
  .pt1 {
    .textPanel {
      background: rgba(255, 255, 255, 0.02);
      border-radius: 10px;
      padding: 15px;
      //border:1px solid #32d1ff;
      box-shadow: 0 0 15px inset rgba(24, 167, 209, 0.4);
    }
    p {
      text-indent: 2em;
      margin: 6px 0;
      font-size: 1.2rem;
      line-height: 1.6rem;
    }
    p.title {
      font-weight: bold;
      font-size: 1.8rem;
      text-indent: 0;
      margin-top: 30px;
      &:nth-child(1) {
        margin-top: 0;
      }
    }
    p.color1 {
      color: #ff211f;
    }
    p.color2 {
      color: #ffe30c;
    }
    p.color3 {
      color: #48ff8a;
    }
  }
  .pt2 {
    margin-top: 100px;
    .panelDataChart {
      margin-top: 0px;
    }
  }
  .pt3 {
    margin-top: 40px;
    .panelDataChart {
      .title { 
      font-size: 1.5rem; 
    }
    }
   
  }
  .pt4 {
    position: relative;
    padding-top: 35px;
    box-sizing: border-box;
  }
  .pt5 {
    margin-top: 35px;
    .panelDataChart {
      margin-top: -50px;
    }
  }
  .pt6 {
    width: 500px;
    .panelDataChart {
      margin: 0px 0 0 25px;
    }
  }
  .pt7 {
    .panel_table {
      .list_content {
        height: 200px; 
        overflow: hidden;
      }
    }
    .list_cell0 {
      width: 40%;
    }
    .list_cell1 {
      width: 20%;
    }
    .list_cell2 {
      width: 40%;
    }
    .list_cell3 {
      width: 25%;
    }
    .list_cell10 { 
      display: none;
    }
    .list_cell11 {
      width: 40%;
      display: inline-block;
    }
    .list_cell12 {
      width: 15%;
      display: inline-block;
    }
    .list_cell13 {
      width: 30%;
      display: inline-block;
    }
    .list_cell14 {
      width: 15%;
      display: inline-block;
    }
  }
}
</style>
