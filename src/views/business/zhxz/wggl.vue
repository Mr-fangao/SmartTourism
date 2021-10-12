<template>
  <div class="lg_main">
    <!-- <div class="ajtop">
      <djdl-list></djdl-list>
    </div>-->
    <!-- <div class="gxsj">数据更新于{{ updatetime }}</div> -->
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">{{ "网格划分" }}</div>
      </div>
      <div class="panel_content"></div>
      <!-- -->
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">{{}}</div>
      </div>
      <div class="panel_content" style="display: none">
        <div class="flexRow">
          <div class="panelDataChart">
            <div class="panelDataChart_part">
              <div id="chartLY" style="height: 400px; width: 520px"></div>
            </div>
            <!-- <span v-if="data.length > 0">{{ data[1]['subtitle'] }}</span> -->
          </div>
          <div class="panelDataChart">
            <div class="panelDataChart_part">
              <div id="chartFL" style="height: 400px; width: 520px"></div>
            </div>
            <!-- <span v-if="data.length > 0">{{ data[2]['subtitle'] }}</span> -->
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt3">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[5]["title"] }}
        </div>
        <panel-change-tab-new
          class="pt3changeType"
          :changeType="pt3changeType"
          :data="['工单数量统计', '自上而下工单', '自下而上工单']"
          changekey="pt3changeType"
          @ChangeTab="ChangeTabData"
        ></panel-change-tab-new>
      </div>
      <panel-change-tab
        v-if="fasle"
        class="pt3changeType"
        :changeType="pt3changeType"
        :data="['工单数量统计', '自上而下工单', '自下而上工单']"
        :width="200"
        changekey="pt3changeType"
        @ChangeTab="ChangeTabData"
      ></panel-change-tab>
      <div class="panel_content" v-if="changeWGTabLB">
        <div class="panel_table">
          <div class="list_title">
            <span
              :class="'list_cell' + cellKey"
              v-for="(cell, cellKey) in dataTablelb.cells"
              :key="cellKey"
              >{{ cell }}</span
            >
          </div>
          <vue-seamless-scroll
            :data="dataTablelb.rows"
            style="height: 335px; overflow: hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row, rowKey) in dataTablelb.rows"
                    :key="rowKey"
                    :class="rowKey < 3 ? 'newLi' + (rowKey % 2) : ''"
                  >
                    <span
                      :title="row_cell"
                      :class="'list_cell' + row_cellKey"
                      v-for="(row_cell, row_cellKey) in row"
                      :key="row_cellKey"
                      @click="getLocationClientPoint(row[0])"
                      :style="row_cellKey == 4 ? 'color:#0cf4db' : ''"
                    >
                      <span v-if="row_cellKey == 1" class="point"></span>
                      {{ row_cell }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="panel_content flexRow" v-if="!changeWGTabLB">
        <div class="leftPart" v-if="data.length > 0">
          <div class="panelInfo">
            <div>
              <img src="~static/images/wggl/wanc1.png" alt="" />
              {{ "当日" + gdczDataDay[0].name }}
            </div>
            <div>
              <span v-for="(num, key) in gdczDataDay[0].value" :key="key">{{
                num
              }}</span>
            </div>
          </div>
          <div class="panelInfo">
            <div>
              <img src="~static/images/wggl/wanc2.png" alt="" />
              {{ "当日" + gdczDataDay[1].name }}
            </div>
            <div>
              <span v-for="(num, key) in gdczDataDay[1].value" :key="key">{{
                num
              }}</span>
            </div>
          </div>
        </div>

        <div class="leftPart" v-if="data.length > 0">
          <div class="panelInfo">
            <div>
              <img src="~static/images/wggl/wanc1.png" alt="" />
              {{ "当月" + gdczDataMonth[0].name }}
            </div>
            <div>
              <span v-for="(num, key) in gdczDataMonth[0].value" :key="key">{{
                num
              }}</span>
            </div>
          </div>
          <div class="panelInfo">
            <div>
              <img src="~static/images/wggl/wanc2.png" alt="" />
              {{ "当月" + gdczDataMonth[1].name }}
            </div>
            <div>
              <span v-for="(num, key) in gdczDataMonth[1].value" :key="key">{{
                num
              }}</span>
            </div>
          </div>
        </div>

        <div class="leftPart" v-if="data.length > 0">
          <div class="panelInfo">
            <div>
              <img src="~static/images/wggl/wanc1.png" alt="" />
              {{ "当年" + gdczDataYear[0].name }}
            </div>
            <div>
              <span v-for="(num, key) in gdczDataYear[0].value" :key="key">{{
                num
              }}</span>
            </div>
          </div>
          <div class="panelInfo">
            <div>
              <img src="~static/images/wggl/wanc2.png" alt="" />
              {{ "当年" + gdczDataYear[1].name }}
            </div>
            <div>
              <span v-for="(num, key) in gdczDataYear[1].value" :key="key">{{
                num
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map pt4">
      <div class="textBox" v-if="currentIndex == 1">
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
          '/map/mapcontainersbzb.html?type=wggl&xUserName=zhzs_wggl&right=428'
        "
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height: 100%"
        id="mapIframe"
        v-if="currentIndex == 1 || currentIndex == 3"
      ></iframe>
      <iframe
        :src="
          this.GLOBAL.weburl_Onemap +
          '/map/mapcontainersbzb.html?type=wggl&xUserName=zhzs_wggl&right=428'
        "
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height: 100%"
        id="mapIframe"
        v-if="currentIndex == 2"
      ></iframe>
    </div>
    <div class="panel pt5_1">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="videosp_data.length > 0">
          {{ videosp_data[0].title }}
        </div>
      </div>
      <div class="video-content">
        <div class="panelCard" v-for="(item, index) in videoList" :key="index">
          <iframe
            allowfullscreen="allowfullscreen"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            oallowfullscreen="true"
            msallowfullscreen="true"
            :src="item.url"
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
            :id="item.id"
          ></iframe>
        </div>
      </div>
    </div>
    <div class="panel pt5" v-if="false">
      <div class="panel_header" v-if="data.length > 0">
        <!-- <div class="panel_headerTitle" v-if="data.length > 0">{{ data[6]['title'] }}</div> -->
        <div class="panel_headerTitle">{{ data[7].title }}</div>
      </div>
      <div class="tab">
        <div :class="{ active: gdczType == '当日' }" @click="gdczType = '当日'">
          当日
        </div>
        <div :class="{ active: gdczType == '当月' }" @click="gdczType = '当月'">
          当月
        </div>
        <div :class="{ active: gdczType == '当年' }" @click="gdczType = '当年'">
          当年
        </div>
      </div>
      <div class="panel_content flexRow" v-if="data.length > 0">
        <div class="leftPart">
          <div class="panelInfo">
            <div>
              <img src="~static/images/wggl/wanc1.png" alt="" />
              {{ gdczData[0].name }}
            </div>
            <div>
              <span v-for="(num, key) in gdczData[0].value" :key="key">{{
                num
              }}</span>
            </div>
          </div>
          <div class="panelInfo">
            <div>
              <img src="~static/images/wggl/wanc2.png" alt="" />
              {{ gdczData[1].name }}
            </div>
            <div>
              <span v-for="(num, key) in gdczData[1].value" :key="key">{{
                num
              }}</span>
            </div>
          </div>
        </div>
        <div class="rightPart">
          <div
            class="panelAround"
            v-for="(item, index) in [2, 3, 4, 5, 6, 7]"
            :key="index"
          >
            <p>{{ gdczData[item].name }}</p>
            <p>
              <span>{{ gdczData[item].value }}</span
              >件
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt6" v-if="false">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[8]["title"] }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="czqkchart"
              style="height: 380px; width: 100%; margin: 0 auto"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt7" v-if="false">
      <div class="panel_header" style="margin-top: -70px">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[9]["title"] }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panel_table">
          <div class="list_title">
            <span
              :class="'list_cell' + cellKey"
              v-for="(cell, cellKey) in zsexTable.cells"
              :key="cellKey"
              >{{ cell }}</span
            >
          </div>

          <vue-seamless-scroll
            :data="zsexTable.rows"
            style="height: 405px; overflow: hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row, rowKey) in zsexTable.rows"
                    :key="rowKey"
                    :class="rowKey < 3 ? 'newLi' + (rowKey % 2) : ''"
                  >
                    <span
                      :title="row_cell"
                      :class="'list_cell' + row_cellKey"
                      v-for="(row_cell, row_cellKey) in row"
                      :key="row_cellKey"
                      :style="row_cellKey == 3 ? 'color:#0cf4db' : ''"
                    >
                      <span v-if="row_cellKey == 0" class="point"></span>
                      {{ row_cell }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
    <div class="dataAnalysis">
      <div class="top">
        <div class="tabs">
          <div
            :class="currentIndex == 1 ? 'currentTab' : 'tab'"
            @click="changeTab(1)"
          >
            网格分布
          </div>
          <div
            :class="currentIndex == 2 ? 'currentTab' : 'tab'"
            @click="changeTab(2)"
          >
            数据分析
          </div>
          <div
            :class="currentIndex == 3 ? 'currentTab' : 'tab'"
            @click="changeTab(3)"
          >
            视频监控
          </div>
        </div>
      </div>
      <div class="content">
        <!-- <div
          class="leftDiv"
          v-if="currentIndex==2"
        >
          <div style="align-self:center;">
            <div>
              <div class="wanggeDiv">
                <div
                  class="item"
                  @click="changeWGTab(1)"
                  :class="wgTabIndex==1?'item-checked':''"
                >
                  <span>社区网格</span>
                </div>
                <div
                  class="item"
                  @click="changeWGTab(2)"
                  :class="wgTabIndex==2?'item-checked':''"
                >
                  <span>商贸网格</span>
                </div>
                <div
                  class="item"
                  @click="changeWGTab(3)"
                  :class="wgTabIndex==3?'item-checked':''"
                >
                  <span>企业网格</span>
                </div>
              </div>
            </div>
            <div
              v-for="(data, index) in tempData[0].list"
              :key="index"
              class="item"
            >
              <span class="title">{{data.name}}</span>
              <span class="count">{{data.value}}</span>
            </div>
          </div>
        </div> -->
        <layerControls
          v-if="currentIndex == 3"
          :keyName="keyName"
          :position="position"
          :type="check"
          :appid="appid"
          @openLayerByFilter="openLayerByFilter"
          class="layer-body-content"
          style=""
        ></layerControls>

        <div style="position: absolute; top: 60px; left: 350px; z-index: 9999">
          <div class="wanggeDiv">
            <div
              class="item"
              @click="changeWGTab(1)"
              :class="wgTabIndex == 1 ? 'item-checked' : ''"
            >
              <span>基础网格</span>
            </div>
            <div
              class="item"
              @click="changeWGTab(2)"
              :class="wgTabIndex == 2 ? 'item-checked' : ''"
            >
              <span>商贸网格</span>
            </div>
            <div
              class="item"
              @click="changeWGTab(3)"
              :class="wgTabIndex == 3 ? 'item-checked' : ''"
            >
              <span>企业网格</span>
            </div>
          </div>
        </div>
        <div class="rightDiv">
          <!-- <div
            class="bottom"
            style="pointer-events:none;"
            v-if="currentIndex == 2"
          >
            <div style="width: 3220px;
              height: 1572px;background:rgba(0,0,0,0);">
              <iframe
                :src="url"
                frameborder="0"
                border="0"
                marginwidth="0"
                marginheight="0"
                scrolling="no"
                style="height:100%;width:100%;pointer-events:auto;"
              ></iframe>
            </div>
            <div
              style="width: 3220px;
              height: 1496px;background:rgba(0,0,0,0);"
              v-if="showwgindex==0"
            >
              <iframe
                src="http://112.4.85.53:8000/bigdata/#/bigdataShequIndex"
                frameborder="0"
                border="0"
                marginwidth="0"
                marginheight="0"
                scrolling="no"
                style="height:100%;width:100%;pointer-events:auto;"
              ></iframe>
            </div>
            <div
              style="width: 3220px;
              height: 1496px;background:rgba(0,0,0,0);"
              v-if="showwgindex==1"
            >
              <iframe
                src="http://112.4.85.53:8000/bigdata/#/bigdatashangmao"
                frameborder="0"
                border="0"
                marginwidth="0"
                marginheight="0"
                scrolling="no"
                style="height:100%;width:100%;pointer-events:auto;"
              ></iframe>
            </div>
            <div
              style="width: 3220px;
              height: 1496px;background:rgba(0,0,0,0);"
              v-if="showwgindex==2"
            >
              <iframe
                src="http://112.4.85.53:8000/bigdata/#/bigdataQyindex"
                frameborder="0"
                border="0"
                marginwidth="0"
                marginheight="0"
                scrolling="no"
                style="height:100%;width:100%;pointer-events:auto;"
              ></iframe>
            </div>

          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 智慧乡镇:网格管理
import echarts from "echarts";
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";
import vueSeamlessScroll from "vue-seamless-scroll";
import djdlList from "components/common/djdlList";
import layerControls from "@/components/layerControls";

export default {
  data() {
    return {
      pt3changeType: 0,
      videoList: [],
      videosp_data: [],
      keyName: "",
      check: 2,
      appid: "",
      position: [],
      gdczType: "当月",
      wgyNumber: false,
      zfNumber: false,
      gzNumber: false,
      wgyMouseHover: false,
      zfMouseHover: false,
      qtMouseHover: false,
      increase: 0,
      url: "",
      showwgindex: 0,
      dataZoom: [
        {
          type: "slider", // 图表下方的伸缩条
          show: false, // 是否显示
          realtime: true, //
          start: 0, // 伸缩条开始位置（1-100），可以随时更改
          end: 30, // 伸缩条结束位置（1-100），可以随时更改
        },
      ],
      zlysDataList: null,
      sjtjDataList: null,
      wgy: 0,
      ejwg: 0,
      sjwg: 0,
      jrgdl1: 0,
      jrgdl2: 0,
      jrgdl3: 0,
      zxxcy1: 0,
      zxxcy2: 0,
      zxxcy3: 0,
      gdzl: 0,
      dataTablelb: {
        cells: [],
        rows: [],
      },
      zsexTable: {
        cells: [],
        rows: [],
      },
      data: [],
      tjOption: {},
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20,
      },
      currentIndex: 2,
      wgTabIndex: -1,
      changeWGTabLB: false,
      tempData: [
        {
          list: [
            {
              name: "累计数据采集量",
              value: "2034",
            },
            {
              name: "累计工单上报量",
              value: "1276",
            },
            {
              name: "本月工单上报量",
              value: "230",
            },
            {
              name: "今日工单上报量",
              value: "15",
            },
          ],
        },
      ],
      wanggeList: [],
    };
  },
  computed: {
    gdczData: function () {
      let a = this.data[7].list;
      return a.filter((item) => {
        return item["type"] == this.gdczType;
      });
    },
    gdczDataYear: function () {
      let a = this.data[7].list;
      return a.filter((item) => {
        return item["type"] == "当年";
      });
    },
    gdczDataMonth: function () {
      let a = this.data[7].list;
      return a.filter((item) => {
        return item["type"] == "当月";
      });
    },
    gdczDataDay: function () {
      let a = this.data[7].list;
      return a.filter((item) => {
        return item["type"] == "当日";
      });
    },
  },
  methods: {
    ChangeTabData(key, item, index) {
      this[key] = index;
      switch (key) {
        case "pt3changeType":
          this.ChangeTabGdData();
          break;

        default:
          break;
      }
    },
    GetSPJK(key) {
      // var url = "static/json/zhxz/yjson/zhdd_sp.json";
      var url =
        this.GLOBAL.weburl_Onemap +
        "/handler/dsj/dsjHandlerPra.ashx?type=zhdd_sp&DBTag=" +
        this.GLOBAL.Appid +
        "&key=" +
        key;
      webAPI.server
        .get({
          url: url,
        })
        .then((res) => {
          if (res.data.length === 0) return;
          this.videosp_data = res.data;
          this.videoList = this.videosp_data[0].list;
        });
    },
    openLayerByFilter(obj) {
      console.log(obj, 1111);
      var key = obj.key;
      this.GetSPJK(key);
      $(".map iframe")[0].contentWindow.GeoneMap.setFilterLayer(obj);
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
      }
    },
    mouseLeave(name) {
      //console.log(name, "鼠标移除sdhshdjsdhn");
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
      }
    },
    ZSEXXQ(param) {
      if (param.name != "" && param.name != undefined) {
        //console.log(param.name);
        // this.LocationClientPoint(param.name, 'Query_SQ')
        var urlgdlist =
          this.GLOBAL.weburl_ZSEXList +
          "&key=" +
          param.name +
          "&s=" +
          Math.random();
        window.layerAPI.openResultWin("", urlgdlist, ["850px", "550px"]);
      }
    },
    ZXESXQ(param) {
      //console.log(param, "quuququ");
      if (param.name != "" && param.name != undefined) {
        //console.log(param.name);
        // this.LocationClientPoint(param.name, 'Query_SQ')
        var urlgdlist =
          this.GLOBAL.weburl_ZXESList +
          "&key=" +
          param.name +
          "&s=" +
          Math.random();
        window.layerAPI.openResultWin("", urlgdlist, ["850px", "550px"]);
      }
    },
    GetJRSK(state) {
      webAPI.server
        .get({
          // url: "static/json/zhxz/yjson/wggl_wg.json",
          url: this.GLOBAL.weburl_Onemap + "/handler/dsj/wggl_wg.ashx"
        })
        .then((res) => {
          var data = res.data;
          this.sjtjDataList = data[0];
          if (state) {
            this.changeWGTab(this.wgTabIndex); //默认打开社区网格
          }
        });
    },
    initDyrstjCharts(data) {
      //console.log(data);
      var xAxis = [];
      var seriesData = [];
      data.map((item) => {
        xAxis.push(item.所属部门);
        seriesData.push({
          name: item.所属部门,
          value: item.Column1,
        });
      });
      //console.log(xAxis);
      //console.log(seriesData);
      var option = {
        grid: {
          top: "5%",
          right: "2%",
          left: "10%",
          bottom: "12%",
        },
        xAxis: [
          {
            type: "category",
            color: "#59588D",
            data: xAxis,
            axisLabel: {
              color: "#ffffff",
              textStyle: {
                fontSize: 26,
              },
              interval: 0, // 代表显示所有x轴标签显示
              formatter: function (value) {
                // //console.log(value);
                var valueDetal = value.split("-").join("");
                //console.log(valueDetal);
                var ret = ""; // 拼接加n返回的类目项
                var maxLength = 9; // 每项显示文字个数
                var valLength = valueDetal.length; // X轴类目项的文字个数
                // //console.log(valLength);
                var rowN = Math.ceil(valLength / maxLength); // 类目项需要换行的行数
                if (rowN > 1) {
                  for (var i = 0; i < rowN; i++) {
                    var temp = ""; // 每次截取的字符串
                    var start = i * maxLength; // 开始截取的位置
                    var end = start + maxLength; // 结束截取的位置
                    temp = valueDetal.substring(start, end) + "\n";
                    // 第一个+ "n" 这个是为了换行；第二个+ "n" 是为了空一行，显示的时候不要过于紧密
                    ret += temp; // 凭借最终的字符串
                  }
                  return ret;
                } else {
                  return valueDetal;
                }
              },
            },
            axisLine: {
              lineStyle: {
                color: "#205E9A",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}",
              color: "#fff",
              textStyle: {
                fontSize: 26,
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#ffffff",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "#205E9A",
              },
            },
          },
        ],
        tooltip: {
          trigger: "item",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          // position:"top",
          // formatter:function(params)
          // {

          //     return "<div style='"+str1+"'><div style='"+arrow+"'></div>"+params.value+"</div>";
          // },
          // backgroundColor:'transparent'
        },
        series: [
          {
            type: "bar",
            data: seriesData, // [263, 196, 182, 169, 165 , 109, 78],
            barWidth: "40px",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#50F1C5", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#04D05F", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                barBorderRadius: [5, 5, 5, 5],
              },
            },
            label: {
              show: true,
              fontSize: 26,
              position: "top",
              color: "#ffffff",
            },
          },
        ],
      };
      var myChartEg1 = echarts.init(document.getElementById("czqkchart"));
      myChartEg1.setOption(option, true);
    },
    initAdata() {
      webAPI.server
        .get({
          // url: "static/json/zhxz/yjson/wggl.json",
          url: this.GLOBAL.weburl_Onemap + "/handler/dsj/wggl.ashx"
        })
        .then((res) => {
          const _this = this;
          if (res.data.length == 0) return;
          this.data = res.data;
          this.zlysDataList = this.data[0];
          // var lyOption = echartsUtils.getEchartsConfig(
          //   this.data[1].chartType.toLowerCase(),
          //   this.data[1].xAxis,
          //   this.data[1].data,
          //   this.data[1].title,
          //   this.data[1].xUnit,
          //   4
          // );
          // lyOption.legend = {
          //   orient: "vertical",
          //   right: 10,
          //   itemHeight: 12,
          //   itemWidth: 12,
          //   itemGap: 16,
          //   align: "left",
          //   textStyle: {
          //     fontSize: 18,
          //     color: "#ffffff",
          //   },
          //   icon: "circle",
          // };
          var color = [
            "#00ffc6",
            "#03a77b",
            "#3240f9",
            "#09cdf7",
            "#0380eb",
            "#09cdf7",
            "#2097fb",
          ];
          var lyOption = echartsUtils.getEchartConfig_Pie(
            this.data[1].data,
            color
          );
          this.timer1 = echartsUtils.chartInit("chartLY", lyOption);
          var chart2 = echarts.init(document.getElementById("chartLY"));
          chart2.on("click", function (param) {
            //console.log(param, 214788888);
            _this.ZXESXQ(param);
          });
          // var flOption = echartsUtils.getEchartsConfig(
          //   this.data[2].chartType.toLowerCase(),
          //   this.data[2].xAxis,
          //   this.data[2].data,
          //   this.data[2].title,
          //   this.data[2].xUnit,
          //   4
          // );
          // flOption.legend = {
          //   orient: "vertical",
          //   right: 10,
          //   itemHeight: 12,
          //   itemWidth: 12,
          //   itemGap: 16,
          //   align: "left",
          //   textStyle: {
          //     fontSize: 18,
          //     color: "#ffffff",
          //   },
          //   icon: "circle",
          // };
          var color2 = [
            "#fa347a",
            "#e6eaf5",
            "e889b5",
            "df115a",
            "#fa347a",
            "#e6eaf5",
            "e889b5",
            "df115a",
            "#fa347a",
            "#e6eaf5",
            "e889b5",
            "df115a",
          ];
          var flOption = echartsUtils.getEchartConfig_Pie(
            this.data[2].data,
            color2
          );
          this.timer2 = echartsUtils.chartInit("chartFL", flOption);
          var chart1 = echarts.init(document.getElementById("chartFL"));
          chart1.on("click", function (param) {
            //console.log(param, 1214788888);
            _this.ZSEXXQ(param);
          });
          //this.initDyrstjCharts(this.data[8].list);
          //自上而下工单
          var zsexTableList = this.data[9].list;
          var cells = Object.keys(zsexTableList[0]);
          var rows = [];
          zsexTableList.map((item) => {
            var rowData = Object.values(item);
            rows.push(rowData);
          });
          this.zsexTable = {
            cells: cells,
            rows: rows,
          };
          console.log(this.zsexTable, 4578);
          this.ChangeTabGdData();

          //console.log(this.zsexTable);
        });
    },
    handlerOpenJRSK(index) {
      if (index == 0) {
        this.handlerWGY();
      } else if (index == 1) {
      }
    },
    // 地图交互
    handlerOpenLayerByName(name) {
      if (name === "网格员") {
        var urlgdlist = this.GLOBAL.weburl_WGYList + "&s=" + Math.random();
        window.layerAPI.openResultWin("", urlgdlist, ["850px", "550px"]);

        window.layerAPI.openResultWin("", urlgdlist, ["850px", "550px"]);
      }
      var id = null;
      var listArr = this.data[0]["list"];
      for (let index = 0; index < listArr.length; index++) {
        const element = listArr[index];
        if (element["name"] == name) {
          id = element["layerid"];
          break;
        }
      }
      //console.log(id, "898989sdsjdljljl");
      if (id != null) {
        $("iframe")[0]
          .contentWindow.$("#layerControl .treeContainer .clearLayers")
          .click();
        $("iframe")[0].contentWindow.GeoneMap.openLayerByName(id);
      }
    },
    // 在线网格员
    handlerWGY() {
      $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
      this.getOnline("网格员");
      var _this = this;
      if (this.timerWG != undefined && this.timerWG != null) {
        clearInterval(this.timerWG);
      }
      this.timerWG = setInterval(function () {
        $("iframe")[0].contentWindow.GeoneMap.clientClearGraphics();
        _this.getOnline("网格员");
      }, 30000);
    },
    // 获取在线网格员
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
    getLocationClientPoint(key) {
      //console.log(key, 8888);
      return;
      var urlgd = this.GLOBAL.weburl_GdXQ + key + "&s=" + Math.random();
      window.layerAPI.openResultWin("", urlgd, ["850px", "550px"]);
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=Query_GD&key=" +
        key;
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
    changeTab(index) {
      this.currentIndex = index;
      if (index == 1) {
        this.wgTabIndex = 1;
      }
      this.changeWGTab(this.wgTabIndex);
    },
    OpenPopup(url) {
      var event = {
        url: url,
      };
      window.showDpCommonPopup2(event);
    },
    changeWGTab(index) {
      this.wgTabIndex = index;
      this.ChangeTabGdData();
      var openlayerid = "",
        list = this.sjtjDataList.list;
      var url = "";
      var showwgindex = 0;
      switch (index) {
        case 1:
          //openlayerid = "af30abab-15dc-41fe-ad70-340ffa98239a";
          openlayerid = "c32ecb29-45fe-455e-bd82-8abb29353464";
          this.wanggeList = list.slice(2, 6);
          url = this.GLOBAL.weburl_sqwg;
          showwgindex = 0;
          window.open(url, "_blank");
          break;
        case 2:
          //openlayerid = "2f152e01-5602-4fbe-a591-20f393eb186d";
          openlayerid = "ac8bc90b-6deb-4cbf-bf7c-783ec2ce1a5d";
          this.wanggeList = list.slice(6, 10);
          url = this.GLOBAL.weburl_smwg;
          showwgindex = 1;
          window.open(url, "_blank");
          break;
        case 3:
          //openlayerid = "bf263a01-ce57-44a6-bfbb-6c1fd79b5bfe";
          openlayerid = "550c54f3-66e6-4538-8b79-bba38243284b";
          this.wanggeList = list.slice(10, 14);
          url = this.GLOBAL.weburl_qywg;
          showwgindex = 2;
          window.open(url, "_blank");
          break;
        default:
          break;
      }
      this.url = url;
      this.showwgindex = showwgindex;
      this.tempData[0].list.forEach((el, index) => {
        el.value = this.wanggeList[index].value;
      });
      if (this.currentIndex == 1) {
        var internael = setInterval(() => {
          var contentwindw = $("#mapIframe")[0].contentWindow;
          if (contentwindw != undefined) {
            $("#mapIframe")[0]
              .contentWindow.$("#layerControl .treeContainer .clearLayers")
              .click(); //清楚现有图层
            $("#mapIframe")[0].contentWindow.GeoneMap.openLayerByName(
              openlayerid
            ); //显示指定图层（openlayerid，图层id）
            clearInterval(internael);
          }
        }, 100);
      }
    },
    //传入类别区分
    ChangeTabGdData() {
      if (this.data.length === 0) return;
      console.log(this.pt3changeType, 123456);
      if (this.pt3changeType == 1) {
        console.log(this.zsexTable, 123456);
        this.dataTablelb = JSON.parse(JSON.stringify(this.zsexTable));
        // switch (this.wgTabIndex) {
        //   case 1: //基础网格
        //     this.dataTablelb.cells = this.data[12].cells;
        //     this.dataTablelb.rows = this.data[12].rows;
        //     break;
        //   case 2: //商贸网格
        //     this.dataTablelb.cells = this.data[13].cells;
        //     this.dataTablelb.rows = this.data[13].rows;
        //     break;
        //   case 3: //企业网格
        //     this.dataTablelb.cells = this.data[14].cells;
        //     this.dataTablelb.rows = this.data[14].rows;
        //     break;
        // }
      } else if (this.pt3changeType == 2) {
        switch (this.wgTabIndex) {
          case 1: //基础网格
            this.dataTablelb.cells = this.data[5].cells;
            this.dataTablelb.rows = this.data[5].rows;
            break;
          case 2: //商贸网格
            this.dataTablelb.cells = this.data[10].cells;
            this.dataTablelb.rows = this.data[10].rows;
            break;
          case 3: //企业网格
            this.dataTablelb.cells = this.data[11].cells;
            this.dataTablelb.rows = this.data[11].rows;
            break;
        }
      }
      if (this.pt3changeType > 0) {
        this.changeWGTabLB = false;
        this.$nextTick(function () {
          this.changeWGTabLB = !this.changeWGTabLB;
        });
      } else {
        this.changeWGTabLB = false;
      }
    },
    handlerNum(value) {
      if (value.length == 1) {
        return [0, 0, value];
      } else if (value.length == 2) {
        return [0, value[0], value[1]];
      } else {
        return [value[0], value[1], value[2]];
      }
    },
  },
  components: {
    countTo,
    djdlList,
    layerControls,
    vueSeamlessScroll,
  },
  mounted() {
    var _this = this;
    clearInterval(this.timerTJ);
    _this.GetJRSK(true);
    _this.GetSPJK("");
    if (this.sjtjDataList) {
      var list = this.sjtjDataList.list;
      switch (this.wgTabIndex) {
        case 1:
          this.wanggeList = list.slice(2, 6);
          break;
        case 2:
          this.wanggeList = list.slice(4, 10);
          break;
        case 3:
          this.wanggeList = list.slice(10, 14);
      }
      this.tempData[0].list.forEach((el, index) => {
        el.value = this.wanggeList[index].value;
      });
    }
    this.initAdata();
    this.timerRight = setInterval(function () {
      _this.GetJRSK(false);
    }, 60000);
  },
  watch: {
    currentIndex: {
      handler(newName, oldName) {
        this.$emit("closeDPpopup", this.currentIndex);
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
  },
  destroyed() {
    clearInterval(this.timerRight);
    clearInterval(this.timerWG);
    clearInterval(this.timerTJ);
  },
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 21.68% auto 23.67%;
  // grid-template-columns: 21.68% auto 15.46%;
  grid-template-rows: 34% 34% 32%;
  .gxsj {
    position: absolute;
    left: 20px;
    top: 60px;
    font-size: 1.8rem;
    display: inline-block !important;
    padding: 10px 20px 20px 3rem;
    text-align: center;
    width: auto;
    z-index: 99999;
    color: #fff;
  }
  .pt1 {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .pt3 {
    top: -110px;
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
    background: url("~static/images/wggl/bk.png") center center no-repeat;
    background-size: 100% 100%;
  }
  .pt5 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    grid-column-end: 4;
  }
  .pt5_1 {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
    width: 440px;
    height: 1000px;
    right: 29px;
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
  // .dataAnalysis {
  //   grid-row-start: 1;
  //   grid-row-end: 4;
  //   grid-column-start: 2;
  //   grid-column-end: 3;
  // }
}
.lg_main {
  .pt1 {
    height: 500px;
    .panel_content {
      display: flex;
      width: 100%;
      height: 100%;
      background: url("~static/images/wggl/wghf2.png") 40% 20% no-repeat;
      background-size: 310px 400px;
    }
  }
  .pt2 {
    .tab {
      text-align: center;
      padding-bottom: 20px;
      li {
        display: inline-block;
        height: 2.4rem;
        line-height: 2.4rem;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 1.2rem;
        padding: 0 1.5rem;
        margin: 0 0.7rem;
      }
      li.current {
        background: #0088f1;
      }
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
    }
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
      left: 29%;
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
    }
  }
  .pt5 {
    .panelDataChart_part {
      display: flex;
      .panelPart {
        width: 50%;
        text-align: center;
        .title {
          width: 55%;
          border-top: 1px solid #345683;
          border-bottom: 1px solid #345683;
          display: flex;
          margin: 0 auto;
          justify-content: center;
          padding: 25px 0 0;
          img {
            width: 40px;
            height: 68px;
            margin-right: 10px;
            vertical-align: middle;
          }
          p {
            font-size: 3.4rem;
            color: #ffffff;
            font-weight: 400;
          }
        }
        .content {
          margin-top: 40px;
          ul {
            width: 55%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            background: url("~static/images/dsj/bg4.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            li {
              width: 125px;
              height: 125px;
              margin: 10px;
              font-size: 9rem;
              align-self: center;
              font-family: "Acens";
              display: flex;
              justify-content: space-around;
              span {
                // height: 55%;
                align-self: center;
              }
            }
          }
        }
      }
    }
  }
  .pt6 {
    // .panelDataChart {
    //   text-align: center;
    //   float: left;
    // }
    .cardPanel {
      margin-top: 55px;
      float: left;
      width: 8rem;
      border: none;
      padding-bottom: 30px;
      .container {
        > span {
          font-size: 2rem;
          //color: #FFF;
          padding: 0;
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
        color: white;
        font-size: 1.4rem;
        height: 2rem;
        line-height: 2rem;
        margin-top: 30px;
        margin-bottom: 0px;
      }
    }
  }
  .pt3 {
    width: 470px;
    .pt3changeType {
      left: 20px;
      top: 40px;
    }
    .flexRow {
      margin: 70px 0px 0px 0px;
      justify-content: space-around;
    }
    .panel_table {
      margin-top: 50px;
      .list_content {
        overflow: hidden;
      }
    }
    .list_title {
      background: #114ea9;
      border: 0px solid #114ea9;
      line-height: 30px;
      .list_cell1 {
        height: 30px;
        width: 22%;
        text-align: center;
      }
    }
    .list_cell0 {
      line-height: 20px;
      display: none;
    }
    .list_cell1 {
      line-height: 20px;
      width: 22%;
      text-align: left;
    }
    .point {
      line-height: 20px;
      width: 5px;
      height: 5px;
      background-color: #04c7ff;
      align-self: center;
      border-radius: 25%;
      align-items: center;
      vertical-align: middle;
      margin-right: 2px;
      margin-left: 2px;
    }
    .list_cell2 {
      line-height: 20px;
      width: 37%;
    }
    .list_cell3 {
      line-height: 20px;
      width: 31%;
    }
    .list_cell4 {
      line-height: 20px;
      width: 10%;
    }
    .newLi0 {
      line-height: 20px;
      background: url("~static/images/dsj/new2.png") 0 top no-repeat;
    }
    .newLi1 {
      line-height: 20px;
      background: url("~static/images/dsj/new2.png") 0 top no-repeat
        hsla(0, 0%, 100%, 0.1);
    }
    .leftPart {
      margin-top: -30px;
      .panelInfo {
        width: 130px;
        margin-top: 30px;
        margin-bottom: 30px;
        height: 100px;
        background: #043871;
        border: 1px solid #05c0ff;
        border-width: 1px 0 1px 0;
        // margin: 20px auto;
        > div {
          text-align: center;
          margin: 1px 0 10px 0;
          img {
            margin-right: 0px;
            width: 22px;
            height: 30px;
          }
        }
        > div:nth-child(1) {
          line-height: 45px;
          font-size: 15px;
        }
        > div:nth-child(2) {
          span {
            display: inline-block;
            width: 22px;
            height: 24px;
            line-height: 26px;
            font-size: 18px;
            font-weight: bold;
            background: url("~static/images/wggl/number2.png") 0 0 no-repeat;
          }
        }
      }
    }
  }
  .pt7 {
    .panel_table {
      .list_content {
        overflow: hidden;
      }
    }
    .list_cell0 {
      // display: none;
      width: 16%;
      position: relative;
      // text-align: left;
    }
    .list_cell1 {
      width: 37%;
    }
    .point {
      position: absolute;
      left: 10px;
      top: 15px;
      width: 10px;
      height: 10px;
      background-color: #04c7ff;
      align-self: center;
      border-radius: 50%;
      align-items: center;
      vertical-align: middle;
      margin-right: 20%;
    }
    .list_cell2 {
      width: 37%;
    }
    .list_cell3 {
      width: 10%;
    }
  }
  .dataAnalysis {
    width: 100%;
    height: 100%;
    // z-index: 99;
    // padding: 30px;
    .layer-body-content {
      top: 300px !important;
      right: 4499px !important;
    }
    .top {
      // width: 100%;
      display: flex;
      position: absolute;
      top: 110px;
      left: 32%;
      z-index: 99999;
      .tabs {
        margin-left: -23px;
        align-self: center;
        width: 660px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        .tab {
          margin-left: 23px;
          width: 20%;
          text-align: center;
          font-size: 14px;
          color: #50fcfc;
          background: url("~static/images/dsj/框2.png") 0 0 no-repeat;
          background-size: 100% 100%;
          padding: 1rem 0;
        }
        .currentTab {
          margin-left: 23px;
          width: 20%;
          text-align: center;
          font-size: 14px;
          color: #50fcfc;
          background: url("~static/images/dsj/框.png") 0 0 no-repeat;
          background-size: 100% 100%;
          padding: 1rem 0;
        }
      }
    }
    .content {
      width: 100%;
      height: 94%;
      display: flex;
      justify-content: space-around;
      .leftDiv {
        display: flex;
        align-self: center;
        // height: 100%;
        // margin-left:100px;
        position: absolute;
        z-index: 1;
        top: 354px;
        left: 1750px;
        .item {
          width: 623px;
          // height: 129px;
          // line-height: 129px;
          // position: absolute;
          top: 649px;
          // left: 1700px;
          text-align: center;
          background: url("~static/images/dsj/bg9.png") 0 0 no-repeat;
          background-size: 100% 100%;
          margin-bottom: 10rem;
          padding: 7px 0;
          .title {
            font-size: 4.4rem;
            color: #ffffff;
            display: inline-block;
            margin-right: 3.5rem;
            height: 100px;
            line-height: 100px;
          }
          .count {
            color: #cff309;
            font-size: 8.8rem;
            height: 100px;
            line-height: 100px;
          }
        }
        .wanggeDiv {
          margin: 10px 0;
          display: flex;
          .item {
            cursor: pointer;
            width: 274px;
            height: 91px;
            line-height: 91px;
            text-align: center;
            font-size: 4rem;
            background: url("~static/images/dsj/wggl_tab.png") 0 0 no-repeat;
            background-size: 100% 100%;
            margin: 0 0 90px 0;
            span {
              background-image: -webkit-linear-gradient(top, #ffffff, #30a9e5);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          .item-checked {
            background: url("~static/images/dsj/wggl_tab_checked.png") 0 0
              no-repeat;
          }
        }
      }
      .rightDiv {
        // width: 100%;
        // width: 47%;
        position: absolute;
        z-index: 1;
        top: 178px;
        left: 1953px;
        // padding: 20px 140px;
        margin: 30px 130px 0 0;
        height: 1600px;
        // background: url("~static/images/dsj/边框.png") 0 0 no-repeat;
        // background-size: 100% 100%;
        .bottom {
          // background: url("~static/images/dsj/边框.png") 0 0 no-repeat;
          // padding: 20px 140px;
          background-size: 100% 100%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }
        .wanggeDiv {
          margin: 114px 0 0 -480px;
          .item {
            width: 200px;
            cursor: pointer;
            // width: 274px;
            height: 91px;
            line-height: 91px;
            text-align: center;
            font-size: 4rem;
            background: url("~static/images/dsj/wggl_tab.png") 0 0 no-repeat;
            background-size: 100% 100%;
            margin-bottom: 55px;
            span {
              background-image: -webkit-linear-gradient(top, #ffffff, #30a9e5);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          .item-checked {
            background: url("~static/images/dsj/wggl_tab_checked.png") 0 0
              no-repeat;
          }
        }
      }
      .wanggeDiv {
        margin: 196px 0;
        // display: block;
        .item {
          cursor: pointer;
          width: 109px;
          height: 37px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          background: url("~static/images/dsj/wggl_tab.png") 0 0 no-repeat;
          background-size: 100% 100%;
          margin: 0 0 55px 0;
          span {
            background-image: -webkit-linear-gradient(top, #ffffff, #30a9e5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .item-checked {
          background: url("~static/images/dsj/wggl_tab_checked.png") 0 0
            no-repeat;
          background-size: 100% 100%;
          // background-position: 12px 12px;
        }
      }
    }
  }
}
.menuItem1 {
  float: right;
  right: 270px;
  top: -40px;
  cursor: pointer;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 9999;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.14);
  border: 0.5px solid #ffffff42;
  margin-right: 20px;
}
.pt5_1 {
  .flexRow {
    float: left;
    margin-left: 0px;
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
  .video-content {
    overflow: auto;
    max-height: 1000px;
  }
  .panelCard {
    width: 430px;
    height: 240px;
    margin-bottom: 20px;
    background: url("~static/images/dsj/zhdd_video_bg.png") 0 0 no-repeat;
    background-size: 100% 100%;
    padding: 0px 0px 44px 0px;
    iframe {
      width: 95%;
      height: 240px;
      margin-top: 15px;
      margin-left: 15px;
    }
  }
}
.pt5 {
  .tab {
    top: 120px;
    left: 230px;
    position: absolute;
    display: flex;
    > div {
      text-align: center;
      line-height: 45px;
      display: block;
      width: 100px;
      border: 1px solid #0a5a8f;
      color: #0d8ee0;
      border-radius: 2px;
      font-size: 24px;
      cursor: pointer;
    }
    .active {
      border: 1px solid #04d9fa;
      color: #ffffff;
      background: #005190;
    }
  }
  .panel_content {
    position: relative;
    margin-top: 70px;
    .leftPart {
      width: 400px;
      .panelInfo {
        background: #043871;
        border: 1px solid #05c0ff;
        border-width: 1px 0 1px 0;
        margin: 20px auto;
        > div {
          text-align: center;
          margin: 20px 0 20px 0;
          img {
            margin-right: 15px;
          }
        }
        > div:nth-child(1) {
          line-height: 45px;
          font-size: 30px;
        }
        > div:nth-child(2) {
          span {
            display: inline-block;
            width: 45px;
            height: 48px;
            line-height: 48px;
            font-size: 33px;
            font-weight: bold;
            background: url("~static/images/wggl/number2.png") 0 0 no-repeat;
          }
        }
      }
    }
    .rightPart {
      width: 700px;
      margin-left: 70px;
      height: 330px;
      background: url("~static/images/wggl/gdczyj.png") center center no-repeat;
      position: relative;
      .panelAround {
        position: absolute;
        width: 187px;
        height: 202px;
        background: url("~static/images/wggl/gdcz.png") 0 0 no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        // padding-top: 45px;
        p:nth-child(1) {
          font-size: 20px;
          line-height: 25px;
          padding-top: 10px;
        }
        p:nth-child(2) {
          font-size: 26px;
          color: #fee74b;
          span {
            font-size: 28px;
            font-weight: bold;
          }
        }
      }
      .panelAround:nth-child(1) {
        top: -115px;
        left: 265px;
      }
      .panelAround:nth-child(2) {
        top: -30px;
        left: 50px;
      }
      .panelAround:nth-child(3) {
        top: 140px;
        left: 50px;
      }
      .panelAround:nth-child(4) {
        top: 220px;
        left: 265px;
      }
      .panelAround:nth-child(5) {
        top: 140px;
        left: 470px;
      }
      .panelAround:nth-child(6) {
        top: -30px;
        left: 470px;
      }
    }
  }
}
.ajtop {
  position: absolute;
  left: 1200px;
  top: 220px;
}
</style>
