<template>
  <div class="lg_main">
    <!-- <div class="gxsj">数据更新于{{ updatetime }}</div> -->
    <div class="panel pt1">
      <div class="panel_header" style="width: 93.32%">
        <div class="panel_headerTitle">{{ pt1Data.title }}</div>
      </div>
      <div class="panel_content">
        <span
          v-for="(item, index) in pt1Data.list"
          :key="'line' + index"
          :class="'pt1-row-line pt1-row-' + index"
          >{{ item.name }}</span
        >
        <div class="pt1-vtitle">分级分类指导</div>
        <template v-for="(item, index) in pt1Data.list">
          <div
            :class="'pt1-section pt1-section-' + index"
            :key="'sectionpt1' + index"
          >
            <div
              v-for="(d, i) in item.items"
              class="content-text"
              :key="'item10' + i"
            >
              <span :key="index + '-' + i">{{ d.vlaue }}</span>
              <span> {{ d.unit }}</span>
              <span> {{ d.name }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header" style="">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ "党员结构统计" }}
        </div>
      </div>
      <div class="tab">
        <ul>
          <li
            v-for="(item, index) in pt2Tabdata"
            :class="pt2showList == index ? 'current' : ''"
            @click="changePt2(index)"
            :key="index"
          >
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="showTabBox" v-if="pt2showList == 1">
        <div
          v-for="(item, index) in tabdata"
          :key="'tab' + index"
          @click="loaddytj(index)"
          class="label"
          :class="showList1 == index ? 'active' : ''"
        >
          {{ item }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart" v-if="pt2showList == 0">
          <div class="panelDataChart_part">
            <div id="chartSAX" style="height: 220px; width: 98%"></div>
          </div>
        </div>
        <div class="panelDataChart" v-if="pt2showList == 1">
          <div class="panelDataChart_part">
            <div id="chartXL" style="height: 250px; width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt3">
      <div class="tabBox">
        <div
          :class="[{ active: pt3TabIndex == index }, 'tabs']"
          v-for="(item, index) in pt3Tabdata"
          :key="index"
          @click="changePt3Tab(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="panel_content" v-if="pt3TabIndex == 0">
        <div class="tab">
          <ul>
            <li
              v-for="(item, index) in xdzbTabdata"
              :key="'pt8' + index"
              :class="xdzbTabIndex == index ? 'current' : ''"
              @click="xdzbTabIndex = index"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="contentBox">
          <div v-show="xdzbTabIndex == 0">
            <vue-seamless-scroll
              :data="xdzbData.hzList"
              style="height: 230px; overflow: hidden"
              :class-option="autoScrollOption"
            >
              <ul class="xdzb-list">
                <li
                  v-for="(item, index) in xdzbData.hzList"
                  :key="'xdzb' + index"
                >
                  <img src="~static/images/djyl/dang.png" alt />
                  <label>{{ item.支部名称 }}</label>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
          <div v-show="xdzbTabIndex == 1">
            <vue-seamless-scroll
              :data="xdzbData.hpList"
              style="height: 230px; overflow: hidden"
              :class-option="autoScrollOption"
            >
              <ul class="xdzb-list">
                <li
                  v-for="(item, index) in xdzbData.hpList"
                  :key="'xdzb' + index"
                  :title="item.时间 + ' ' + item.评称 + ' · ' + item.支部名称"
                >
                  <img src="~static/images/djyl/star.png" alt />
                  <label>{{
                    item.时间 + " " + item.评称 + " · " + item.支部名称
                  }}</label>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
      <div class="panel_content" v-if="pt3TabIndex == 1">
        <swiper class="swiper" ref="mySwiper" :options="swiperOption">
          <swiper-slide
            v-for="(item, index) in xjdzzlist"
            :key="'mySwiper' + index"
          >
            <div class="label">{{ item["党组织名称"] }}</div>
            <div class="xjdzz">
              <div
                class="dzzzp"
                @click.prevent="openxjdzz(item.summary, item['党组织名称'])"
              >
                <img class="dzz" :src="item.img" />
              </div>
              <div class="dzzxx">
                <div class="lb">
                  <div class="name">
                    <span>{{ "类别:" }}</span>
                  </div>
                  <div class="value">
                    <span>{{ item["类别"] }}</span>
                  </div>
                </div>
                <div class="dzzmc">
                  <div class="name">
                    <span>{{ "党组织名称:" }}</span>
                  </div>
                  <div class="value">
                    <span>{{ item["党组织名称"] }}</span>
                  </div>
                </div>
                <div class="sjxm">
                  <div class="name">
                    <span>{{ "书记姓名:" }}</span>
                  </div>

                  <div class="value">
                    <span>{{ item["书记姓名"] }}</span>
                  </div>
                </div>
                <div class="lxdh">
                  <div class="name">
                    <span>{{ "联系电话:" }}</span>
                  </div>
                  <div class="value">
                    <span>{{ item["联系电话"] }}</span>
                  </div>
                </div>
                <div class="sj">
                  <div class="name">
                    <span>{{ "时间:" }}</span>
                  </div>
                  <div class="value">
                    <span>{{ item["时间"] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div
            class="swiper-button-prev"
            slot="button-prev"
            @click="prev"
          ></div>
          <div
            class="swiper-button-next"
            slot="button-next"
            @click="next"
          ></div>
        </swiper>
      </div>
      <div class="panel_content" v-if="pt3TabIndex == 2">
        <div class="panel_table" @click="openqdxq($event)">
          <vue-seamless-scroll
            v-if="AJListPhoto.length > 0"
            :data="AJListPhoto"
            style="height: 265px; overflow: hidden"
            :class-option="autoScrollImagOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <div class="flexRow">
                  <div
                    class="imgPanel"
                    v-for="(item, key) in AJListPhoto"
                    :key="'imgPanel' + key"
                  >
                    <img
                      :data-num="item.summary"
                      :src="item.img"
                      :accessKey="item.id"
                    />
                    <span class="name">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
    <div class="map pt4">
      <iframe
        :src="this.GLOBAL.weburl_Onemap + '/map/mapcontainersbzb.html?type=djyl&xUserName=zhzs_djyl&right=454'"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height:100%;"
        id="mapIframe"
      ></iframe>
    </div>
    <div class="panel pt5">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[4]["title"] }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartSH"
              style="height: 200px; width: 100%; margin-top: 0px"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt6">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[6]["title"] }}
        </div>
      </div>
      <div class="panel_content">
        <div class="tab" border="0">
          <ul>
            <li
              v-if="item.title == data[6]['title']"
              v-for="(item, index) in data"
              :class="showList == index ? 'current' : ''"
              @click="showList = index"
              :key="index"
            >
              <span>{{ item.subtitle }}</span>
            </li>
          </ul>
        </div>

        <div class="panel_table" v-if="showList == 6&&dataTableDYJFtop10.rows!=''">
          <div class="list_title">
            <span
              :class="'list_cell' + cellKey"
              v-for="(cell, cellKey) in dataTableDYJFtop10.cells"
              :key="cellKey"
              >{{ cell }}</span
            >
          </div>
          <vue-seamless-scroll
            :data="dataTableDYJFtop10.rows"
            style="height: 230px; overflow: hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row, rowKey) in dataTableDYJFtop10.rows"
                    :key="rowKey"
                  >
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
        <div class="panel_table" v-if="showList == 12&&dataTableDYJFtop_10.rows!=''">
          <div class="list_title">
            <span
              :class="'list_cell' + cellKey"
              v-for="(cell, cellKey) in dataTableDYJFtop_10.cells"
              :key="cellKey"
              >{{ cell }}</span
            >
          </div>
          <vue-seamless-scroll
            :data="dataTableDYJFtop_10.rows"
            style="height: 230px; overflow: hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row, rowKey) in dataTableDYJFtop_10.rows"
                    :key="rowKey"
                  >
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
      </div>
    </div>

    <div class="panel pt7">
      <div class="panel_header">
        <!-- <div class="panel_headerTitle" v-if="data.length > 0">{{ data[7]['title'] }}</div>全方位党建引领 -->
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[18].title }}
        </div>
      </div>
      <div class="panel_content" v-if="data.length > 0">
        <div class="list-container">
          <div
            v-for="(item, index) in data[18].list"
            :key="'dot' + index"
            :class="['list-line', { active: dszjIndex == index }]"
            @click="LocationShape(item, index, 'js_q_dszj_location')"
          >
            {{ item.名称 }}
          </div>
        </div>
        <div class="card-container" v-if="data[18].list!=''">
          <vue-seamless-scroll
            v-if="data[18].list[dszjIndex].imgs.split('|').length > 0"
            :data="data[18].list[dszjIndex].imgs.split('|')"
            :class-option="optionLeft"
            class="seamless-img"
          >
            <ul class="seamless-img-card">
              <li
                class="img-container"
                v-for="(item, index) in data[18].list[dszjIndex].imgs.split(
                  '|'
                )"
                :key="'img' + index"
                v-if="
                  index < data[18].list[dszjIndex].imgs.split('|').length - 1
                "
              >
                <img
                  :src="data[18].list[dszjIndex].baseUrl + '/' + item"
                  alt=""
                />
              </li>
            </ul>
          </vue-seamless-scroll>
          <div></div>
          <div class="card-text">{{ data[18].list[dszjIndex].简介 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 智慧乡镇:党建引领
import echarts from "echarts";
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";
import vueSeamlessScroll from "vue-seamless-scroll";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      dszjIndex: 0,
      pt3TabIndex: 0,
      pt1Data: {
        title: "四驾马车党建工作格局",
        list: [],
      },
      xjdzzlist: [],
      swiperOption: {
        // 参数选项,显示小点
        // pagination: ".swiper-pagination",
        // 循环
        // loop: true,
        // 每张播放时长3秒，自动播放
        // autoplay: 6000,
        // 滑动速度
        // speed: 1500,
        // delay:1000
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      lxhlyData: {},
      rstjdata: {},
      xlfxdata: {},
      tabdata: ["人数统计", "学历统计"],
      xdzbTabdata: ["汇总情况", "获评情况"],
      pt2Tabdata: ["年龄性别分析", "党员人数分析"],
      pt3Tabdata: ["行动支部", "苏州市先锋社区", "党员风采"],
      xdzbTabIndex: 0,
      xdzbData: {
        hzList: [],
        hpList: [],
      },
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 59,
      },
      imagelist: [],
      AJListPhoto: [],
      updatetime: "",
      data: [],
      showList: 6,
      showList1: 0,
      pt2showList: 0,
      autoScrollImagOption: {
        autoPlay: true, // 自动播放
        step: 0.6, // 滚动速度（步长）
        limitMoveNum: 1, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 2, // 0向下，1向上，2向左，3向右
        singleWidth: 150,
      },

      dataTableDYJFtop10: {
        cells: [],
        rows: [],
      },
      dataTableDYJFtop_10: {
        cells: [],
        rows: [],
      },
      zbList: [],
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20,
      },
      autoNoScrollOption: {
        autoPlay: false, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20,
      },
    };
  },
  methods: {
    changePt3Tab(key) {
      this.pt3TabIndex = key;
    },
    LocationShape(item, index, xkey) {
      console.log(999);
      switch (xkey) {
        case "js_q_dszj_location":
          this.dszjIndex = index;
          break;
      }
      var obj = {
        xkey: xkey,
        key: item.id || item.objectid,
      };
      this.$DsjCommon.LocationShape(obj); // 定位地图
    },
    openqdxq(e) {
      let key = e.target.getAttribute("data-num");
      if (key) {
        this.$emit("showDpCommonRichtext", key);
      }
    },
    openxjdzz(key, title) {
      var richPopInfo = {
        title: title,
        src: "",
         width: 987,
          height: 825,
        left: "50%",
        top: "50%",
        richtext: key,
      };
      this.$emit("showDpCommonRichtextChild", richPopInfo);
    },
    prev() {
      console.log(this.$refs.mySwiper);
      this.$refs.mySwiper.swiper.slidePrev();
    },
    next() {
      this.$refs.mySwiper.swiper.slideNext();
    },
    changePt2(key) {
      var _this = this;
      _this.pt2showList = key;
      _this.$nextTick(function () {
        if (document.getElementById("chartSAX")) {
          var charts = echarts.init(document.getElementById("chartSAX"));
          charts.clear();
          var saxOption = echartsUtils.getEchartsConfig_EX2(
            this.data[2].chartType.toLowerCase(),
            this.data[2].xAxis,
            this.data[2].data,
            this.data[2].subtitle,
            this.data[2].xUnit,
            this.data[2].legend
          );
          // saxOption.title.text = this.data[2].subtitle
          saxOption.title.left = "right";
          saxOption.title.top = "top";
          saxOption.legend = {
            left: 20,
            top: 2,
            itemHeight: 12,
            itemWidth: 12,
            itemGap: 12,
            align: "left",
            orient: "horizontal",
            textStyle: {
              fontSize: 12,
              color: "#ffffff",
            },
          };
          saxOption.series.forEach((element) => {
            element.label = {
              normal: {
                show: true,
                position: "right",
                fontSize: 12,
                fontWeight: "normal",
                color: "#fff",
                offset: [5, 2],
              },
            };
          });
          saxOption.title.textStyle.fontSize = "12";
          saxOption.xAxis.axisLabel.rotate = 0;
          this.timer2 = echartsUtils.chartInit("chartSAX", saxOption, "1");
        } else {
          var charts = echarts.init(document.getElementById("chartXL"));
          charts.clear();
          this.loaddytj(0);
        }
      });
    },
    loaddytj(key) {
      console.log(key, 888);
      var _this = this;
      this.showList1 = key;
      switch (key) {
        case 0:
          this.lxhlyData = this.rstjdata;
          break;
        case 1:
          this.lxhlyData = this.xlfxdata;
          break;
      }
      this.$nextTick(function () {
        _this.initColumnDY(this.lxhlyData);
      });
    },
    initColumnDY(data) {
      if (document.getElementById("chartXL")) {
        var charts = echarts.init(document.getElementById("chartXL"));
        charts.clear();
      }
      var qsOption_xl = echartsUtils.getEchartsConfig(
        data.chartType.toLowerCase(),
        data.xAxis,
        data.data,
        data.subtitle,
        data.xUnit
      );
      // qsOption_xl.title.text = data.subtitle
      qsOption_xl.title.left = "right";
      qsOption_xl.title.top = "top";
      // qsOption.yAxis.min = 3000;
      qsOption_xl.title.textStyle.fontSize = "12";
      qsOption_xl.xAxis.axisLabel.rotate = 40;
      this.timer6 = echartsUtils.chartInit("chartXL", qsOption_xl, "1");
    },
    initUpdate() {
      webAPI.server
        .get({
          url:
            this.GLOBAL.weburl_update + "&type=djyl&appid=" + this.GLOBAL.Appid,
        })
        .then((res) => {
          if (res.data) {
            this.updatetime = res.data[0].time;
          }
        });
    },
    getDZZGK() {
      webAPI.server
        .get({
          url: this.GLOBAL.weburl_Onemap + "/handler/dsj/zhdj.ashx",
          // url:"static/json/zhxz/yjson/zhdj.json"
        })
        .then((res) => {
          var data = res.data;
          if (data) {
          }
        });
    },
    startInterval() {
      this.getDZZGK();
      this.timeInterval = setInterval(() => {
        this.getDZZGK();
      }, 10000);
    },
    setMap(id) {
      // console.log(id, 'sdsdkjhk')
      $("iframe")[0]
        .contentWindow.$("#layerControl .treeContainer .clearLayers")
        .click();

      $("iframe")[0].contentWindow.GeoneMap.openLayerByName(id);
      $("iframe")[0].contentWindow.$("#toolsContainer").style.right = "1252px";
      $("iframe")[0].contentWindow.$(".toolbtnsGroup").style.right = "1292px";
    },
  },
  computed: {
    optionLeft() {
      return {
        autoPlay: true, // 自动播放
        direction: 2,
        limitMoveNum: 1,
        waitTime: 1,
        singleWidth: 400,
        waitTime: 1000,
        step: 0.5, // 数值越大速度滚动越快
      };
    },
  },
  components: { countTo, vueSeamlessScroll, swiper, swiperSlide },
  mounted() {
    //
    // this.initUpdate();
    this.startInterval();
    webAPI.server
      .get({
        // url: "static/json/zhxz/yjson/djyl.json",
        url: this.GLOBAL.weburl_Onemap + '/handler/dsj/djyl.ashx'
      })
      .then((res) => {
        if (res.data.length === 0) return;

        this.data = res.data;

        this.xdzbData.hzList = this.data[15].list;
        this.xdzbData.hpList = this.data[16].list;

        this.pt1Data.title = this.data[17].title;
        this.pt1Data.list = [];
        var preItemName = null;
        for (var i = 0; i < this.data[17].list.length; ++i) {
          var item = this.data[17].list[i];
          if (item.name1 != preItemName) {
            preItemName = item.name1;
            this.pt1Data.list.push({
              name: item.name1,
              items: [],
            });
          }
          this.pt1Data.list[this.pt1Data.list.length - 1].items.push({
            name: item.name2,
            vlaue: item.value,
            unit: item.unit,
          });
        }
        console.log(this.pt1Data.list);

        this.rstjdata = this.data[3];
        this.changePt2(0);
        // this.loaddytj(0);
        this.xlfxdata = this.data[13];
        this.xjdzzlist = this.data[14].list;
        // 党员积分-排名靠前top5
        this.dataTableDYJFtop10.cells = this.data[6].cells;
        this.dataTableDYJFtop10.rows = this.data[6].rows;
        // console.log(this.dataTableDYJFtop10, '12233')
        // 党员积分-排名靠后top5
        this.dataTableDYJFtop_10.cells = this.data[12].cells;
        this.dataTableDYJFtop_10.rows = this.data[12].rows;
        console.log(this.data[4].chartType.toLowerCase(), 456);
        var shOption = echartsUtils.getEchartsConfig_EX2(
          this.data[4].chartType.toLowerCase(),
          this.data[4].xAxis,
          this.data[4].data[0],
          this.data[4].title,
          this.data[4].xUnit,
          this.data[4].legend,
          [this.data[4].stack]
        );
        shOption.legend = {
          orient: "horizontal",
          right: 10,
          top: -5,
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 20,
          align: "left",
          textStyle: {
            fontSize: 14,
            color: "#6ef8ff",
          },
        };
        shOption.series.forEach((element) => {
          element.label = {
            normal: {
              show: false,
            },
          };
        });
        // shOption.series[0]['barWidth'] = 35
        shOption.xAxis.axisLabel.rotate = 0;
        shOption.grid = {
          left: "5%",
          right: "5%",
          bottom: "2%",
          top: "8%",
          containLabel: true,
        };
        let colorList = ["#50CC9A", "#B6F504", "#29c0ee", "#eec83c", "#62ee26"];
        let shOptionCopy = JSON.parse(JSON.stringify(shOption));
        shOptionCopy.series.forEach((item, index) => {
          item.itemStyle.normal.color = colorList[index];
        });
        this.timer4 = echartsUtils.chartInit("chartSH", shOptionCopy, "1");
        this.AJListPhoto = this.data[19].list;
      });
  },
  destroyed() {
    clearInterval(this.timeInterval);
  },
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 25% auto 25%;
  grid-template-rows: 29.5% 36.5% 33.5%;
  // background: url("~static/images/djyl/内容.png") center center no-repeat;
  .panel {
    // outline: 1px dashed #ff1493;
  }
  .gxsj {
    position: absolute;
    left: 874px;
    top: 165px;
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
    margin-right: 14px;
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
  .pt8 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    grid-column-end: 4;
  }

  .pt9 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
  }

  .pt10 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 4;
  }
}
.lg_main {
  .pt1 {
    height: 338px;
    .panel_content {
      height: 78%;
      background: url("~static/images/djyl/pt1-bg.png") 30px 13px no-repeat;
      position: relative;

      .pt1-row-line {
        position: absolute;
        width: 106px;
        height: 32px;
        line-height: 32px;
        background: linear-gradient(to right, #fff 10%, #04c7ff);
        font-size: 14px;
        font-weight: bold;
        -webkit-background-clip: text;
        color: transparent;
      }
      .pt1-row-0 {
        text-align: center;
        left: 142px;
        top: 18px;
      }
      .pt1-row-1 {
        text-align: center;
        left: 142px;
        top: 78px;
      }
      .pt1-row-2 {
        text-align: center;
        left: 142px;
        top: 136px;
      }
      .pt1-row-3 {
        text-align: center;
        left: 142px;
        top: 196px;
      }
      .content-text {
        text-align: left;
      }
      .pt1-section {
        position: absolute;
        font-size: 12px;
        left: 370px !important;
        width: 200px;
        span {
          &:nth-child(1) {
            // font-size: 26px;
            font-size: 12px;
            color: #ffe34f;
          }
          &:nth-child(2) {
            font-size: 12px;
            // font-size: 18px;
          }
          &:nth-child(3) {
            font-size: 12px;
            // font-size: 18px;
          }
        }
      }

      .pt1-section-0 {
        top: 26px;
        // right: 250px;
      }

      .pt1-section-1 {
        top: 78px;
        // right: 160px;
        width: 198px;
      }

      .pt1-section-2 {
        top: 145px;
        // right: 130px;
        width: 227px;
      }

      .pt1-section-3 {
        top: 197px;
        // right: 151px;
        width: 220px;
      }

      .pt1-vtitle {
        position: absolute;
        font-size: 16px;
        width: 30px;
        text-align: center;
        left: 282px;
        top: 60px;
        font-weight: bold;
      }
    }
  }
  .pt2 {
    height: 318px;
    top: 46px;
    position: relative;
    .panel_header {
      margin-top: 7px;
    }
    .tab {
      position: absolute;
      right: 150px;
      top: 56px;
      text-align: center;
      // margin-bottom: 10px;
    }
    .showTabBox {
      position: absolute;
      // width: 70px;
      height: 40px;
      top: 54px;
      right: 24px;
      // border: 1px solid;
      text-align: right;
      .label {
        padding-left: 24px;
        cursor: pointer;
        font-size: 12px;
        margin: 4px 0;
        background: url("~static/images/djyl/未选中.png") 0px center no-repeat;
        //  background-size: 100% 100%;
        &.active {
          background: url("~static/images/djyl/选中.png") 0px center no-repeat;
        }
      }
      .tab {
        position: absolute;
        right: 20px;
        top: 56px;
      }
    }
    .panel_content {
      height: 225px;
      margin-top: 46px;
    }
  }
  .pt3 {
    .tabBox {
      width: 100%;
      height: 40px;
      font-weight: bold;
      background: url("~static/images/dsj/biaoti.png") center center no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .tabs {
        width: 163px;
        height: 34px;
        line-height: 32px;
        font-size: 18px;
        text-align: center;
        &.active {
          background: url("~static/images/djyl/选中2.png") center center
            no-repeat;
          background-size: inherit;
        }
      }
    }
    .panel_content {
      width: 100%;
      height: 294px;
      // 行动支部
      .tab {
        position: absolute;
        left: 133px;
        margin: 6px 0;
      }
      .contentBox {
        width: 100%;
        height: 100%;
        padding-top: 46px;
        box-sizing: border-box;
        .xdzb-list {
          padding: 0px 35px;
          li {
            background-image: url("~static/images/djyl/left-line.png");
            background-size: contain;
            background-repeat: no-repeat;
            line-height: 30px;
            font-size: 14px;
            padding-left: 25px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            img {
              margin-right: 10px;
              width: 25px;
              height: 15px;
            }
          }
        }
      }
      // 党员风采
      .panel_table {
        height: 280px;
        margin-top: 20px;
        .flexRow {
          margin-top: 6px;
        }
        .list_content {
          overflow: hidden;
          height: 280px;
          .imgPanel {
            cursor: pointer;
            width: 138px;
            //text-align: center;
            padding: 24px 8px;
            //box-sizing: border-box;
            background: url("~static/images/dsj/zp.png") 0 0 no-repeat;
            background-size: 100% 100%;
            // border: 1px solid #02D3FF;
            margin: 0 6px;
            img {
              width: 100%;
              height: 150px;
            }
            .name {
              font-size: 2rem;
              margin-top: 10px;
              width: 100%;
              text-align: center;
              // margin-left: 46px;
            }
          }
          .flexRow1 {
            //height:326px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }
          li {
            background: none;
            position: relative;
            padding: 4px 0;
            &:before {
              content: "";
              display: block;
              height: 20px;
              width: 1px;
              background: #273977;
              left: 5px;
              top: 0px;
              position: absolute;
            }
          }
        }
        .list_title {
          display: none;
        }
      }
      // 先锋社区
      .swiper {
        height: 100%;
        width: 100%;
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-weight: bold;
          font-size: 12px;
          .label {
            background: url("~static/images/dsj/biaoti.png") center center
              no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 20px;
            width: 80%;
            height: 24px;
            line-height: 22px;
            font-size: 1.4rem;

            font-weight: bold;
            // border: 1px solid;
          }
          .xjdzz {
            width: 90%;
            height: 61%;
            display: flex;
            .dzzzp {
              width: 50%;
              height: 100%;
              cursor: pointer;
              .dzz {
                width: 100%;
                height: 90%;
                padding-top: 20px;
              }
            }
            .dzzxx {
              width: 45%;
              height: 100%;
              & > div {
                margin-bottom: 9px;
                margin-left: 13px;
                line-height: 19px;
              }
              .lb {
                margin-top: 18px;
              }
              .name {
                width: 90px;
                text-align: left;
                font-size: 1.4rem;
                font-weight: normal;
                color: #ffe34f;
                float: left;
                display: block;
                letter-spacing: 1px;
                > span {
                  font-size: 1.4rem;
                }
              }
              .value {
                display: block;
                text-align: left;
                font-size: 1.4rem;
                letter-spacing: 1px;
                margin-left: 90px;
                > span {
                  font-size: 1.4rem;
                }
              }
            }
          }
        }
        /deep/ .swiper-pagination {
          .swiper-pagination-bullet {
            width: 20px;
            height: 20px;
            margin-left: 20px;
            display: inline-block;
            border-radius: 100%;
            opacity: 0.6;
            background: #007aff !important;
          }
          .swiper-pagination-bullet-active {
            // width: 0.8rem !important;
            background: #007aff;
            opacity: 1;
          }
        }
      }
    }
  }
  .pt4 {
    position: relative;
    box-sizing: border-box;
  }
  .pt5 {
  }
  .pt6 {
    .panel_header {
      margin-top: 5px;
    }
    .tab {
      position: absolute;
      right: 150px;
      top: 54px;
      text-align: center;
      margin-bottom: 10px;
    }
    span {
      font-size: 14px;
    }
    .panel_table {
      width: 94%;
      margin: 52px 0 10px 0 ;
      height: 100px;
    }
    .list_title{
      height: 36px;
      font-size: 14px;
      background:#114EA9;
      text-align: center;
       border:0px solid #114EA9;
      line-height:32px;
      }
    .list_cell0 {
      line-height: 22px;
      width: 30%;
    }
    .list_cell1 {
      line-height: 22px;
      width: 20%;
    }
    .list_cell2 {
            line-height: 22px;
      width: 20%;
    }
    .list_cell3 {
            line-height: 22px;
      width: 15%;
    }
    .list_cell4 {
            line-height: 22px;
      width: 15%;
    }
  }
  .pt7 {
    position: relative;
    // top: -100px;
    .panel_header {
      margin: 10px 0 0 0;
    }
    .panel_content {
      height: 288px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .list-container {
        overflow: auto;
        max-height: 288px;
        margin-top: 20px;
        .list-line {
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: 23px;
          padding-right: 0px;
          font-size: 12px;
          font-weight: bold;
          font-style: italic;
          line-height: 36px;
          cursor: pointer;
          &:before {
            content: "";
            position: absolute;
            top: 5px;
            left: 0;
            width: 24px;
            height: 24px;
            background: url("~static/images/djyl/dot.png") center center
              no-repeat;
            background-size: 100% 100%;
          }
          &.active {
            color: #fee74b;
          }
          &.active:before {
            background: url("~static/images/djyl/dot-selected.png") center
              center no-repeat;
          }
        }
      }
      .card-container {
        width: 254px;
        height: 251px;
        margin-right: 31px;
        background: url("~static/images/djyl/dszj-bk.png") center center
          no-repeat;
        background-size: 100% 100%;
        .seamless-img {
          overflow: hidden;
          height: 120px;
          width: 90%;
          margin: 18px auto 0;
          ul.seamless-img-card {
            // width: 200px;
            li {
              float: left;
              margin-right: 22px;
            }
          }
        }
        .img-container {
          width: 206px;
          height: 120px;
          background: url("~static/images/djyl/img-bk.png") center center
            no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 22px;
          img {
            width: 206px;
            height: 120px;
            border: 1px solid #04c7ff;
          }
        }
        .card-text {
          margin-top: 20px;
          font-size: 12px;
          color: #70dff7;
          text-indent: 2em;
          height: 78px;
          line-height: 20px;
          overflow: auto;
          padding-left: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
  .popdiv {
    display: none;
    opacity: 1;
    z-index: 999;
    width: 300px;
    height: 200px;
    position: absolute;
    right: 90px;
    top: 500px;
    border: 1px solid #1b3d9e;
    background: rgba(12, 46, 116, 0.95);
    .title {
      height: 34px;
      line-height: 32px;
      border-radius: 18px;
      border: 1px solid #3fabed;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      box-sizing: border-box;
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
    .popbg {
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
      &:before {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-left: 2px solid #3fabed;
        border-top: 2px solid #3fabed;
        position: absolute;
        left: -2px;
        top: -2px;
      }
      &:after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-right: 2px solid #3fabed;
        border-top: 2px solid #3fabed;
        position: absolute;
        right: -2px;
        top: -2px;
      }
    }
    .corner {
      &:before {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-left: 2px solid #3fabed;
        border-bottom: 2px solid #3fabed;
        position: absolute;
        left: -2px;
        bottom: -2px;
      }
      &:after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-right: 2px solid #3fabed;
        border-bottom: 2px solid #3fabed;
        position: absolute;
        right: -2px;
        bottom: -2px;
      }
    }
  }
}

.swiper-button-next {
  right: 12px;
  width: 30px;
  height: 30px;
}
.swiper-button-prev {
  left: 12px;
  width: 30px;
  height: 30px;
}
</style>
