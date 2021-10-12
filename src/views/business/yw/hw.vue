<template>
  <div class="chartbg">
    <div class="div1 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">垃圾分类</div>
      </div>
      <div class="flexRow">
        <div class="listtab">
          <ul>
            <li
              :class="currentKey==1?'current selectCurrent':'current'"
              @click="changePic(1)"
            >
              <a>有害垃圾</a>
            </li>
            <li
              :class="currentKey==2?'current selectCurrent':'current'"
              @click="changePic(2)"
            >
              <a>可回收物</a>
            </li>
            <li
              :class="currentKey==3?'current selectCurrent':'current'"
              @click="changePic(3)"
            >
              <a>易腐垃圾</a>
            </li>
            <li
              :class="currentKey==4?'current selectCurrent':'current'"
              @click="changePic(4)"
            >
              <a>其他垃圾</a>
            </li>
          </ul>
        </div>
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartYH"
              style="height:300px;"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="div2 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">厕所革命</div>
      </div>
      <div
        class="flexRow"
        v-if="this.data.length>0"
      >
        <div class="infoPanel">
          <div class="circle"></div>
          <div class="container">
            <span>{{kfcs}}</span>
          </div>
          <div class="title">开放中</div>
        </div>
        <div class="infoPanel">
          <div class="circle"></div>
          <div class="container">
            <span>{{zjcs}}</span>
          </div>
          <div class="title">在建</div>
        </div>
      </div>
    </div>
    <div class="div3 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">小区投放情况</div>
      </div>
      <div class="flexRow">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartTF"
              style="height:200px;width:200px;"
            ></div>
          </div>
        </div>
        <div class="listtab">
          <div class="stitle">{{tfDataName[0]}}：</div>
          <div class="num color1">{{tfDataValue[0]}}</div>
          <div class="stitle">{{tfDataName[1]}}：</div>
          <div class="num color2">{{tfDataValue[1]}}</div>
          <div class="stitle">{{tfDataName[2]}}：</div>
          <div class="num color3">{{tfDataValue[2]}}</div>
          <div class="stitle">{{tfDataName[3]}}：</div>
          <div class="num color4">{{tfDataValue[3]}}</div>
          <div class="time">更新时间：{{gxsj}}</div>
        </div>
      </div>
    </div>
    <div class="div4 chart">
      <div class="panel_header">
        <div class="panel_headerTitle">小区垃圾减量排名</div>
      </div>
      <div
        class="panel_table"
        v-if="data.length>0"
      >
        <div class="list_content">
          <div class="list_contentInfo">
            <ul>
              <li data-v-48f11b3f>
                <span
                  data-v-48f11b3f
                  class="list_cell0"
                >TOP1</span>
                <span
                  data-v-48f11b3f
                  class="list_cell1"
                >{{jlpm[0]["name"]}}</span>
                <span
                  data-v-48f11b3f
                  class="list_cell2"
                >
                  <div class="colorbox"></div>
                </span>
                <!-- <span data-v-48f11b3f class="list_cell3">减量{{jlpm[0]["value"]}}吨</span> -->
                <span
                  data-v-48f11b3f
                  class="list_cell4"
                >{{jlpm[0]["percentValue"]}}%</span>
              </li>
              <li data-v-48f11b3f>
                <span
                  data-v-48f11b3f
                  class="list_cell0"
                >TOP2</span>
                <span
                  data-v-48f11b3f
                  class="list_cell1"
                >{{jlpm[1]["name"]}}</span>
                <span
                  data-v-48f11b3f
                  class="list_cell2"
                >
                  <div class="colorbox"></div>
                </span>
                <!-- <span data-v-48f11b3f class="list_cell3">减量{{jlpm[1]["value"]}}吨</span> -->
                <span
                  data-v-48f11b3f
                  class="list_cell4"
                >{{jlpm[1]["percentValue"]}}%</span>
              </li>
              <li data-v-48f11b3f>
                <span
                  data-v-48f11b3f
                  class="list_cell0"
                >TOP3</span>
                <span
                  data-v-48f11b3f
                  class="list_cell1"
                >{{jlpm[2]["name"]}}</span>
                <span
                  data-v-48f11b3f
                  class="list_cell2"
                >
                  <div class="colorbox"></div>
                </span>
                <!-- <span data-v-48f11b3f class="list_cell3">减量{{jlpm[2]["value"]}}吨</span> -->
                <span
                  data-v-48f11b3f
                  class="list_cell4"
                >{{jlpm[2]["percentValue"]}}%</span>
              </li>
              <li data-v-48f11b3f>
                <span
                  data-v-48f11b3f
                  class="list_cell0"
                >TOP4</span>
                <span
                  data-v-48f11b3f
                  class="list_cell1"
                >{{jlpm[3]["name"]}}</span>
                <span
                  data-v-48f11b3f
                  class="list_cell2"
                >
                  <div class="colorbox"></div>
                </span>
                <!-- <span data-v-48f11b3f class="list_cell3">减量{{jlpm[3]["value"]}}吨</span> -->
                <span
                  data-v-48f11b3f
                  class="list_cell4"
                >{{jlpm[3]["percentValue"]}}%</span>
              </li>
              <li data-v-48f11b3f>
                <span
                  data-v-48f11b3f
                  class="list_cell0"
                >TOP5</span>
                <span
                  data-v-48f11b3f
                  class="list_cell1"
                >{{jlpm[4]["name"]}}</span>
                <span
                  data-v-48f11b3f
                  class="list_cell2"
                >
                  <div class="colorbox"></div>
                </span>
                <!-- <span data-v-48f11b3f class="list_cell3">减量{{jlpm[4]["value"]}}吨</span> -->
                <span
                  data-v-48f11b3f
                  class="list_cell4"
                >{{jlpm[4]["percentValue"]}}%</span>
              </li>
            </ul>
          </div>
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
      currentKey: 1,
      flxq: 0,
      xqhs: 0,
      nczyhclz: 0,
      nhs: 0,
      kfcs: 0,
      zjcs: 0,
      jrtf: 0,
      gxsj: "",
      dataTableWx: {},
      dataTableRll: {},
      jlpm: [],
      tfDataName: [],
      tfDataValue: [],
      data: [],

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
  methods: {
    getRadioColumn(xAxis, yData) {
      var option = {
        angleAxis: {
          show: false
        },
        radiusAxis: {
          type: "category",
          data: xAxis,
          z: 0,
          axisLine: {
            //坐标 轴线
            show: false, //是否显示坐标轴轴线
            onZero: true
          },
          axisTick: {
            //坐标轴刻度相关设置
            show: false, //是否显示坐标轴刻度。
            inside: false //坐标轴刻度是否朝内，默认朝外。
          },
          show: false
        },
        polar: [{}],
        series: [
          {
            type: "bar",
            data: yData,
            barWidth: "50%",
            coordinateSystem: "polar",

            label: {
              normal: {
                show: true
              }
            },
            show: true,
            itemStyle: {
              normal: {
                // 随机显示

                // 定制显示（按顺序）
                color: function(params) {
                  var colorList = [
                    "#d3611c",
                    "#408f99",
                    "#70bc99",
                    "#cc4e4a",
                    "#d48265"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ],
        tooltip: {
          trigger: "axis",
          formatter: "{b} : {c}",
          axisPointer: {
            type: "shadow"
          },
          textStyle: {
            fontSize: 12,
            fontWeight: "bold"
          }
        }
      };
      return option;
    }
  },
  components: { countTo, vueSeamlessScroll, swiper, swiperSlide },
  mounted() {
    webAPI.server
      .get({
        url: this.GLOBAL.weburl_Onemap + "/handler/hwgl.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        //垃圾分类柱状图
        var yhOption = echartsUtils.getEchartsConfig(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit
        );

        this.timer2 = echartsUtils.chartInit("chartYH", yhOption, "1");

        //小区投放情况
        var tfData = this.data[5].data;
        //单独获取更新时间
        this.data[5].data2.forEach(item => {
          if (item["name"] == "更新时间") {
            this.gxsj = item["value"];
          }
        });
        for (var i = 0; i < tfData.length - 1; i++) {
          for (var j = 0; j < tfData.length - i - 1; j++) {
            if (
              parseFloat(tfData[j]["value"]) >
              parseFloat(tfData[j + 1]["value"])
            ) {
              // 相邻元素两两对比
              var hand = tfData[j];
              tfData[j] = tfData[j + 1];
              tfData[j + 1] = hand;
            }
          }
        }
        //获取各数值展示
        tfData.forEach(item => {
          this.tfDataName.push(item["name"]);
          this.tfDataValue.push(item["value"]);
        });
        var tfOption = this.getRadioColumn(this.data[5].xAxis, tfData);

        this.timer5 = echartsUtils.chartInit("chartTF", tfOption);
        //减量排名
        this.jlpm = res.data[6]["list"];
        var allJl = 0;
        this.jlpm.forEach(item => {
          allJl = allJl + parseFloat(item["value"]);
        });

        this.jlpm.forEach(item => {
          item["percentValue"] = (
            (parseFloat(item["value"]) * 100) /
            allJl
          ).toFixed(2);
        });
        //厕所革命
        res.data[7]["list"].forEach(item => {
          switch (item["name"]) {
            case "开放中":
              this.kfcs = item["value"];
              break;
            case "在建":
              this.zjcs = item["value"];
              break;
            default:
              break;
          }
        });
      });

    var _this = this;
    var bbb = 0;
    this.timeALL = setInterval(() => {
      if (_this.currentKey > 3) {
        _this.currentKey = 1;
      } else {
        _this.currentKey++;
      }
      var yhOption = echartsUtils.getEchartsConfig(
        _this.data[_this.currentKey].chartType.toLowerCase(),
        _this.data[_this.currentKey].xAxis,
        _this.data[_this.currentKey].data,
        _this.data[_this.currentKey].title,
        _this.data[_this.currentKey].xUnit
      );
      bbb++;
      clearInterval(_this.timer1);
      _this.timer1 = null;
      if (_this.chartLJ) _this.chartLJ.clear();

      _this.timer1 = echartsUtils.chartInit("chartYH", yhOption, "1");
      // _this.chartLJ = echarts.init(document.getElementById("chartYH"));
      // _this.chartLJ.setOption(yhOption);
      // _this.timer1 = _this.autoDispatchAction(
      //   _this.chartLJ,
      //   yhOption.series[0].data.length
      // );
      ///每5分钟更新一次小区投放情况
      if (bbb % 30 == 0) {
        webAPI.server
          .get({
            url: this.GLOBAL.weburl_Onemap + "/handler/hwgl.ashx"
          })
          .then(res => {
            aaa++;
            var tfMainData = res.data;
            var tfData = [];
            tfMainData[5].data.forEach(item => {
              tfData.push(item);
            });
            tfData[0]["value"] = parseFloat(tfData[0]["value"]);
            tfMainData[5].data2.forEach(item => {
              if (item["name"] == "更新时间") {
                _this.gxsj = item["value"];
              }
            });
            for (var i = 0; i < tfData.length - 1; i++) {
              for (var j = 0; j < tfData.length - i - 1; j++) {
                if (
                  parseFloat(tfData[j]["value"]) >
                  parseFloat(tfData[j + 1]["value"])
                ) {
                  // 相邻元素两两对比
                  var hand = tfData[j];
                  tfData[j] = tfData[j + 1];
                  tfData[j + 1] = hand;
                }
              }
            }
            _this.tfData = [];
            tfData.forEach(item => {
              _this.tfData.push(item["name"] + ":" + item["value"]);
            });
            var tfOption = this.getRadioColumn(_this.data[5].xAxis, tfData);
            _this.timer5 = echartsUtils.chartInit("chartTF", tfOption, "1");
            // if (_this.chartTF) _this.chartLJ.clear();
            // _this.chartTF = echarts.init(document.getElementById("chartTF"));
            // var tfOption = _this.getRadioColumn(tfMainData[5].xAxis, tfData);
            // _this.chartTF.setOption(tfOption);
          });
      }
    }, 10000);
  },
  destroyed() {
    clearInterval(this.timeALL);
    clearInterval(this.timeTf);
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
      // text-align: center;
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
  height: 280px;
  .cardPanel {
    margin-top: 10px;
    width: 8rem;
    .container {
      > span {
        font-size: 2.4rem;
      }
    }
  }
  .cardPanel:nth-child(3) {
    .title {
      line-height: 1.6rem;
    }
  }
  .panelDataChart {
    float: left;
    width: 70%;
  }
  .listtab {
    width: 100px;
    margin-right: 35px;
    margin-top: 50px;
    float: left;
    li {
      font-size: 14px;
    }
    li.current {
      background: #007293;
      opacity: 0.6;
    }
    li.selectCurrent {
      background: #007293;
      opacity: 1;
      &:before {
        position: absolute;
        right: -10px;
        top: 7px;
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-left: 10px solid #007293;
        border-bottom: 5px solid transparent;
        a {
          color: #fff;
        }
      }
    }
  }
}
.div3 {
  height: 280px;
  .panel_headerTitle {
    span {
      color: #32d1ff;
    }
  }
  .panelDataChart {
    float: left;
    margin-top: 20px;
  }
  .cardPanel {
    margin-top: 20px;
    margin-left: 20px;
    border: none;
    background: transparent url("~static/images/dsj/icon-6.png") 0 0 no-repeat;
    padding-left: 70px;
    .container {
      padding: 0.3rem 0;
      text-align: left;
    }
    .container {
      > span {
        font-size: 2.8rem;
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
      height: 1.4rem;
      line-height: 1.4rem;
      padding: 5px 0 0 0;
      text-align: left;
    }
  }
  .listtab {
    float: left;
    width: 200px;
    font-size: 1.2rem;
    margin-left: 25px;
    margin-top: 50px;
    div {
      display: inline-block;

      font-size: 14px;
      text-align: center;
      margin: 3px 0;
    }
    .stitle {
      width: 95px;
      text-align: right;
      font-weight: bold;
    }
    .num {
      width: 70px;
      //margin-left: 10px;
      //border: 1px solid hsla(0, 0%, 100%, 0.1);
      // background: hsla(0, 0%, 100%, 0.02);
      font-size: 16px;
      font-weight: bold;
      padding: 3px 5px;
      color: #fff;
    }
    .time {
      font-size: 1.2rem;
      margin-top: 10px;
    }
    .color1 {
      background: #d3611c;
    }
    .color2 {
      background: #408f99;
    }
    .color3 {
      background: #70bc99;
    }
    .color4 {
      background: #cc4e4a;
    }
  }
}
.div4 {
  height: 280px;
  .panel_table {
    margin-top: 20px;
    .list_content {
      overflow: hidden;
      //padding-left: 20px;
      li {
        //background: linear-gradient(left, #024487, #0d7750);
        background: none;
        position: relative;
        height: 24px;
        margin: 13px 0;
        box-sizing: border-box;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        &:hover {
          background: none !important;
        }
        * {
          vertical-align: middle;
        }
        .list_cell0 {
          color: #fff;
          padding: 1px 3px;
        }
      }
      li:nth-child(1) {
        .list_cell0 {
          background: #ce0b0b;
        }
      }
      li:nth-child(2) {
        // width: 90%;
        .list_cell2 .colorbox {
          width: 90%;
        }
        .list_cell0 {
          background: #d34c1d;
        }
      }
      li:nth-child(3) {
        .list_cell2 .colorbox {
          width: 80%;
        }
        .list_cell0 {
          background: #1379c0;
        }
      }
      li:nth-child(4) {
        .list_cell2 .colorbox {
          width: 70%;
        }
        .list_cell0 {
          background: #0ba66d;
        }
      }
      li:nth-child(5) {
        .list_cell2 .colorbox {
          width: 60%;
        }
        .list_cell0 {
          background: #59a527;
        }
      }
    }
  }
  .list_cell0 {
    width: 40px;
    height: 16px;
    border-radius: 4px;
    line-height: 16px;
    //color: #ee1d1d;
    font-weight: bold;
    font-size: 1.2rem;
    background: #e12929;
  }
  .list_cell1 {
    width: 100px;
    display: inline-block;
    text-align: left;
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  .list_cell2 {
    width: 250px;
    display: inline-block;
    height: 14px;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.1);
    .colorbox {
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#00a291),
        to(#35af2f)
      );
      height: 14px;
      border-radius: 7px;
    }
  }
  .list_cell3 {
    width: 100px;
    text-align: right;
  }
  .list_cell4 {
    width: 18%;
    display: inline-block;
    font-size: 16px;
    text-indent: 20px;
    font-weight: bold;
    color: #070606;
    //font-family: "myfont2";
  }
}
.div2 {
  height: 280px;
  background-size: 100%;
  .infoPanel {
    text-align: center;
    float: left;
    margin: 40px 60px 0 0;
    width: 145px;
    position: relative;
    .circle {
      position: absolute;
      width: 145px;
      height: 145px;
      box-sizing: border-box;
      left: 0;
      top: 0;
      //border: 1px dashed #32d1ff;
      border: 1px dashed rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 18px inset rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      -webkit-animation: spin-a 20s infinite linear;
    }
    .container {
      width: 112px;
      height: 112px;
      border-radius: 60px;
      margin: 16px 0 0 16px;
      //margin: 0 auto;
      position: absolute;
      top: 0;
      left: 0;
      background: #2179bd;
      //border: 2px dashed #32d1ff;
      //border-radius: 50%;
      //-webkit-animation: spin-a 30s infinite linear;
      > span {
        display: block;
        margin-top: 62px;
        color: #fff;
        font-size: 24px;
      }
      &:before {
        width: 43px;
        height: 43px;
        content: "";
        display: block;
        position: absolute;
        left: 35px;
        top: 17px;
      }
    }
    .title {
      margin-top: 170px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .infoPanel:nth-child(1) .container {
    background: #259f77;
    > span {
      //color: #6aff0d;
    }
    &:before {
      background: url("~static/images/dsj/icon-1.png") 0 0 no-repeat;
    }
  }
  .infoPanel:nth-child(1) .circle {
    border: 1px dashed #259f77;
  }
  .infoPanel:nth-child(2) .circle {
    border: 1px dashed #2179bd;
  }
  .infoPanel:nth-child(1) .title {
    color: #259f77;
  }

  .infoPanel:nth-child(2) .title {
    color: #2179bd;
  }
  .infoPanel:nth-child(2) .container {
    &:before {
      background: url("~static/images/dsj/icon-2.png") 0 0 no-repeat;
    }
  }
}
</style>
