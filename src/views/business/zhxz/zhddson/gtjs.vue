<template>
  <div>
    <div class="part part1">
      <div class="maintitle">
        <span>国土</span>
      </div>
      <div class="bg">
        <div
          @click="selectYear=''"
          style="z-index:99; position: absolute;margin-left: 350px;"
        >全部年份</div>
        <div
          id="chartGT"
          style=" height:165px;width:390px; "
        ></div>
        <div class="tab">
          <ul>
            <li
              :class="selectItem=='全部'? 'current':''"
              @click="selectItem='全部'"
            >
              <span>全部</span>
            </li>
            <li
              :class="selectItem=='已供'? 'current':''"
              @click="selectItem='已供'"
            >
              <span>已供</span>
            </li>
            <li
              :class="selectItem=='未供'? 'current':''"
              @click="selectItem='未供'"
            >
              <span>未供</span>
            </li>
          </ul>
        </div>

        <div class="list_title">
          <span
            :class="'list_cell'+cellKey"
            v-for="(cell,cellKey) in dataTableGT.cells"
            :key="cellKey"
          >{{cell}}</span>
        </div>
        <vue-seamless-scroll
          :data="dataTableGT.rows"
          style="height:235px;overflow:hidden"
          :class-option="autoScrollOption"
        >
          <div class="list_content">
            <div class="list_contentInfo">
              <ul>
                <li
                  v-for="(row,rowKey) in dataTableGT.rows"
                  :key="rowKey"
                >
                  <span
                    :class="'list_cell'+row_cellKey"
                    :style="row_cellKey==3?(row_cell=='已供'?'color:limegreen':'color:red'):''"
                    v-for="(row_cell,row_cellKey) in row"
                    :key="row_cellKey"
                    @click="getGTPosition(row[4])"
                  >{{row_cell}}</span>
                </li>
              </ul>
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
    <div class="part part2">
      <div class="maintitle">
        <span>建设</span>
      </div>
      <div class="bg">
        <div class="pt2">
          <div class="list_title">
            <span
              :class="'list_cell'+cellKey"
              v-for="(cell,cellKey) in dataTableJS.cells"
              :key="cellKey"
            >{{cell}}</span>
          </div>
          <vue-seamless-scroll
            :data="dataTableJS.rows"
            style="height:235px;overflow:hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row,rowKey) in dataTableJS.rows"
                    :key="rowKey"
                  >
                    <span
                      :class="'list_cell'+row_cellKey"
                      v-for="(row_cell,row_cellKey) in row"
                      :key="row_cellKey"
                      @click="getJSPosition(row[4])"
                    >{{row_cell}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
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
      dataTableGT: { ccells: [], rows: [] },
      dataTableJS: { ccells: [], rows: [] },
      data: [],
      autoScrollOption: {
        autoPlay: true, //自动播放
        step: 0.2, //滚动速度（步长）
        limitMoveNum: 6, //开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      selectItem: "",
      selectYear: ""
    };
  },
  watch: {
    selectItem(val) {
      this.getGTLB();
    },
    selectYear(val) {
      this.getGTLB();
    }
  },
  methods: {
    getJSPosition(id) {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=Query_Building&name=" +
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
    getGTPosition(id) {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=Query_ZHDD_GT&id=" +
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
    getGTLB() {
      webAPI.server
        .get({
          // url: "../static/json/rckc.json"
          url:
            this.GLOBAL.weburl_Onemap +
            "/handler/zhddson/gtjs_lb.ashx?type=" +
            this.selectItem +
            "&year=" +
            this.selectYear
        })
        .then(res => {
          if (res.data.length == 0) return;

          this.dataTableGT.cells = res.data[0].cells;
          res.data[0].rows.forEach(row => {
            if (row[0].length > 13) {
              row[0] = row[0].substring(0, 12) + "...";
            }
          });
          this.dataTableGT.rows = res.data[0].rows;
        });
    },
    chartAction(ID, chart_Option) {
      var _this = this;
      var chart = echarts.init(document.getElementById(ID));
      chart.on("click", function(param) {
        _this.selectYear = param.name;
      });
      chart.setOption(chart_Option);
    }
  },
  components: {  countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/zhddson/gtjs.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        var gtOption = echartsUtils.getEchartsConfig_EX(
          this.data[0].chartType.toLowerCase(),
          this.data[0].xAxis,
          this.data[0].data,
          this.data[0].title,
          this.data[0].xUnit,
          this.data[0].legend,
          this.data[0].stack
        );
        this.timer0 = this.chartAction("chartGT", gtOption, "1");
        this.selectItem = "全部";
        this.dataTableJS.cells = this.data[1].cells;
        this.data[1].rows.forEach(row => {
          if (row[0].length > 8) {
            row[0] = row[0].substring(0, 7) + "...";
          }
          if (row[1].length > 9) {
            row[1] = row[1].substring(0, 8) + "...";
          }
        });
        this.dataTableJS.rows = this.data[1].rows;
      });
  }
};
</script>
<style lang="less" scoped>
.part {
  width: 436px;
  margin-top: 5px;
  .maintitle {
    background: url("~static/images4800/titlebg.png") 0 0 no-repeat;
    height: 36px;
    text-align: center;
    line-height: 34px;
    span {
      font-weight: bold;
      font-size: 2rem;
      color: #ffcc00;
      letter-spacing: 5px;
    }
  }
  .pager {
    text-align: center;
    img {
      margin: 0 5px;
      cursor: pointer;
    }
  }
  .bg {
    border-left: 1px solid #1b3d9e;
    border-right: 1px solid #1b3d9e;
    border-bottom: 1px solid #1b3d9e;
    padding: 2rem 1rem;
    .list_cell0 {
      width: 40%;
    }
    .list_cell1 {
      width: 30%;
    }
    .list_cell2 {
      width: 15%;
    }
    .list_cell3 {
      width: 15%;
    }
    .list_cell4 {
      display: none;
    }
    .list_title {
      padding: 2px 0;
    }
    .list_content {
      li {
        padding: 2px 0;
      }
    }
    .tab {
      text-align: center;
      margin-bottom: 10px;
      li {
        display: inline-block;
        background: rgba(21, 111, 187, 0.3);
        border-radius: 2px;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        margin: 0 3px;
        cursor: pointer;
      }
      li.current {
        background: rgba(21, 111, 187, 1);
      }
    }
  }
}
.part2 {
  margin-top: 20px;
  .bg {
    .list_cell0 {
      width: 30%;
    }
    .list_cell1 {
      width: 35%;
    }
    .list_cell2 {
      width: 20%;
    }
    .list_cell3 {
      width: 15%;
    }
    .list_cell4 {
      display: none;
    }
    .list_cell5 {
      display: none;
    }
    .list_title {
      padding: 2px 0;
    }
    .list_content {
      li {
        padding: 2px 0;
      }
    }
  }
}
.pt2 {
}
</style>
