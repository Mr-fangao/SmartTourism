<template>
  <div>
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">空气监测</div>
      </div>
      <div class="flexRow">
        <div class="leftdiv">
          <div class="cardPanel1">
            <div
              class="container"
              :style="'background:'+getClassColor(aqiLevel)"
            >
              <span>{{aqiValue}}</span>
              {{aqiLevel}}
            </div>
          </div>
        </div>
        <div class="rightdiv">
          <div class="time">{{kqUpTime}}</div>
          <div
            class="cardPanel1"
            :style="'border:1px solid '+getClassColor(pm25Level)"
          >
            <div class="title">
              PM
              <sub>2.5</sub>
            </div>
            <div
              class="container"
              :style="'background:'+getClassColor(pm25Level)"
            >
              <span>{{pm25Value}}</span>
              μg/m³
            </div>
          </div>
          <div
            class="cardPanel1"
            :style="'border:1px solid '+getClassColor(pm10Level)"
          >
            <div class="title">
              PM
              <sub>10</sub>
            </div>
            <div
              class="container"
              :style="'background:'+getClassColor(pm10Level)"
            >
              <span>{{pm10Value}}</span>
              μg/m³
            </div>
          </div>
          <div
            class="cardPanel1"
            :style="'border:1px solid '+getClassColor(so2Level)"
          >
            <div class="title">
              SO
              <sub>2</sub>
            </div>
            <div
              class="container"
              :style="'background:'+getClassColor(so2Level)"
            >
              <span>{{so2Value}}</span>μg/m³
            </div>
          </div>
          <div
            class="cardPanel1"
            :style="'border:1px solid '+getClassColor(no2Level)"
          >
            <div class="title">
              NO
              <sub>2</sub>
            </div>
            <div
              class="container"
              :style="'background:'+getClassColor(no2Level)"
            >
              <span>{{no2Value}}</span>μg/m³
            </div>
          </div>
          <div
            class="cardPanel1"
            :style="'border:1px solid '+getClassColor(coLevel)"
          >
            <div class="title">CO</div>
            <div
              class="container"
              :style="'background:'+getClassColor(coLevel)"
            >
              <span>{{coValue}}</span>mg/m³
            </div>
          </div>
          <div
            class="cardPanel1"
            :style="'border:1px solid '+getClassColor(o3Level)"
          >
            <div class="title">
              O
              <sub>3</sub>
            </div>
            <div
              class="container"
              :style="'background:'+getClassColor(o3Level)"
            >
              <span>{{o3Value}}</span>μg/m³
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top:250px">
        <div class="titleLeft">PM25</div>
        <div
          id="chartPM25"
          class="barStyle"
        ></div>
        <div class="titleLeft">PM10</div>
        <div
          id="chartPM10"
          class="barStyle"
        ></div>
        <div class="titleLeft">NO2</div>
        <div
          id="chartNO2"
          class="barStyle"
        ></div>
        <div class="titleLeft">SO2</div>
        <div
          id="chartSO2"
          class="barStyle"
        ></div>
        <div class="titleLeft">CO</div>
        <div
          id="chartCO"
          class="barStyle"
          style="height:80px"
        ></div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div class="panel_headerTitle">水质监测</div>
      </div>
      <div class="time">{{szUpTime}}</div>
      <div class="list_title">
        <span
          :class="'list_cell'+cellKey"
          v-for="(cell,cellKey) in dataTableSZ.cells"
          :key="cellKey"
        >{{cell}}</span>
      </div>
      <vue-seamless-scroll
        :data="dataTableSZ.rows"
        style="height:145px;overflow:hidden"
        :class-option="autoScrollOption"
      >
        <div class="list_content">
          <div class="list_contentInfo">
            <ul>
              <li
                v-for="(row,rowKey) in dataTableSZ.rows"
                :key="rowKey"
              >
                <span
                  :class="'list_cell'+row_cellKey+getStyle(rowKey,row_cellKey)"
                  v-for="(row_cell,row_cellKey) in row"
                  :key="row_cellKey"
                  @click="getCDSZ(row[0])"
                >{{row_cell}}</span>
              </li>
            </ul>
          </div>
        </div>
      </vue-seamless-scroll>

      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartSZ"
            style=" height:350px;"
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
            "/handler/zhddson/hjjc_gxsj.ashx?type=" +
            type
        })
        .then(res => {
          if (type == "空气") {
            this.kqUpTime = res.data[0].data;
          } else if (type == "水质") {
            this.szUpTime = res.data[0].data;
          }
        });
    },
    getCDSZ(name) {
      if (this.isFirst != 0) {
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
      webAPI.server
        .get({
          // url: "../static/json/rckc.json"
          url: this.GLOBAL.weburl_Onemap + "/handler/cdsz.ashx?name=" + name
        })
        .then(res => {
          if (res.data.length == 0) return;

          // var szOption = echartsUtils.getEchartsConfig_EX(
          //   res.data[0].chartType.toLowerCase(),
          //   res.data[0].xAxis,
          //   res.data[0].data,
          //   res.data[0].title,
          //   res.data[0].xUnit,
          //   res.data[0].legend
          // );

          // this.timerSZ = echartsUtils.chartInit("chartSZ", szOption, "1");
          var szOption = echartsUtils.getEchartsConfig_EXS(
            res.data[0].chartType.toLowerCase(),
            res.data[0].xAxis,
            res.data[0].data,
            res.data[0].title,
            res.data[0].yAxis,
            res.data[0].legend,
            3, //线和柱状图
            1 //线状开始索引
          );
          this.timerSZ = echartsUtils.chartInit("chartSZ", szOption, "1");
        });
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
  components: { countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/zhddson/hjjc.ashx"
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
  width: 50%;
  float: left;
  .titleLeft {
    float: left;
    width: 10%;
    margin: 2px 0;
    position: initial;
    text-align: center;
    line-height: 50px;
    height: 35px;
    font-weight: bold;
    padding-top: 5px;
    box-sizing: border-box;
    font-size: 1.3rem;
  }
  .barStyle {
    float: left;
    margin: 2px 0;
    height: 35px;
    width: 88%;
  }
  .flexRow {
  }
  .leftdiv {
    float: left;
    width: 35%;
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
        width: 160px;
        height: 160px;
        box-sizing: border-box;
        padding-top: 20px;
        border-radius: 84px;
        box-shadow: 0px 0px 16px inset rgba(0, 0, 0, 0.28);
        font-size: 3.2rem;
        font-weight: bold;
        span {
          font-size: 5.6rem;
          display: block;
          font-weight: bold;
        }
      }
    }
  }
  .rightdiv {
    float: left;
    display: flex;
    flex-wrap: wrap;
    width: 65%;
    .cardPanel1 {
      font-size: 24px;
      padding-left: 0;
      height: 88px;
      margin: 0.7rem 0 0 0.7rem;
      width: 164px;
      border: 1px solid #007a3e;
      box-sizing: border-box;
      border-radius: 4px;

      //height: 150px;
      .title {
        font-size: 1.2rem;
        text-align: center;
        height: 44px;
        line-height: 44px;
        //font-weight: bold;
        //color: #aab6d6;
      }
      .container {
        height: 44px;
        text-align: center;
        background: #007a3e;
        color: #c9c9c9;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        span {
          font-size: 2.8rem;
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
  width: 50%;
  float: left;
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
    color: #fff;
    padding: 2px 0;
    line-height: 2rem;
    background: #0a2e9a;
    border-bottom: 1px solid #1582bb;
    font-size: 1.4rem;
    text-align: center;
    font-weight: 700;
  }
  .list_content {
    text-align: center;
    line-height: 2rem;
    vertical-align: bottom;
    li {
      padding: 2px 0;
    }
  }
  .list_cell0 {
    display: inline-block;
    width: 30%;
  }
  .list_cell1 {
    width: 30%;
    display: inline-block;
  }
  .list_cell2 {
    width: 20%;
    display: inline-block;
  }
  .list_cell3 {
    width: 20%;
    display: inline-block;
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
  .panel_header {
    background: linear-gradient(
      to bottom,
      rgba(47, 155, 231, 0.15),
      rgba(47, 155, 231, 0)
    );
    margin: 0;
    padding: 10px 0 10px 0;
  }

  .time {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.2rem;
  }
}
</style>
