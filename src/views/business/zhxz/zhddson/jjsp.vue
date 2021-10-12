<template>
  <div>
    <div class="part part1">
      <div class="maintitle">
        <span>经济</span>
      </div>
      <div class="bg">
        <div class="panel pt1">
          <div class="panel_header">
            <div class="panel_headerTitle">重点企业累计销售同比（万元）</div>
          </div>
          <div class="tab">
            <ul>
              <li
                :class="jdType=='left'?'current':''"
                @click="jdType='left'"
              >
                <span>增幅前十名</span>
              </li>
              <li
                :class="jdType=='right'?'current':''"
                @click="jdType='right'"
              >
                <span>降幅前十名</span>
              </li>
            </ul>
          </div>
          <div
            id="divParent"
            style="overflow:hidden; width: 390px;"
          >
            <div
              id="insideDiv"
              style="width:780px"
            >
              <div style="width:390px;float:left;">
                <div class="panelDataChart">
                  <div class="panelDataChart_part">
                    <div
                      id="chartJDE"
                      style=" height:430px;width:390px; margin-top:-60px"
                    ></div>
                  </div>
                </div>
              </div>
              <div style="width:390px;float:left;">
                <div class="panelDataChart">
                  <div class="panelDataChart_part">
                    <div
                      id="chartJDE2"
                      style=" height:430px;width:390px; margin-top:-60px"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="part part2">
      <div class="maintitle">
        <span>审批</span>
      </div>
      <div class="bg">
        <div
          id="chartSP"
          style=" height:320px;width:390px;"
        ></div>
      </div>
    </div>

    <div
      id="divDialog"
      class="popdiv"
      :style="'display:'+popdiv"
    >
      <div class="popbg">
        <div class="corner"></div>
        <div
          class="close"
          @click="CloseDialog()"
        ></div>
        <div class="title">企业信息</div>
        <div class="container">
          <ul>
            <li>
              <span class="cell1">单位详细名称</span>
              <span class="cell2">{{dwxxmc}}</span>
            </li>
            <li>
              <span class="cell1">单位所在地地址</span>
              <span class="cell2">{{dwszddz}}</span>
            </li>
            <li>
              <span class="cell1">统一社会信用代码</span>
              <span class="cell2">{{tyzhxydm}}</span>
            </li>
            <li>
              <span class="cell1">组织机构代码</span>
              <span class="cell2">{{zzjgdm}}</span>
            </li>
            <li>
              <span class="cell1">行业大类</span>
              <span class="cell2">{{hydl}}</span>
            </li>
            <li>
              <span class="cell1">登记注册类型</span>
              <span class="cell2">{{djzclx}}</span>
            </li>
            <li>
              <span class="cell1">法定代表人</span>
              <span class="cell2">{{fddbr}}</span>
            </li>
            <li>
              <span class="cell1">成立时间</span>
              <span class="cell2">{{clsj}}</span>
            </li>
            <li>
              <span class="cell1">固定电话</span>
              <span class="cell2">{{gddh}}</span>
            </li>
            <li>
              <span class="cell1">移动电话</span>
              <span class="cell2">{{yddh}}</span>
            </li>
            <li>
              <span class="cell1">主要业务活动</span>
              <span class="cell2">{{zyywhd}}</span>
            </li>
          </ul>
        </div>
        <div class="subtitle">企业发展情况</div>
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartQK"
              style=" height:250px;width:480px;"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";

import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      jdType: "left",
      popdiv: "none",
      dwxxmc: "",
      dwszddz: "",
      tyzhxydm: "",
      zzjgdm: "",
      hydl: "",
      djzclx: "",
      fddbr: "",
      clsj: "",
      gddh: "",
      yddh: "",
      zyywhd: ""
    };
  },
  watch: {
    jdType(val) {
      var ele;
      ele = document.getElementById("divParent");
      if (val == "right") {
        ele.scrollLeft = 450;
      } else {
        ele.scrollLeft = 0;
      }
    }
  },
  methods: {
    CloseDialog() {
      this.popdiv = "none";
      this.dwmc = "";
      this.dwlx = "";
      this.zzjgdm = "";
      this.zcdz = "";
      this.szd = "";
      this.fddbr = "";
      this.gddh = "";
      this.kysj = "";
      this.hydm = "";
      this.zyywhd = "";
      this.cyrys = "";
      clearInterval(this.timer9);
      this.timer9 = null;
    },
    chartAction(ID, chart_Option) {
      var _this = this;
      var chart = echarts.init(document.getElementById(ID));
      chart.on("click", function(param) {
        _this.fixPoint(param.name);
      });
      chart.setOption(chart_Option);
    },
    fixPoint(name) {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=Query_JJFZ_QY2&name=" +
        name;
      webAPI.server
        .get({
          url: url
        })
        .then(res => {
          $("iframe")[0].contentWindow.GeoneMap.clientShowPatrolPoints(
            res,
            true
          );
        });
    },

    getUrlA(url) {
      webAPI.server
        .get({
          url: this.GLOBAL.weburl_Onemap + "/handler/qyxx.ashx?name=" + url
        })
        .then(res => {
          if (res.data.length == 0) return;
          res.data[0]["list"].forEach(item => {
            switch (item["name"]) {
              case "单位详细名称":
                this.dwxxmc = item["value"];
                break;
              case "单位所在地地址":
                this.dwszddz = item["value"];
                break;
              case "统一社会信用代码":
                this.tyzhxydm = item["value"];
                break;
              case "组织机构代码":
                this.zzjgdm = item["value"];
                break;
              case "行业大类":
                this.hydl = item["value"];
                break;
              case "登记注册类型":
                this.djzclx = item["value"];
                break;
              case "法定代表人":
                this.fddbr = item["value"];
                break;
              case "成立时间":
                this.clsj = item["value"];
                break;
              case "固定电话":
                this.gddh = item["value"];
                break;
              case "移动电话":
                this.yddh = item["value"];
                break;
              case "主要业务活动":
                this.zyywhd = item["value"];
                break;
              default:
                break;
            }
          });

          var qkOption = echartsUtils.getEchartsConfig(
            res.data[1].chartType.toLowerCase(),
            res.data[1].xAxis,
            res.data[1].data,
            res.data[1].title,
            res.data[1].xUnit
          );
          this.timer9 = echartsUtils.chartInit("chartQK", qkOption, "1");
          this.popdiv = "block";
        });
    }
  },
  components: {  countTo, vueSeamlessScroll },
  mounted() {
    // 将backToday方法绑定到window下面，提供给外部调用
    window["renderByMapI"] = url => {
      this.getUrlA(url);
    };
    webAPI.server
      .get({
        //  url: "../static/json/jjfz.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/jjfz.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        var jdeOption = echartsUtils.getEchartsConfig_EX2(
          this.data[11].chartType.toLowerCase(),
          this.data[11].xAxis,
          this.data[11].data,
          this.data[11].title,
          "",
          [this.data[11].legend[0]]
        );
        jdeOption.series[0].itemStyle.normal.color = "#f57300";
        var leftLabel = {
          normal: { position: "right", show: true }
        };
        jdeOption.series[0].label = leftLabel;
        jdeOption.series[0].barWidth = "40%";
        jdeOption.grid.right = "12%";
        jdeOption.xAxis.splitLine = { show: false };
        jdeOption.xAxis.splitNumber = 2;
        this.timer11 = this.chartAction("chartJDE", jdeOption, "1");
        var jde2Option = echartsUtils.getEchartsConfig_EX2(
          this.data[12].chartType.toLowerCase(),
          this.data[12].xAxis,
          this.data[12].data,
          this.data[12].title,
          "",
          [this.data[12].legend[0]],
          null,
          "right"
        );
        var rightLabel = {
          normal: { position: "left", show: true }
        };
        jde2Option.series[0].label = rightLabel;
        jde2Option.grid.left = "12%";
        jde2Option.series[0].barWidth = "40%";
        jde2Option.series[0].itemStyle.normal.color = "#00ebe8";
        jde2Option.xAxis.splitLine = { show: false };
        jde2Option.xAxis.splitNumber = 2;
        this.timer12 = this.chartAction("chartJDE2", jde2Option, "1");

        var spOption = echartsUtils.getEchartsConfig(
          this.data[15].chartType.toLowerCase(),
          this.data[15].xAxis,
          this.data[15].data,
          this.data[15].title,
          this.data[15].xUnit
        );
        spOption.series[0].barWidth = "40%";
        this.timer16 = echartsUtils.chartInit("chartSP", spOption, "1");
      });
  }
};
</script>
<style lang="less" scoped>
.part {
  width: 436px;
  margin-top: 5px;
  .maintitle {
    background: url("~static/images4800/titlebg.png") 0 0 no-repeat;
    height: 36px;
    text-align: center;
    line-height: 34px;
    span {
      font-weight: bold;
      font-size: 2rem;
      color: #ffcc00;
      letter-spacing: 5px;
    }
  }
  .pager {
    text-align: center;
    img {
      margin: 0 5px;
      cursor: pointer;
    }
  }
  .bg {
    border-left: 1px solid #1b3d9e;
    border-right: 1px solid #1b3d9e;
    border-bottom: 1px solid #1b3d9e;
    padding: 2rem 1rem;
  }
}
.part2 {
  margin-top: 20px;
}
.pt1 {
  height: 400px;
  .panelDataChart {
    width: 60%;
  }
  .tab {
    text-align: center;
    margin-bottom: 10px;
    li {
      display: inline-block;
      background: rgba(21, 111, 187, 0.3);
      border-radius: 2px;
      height: 25px;
      line-height: 25px;
      padding: 0 10px;
      margin: 0 3px;
      cursor: pointer;
      position: relative;
      :before {
        content: "";
        display: block;
        position: absolute;
        width: 9px;
        height: 11px;
      }
      &:nth-child(1) {
        padding-left: 25px;
        :before {
          background: url("~static/images4800/icon-18.png") 0 0 no-repeat;
          left: 10px;
          top: 8px;
        }
      }
      &:nth-child(2) {
        padding-right: 25px;
        :before {
          background: url("~static/images4800/icon-19.png") 0 0 no-repeat;
          right: 10px;
          top: 8px;
        }
      }
    }
    li.current {
      background: rgba(21, 111, 187, 1);
    }
  }
  .leftdiv {
    width: 40%;
    .cardPanel {
      //width: 0px;
      padding-left: 0;
      height: 45px;
      margin: 1rem 1rem 1rem 0;
      text-align: center;
      //height: 150px;
      .title {
        display: inline-block;
        float: left;
        font-size: 1.2rem;
        padding-left: 10px;
      }
      .container {
        //display: inline-block;
        height: 45px;
        line-height: 45px;
        span {
          font-size: 2rem;
        }
      }
    }
  }
}
.pt2 {
  margin-top: 20px;
  .panelDataChart {
    margin: 10px 10px;
    span {
      // color: #2bc6f4;
      font-size: 1.4rem;
      text-align: center;
      display: block;
      font-weight: bold;
    }
  }
}
.popdiv {
  width: 490px;
  height: 895px;
  position: absolute;
  left: 283%;
  top: 30px;
  z-index: 99999999;
  border: 1px solid #1d5287;
  border-top-color: #3fabed;
  background: #06245f url("~static/images/dsj/popbg.png") center bottom
    no-repeat;
  background-size: cover;
  .title {
    background: url("~static/images/dsj/poptitlebg.png") center 0px no-repeat;
    height: 55px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    box-sizing: border-box;
    padding-top: 6px;
  }
  .subtitle {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    padding: 5px 0;
    margin-top: 0px;
  }
  .container {
    padding: 15px;
    li {
      font-size: 1.4rem;
      margin: 8px 0;
    }
    .cell1 {
      font-weight: bold;
      display: inline-block;
      background: rgba(255, 255, 255, 0.08);
      width: 100px;
      text-align: center;
      padding: 5px;
      border-radius: 2px;
    }
    .cell2 {
      display: inline-block;
      width: 300px;
      margin-left: 15px;
    }
  }
}
.popbg {
  position: relative;
  width: 490px;
  height: 895px;
  .close {
    background: url("~static/images/dsj/close2.png") 0 0px no-repeat;
    width: 14px;
    height: 14px;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
  &:before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    border-left: 4px solid #3fabed;
    border-top: 4px solid #3fabed;
    position: absolute;
    left: -2px;
    top: -2px;
  }
  &:after {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    border-right: 4px solid #3fabed;
    border-top: 4px solid #3fabed;
    position: absolute;
    right: -2px;
    top: -2px;
  }
  .corner {
    &:before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      border-left: 4px solid #3fabed;
      border-bottom: 4px solid #3fabed;
      position: absolute;
      left: -2px;
      bottom: -2px;
    }
    &:after {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      border-right: 4px solid #3fabed;
      border-bottom: 4px solid #3fabed;
      position: absolute;
      right: -2px;
      bottom: -2px;
    }
  }
}
</style>
