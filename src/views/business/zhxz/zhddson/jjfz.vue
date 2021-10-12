<template>
  <div>
    <div class="panel pt1">
      <div class="panel_header">
        <div
          v-if="data.length>0"
          class="panel_headerTitle"
        >{{data[0].title}}</div>
      </div>
      <div class="panel_content">
        <div class="panel_table">
          <div class="list_title">
            <span
              :class="'list_cell'+cellKey"
              v-for="(cell,cellKey) in dataTableZDXM.cells"
              :key="cellKey"
            >{{cell}}</span>
          </div>
          <vue-seamless-scroll
            :data="dataTableZDXM.rows"
            style="height:120px;overflow:hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row,rowKey) in dataTableZDXM.rows"
                    :key="rowKey"
                  >
                    <span
                      :class="'list_cell'+row_cellKey"
                      v-for="(row_cell,row_cellKey) in row"
                      :key="row_cellKey"
                      @click="getXMJD(row[3],row[0])"
                    >{{row_cell}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
        <div class="process">
          <ul v-if="ZdxmDTable.length>0">
            <li
              v-for="(item,index) in ZdxmDTable"
              :class="item.sj?'active current':(item.sfytg == '1'? 'active': '')"
            >
              <div class="title">
                {{item.jd}}
                <span
                  class="file"
                  @click="getFile(item.jd)"
                ></span>
              </div>
              <div class="partment">
                {{item.zrdw}}
                <span class="time"> {{item.sj}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div
          v-if="data.length>0"
          class="panel_headerTitle"
        >{{data[1].title}}</div>
      </div>
      <div class="panel_content">
        <div class="tab">
          <ul>
            <li
              :class="showList==1?'current':''"
              @click="SDQTab(1,'水')"
            >
              <span>水</span>
            </li>
            <li
              :class="showList==2?'current':''"
              @click="SDQTab(2,'电')"
            >
              <span>电</span>
            </li>
            <li
              :class="showList==3?'current':''"
              @click="SDQTab(3,'气')"
            >
              <span>气</span>
            </li>
          </ul>
        </div>
        <div
          v-show="showList==1||showList==2||showList==3"
          class="panelDataChart"
        >
          <div class="panelDataChart_part">
            <div
              id="chartSDQ1"
              style="height:230px;"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="divDialog"
      class="popdiv"
      v-if="dialogVisible"
    >
      <div class="popbg">
        <div class="corner"></div>
        <div
          class="close"
          @click="dialogVisible=false"
        ></div>
        <iframe
          id="iframeDia"
          src
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          style="height:100%;width:100%"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";

import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      selectID: "",
      showList: 2, // 显示列
      // 表格行数
      listRowNum: 5,
      selectIndex: 0,
      data: [],

      dataTableS: {
        cells: [],
        rows: []
      },
      dataTableZDXM: {
        cells: [],
        rows: []
      },
      dataTableXM: {
        cells: [],
        rows: []
      },
      dataTableALL: {
        cells: [],
        rows: []
      },
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      dialogVisible: false,
      isFirst: 0,
      chart6_Option: {},
      chart7_Option: {},
      QOption: {},
      ZdxmDTable: []
    };
  },
  watch: {
    selectIndex(val) {
      this.dataTableXM.rows = [];
      for (
        let index = val * this.listRowNum;
        index < this.dataTableALL.rows.length;
        index++
      ) {
        if (index < val * this.listRowNum + this.listRowNum) {
          const item = this.dataTableALL.rows[index];
          this.dataTableXM.rows.push(item);
        } else {
          break;
        }
      }
    }
  },
  methods: {
    getFile(type) {
      return;
      this.dialogVisible = true;
      this.$nextTick(() => {
        document.getElementById("iframeDia").src =
          this.GLOBAL.weburl_Onemap +
          "/Web/Photo/PhotoBig.aspx?xpath=photo/全市重大产业项目进度/" +
          this.selectID +
          "/" +
          type +
          "/";
      });
    },
    getXMJD(id, name) {
      if (this.isFirst != 0) {
        var url =
          this.GLOBAL.weburl_DataCenter +
          "/Q.ashx?DBTag=" +
          this.GLOBAL.Appid +
          "&xKey=Query_ZHDD_ZDXM&id=" +
          id;
        webAPI.server
          .get({
            // url: "../static/json/rckc.json"
            url: url
          })
          .then(res => {
            $("iframe")[0].contentWindow.GeoneMap.clientShowPatrolPoints(
              res,
              true
            );
          });
      } else {
        this.isFirst = 1;
      }
      webAPI.server
        .get({
          // url: "../static/json/rckc.json"
          url:
            this.GLOBAL.weburl_Onemap +
            "/handler/dsj/jjfzzhdd_zdxmjd.ashx?name=" +
            name
        })
        .then(res => {
          if (res.data.length == 0) return;
          this.selectID = id;
          this.ZdxmDTable = res.data[0].data;
        });
    },
    SDQTab(showid, name) {
      this.showList = showid;
      switch (name) {
        case "电":
          echartsUtils.chartClear("chartSDQ1");
          this.timer12 = echartsUtils.chartInit(
            "chartSDQ1",
            this.chart6_Option,
            "1"
          );
          break;
        case "水":
          echartsUtils.chartClear("chartSDQ1");
          this.timer12 = echartsUtils.chartInit(
            "chartSDQ1",
            this.chart7_Option,
            "1"
          );
          break;
        case "气":
          echartsUtils.chartClear("chartSDQ1");
          this.timer12 = echartsUtils.chartInit("chartSDQ1", this.QOption, "1");
          break;
      }
    }
  },
  components: { countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/jjfzzhdd.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;
        // 重点项目
        this.dataTableZDXM.cells = this.data[0].cells;
        this.dataTableZDXM.rows = this.data[0].rows;

        console.log(this.data[3]);
        // 水
        // this.dataTableS.cells = this.data[3].cells;
        // this.dataTableS.rows = this.data[3].rows;

        // 电用量
        this.chart6_Option = echartsUtils.getEchartsConfig_EX_WT(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit,
          this.data[1].legend,
          "",
          1
        );
        // this.chart6_Option.legend.show = false;
        // 气
        this.QOption = echartsUtils.getEchartsConfig_EX(
          this.data[2].chartType.toLowerCase(),
          this.data[2].xAxis,
          [this.data[2].data],
          this.data[2].title,
          this.data[2].xUnit,
          ""
        );
        // 水
        this.chart7_Option = echartsUtils.getEchartsConfig_EX_WT(
          this.data[3].chartType.toLowerCase(),
          this.data[3].xAxis,
          this.data[3].data,
          this.data[3].title,
          this.data[3].xUnit,
          this.data[3].legend,
          "",
          1
        );
        this.SDQTab(2, "电");
        setTimeout(() => {
          this.getXMJD(
            this.dataTableZDXM.rows[0][3],
            this.dataTableZDXM.rows[0][0]
          );
        }, 200);
      });
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
.lg_main {
  .maintitle {
    background: linear-gradient(
      to right,
      rgba(0, 27, 120, 1),
      rgba(0, 27, 120, 0)
    );
    //padding-top: 10px;
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    span {
      background: linear-gradient(to right, #ff1e07, #fbff07, #ffb613);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 22px;
      font-weight: bold;
    }
  }
  .pt1 {
    .panel_table {
      .list_cell0 {
        width: 40%;
      }
      .list_cell1 {
        width: 30%;
      }
      .list_cell2 {
        width: 30%;
      }
      .list_cell3 {
        display: none;
      }
      .list_cell4 {
        display: none;
      }
      .list_title {
        padding: 4px 0;
      }
      .list_content {
        li {
        }
      }
    }
    .pager {
      text-align: center;
      padding: 5px;
      span {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.2);
        margin: 0 3px;
      }
      span.current {
        background: #36bcff;
      }
    }
    .process {
      margin-top: 30px;
      li {
        display: flex;
        margin: 4px 0;
        justify-content: space-between;
        position: relative;
        height: 32px;
        &:before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          background-image: url("~static/images/dsj/zdxmarrow_hd.png");
          background-position: 0 0;
          width: 18px;
          height: 39px;
        }
      }
      li.active {
        &:before {
          background-position: 0px 0;
        }
        .title {
          color: #efbe13;
          .file {
            background-position: 7px center;
          }
        }
        .partment {
          opacity: 1;
        }
      }
      li.current {
        .partment {
          height: 32px;
          margin-top: 0;
        }
      }
      .partment {
        //width: 30%;
        text-align: right;
        background-color: rgba(255, 255, 255, 0.1);
        display: inline-block;
        border-radius: 50px;
        padding: 3px 20px 0 20px;
        vertical-align: middle;
        font-size: 12px;
        height: 20px;
        margin-top: 4px;
        color: #efbe13;
        .time {
          display: block;
          color: red;
          font-size: 1rem;
        }
      }
      .title {
        padding-left: 40px;
        box-sizing: border-box;
        width: 60%;
        color: #96acde;
        font-size: 1.4rem;
        font-weight: bold;
        margin-top: 4px;
        .file {
          display: inline-block;
          width: 28px;
          height: 28px;
          border-radius: 14px;
          background-color: rgba(255, 255, 255, 0.1);
          background-image: url("~static/images/dsj/zdxmfile.png");
          background-position: -38px center;
          background-repeat: no-repeat;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
    }
  }
  .pt2 {
    .panel_header {
    }
    margin-top: 50px;
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

    .tab {
      position: absolute;
      right: 30px;
      top: 0;
      text-align: center;
      margin-bottom: 10px;
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
  .commontable {
    border: 1px solid #1b3d9e;
    width: 100%;
    th {
      text-align: left;
      padding: 3px 7px;
      background: rgba(10, 46, 154, 0.4);
      border: 1px solid #1b3d9e;
      color: #9babd8;
    }
    td {
      padding: 3px 7px;
      border: 1px solid #1b3d9e;
    }
  }
}
</style>
