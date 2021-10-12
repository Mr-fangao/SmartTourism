<template>
  <div class="lg_main">
    <div class="panel pt1">
      <div class="panel_header">
        <div
          class="panel_headerTitle"
          v-if="data.length > 0"
        >{{ data[0]['title'] }}</div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartAJBJ"
              style="height:410px;width:96%;"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div
          class="panel_headerTitle"
          v-if="data.length > 0"
        >{{ data[1]['title'] }}</div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartAJLX"
              style="height:410px;"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="panel pt3"
      style="margin-top:-50px;"
    >
      <div class="panel_header">
        <div
          class="panel_headerTitle"
          v-if="data.length > 0"
        >{{ data[2]['title'] }}</div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartSJApp"
              style="height:460px;width:96%;"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="map pt4">
      <iframe
        :src="this.GLOBAL.weburl_Onemap + '/map/mapcontainersbzb.html?type=zhzf&xUserName=zhxz_zhzf&right=620'"
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
        <div
          class="panel_headerTitle"
          v-if="data.length > 0"
        >{{ data[3]['title'] }}</div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartXCJW"
              style="height:410px;"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt6">
      <div class="panel_header">
        <div
          class="panel_headerTitle"
          v-if="data.length > 0"
        >{{ data[4]['title'] }}</div>

      </div>
      <div class="panel_content">
        <div class="panelDataChart_part">
          <div
            id="chartXCJWLX"
            style="height:410px;"
          ></div>
        </div>
      </div>
    </div>



    <div class="panel pt7">
      <div class="panel_header">
        <div
          class="panel_headerTitle"
          v-if="data.length > 0"
        >{{ data[5]['title'] }}</div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart_part">
          <div
            id="chartSSJ"
            style="height:410px;"
          ></div>
        </div>
      </div>
    </div>






    <div class="panel pt8">
      <div class="panel_table">
        <div class="table_title">
          <span
            class="point"
            style="margin-right:10px;"
          ></span>
          信访实时数据
        </div>
        <div class="list_title">
          <span
            :class="'list_cell' + cellKey"
            v-for="(cell, cellKey) in dataTableSTS.cells"
            :key="cellKey"
          >{{ cell }}</span>
        </div>
        <vue-seamless-scroll
          style="height:400px;overflow:hidden;background:#081e36;"
          :data="dataTableSTS.rows"
          :class-option="autoScrollOption"
        >
          <div class="list_content">
            <div class="list_contentInfo">
              <ul>
                <li
                  v-for="(row, rowKey) in dataTableSTS.rows"
                  :key="rowKey"
                >
                  <span class="point"></span>
                  <span
                    :class="'list_cell' + row_cellKey"
                    v-for="(row_cell, row_cellKey) in row"
                    :style="'color:' + (row_cell == '已办结' || row_cell == '归档' ? '#15f9ec' :row_cell == '办理中' ? '#fbd13e': 'white')"
                    :key="row_cellKey"
                  >{{ row_cell }}</span>
                </li>
              </ul>
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
      <div class="panel_table">
        <div class="table_title">
          <span
            class="point"
            style="margin-right:10px;"
          ></span>
          部门流转实时数据
        </div>
        <div class="list_title">
          <span
            :class="'list_cell' + cellKey"
            v-for="(cell, cellKey) in dataTableBMLZ.cells"
            :key="cellKey"
          >{{ cell }}</span>
        </div>
        <vue-seamless-scroll
          style="height:400px;overflow:hidden;background:#081e36;"
          :data="dataTableBMLZ.rows"
          :class-option="autoScrollOption"
        >
          <div class="list_content">
            <div class="list_contentInfo">
              <ul>
                <li
                  v-for="(row, rowKey) in dataTableBMLZ.rows"
                  :key="rowKey"
                >
                  <span class="point"></span>
                  <span
                    :class="'list_cell' + row_cellKey"
                    v-for="(row_cell, row_cellKey) in row"
                    :style="'color:' + (row_cell == '已办结' || row_cell == '归档' ? '#15f9ec' :row_cell == '办理中' ? '#fbd13e': 'white')"
                    :key="row_cellKey"
                  >{{ row_cell }}</span>
                </li>
              </ul>
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
      <div class="panel_table">
        <div class="table_title">
          <span
            class="point"
            style="margin-right:10px;"
          ></span>
          现场纠违实时数据
        </div>
        <div class="list_title">
          <span
            :class="'list_cell' + cellKey"
            v-for="(cell, cellKey) in dataTableXCJW.cells"
            :key="cellKey"
          >{{ cell }}</span>
        </div>
        <vue-seamless-scroll
          style="height:400px;overflow:hidden;background:#081e36;"
          :data="dataTableXCJW.rows"
          :class-option="autoScrollOption"
        >
          <div class="list_content">
            <div class="list_contentInfo">
              <ul>
                <li
                  v-for="(row, rowKey) in dataTableXCJW.rows"
                  :key="rowKey"
                >
                  <span class="point"></span>
                  <span
                    :class="'list_cell' + row_cellKey"
                    v-for="(row_cell, row_cellKey) in row"
                    :style="'color:' + (row_cell == '已处理' ? '#15f9ec' :row_cell == '处理中' ? '#fbd13e': 'white')"
                    :key="row_cellKey"
                  >{{ row_cell }}</span>
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
      data: [],
      dataTableSTS: {
        rows: [
          ["关于违建房屋问题", "服务对象来电反映", "13984047894", "2019-11-24"],
          [
            "关于人行道被占用",
            "3期4栋一位业主占中公共人行道",
            "18892403267",
            "2019-11-25",
          ],
          ["关于违建阳光房问题", "塑料厂", "", "2019-11-26"],
          ["关于违建房屋问题", "沼泾小学", "", "2019-11-27"],
          ["关于违建房屋问题", "浏昆线", "14980044125", "2019-11-28"],
          ["关于违建阳光房问题", "1号桥", "", "2019-11-29"],
          ["关于违建阳光房问题", "G204", "", "2019-11-30"],
          ["关于违建房屋问题", "服务对象来电反映", "13984047894", "2019-11-24"],
        ],
        cells: ["事项名称", "信访内容", "来电号码", "受理时间"],
      },
      dataTableBMLZ: {
        rows: [
          ["2019-11-20", "关于违建问题", "城市管理", "已办结"],
          ["2019-11-21", "关于人行道被占用", "城市管理", "已办结"],
          ["2019-11-22", "关于违建阳光房问题", "城市管理", "已办结"],
          ["2019-11-23", "关于楼栋内违搭彩钢棚问题", "规划建设", "已办结"],
          ["2019-11-24", "关于加油站私自扩建问题", "规划建设", "已办结"],
          ["2019-11-25", "关于人行道被占", "规划建设", "已办结"],
          ["2019-11-26", "关于人行道被占", "规划建设", "已办结"],
          ["2019-11-20", "关于违建问题", "城市管理", "已办结"],
        ],
        cells: ["上报时间", "标题", "事件类型", "流转状态"],
      },
      dataTableXCJW: {
        rows: [
          ["2019-11-24", "占道经营", "杜玲玲", "已处理"],
          ["2019-11-25", "占道经营", "李德贵", "已处理"],
          ["2019-11-26", "道路停车", "张朝阳", "已处理"],
          ["2019-11-27", "道路停车", "陈雪琪", "已处理"],
          ["2019-11-28", "道路停车", "赵敏越", "已处理"],
          ["2019-11-29", "违规用地", "王爱华", "已处理"],
          ["2019-11-30", "违规用地", "孟小圆", "已处理"],
          ["2019-11-24", "占道经营", "杜玲玲", "已处理"],
        ],
        cells: ["纠违时间", "纠违事项", "执法人员", "纠违状态"],
      },
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 3, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20,
      },
    };
  },
  methods: {
    geRadarOption(param) {
      // 雷达图option构建
      let option = {
        tooltip: {
          // trigger: "axis",
          // formatter: "{b} : {c}",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            fontSize: 25,
            fontWeight: "bold",
          },
          confine: true,
          enterable: true,
        },
        // legend: {
        //   show: false,
        //   itemGap: 4,
        //   itemWidth: 35,
        //   itemHeight: 25,
        //   orient: "vertical",
        //   x: "right",
        //   y: "center",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 25,
        //   },
        //   //   data: param.legend,
        // },
        color: ["#F57300", "#2DD1CF", "#2DD1CF"],
        calculable: true,
        polar: [
          {
            name: {
              show: true,
              formatter: "{value}",
              textStyle: {
                color: "#ffffff",
                fontSize: 25,
              },
            },
            indicator: param.indicator,
            axisLabel: {
              // 坐标轴文本标签，详见axis.axisLabel
              show: false,
              fontSize: 34,
              textStyle: {
                fontSize: 34, // 坐标轴刻度文字的样式
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgb(3,124,254,0.3)"],
                // 图表背景网格的颜色
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: ["#0478c3"],
                // 图表背景网格线的颜色
              },
            },
            radius: 160,
            scale: true,
            type: "circle",
          },
        ],
        series: [
          {
            name: "",
            type: param.chartType,
            data: param.data,
            areaStyle: {
              color: "#3e6cad",
            },
          },
        ],
      };
      return option;
    },
    parentClick(e) {
      if (e.target.tagName) {
        let url =
          this.GLOBAL.weburl_Onemap +
          "/Web/FlowXXTS/LcTabReadOnlyXXTS.aspx?stype=xxts&s=0.027706387414021316&BH=20190012055";
        // 判断事件源是否是IMG标签
        window.open(
          url,
          "newwindow",
          "height=580, width=1020,screenX=400px,screenY=100px"
        );
      }
    },
  },
  components: { countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        // url: 'static/json/zhxz/zfpt.json'
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/zfpt.ashx",
      })
      .then((res) => {
        if (res.data.length == 0) return;
        this.data = res.data;
        // 案件办结率
        var ajbjOption = echartsUtils.getEchartsConfig_EX(
          "column",
          this.data[0].xAxis,
          this.data[0].data,
          this.data[0].title,
          this.data[0].xUnit,
          this.data[0].legend
        );
        ajbjOption.legend = {
          orient: "horizontal",
          right: 10,
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 20,
          align: "left",
          textStyle: {
            fontSize: 18,
            color: "#ffffff",
          },
        };
        ajbjOption.series.forEach((el) => {
          el.barWidth = 40;
        });
        // option = {
        //   legend: {},
        //   tooltip: {},
        //   color: ["#0161eb", "#01eb54"],
        //   dataset: {
        //     source: [
        //       ["product", "2015", "2016", "2017"],
        //       ["Matcha Latte", 43.3, 85.8, 93.7],
        //       ["Milk Tea", 83.1, 73.4, 55.1],
        //       ["Cheese Cocoa", 86.4, 65.2, 82.5],
        //       ["Walnut Brownie", 72.4, 53.9, 39.1],
        //     ],
        //   },
        //   xAxis: { type: "category" },
        //   yAxis: {},
        //   // Declare several bar series, each will be mapped
        //   // to a column of dataset.source by default.
        //   series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
        // };
        ajbjOption.xAxis.axisLabel.rotate = 0;
        ajbjOption.color = ["#0161eb", "#01eb54"];
        console.log(this.data, "2222222");
        // ajbjOption.series[0].itemStyle.normal.color = ['#0161eb','#01eb54']
        this.timer0 = echartsUtils.chartInit("chartAJBJ", ajbjOption, "1");
        // 案件
        var ajlxAndLyOption = echartsUtils.getEchartsConfig(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit,
          4
        );
        ajlxAndLyOption.legend = {
          orient: "vertical",
          right: 200,
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 50,
          padding: [0, 46, 0, 0],
          align: "left",
          textStyle: {
            fontSize: 18,
            color: "#ffffff",
          },
          icon: "circle",
        };
        ajlxAndLyOption.tooltip.formatter = "{b}: {d}%";
        ajlxAndLyOption.series[0].label = {
          show: true,
          position: "outside",
          formatter: "{d}%",
          fontSize: 30,
          color: "#c2d2fa",
        };
        // ajlxAndLyOption.xAxis.axisLabel.rotate = 0
        this.timer1 = echartsUtils.chartInit("chartAJLX", ajlxAndLyOption, "1");
        // 执法人员出动人次
        var sjAppOption = echartsUtils.getEchartsConfig_EX2(
          this.data[2].chartType.toLowerCase(),
          this.data[2].xAxis,
          [this.data[2].data],
          this.data[2].title,
          this.data[2].yAxis,
          this.data[2].legend,
          2, // 线和柱状图
          2 // 线状开始索引
        );
        sjAppOption.series[0].barWidth = "50%";
        // sjAppOption.xAxis.axisLabel.rotate = 0
        // sjAppOption.series[0].backgroundStyle.color = 'rgba(249,143,72,0.92)'
        // sjAppOption.series[0].showBackground = true
        sjAppOption.legend = {
          orient: "horizontal",
          right: 10,
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 20,
          align: "left",
          textStyle: {
            fontSize: 18,
            color: "#ffffff",
          },
        };
        sjAppOption.series[0].itemStyle.normal.color = "rgba(249,143,72)";
        sjAppOption.series[0].itemStyle.normal.shadowColor = "#0d204d";
        sjAppOption.series[0].showBackground = true;
        this.timer2 = echartsUtils.chartInit("chartSJApp", sjAppOption, "1");
        // 现场纠违数据统计
        var xcjwOption = echartsUtils.getEchartsConfig_EX(
          "column",
          this.data[3].xAxis,
          this.data[3].data,
          this.data[3].title,
          this.data[3].xUnit,
          this.data[3].legend
        );
        // xcjwOption.xAxis.axisLabel.rotate = "0";
        xcjwOption.series.forEach((el) => {
          el.barWidth = 40;
        });
        xcjwOption.legend = {
          orient: "horizontal",
          right: 10,
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 20,
          align: "left",
          textStyle: {
            fontSize: 18,
            color: "#ffffff",
          },
        };
        xcjwOption.xAxis.axisLabel.rotate = 0;
        xcjwOption.color = ["#0161eb", "#01eb54"];
        this.timer3 = echartsUtils.chartInit("chartXCJW", xcjwOption, "1");
        var xcjwlxOption = this.geRadarOption(this.data[4]);
        // 现场纠违类型统计
        // xcjwlxOption.legend.show = "false";
        this.timer4 = echartsUtils.chartInit("chartXCJWLX", xcjwlxOption, "1");
        var ssjOption = echartsUtils.getEchartsConfig_EX(
          this.data[5].chartType.toLowerCase(),
          this.data[5].xAxis,
          [this.data[5].data],
          this.data[5].title,
          this.data[5].xUnit,
          this.data[5].legend
        );
        this.timer5 = echartsUtils.chartInit("chartSSJ", ssjOption, "1");
      });
  },
  destroyed() {
    clearInterval(this.timeALL);
    clearInterval(this.timeTf);
  },
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 19% auto 22.8%;
  grid-template-rows: 34% 34% 32%;
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
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }
}
.lg_main {
  .pt1 {
  }
  .pt2 {
  }
  .pt3 {
  }
  .pt4 {
    position: relative;
    box-sizing: border-box;
  }
  .pt5 {
  }
  .pt6 {
  }
  .pt7 {
  }
  .pt8 {
    // border:1px solid red;
    display: flex;
    justify-content: space-around;
    margin-top: -70px;
    .table_title {
      margin-bottom: 30px;
      font-size: 2.8rem;
      padding-left: 50px;
    }
  }
  .pt8 {
    .panel_table {
      width: 1077px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .list_title {
        .list_cell1 {
          overflow: auto;
        }
      }
      .list_content {
        //overflow: hidden;
      }
      .list_cell0 {
        width: 34%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell1 {
        width: 25%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell2 {
        width: 18%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell3 {
        width: 15%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
        width: 15%;
      }
      .list_cell4 {
        width: 30%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
        width: 17%;
      }
      .list_cell5 {
        width: 15%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .point {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #04c7ff;
      }
    }
  }
}
</style>
