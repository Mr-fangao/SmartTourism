<template>
  <div>
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">重点项目</div>
      </div>
      <div class="panel_table">
        <div class="list_title">
          <span
            :class="'list_cell'+cellKey"
            v-for="(cell,cellKey) in dataTableXM.cells"
            :key="cellKey"
          >{{cell}}</span>
        </div>
        <div class="list_content">
          <div class="list_contentInfo">
            <ul>
              <li
                v-for="(row,rowKey) in dataTableXM.rows"
                :key="rowKey"
              >
                <span
                  :class="'list_cell'+row_cellKey"
                  v-for="(row_cell,row_cellKey) in row"
                  :key="row_cellKey"
                  @click="getXMJD(row[3],row[4])"
                >{{row_cell}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="pager">
          <span
            :class="selectIndex==row_cellKey?'current':''"
            v-for="(row_cell,row_cellKey) in spanList"
            :key="row_cellKey"
            @click="selectIndex=row_cellKey"
          ></span>
        </div>
      </div>
      <div>
        <table class="commontable">
          <tr>
            <th style="width:30%">项目名称</th>
            <td colspan="3">{{xmmc}}</td>
          </tr>
          <tr>
            <th>项目总投资_万元</th>
            <td>{{xmztz}}</td>
            <th style="width:25%">占地面积_亩</th>
            <td>{{zdmj}}</td>
          </tr>
          <tr>
            <th>建设性质</th>
            <td>{{jsxz}}</td>
            <th>行业类别</th>
            <td>{{hylb}}</td>
          </tr>
        </table>
      </div>
      <div class="process">
        <ul>
          <li :class="lx.class">
            <div class="title">
              立项
              <span
                class="file"
                @click="getFile('01_立项')"
              ></span>
            </div>
            <div class="partment">
              镇行政审批局
              <span class="time">{{lx.sj}}</span>
            </div>
          </li>
          <li :class="qyhp.class">
            <div class="title">
              企业环评
              <span
                class="file"
                @click="getFile('02_企业环评')"
              ></span>
            </div>
            <div class="partment">
              镇综合执法局/市环保局
              <span class="time">{{qyhp.sj}}</span>
            </div>
          </li>
          <li :class="gsyyzz.class">
            <div class="title">
              工商营业执照
              <span
                class="file"
                @click="getFile('03_工商执照')"
              ></span>
            </div>
            <div class="partment">
              市行政审批局
              <span class="time">{{gsyyzz.sj}}</span>
            </div>
          </li>
          <li :class="tdht.class">
            <div class="title">
              土地合同
              <span
                class="file"
                @click="getFile('04_土地合同')"
              ></span>
            </div>
            <div class="partment">
              市自然资源和规划局
              <span class="time">{{tdht.sj}}</span>
            </div>
          </li>
          <li :class="jsydgh.class">
            <div class="title">
              建设用地规划许可证
              <span
                class="file"
                @click="getFile('05_用地规划')"
              ></span>
            </div>
            <div class="partment">
              镇行政审批局
              <span class="time">{{jsydgh.sj}}</span>
            </div>
          </li>
          <li :class="jsyd.class">
            <div class="title">
              建设用地许可证
              <span
                class="file"
                @click="getFile('06_用地许可')"
              ></span>
            </div>
            <div class="partment">
              市自然资源和规划局
              <span class="time">{{jsyd.sj}}</span>
            </div>
          </li>
          <li :class="tdz.class">
            <div class="title">
              土地证
              <span
                class="file"
                @click="getFile('07_土地证')"
              ></span>
            </div>
            <div class="partment">
              市房产交易管理中心
              <span class="time">{{tdz.sj}}</span>
            </div>
          </li>
          <li :class="fapf.class">
            <div class="title">
              方案批复
              <span
                class="file"
                @click="getFile('08_方案批复')"
              ></span>
            </div>
            <div class="partment">
              镇行政审批局
              <span class="time">{{fapf.sj}}</span>
            </div>
          </li>
          <li :class="tsyj.class">
            <div class="title">
              图审意见
              <span
                class="file"
                @click="getFile('09_图审意见')"
              ></span>
            </div>
            <div class="partment">
              图审中心
              <span class="time">{{tsyj.sj}}</span>
            </div>
          </li>
          <li :class="jsgc.class">
            <div class="title">
              建设工程规划许可证
              <span
                class="file"
                @click="getFile('10_工程规划')"
              ></span>
            </div>
            <div class="partment">
              镇行政审批局
              <span class="time">{{jsgc.sj}}</span>
            </div>
          </li>
          <li :class="tshgz.class">
            <div class="title">
              图审合格证
              <span
                class="file"
                @click="getFile('11_图审合格')"
              ></span>
            </div>
            <div class="partment">
              图审中心
              <span class="time">{{tshgz.sj}}</span>
            </div>
          </li>
          <li :class="sg.class">
            <div class="title">
              施工许可证
              <span
                class="file"
                @click="getFile('12_施工许可')"
              ></span>
            </div>
            <div class="partment">
              镇行政审批局
              <span class="time">{{sg.sj}}</span>
            </div>
          </li>
        </ul>
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
      //表格行数
      listRowNum: 5,
      selectIndex: 0,
      data: [],
      spanList: [],
      dataTableXM: {
        cells: [],
        rows: []
      },
      dataTableALL: {
        cells: [],
        rows: []
      },
      autoScrollOption: {
        autoPlay: true, //自动播放
        step: 0.2, //滚动速度（步长）
        limitMoveNum: 6, //开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      lx: {
        class: "",
        zrdw: "",
        sfytg: "",
        sj: ""
      },
      qyhp: {
        class: "",
        zrdw: "",
        sfytg: "",
        sj: ""
      },
      gsyyzz: {
        class: "",
        zrdw: "",
        sfytg: "",
        sj: ""
      },
      tdht: { class: "", zrdw: "", sfytg: "", sj: "" },
      jsydgh: { class: "", zrdw: "", sfytg: "", sj: "" },
      jsyd: { class: "", zrdw: "", sfytg: "", sj: "" },
      tdz: { class: "", zrdw: "", sfytg: "", sj: "" },
      fapf: { class: "", zrdw: "", sfytg: "", sj: "" },
      tsyj: { class: "", zrdw: "", sfytg: "", sj: "" },
      jsgc: { class: "", zrdw: "", sfytg: "", sj: "" },
      tshgz: { class: "", zrdw: "", sfytg: "", sj: "" },
      sg: { class: "", zrdw: "", sfytg: "", sj: "" },
      dialogVisible: false,
      xmmc: "",
      xmztz: "",
      zdmj: "",
      jsxz: "",
      hylb: "",
      isFirst: 0
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

          res.data[0].data.forEach(element => {
            switch (element.jd) {
              case "立项":
                this.lx.class = element.sfytg == "1" ? "active" : "";
                this.lx.sfytg = element.sfytg;
                this.lx.zrdw = element.zrdw;
                this.lx.sj = element.sj;
                if (this.lx.sj) {
                  this.lx.class = "active current";
                }
                break;
              case "企业环评":
                this.qyhp.class = element.sfytg == "1" ? "active" : "";
                this.qyhp.sfytg = element.sfytg;
                this.qyhp.zrdw = element.zrdw;
                this.qyhp.sj = element.sj;
                if (this.qyhp.sj) {
                  this.qyhp.class = "active current";
                }
                break;
              case "工商执照":
                this.gsyyzz.class = element.sfytg == "1" ? "active" : "";
                this.gsyyzz.sfytg = element.sfytg;
                this.gsyyzz.zrdw = element.zrdw;
                this.gsyyzz.sj = element.sj;
                if (this.gsyyzz.sj) {
                  this.gsyyzz.class = "active current";
                }
                break;
              case "土地合同":
                this.tdht.class = element.sfytg == "1" ? "active" : "";
                this.tdht.sfytg = element.sfytg;
                this.tdht.zrdw = element.zrdw;
                this.tdht.sj = element.sj;
                if (this.tdht.sj) {
                  this.tdht.class = "active current";
                }
                break;
              case "用地规划":
                this.jsydgh.class = element.sfytg == "1" ? "active" : "";
                this.jsydgh.sfytg = element.sfytg;
                this.jsydgh.zrdw = element.zrdw;
                this.jsydgh.sj = element.sj;
                if (this.jsydgh.sj) {
                  this.jsydgh.class = "active current";
                }
                break;
              case "用地许可":
                this.jsyd.class = element.sfytg == "1" ? "active" : "";
                this.jsyd.sfytg = element.sfytg;
                this.jsyd.zrdw = element.zrdw;
                this.jsyd.sj = element.sj;
                if (this.jsyd.sj) {
                  this.jsyd.class = "active current";
                }
                break;
              case "土地证":
                this.tdz.class = element.sfytg == "1" ? "active" : "";
                this.tdz.sfytg = element.sfytg;
                this.tdz.zrdw = element.zrdw;
                this.tdz.sj = element.sj;
                if (this.tdz.sj) {
                  this.tdz.class = "active current";
                }
                break;
              case "方案批复":
                this.fapf.class = element.sfytg == "1" ? "active" : "";
                this.fapf.sfytg = element.sfytg;
                this.fapf.zrdw = element.zrdw;
                this.fapf.sj = element.sj;
                if (this.fapf.sj) {
                  this.fapf.class = "active current";
                }
                break;
              case "图审意见":
                this.tsyj.class = element.sfytg == "1" ? "active" : "";
                this.tsyj.sfytg = element.sfytg;
                this.tsyj.zrdw = element.zrdw;
                this.tsyj.sj = element.sj;
                if (this.tsyj.sj) {
                  this.tsyj.class = "active current";
                }
                break;
              case "工程规划":
                this.jsgc.class = element.sfytg == "1" ? "active" : "";
                this.jsgc.sfytg = element.sfytg;
                this.jsgc.zrdw = element.zrdw;
                this.jsgc.sj = element.sj;
                if (this.jsgc.sj) {
                  this.jsgc.class = "active current";
                }
                break;
              case "图审合格":
                this.tshgz.class = element.sfytg == "1" ? "active" : "";
                this.tshgz.sfytg = element.sfytg;
                this.tshgz.zrdw = element.zrdw;
                this.tshgz.sj = element.sj;
                if (this.tshgz.sj) {
                  this.tshgz.class = "active current";
                }
                break;
              case "施工许可":
                this.sg.class = element.sfytg == "1" ? "active" : "";
                this.sg.sfytg = element.sfytg;
                this.sg.zrdw = element.zrdw;
                this.sg.sj = element.sj;
                if (this.sg.sj) {
                  this.sg.class = "active current";
                }
                break;
              default:
                break;
            }
          });
          res.data[1]["list"].forEach(element => {
            switch (element.name) {
              case "项目名称":
                this.xmmc = element.value;
                break;
              case "项目总投资_万元":
                this.xmztz = element.value;
                break;
              case "占地面积_亩":
                this.zdmj = element.value;
                break;
              case "建设性质":
                this.jsxz = element.value;
                break;
              case "行业类别":
                this.hylb = element.value;
                break;

              default:
                break;
            }
          });
        });
    }
  },
  components: {  countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/zhddson/zdgz.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        this.dataTableALL.cells = this.data[0].cells;
        this.dataTableALL.rows = this.data[0].rows;
        this.dataTableXM.cells = this.data[0].cells;
        for (let index = 0; index < this.dataTableALL.rows.length; index++) {
          if (index < this.listRowNum) {
            const item = this.dataTableALL.rows[index];
            this.dataTableXM.rows.push(item);
          } else {
            break;
          }
        }
        for (
          let index = 0;
          index < Math.ceil(this.data[0].rows.length / this.listRowNum);
          index++
        ) {
          this.spanList.push(index);
        }
        this.getXMJD(this.dataTableXM.rows[0][3], this.dataTableXM.rows[0][4]);
      });
  }
};
</script>
<style lang="less" scoped>
.lg_main {
  background: url("~static/images4800/line.png") right 0px no-repeat;
  .maintitle {
    //background: url("~static/images4800/maintitlebg.png") center 0px no-repeat;
    // background-size: 100%;
    //text-align: center;
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
      //background: linear-gradient(to right, #07ffe5, #07ff87, #1effc2);
      background: linear-gradient(to right, #ff1e07, #fbff07, #ffb613);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 22px;
      font-weight: bold;
    }
  }
  .pt1 {
    height: 180px;
    margin-top: 10px;
    .panel_table {
      .list_cell0 {
        width: 60%;
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
      .list_title {
        padding: 2px 0;
      }
      .list_content {
        li {
          padding: 2px 0;
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
        height: 40px;
        &:before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          background-image: url("~static/images/dsj/zdxmarrow.png");
          background-position: 0 0;
          width: 18px;
          height: 48px;
        }
      }
      li.active {
        &:before {
          background-position: -18px 0;
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
          height: 34px;
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
        margin-top: 10px;
        color: #efbe13;
        .time {
          display: block;
        }
      }
      .title {
        padding-left: 40px;
        box-sizing: border-box;
        width: 60%;
        color: #96acde;
        font-size: 1.6rem;
        font-weight: bold;
        margin-top: 10px;
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
  .popdiv {
    z-index: 999;
    width: 46%;
    height: 895px;
    position: fixed;
    right: 27%;
    top: 145px;
    border: 1px solid #1d5287;
    border-top-color: #3fabed;
    background: #06245f url("~static/images/dsj/popbg.png") center bottom
      no-repeat;
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
