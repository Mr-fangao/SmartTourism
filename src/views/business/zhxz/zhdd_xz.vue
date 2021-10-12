<template>
  <div class="lg_main">
    <div class="pt1">
      <div class="tabs">
        <ul>
          <li
            v-for="(item,index) in tabList"
            :class="selectTab==item['tabName']?'current':''"
            @click="changeTab(item['tabName'])"
          >
            <span>{{item['tabName']}}</span>
          </li>
        </ul>
      </div>
      <div class="frame">
        <jbqk v-if="selectTab=='基本情况'"></jbqk>
        <hjjc v-if="selectTab=='环境监测'"></hjjc>
        <jjfz v-if="selectTab=='经济发展'"></jjfz>

        <tab331 v-if="selectTab=='安全生产'"></tab331>
        <slfx v-if="selectTab=='水利水务'"></slfx>
        <zhxf v-if="selectTab=='智慧信访'"></zhxf>

        <zdxm v-if="selectTab=='重点项目'"></zdxm>
        <rckc v-if="selectTab=='科创项目'"></rckc>
        <gtjs v-if="selectTab=='国土'"></gtjs>
        <ajsp v-if="selectTab=='安监视频'"></ajsp>
      </div>
    </div>
    <div class="map pt4">
      <div class="textBox">
        <div class="item-box">
          <div>
            <img
              @mouseover="mouseOver('网格员')"
              @mouseout="mouseLeave('网格员')"
              style="width:20px;margin:5px"
              src="static/images/dsj/网格员.png"
            />
            <img
              :src="
                  'static/images/dsj/' + (wgyNumber ? '选择.png' : '未选择.png')
                "
              @click="wgyNumber=!wgyNumber"
            />
          </div>
          <div
            v-if="wgyMouseHover"
            class="item-box-tip"
          >
            <div class="arrow"></div>
            <div class="imag-tip">网格员</div>
          </div>
        </div>
        <div class="item-box">
          <div>
            <img
              @mouseover.stop="mouseOver('执法人员')"
              @mouseout.stop="mouseLeave('执法人员')"
              style="width:20px;margin:5px"
              src="static/images/dsj/执法.png"
            />
            <img
              :src="
                  'static/images/dsj/' + (zfNumber ? '选择.png' : '未选择.png')
                "
              @click="zfNumber=!zfNumber"
            />
          </div>
          <div
            v-if="zfMouseHover"
            class="item-box-tip"
          >
            <div class="arrow"></div>
            <div class="imag-tip">执法人员</div>
          </div>
        </div>
        <div class="item-box">
          <div>
            <img
              @mouseover="mouseOver('其他人员')"
              @mouseout="mouseLeave('其他人员')"
              style="width:20px;margin:5px"
              src="static/images/dsj/其他.png"
            />
            <img
              :src="
                  'static/images/dsj/' + (gzNumber ? '选择.png' : '未选择.png')
                "
              @click="gzNumber=!gzNumber"
            />
          </div>
          <div
            v-if="qtMouseHover"
            class="item-box-tip"
          >
            <div class="arrow"></div>
            <div class="imag-tip">其他人员</div>
          </div>
        </div>

      </div>

      <iframe
        :src="this.GLOBAL.weburl_Onemap+'/map/mapcontainersbzb.html?type=zhdd&xUserName=zhzs_zhdd'"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height:100%;"
      ></iframe>
    </div>
    <div
      class="panel pt5"
      v-if="false"
    >
      <div class="panel_header">
        <div class="panel_headerTitle">工单分析</div>
      </div>
      <div class="panel_content">
        <div class="cardPanel">
          <div class="title">{{gdfxtitle}}</div>
          <div class="container">
            <span>{{bndgdzs}}</span>个
          </div>
        </div>
        <div class="flexRow">
          <div class="panelDataChart">
            <div
              id="chartXL"
              style="height:180px;width:250px;"
            ></div>
            <span>来源分析</span>
          </div>
          <div class="panelDataChart">
            <div
              id="chartBJ"
              style="height:180px;width:250px;"
            ></div>
            <span>类型分析</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="panel pt6"
      v-if="false"
    >
      <div class="panel_header">
        <div class="panel_headerTitle">工单列表</div>
      </div>
      <div class="panel_content">
        <div class="tab">
          <ul>
            <li
              :class="showList==1?'current':''"
              @click="showList=1"
            >
              <span>交办工单</span>
            </li>
            <li
              :class="showList==2?'current':''"
              @click="showList=2"
            >
              <span>督办工单</span>
            </li>
          </ul>
        </div>
        <div
          class="panel_table"
          v-if="showList==1"
        >
          <div class="list_title">
            <span class="list_cell10">查看</span>
            <span
              :class="'list_cell'+cellKey"
              v-for="(cell,cellKey) in dataTableLB.cells"
              :key="cellKey"
            >{{cell}}</span>
          </div>
          <vue-seamless-scroll
            :data="dataTableLB.rows"
            style="height:240px;overflow:hidden"
            :class-option="autoScrollOption"
            @click.native="parentClick"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row,rowKey) in dataTableLB.rows"
                    :key="rowKey"
                  >
                    <span class="list_cell10">
                      <img
                        style="height:20px;"
                        :data-id="row[3]"
                        src="~static/images/menu/icon_nav_10.png"
                      />
                    </span>
                    <span
                      :class="'list_cell'+row_cellKey"
                      v-for="(row_cell,row_cellKey) in row"
                      :key="row_cellKey"
                    >{{row_cell}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
        <div
          class="panel_table"
          v-if="showList==2"
        >
          <div class="list_title">
            <span class="list_cell10">查看</span>
            <span
              :class="'list_cell'+cellKey"
              v-for="(cell,cellKey) in dataTableDB.cells"
              :key="cellKey"
            >{{cell}}</span>
          </div>
          <vue-seamless-scroll
            :data="dataTableDB.rows"
            style="height:180px;overflow:hidden"
            :class-option="autoScrollOption"
            @click.native="parentClick"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row,rowKey) in dataTableDB.rows"
                    :key="rowKey"
                  >
                    <span class="list_cell10">
                      <img
                        style="height:20px;"
                        :data-id="row[3]"
                        src="~static/images/menu/icon_nav_10.png"
                      />
                    </span>
                    <span
                      :class="'list_cell'+row_cellKey"
                      v-for="(row_cell,row_cellKey) in row"
                      :key="row_cellKey"
                    >{{row_cell}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
    <div
      class="panel pt7"
      v-if="false"
    >
      <div class="panel_header">
        <div class="panel_headerTitle">工作流程</div>
      </div>
      <div class="panel_content">
        <div class="flexRow">
          <div
            class="iconcardPanel1"
            @click="dialogVisible2=1"
          >
            <div class="container">
              <span>事件处置流程</span>
            </div>
          </div>
          <div
            class="iconcardPanel1"
            @click="dialogVisible2=2"
          >
            <div class="container">
              <span>应急指挥流程</span>
            </div>
          </div>
          <div
            class="iconcardPanel1"
            @click="dialogVisible2=3"
          >
            <div class="container">
              <span>指挥调度流程</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="panel pt5"
      v-if="true"
    >
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
          style="height: 900px;position: fixed;width: 469px;"
        ></iframe>
      </div>
    </div>

    <div
      id="divDialog"
      class="popdiv"
      v-if="dialogVisible!=0 && selectTab!='安全生产'"
    >
      <div class="popbg">
        <div class="corner"></div>
        <div
          class="close"
          @click="dialogVisible=0"
        ></div>
        <!-- <div class="close" @click="dialogVisible=0"></div> -->
        <img
          style="margin-top:40px"
          :src="'static/images/dsj/'+(dialogVisible==1?'事件处置流程.png':dialogVisible==2?'应急指挥流程.png':'指挥调度流程.png')"
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
export default {
  data() {
    return {
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
        rows: []
      },
      dataTableDB: {
        cells: [],
        rows: []
      },
      data: [],
      selectTab: "",
      tabList: [
        { tabName: "基本情况" },
        { tabName: "经济发展" },
        { tabName: "环境监测" },
        { tabName: "安全生产" },
        { tabName: "水利水务" },
        { tabName: "智慧信访" }
      ],
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      }
    };
  },
  watch: {
    selectTab: {
      handler(newValue, oldValue) {
        if (newValue != "安全生产" && oldValue == "安全生产") {
          this.getInitDate();
        }
      },
      deep: true
    },
    wgyNumber(val) {
      $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
      if (val) {
        this.getOnline("网格员");
        var _this = this;
        this.timerWG = setInterval(function() {
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
        this.timerZF = setInterval(function() {
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
        this.timerGZ = setInterval(function() {
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
    }
  },
  methods: {
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
          url: url
        })
        .then(res => {
          $("iframe")[0].contentWindow.GeoneMap.tc_locationPerson(res.data);
        });
    },
    changeTab(name) {
      this.selectTab = name;
    },
    getGdInfo(id) {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=Query_GongDan&id=" +
        id;
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
    getInitDate() {
      webAPI.server
        .get({
          url: this.GLOBAL.weburl_Onemap + "/handler/dsj/zhdd.ashx"
        })
        .then(res => {
          if (res.data.length == 0) return;
          this.data = res.data;
          var xlOption = echartsUtils.getEchartsConfig(
            this.data[0].chartType.toLowerCase(),
            this.data[0].xAxis,
            this.data[0].data,
            this.data[0].title,
            this.data[0].xUnit,
            4
          );
          this.timer0 = echartsUtils.chartInit("chartXL", xlOption);
          var bjOption = echartsUtils.getEchartsConfig(
            this.data[1].chartType.toLowerCase(),
            this.data[1].xAxis,
            this.data[1].data,
            this.data[1].title,
            this.data[1].xUnit,
            4
          );
          this.timer1 = echartsUtils.chartInit("chartBJ", bjOption);

          this.dataTableLB.cells = this.data[2].cells;
          this.data[2].rows.forEach(row => {
            if (row[0].length > 13) {
              row[0] = row[0].substring(0, 12) + "...";
            }
          });
          this.dataTableLB.rows = this.data[2].rows;
          this.dataTableDB.cells = this.data[3].cells;
          this.data[3].rows.forEach(row => {
            if (row[0].length > 13) {
              row[0] = row[0].substring(0, 12) + "...";
            }
          });
          this.dataTableDB.rows = this.data[3].rows;
          this.data[4]["list"].forEach(item => {
            switch (item["name"]) {
              case "总量":
                this.bndgdzs = item["value"];
                break;
              case "本年度工单总数":
                this.gdfxtitle = item["value"];
                break;
            }
          });
        });
    }
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
    ajsp
  },
  mounted() {
    this.changeTab("基本情况");
    this.getInitDate();
    var _this = this;
    this.timerMap = setInterval(function() {
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
  }
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 26% 48% 26%;
  grid-template-rows: 30% 30% 40%;
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
  }
  .pt6 {
    grid-row-start: 2;
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
      text-align: center;
      height: 25px;
      position: absolute;
      z-index: 9999;
      left: 27%;
      top: 12%;
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
    }
  }
  .pt5 {
    .flexRow {
      float: left;
      margin-left: -30px;
    }
    .panelDataChart {
      margin: 10px 10px;
      span {
        // color: #2bc6f4;
        font-size: 1.4rem;
        text-align: center;
        display: block;
        font-weight: bold;
      }
      .lagend {
        position: absolute;
        float: left;
        width: 50px;
        height: 20px;
        margin: 10px;
        border-radius: 5px;
        text-align: center;
      }
    }
    .cardPanel {
      width: 180px;
      //width: 0px;
      padding-left: 0;
      height: 45px;
      margin: 1rem 1rem 1rem 0;
      margin-left: 130px;
      line-height: 45px;
      text-align: center;
      //height: 150px;
      .title {
        display: inline-block;
        float: left;
        font-size: 1.2rem;
        padding-left: 15px;
      }
      .container {
        //display: inline-block;
        height: 45px;
        line-height: 45px;
        text-align: left;
        padding-left: 83px;
        span {
          font-size: 3rem;
        }
      }
    }
  }
  .pt6 {
    .tab {
      position: absolute;
      right: 30px;
      top: 0;
      text-align: center;
      margin-bottom: 10px;
    }
    margin-top: 80px;
    .list_cell10 {
      width: 15%;
    }
    .list_cell0 {
      width: 45%;
    }
    .list_cell1 {
      width: 20%;
    }
    .list_cell2 {
      width: 20%;
    }
    .list_cell3 {
      display: none;
    }
    .list_cell4 {
      display: none;
    }
    .list_cell5 {
      display: none;
    }
  }
  .pt7 {
    margin-top: 150px;
    .flexRow {
      justify-content: space-between;
    }
    .iconcardPanel1 {
      position: relative;
      border-radius: 6px;
      background: #001a33;
      width: 31%;
      text-align: center;
      margin: 10px 0;
      box-sizing: border-box;
      padding-top: 80px;
      height: 120px;
      //line-height: 60px;
      //background: rgba(255, 255, 255, 0.02);
      //border: 1px solid #0a4f84;
      transition: all 0.3s;
      cursor: pointer;
      &:before {
        position: absolute;
        left: 38px;
        top: 20px;
        display: block;
        content: "";
        width: 62px;
        height: 46px;
      }
      .container {
        span {
          font-size: 1.4rem;
          //font-weight: bold;
          color: #21c0f4;
        }
      }
      &:hover {
        //border: 1px solid #36bcff;
        background: #01264a;
        .container {
          span {
            color: #66d6fa;
          }
        }
      }
    }
    .iconcardPanel1:nth-child(1):before {
      background: url("~static/images/dsj/icon-17.png") 0 center no-repeat;
    }
    .iconcardPanel1:nth-child(2):before {
      background: url("~static/images/dsj/icon-16.png") 0 center no-repeat;
    }
    .iconcardPanel1:nth-child(3):before {
      background: url("~static/images/dsj/icon-26.png") 0 center no-repeat;
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
}
</style>
