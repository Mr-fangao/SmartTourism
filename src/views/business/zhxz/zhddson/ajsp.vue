<template>
  <div>
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">监控视频</div>
      </div>
      <div class="panel_content">
        <iframe
          :src="this.GLOBAL.weburl_Onemap+'/Video/shipinrtmp.html'"
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          style="height: 900px;position: fixed;width: 400px;"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";

import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      aqiValue: 0,
      aqiLevel: "优",
      pm25Value: 0,
      pm25Level: "优",
      pm10Value: 0,
      pm10Level: "优",
      so2Value: 0,
      so2Level: "优",
      no2Value: 0,
      no2Level: "优",
      coValue: 0,
      coLevel: "优",
      o3Value: 0,
      o3Level: "优",
      dataTableSZ: {
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
      kqUpTime: "",
      szUpTime: "",
      // 判断是都是初始化，0是初始进入
      isFirst: 0
    };
  },
  methods: {
    getClassColor(type) {
      switch (type) {
        case "优":
          return "#00882d";
        case "良":
          return "#ffc000";
        case "轻度污染":
          return "#f1621b";
        case "中度污染":
          return "#c71919";
        case "重度污染":
          return "#7123ac";
        case "严重污染":
          return "#7a2500";
        default:
          return "#00882d";
      }
    },
    getGXSJ(type) {
      webAPI.server
        .get({
          url:
            this.GLOBAL.weburl_Onemap +
            "/handler/dsj/hjjc_gxsj.ashx?type=" +
            type
        })
        .then(res => {
          var data = res.data[0];
          if (type == "空气") {
            this.kqUpTime = data.list[0]["更新时间"];
          } else if (type == "水质") {
            this.szUpTime = data.list[0]["更新时间"];
          }
        });
    },
    getCDSZ(name) {
      webAPI.server
        .get({
          // url: "../static/json/rckc.json"
          url:
            this.GLOBAL.weburl_Onemap + "/handler/dsj/hjjc_cd.ashx?name=" + name
        })
        .then(res => {
          if (res.data.length == 0) return;
          var szOption = echartsUtils.getEchartsConfig_EXS(
            res.data[0].chartType.toLowerCase(),
            res.data[0].xAxis,
            res.data[0].data,
            res.data[0].title,
            res.data[0].yAxis,
            res.data[0].legend,
            3, // 线和柱状图
            1 // 线状开始索引
          );
          this.timerSZ = echartsUtils.chartInit("chartSZ", szOption, "1");
        });
      if (this.isFirst != 0) {
        //水质监测点地图定位
        var url =
          this.GLOBAL.weburl_DataCenter +
          "/Q.ashx?DBTag=" +
          this.GLOBAL.Appid +
          "&xKey=Query_ZHDD_SZJC&name=" +
          name;
        webAPI.server
          .get({
            // url: "../static/json/rckc.json"
            url: url
          })
          .then(res => {
            $("iframe")[0].contentWindow.GeoneMap.clientShowPatrolPoints(
              res,
              true
            );
          });
      } else {
        this.isFirst = 1;
      }
    },
    getStyle(rowKey, row_cellKey) {
      if (row_cellKey == 2 || row_cellKey == 3) {
        if (this.dataTableSZ.rows[rowKey][row_cellKey + 2] == "上升") {
          return " Red";
        } else if (this.dataTableSZ.rows[rowKey][row_cellKey + 2] == "下降") {
          return " Green";
        }
      }
      return "";
    }
  },
  components: {  countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/hjjc.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        this.data[0]["list"].forEach(item => {
          switch (item["name"]) {
            case "AQI":
              this.aqiValue = item["value"];
              this.aqiLevel = item["level"];
              break;
            case "PM2.5":
              this.pm25Value = item["value"];
              this.pm25Level = item["level"];
              break;
            case "PM10":
              this.pm10Value = item["value"];
              this.pm10Level = item["level"];
              break;
            case "二氧化硫":
              this.so2Value = item["value"];
              this.so2Level = item["level"];
              break;
            case "二氧化氮":
              this.no2Value = item["value"];
              this.no2Level = item["level"];
              break;
            case "一氧化碳":
              this.coValue = item["value"];
              this.coLevel = item["level"];
              break;
            case "臭氧":
              this.o3Value = item["value"];
              this.o3Level = item["level"];
              break;
            default:
              break;
          }
        });

        var pm25Option = echartsUtils.getEchartsConfig_NoAxis(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit
        );
        this.timer1 = echartsUtils.chartInit("chartPM25", pm25Option, "1");
        var pm10Option = echartsUtils.getEchartsConfig_NoAxis(
          this.data[2].chartType.toLowerCase(),
          this.data[2].xAxis,
          this.data[2].data,
          this.data[2].title,
          this.data[2].xUnit
        );
        this.timer2 = echartsUtils.chartInit("chartPM10", pm10Option, "1");
        var so2Option = echartsUtils.getEchartsConfig_NoAxis(
          this.data[3].chartType.toLowerCase(),
          this.data[3].xAxis,
          this.data[3].data,
          this.data[3].title,
          this.data[3].xUnit
        );
        this.timer3 = echartsUtils.chartInit("chartSO2", so2Option, "1");
        var no2Option = echartsUtils.getEchartsConfig_NoAxis(
          this.data[4].chartType.toLowerCase(),
          this.data[4].xAxis,
          this.data[4].data,
          this.data[4].title,
          this.data[4].xUnit
        );
        this.timer4 = echartsUtils.chartInit("chartNO2", no2Option, "1");
        var coOption = echartsUtils.getEchartsConfig_NoAxis(
          this.data[5].chartType.toLowerCase(),
          this.data[5].xAxis,
          this.data[5].data,
          this.data[5].title,
          this.data[5].xUnit
        );
        coOption.xAxis.show = true;
        coOption.grid.bottom = "50%";
        this.timer5 = echartsUtils.chartInit("chartCO", coOption, "1");

        this.dataTableSZ.cells = this.data[6].cells;
        this.dataTableSZ.rows = this.data[6].rows;
        this.getCDSZ(this.dataTableSZ.rows[0][0]);
        this.getGXSJ("空气");
        this.getGXSJ("水质");
      });
    var hours = 0;
    this.timerKq = setInterval(() => {
      hours++;
      this.getGXSJ("空气");
      if (hours % 4 == 0) {
        this.getGXSJ("水质");
      }
    }, 3600000);
  },

  destroyed() {
    clearInterval(this.timerKq);
  }
};
</script>
<style lang="less" scoped>
.pt1 {
  height: 100%;
  .titleLeft {
    float: left;
    width: 10%;
    margin: 6px 0 0 0;
    position: initial;
    text-align: center;
    line-height: 50px;
    height: 30px;
    font-weight: bold;
    padding-top: 5px;
    box-sizing: border-box;
    font-size: 1.3rem;
  }
  .barStyle {
    float: left;
    margin: 6px 0 0 0;
    height: 30px;
    width: 90%;
  }
  .flexRow {
  }
  .leftdiv {
    width: 50%;
    background: url("~static/images/dsj/panelbg.png") center bottom no-repeat;
    background-size: 80%;
    height: 150px;
    .cardPanel1 {
      height: 140px;
      //width: 140px;
      box-shadow: 0 0 10px inset rgba(255, 255, 255, 0.2);
      width: 80px;
      height: 80px;
      padding: 10px;
      border-radius: 50px;
      text-align: center;
      margin: 10px auto 0 auto;
      .container {
        margin: 0 auto;
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        padding-top: 10px;
        border-radius: 42px;
        box-shadow: 0px 0px 16px inset rgba(0, 0, 0, 0.28);
        font-size: 1.6rem;
        font-weight: bold;
        span {
          font-size: 2.8rem;
          display: block;
          font-weight: bold;
        }
      }
    }
  }
  .rightdiv {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    .cardPanel1 {
      font-size: 12px;
      padding-left: 0;
      height: 44px;
      margin: 0.7rem 0 0 0.7rem;
      width: 82px;
      border: 1px solid #007a3e;
      box-sizing: border-box;
      border-radius: 4px;
      color: #fff;

      //height: 150px;
      .title {
        font-size: 1.2rem;
        text-align: center;
        height: 20px;
        line-height: 20px;
        //font-weight: bold;
        //color: #aab6d6;
      }
      .container {
        height: 22px;
        line-height: 20px;
        text-align: center;
        background: #007a3e;
        color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        span {
          font-size: 1.4rem;
          font-weight: bold;
          font-family: "myfont";
          letter-spacing: 2px;
          color: #fff;
        }
      }
    }
  }
  .bg {
    height: 380px;
  }
}
.pt2 {
  .panelDataChart {
    margin-top: 30px;
    span {
      // color: #2bc6f4;
      font-size: 1.4rem;
      text-align: center;
      display: block;
      font-weight: bold;
    }
  }
  .list_title {
    padding: 2px 0;
  }
  .list_content {
    li {
      padding: 2px 0;
    }
  }
  .list_cell0 {
    width: 30%;
  }
  .list_cell1 {
    width: 30%;
  }
  .list_cell2 {
    width: 20%;
  }
  .list_cell3 {
    width: 20%;
  }
  .list_cell4 {
    display: none;
  }
  .list_cell5 {
    display: none;
  }
  .list_content .Red {
    background-image: url(~static/images/dsj/up.png);
    background-repeat: no-repeat;
    background-position: 70px 5px;
  }
  .list_content .Green {
    background-image: url(~static/images/dsj/down.png);
    background-repeat: no-repeat;
    background-position: 70px 5px;
  }
}
.panel {
  position: relative;

  .time {
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 1.2rem;
  }
}
</style>
