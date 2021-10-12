<template>
  <div class="lg_main">
    <!-- <div
      class="panel pt1_1"
      v-if="false"
    >
      <div class="panel_header">
        <div class="panel_headerTitle">{{ '事项清单' }}</div>
      </div>
      <div class="panel_content">
        <div
          class="flexRow"
          style="margin-left: -98px;"
        >
          <div
            id="chartSXQD"
            style="height:500px;width:700px;"
          ></div>
          <div
            id="chart5BQD"
            style="height: 500px;width:700px;zoom: 0.8;"
          ></div>
        </div>
      </div>
    </div> -->
    <div class="panel pt1_2">
      <div class="panel_header">
        <div class="panel_headerTitle">{{ "事项清单" }}</div>
      </div>
      <div class="panel_content">
        <div class="flexRow" v-if="sp_data.length > 0">
          <div
            :class="
              selectSXQDname == item.name ? 'container current' : 'container'
            "
            v-for="(item, index) in this.sp_data[4].list"
            :key="index"
            @click="handlerSelect(item)"
          >
            <div class="leftitem">
              <!-- {{item.name}} -->
              <div class="topitem_L">
                <span>{{ item.name }}</span>
                <span>占比</span>
              </div>
            </div>
            <div class="rightitem">
              <div class="topitem">
                <span>{{ item.value }}</span>
                <span>{{ item.xunit }}</span>
              </div>
              <div class="topitem">
                {{ item.pervalue }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="sp_data.length > 0">
          {{ sp_data[0]["title"] }}
        </div>
      </div>
      <div class="panel_content">
        <div
          v-for="(item, index) in bjlList"
          :key="'list' + index"
          :class="'bjl-item bjl-item-i bjl-item-' + index"
        >
          <p>{{ item.name }}</p>
          <div>
            <label>{{ item.value ? item.value : 0 }}</label>
            <span>件</span>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt2 animated bounceInUp" v-if="showpt2">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="sp_data.length > 0">
          {{ sp_data[1]["title"] }}
        </div>
      </div>
      <div class="panel_content">
        <div class="panel_table">
          <div class="list_title">
            <span
              :class="'list_cell' + cellKey"
              v-for="(cell, cellKey) in dataTableBJGS.cells"
              :key="cellKey"
              >{{ cell }}</span
            >
          </div>
          <vue-seamless-scroll
            :data="dataTableBJGS.rows"
            style="height: 420px; overflow: hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li v-for="(row, rowKey) in dataTableBJGS.rows" :key="rowKey">
                    <span
                      :title="row_cell"
                      :class="'list_cell' + row_cellKey"
                      v-for="(row_cell, row_cellKey) in row"
                      :style="
                        'color:' +
                        (row_cell == '审批通过'
                          ? '#00AF50'
                          : row_cell == '异常终止'
                          ? '#F90000'
                          : row_cell == '已受理'
                          ? '#FFB900'
                          : 'white')
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
      </div>
    </div>
    <div
      class="btn11"
      @click="showpt2 = !showpt2"
      :style="{
        'animation-play-state': showpt2 ? 'paused' : 'running',
        opacity: 0.5,
        transform: showpt2 ? 'rotate(180deg)' : '',
      }"
    ></div>
    <div class="panel pt3">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[12].title }}
        </div>
      </div>
      <div class="panel_content" v-if="data.length > 0">
        <div
          v-for="(item, index) in data[12].list"
          :class="'panelAround panelAround' + (index + 1)"
          :key="'smzx' + index"
          @click="LocationShape(item, index, 'js_q_bmfwzx_location')"
        >
          <p>{{ item["市民中心"] }}</p>
          <p>
            {{ item["办件量"]
            }}<span style="font-size: 12px; margin-left: 5px">件</span>
          </p>
        </div>
        <div class="bjmyd_text" v-if="BJMYDList.length > 0">
          <div class="name">{{ BJMYDList[0].name }}</div>
          <div class="value">100%</div>
          <!-- <div class="value">{{BJMYDList[0].value}}</div> -->
        </div>
        <!-- <div class="bjmyd"></div> -->
      </div>
    </div>
    <div class="panel pt6" v-if="false">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[13].title }}
        </div>
      </div>
      <div class="panel_content" v-if="data.length > 0">
        <div
          v-for="(item, index) in data[13].list"
          :class="'panelAround panelAround' + (index + 1)"
          :key="'smzx' + index"
        >
          <p>{{ item.name }}</p>
          <p>
            {{ item.value
            }}<span v-if="index != 1" style="font-size: 32px; margin-left: 5px"
              >件</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="map pt4">
      <!-- <iframe
        :src="
          this.GLOBAL.weburl_Onemap +
          '/map/mapcontainers.html?type=spfw&xUserName=zhxz_spfw&right=586'
          "
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height: 100%"

      ></iframe> -->
    </div>
    <div class="panel pt5">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="sp_data.length > 0">
          {{ this.sp_data[7].title }}
        </div>
      </div>
      <div class="panel_content">
        <vue-seamless-scroll
          :data="czjzlhbData"
          :class-option="lhbSingleHeightTime"
          class="seamless-warp"
        >
          <ul>
            <li class="flexRow" v-for="item in czjzlhbData">
              <span
                :class="[
                  'icon',
                  { iconred: item.index == 1 },
                  { iconorange: item.index == 2 || item.index == 3 },
                  { iconblue: item.index > 3 },
                ]"
                >{{ item.index }}</span
              >
              <div class="middlebox">
                <div class="name" :accesskey="item.name" :title="item.name">
                  {{ item.name }}
                </div>
                <div class="perBox">
                  <div
                    class="per"
                    v-bind:style="{ width: item.percent + '%' }"
                  ></div>
                </div>
              </div>

              <!-- <div class="perBox">
                <div
                  class="per"
                  v-bind:style="{ width: item.percent + '%' }"
                ></div>
              </div> -->
              <div class="value">
                {{ item.value }}
                <span class="xunit">件</span>
              </div>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
    <div class="panel pt5" v-if="false">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ data[2].title }}
        </div>
      </div>
      <div class="panel_content">
        <div class="bjxl-container">
          <div class="bjxl-label">
            <div class="bjxl-icon">
              <img src="~static/images/xzsp/tqbjl.png" alt="" />
            </div>
            <div class="bjxl-text" v-if="data.length > 0">
              <div class="bjxl-number">{{ bjxl.tqbjxl }}</div>
              <div>{{ data[2].subtitle }}</div>
            </div>
          </div>
          <div class="bjxl-label">
            <div class="bjxl-icon">
              <img src="~static/images/xzsp/bjl.png" alt="" />
            </div>
            <div class="bjxl-text" v-if="data.length > 0">
              <div class="bjxl-number">{{ bjxl.bjl }}</div>
              <div>{{ data[3].subtitle }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="panel pt6">
      <div class="panel_header">
        <div
          class="panel_headerTitle"
          v-if="data.length>0"
        >{{data[6].title}}</div>
      </div>
      <div class="panel_content">
        <div
          class="total"
          v-if="data.length>0"
        >
          <div class="total-item sxzl">
            <div class="total-detail">
              <div
                class="total-label"
                v-for="(item,index) in data[5].data"
                :key="'sxzl'+index"
              >
                <div class="total-name">{{item.name}}</div>
                <div class="total-detail-number"><span>{{item.value}}</span> 件</div>
              </div>
            </div>
          </div>

        </div>
        <div class="bjxl-container">
          <div class="bjxl-label">
            <div class="bjxl-icon"><img
                src="~static/images/xzsp/icon022.png"
                alt=""
              ></div>
            <div
              class="bjxl-text"
              v-if="ckxcbjlList.length>0"
            >
              <div class="bjxl-number">{{ckxcbjlList[0].value}}</div>
              <div>{{ckxcbjlList[0].name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="panel pt9">
      <div class="panel_header">
        <div class="panel_headerTitle" v-if="data.length > 0">
          {{ "每月代办志愿者之星" }}
        </div>
      </div>
      <div class="panel_content" @click="openqdxq($event)">
        <vue-seamless-scroll
          v-if="AJListPhoto.length > 0"
          :data="AJListPhoto"
          style="height: 250px; overflow: hidden"
          :class-option="autoScrollImagOption"
        >
          <div class="list_content">
            <div class="list_contentInfo">
              <div class="flexRow">
                <div
                  class="imgPanel"
                  v-for="(item, key) in AJListPhoto"
                  :key="'slide' + key"
                >
                  <img :data-num="key" :src="item.img" :accessKey="item.id" />
                  <div class="namecontainer">
                    <span class="name">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
    <div class="panel pt7">
      <div class="panel_header" @click="OpenFXXT()">
        <div class="panel_headerTitle">富民统计</div>
      </div>

      <div class="panel_content">
        <div class="total-count">
          <div class="item">
            <span>总预算：</span>
            <span style="color: #77f51b">{{
              currentYear == 2020
                ? fmTempData[0].generalBudget.value
                : currentYear == 2021
                ? fmTempData[1].generalBudget.value
                : ""
            }}</span>
            <span>{{
              currentYear == 2020
                ? fmTempData[0].generalBudget.unit
                : currentYear == 2021
                ? fmTempData[1].generalBudget.unit
                : ""
            }}</span>
          </div>
          <div class="item">
            <span>总支出：</span>
            <span style="color: #77f51b">{{
              currentYear == 2020
                ? fmTempData[0].totalExpenditure.value
                : currentYear == 2021
                ? fmTempData[1].totalExpenditure.value
                : ""
            }}</span>
            <span>{{
              currentYear == 2020
                ? fmTempData[0].totalExpenditure.unit
                : currentYear == 2021
                ? fmTempData[1].totalExpenditure.unit
                : ""
            }}</span>
          </div>
          <div class="item">
            <span>总人次：</span>
            <span style="color: #77f51b">{{
              currentYear == 2020
                ? fmTempData[0].headcount.value
                : currentYear == 2021
                ? fmTempData[1].headcount.value
                : ""
            }}</span>
            <span>{{
              currentYear == 2020
                ? fmTempData[0].headcount.unit
                : currentYear == 2021
                ? fmTempData[1].headcount.unit
                : ""
            }}</span>
          </div>
        </div>
        <div class="middlebox">
          <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择年"
            @change="changeYear"
          >
          </el-date-picker>
          <div
            style="
              width: 2px;
              height: 2px;
              border-right: 4px solid transparent;
              border-left: 4px solid transparent;
              border-top: 9px solid rgb(12, 206, 252);
              align-self: center;
              margin-left: 10px;
              position: absolute;
              right: 11px;
              z-index: -1;
              top: 8px;
            "
          ></div>
        </div>
        <div class="tab">
          <ul>
            <li
              v-for="(item, index) in pt7Tabdata"
              :class="pt7showList == index ? 'current' : ''"
              @click="changePt7(index)"
              :key="index"
            >
              <span style="font-size: 12px">{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="panelDataChart" v-if="pt7showList == 0">
          <div class="panelDataChart_part">
            <div id="chartTotalMoney" style="top:20px;height: 220px; "></div>
          </div>
        </div>
        <div class="panelDataChart" v-else-if="pt7showList == 1">
          <div class="panelDataChart_part">
            <div
              id="chartUnits"
              class="chartUnits"
              style="top:30px;height: 250px; bottom: 0px; width: 100%"
            ></div>
          </div>
        </div>
        <!-- <div
          class="panelDataChart"
          style="
            display: flex;
            width: 100%;
            margin-top: 20px;
            justify-content: space-between;
          "
        >
          <div class="panelDataChart_part" style="width: 500%">
            <div id="chartTotalMoney" style="height: 350px"></div>
          </div>
          <div class="panelDataChart_part" style="width: 100%">
            <div
              id="chartUnits"
              class="chartUnits"
              style="height: 2500px"
            ></div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <div class="panel pt8">
      <div
        class="panel_header"
        style="margin-top:-100px;"
      >
        <div
          class="panel_headerTitle"
          v-if="data.length > 0"
        >{{ data[1]['title'] }}</div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartBJMonth"
              style="height:580px;width:3163px;"
            ></div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import echarts from "echarts";
import echartsUtils from "js/echartsUtils.js";
import highEchartsUtils from "js/highEchartsUtils.js";
import countTo from "vue-count-to";
import "element-ui/lib/theme-chalk/index.css";
import vueSeamlessScroll from "vue-seamless-scroll";
import { Select, Option, DatePicker } from "element-ui";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      BJMYDList: [],
      updatetime: "",
      onlyeone: false,
      showpt2: true,
      timedatalist: null,
      ssblqkdatalist1: null,
      pt7Tabdata: ["各类型人员总金额", "各社区总金额"],
      ssblqkdatalist2: null,
      sp_data: [],
      pt7showList: 0,
      AJListPhoto: [],
      autoScrollImagOption: {
        autoPlay: true, // 自动播放
        step: 0.6, // 滚动速度（步长）
        limitMoveNum: 1, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 2, // 0向下，1向上，2向左，3向右
        singleWidth: 150,
      },
      czjzlhbData: [], //高频事项
      data: [],
      bjxl: {
        tjbjl: "0%",
        bjl: "0%",
      },
      datalist: [], // 事项总量和平均用时
      SXZL: ["0", "0", "0", "0"],
      SXZLL: {
        first: {
          name: null,
          value: ["0", "0", "0", "0"],
        },
        second: {
          name: null,
          value: ["0", "0", "0", "0"],
        },
      },
      selectSXQDname: "",
      bjlList: [], // 办件量
      dataTableBJGS: {
        rows: [],
        cells: [],
      },
      gdzl: 0, // 总量
      csgdzl: 0, // 超时办结总量
      // autoScrollOption: {
      //   autoPlay: true, // 自动播放
      //   step: 0.5, // 滚动速度（步长）
      //   limitMoveNum: 6, // 开始无缝滚动最小数据长度
      //   openTouch: false,
      //   waitTime: 0,
      //   direction: 1,
      //   singleHeight: 20
      // },
      year: new Date(),
      tempdata: [
        {
          title: "事项清单1",
          chartType: "pie",
          xUnit: "",
          CategoryName: "",
          xAxis: ["个人办事", "法人办事"],
          data: [
            {
              name: "个人办事",
              value: "1",
            },
            {
              name: "法人办事",
              value: "113",
            },
          ],
        },
        {
          title: "事项清单2",
          chartType: "pie",
          xUnit: "",
          CategoryName: "",
          xAxis: ["承诺件", "即办件"],
          data: [
            {
              name: "承诺件",
              value: "25",
            },
            {
              name: "即办件",
              value: "89",
            },
          ],
        },
        {
          list: [
            {
              name: "事项总量",
              value: "114",
            },
            {
              name: "办理平均用时",
              value: "0:35:15",
            },
          ],
        },
        {
          list: [
            {
              name: "承诺件",
              value: "25",
              percent: "21.93%",
              unit: "件",
            },
            {
              name: "即办件",
              value: "89",
              percent: "78.07%",
              unit: "件",
            },
          ],
        },
        {
          list: [
            {
              name: "个人办事",
              value: "1",
              percent: "0.88%",
              unit: "件",
            },
            {
              name: "法人办事",
              value: "113",
              percent: "99.12%",
              unit: "件",
            },
          ],
        },
        {
          list: [
            {
              热门事项TOP10: "TOP1",
              事项名称: "农村妇女“两癌”免费筛选",
              业务量: "392",
              业务类型: "卫生与健康",
            },
            {
              热门事项TOP10: "TOP2",
              事项名称: "秸秆机械化还田",
              业务量: "347",
              业务类型: "农技",
            },
            {
              热门事项TOP10: "TOP3",
              事项名称: "综治管理",
              业务量: "281",
              业务类型: "综治",
            },
            {
              热门事项TOP10: "TOP4",
              事项名称: "群众文化活动",
              业务量: "234",
              业务类型: "人社",
            },
            {
              热门事项TOP10: "TOP5",
              事项名称: "生育服务证明",
              业务量: "163",
              业务类型: "卫生与健康",
            },
            {
              热门事项TOP10: "TOP6",
              事项名称: "法律咨询",
              业务量: "143",
              业务类型: "司法",
            },
            {
              热门事项TOP10: "TOP7",
              事项名称: "病虫害防治及咨询",
              业务量: "143",
              业务类型: "农技",
            },
            {
              热门事项TOP10: "TOP8",
              事项名称: "开展优生优育宣传教育",
              业务量: "138",
              业务类型: "卫生与健康",
            },
            {
              热门事项TOP10: "TOP9",
              事项名称: "公共文化免费开放",
              业务量: "124",
              业务类型: "人社",
            },
            {
              热门事项TOP10: "TOP10",
              事项名称: "新型农机具的推广及咨询",
              业务量: "116",
              业务类型: "农技",
            },
          ],
        },
        {
          title: "各类型人员总金额",
          chartType: "column",
          yAxis: "金额（元）",
          xAxis: [
            "学生",
            "少数名族",
            "特扶家庭",
            "困难群众",
            "临时生活救助",
            "征地农民",
            "五保人员",
            "困难党员",
            "困难户调查记账户",
            "困难人员",
            "退休（退岗）老干部",
            "儿童",
            "低保户/边缘户",
            "志愿者",
            "残疾人",
          ],
          xUnit: "",
          data: [
            {
              name: "学生",
              value: "1500000",
            },
            {
              name: "少数名族",
              value: "2500000",
            },
            {
              name: "特扶家庭",
              value: "4500000",
            },
            {
              name: "困难群众",
              value: "3300000",
            },
            {
              name: "临时生活救助",
              value: "2000000",
            },
            {
              name: "征地农民",
              value: "4300000",
            },
            {
              name: "五保人员",
              value: "3800000",
            },
            {
              name: "困难党员",
              value: "2900000",
            },
            {
              name: "困难户调查记账户",
              value: "3900000",
            },
            {
              name: "困难人员",
              value: "4300000",
            },
            {
              name: "退休（退岗）老干部",
              value: "3200000",
            },
            {
              name: "儿童",
              value: "4400000",
            },
            {
              name: "低保户/边缘户",
              value: "2000000",
            },
            {
              name: "志愿者",
              value: "4300000",
            },
            {
              name: "残疾人",
              value: "3100000",
            },
          ],
        },
        {
          title: "各社区总金额",
          chartType: "pie",
          xAxis: [
            "东浜社区居委会",
            "西津桥社区居委会",
            "龙池社区居委会",
            "其他",
            "马浜社区居委会",
            "白马涧社区居委会",
            "康佳社区居委会",
            "枫津社区居委会",
          ],
          CategoryName: "",
          data: [
            {
              name: "东浜社区居委会",
              value: "10",
            },
            {
              name: "西津桥社区居委会",
              value: "26",
            },
            {
              name: "龙池社区居委会",
              value: "26",
            },
            {
              name: "其他",
              value: "15",
            },
            {
              name: "马浜社区居委会",
              value: "9.8",
            },
            {
              name: "白马涧社区居委会",
              value: "15.6",
            },
            {
              name: "康佳社区居委会",
              value: "11",
            },
            {
              name: "枫津社区居委会",
              value: "12.6",
            },
          ],
        },
      ],
      fmTempData: [
        {
          year: "2020",
          generalBudget: {
            value: "20000",
            unit: "万元",
          },
          totalExpenditure: {
            value: "123983166.3",
            unit: "元",
          },
          headcount: {
            value: "135857",
            unit: "人",
          },
          typesData: {
            title: "",
            chartType: "column",
            yAxis: "金额（元）",
            xAxis: [
              "儿童",
              "住户调查记账户",
              "志愿者",
              "不限",
              "老干部",
              "特扶家庭",
              "困难党员",
              "学生",
              "军人",
              "困难人员",
              "少数名族",
              "老年人",
              "征地农民",
              "五保人员",
              "低保户",
              "临时生活救助",
              "残疾人",
              "农村退休（退岗）老干部",
            ],
            xUnit: "元",
            data: [
              {
                name: "儿童",
                value: "983188.1",
              },
              {
                name: "住户调查记账户",
                value: "99000",
              },
              {
                name: "志愿者",
                value: "403200",
              },
              {
                name: "不限",
                value: "96176853.67",
              },
              {
                name: "老干部",
                value: "183000",
              },
              {
                name: "特扶家庭",
                value: "8000",
              },
              {
                name: "困难党员",
                value: "57000",
              },
              {
                name: "学生",
                value: "478600",
              },
              {
                name: "军人",
                value: "8635620.38",
              },
              {
                name: "困难人员",
                value: "1716951",
              },
              {
                name: "少数名族",
                value: "13785",
              },
              {
                name: "老年人",
                value: "7784920",
              },
              {
                name: "征地农民",
                value: "2143890",
              },
              {
                name: "五保人员",
                value: "12000",
              },
              {
                name: "低保户",
                value: "2649347.79",
              },
              {
                name: "临时生活救助",
                value: "10000",
              },
              {
                name: "残疾人",
                value: "2299394.4",
              },
              {
                name: "农村退休（退岗）老干部",
                value: "328416",
              },
            ],
          },
          committeeData: {
            title: "",
            chartType: "pie",
            xAxis: [
              "马涧",
              "西津桥社区居委会",
              "康佳社区居委会",
              "白马涧社区居委会",
              "西津桥",
              "龙池社区居委会",
              "东浜社区居委会",
              "枫津",
            ],
            CategoryName: "",
            data: [
              {
                name: "马涧",
                value: "2160",
              },
              {
                name: "西津桥社区居委会",
                value: "18043787.89",
              },
              {
                name: "康佳社区居委会",
                value: "21187765.19",
              },
              {
                name: "白马涧社区居委会",
                value: "14851356.44",
              },
              {
                name: "西津桥",
                value: "960",
              },
              {
                name: "龙池社区居委会",
                value: "22160446.57",
              },
              {
                name: "东浜社区居委会",
                value: "9511557.75",
              },
              {
                name: "枫津",
                value: "720",
              },
            ],
          },
        },
        {
          year: "2021",
          generalBudget: {
            value: "15000",
            unit: "万元",
          },
          totalExpenditure: {
            value: "20800446.6",
            unit: "元",
          },
          headcount: {
            value: "78499",
            unit: "人",
          },
          typesData: {
            title: "",
            chartType: "column",
            yAxis: "金额（元）",
            xAxis: [
              "困难党员",
              "儿童",
              "低保户/边缘户",
              "老年人",
              "临时生活救助",
              "志愿者",
              "困难群众",
              "低保户",
              "农村退休（退岗）老干部",
              "残疾人",
              "学生",
              "五保人员",
              "住户调查记账户",
              "困难人员",
              "军人",
              "不限",
              "征地农民",
            ],
            xUnit: "元",
            data: [
              {
                name: "困难党员",
                value: "294000",
              },
              {
                name: "儿童",
                value: "656859.4",
              },
              {
                name: "低保户/边缘户",
                value: "706482.92",
              },
              {
                name: "老年人",
                value: "4993920",
              },
              {
                name: "临时生活救助",
                value: "3600",
              },
              {
                name: "志愿者",
                value: "921530",
              },
              {
                name: "困难群众",
                value: "2400.3",
              },
              {
                name: "低保户",
                value: "2590593.78",
              },
              {
                name: "农村退休（退岗）老干部",
                value: "225091",
              },
              {
                name: "残疾人",
                value: "1765338.5",
              },
              {
                name: "学生",
                value: "8400",
              },
              {
                name: "五保人员",
                value: "14000",
              },
              {
                name: "住户调查记账户",
                value: "87175",
              },
              {
                name: "困难人员",
                value: "371718",
              },
              {
                name: "军人",
                value: "5724395.77",
              },
              {
                name: "不限",
                value: "2424541.93",
              },
              {
                name: "征地农民",
                value: "10400",
              },
            ],
          },
          committeeData: {
            title: "",
            chartType: "pie",
            xAxis: [
              "马浜社区居委会",
              "其他",
              "枫津社区居委会",
              "康佳社区居委会",
              "东浜社区居委会",
              "龙池社区居委会",
              "西津桥社区居委会",
              "白马涧社区居委会",
            ],
            CategoryName: "",
            data: [
              {
                name: "马浜社区居委会",
                value: "4436663.81",
              },
              {
                name: "其他",
                value: "5000",
              },
              {
                name: "枫津社区居委会",
                value: "1710799.22",
              },
              {
                name: "康佳社区居委会",
                value: "3772595.51",
              },
              {
                name: "东浜社区居委会",
                value: "1388830.73",
              },
              {
                name: "龙池社区居委会",
                value: "3390759.23",
              },
              {
                name: "西津桥社区居委会",
                value: "3565398.38",
              },
              {
                name: "白马涧社区居委会",
                value: "2530399.72",
              },
            ],
          },
        },
      ],
      currentYear: 2020,
      ckxcbjlList: [],
    };
  },
  computed: {
    swiperOption() {
      return {
        loop: true,
        slidesPerView: 5,
        centeredSlides: true,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };
    },
    optionSwitchImage() {
      return {
        autoPlay: false,
        switchSingleStep: 140,
      };
    },
    lhbSingleHeightTime() {
      return {
        autoPlay: false,
        singleHeight: 50,
        waitTime: 5000,
      };
    },
    autoScrollOption() {
      return {
        autoPlay: true, // 自动播放
        step: 0.5, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 0,
        direction: 1,
        singleHeight: 45,
      };
    },
  },
  methods: {
    changePt7(key) {
      var _this = this;
      _this.pt7showList = key;

      _this.$nextTick(function () {
        if (document.getElementById("chartTotalMoney")) {
          var charts = echarts.init(document.getElementById("chartTotalMoney"));
          charts.clear();
          this.changeYear();
        } else {
          // console.log(echarts.init(document.getElementById("chartUnits")));
          var charts = echarts.init(document.getElementById("chartUnits"));
          charts.clear();
          this.changeYear();
        }
      });
    },
    changeYear() {
      this.currentYear = new Date(this.year).getFullYear();
      var data = {};
      if (this.currentYear == 2020) {
        data = this.fmTempData[0];
      } else if (this.currentYear == 2021 ) {
        data = this.fmTempData[1];
      } else {
        data = {};
        return;
      }
      // 福民统计——各类型
      if (document.getElementById("chartTotalMoney")) {
        var moneyOption = echartsUtils.getEchartsConfig_EX_WT(
          data.typesData.chartType.toLowerCase(),
          data.typesData.xAxis,
          data.typesData.data,
          data.typesData.title,
          data.typesData.xUnit,
          // this.tempdata[6].legend,
          1
        );
        moneyOption.title.text = this.fmTempData[1].typesData.title;
        moneyOption.series[0].label["show"] = false;
        moneyOption.xAxis.axisLabel.textStyle.fontSize = "12";
        moneyOption.yAxis.axisLabel.textStyle.fontSize = "12";
        moneyOption.series[0]["barWidth"] = "5px";
        moneyOption.grid = {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "15%",
          containLabel: true,
        };
        this.time7 = echartsUtils.chartInit("chartTotalMoney", moneyOption, "");
      } else {
        // 福民统计——各社区
        var unitOption = echartsUtils.getEchartsConfig(
          data.committeeData.chartType.toLowerCase(),
          data.committeeData.xAxis,
          data.committeeData.data,
          data.committeeData.title,
          data.committeeData.xUnit
        );
        unitOption.title.text = this.fmTempData[1].committeeData.title;
        unitOption.series[0].radius = ["50%", "65%"];
        unitOption.series[0].center = ["20%", "40%"];
        unitOption.legend.textStyle.fontSize = 16;
        unitOption.legend.type = "plain";
        unitOption.legend.itemHeight = 7;
        unitOption.legend.itemWidth = 7;
        unitOption.legend.itemGap = 7;
        unitOption.legend.y = "0%";
        unitOption.legend.x = "55%";
        // unitOption.legend.grid.bottom=1;
        unitOption.title.fontSize = "12";
        unitOption.title.textStyle.color = "#09D5E4";
        unitOption.color = [
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
        ];
        this.time8 = echartsUtils.chartInit("chartUnits", unitOption, "");
      }
    },
    loaddytj(key) {
      this.$nextTick(function () {
        _this.initColumnDY(this.lxhlyData);
      });
    },
    initColumnDY(data) {
      if (document.getElementById("chartUnits")) {
        var charts = echarts.init(document.getElementById("chartUnits"));
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
      this.timer6 = echartsUtils.chartInit("chartUnits", qsOption_xl, "1");
    },

    LocationShape(item, index, xkey) {
      console.log(999);
      switch (xkey) {
        case "js_q_dszj_location": //LAYER_COMMUNITY
          this.dszjIndex = index;
          break;
      }
      var obj = {
        xkey: xkey,
        key: item.id || item.objectid,
      };
      this.$DsjCommon.LocationShape(obj); //定位地图
    },
    prev() {
      console.log(this.$refs.mySwiper);
      this.$refs.mySwiper.swiper.slidePrev();
    },
    next() {
      this.$refs.mySwiper.swiper.slideNext();
    },
    openqdxq(e) {
      console.log(e, "点击代办之星");
      let index = e.target.getAttribute("data-num");
      var item = this.AJListPhoto[index];
      let key = item.summary;
      if (key) {
        var obj = {
          title: "志愿者之星" + item.name,
          src: "",
          width: 987,
          height: 964,
          richtext: key.replace(/#000000/g, "#FFFFFF"),
        };
        this.$emit("showDpCommonRichtextObj", obj);
      }
    },
    //事项清单选中-打开页面
    handlerSelect(item) {
      var name = item.name;
      console.log(item, "点击选中,打开列表");
      this.selectSXQDname = name;
      switch (name) {
        case "行政审批":
          break;
        case "公共服务":
          break;
      }
      var url =
        this.GLOBAL.weburl_spfwSXQDList +
        this.selectSXQDname +
        "&layer_w=1061&layer_h=790&title=" +
        this.selectSXQDname +
        "&left=50%&top=42%";
      var event = {
        url: url,
      };
      window.showDpCommonPopup2(event);
    },
    //打开链接统计系统
    OpenFXXT() {
      var url =
        this.GLOBAL.weburl_fmtjfx +
        "&layer_w=1961&layer_h=1227&title=富民分析系统&left=42%&top=42%";
      var event = {
        url: url,
      };
      window.showDpCommonPopup2(event);
    },

    // 获取位数  四位
    ConvertValueGetWS(val, index) {
      var s = 4 - index;
      // if (s < 0) {
      //   s = 0;
      // }
      return parseInt(val / Math.pow(10, s)) % 10;
    },
    getSgsmzxbjl() {},
    GetBJL() {
      webAPI.server
        .get({
          url: "static/json/zhxz/yjson/spfw_sp.json",
          // url:this.GLOBAL.weburl_Onemap + "/Handler/dsj/spfw_sp.ashx"
        })
        .then((res) => {
          var data = res.data;
          this.sp_data = data;
          //console.log(data, "办件量");
          // 办件实时公示
          this.dataTableBJGS.cells = data[1].cells;
          this.dataTableBJGS.rows = data[1].rows;
          //console.log(this.dataTableBJGS, "办件实时公示");

          this.ssblqkdatalist1 = data[2];
          this.ssblqkdatalist2 = data[3];
          // this.changePt7(0);
          // var piedata = [];
          // this.sp_data[4].data.map((element, i) => {
          //   // var tep = [element.name, parseInt(element.value)];
          //   element.y = parseInt(element.value);
          //   if (i == 0) {
          //     element.selected = true;
          //     element.sliced = true;
          //   }
          //   // piedata.push(tep);
          // });
          // //console.log(piedata, 888);
          // //办理时限统计
          // var chart3_Option = highEchartsUtils.getEchartsConfig(
          //   this.sp_data[4].chartType.toLowerCase(),
          //   this.sp_data[4].xAxis,
          //   this.sp_data[4].data,
          //   //this.sp_data[4].data,
          //   this.sp_data[4].title,
          //   this.sp_data[4].xUnit,
          //   "",
          //   "theme1"
          // );
          // var piedata = [];
          // this.sp_data[5].data.map(element => {
          //   element.value = parseInt(element.value);
          // });

          // this.sp_data[5].data.map((element, i) => {
          //   element.value = parseInt(element.value);
          //   element.sets = element.name.split("|");
          //   if (element.sets.length > 1) {
          //     element.name = " ";
          //   }
          //   // if (this.sp_data[5].data.length - 1 == i) {
          //   //   element.value = 0;
          //   // }
          // });
          // var chart5bqd_Option = highEchartsUtils.getEchartsConfig(
          //   "venn", //"packedbubble",
          //   this.sp_data[5].xAxis,
          //   this.sp_data[5].data,
          //   this.sp_data[5].title,
          //   this.sp_data[5].xUnit,
          //   "",
          //   "theme1"
          // );
          if (!this.onlyeone) {
            this.onlyeone = !this.onlyeone;
            // this.timer3 = highEchartsUtils.chartInit(
            //   "chartSXQD",
            //   chart3_Option,
            //   "1"
            // );
            //console.log(chart5bqd_Option, 123456789);
            // this.timer4 = highEchartsUtils.chartInit(
            //   "chart5BQD",
            //   chart5bqd_Option,
            //   "1"
            // );
            this.czjzlhbData = this.sp_data[7].list;
            this.AJListPhoto = this.sp_data[8].list;
          }
          //窗口现场办结率
          this.ckxcbjlList = this.sp_data[6].list;

          //事项清单2
          //chartSXQD2
        });
    },
    startInterval() {
      this.GetBJL();
      // this.timebj = setInterval(() => {
      //   this.GetBJL();
      // }, 10000);
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
    // 富民统计
    getFMdataList() {
      webAPI.server
        .post({
          url:
            this.GLOBAL.weburl_xzspFM +
            "/fumin/apply-table-body/getTotalAmount",
          data: { year: 2020 },
        })
        .then((res) => {
          //console.log("123123123");
          //console.log(res);
        });
    },

    getBJMYD() {
      var url = "static/json/zhxz/yjson/spfwType.json";
      // var url =
      //   this.GLOBAL.weburl_Onemap +
      //   "/handler/dsj/dsjHandlerPra.ashx?type=spfw&DBTag=" +
      //   this.GLOBAL.Appid;
      webAPI.server
        .get({
          url: url,
        })
        .then((res) => {
          if (res.data.length === 0) return;
          //办件满意度
          this.BJMYDList = res.data[0].list;
        });
    },
  },
  components: {
    countTo,
    vueSeamlessScroll,
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    swiper,
    swiperSlide,
  },
  mounted() {
    this.getBJMYD();
    webAPI.server
      .get({
        url: "static/json/zhxz/yjson/spfw.json",

        //url: this.GLOBAL.weburl_Onemap + "/Handler/dsj/spfw.ashx"
      })
      .then((res) => {
        if (!res.data || res.data.length == 0) return;
        this.data = res.data;
        // 办件量
        this.bjlList = this.data[10].list;
        // //console.log(this.data, "sdsjd;k;'k")

        this.timedatalist = this.data[6].list;
        // 办件前五窗口

        // var SOption = echartsUtils.getEchartsConfig_EX_WT(
        //   this.data[0].chartType.toLowerCase(),
        //   this.data[0].xAxis,
        //   this.data[0].data,
        //   this.data[0].title,
        //   this.data[0].xUnit,
        //   this.data[0].legend,
        //   1
        // );
        var data = [];
        this.data[0].data.forEach((el) => {
          el.forEach((element) => {
            if (element) {
              data.push(element);
            }
          });
        });
        //console.log(data);
        var SOption = echartsUtils.getEchartConfig_Bar_3D(
          this.data[0].xAxis,
          data
        );
        this.bjxl = {
          tqbjxl: this.data[2].data[0].xUnit,
          bjl: this.data[3].data[0].xUnit,
        };
        // this.timer0 = echartsUtils.chartInit("chartBJTop5", SOption, "1");

        // var tqbjOption = echartsUtils.getEchartConfig_Gauge2(
        //   this.data[2].data[0].xUnit.split("%")[0]
        // );
        // this.timer2 = echartsUtils.chartInit("chartTQBJ", tqbjOption, "1");
        // var csbjOption = echartsUtils.getEchartConfig_Gauge2(
        //   this.data[3].data[0].xUnit.split("%")[0]
        // );
        // this.timer3 = echartsUtils.chartInit("chartCSBJ", csbjOption, "1");

        // 平均用时及总量
        // this.datalist = this.tempdata[2].list;
        if (this.data[6].list[0]) {
          this.datalist = this.data[6].list[0].value;
          this.SXZL[0] = parseInt(this.datalist / 1000) % 10;
          this.SXZL[1] = parseInt(this.datalist / 100) % 10;
          this.SXZL[2] = parseInt(this.datalist / 10) % 10;
          this.SXZL[3] = this.datalist % 10;
        }

        // 福民统计——各类型
        var moneyOption = echartsUtils.getEchartsConfig_EX_WT(
          this.fmTempData[1].typesData.chartType.toLowerCase(),
          this.fmTempData[1].typesData.xAxis,
          this.fmTempData[1].typesData.data,
          this.fmTempData[1].typesData.title,
          this.fmTempData[1].typesData.xUnit,
          // this.tempdata[6].legend,
          1
        );
        moneyOption.title.text = this.fmTempData[1].typesData.title;
        moneyOption.series[0].label["show"] = false;
        moneyOption.xAxis.axisLabel.textStyle.fontSize = "12";
        moneyOption.yAxis.axisLabel.textStyle.fontSize = "12";
        moneyOption.series[0]["barWidth"] = "5px";
        moneyOption.grid = {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "15%",
          containLabel: true,
        };
        // this.$nextTick(() => {
        setTimeout(() => {
          this.time7 = echartsUtils.chartInit(
            "chartTotalMoney",
            moneyOption,
            ""
          );
        }, 2000);
        // });
        // 福民统计——各社区
        var unitOption = echartsUtils.getEchartsConfig(
          this.fmTempData[1].committeeData.chartType.toLowerCase(),
          this.fmTempData[1].committeeData.xAxis,
          this.fmTempData[1].committeeData.data,
          this.fmTempData[1].committeeData.title,
          this.fmTempData[1].committeeData.xUnit
        );
        unitOption.series[0].center = ["30%", "75%"];
        unitOption.title.text = this.fmTempData[1].committeeData.title;
        unitOption.legend.textStyle.fontSize = 16;
        unitOption.legend.type = "plain";
        unitOption.legend.itemHeight = 7;
        unitOption.legend.itemWidth = 7;
        unitOption.legend.itemGap = 7;
        unitOption.legend.y = "95%";
        unitOption.legend.x = "55%";
        unitOption.title.fontSize = "24";
        unitOption.title.textStyle.color = "#09D5E4";
        unitOption.color = [
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
        ];
        unitOption.series[0].radius = ["50%", "70%"];
        console.log(unitOption, "unitOption");
        // this.$nextTick(() => {
        // setTimeout(() => {
        //   this.time8 = echartsUtils.chartInit("chartUnits", unitOption, "");
        // }, 2000);
        // });
      });
    this.startInterval();
  },
  destroyed() {
    // clearInterval(this.timebj);
    clearInterval(this.timeALL);
  },
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: 33% 33% 33%;
  // .panel {
  //   outline: 1px dashed #ff1493;
  // }
  .gxsj {
    position: absolute;
    left: 579px;
    top: 140px;
    font-size: 1.8rem;
    display: inline-block !important;
    padding: 10px 20px 20px 3rem;
    text-align: center;
    width: auto;
    z-index: 99999;
    color: #fff;
  }
  .highcharts-background {
    background: rgba(0, 0, 0, 0) !important;
  }
  .pt1_1 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt1_2 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .pt1 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    margin-top: 0px;
  }
  .pt2 {
    grid-row-start: 3;
    grid-row-end: 4;
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
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
  }
  .pt8 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt9 {
    top: 20px;
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 4;
  }
}
.lg_main {
  // .chartUnits::before {
  //   width: 246px;
  //   height: 350px;
  //   content: "";
  //   position: absolute;
  //   background: url("~static/images/xzsp/echartsbg.png") 0 0 no-repeat;
  //   background-position: center;
  //   top: 27px;
  //   left: 7px;
  // }
  .pt1_1 {
    .rightcontainer {
      width: 600px;
      height: 500px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      .right-item {
        width: 272px;
        height: 105px;
        background: url("~static/images/xzsp/rightbg.png");
      }
      .right-item:nth-child(1) {
        &::before {
          content: "";
          position: absolute;
          width: 98px;
          height: 98px;
          background: url("~static/images/xzsp/icon001.png") 0 0 no-repeat;
        }
      }
    }
  }
  .pt1_2 {
    .panel_header {
      width: 100%;
    }
    .flexRow {
      // justify-content: space-evenly;
      margin-top: 10px;
      flex-direction: column;
      justify-content: space-around; //分布
    }
    .container {
      cursor: pointer;
      background: url("~static/images/xzsp/border003.png") 0 0 no-repeat;
      width: 400px;
      height: 100px;
      background-position: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .rightitem {
        text-align: left;
        span {
          margin-top: 23px;
          font-size: 30.3px;
          color: #ffffff;
        }
        .name {
          margin-top: 0px;
        }
      }
      .leftitem {
        margin-top: -20px;
        margin-left: 30px;
        // line-height: 0px;
        // height: 20px;
        // width: 200px;
        font-size: 18px;
        color: #ffffff;
        // flex-basis: 15%;
      }
      .leftitem::before {
        //弹窗按钮设置
        content: "";
        position: absolute;
        background: url("~static/images/xzsp/spicon001.png") 0 0 no-repeat;
        background-size: 50% 50%;
        width: 100px;
        height: 100px;
        left: 82px;
        top: 205px;
      }
      .rightitem::before {
        content: "";
        position: absolute;
        background: url("~static/images/xzsp/spicon002.png") 0 0 no-repeat;
        background-size: 50% 50%;
        width: 100px;
        height: 100px;
        left: 82px;
        top: 104px;
      }
      .topitem_L {
        display: flex;
        flex-direction: column;
        // margin-left: 0px;
        span {
          color: #fff;
          &:nth-child(1) {
            font-size: 18px;
            color: #ffffff;
            margin-top: 40px;
            margin-left: 30px;
          }
          &:nth-child(2) {
            font-size: 8px;
            margin-top: 20px;
            margin-bottom: 10px;
            margin-left: 70px;
          }
        }
      }
      .topitem {
        display: flex;
        flex-direction: row;
        font-size: 24px;
        margin-left: 0px;
        span {
          color: #fff;
          &:nth-child(1) {
            color: #f6e603;
            margin-top: 10px;
            margin-left: 5px;
          }
          &:nth-child(2) {
            font-size: 18px;
            margin-top: 19px;
            margin-left: 7px;
          }
        }
      }
    }
    .current {
      background: url("~static/images/xzsp/border003seleect.png") 0 0 no-repeat !important;
    }
  }
  .pt1 {
    .panel_content {
      background: url("~static/images/xzsp/bjl-bg-new.png") 0 0 no-repeat;
      background-size: 100% 100%;
      width: 480px;
      height: 200px;
      bottom: 160px;
      // margin: -20px auto;
      // padding: 0 120px;
      // position: relative;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .bjl-item {
        margin-left: 10px;
        font-size: 14px;
        width: 122.5px;
        height: 122.5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        -webkit-animation: bounce_jump 2s ease-in-out infinite alternate;
        animation: bounce_jump 2s ease-in-out infinite alternate;
        background: url("~static/images/xzsp/bjl-label.png") center bottom
          no-repeat;
        background-size: 100% 100%;
        label {
          font-size: 22.15px;
          color: #fff;
          font-weight: bold;
          margin-top: 30px;
        }
        span {
          color: #fff;
          font-size: 13.45px;
        }
        p {
          margin-top: -35px;
          color: #fff;
          padding-top: 50px;
        }
      }
      .bjl-item-1 {
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: url("~static/images/xzsp/ball.png") center bottom no-repeat;
        background-size: 100% 100%;
        font-size: 45px;
        cursor: pointer;
        label {
          font-size: 37.81px;
          color: #ffffff;
          font-weight: bold;
        }
        span {
          font-size: 21.01px;
          color: #ffffff;
        }
        p {
          font-size: 21.01px;
          color: #04dfff;
        }
      }
    }
  }
  .pt2 {
    left: 10%;
    width: 80%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), #071b33);
    .panel_header {
      margin-top: 0px;
    }
    .panel_table {
      font-size: 14px;
      line-height: 3px;
      bottom: 10%;
      width: 100%;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .list_title {
        border: 1px solid #114ea9;
        line-height: 30px;
        font-size: 14px;
        .list_cell1 {
          overflow: auto;
        }
      }
      .list_content {
        overflow: hidden;
      }
      .list_cell0 {
        line-height: 30px;
        width: 10%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell1 {
        width: 25%;
        line-height: 30px;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell2 {
        width: 16%;
        line-height: 30px;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell3 {
        width: 15%;
        line-height: 30px;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
        width: 15%;
      }
      .list_cell4 {
        line-height: 30px;
        width: 30%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
        width: 17%;
      }
      .list_cell5 {
        width: 15%;
        line-height: 30px;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
    }
  }
  .btn11 {
    z-index: 999;
    position: absolute;
    left: 50%;
    width: 50px;
    margin: 0 auto;
    height: 50px;
    bottom: 20px;
    animation: arrowUp 1.2s ease-in infinite;
    display: inline-block;
    animation-fill-mode: both;
    background: url("~static/images/dsj/jjfz/arrow.png") center center no-repeat;
    background-size: 100%;
    display: inline-block;
  }
  .pt3 {
    // margin-top: -130px;
    .panel_content {
      width: 475px;
      height: 300px;
      position: relative;
      // margin: 0 auto;
      background: url("~static/images/xzsp/bk1.png") center center no-repeat;
      background-size: 319px 190px;
      background-position-x: 85px;
      background-position-y: 75px;
      margin-top: -40px;
      .panelAround {
        top: 112px;
        position: absolute;
        text-align: center;
        font-size: 30px;
        font-weight: bold;

        p:nth-child(1) {
          position: relative;
          font-size: 16px;
          top: -30px;
          left: -22px;
          width: 180px;
        }
        p:nth-child(2) {
          text-align: center;
          font-size: 21px;
        }
      }
      .panelAround1 {
        left: 20px;
        // top: 204px;
        width: 118px;
        height: 101px;
        color: #11faf6;
        background: url("~static/images/xzsp/zdzfry.png") center center
          no-repeat;
        background-size: 100% 100%;
      }
      .panelAround2 {
        p:nth-child(2) {
          top: 22px;
          font-size: 21px;
        }
        left: 180px;
        top: 65px;
        width: 120px;
        height: 101px;
        color: #f7f454;
        background: url("~static/images/xzsp/pawdcj.png") center center
          no-repeat;
        background-size: 100% 100%;
      }
      .panelAround3 {
        left: 340px;
        // top: 107px;
        width: 118px;
        height: 101px;
        color: #21fa34;
        background: url("~static/images/xzsp/gary.png") center center no-repeat;
        background-size: 100% 100%;
      }
      .bjmyd_text {
        width: 326px;
        height: 200px;
        text-align: center;
        top: 200px;
        left: 80px;
        position: relative;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        z-index: 999999;
        .name {
          font-size: 16px;
        }
        .value {
          font-size: 18px;
        }
      }
      // .bjmyd {
      //   width: 400px;
      //   height: 200px;
      //   background: url("~static/images/xzsp/bjmyd.png") center center no-repeat;
      //   background-size: 100% 100%;
      //   top: 80px;
      //   left: 30px;
      //   position: relative;
      // }
    }
    .panelDataChart {
      margin-left: 40px;
    }
    .pm {
      float: right;
      margin-right: 15px;
      margin-bottom: -50px;
      span {
        font-size: 20px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        font-style: italic;
        color: #e1a029;
        margin-right: 3px;
      }
    }
  }
  .pt6 {
    margin-top: -120px;
    .panel_content {
      width: 1155px;
      height: 600px;
      position: relative;
      margin: 0 auto;
      background: url("~static/images/xzsp/bk1.png") center center no-repeat;
      background-size: 722.4px 296.4px;
      margin-top: -40px;
      .panelAround {
        position: absolute;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        p:nth-child(1) {
          position: relative;
          top: -40px;
        }
        p:nth-child(2) {
          margin-top: 26px;
          font-size: 40px;
          line-height: 60px;
        }
      }
      .panelAround1 {
        left: -14px;
        top: 204px;
        width: 322px;
        height: 277.2px;
        color: #11faf6;
        background: url("~static/images/xzsp/zdzfry.png") center center
          no-repeat;
        background-size: 100% 100%;
      }
      .panelAround2 {
        left: 434px;
        top: 107px;
        width: 322px;
        height: 277.2px;
        color: #f7f454;
        background: url("~static/images/xzsp/pawdcj.png") center center
          no-repeat;
        background-size: 100% 100%;
      }
      .panelAround3 {
        left: 864px;
        top: 193px;
        width: 322px;
        height: 277.2px;
        color: #21fa34;
        background: url("~static/images/xzsp/gary.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .panelDataChart {
      margin-left: 40px;
    }
    .pm {
      float: right;
      margin-right: 15px;
      margin-bottom: -50px;
      span {
        font-size: 20px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        font-style: italic;
        color: #e1a029;
        margin-right: 3px;
      }
    }
  }
  .pt4 {
    position: relative;
    box-sizing: border-box;
  }
  .pt5 {
    // margin: 55px 0 40px 40px;
    position: relative;
    .panel_content {
      margin-top: 0px;
      width: 100%;
      font-size: 18px;
      font-weight: 100px;
      .seamless-warp {
        height: 500px;
        overflow: hidden;

        ul {
          height: 50;
          font-size: 12px;
        }

        & > div {
          & > div {
            color: yellow;
          }
        }
      }

      li {
        // margin: 12px 0;
        height: 50px;

        line-height: 5px;
        .icon {
          flex: 0 0 auto;
          display: inline-block;
          width: 37.5px;
          height: 45px;
          text-align: center;
          line-height: 42px;
          font-size: 1px;
        }
        .iconred {
          background: url("~static/images/xzsp/row01.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        .iconorange {
          background: url("~static/images/xzsp/row01.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        .iconblue {
          background: url("~static/images/xzsp/row2.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        .middlebox {
          width: 90%;
          margin-left: 20px;
          height: 97%;
          .name {
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            margin-top: 4px;
          }
          .perBox {
            width: 92%;
            /* padding: 0 10px; */
            background: #0e3c6e;
            border: 1px solid #004467;
            border-radius: 20px;
            height: 12px;
            right: 40px;
            margin-top: 4px;
            .per {
              display: inline-block;
              position: relative;
              max-width: 100%;
              height: 12px;
              background: red;
              top: 0px;
              border-radius: 15px;
              margin-right: 10px;
            }
            span {
              font-size: 1rem;
              top: -2px;
              position: relative;
            }
          }
        }

        .value {
          flex: 0 0 auto;
          width: 13%;
          font-size: 16px;
          margin-left: 0px;
          margin-top: 20px;
        }
        // .perBox {
        //   width: 45%;
        //   /* padding: 0 10px; */
        //   background: #0e3c6e;
        //   border: 1px solid #004467;
        //   border-radius: 20px;
        //   height: 15px;
        //   right: 40px;
        //   margin-top: -10px;
        //   .per {
        //     display: inline-block;
        //     position: relative;
        //     max-width: 100%;
        //     height: 15px;
        //     background: red;
        //     top: 0px;
        //     border-radius: 15px;
        //     margin-right: 10px;
        //   }
        //   span {
        //     font-size: 6rem;
        //     top: -2px;
        //     position: relative;
        //   }
        // }
      }
      li:nth-child(1) .perBox .per {
        // background: #c32d2e;
        background-image: -webkit-linear-gradient(left, #c32d2e, #fc772c);
      }

      li:nth-child(2) .perBox .per {
        background-image: -webkit-linear-gradient(left, #c32d2e, #fc772c);
      }

      li:nth-child(3) .perBox .per {
        background-image: -webkit-linear-gradient(left, #c32d2e, #fc772c);
      }

      li:nth-child(n + 4) .perBox .per {
        background-image: -webkit-linear-gradient(left, #0088fe, #04c5fe);
      }
    }
  }

  .pt7 {
    // margin-top: px;
    .panel_content {
      .tab {
        position: absolute;
        top: 117px;
        left: 160px;
        text-align: center;
        cursor: pointer;
        // margin-bottom: 10px;
      }
      .panelDataChart {
        margin-top: 0px;
      }
    }
    .panel_table {
      .list_content {
        overflow: hidden;
        //padding-left: 20px;
        li {
          //background: linear-gradient(left, #024487, #0d7750);
          background: none;
          position: relative;
          height: 50px;
          margin: 10px 0;
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
      width: 42px;
      height: 18px;
      border-radius: 4px;
      line-height: 18px;
      text-align: center;
      //color: #ee1d1d;
      font-weight: bold;
      font-size: 1.2rem;
      background: #e12929;
      margin-right: 10px;
      margin-top: 7px;
    }
    .list_cell1 {
      width: 60%;
      display: inline-block;
      margin-left: 10px;
      .type {
        text-align: left;
        font-size: 1.3rem;
        height: 3rem;
        line-height: 3rem;
      }
      .bar {
        width: 100%;
        height: 10px;
        border-radius: 5px;
        // background: rgba(255, 255, 255, 0.1);
      }
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
    .list_cell2 {
      width: 18%;
      text-align: left;
      color: #fff000;
      font-weight: bold;
      padding-top: 15px;
      padding-left: 15px;
      box-sizing: border-box;
    }
    .total-count {
      margin-top: -14px;
      top: 0px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .item {
        width: 140px;
        height: 43px;
        font-size: 14px;
        line-height: 2rem;
        background: url("~static/images/xzsp/pt5bk.png") no-repeat center;
        background-size: 100% 100%;
        // padding: 1rem 3rem;
        text-align: center;
        span {
          display: inline-block;
          color: #fffefe;
          font-size: 14px;
        }
        span:nth-child(1) {
          display: block;
          color: #fffefe;
          font-size: 14px;
        }
      }
      .item2 {
        display: flex;
        justify-content: space-around;
        height: 4rem;
        line-height: 1rem;
        font-size: 12px;
        background: url("~static/images/xzsp/fmtj.png") no-repeat center;
        border: 1px solid #00a0e9;
        border-radius: 6rem;
        .cell1 {
          background: url("~static/images/xzsp/fmtj.png") no-repeat center;
          border-right: 1px solid #00a0e9;
          border-radius: 2rem;
          padding: 1rem 3rem;
          background: rgba(12, 165, 244, 0.3);
          color: #fffefe;
        }

        .cell2 {
          background: url("~static/images/xzsp/fmtj.png") no-repeat center;
          padding: 1rem 3rem;
          background: rgba(12, 165, 244, 0.3);
        }
      }
    }
    .middlebox {
      width: 84px;
      height: 24px;
      border: 1px solid #03beff;
      border-radius: 12px;
      position: relative;
      top: 12px;
      left: 70px;
    }
    .middlebox /deep/ .el-date-editor.el-input.el-input--prefix {
      display: flex;
      width: 12px;
      // padding-left: 60px;
      input.el-input__inner {
        height: 24px;
        line-height: 24px;
        border: none;
        background-color: rgba(0, 0, 0, 0);
        align-self: center;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        padding: 0;
        width: 83px;
        margin-left: 10px;
      }
      .el-input__prefix,
      .el-input__suffix {
        display: none;
      }
    }
    // .total-count .el-input--prefix input.el-input__inner {
    //   background:red;
    // }
  }
  .pt8 {
    margin-left: 206px;
    width: 3163px;
    .panel_header {
      width: 44.2%;
    }
    .panel_content {
      background: rgba(0, 23, 51, 0.86);
    }
  }

  .pt9 {
    .panel_content {
      height: 400px;
      .flexRow {
        margin-top: 2px;
      }
      .list_content {
        overflow: hidden;
        height: 400px;
        .imgPanel {
          cursor: pointer;
          width: 207px;
          margin-left: 0px; //背景框左边距
          height: 300px;
          background: url("~static/images/xzsp/photoborder.png") 0 0 no-repeat;
          background-size: 180px 230px;
          img {
            width: 156px;
            height: 200px;
            /* margin: 0 auto; */
            margin-top: 14px;
            margin-left: 14px;
          }
          .namecontainer {
            width: 149px;
            height: 20px;
            background: url("~static/images/xzsp/namebg.png") 0 0 no-repeat;
            text-align: center;
            margin-top: -25px;
            position: absolute;
            margin-left: 20px;
            .name {
              font-size: 13.85px;
              text-align: center;
            }
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
            height: 40px;
            width: 1px;
            background: #273977;
            left: 10px;
            top: 0px;
            position: absolute;
          }
        }
      }
      .list_title {
        display: none;
      }
    }
    .swiper-slide {
      width: 300px !important;
    }
    .swiper-button-next {
      background-image: url("~static/images/xzsp/nextright.png");
    }
    .swiper-button-prev {
      background-image: url("~static/images/xzsp/nextleft.png");
    }
  }
  @keyframes bounce_jump {
    0% {
      -webkit-transform: translate(0, 0px);
      transform: translate(0, 0px);
    }
    100% {
      -webkit-transform: translate(0, 12px);
      transform: translate(0, 12px);
    }
  }
}
</style>
