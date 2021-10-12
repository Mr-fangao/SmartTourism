<template>
  <div class="lg_main">
    <div
      class="changebtn animated pulse"
      @click="changeTab(0)"
      title="地图"
    ></div>
    <div
      class="changebtn1 animated pulse"
      title="经济数据统计"
      @click="changeTab(1)"
    ></div>
    <div
      class="changebtn2 animated pulse"
      title="企业"
      @click="changeTab(2)"
    ></div>
    <div
      class="changebtn3 animated pulse"
      title="能源智能运营平台"
      @click="changeTab(3)"
    ></div>
    <pop-common
      id="homepopcommon"
      v-if="gsPopInfo"
      @closepop="gsPopInfo = false"
      class="homepopcommon"
    ></pop-common>

    <div class="panel pt11" v-show="currentchange == 300">
      <div class="panel_content">
        <iframe
          :src="this.GLOBAL.weburl_jjfznypt"
          frameborder="0"
          class="iframeContainer"
        ></iframe>
      </div>
    </div>
    <div class="map mappt4" v-show="currentchange == 0">
      <iframe
        :src="
          this.GLOBAL.weburl_Onemap +
          '/map/mapcontainersbzb.html?type=jjfz&xUserName=zhzs_jjfz&right=586'
        "
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height: 100%"
        id="mapIframe"
      ></iframe>
    </div>

    <div class="panel pt1">
      <div class="panel_header">
        <div v-if="data.length > 0" class="panel_headerTitle">
          {{ data[0].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div id="chart1" style="height: 280px; width: 96%"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <!-- <div v-if="data.length > 0" class="panel_headerTitle">{{ data[10].title }}</div> -->
        <div class="panel_headerTitle">新增内资注册资本</div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div id="chartCKZE" style="height: 270px; width: 96%"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt3">
      <div class="panel_header">
        <div v-if="data.length > 0" class="panel_headerTitle">
          {{ data[1].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div id="chart2" style="height: 250px; width: 96%"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt4" v-show="currentchange == 2">
      <div class="panel_content">
        <div v-if="this.data.length > 0" class="mainTitle">
          <div class="subtitle">{{ data[2].list[0].subtitle }}</div>
          <div class="xunit">{{ data[2].list[0].xUnit }}</div>
          <div class="pt4_info">{{ data[2].list[0].title }}</div>
        </div>
        <div
          v-if="this.data.length > 0"
          style="display: flex; justify-content: space-evenly; width: 100%"
        >
          <div
            class="cardPanel"
            v-for="(item, key) in data[2].list"
            :key="key"
            style="border: none"
          >
            <div class="cardPanel-inside">
              <div
                class="title"
                :style="item.color ? 'background:' + item.color : ''"
              >
                {{ item.dataFirst }}
              </div>
              <div class="container">
                <countTo
                  :startVal="0"
                  :endVal="handlerNum(item.dataSec ? item.dataSec : '0')"
                  :duration="2000"
                  style="color: #e5ef65"
                ></countTo>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            margin-top: 30px;
            justify-content: space-between;
          "
        >
          <!-- <div class="panelDataChart" style="width: 0%">
            <div class="panelDataChart_part">
              <div id="chart3" style="height: 400px; width: 300px"></div>
            </div>
          </div> -->
          <div
            class="panel_table"
            v-if="data.length > 0"
            style="width: 96%; margin: auto"
          >
            <div
              class="list_title"
              style="display: flex; justify-content: space-around"
            >
              <span class="list_cell">{{ "指标" }}</span>
              <span
                class="list_cell"
                v-for="(cell, cellKey) in data[3].xAxis"
                :key="cellKey"
                >{{ cell }}</span
              >
            </div>
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row, rowKey) in data[3].data"
                    :key="rowKey"
                    style="display: flex; justify-content: space-around"
                  >
                    <span class="list_cell">{{ data[3].legend[rowKey] }}</span>
                    <span
                      class="list_cell"
                      v-for="(row_cell, row_cellKey) in row"
                      :key="row_cellKey"
                      >{{ row_cell }}</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt5" v-show="currentchange == 2">
      <div class="panel_header">
        <div v-if="data.length > 0" class="panel_headerTitle">
          {{ data[4].title }}
        </div>
      </div>
      <div class="panel_content" style="margin-top: -36px">
        <div class="flexRow">
          <div class="panelDataChart">
            <div class="panelDataChart_part">
              <div id="chart4" style="height: 260px; width: 100%"></div>
            </div>
          </div>
          <div class="panelDataChart" style="margin-top: 30px">
            <div class="panelDataChart_part">
              <div id="chart5" style="height: 260px; width: 100%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel pt6">
      <div class="panel_header">
        <div v-if="data.length > 0" class="panel_headerTitle">
          {{ data[6].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panel_table" v-if="data.length > 0">
          <div class="list_title">
            <span
              :class="'list_cell' + cellKey"
              v-for="(cell, cellKey) in gyjyDataTable.cells"
              :key="cellKey"
              v-if="cellKey < 3"
              >{{ cell }}</span
            >
          </div>
          <vue-seamless-scroll
            :data="gyjyDataTable.rows"
            style="height: 550px; overflow: hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div
                class="list_contentInfo"
                @click="LocationShape($event, 'dsj_location_zdxm')"
              >
                <ul class="item">
                  <li
                    v-for="(row, rowKey) in gyjyDataTable.rows"
                    :key="rowKey"
                    :accesskey="row[3]"
                    :class="{
                      current: row[3] == pt6SelectRowID ? true : false,
                    }"
                  >
                    <span
                      v-if="row_cellKey < 3"
                      :accesskey="row[3]"
                      :class="'list_cell' + row_cellKey"
                      v-for="(row_cell, row_cellKey) in row"
                      :style="
                        row_cellKey == 2
                          ? row_cell == 'A'
                            ? 'background-color:#D16914;'
                            : row_cell == 'B'
                            ? 'background-color:#ffc107;'
                            : 'color:#0cf4ec;'
                          : ''
                      "
                      :key="row_cellKey"
                      >{{ row_cell }}</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div id="chartFL" style="height: 220px; width: 450px"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt7">
      <div class="panel_header">
        <div v-if="data.length > 0" class="panel_headerTitle">
          {{ data[7].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="tab">
          <ul>
            <li
              :class="showList == 1 ? 'current' : ''"
              @click="SDQTab(1, '水')"
            >
              <span>水</span>
            </li>
            <li
              :class="showList == 2 ? 'current' : ''"
              @click="SDQTab(2, '电')"
            >
              <span>电</span>
            </li>
            <li
              :class="showList == 3 ? 'current' : ''"
              @click="SDQTab(3, '气')"
            >
              <span>气</span>
            </li>
          </ul>
        </div>

        <div
          v-show="showList == 1 || showList == 2 || showList == 3"
          class="panelDataChart"
        >
          <div class="panelDataChart_part">
            <div id="chartSDQ1" style="height: 230px; padding-top: 20px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 智慧乡镇:经济运行
import popCommon from "components/popCommon";
import echarts from "echarts";
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: { countTo, vueSeamlessScroll, popCommon },
  data() {
    return {
      gsPopInfo: false,
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 1, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20,
      },
      sczz: 0,
      czsr: 0,
      gyzcz: 0,
      selectItem: 0,
      currentchange: 0,
      GYTZlist: [],
      dataTableXS: {
        cells: [],
        rows: [],
      },
      dataTableBJ: {
        cells: [],
        rows: [],
      },
      showList: 2, // 显示列
      dataTableS: {
        cells: [],
        rows: [],
      },
      gyjyDataTable: {
        cells: [],
        rows: [],
      },
      hyList: [],
      hyNameList: [],
      hyTcIDList: [],
      hyDmList: [],
      selectHy: "",
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
      zyywhd: "",
      data: [],
      popdiv: "none",
      DOption: {},
      SOption: {},
      QOption: {},
      pt6SelectRowID: "",
      chartCYZB_Option: {},
      hasInitChart: false,
    };
  },
  watch: {
    selectHy: {
      deep: true,
      handler(val) {
        webAPI.server
          .get({
            url: this.GLOBAL.weburl_Onemap + "/handler/hgqyxs.ashx?hydl=" + val,
          })
          .then((res) => {
            if (res.data) {
              this.dataTableBJ.cells = res.data[0].cells;
              res.data[0].rows.forEach((row) => {
                if (row[1].length > 12) {
                  row[1] = row[1].substring(0, 11) + "...";
                }
              });
              this.dataTableBJ.rows = res.data[0].rows;
            }
          });
        this.hyList.forEach((element) => {
          if (element.dm == val) {
            var tcids = element.tcid.split(",");
            $("iframe")[0]
              .contentWindow.$("#layerControl .treeContainer .clearLayers")
              .click();
            tcids.forEach((item) => {
              if (item) {
                $("iframe")[0].contentWindow.GeoneMap.openLayerByName(item);
              }
            });
          }
        });
      },
    },
  },
  computed: {
    autoScrollOption() {
      return {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 13, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20,
      };
    },
  },
  methods: {
    LocationShape(e, key) {
      console.log(e, 123456789);
      this.changeTab(0);
      var id = e.target.accessKey;
      this.pt6SelectRowID = id;
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=" +
        key +
        "&id=" +
        id;
      webAPI.server
        .get({
          url: url,
        })
        .then((res) => {
          $(".map iframe")[0].contentWindow.GeoneMap.clientShowPatrolPoints(
            res,
            true
          );
          // window.showDpCommonPopup2({
          //   url:
          //     this.GLOBAL.weburl_ZDXMForm +
          //     id +
          //     "&title=" +
          //     res.data[0].name +
          //     "&layer_w=1391&layer_h=876"
          // });
        });
    },
    changeTab(index) {
      this.currentchange = index;
      //alert(this.currentchange == 2);
      if (index == 2) {
        if (!this.hasInitChart) {
          this.hasInitChart = true;
          this.$nextTick(() => {
            echartsUtils.chartInit("chart4", this.chart4Option, "1");

            this.timer5 = echartsUtils.chartInit(
              "chart5",
              this.chart5Option,
              "1"
            );
            var self = this;
            // self.timer3 = echartsUtils.chartInit(
            //   "chart3",
            //   this.chart3Option,
            //   "1"
            // );
          });
        }
      } else if (index == 1) {
        window.open(this.GLOBAL.weburl_jjfzchange, "_blank");
      }
    },
    SDQTab(showid, name) {
      this.showList = showid;
      switch (name) {
        case "电":
          this.DOption.legend = {
            orient: "horizontal",
            // left: 40,
            x: "center",
            y: "top",
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 20,
            align: "left",
            textStyle: {
              fontSize: 14,
              color: "#ffffff",
            },
          };
          this.DOption.xAxis.axisLabel.rotate = 0;
          this.DOption.xAxis.axisLabel.textStyle.fontSize = 14;
          this.DOption.yAxis.axisLabel.textStyle.fontSize = 12;
          this.timer12 = echartsUtils.chartInit("chartSDQ1", this.DOption, "1");
          break;
        case "水":
          this.SOption.legend = {
            orient: "horizontal",
            x: "center",
            y: "top",
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 20,
            align: "left",
            textStyle: {
              fontSize: 14,
              color: "#ffffff",
            },
          };

          this.SOption.xAxis.axisLabel.rotate = 0;
          this.SOption.xAxis.axisLabel.textStyle.fontSize = 14;
          this.SOption.yAxis.axisLabel.textStyle.fontSize = 12;
          echartsUtils.chartClear("chartSDQ1");
          this.timer12 = echartsUtils.chartInit("chartSDQ1", this.SOption, "1");
          break;
        case "气":
          this.QOption.legend = {
            orient: "horizontal",
            x: "right",
            y: "top",
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 20,
            align: "left",
            textStyle: {
              fontSize: 12,
              color: "#ffffff",
            },
          };
          // this.QOption.title.top = 10;
          this.QOption.yAxis.nameTextStyle.padding = [0, 0, 10, 20];
          this.QOption.grid.left = "6%";
          this.QOption.xAxis.axisLabel.rotate = 0;
          this.QOption.yAxis.nameTextStyle.fontSize = 16;
          this.QOption.xAxis.axisLabel.textStyle.fontSize = 14;
          this.QOption.yAxis.axisLabel.textStyle.fontSize = 12;
          echartsUtils.chartClear("chartSDQ1");
          console.log(this.QOption, "QOption");
          this.timer12 = echartsUtils.chartInit("chartSDQ1", this.QOption, "1");
          break;
      }
    },
    fixPoint(name) {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=Query_JJFZ_QY&id=" +
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
    chartAction(ID, chart_Option) {
      var _this = this;
      var chart = echarts.init(document.getElementById(ID));
      chart.on("click", function (param) {
        _this.selectHy = param.data.dm;
      });
      chart.setOption(chart_Option);
    },
    changeList(type) {
      var selectIndex = 0;
      for (let index = 0; index < this.hyList.length; index++) {
        const element = this.hyList[index];
        if (element.dm == this.selectHy) {
          selectIndex = index;
          break;
        }
      }
      if (type == "left" && selectIndex != 0) {
        this.selectHy = this.hyList[selectIndex - 1].dm;
      }
      if (type == "right" && selectIndex != this.hyList.length - 1) {
        this.selectHy = this.hyList[selectIndex + 1].dm;
      }
    },
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
    moveDiv(type) {
      var ele;
      ele = document.getElementById("divParent");
      if (type == "left") {
        ele.scrollLeft = 450;
      } else {
        ele.scrollLeft = 0;
      }
    },
    handlerNum(numStr) {
      return parseFloat(numStr);
    },
    getUrlA(url) {
      webAPI.server
        .get({
          url: this.GLOBAL.weburl_Onemap + "/handler/qyxx.ashx?name=" + url,
        })
        .then((res) => {
          console.log(2299);
          if (res.data.length == 0) return;
          res.data[0]["list"].forEach((item) => {
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
    },
    SelectCG(type) {
      this.selectItem = type;
      var cgOption = echartsUtils.getEchartsConfig(
        this.data[type].chartType.toLowerCase(),
        this.data[type].xAxis,
        this.data[type].data,
        this.data[type].title,
        this.data[type].xUnit
      );
      clearInterval(this.timer1);
      this.timer1 = null;
      this.timer1 = echartsUtils.chartInit("chartCG", cgOption);
    },
    //工业总产值及其他点击切换
    // SelectChangeLine(index) {
    //   console.log(this.data[3], 99999);

    //   var chart3_Option = echartsUtils.getEchartsConfig_EX(
    //     index > 0 ? this.data[3].chartType.toLowerCase() : "column",
    //     this.data[3].xAxis,
    //     [this.data[3].data[index]],
    //     this.data[3].title,
    //     this.data[3].xUnit,
    //     [this.data[3].legend[index]]
    //   );
    //   chart3_Option.legend.data = [chart3_Option.series[0].name];
    //   chart3_Option.legend.icon = "rect";
    //   chart3_Option.yAxis.type = "value";
    //   this.chart3Option = JSON.parse(JSON.stringify(chart3_Option));
    //   if (index > 0) {
    //     // this.chart3Option.xAxis.boundaryGap = false;
    //     // this.chart3Option.xAxis.data.unshift(0);
    //     // this.chart3Option.series[0].data.unshift(0);
    //     this.chart3Option.grid.right = "10%";
    //   }
    //   console.log(this.chart3Option, 9888);
    //   this.timer3 = echartsUtils.chartInit("chart3", this.chart3Option, "1");
    // },
    SetChartsCYZB(pars) {
      console.log(pars);
      if (pars.name != "" && pars.name != undefined) {
        var currentIndex = pars.dataIndex;
        // 产业占比
        var dataZB = [];
        for (let index = 0; index < this.data[4].data.length; index++) {
          const element = this.data[4].data[index];
          dataZB.push({
            name: this.data[4].legend[index],
            value: element[currentIndex],
          });
        }
        console.log(this.chartCYZB_Option, 888);
        this.chartCYZB_Option.series[0].data = dataZB;
        this.chartCYZB_Option.title.text = pars.name + "年各产业占比";
        echartsUtils.chartClear("chart5");
        this.timer5 = echartsUtils.chartInit(
          "chart5",
          this.chartCYZB_Option,
          "1"
        );
      }
    },
    init() {
      webAPI.server
        .get({
          // url: "static/json/zhxz/yjson/jjfz.json",
          url: this.GLOBAL.weburl_Onemap + "/handler/dsj/jjfz.ashx",
        })
        .then((res) => {
          if (res.data) {
            if (res.data.length == 0) return;
            this.data = res.data;
            // 企业数量
            var chart1_Option = echartsUtils.getEchartsConfig(
              this.data[0].chartType.toLowerCase(),
              this.data[0].xAxis,
              this.data[0].data,
              this.data[0].title,
              this.data[0].xUnit
            );
            chart1_Option.xAxis.axisLabel.rotate = 0;
            this.timer1 = echartsUtils.chartInit("chart1", chart1_Option, "1");

            // 工业投资
            var chart2_Option = echartsUtils.getEchartsConfig_EX(
              this.data[1].chartType.toLowerCase(),
              this.data[1].xAxis,
              this.data[1].data,
              this.data[1].title,
              this.data[1].xUnit,
              this.data[1].legend
            );
            // chart2_Option.legend.orient = "horizontal";
            chart2_Option.legend = {
              orient: "horizontal",
              right: 10,
              itemHeight: 12,
              itemWidth: 12,
              itemGap: 20,
              align: "left",
              textStyle: {
                fontSize: 12,
                color: "#ffffff",
              },
            };

            chart2_Option.series.forEach((el) => {
              el.barWidth = 12;
              // el.itemStyle.normal.color = ['#0161eb','#01eb54']
            });
            chart2_Option.xAxis.axisLabel.rotate = 0;
            chart2_Option.color = ["#0161eb", "#01eb54"];
            this.timer2 = echartsUtils.chartInit("chart2", chart2_Option, "1");

            // 经济指标-折线
            console.log(this.data[3].data, 9999);
            // this.SelectChangeLine(0);

            // 产业结构 柱
            // var data = [
            //   ["8000", "12000", "32000", "33000", "34000"],
            //   ["20000", "10000", "22000", "22000", "30000"],
            //   ["12000", "22000", "32000", "33000", "23000", "30000"],
            // ];
            var chart4_Option = echartsUtils.getEchartsConfig(
              this.data[4].chartType.toLowerCase(),
              this.data[4].xAxis,
              this.data[4].data,
              // data,
              [],
              // this.data[4].title,
              // this.data[4].xUnit,
              "单位：万元",
              "",
              this.data[4].legend
            );
            chart4_Option.legend = null;

            console.log(this.data, "55555555");
            chart4_Option.color = ["#0161eb", "#07caa8", "#00bbfa"];
            // chart4_Option.title.text = "规上工业营业收入";
            chart4_Option.title = {
              text: "规上工业营业收入",
              textStyle: {
                color: "#0aecfa",
                fontSize: 18,
              },
              left: "5%",
              top: "0%",
            };
            // chart4_Option.grid.left = "6%";
            chart4_Option.grid.top = "30%";
            chart4_Option.xAxis.axisLabel.rotate = 0;
            this.chart4Option = chart4_Option;
            //this.timer4 = echartsUtils.chartInit("chart4", chart4_Option, "1");

            let yAxis = [
              {
                // 纵轴标尺固定
                type: "value",
                scale: true,
              },
            ];

            var chart5Data = this.data[5].data,
              data5 = [];
            chart5Data.forEach((el) => {
              data5.push(el.value);
            });
            this.chartCYZB_Option = echartsUtils.getEchartsConfig_EX(
              // this.data[5].chartType.toLowerCase(),
              "line",
              this.data[5].xAxis,
              // this.data[5].data,
              data5,
              // this.data[5].title,
              "",
              // this.data[5].xUnit,
              "单位：万元",
              []
            );
            this.chartCYZB_Option.title = {
              text: "规上工业利润总额",
              textStyle: {
                color: "#0aecfa",
                fontSize: 18,
              },
              left: "5%",
              top: "0%",
            };
            this.chartCYZB_Option.grid.top = "30%";
            this.chartCYZB_Option.xAxis.axisLabel.rotate = 0;
            this.chartCYZB_Option.series[0].data = data5;
            // console.log(this.data, '6666666666666')
            this.chart5Option = this.chartCYZB_Option;
            // this.timer5 = echartsUtils.chartInit(
            //   "chart5",
            //   this.chartCYZB_Option,
            //   "1"
            // );
            // 工业集约利用评级
            this.gyjyDataTable.cells = this.data[6].cells;
            this.gyjyDataTable.rows = this.data[6].rows;
            // 电用量
            this.DOption = echartsUtils.getEchartsConfig_EX_WT(
              this.data[7].chartType.toLowerCase(),
              this.data[7].xAxis,
              this.data[7].data,
              this.data[7].title,
              this.data[7].xUnit,
              this.data[7].legend,
              "",
              1
            );
            this.DOption.legend.left = "60";
            // 气
            this.QOption = echartsUtils.getEchartsConfig_EX_WT(
              this.data[8].chartType.toLowerCase(),
              this.data[8].xAxis,
              this.data[8].data,
              this.data[8].title,
              this.data[8].xUnit,
              this.data[8].legend,
              "",
              1
            );
            this.QOption.legend.left = "60";

            this.timer1 = echartsUtils.chartInit("chart1", chart1_Option, "1");
            // 水
            this.SOption = echartsUtils.getEchartsConfig_EX_WT(
              this.data[9].chartType.toLowerCase(),
              this.data[9].xAxis,
              this.data[9].data,
              this.data[9].title,
              this.data[9].xUnit,
              this.data[9].legend,
              "",
              1
            );
            this.SOption.legend.left = "60";
            // /
            //
            //
            // 出口总额-折线
            var chartCKZE_Option = echartsUtils.getEchartsConfig_EX(
              this.data[10].chartType.toLowerCase(),
              this.data[10].xAxis,
              this.data[10].data,
              // [900, 800, 1200, 1100, 1200],
              this.data[10].title,
              this.data[10].xUnit,
              this.data[10].legend
            );
            chartCKZE_Option.xAxis.axisLabel.rotate = 0;
            chartCKZE_Option.xAxis.axisLabel.fontSize = 14;
            // console.log(this.data[10], "5555555555");
            chartCKZE_Option.series[0].data = this.data[10].data;
            this.timerCKZE = echartsUtils.chartInit(
              "chartCKZE",
              chartCKZE_Option,
              "1"
            );
            // this.dataTableS.cells = this.data[11].cells;
            // this.dataTableS.rows = this.data[11].rows;
            this.SDQTab(2, "电");
          }
        });
    },
  },

  mounted() {
    var _this = this;
    // 将backToday方法绑定到window下面，提供给外部调用
    window["renderByMapI"] = (url) => {
      this.getUrlA(url);
    };
    this.init();
  },
  destroyed() {
    clearInterval(this.timeALL);
    clearInterval(this.timeTf);
  },
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 25% auto 25%;
  grid-template-rows: 34% 34% 32%;
  .panel {
    // outline: 1px dashed #ff1493;
  }
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
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .mappt4 {
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 4;
  }
  .pt5 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt11 {
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt12 {
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt6 {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
  }
  .pt7 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 4;
  }
}
.changebtn {
  width: 60px;
  height: 60px;
  right: 71.5%;
  position: absolute;
  background: url("~static/images/jjfz/地图.png") 0 0 no-repeat;
  background-size: 100% 100%;
  top: 140px;
  z-index: 9999;
  cursor: pointer;
}
.changebtn1 {
  width: 60px;
  height: 60px;
  right: 71.5%;
  position: absolute;
  background: url("~static/images/jjfz/经济.png") 0 0 no-repeat;
  background-size: 100% 100%;
  top: 205px;
  z-index: 9999;
  cursor: pointer;
}
.changebtn2 {
  width: 60px;
  height: 60px;
  right: 71.5%;
  position: absolute;
  background: url("~static/images/jjfz/企业.png") 0 0 no-repeat;
  background-size: 100% 100%;
  top: 275px;
  z-index: 9999;
  cursor: pointer;
}
.changebtn3 {
  width: 60px;
  height: 60px;
  right: 71.5%;
  position: absolute;
  background: url("~static/images/jjfz/能源智能运营平台.png") 0 0 no-repeat;
  background-size: 100% 100%;
  top: 350px;
  z-index: 9999;
  cursor: pointer;
}

.lg_main {
  .iframeContainer {
    position: absolute;
    width: 94%;
    height: 98%;
    overflow: hidden;
    width: 98%;
  }
  .pt1 {
  }
  .pt11 {
    margin-left: 11px;
  }
  .pt2 {
    .cardPanel2 {
      background: url("~static/images/dsj/jjyx.png") 0 0 no-repeat;
      background-size: 100%;
      height: 150px;
      width: 50%;
      //height: 175px;
      margin: 20px 0 0 0;
      .title {
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-weight: bold;
      }
      .container {
        font-weight: normal;
        padding: 5px 15px 5px 40px;
        height: auto;
        text-align: left;
        > div {
          margin: 10px 0;
        }
        span {
          color: #fff000 !important;
          font-size: 2.2rem;
          margin-right: 3px;
          font-family: myfont;
        }
      }
    }
  }
  .pt3 {
  }
  .pt4 {
    position: relative;
    // margin: 20px 300px 0;
    padding-left: 20px;
    .mainTitle {
      background: url("~static/images/dsj/headerTitlelog.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      // margin-bottom: 8.7rem;
      padding-top: 1rem;
    }
    .subtitle {
      position: absolute;
      float: left;
      top: 76px;
      left: 90px;
      font-size: 1.8rem;
      color: #0aecfa;
      font-weight: bold;
    }
    .flexRow {
      justify-content: space-between;
    }
    .pt4_info {
      text-align: center;
      font-size: 1.8rem;
      margin-top: -5px;
      //width: 770px;
      padding-bottom: 10px;
      letter-spacing: 2px;
      font-weight: bold;
      p {
        font-size: 14px;
        line-height: 60px;
        padding-bottom: 50px;
      }
    }
    .cardPanel:before,
    .cardPanel:after {
      border: none;
    }
    .cardPanel {
      width: 16%;
      margin: 50px 0px 0 0;
      border-radius: 20px;
      // padding: 6px;
      background-image: url("~static/images/dsj/bg2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .cardPanel-inside {
        // box-shadow: 0px 0px 8px 3px #2177e1 inset;
        border-radius: 20px;
      }
      .title {
        text-align: center;
        // padding: 15px 0 0 0;
        background: none !important;
        color: #fff;
        height: auto;
        line-height: 50px;
        font-size: 1.2rem;
        padding-top: 10px;
      }
      .container {
        height: 40px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        span {
          color: #3081ff;
          font-weight: bold;
          /* line-height: 74px; */
          font-size: 1.8rem;
          font-family: microsoft yahei;
          letter-spacing: 0;
        }
      }
      &:nth-child(1) {
        .container {
          span {
            //color: #14b0ff !important;
          }
        }
      }
      &:nth-child(2) {
        .container {
          span {
            //color: #f27a4b !important;
          }
        }
      }
      &:nth-child(3) {
        .container {
          span {
            //color: #44dc5d !important;
          }
        }
      }
      &:nth-child(4) {
        .container {
          span {
            //color: #fe51aa !important;
          }
        }
      }
    }
    .xunit {
      margin-top: 60px;
      margin-right: 10px;
      float: right;
      //margin-left: 1100px;
      font-size: 1rem;
    }
    .pt4-news {
      cursor: pointer;
      // position: absolute;

      margin-left: 410px;
      width: 830px;
      height: 30px;
      line-height: 30px;
      /*background-color: #ff98003d;*/
      margin-top: -40px;
    }
    .stitle {
      width: 1180px;
      float: right;
      color: #f53110;
      font-weight: bold;
      font-size: 20px;
    }
    .panelDataChart {
      padding: 0px 0 20px 0;
    }
    .panel_table {
      .list_content {
        margin: 0px 0px 0px 0px;
        overflow: auto;
        text-align: center;
        ul {
          //font-size: 18px;
          line-height: 40px;
          li {
            padding: 0;
            height: 70px;
            line-height: 70px;
            font-size: 2rem;
          }
        }
      }
      .list_title {
        //font-size: 23px;
        font-weight: 600;
        text-align: center;
        position: relative;
        background: none;
        height: 70px;
        border: none;
        z-index: 1;
        &:before {
          content: "";
          display: block;
          height: 2px;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 17px;
          border-bottom: 1px solid #12304a;
          z-index: 1;
        }
        span {
          vertical-align: bottom;
          display: inline-block;
          width: 30%;
          vertical-align: middle;
          //background: #0b3b9e;
          position: relative;
          z-index: 2;
          height: 70px;
          line-height: 70px;
          font-size: 2rem;
          color: #0cf4ec;
          &:before {
            content: "";
            display: block;
            height: 14px;
            width: 14px;
            border-radius: 50%;
            position: absolute;
            background: #34d2fa;
            border: 2px solid #0b3b9e;
            bottom: -1px;
            left: 60px;
            z-index: 2;
            box-sizing: border-box;
          }
        }
        span:first-child {
          &:after {
            content: "";
            display: block;
            height: 12px;
            width: 12px;
            border-radius: 6px;
            position: absolute;
            background: #02143a;
            border: 2px solid #0b3b9e;
            bottom: -11px;
            left: -27px;
            z-index: 1;
            box-sizing: border-box;
          }
        }
        span:last-child {
          &:after {
            content: "";
            display: block;
            height: 12px;
            width: 12px;
            border-radius: 6px;
            position: absolute;
            background: #02143a;
            border: 2px solid #0b3b9e;
            bottom: -11px;
            right: -27px;
            z-index: 1;
            box-sizing: border-box;
          }
        }
      }

      .list_cell {
        padding: 10px 0;
        width: 30%;
        height: 70px;
        line-height: 70px;
        font-size: 1.8rem;
      }
    }
  }
  .pt5 {
    // margin: 0 300px;
    .flexRow {
      display: flex;
      justify-content: space-between;
    }
    .panel_header {
      background: url("~static/images/dsj/headerTitlelog.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 100%;
      text-align: center;
    }
    .panelDataChart {
      margin: 10px 10px;
      width: 50%;
      span {
        // color: #2bc6f4;
        font-size: 1.4rem;
        text-align: center;
        display: block;
        font-weight: bold;
      }
      .panelDataChart_part {
        width: 100%;
      }
    }
  }
  .pt6 {
    .list_cell0 {
      width: 10%;
      font-size: 1.6rem;
    }
    .list_cell1 {
      width: 70%;
      font-size: 1.6rem;
    }
    .list_cell2 {
      width: 20%;
      font-size: 1.6rem;
    }
    ul {
      li {
        span {
          line-height: 2rem;
        }
      }
      .current {
        background: #325b98;
      }
    }
  }
  .pt7 {
    .panel_header {
    }
    //margin-top: 30px;
    .panel_table {
      .list_content {
        overflow: hidden;
      }
      .list_cell0 {
        width: 40%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell1 {
        width: 20%;
      }
      .list_cell2 {
        width: 20%;
      }
      .list_cell3 {
        width: 20%;
      }
    }
    li {
      height: 30px;
      width: 30px;
      line-height: 30px;
    }
    .tab {
      position: absolute;
      right: 7px;
      text-align: center;
      /* margin-bottom: 10px; */
      z-index: 1000;
      margin-top: -20px;
    }
  }
}
</style>
