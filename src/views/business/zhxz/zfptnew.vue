<template>
  <div class="lg_main" v-if="data.length > 0">
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          <div>{{ data[0].title }}</div>
          <div
            v-if="bkclickshowDetails"
            class="close"
            @click="bkclickshowDetails = false"
          ></div>
        </div>
      </div>
      <div class="panel_content">
        <div
          class="main-content"
          v-if="bkajtjList.length > 0 && bkclickshowDetails"
        >
          <div
            v-for="(item, index) in bkajtjList"
            :key="'ajbj' + index"
            class="label-item"
            @click="handlerDetails(item.name)"
          >
            <div class="count">{{ item.value }}</div>
            <div class="title">{{ item.name }}</div>
          </div>
        </div>
        <div class="main-content2" v-else>
          <div
            class="jwsjtj-item"
            v-for="(item, index) in ajbjvListComputedData"
            :key="'jwsjtj' + index"
          >
            <div class="count">{{ item.count }}</div>
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[1].title }}
        </div>
        <panel-change-tab-new
          class="pt2changeType"
          :changeType="parseInt(pt2changeType) - 1"
          :data="['当日', '当月', '当年']"
          changekey="pt2changeType"
          @ChangeTab="ChangeTabData"
        ></panel-change-tab-new>
      </div>
      <div class="subtitle">
        <span>{{ data[2].subtitle }}</span>
      </div>
      <div class="subtitle">
        <span>{{ data[1].subtitle }}</span>
      </div>
      <div class="panel_content">
        <!-- <div class="bg-animate"></div> -->
        <div class="rowBox" v-for="(item, index) in pt9data.list" :key="index">
          <div class="title">{{ item.name }}</div>
          <div class="bottomRow">
            <div class="progress-bar">
              <div
                class="progress-value"
                :style="{ width: item.value * 3.5 + 'px' }"
              ></div>
            </div>
            <div class="value">{{ item.value }}
            <span class="xunit">件</span>
            </div>
            
          </div>
        </div>
        <div class="flexRow">
          <!-- <div class="containerbg001" v-if="ajlyChangeList.length > 0">
            <div
              class="container-item"
              v-for="(item, index) in ajlyChangeList"
              :key="index"
            >
              <div class="container-value">
                <span>{{ item.value }}</span>
                <span>{{ item.xunit }}</span>
              </div>
              <div class="container-name">{{ item.name }}</div>
            </div>            
          </div> -->

          <m-echarts-c
            id="chart2"
            style="
              top: -193px;
              left: 63px;
              width: 225px;
              height: 256px;
              position: relative;
            "
            v-if="pt2changechart"
            :autoplay="false"
            :data="ajlxChangeData"
            class="charts-container2"
          ></m-echarts-c>
        </div>
      </div>
    </div>
    <div class="panel pt3">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[12].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartgpzfsx"
              style="width: 290px; height: 301px; left: 79px; top: -30px"
            ></div>
          </div>
          <panel-change-tab-new
            class="pt3changeType"
            :changeType="parseInt(pt3changeType) - 1"
            :data="['当日', '当月', '当年']"
            changekey="pt3changeType"
            @ChangeTab="ChangeTabData"
          ></panel-change-tab-new>
        </div>
        <div
          class="panel_table"
          v-if="false && gpfzfsjComputedData.rows.length > 0"
        >
          <vue-seamless-scroll
            class="scrollTbale"
            :data="gpfzfsjComputedData.rows"
            :class-option="optionSingleHeightTime02"
          >
            <ul>
              <li
                v-for="(row, rowKey) in gpfzfsjComputedData.rows"
                :key="rowKey"
                class="xcjwsssj table-row"
              >
                <template v-for="(row_cell, row_cellKey) in row">
                  <span
                    :title="row_cell"
                    :class="'list_cell' + row_cellKey"
                    :key="row_cellKey"
                    v-if="row_cellKey < 3"
                    >{{ row_cell }}</span
                  >
                </template>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
    <!-- <div class="panel pt4_1">
      <iframe
        :src="this.GLOBAL.weburl_ZHZF_Map"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height:100%;width:100%;"
        allow="microphone;camera;midi;encrypted-media;"
        allowfullscreen="allowfullscreen"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        oallowfullscreen="true"
        msallowfullscreen="true"
      ></iframe>
    </div> -->
    <div class="map pt4">
      <div class="middle_btnControl" @click="switch_middle_btn()"></div>
      <!-- <iframe
        :src="this.GLOBAL.weburl_ZHZF_Map"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height: 100%; width: 100%"
        allow="microphone;camera;midi;encrypted-media;"
        allowfullscreen="allowfullscreen"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        oallowfullscreen="true"
        msallowfullscreen="true"
      ></iframe> -->

      <iframe
        v-if="false"
        :src="
          this.GLOBAL.weburl_Onemap +
          '/map/mapcontainersbzb.html?type=zhzf&xUserName=zhxz_zhzf&right=620'
        "
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height: 100%"
      ></iframe>
      <!-- <iframe
        src="http://3.15.21.3:8082/login_login.html?loginFrom=zhzf"
        allow="microphone;camera;midi;encrypted-media;"
        allowfullscreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        oallowfullscreen="true"
        msallowfullscreen="true"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height:100%;"
      ></iframe> -->
      <div class="middle_btnBox" v-if="switch_middle_btn_F">
        <div class="middle_btn animated fadeInLeft">
          <div style="width: 100%">
            <a :href="this.GLOBAL.weburl_ZHZF_Login" target="_blank">
              <span style="font-weight: 700px; font-size: 19px"
                >综合执法平台</span
              >
            </a>
            <img src="~static/images/dsj/djyl_new/middle_btn.png" />
          </div>
        </div>
        <div class="middle_btn2 animated fadeInLeft2">
          <div style="width: 100%">
            <a @click="getUrl()">
              <span style="font-weight: 700px; font-size: 19px"
                >双随机平台</span
              >
            </a>
            <img src="~static/images/dsj/djyl_new/middle_btn.png" />
          </div>
        </div>
      </div>
    </div>

    <div class="panel pt5">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[10].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="leftlabel1">
          <span class="left1">案件数</span>
        </div>
        <div class="leftlabel2">
          <span class="left2">办结数</span>
        </div>
        <div class="showTabBox">
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
        <div class="main-content" v-if="ajlbtjListChange.length > 0">
          <div
            class="jwsjtj-item"
            v-for="(item, index) in ajlbtjListChange"
            :key="'jwsjtj' + index"
          >
            <div>{{ item.name }}</div>
            <div class="count">{{ item.value }}</div>
          </div>
        </div>

        <!-- <div class="AJFL">
          <div
            :class="currentTab == index ? 'ajflitem' : 'ajflitem1'"
            v-for="(item, index) in ajflList"
            :key="index"
            @click="currentTab = index"
          >
            <span>{{ item }}</span>
          </div>
        </div> -->
      </div>
    </div>
    <div class="panel pt6">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[3].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="container-bg" v-if="qlsxqdData.length > 0">
          <div
            class="container-item"
            v-for="(item, index) in qlsxqdData"
            :key="index"
            @mouseover="StopAnimation"
            @mouseout="StartAnimation"
            @click.stop="showdpCommon2(item)"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.value }}</span>
          </div>
          <div class="container-item2">
            <span>{{ countsumqlsj }}</span>
            <span>{{ "权力事项总数" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt7">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[9].title }}
        </div>
        <panel-change-tab-new
          class="pt7changeType"
          :changeType="-1"
          :data="['抽查结果']"
          changekey="pt7changeType"
          @ChangeTab="ChangeTabData"
        ></panel-change-tab-new>
      </div>

      <div class="panel_content">
        <div class="dropdown" v-if="pt7yearList.length > 0">
          <div class="dropbtn">
            <div class="icon"></div>
            <div class="text">{{ pt7BtnText }}</div>
          </div>
          <div class="dropdown-content">
            <span
              v-for="(row, index) in pt7yearList"
              :key="index"
              @click="initSsjcc(row)"
              :class="{ active: pt7BtnText == row }"
              >{{ row }}</span
            >
          </div>
        </div>
        <div class="main-content" v-show="!ssjDetails">
          <div class="panelDataChart_part" style="">
            <div
              id="chartSSJ"
              style="
                position: absolute;
                left: -34px;
                top: 41px;
                width: 426px;
                height: 249px;
              "
            ></div>
          </div>
        </div>
        <div class="main-content" v-show="ssjDetails">
          <div class="bjl-details">
            <div class="close" @click="ssjDetails = false"></div>
            <div class="details-content" v-if="ssjDetailsList.length > 0">
              <div
                class="label-item"
                v-for="(item, index) in ssjDetailsList"
                :key="'name' + index"
              >
                <div class="title">{{ item.name }}</div>
                <div class="count">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="btn11"
      @click="changeData.isShowPt7 = !changeData.isShowPt7"
      :style="{
        'animation-play-state': changeData.isShowPt7 ? 'paused' : 'running',
        opacity: 0.5,
        transform: changeData.isShowPt7 ? 'rotate(180deg)' : '',
      }"
    ></div>
    <div
      class="btn21"
      @click="changeData.isShowPt8 = !changeData.isShowPt8"
      :style="{
        'animation-play-state': changeData.isShowPt8 ? 'paused' : 'running',
        opacity: 0.5,
        transform: changeData.isShowPt8 ? 'rotate(180deg)' : '',
      }"
    ></div>
    <div class="panel pt8" id="hello">
      <transition name="fade">
        <div v-if="changeData.isShowPt7" class="panel_table">
          <div class="table-container">
            <div class="panel_header">
              <div class="panel_headerTitle" v-if="data.length > 0">
                {{ data[4].title }}
              </div>
            </div>

            <div class="table-row table-title">
              <span
                v-for="(cell, cellKey) in dataTableSTS.cells.slice(1)"
                :key="cellKey"
                >{{ cell }}</span
              >
            </div>
            <div class="table-body">
              <div class="table-line"></div>
              <div class="table-line"></div>
              <div class="table-line"></div>
              <div class="table-line"></div>
              <vue-seamless-scroll
                class="scrollTbale"
                :data="dataTableSTS.rows"
                :class-option="optionSingleHeightTime"
              >
                <ul>
                  <li
                    v-for="(row, rowKey) in dataTableSTS.rows"
                    :key="rowKey"
                    class="table-row"
                    :accesskey="row[0]"
                    @click="showpt8Pop(row[0], row[3])"
                  >
                    <span
                      :title="row_cell"
                      :class="'list_cell' + row_cellKey"
                      v-for="(row_cell, row_cellKey) in row.slice(1)"
                      :key="row_cellKey"
                      :accesskey="row[0]"
                      >{{ row_cell }}</span
                    >
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="changeData.isShowPt8" class="panel_table2">
          <div class="panel-tabchange1">
            <div
              :class="
                tabchangept8name == '一般案件' ? 'divCurrent current' : ''
              "
              @click="tabchangept8name = '一般案件'"
            >
              {{ "一般案件" }}
            </div>
            <div
              :class="
                tabchangept8name == '简易案件' ? 'divCurrent current' : ''
              "
              @click="tabchangept8name = '简易案件'"
            >
              {{ "简易案件" }}
            </div>
            <div
              :class="
                tabchangept8name == '现场纠违' ? 'divCurrent current' : ''
              "
              @click="tabchangept8name = '现场纠违'"
            >
              {{ "现场纠违" }}
            </div>
          </div>
          <div class="panel-tabchange">
            <div
              :class="pt8changeType == '1' ? 'current' : ''"
              @click="pt8changeType = '1'"
            >
              {{ "当日" }}
            </div>
            <div
              :class="pt8changeType == '2' ? 'current' : ''"
              @click="pt8changeType = '2'"
            >
              {{ "当月" }}
            </div>
            <!-- <div :class="pt8changeType=='3'?'current':''" @click="pt8changeType='3'">{{'当年'}}</div> -->
          </div>
          <div class="table-container">
            <div class="panel_header">
              <div class="panel_headerTitle" v-if="data.length > 0">
                {{ data[5].title }}
              </div>
            </div>

            <div class="table-row table-title">
              <template v-for="(cell, cellKey) in dataTableXCJW.cells">
                <span :key="cellKey" v-if="cellKey > 0">{{ cell }}</span>
              </template>
            </div>
            <div class="table-body" @click.stop="handlerZHAJDetails($event)">
              <div class="table-line" v-for="count in 5" :key="count"></div>
              <vue-seamless-scroll
                v-if="tabchange"
                class="scrollTbale"
                :data="dataTableXCJW.rows"
                :class-option="optionSingleHeightTime"
              >
                <ul>
                  <li
                    v-for="(row, rowKey) in dataTableXCJW.rows"
                    :key="rowKey"
                    :accesskey="row[0]"
                    class="xcjwsssj table-row"
                  >
                    <template v-for="(row_cell, row_cellKey) in row">
                      <span
                        v-if="row_cellKey > 0"
                        :class="'list_cell' + row_cellKey"
                        :key="row_cellKey"
                        :accesskey="row[0]"
                        >{{ row_cell }}</span
                      >
                    </template>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <pop-common
      :popinfo="gsPopInfo"
      v-if="gsPopInfo"
      @closepop="gsPopInfo = false"
    ></pop-common>
    <pop-commonsm
      :popinfo="gsPopInfosm"
      v-if="gsPopInfosm"
      @closepop="gsPopInfosm = false"
    ></pop-commonsm>
  </div>
</template>
<script>
import echarts from "echarts";
import echartsUtils from "js/echartsUtils.js";
import vueSeamlessScroll from "vue-seamless-scroll";
import panel from "../../../components/panel";
import mEchartsC from "../../../components/mEchartsC2";
import popCommon from "../../../components/popCommon";
import popCommonsm from "../../../components/popCommonsm";
export default {
  data() {
    return {
      showList1: 0,
      isShowPt7: false,
      isShowPt8: false,
      changeData: {
        isShowPt7: false,
        isShowPt8: false,
      },
      pt9data: {
        title: "案件来源",
          
        
        list: [
          { value: "12", name: "巡查"},
          { value: "16", name: "媒体曝光" },
          { value: "19", name: "申诉" },
          { value: "26", name: "举报" },
          { value: "10", name: "上级交办" },
          { value: "17", name: "部门移送" },
          { value: " 9", name: "其他" },
          
        ],
              
      },

      tabdata: ["一般案件", "简易案件", "现场纠违"],
      pt2Tabdata: ["一般案件", "简易案件", "现场纠违"],
      gsPopInfo: false,
      gsPopInfosm: false,
      switch_middle_btn_F: false,
      currentTab: 0,
      showzfcdDetails: false,
      bkclickshowDetails: false,
      pt8changeType: "1",
      pt1changeName: "枫桥街道",
      data: [],
      qlsxqdData: [],
      tabchange: true,
      ssjDetails: false,
      ssjSCJGDetails: true,
      tabchangept3name: "当年",
      tabchangept6name: "当日",
      tabchangept8name: "一般案件",
      pt3changeType: "3",
      gpfzfsjData: {
        rows: [],
      },
      ajlyNewData: [
        {
          name: "巡查",
          value: "14",
          xunit: "件",
        },
        {
          name: "媒体曝光",
          value: "28",
          xunit: "件",
        },
        {
          name: "申诉",
          value: "35",
          xunit: "件",
        },
        {
          name: "举报",
          value: "5",
          xunit: "件",
        },
        {
          name: "其他",
          value: "42",
          xunit: "件",
        },
        {
          name: "上级交办",
          value: "867",
          xunit: "件",
        },
        {
          name: "其他部门交办",
          value: "0",
          xunit: "件",
        },
      ],
      ssjDetailsList: [],
      ajlxData: null,
      ajlyData: {
        title: "案件来源",
        subtitle: "",
        chartType: "pie",
        xUnit: "",
        CategoryName: "",
        xAxis: [
          "下级报送",
          "电话",
          "微信",
          "数字城管",
          "文明路长",
          "上级派发",
          "寒山闻钟",
          "市长信箱",
          "网站",
          "部门信箱",
          "其它",
          "督查",
          "坐席",
        ],
        data: [
          {
            name: "下级报送",
            value: "20486",
          },
          {
            name: "电话",
            value: "6536",
          },
          {
            name: "微信",
            value: "990",
          },
          {
            name: "数字城管",
            value: "904",
          },
          {
            name: "文明路长",
            value: "469",
          },
          {
            name: "上级派发",
            value: "266",
          },
          {
            name: "寒山闻钟",
            value: "215",
          },
          {
            name: "市长信箱",
            value: "179",
          },
          {
            name: "网站",
            value: "66",
          },
          {
            name: "部门信箱",
            value: "65",
          },
          {
            name: "其它",
            value: "17",
          },
          {
            name: "督查",
            value: "7",
          },
          {
            name: "坐席",
            value: "1",
          },
        ],
      },
      zfcdDetailsData: [
        {
          title: "狮山横塘街道",
          count: "0",
        },
        {
          title: "浒墅关经开区（镇）",
          count: "0",
        },
        {
          title: "科技城（东渚街道）",
          count: "0",
        },
        {
          title: "枫桥街道",
          count: "0",
        },
        {
          title: "通安镇",
          count: "0",
        },
        {
          title: "西部生态城(镇湖街道)",
          count: "0",
        },
      ],
      ajbjvtjName: [],
      ajbjvList: [
        {
          // 案件办结率
          type: "1",
          title: "当日案件数",
          count: "0",
        },
        {
          type: "2",
          title: "当月案件数",
          count: "0",
        },
        {
          type: "3",
          title: "当年案件数",
          count: "0",
        },
        {
          type: "4",
          title: "当日办结数",
          count: "0",
        },
        {
          type: "5",
          title: "当月办结数",
          count: "0",
        },
        {
          type: "6",
          title: "当年办结数",
          count: "0",
        },
      ],
      zfrycdrc: [
        {
          // 执法人员出动人次
          month: "1月",
          count: "150",
        },
        {
          month: "2月",
          count: "143",
        },
        {
          month: "3月",
          count: "102",
        },
        {
          month: "4月",
          count: "96",
        },
        {
          month: "5月",
          count: "108",
        },
        {
          month: "6月",
          count: "122",
        },
      ],
      dataTableSTS: {
        rows: [],
        cells: [],
      },
      ssjData: {},
      dataTableBMLZ: {
        rows: [
          ["中共国家税务总局金", "赵华国", "165", "4"],
          ["中共国家税务总局金", "金长江", "165", "5"],
          ["中共国家税务总局金", "陈志勇", "130", "6"],
          ["中共国家税务总局金", "王斌", "125", "7"],
          ["中共国家税务总局金", "吴城蒙", "110", "12"],
          ["中共国家税务总局金", "陈雨琪", "178", "15"],
        ],
        cells: ["所属党组织", "党员姓名", "党员积分", "支部排名"],
      },
      ajflList: ["一般案件", "简易案件", "现场纠违"],
      jwsjtj: [
        {
          count: "75",
          text: "当日案件数",
        },
        {
          count: "243",
          text: "当月案件数",
        },
        {
          count: "964",
          text: "当年案件数",
        },
        {
          count: "43",
          text: "当日办结数",
        },
        {
          count: "100%",
          text: "当年办结率",
        },
        {
          count: "243",
          text: "当月办结数",
        },
      ],
      lxhlyData: {},
      pt7BtnText: "",
      pt2changeType: "3",
      timestamp: 0,
      href:
        "http://36.154.62.115:2088/Screen/search?account=taadmin&qtime=" +
        Math.round(new Date() / 1000),
      bkajtjList: [],
      ajlyList: [],
      pt2changechart: true,
      ajlbtjList: [],
      pt7yearList: [],
    };
  },
  components: {
    vueSeamlessScroll,
    panel,
    mEchartsC,
    popCommon,
    popCommonsm,
  },
  computed: {
    optionStopautoPlay() {
      return {
        autoPlay: false, // 自动播放
        singleHeight: 45,
        waitTime: 3000,
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
      };
    },
    optionSingleHeightTime() {
      return {
        autoPlay: true, // 自动播放
        singleHeight: 45,
        waitTime: 3000,
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
      };
    },
    optionSingleHeightTime02() {
      return {
        autoPlay: true, // 自动播放
        singleHeight: 45,
        waitTime: 3000,
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
      };
    },
    countsumqlsj() {
      var count = 0;
      this.qlsxqdData.forEach((element) => {
        if (element !== "") {
          count = count + parseInt(element.value);
        }
      });
      return count;
    },
    dataTableXCJW() {
      // 执法案件数据 一般案件
      var table = {
        rows: [],
        cells: [],
      };

      switch (this.tabchangept8name) {
        case "一般案件":
          table.cells = this.data[5].cells;
          table.rows = this.data[5].rows;
          break;
        case "简易案件":
          table.cells = this.data[6].cells;
          table.rows = this.data[6].rows;
          break;
        case "现场纠违":
          table.cells = this.data[7].cells;
          table.rows = this.data[7].rows;
          break;
      }
      this.tabchange = false;
      this.$nextTick(function () {
        this.tabchange = true;
      });
      return table;
    },
    ajlxChangeData() {
      var data = JSON.parse(JSON.stringify(this.ajlxData));
      var xAxis = [];
      var dataEchart = [];
      this.ajlxData.data.forEach((element, i) => {
        if (this.pt2changeType === element.type) {
          dataEchart.push(element);
          xAxis.push(element.name);
        }
      });
      data.xAxis = xAxis;
      data.data = dataEchart;
      console.log(data, 12345666);
      this.pt2changechart = false;
      this.$nextTick(function () {
        this.pt2changechart = true;
      });
      return data;
    },
    ajlyChangeList() {
      var list = [];
      if (this.ajlyList && this.ajlyList.length > 0) {
        this.ajlyList.forEach((element) => {
          if (this.pt2changeType === element.type) {
            list.push(element);
          }
        });
      }
      return list;
    },
    ajlbtjListChange() {
      console.log(this.showList1);
      var list = [];
      if (this.ajlbtjList && this.ajlbtjList.length > 0) {
        this.ajlbtjList.forEach((element) => {
          if (this.showList1.toString() === element.type) {
            list.push(element);
          }
        });
      }
      return list;
    },
    gpfzfsjComputedData() {
      var table = {
        rows: [],
      };
      this.gpfzfsjData.rows.forEach((element) => {
        if (element[3] === this.pt3changeType) {
          table.rows.push(element);
        }
      });
      return table;
    },
    ajbjvListComputedData() {
      console.log(999999999);
      if (this.data.length > 0) {
        this.data[11].list.forEach((element) => {
          if (element.name === this.pt1changeName) {
            var type = element.type;
            this.ajbjvList.forEach((element2, i) => {
              if (type === element2.type) {
                this.ajbjvList[i].count = element.value;
              }
            });
          }
        });
      }
      return this.ajbjvList;
    },
  },
  watch: {
    changeData: {
      handler: function (newval, oldval) {
        console.log(11111);
        if (newval.isShowPt7 === false && newval.isShowPt8 === false) {
          document.getElementById("hello").style.display = "none";
        } else {
          document.getElementById("hello").style.display = "flex";
        }
      },
      deep: true,
    },
  },
  methods: {
    loaddytj(key) {
      console.log(key, 888);
      var _this = this;
      this.showList1 = key;
      var list = [];
      if (this.ajlbtjList && this.ajlbtjList.length > 0) {
        this.ajlbtjList.forEach((element) => {
          if (this.showList1.toString() === element.type) {
            list.push(element);
          }
        });
      }
      console.log(list);
    },
    ChangeTabData(key, item, index) {
      console.log(key, item);
      var indexType = (parseInt(index) + 1).toString();
      this[key] = indexType;
      switch (key) {
        case "pt3changeType":
          this.EchartsGPSX(indexType);
          break;
        case "pt7changeType":
          this.handlerInitSSJSCJG(this.ssjSCJGDetails);
          break;
        default:
          break;
      }
    },
    getPt7yearList() {
      let yearList = [];
      if (this.ssjData.data && this.ssjData.data.length > 0) {
        var len = this.ssjData.data.length;
        for (let index = len - 1; index > -1; index--) {
          var element = this.ssjData.data[index];
          if ($.inArray(element.year, yearList) < 0) {
            yearList.push(element.year);
          }
        }
        if (yearList.length > 0) {
          this.pt7BtnText = yearList[0];
        }
      }
      this.$nextTick(function () {
        this.initSsjcc(this.pt7BtnText);
      });
      this.pt7yearList = yearList;
    },
    showpt8Pop(id, title) {
      this.gsPopInfo = {
        title: title,
        src:
          this.GLOBAL.weburl_Onemap_GXQ +
          "/NDDsj/Common/PageDataView.aspx?ObjectID=1682873112&NDFormType=1&FatherID=90100600&ChildID=90100600&ptaptypeid=90100600&ID=" +
          id,
        width: 787,
        height: 600,
      };
    },
    handlerDetails(name) {
      this.bkclickshowDetails = !this.bkclickshowDetails;
      this.pt1changeName = name;
    },
    handlerInitSSJ(params) {
      this.ssjDetails = !this.ssjDetails;
      let self = this;
      webAPI.server
        .get({
          url:
            self.GLOBAL.weburl_DataCenter +
            "/Q.ashx?DBTag=ZHXZ_GXQ&xkey=UP_DSJ综合执法_执法平台_双随机抽查情况详情&date=" +
            params.name,
        })
        .then((res) => {
          res.data.map((item) => {
            item.value || (item.value = 0);
          });
          this.ssjDetailsList = res.data;
        });
    },
    handlerInitSSJSCJG(ssjscjg) {
      var key = "";
      var title = "双随机抽查结果";
      var event = {
        url:
          this.GLOBAL.weburl_ZHZF_ssjjgdList +
          key +
          "&layer_w=1119&layer_h=671&title=" +
          title,
      };
      window.showDpCommonPopup2(event);
    },
    handlerZHAJDetails(event) {
      if (!event.target.accessKey || event.target.accessKey == "") return;
      var id = event.target.accessKey;
      var title = "案件详情";
      var url = null;
      switch (this.tabchangept8name) {
        case "一般案件":
          url =
            this.GLOBAL.weburl_ZHZF_ZFAJ_ybaj +
            id +
            "&layer_w=1147&layer_h=633&title=" +
            title;
          break;
        case "简易案件":
          url =
            this.GLOBAL.weburl_ZHZF_ZFAJ_jyaj +
            id +
            "&layer_w=1147&layer_h=633&title=" +
            title;
          break;
        case "现场违纠":
          url =
            this.GLOBAL.weburl_ZHZF_ZFAJ_xcjw +
            id +
            "&layer_w=772&layer_h=477&title=" +
            title;
          break;
      }
      var event = {
        url: url,
      };
      window.showDpCommonPopup2(event);
    },
    StopAnimation() {
      console.log(99999999999);
      var classname = ".container-item";
      // $(classname).stop(true, false);
      $(classname).css("animation-play-state", "paused");
    },
    StartAnimation() {
      var classname = ".container-item";
      $(classname).css("animation-play-state", "running");
    },
    showdpCommon2(option) {
      var title = option.name + "权力事项清单";
      var key = option.classno;
      var event = {
        url:
          this.GLOBAL.weburl_ZHZF_qlsjqdList +
          key +
          "&layer_w=1372&layer_h=846&title=" +
          title,
      };
      window.showDpCommonPopup2(event);
    },
    tabchangeHandlerPt3(tanname) {
      this.tabchangept3name = tanname;
    },
    switch_middle_btn() {
      this.switch_middle_btn_F = !this.switch_middle_btn_F;
    },
    initSsjcc(year) {
      var xAxis = [];
      var dataEchart = [];
      this.ssjData.data.forEach((element, i) => {
        if (year === element.year) {
          dataEchart.push(element);
          xAxis.push(this.ssjData.xAxis[i]);
        }
      });
      var data = [dataEchart];
      console.log(123456);
      var xcjwOption = echartsUtils.getEchartsConfig_EX(
        "column",
        xAxis,
        data,
        "",
        "",
        []
      );
      // xcjwOption.series[0].itemStyle.normal.color = "#2CFCA7";
      xcjwOption.series[0].barWidth = 31;
      xcjwOption.series[0].label = {
        show: true,
        position: "top",
        fontSize: 12,
        color: "#2CFCA7",
      };
      xcjwOption.yAxis.axisLabel.textStyle = {
        color: "#FFF",
        fontSize: 12,
      };
      xcjwOption.xAxis.axisLabel = {
        rotate: 0,
        textStyle: {
          color: "#FFF",
          fontSize: 12,
        },
      };
      xcjwOption.yAxis.axisLine = {
        lineStyle: {
          color: "#8497AB",
        },
      };
      xcjwOption.yAxis.splitLine = {
        lineStyle: {
          color: "#39526D",
        },
      };
      xcjwOption.grid = {
        bottom: "5%",
        containLabel: true,
        left: "5%",
        right: "0%",
        top: "10%",
      };
      var chart = echarts.init(document.getElementById("chartSSJ"));
      var _this = this;
      chart.on("click", function (params) {
        _this.handlerInitSSJ(params);
      });
      this.pt7BtnText = year;
      this.timerssj = echartsUtils.chartInit("chartSSJ", xcjwOption, "1");
    },
    EchartsGPSX(index) {
      var _this = this;
      this.pt3changeType = index;
      var data = [];
      var legend = [];
      this.gpfzfsjData.rows.forEach((element) => {
        if (element[3] === this.pt3changeType) {
          legend.push(element[4]);
          // element[4]
          // var a=element[4]="111";
          data.push({ name: element[4], value: parseInt(element[5]) });
        }
      });
      var pieAgeOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}%",
          show: true,
        },
        legend: {
          show: false,
          data: legend,
        },
        grid: {
          left: "-100%",
        },
        series: [
          {
            width: 100,
            type: "pie",
            radius: "150%",
            center: ["100%", "50%"],
            color: [
              "#F97824",
              "#FAF215",
              "#8487F6",
              "#00FEFF",
              "#D87E7F",
              "#EDEDED",
              "#55D973",
              "#0B92E7",
              "#BBF703",
              "#319dff",
              "#07B395",
              "#387dee",
              "#bcf702",
              "#8a85ed",
            ],
            data: data,
            minAngle: 20, //最小角度
            startAngle: -70, //起始角度

            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            labelLine: {
              normal: {
                length: -20, // 改变标示线的长度
                lineStyle: {},
              },
            },
            // label: {
            //   //position: "inside",
            //   color: "#ffffff",
            //   textStyle: {
            //     //这只是为了让文字居中而已
            //     align: "center", //水平对齐方式可选left，right，center
            //     baseline: "top", //垂直对齐方式可选top，bottom，middle
            //   },
            //   formatter: _this.CountFormatter, //"{b}\n{c}\n({d}%)",
            //   fontSize: "12",
            // },
          },
        ],
      };
      console.log(pieAgeOption, 123456789);
      setTimeout(() => {
        this.timer9 = echartsUtils.chartInit("chartgpzfsx", pieAgeOption, "");
      }, 1000);
    },
    CountFormatter(e) {
      console.log(e, 789);
      var newStr = " ";
      var percent = e.percent;
      //var value = e.value;
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
      return newStr + " " + "(" + percent.toString() + "%)";
    },
    getDataNew() {
      var url = "static/json/zhxz/yjson/zhzf.json";
      // var url =
      //   this.GLOBAL.weburl_Onemap + "/Handler/dsj/DSJHandler.ashx?type=zhzf";
      webAPI.server
        .get({
          url: url,
        })
        .then((res) => {
          if (res.data.length == 0) return;
          this.data = res.data;
          // 板块案件统计
          console.log(this.data, 123456789);
          this.bkajtjList = this.data[0].list;
          // 案件来源
          this.ajlyList = this.data[1].list;
          // 案件类型
          this.ajlxData = this.data[2]; // 图标
          // 权力事项清单
          this.qlsxqdData = this.data[3].list;
          // 信访数据
          this.dataTableSTS.cells = this.data[4].cells;
          this.dataTableSTS.rows = this.data[4].rows;

          // 高频发执法事项
          this.gpfzfsjData.rows = this.data[12].rows;
          this.EchartsGPSX(this.pt3changeType);
          // 双随机抽查
          this.ssjData = this.data[9];
          this.getPt7yearList();
          // 案件类别统计
          this.ajlbtjList = this.data[10].list;
        });
    },
    getUrl() {
      var title = "执法双随机";
      var event = {
        url:
          this.GLOBAL.weburl_ZHZF_SSJ +
          "&layer_w=900&layer_h=700&left=44%&top=44%&title=" +
          title,
      };
      window.showDpCommonPopup2(event);
    },
  },
  mounted() {
    var _this = this;
    this.getDataNew();
    window.addEventListener("message", function (e) {
      if (
        e.type === "message" &&
        e.data !== undefined &&
        e.data !== "" &&
        e.data.type !== "webpackOk" &&
        e.data.type !== "webpackInvalid"
      ) {
        let fun = e.data.type;
        if (_this[fun]) {
          _this[fun](e.data.data);
        }
      }
    });
  },
  destroyed() {},
};
</script>
<style lang="less" scoped>
@import url("~styles/zfpt.less");
</style>
