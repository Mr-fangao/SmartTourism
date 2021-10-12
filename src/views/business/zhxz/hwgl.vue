<template>
  <div class="lg_main">
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">垃圾分类</div>
      </div>
      <div class="flexRow">
        <div class="cardPanel">
          <div class="title">分类小区</div>
          <div class="container">
            <span>{{flxq}}</span>
          </div>
        </div>
        <div class="cardPanel">
          <div class="title">小区户数</div>
          <div class="container">
            <span>{{xqhs}}</span>
          </div>
        </div>
        <div class="cardPanel">
          <div class="title">农村资源化处理站</div>
          <div class="container">
            <span>{{nczyhclz}}</span>
          </div>
        </div>
        <div class="cardPanel">
          <div class="title">农户数</div>
          <div class="container">
            <span>{{nhs}}</span>
          </div>
        </div>
      </div>
      <div class="flexRow">
        <div class="listtab">
          <ul>
            <li
              :class="currentKey==1?'current':''"
              @click="changePic(1)"
            >
              <a>有害垃圾</a>
            </li>
            <li
              :class="currentKey==2?'current':''"
              @click="changePic(2)"
            >
              <a>可回收物</a>
            </li>
            <li
              :class="currentKey==3?'current':''"
              @click="changePic(3)"
            >
              <a>易腐垃圾</a>
            </li>
            <li
              :class="currentKey==4?'current':''"
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
              style="height:180px;width:330px;"
            ></div>
          </div>
        </div>
      </div>
      <!-- -->
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div class="panel_headerTitle">
          小区投放情况
          <span>-【帝景苑】</span>
        </div>
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
    <div class="panel pt3">
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
    <div class="map pt4">
      <iframe
        :src="this.GLOBAL.weburl_Onemap+'/map/mapcontainersbzb.html?type=hwgl&xUserName=zhzs_hhgl'"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height:100%;"
      ></iframe>
    </div>

    <div class="panel pt5">
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
    <div class="panel pt6">
      <div class="panel_header">
        <div class="panel_headerTitle">人流量排名</div>
      </div>
      <div class="panel_table">

        <div class="list_title">
          <span
            :class="'list_cell'+cellKey"
            v-for="(cell,cellKey) in dataTableRll.cells"
            :key="cellKey"
          >{{cell}}</span>
        </div>
        <div class="list_content">
          <div class="list_contentInfo">
            <ul>
              <li
                v-for="(row,rowKey) in dataTableRll.rows"
                :key="rowKey"
              >
                <span
                  :class="'list_cell'+row_cellKey"
                  v-for="(row_cell,row_cellKey) in row"
                  @click="fixPoint(row[1])"
                  :key="row_cellKey"
                >{{row_cell}}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <div class="panel pt7">
      <div class="panel_header">
        <div class="panel_headerTitle">维修案件</div>
      </div>
      <div class="panel_table">
        <div class="list_title">
          <span
            :class="'list_cell'+cellKey"
            v-for="(cell,cellKey) in dataTableWx.cells"
            :key="cellKey"
          >{{cell}}</span>
        </div>
        <vue-seamless-scroll
          :data="dataTableWx.rows"
          style="height:220px;overflow:hidden"
          :class-option="autoScrollOption"
        >
          <div class="list_content">
            <div class="list_contentInfo">
              <ul>
                <li
                  v-for="(row,rowKey) in dataTableWx.rows"
                  :key="rowKey"
                >
                  <span
                    :class="'list_cell'+row_cellKey"
                    v-for="(row_cell,row_cellKey) in row"
                    :key="row_cellKey"
                    :style="'color:'+(row_cell=='已维修'?'green':'white')"
                    @click="fixPoint(row[0])"
                  >{{row_cell}}</span>
                </li>
              </ul>
            </div>
          </div>
        </vue-seamless-scroll>
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
        singleHeight: 20,
      },
    };
  },
  methods: {
    changePic(type) {
      this.currentKey = type;
      var yhOption = echartsUtils.getEchartsConfig(
        this.data[this.currentKey].chartType.toLowerCase(),
        this.data[this.currentKey].xAxis,
        this.data[this.currentKey].data,
        this.data[this.currentKey].title,
        this.data[this.currentKey].xUnit
      );
      clearInterval(this.timer1);
      this.timer1 = null;
      if (this.chartLJ) this.chartLJ.clear();
      this.timer1 = echartsUtils.chartInit("chartYH", yhOption, "1");
    },
    fixPoint(name) {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=Query_GongCe&name=" +
        name;
      webAPI.server
        .get({
          url: url,
        })
        .then((res) => {
          $("iframe")[0].contentWindow.GeoneMap.clientShowPatrolPoints(
            res,
            true
          );
        });
    },
    getRadioColumn(xAxis, yData) {
      var option = {
        angleAxis: {
          show: false,
        },
        radiusAxis: {
          type: "category",
          data: xAxis,
          z: 0,
          axisLine: {
            //坐标 轴线
            show: false, //是否显示坐标轴轴线
            onZero: true,
          },
          axisTick: {
            //坐标轴刻度相关设置
            show: false, //是否显示坐标轴刻度。
            inside: false, //坐标轴刻度是否朝内，默认朝外。
          },
          show: false,
        },
        polar: [{}],
        series: [
          {
            type: "bar",
            data: yData,
            barWidth: "45%",
            coordinateSystem: "polar",

            label: {
              normal: {
                show: true,
              },
            },
            show: true,
            itemStyle: {
              normal: {
                // 随机显示

                // 定制显示（按顺序）
                color: function (params) {
                  var colorList = [
                    "#6497ff",
                    "#ff5310",
                    "#ffb310",
                    "#1fe07e",
                    "#fb8d43",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          formatter: "{b} : {c}",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        },
      };
      return option;
    },
  },
  components: { countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        url: this.GLOBAL.weburl_Onemap + "/handler/hwgl.ashx",
      })
      .then((res) => {
        if (res.data.length == 0) return;
        this.data = res.data;
        //垃圾分类数值
        res.data[0]["list"].forEach((item) => {
          switch (item["name"]) {
            case "分类小区":
              this.flxq = item["value"];
              break;
            case "小区户数":
              this.xqhs = item["value"];
              break;
            case "农村资源化处理站":
              this.nczyhclz = item["value"];
              break;
            case "农户数":
              this.nhs = item["value"];
              break;
            default:
              break;
          }
        });

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
        this.data[5].data2.forEach((item) => {
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
        tfData.forEach((item) => {
          this.tfDataName.push(item["name"]);
          this.tfDataValue.push(item["value"]);
        });
        var tfOption = this.getRadioColumn(this.data[5].xAxis, tfData);

        this.timer5 = echartsUtils.chartInit("chartTF", tfOption);
        //减量排名
        this.jlpm = res.data[6]["list"];
        var allJl = 0;
        this.jlpm.forEach((item) => {
          allJl = allJl + parseFloat(item["value"]);
        });
        this.jlpm.forEach((item) => {
          item["percentValue"] = (
            (parseFloat(item["value"]) * 100) /
            allJl
          ).toFixed(2);
        });
        //厕所革命
        res.data[7]["list"].forEach((item) => {
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

        //人流量排名
        this.dataTableRll.cells = this.data[8].cells;
        this.dataTableRll.rows = this.data[8].rows;
        //维修案件
        this.dataTableWx.cells = this.data[9].cells;
        this.dataTableWx.rows = this.data[9].rows;
        this.data[9].rows.forEach((row) => {
          if (row[2].length > 9) {
            row[2] = row[2].substring(0, 8) + "...";
          }
        });
        // this.timer8 = echartsUtils.chartInit("chart1", chart1_Option);
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
            url: this.GLOBAL.weburl_Onemap + "/handler/hwgl.ashx",
          })
          .then((res) => {
            aaa++;
            var tfMainData = res.data;
            var tfData = [];
            tfMainData[5].data.forEach((item) => {
              tfData.push(item);
            });
            tfData[0]["value"] = parseFloat(tfData[0]["value"]);
            tfMainData[5].data2.forEach((item) => {
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
            tfData.forEach((item) => {
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
  },
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 26% 48% 26%;
  grid-template-rows: 36% 32% 27% 5%;
  .pt1 {
    grid-row-start: 1;
    grid-row-end: 2;
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
  .pt1 {
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
      margin-top: 15px;
    }
    .listtab {
      margin-right: 35px;
      margin-top: -25px;
    }
  }
  .pt2 {
    .panel_headerTitle {
      span {
        color: #32d1ff;
      }
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
      width: 200px;
      font-size: 1.2rem;
      margin-left: 25px;
      div {
        display: inline-block;

        font-size: 14px;
        text-align: center;
        margin: 3px 0;
      }
      .stitle {
        width: 95px;
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
      .time {
        font-size: 1.2rem;
        margin-top: 10px;
      }
      .color1 {
        color: #6497ff;
      }
      .color2 {
        color: #ff5310;
      }
      .color3 {
        color: #ffb310;
      }
      .color4 {
        color: #1fe07e;
      }
    }
  }
  .pt3 {
    .panel_table {
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
        }
        li:nth-child(1) {
          .list_cell0 {
            background: linear-gradient(left, #860f0f, #b71212);
          }
        }
        li:nth-child(2) {
          // width: 90%;
          .list_cell2 .colorbox {
            width: 90%;
          }
          .list_cell0 {
            background: linear-gradient(left, #b22e00, #d34c1d);
          }
        }
        li:nth-child(3) {
          .list_cell2 .colorbox {
            width: 80%;
          }
          .list_cell0 {
            background: linear-gradient(left, #066bb2, #1379c0);
          }
        }
        li:nth-child(4) {
          .list_cell2 .colorbox {
            width: 70%;
          }
          .list_cell0 {
            background: linear-gradient(left, #056f48, #0ba66d);
          }
        }
        li:nth-child(5) {
          .list_cell2 .colorbox {
            width: 60%;
          }
          .list_cell0 {
            background: linear-gradient(left, #056f48, #0ba66d);
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
      width: 18%;
      text-align: left;
      padding-left: 5px;
    }
    .list_cell2 {
      width: 42%;
      display: inline-block;
      height: 10px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.1);
      .colorbox {
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          from(#066bb2),
          to(#0bc581)
        );
        border-radius: 5px;
        height: 10px;
      }
    }
    .list_cell3 {
      width: 18%;
      text-align: right;
    }
    .list_cell4 {
      width: 18%;
      display: inline-block;
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff000;
      //font-family: "myfont2";
    }
  }
  .pt4 {
    position: relative;
    padding-top: 35px;
    box-sizing: border-box;
  }
  .pt5 {
    background: url("~static/images/dsj/kcrcbg.png") 0 70px no-repeat;
    background-size: 100%;
    margin-top: 35px;
    .infoPanel {
      margin: 2rem 2rem 0 2rem;
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
        background: linear-gradient(
          to bottom,
          rgba(0, 137, 176, 0.85),
          rgba(0, 74, 136, 0.85)
        );
        //border: 2px dashed #32d1ff;
        //border-radius: 50%;
        //-webkit-animation: spin-a 30s infinite linear;
        > span {
          display: block;
          margin-top: 62px;
          color: #fff;
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
        margin-top: 150px;
      }
    }
    .infoPanel:nth-child(1) .container {
      background: linear-gradient(
        to bottom,
        rgba(0, 175, 115, 0.85),
        rgba(0, 102, 70, 0.85)
      );
      > span {
        //color: #6aff0d;
      }
      &:before {
        background: url("~static/images/dsj/icon-1.png") 0 0 no-repeat;
      }
    }
    .infoPanel:nth-child(1) .circle {
      //border: 2px dashed #6aff0d;
    }
    .infoPanel:nth-child(1) .title {
      color: #00af73;
    }

    .infoPanel:nth-child(2) .container {
      &:before {
        background: url("~static/images/dsj/icon-2.png") 0 0 no-repeat;
      }
    }
  }
  .pt6 {
    .panel_table {
      .list_content {
        height: 195px;
        overflow: hidden;
      }
    }
    .list_cell0 {
      width: 10%;
    }
    .list_cell1 {
      width: 30%;
    }
    .list_cell2 {
      width: 30%;
    }
    .list_cell3 {
      width: 30%;
    }
  }
  .pt7 {
    margin-top: -30px;
    .panel_table {
      .list_content {
        overflow: hidden;
      }
    }
    .list_cell0 {
      width: 26%;
    }
    .list_cell1 {
      width: 17%;
    }
    .list_cell2 {
      width: 44%;
    }
    .list_cell3 {
      width: 13%;
    }
    .list_content {
      .list_cell3 {
        color: #10d339 !important;
      }
    }
  }
}
</style>
