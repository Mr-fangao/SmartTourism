<template>
  <div class="lg_main">
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">规上企业研发投入及企业专利数</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartGS"
            style=" height:250px; "
          ></div>
        </div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div class="panel_headerTitle">各类科技企业数量</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartQY"
            style=" height:280px;width:450px  "
          ></div>
        </div>
      </div>
    </div>
    <div class="panel pt3">
      <div class="panel_header">
        <div class="panel_headerTitle">科技项目立项统计</div>
      </div>
      <div class="flexRow">
        <div class="panelDataChart">
          <div
            class="title"
            style="margin:10px 0 -20px 0"
          >产学研合作数</div>
          <div class="panelDataChart_part">
            <div
              id="chartHz"
              style=" height:240px;width:250px; "
            ></div>
          </div>
        </div>
        <div class="panelDataChart">
          <div
            class="title"
            style="margin:10px 0 -20px 0"
          >科技项目立项数</div>
          <div class="panelDataChart_part">
            <div
              id="chartLX"
              style=" height:240px;width:230px  "
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt4">
      <iframe
        :src="this.GLOBAL.weburl_Onemap+'/map/mapcontainersbzb.html?type=rckc&xUserName=zhzs_rckc'"
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
        <div class="panel_headerTitle">研发机构数</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartJG"
            style=" height:230px;width:450px;margin:0px 30px 0px -30px"
          ></div>
        </div>
      </div>
    </div>
    <div
      id="pt6"
      class="panel pt6"
      style="overflow:hidden;"
    >
      <div class="panel_header">
        <div class="panel_headerTitle">领军人才数量统计</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chartLJ"
            style=" height:250px;width:440px;"
          ></div>
        </div>
      </div>
    </div>
    <div
      id="pt7"
      class="panel pt7"
      style="overflow:hidden;    width: 450px;"
    >
      <div class="panel_header">
        <div class="panel_headerTitle">人才站点</div>
      </div>
      <div class="list_title">
        <span
          :class="'list_cell'+cellKey"
          v-for="(cell,cellKey) in dataTableRC.cells"
          :key="cellKey"
        >{{cell}}</span>
      </div>
      <vue-seamless-scroll
        :data="dataTableRC.rows"
        style="height:200px;overflow:hidden"
        :class-option="autoScrollOption"
        @click.native="parentClick"
      >
        <div class="list_content">
          <div class="list_contentInfo">
            <ul>
              <li
                v-for="(row,rowKey) in dataTableRC.rows"
                :key="rowKey"
                :data-id="row[3]"
              >
                <span
                  :data-id="row[3]"
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
</template>
<script>
import echartsUtils from "js/echartsUtils.js"; //js/echartsUtils.js
import countTo from "vue-count-to";

import vueSeamlessScroll from "vue-seamless-scroll";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      dataTableRC: {
        cells: [],
        rows: []
      },
      dataTableQD: {
        cells: [],
        rows: []
      },
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
      type: "left"
    };
  },
  methods: {
    parentClick(e) {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=Query_RCKC_RCZD&id=" +
        e.target.dataset.id;
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
    }
  },
  components: {  countTo, vueSeamlessScroll, swiper, swiperSlide },
  mounted() {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/rckc.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;
        var gsOption = echartsUtils.getEchartsConfig_EXS(
          this.data[0].chartType.toLowerCase(),
          this.data[0].xAxis,
          this.data[0].data,
          this.data[0].title,
          this.data[0].yAxis,
          this.data[0].legend,
          2, //线和柱状图
          2 //线状开始索引
        );
        this.timer0 = echartsUtils.chartInit("chartGS", gsOption, "1");
        var hzOption = echartsUtils.getEchartsConfig(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit
        );
        this.timer1 = echartsUtils.chartInit("chartHz", hzOption, "1");
        var lxOption = echartsUtils.getEchartsConfig(
          this.data[2].chartType.toLowerCase(),
          this.data[2].xAxis,
          this.data[2].data,
          this.data[2].title,
          this.data[2].xUnit
        );
        this.timer2 = echartsUtils.chartInit("chartLX", lxOption, "1");
        var qyOption = echartsUtils.getEchartsConfig_EX2(
          this.data[3].chartType.toLowerCase(),
          this.data[3].xAxis,
          this.data[3].data,
          this.data[3].title,
          this.data[3].xUnit,
          this.data[3].legend
        );
        this.timer3 = echartsUtils.chartInit("chartQY", qyOption, "1");
        var jgOption = echartsUtils.getEchartsConfig(
          this.data[4].chartType.toLowerCase(),
          this.data[4].xAxis,
          this.data[4].data,
          this.data[4].title,
          this.data[4].xUnit
        );
        this.timer4 = echartsUtils.chartInit("chartJG", jgOption);
        this.dataTableRC.cells = this.data[5].cells;
        this.data[5].rows.forEach(row => {
          if (row[0].length > 11) {
            row[0] = row[0].substring(0, 10) + "...";
          }
        });
        this.dataTableRC.rows = this.data[5].rows;

        var ljOption = echartsUtils.getEchartsConfig(
          this.data[6].chartType.toLowerCase(),
          this.data[6].xAxis,
          this.data[6].data,
          this.data[6].title,
          this.data[6].xUnit
        );
        this.timer6 = echartsUtils.chartInit("chartLJ", ljOption, "1");
      });
  },
  destroyed() {
    clearInterval(this.time2);
    clearInterval(this.timeALL);
  }
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 26% 48% 26%;
  grid-template-rows: 33% 33% 29% 5%;
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
  background: url("~static/images4800/line.png") right 0px no-repeat;
  .pt1 {
    .textPanel {
      background: rgba(255, 255, 255, 0.02);
      border-radius: 10px;
      padding: 15px;
      //border:1px solid #32d1ff;
      box-shadow: 0 0 15px inset rgba(24, 167, 209, 0.4);
    }
    p {
      text-indent: 2em;
      margin: 6px 0;
      font-size: 1.2rem;
      line-height: 1.6rem;
    }
    p.title {
      font-weight: bold;
      font-size: 1.8rem;
      text-indent: 0;
      margin-top: 30px;
      &:nth-child(1) {
        margin-top: 0;
      }
    }
    p.color1 {
      color: #ff211f;
    }
    p.color2 {
      color: #ffe30c;
    }
    p.color3 {
      color: #48ff8a;
    }
  }
  .pt2 {
    .panelDataChart {
      margin-top: 0px;
    }
  }
  .pt3 {
    margin-top: 10px;
    .panelDataChart {
      .title {
        font-size: 1.5rem;
      }
    }
  }
  .pt4 {
    position: relative;
    padding-top: 35px;
    box-sizing: border-box;
  }
  .pt5 {
    margin-top: 35px;
    .panelDataChart {
    }
  }
  .pt6 {
    width: 500px;
    .panelDataChart {
      margin: 0px 0 0 25px;
    }
  }
  .pt7 {
    .panel_table {
      .list_content {
        height: 200px;
        overflow: hidden;
      }
    }
    .list_cell0 {
      width: 40%;
    }
    .list_cell1 {
      width: 20%;
    }
    .list_cell2 {
      width: 40%;
    }
    .list_cell3 {
      display: none;
    }
    .list_cell4 {
      display: none;
    }
    .list_cell10 {
      display: none;
    }
    .list_cell11 {
      width: 40%;
      display: inline-block;
    }
    .list_cell12 {
      width: 15%;
      display: inline-block;
    }
    .list_cell13 {
      width: 30%;
      display: inline-block;
    }
    .list_cell14 {
      width: 15%;
      display: inline-block;
    }
  }
}
</style>
