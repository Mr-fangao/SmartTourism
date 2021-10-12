<template>
  <div class="lg_main">
    <div class="pt1">
      <div class="tabs" style="display: none">
        <ul>
          <li
            v-for="(item, index) in tabList"
            :class="selectTab == item['tabName'] ? 'current' : ''"
            @click="changeTab(item['tabName'], 0)"
            :key="'selectTab' + index"
          >
            <span>{{ item["tabName"] }}</span>
          </li>

          <div style="margin-top: 30px"></div>
          <li
            v-for="(item, index) in tabListRight"
            :class="selectTabRight == item['tabName'] ? 'current2' : ''"
            @click="changeTab(item['tabName'], 1)"
            :key="'selectTabRight' + index"
          >
            <span>{{ item["tabName"] }}</span>
          </li>
        </ul>
      </div>
      <div class="frame">
        <jbqk v-if="selectTab == '基本情况'"></jbqk>
        <hjjc v-if="selectTab == '环境监测'" :updatetime="updatetime"></hjjc>
        <jjfz v-if="selectTab == '经济发展'"></jjfz>

        <tab331 v-if="selectTab == '安全生产'"></tab331>
        <slfx v-if="selectTab == '水利水务'"></slfx>
        <zhxf v-if="selectTab == '智慧信访'"></zhxf>

        <zdxm v-if="selectTab == '重点项目'"></zdxm>
        <rckc v-if="selectTab == '科创项目'"></rckc>
        <gtjs v-if="selectTab == '国土'"></gtjs>
        <ajsp v-if="selectTab == '安监视频'"></ajsp>
      </div>
    </div>



    <div class="map pt4">
      <div class="textBox">
        <div class="item-box">
          <div>
            <img
              @mouseover="mouseOver('网格员')"
              @mouseout="mouseLeave('网格员')"
              style="width: 20px; margin: 5px"
              src="static/images/dsj/网格员.png"
            />
            <img
              :src="
                'static/images/dsj/' + (wgyNumber ? '选择.png' : '未选择.png')
              "
              @click="wgyNumber = !wgyNumber"
            />
          </div>
          <div v-if="wgyMouseHover" class="item-box-tip">
            <div class="arrow"></div>
            <div class="imag-tip">网格员</div>
          </div>
        </div>
        <div class="item-box">
          <div>
            <img
              @mouseover.stop="mouseOver('执法人员')"
              @mouseout.stop="mouseLeave('执法人员')"
              style="width: 20px; margin: 5px"
              src="static/images/dsj/执法.png"
            />
            <img
              :src="
                'static/images/dsj/' + (zfNumber ? '选择.png' : '未选择.png')
              "
              @click="zfNumber = !zfNumber"
            />
          </div>
          <div v-if="zfMouseHover" class="item-box-tip">
            <div class="arrow"></div>
            <div class="imag-tip">执法人员</div>
          </div>
        </div>
        <div class="item-box">
          <div>
            <img
              @mouseover="mouseOver('其他人员')"
              @mouseout="mouseLeave('其他人员')"
              style="width: 20px; margin: 5px"
              src="static/images/dsj/其他.png"
            />
            <img
              :src="
                'static/images/dsj/' + (gzNumber ? '选择.png' : '未选择.png')
              "
              @click="gzNumber = !gzNumber"
            />
          </div>
          <div v-if="qtMouseHover" class="item-box-tip">
            <div class="arrow"></div>
            <div class="imag-tip">其他人员</div>
          </div>
        </div>
      </div>

      <iframe
        :src="
          this.GLOBAL.weburl_Onemap +
          '/map/mapcontainersbzb.html?type=zhdd&xUserName=zhzs_zhdd'
        "
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height: 100%"
      ></iframe>
    </div>

    <div class="panel pt5">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[0].title }}
        </div>
        <panel-change-tab-new
          class="pt5changetab"
          :changeType="pt5changetab"
          :data="['空气监测', '水质监测']"
          changekey="pt5changetab"
          @ChangeTab="ChangeTabData"
        ></panel-change-tab-new>
      </div>
      <div class="panel_content" v-show="pt5changetab == 0" v-if="kqzlDataList!=''">
        <div class="flexRow">
          <div class="leftdiv">
            <div class="cardPanel1">
              <div
                class="container"
                v-if="data.length > 0 && index == 0"
                v-for="(item, index) in kqzlDataList.list"
                :key="index"
              >
                <span>{{ item.value }}</span>
                {{ item.level }}
              </div>
            </div>
          </div>
          <div class="rightdiv">
            <div
              class="cardPanel1"
              v-if="data.length > 0 && index > 0"
              v-for="(item, index) in kqzlDataList.list"
              :style="'border:1px solid ' + getClassColor(item.level)"
              :key="index"
            >
              <div class="title">
                {{ item.name }}
              </div>
              <div
                :title="item.level"
                class="container"
                :style="'background:' + transparent"
              >
                <span>{{ item.value }}</span>
                {{ item.xUnit }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in kqzlDataList.list"
          v-if="data.length > 0 && index > 0"
          class="dsj-panel-flex-row"
          :key="index"
        >
          <div class="titleLeft">{{ item.name }}</div>
          <div
            :id="'chart' + item.name"
            :style="'height:' + handlerEchartHeight() + 'px;width:90%;'"
          ></div>
        </div>
      </div>

      <div class="panel_content" v-if="pt5changetab == 1">
        <div class="panel_table">
          <div class="list_title">
            <span
              :class="'list_cell' + cellKey"
              v-for="(cell, cellKey) in dataTableSZ.cells"
              :key="cellKey"
              >{{ cell }}</span
            >
          </div>
          <vue-seamless-scroll
            :data="dataTableSZ.rows"
            style="
              height: 262px;
              overflow: hidden;
              position: relative;
              top: -19px;
            "
            :class-option="optionSingleHeightTime"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li v-for="(row, rowKey) in dataTableSZ.rows" :key="rowKey">
                    <span
                      :class="
                        'list_cell' +
                        row_cellKey +
                        getStyle(rowKey, row_cellKey)
                      "
                      v-for="(row_cell, row_cellKey) in row"
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
            <div id="chartSZ" style="height: 250px; width: 430px"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt6">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="dsjdata.length > 0">
          {{ dsjdata[0].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panel_table">
          <div class="list_title">
            <span
              :class="'list_cell' + cellKey"
              v-for="(cell, cellKey) in dataTableZZ.cells"
              :key="cellKey"
              >{{ cell }}</span
            >
          </div>
          <vue-seamless-scroll
            :data="dataTableZZ.rows"
            style="
              height: 252px;
              overflow: hidden;
              position: relative;
              top: -18px;
            "
            :class-option="optionSingleHeightTime"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li v-for="(row, rowKey) in dataTableZZ.rows" :key="rowKey">
                    <span
                      :class="'list_cell' + row_cellKey"
                      v-for="(row_cell, row_cellKey) in row"
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
            <div id="chartSZ" style="height: 250px; width: 430px"></div>
          </div>
        </div>
      </div>
    </div>



    
    <div class="panel pt7">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="dsjdata.length > 0">
          {{ dsjdata[1].title }}
        </div>
        <panel-change-tab-new
          class="pt7changetab"
          :changeType="pt7changetab"
          :data="['近期信访趋势', '信访来源统计']"
          changekey="pt7changetab"
          @ChangeTab="ChangeTabData"
        ></panel-change-tab-new>
      </div>

      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chart1"
              style="
                position: absolute;
                left: -46px;
                top: 110px;
                width: 524px;
                height: 239px;
              "
            ></div>
          </div>
        </div>
        <template v-if="dsjdata.length > 0">
          <div class="sum" v-for="(item, index) in dsjdata[3].list">
            <span>{{ item.name }}：</span>
            <span style="color: #fff000">{{ item.value }}</span>
            <span>{{ item.xunit }}</span>
          </div>
        </template>
      </div>
    </div>





    <div
      id="divDialog"
      class="popdiv"
      v-if="dialogVisible != 0 && selectTab != '安全生产'"
    >
      <div class="popbg">
        <div class="corner"></div>
        <div class="close" @click="dialogVisible = 0"></div>
        <img
          style="margin-top: 40px"
          :src="
            'static/images/dsj/' +
            (dialogVisible == 1
              ? '事件处置流程.png'
              : dialogVisible == 2
              ? '应急指挥流程.png'
              : '指挥调度流程.png')
          "
        />
      </div>
    </div>
  </div>
</template>
<script>
// 智慧乡镇:指挥调度
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";

import vueSeamlessScroll from "vue-seamless-scroll";
import ajsp from "views/business/zhxz/zhddson/ajsp";

import jbqk from "views/business/zhxz/zhddson/jbqk";
import slfx from "views/business/zhxz/zhddson/slfx";
import jjfz from "views/business/zhxz/zhddson/jjfz";
import zhxf from "views/business/zhxz/zhddson/zhxf";
import hjjc from "views/business/zhxz/zhddson/hjjc";
import jjsp from "views/business/zhxz/zhddson/jjsp";
import zdxm from "views/business/zhxz/zhddson/zdxm";
import rckc from "views/business/zhxz/zhddson/rckc";
import gtjs from "views/business/zhxz/zhddson/gtjs";
import tab331 from "views/business/zhxz/zhddson/tab331";
import layerControls from "@/components/layerControls";

export default {
  data() {
    return {
      pt5changetab: 0,
      pt7changetab: 0,
      kqzlDataList: [],
      dataTableSZ: {
        cells: [],
        rows: [],
      },
      dataTableZZ: {
        cells: [],
        rows: [],
      },
      gdfxtitle: "",
      bndgdzs: 0,
      showList: 1,
      dialogVisible: 0,
      dialogVisible2: 0,
      wgyNumber: false,
      zfNumber: false,
      gzNumber: false,
      wgyMouseHover: false,
      zfMouseHover: false,
      qtMouseHover: false,
      wgy: 0,
      ejwg: 0,
      sjwg: 0,
      jrgdl1: 0,
      jrgdl2: 0,
      jrgdl3: 0,
      zxxcy1: 0,
      zxxcy2: 0,
      gdzl: 0,
      dataTableLB: {
        cells: [],
        rows: [],
      },
      dataTableDB: {
        cells: [],
        rows: [],
      },
      data: [],
      dsjdata: [],
      videosp_data: [],
      selectTab: "",
      tabList: [
        { tabName: "基本情况" },
        { tabName: "经济发展" },
        { tabName: "环境监测" },
      ],
      selectTabRight: "",
      tabListRight: [
        { tabName: "安全生产" },
        { tabName: "水利水务" },
        { tabName: "智慧信访" },
      ],
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20,
      },
    };
  },
  watch: {
    selectTab: {
      handler(newValue, oldValue) {
        if (newValue != "安全生产" && oldValue == "安全生产") {
          // this.getInitDate();
        }
      },
      deep: true,
    },
    wgyNumber(val) {
      $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
      if (val) {
        this.getOnline("网格员");
        var _this = this;
        this.timerWG = setInterval(function () {
          $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
          _this.getOnline("网格员");
        }, 30000);
      } else {
        clearInterval(this.timerWG);
      }
      if (this.zfNumber) {
        this.getOnline("执法人员");
      }
      if (this.gzNumber) {
        this.getOnline("工作人员");
      }
    },
    zfNumber(val) {
      $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
      if (val) {
        this.getOnline("执法人员");
        var _this = this;
        this.timerZF = setInterval(function () {
          $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
          _this.getOnline("执法人员");
        }, 30000);
      } else {
        clearInterval(this.timerZF);
      }
      if (this.wgyNumber) {
        this.getOnline("网格员");
      }
      if (this.gzNumber) {
        this.getOnline("工作人员");
      }
    },
    gzNumber(val) {
      $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
      if (val) {
        this.getOnline("工作人员");
        var _this = this;
        this.timerGZ = setInterval(function () {
          $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
          _this.getOnline("工作人员");
        }, 30000);
      } else {
        clearInterval(this.timerGZ);
      }
      if (this.wgyNumber) {
        this.getOnline("网格员");
      }
      if (this.zfNumber) {
        this.getOnline("执法人员");
      }
    },
    pt7changetab(val) {
      this.GetEChartZHXF();
    },
  },
  computed: {
    optionSingleHeightTime() {
      return {
        singleHeight: 60,
        waitTime: 5000,
      };
    },
  },
  methods: {
    ChangeTabData(key, item, index) {
      console.log(key, item); //切换按钮
      this[key] = index;
    },
    GetData() {
      // var url = "static/json/zhxz/yjson/zhdd_fq.json";

      var url =
        this.GLOBAL.weburl_Onemap_GXQ + "/handler/dsj/dsjHandlerPra.ashx?type=zhdd_fq&DBTag=ZHXZ_GXQ";

      webAPI.server
        .get({
          url: url,
        })
        .then((res) => {
          if(res.status==0) return;
          if (res.data.length == 0) return;
          console.log(res.data, 789654321);
          this.data = res.data;
          //空气监测
          this.kqzlDataList = this.data[0];
          this.handlerEcharts();
          //水质监测
          this.dataTableSZ.cells = this.data[1].cells;
          this.dataTableSZ.rows = this.data[1].rows;
          //水利水务
          // this.dataTableZZ.cells = this.data[2].cells;
          // this.dataTableZZ.rows = this.data[2].rows;
          //智慧信访
          //this.GetEChartZHXF();
        });
    },
    GetHandlerData() {
      // var url = "static/json/zhxz/yjson/zhdd_right.json";
      var url =
        this.GLOBAL.weburl_Onemap +
        "/handler/dsj/dsjHandlerPra.ashx?type=zhdd_right&DBTag=" +
        this.GLOBAL.Appid;
      webAPI.server
        .get({
          url: url,
        })
        .then((res) => {
          if (res.data.length == 0) return;
          this.dsjdata = res.data;
          //水利水务
          this.dataTableZZ.cells = this.dsjdata[0].cells;
          this.dataTableZZ.rows = this.dsjdata[0].rows;
          //智慧信访
          this.GetEChartZHXF();
        });
    },
    //智慧信访
    GetEChartZHXF() {
      // 信访趋势
      if (this.dsjdata.length == 0) return;
      echartsUtils.chartClear("chart1");
      if (this.pt7changetab == 0) {
        var chart1_Option = echartsUtils.getEchartsConfig_EX(
          this.dsjdata[1].chartType.toLowerCase(),
          this.dsjdata[1].xAxis,
          [this.dsjdata[1].data],
          this.dsjdata[1].title,
          this.dsjdata[1].xUnit,
          this.dsjdata[1].legend
        );
        chart1_Option.series[0].symbolSize = 5;
        chart1_Option.legend.show = false;
        this.timer8 = echartsUtils.chartInit("chart1", chart1_Option, "1");
      }
      if (this.pt7changetab == 1) {
        //信访来源统计
        var chart2Option = echartsUtils.getEchartsConfig(
          this.dsjdata[2].chartType.toLowerCase() == "pie"
            ? "pie2"
            : this.dsjdata[2].chartType.toLowerCase(),
          this.dsjdata[2].xAxis,
          this.dsjdata[2].data,
          this.dsjdata[2].title,
          this.dsjdata[2].xUnit
        );
        chart2Option.series[0].label.formatter = this.CountFormatter;
        this.timer1 = echartsUtils.chartInit("chart1", chart2Option, "1");
      }
    },
    handlerEchartHeight() {
      var count = this.kqzlDataList.list.length - 1;
      return parseInt(220 / count);
    },
    handlerEcharts() {
      var _this = this;
      var kqzlData = _this.kqzlDataList.list;
      var idDom = document.getElementById("chart" + "PM2.5");
      if (idDom == null) {
        setTimeout(() => {
          _this.handlerEcharts();
        }, 500);
      } else {
        var count = kqzlData.length;
        console.log(kqzlData, 123);
        for (let index = 0; index < kqzlData.length; index++) {
          const element1 = kqzlData[index];
          this.data.forEach((element) => {
            console.log("空气质量");
            if (
              element.subtitle != undefined &&
              element.subtitle == "空气质量" + element1.name
            ) {
              var chartOption = echartsUtils.getEchartsConfig_NoAxis(
                element.chartType.toLowerCase(),
                element.xAxis,
                element.data,
                element.title,
                element.xUnit
              );
              chartOption.xAxis.show = true;
              chartOption.xAxis.axisLabel.interval = 4;
              if (index == count - 1) {
                chartOption.xAxis.axisLabel.rotate = "0";
                chartOption.grid.bottom = "20%";
              }
              this.time1 = echartsUtils.chartInit(
                "chart" + element1.name,
                chartOption,
                "1"
              );
              console.log(chartOption, 123);
            }
          });
        }
      }
    },
    getKnownColor(type){
      switch (type) {
        case"0":
          return"#ffc000";
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
    getClassColor(type) {
      switch (type) {
        case"0":
          return"#ffc000";
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
    getStyle(rowKey, row_cellKey) {
      if (row_cellKey == 2 || row_cellKey == 3) {
        if (this.dataTableSZ.rows[rowKey][row_cellKey + 2] == "上升") {
          return " Red";
        } else if (this.dataTableSZ.rows[rowKey][row_cellKey + 2] == "下降") {
          return " Green";
        }
      }
      return "";
    },
    CountFormatter(e) {
      console.log(e, 789);
      var newStr = " ";
      //var percent = e.percent;
      var value = e.value;
      var start, end;
      var name_len = e.name.length; //每个内容名称的长度
      var max_name = 15; //每行最多显示的字数
      var new_row = Math.ceil(name_len / max_name); // 最多能显示几行，向上取整比如2.1就是3行
      if (name_len > max_name) {
        //如果长度大于每行最多显示的字数
        for (var i = 0; i < new_row; i++) {
          //循环次数就是行数
          var old = ""; //每次截取的字符
          start = i * max_name; //截取的起点
          end = start + max_name; //截取的终点
          if (i == new_row - 1) {
            //最后一行就不换行了
            old = e.name.substring(start);
          } else {
            old = e.name.substring(start, end) + "\n";
          }
          newStr += old; //拼接字符串
        }
      } else {
        //如果小于每行最多显示的字数就返回原来的字符串
        newStr = e.name;
      }
      return newStr + " " + "(" + value.toString() + ")";
    },
    initUpdate() {
      webAPI.server
        .get({
          url:
            this.GLOBAL.weburl_update + "&type=zhdd&appid=" + this.GLOBAL.Appid,
        })
        .then((res) => {
          if (res.data) {
            this.updatetime = res.data[0].time;
            this.updatetime1 = res.data[0].time;
          }
        });
    },
    mouseOver(name) {
      // 鼠标移出
      switch (name) {
        case "网格员":
          this.wgyMouseHover = true;
          break;
        case "执法人员":
          this.zfMouseHover = true;
          break;
        case "其他人员":
          this.qtMouseHover = true;
          break;
        case "市政车辆":
          this.hwcMouseHover = true;
          break;
      }
    },
    mouseLeave(name) {
      console.log(name, "鼠标移除sdhshdjsdhn");
      switch (name) {
        case "网格员":
          this.wgyMouseHover = false;
          break;
        case "执法人员":
          this.zfMouseHover = false;
          break;
        case "其他人员":
          this.qtMouseHover = false;
          break;
        case "市政车辆":
          this.hwcMouseHover = false;
          break;
      }
    },
    parentClick(e) {
      console.log(e, "123sdsldsljljl;898989");
      if (e.target.tagName == "IMG") {
        // 判断事件源是否是IMG标签
        window.open(
          this.GLOBAL.weburl_Onemap +
            "/Web/Flow/LcTabReadOnlyDB.aspx?BH=" +
            e.target.dataset.id +
            "&xenable=false",
          "newwindow",
          "height=580, width=1020,screenX=400px,screenY=100px"
        );
      }
    },
    getOnline(name) {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=LocationPerson&Duty=" +
        name;
      webAPI.server
        .get({
          url: url,
        })
        .then((res) => {
          $("iframe")[0].contentWindow.GeoneMap.tc_locationPerson(res.data);
        });
    },
    changeTab(name, type) {
      switch (type) {
        case 0:
          this.selectTab = name;
          break;
        case 1:
          this.selectTabRight = name;
          break;
      }
    },
  },
  components: {
    countTo,
    vueSeamlessScroll,
    slfx,
    hjjc,
    jjsp,
    zdxm,
    rckc,
    gtjs,
    tab331,
    jbqk,
    jjfz,
    zhxf,
    ajsp,
    layerControls,
  },
  mounted() {
    this.initUpdate(); //获取更新时间
    this.GetData(); //初始化右侧数据
    this.GetHandlerData(); //正式
    this.changeTab(this.tabList[0].tabName, 0);
    this.changeTab(this.tabListRight[0].tabName, 1);
    var _this = this;
    this.timerMap = setInterval(function () {
      if ($("iframe")[0].contentWindow.GeoneMap) {
        clearInterval(_this.timerMap);
        // _this.wgyNumber = true;
        // _this.zfNumber = true;
        // _this.gzNumber = true;
      }
    }, 3000);
  },
  destroyed() {
    clearInterval(this.timerMap);
    clearInterval(this.timerWG);
    clearInterval(this.timerZF);
    clearInterval(this.timerGZ);
  },
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 25% auto 25%;
  grid-template-rows: 33% 33% 33%;
  .panel {
    // outline: 1px dashed #ff1493;
  }
  .pt1 {
    grid-row-start: 1;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt2 {
    grid-row-start: 1;
    grid-row-end: 5;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt3 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt4 {
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 4;
  }
  .pt5 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    grid-column-end: 4;
    margin-right: 10px;
  }
  .pt6 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
    right: 15px;
  }
  .pt7 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 4;
    right: 15px;
  }
}
@keyframes mymove {
  0% {
    left: -38px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
.lg_main {
  .pt1 {
    background: url("~static/images/dsj/pt1bg.png") 0 center no-repeat;
    background-position-y: -100px;
    position: relative;
    .parttitle {
      position: absolute;
      width: 491px;
      left: -30px;
      top: -30px;
      text-align: center;
      font-size: 1.8rem;
      font-weight: bold;
      background: url("~static/images/dsj/zhddtitlebg.png") 0 center no-repeat;
      color: #36daff;
    }
    .card-item{
      // transform: scale(1,1);
    }
    .frame {
      padding-left: 25px;
    }
    .tabs {
      animation: mymove 0.1s 1;
      position: absolute;
      left: 0;
      top: 0px;
      z-index: 99;
      width: 38px;
      li span {
        writing-mode: vertical-lr;
        display: inline-block;
        padding-left: 7px;
        padding-top: 20px;
        height: 120px;
        font-size: 1.5rem;
        //font-weight: bold;
        z-index: 99;
        letter-spacing: 2px;
      }
      li {
        position: relative;
        display: block;
        color: #21c0f4;

        &:before {
          content: "";
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100px;
          transition: all 0.5s;
          background: #03192d;
          transform: skewY(20deg);
          z-index: -1;
        }
        height: 100px;
        margin-top: 3px;
        cursor: pointer;
        &:hover {
          color: #fff;
          &:before {
            //border-color:  #1754a9;
            background: #08335a;
            box-shadow: none;
          }
        }
        &:first-child {
          &:before {
          }
        }
      }
      li.current {
        //font-weight: bold;
        color: #fff;
        &:before {
          //border-color:  #1754a9;
          background: #c15900;
          box-shadow: none;
        }
      }
      li.current2 {
        //font-weight: bold;
        color: #fff;
        &:before {
          //border-color:  #1754a9;
          background: #008050;
          box-shadow: none;
        }
      }
    }
  }
  .pt2 {
  }
  .pt3 {
    
  }
  .pt4 {
    position: relative;
    box-sizing: border-box;
    .textBox {
      zoom: 1.5;
      text-align: center;
      height: 25px;
      position: absolute;
      z-index: 9999;
      left: 19%;
      top: 11%;
    }
    // .textBox {
    //   text-align: center;
    //   height: 25px;
    //   //width: 60px;
    //   z-index: 99999;
    //   position: absolute;
    //   left: 29%;
    //   top: 150px;
    // }
    .item-box-tip {
      display: flex;
    }
    .imag-tip {
      height: 25px;
      margin: 1px;
      line-height: 25px;
      text-align: center;
      animation: fade-in; /*动画名称*/
      animation-duration: 0.8s; /*动画持续时间*/
      -webkit-animation: fade-in 0.8s; /*针对webkit内核*/
    }
    .arrow {
      margin-top: 10px;
      width: 0;
      height: 0;
      transform: rotate(90deg);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #fff;
      animation: fade-in; /*动画名称*/
      animation-duration: 0.8s; /*动画持续时间*/
      -webkit-animation: fade-in 0.8s; /*针对webkit内核*/
    }
    @keyframes fade-in {
      0% {
        opacity: 0;
      } /*初始状态 透明度为0*/
      40% {
        opacity: 0;
      } /*过渡状态 透明度为0*/
      100% {
        opacity: 1;
      } /*结束状态 透明度为1*/
    }
    @-webkit-keyframes fade-in {
      /*针对webkit内核*/
      0% {
        opacity: 0;
      }
      40% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .item-box {
      //position: absolute;
      display: flex;
      position: relative;
      left: 100px;
      width: 70px;
      height: 25px;
    }
  }
  .pt5 {
    .gxsj {
      margin-left: 30px;
      position: absolute;
    }
    .titleLeft {
      width: 10%;
      font-size: 0.8rem;
      position: initial;
      text-align: right;
      line-height: 80px;
      height: 30px;
      font-weight: bold;
      padding-top: 5px;
      box-sizing: border-box;
    }
    .dsj-panel-flex-row {
      display: flex;
      justify-content: left;
      align-items: center;
      flex-direction: row;
      width: 95%;
      height: 90%;
      margin-left: -3%;
      margin-top: -16%;
    }
    .panel_content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .barStyle {
      float: left;
      margin: 6px 0 0 0;
      // height: 100px;
      width: 90%;
    }
    .flexRow {
      align-items: center;
    }
    .leftdiv {
      width: 50%;
      background: url("~static/images/dsj/panelbg.png") center top no-repeat;
      background-size: 140%;
      background-position: -30px -12px;
      height: 150px;
      margin-top: 45px;
      margin-left: 133px;
      position: relative;
      left: -72px;
      .cardPanel1 {
        height: 140px;
        //width: 140px;
        // box-shadow: 0 0 10px inset rgba(255, 255, 255, 0.2);
        width: 80px;
        height: 80px;
        padding: 10px;
        border-radius: 50px;
        text-align: center;
        margin: 0px auto 0 auto;
        zoom: 1.5;
        margin-top: -40px;
        .container {
          width: 80px;
          height: 80px;
          box-sizing: border-box;
          padding-top: 40px;
          border-radius: 42px;
          box-shadow: 0px 0px 16px inset rgba(0, 0, 0, 0.28);
          font-size: 18px;
          font-weight: bold;
          span {
            font-size: 24px;
            display: block;
            font-weight: bold;
          }
        }
      }
    }
    .rightdiv {
      display: flex;
      flex-wrap: wrap;
      width: 65%;
      margin-top: -54px;
      position: relative;
      left: -21px;
      .cardPanel1 {
        font-size: 12px;
        padding-left: 0;
        height: 44px;
        margin: 0.7rem 0 0 0.7rem;
        width: 100px;
        left: -7px;
        position: relative;
        border: 1px solid #007a3e;
        box-sizing: border-box;
        border-radius: 4px;
        color: #fff;
        zoom: 1.8;

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
    .pt5changetab {
      position: absolute;
      right: 18px;
      top: 3px;
    }

    //水质监测
    .list_title {
      background: #114EA9;
      border:0px solid #114EA9;
      height: 36px;
      line-height: 40px;
      position: relative;
      top: -21px;
      padding: 2px 0;
      width: 476px;
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
  .pt6 {
    //水利水务闸站
    .list_title {
      font-size: 14px;
      position: relative;
      background: #114EA9;
      border:0px solid #114EA9;
      top: -20px;
      padding: 2px 0;
      line-height: 36px;
    }
    .list_content {
      li {
        padding: 2px 0;
      }
    }
    .list_cell0 {
      line-height: 36px;
      width: 30%;
    }
    .list_cell1 {
            line-height: 36px;
      width: 30%;
    }
    .list_cell2 {
            line-height: 36px;
      width: 20%;
    }
    .list_cell3 {
            line-height: 36px;
      width: 20%;
    }
    .list_cell4 {
            line-height: 36px;
      display: none;
    }
    .list_cell5 {
            line-height: 36px;
      display: none;
    }
  }
  .pt7 {
    .sum {
      position: relative;
      top: 0px;
      left: -24px;
      border-radius: 5rem;
      font-size: 3rem;
      height: 2rem;
      line-height: 2rem;
      padding: 2rem 5.6rem;
      width: 36%;
      zoom: 1;
      margin-left: 25%;
      text-align: center;

      span {
        display: inline-block;
        color: #ffffff;
      }
    }
  }
  .popdiv {
    z-index: 999;
    width: 46%;
    height: 895px;
    position: fixed;
    right: 27%;
    top: 145px;
    border: 1px solid #1d5287;
    border-top-color: #3fabed;
    background: #06245f;
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
    text-align: center;
    position: relative;
    width: 100%;
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
  .pt7changetab {
    position: absolute;
    right: 147px;
    top: 36px;
  }
}
</style>
