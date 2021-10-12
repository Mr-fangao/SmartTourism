<template>
  <div>
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">人才科创</div>
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
                  @click="getXMJD(row[0])"
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
            <th>来源</th>
            <td>{{ly}}</td>
            <th style="width:20%">人才信息</th>
            <td>{{rcxx}}</td>
          </tr>
          <tr>
            <th>项目情况</th>
            <td colspan="3">{{xmqk}}</td>
          </tr>
          <tr>
            <th>拟入驻地址或载体</th>
            <td colspan="3">{{nrzdzhzt}}</td>
          </tr>
        </table>
      </div>
      <div class="process">
        <ul>
          <li :class="kscxcy.class">
            <div class="title">昆山创新创业人才企业认定</div>
            <div class="partment">
              <span class="time">{{kscxcy.sj}}</span>
            </div>
          </li>
          <li :class="gslj.class">
            <div class="title">姑苏领军人才企业认定</div>
            <div class="partment">
              <span class="time">{{gslj.sj}}</span>
            </div>
          </li>
          <li :class="jscxcy.class">
            <div class="title">江苏省创新创业人才企业认定</div>
            <div class="partment">
              <span class="time">{{jscxcy.sj}}</span>
            </div>
          </li>
          <li :class="gjcxcy.class">
            <div class="title">国家级创新创业人才企业认定</div>
            <div class="partment">
              <span class="time">{{gjcxcy.sj}}</span>
            </div>
          </li>
          <li :class="gjgx.class">
            <div class="title">国家高新技术企业认定</div>
            <div class="partment">
              <span class="time">{{gjgx.sj}}</span>
            </div>
          </li>
          <li :class="ksyf.class">
            <div class="title">昆山研发机构认定</div>
            <div class="partment">
              <span class="time">{{ksyf.sj}}</span>
            </div>
          </li>
          <li :class="szgc.class">
            <div class="title">苏州工程技术研究中心认定</div>
            <div class="partment">
              <span class="time">{{szgc.sj}}</span>
            </div>
          </li>
          <li :class="jsgc.class">
            <div class="title">江苏省工程技术研究中心认定</div>
            <div class="partment">
              <span class="time">{{jsgc.sj}}</span>
            </div>
          </li>
        </ul>
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
      //表格行数
      listRowNum: 10,
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
      kscxcy: { class: "", sfytg: "", sj: "" },
      gslj: { class: "", sfytg: "", sj: "" },
      jscxcy: { class: "", sfytg: "", sj: "" },
      gjcxcy: { class: "", sfytg: "", sj: "" },
      gjgx: { class: "", sfytg: "", sj: "" },
      ksyf: { class: "", sfytg: "", sj: "" },
      szgc: { class: "", sfytg: "", sj: "" },
      jsgc: { class: "", sfytg: "", sj: "" },
      xmmc: "",
      ly: "",
      rcxx: "",
      xmqk: "",
      nrzdzhzt: ""
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
    getXMJD(name) {
      webAPI.server
        .get({
          // url: "../static/json/rckc.json"
          url:
            this.GLOBAL.weburl_Onemap +
            "/handler/zhddson/rckc_jd.ashx?name=" +
            name
        })
        .then(res => {
          if (res.data.length == 0) return;
          res.data[0].data.forEach(element => {
            switch (element.jd) {
              case "昆山创新创业人才企业认定":
                this.kscxcy.class = element.sfytg == "1" ? "active" : "";
                this.kscxcy.sfytg = element.sfytg;
                this.kscxcy.sj = element.sj;
                break;
              case "姑苏领军人才企业认定":
                this.gslj.class = element.sfytg == "1" ? "active" : "";
                this.gslj.sfytg = element.sfytg;
                this.gslj.sj = element.sj;
                break;

              case "江苏省创新创业人才企业认定":
                this.jscxcy.class = element.sfytg == "1" ? "active" : "";
                this.jscxcy.sfytg = element.sfytg;
                this.jscxcy.sj = element.sj;
                break;

              case "国家级创新创业人才企业认定":
                this.gjcxcy.class = element.sfytg == "1" ? "active" : "";
                this.gjcxcy.sfytg = element.sfytg;
                this.gjcxcy.sj = element.sj;
                break;

              case "国家高新技术企业认定":
                this.gjgx.class = element.sfytg == "1" ? "active" : "";
                this.gjgx.sfytg = element.sfytg;
                this.gjgx.sj = element.sj;
                break;

              case "昆山研发机构认定":
                this.ksyf.class = element.sfytg == "1" ? "active" : "";
                this.ksyf.sfytg = element.sfytg;
                this.ksyf.sj = element.sj;
                break;

              case "苏州工程技术研究中心认定":
                this.szgc.class = element.sfytg == "1" ? "active" : "";
                this.szgc.sfytg = element.sfytg;
                this.szgc.sj = element.sj;
                break;

              case "江苏省工程技术研究中心认定":
                this.jsgc.class = element.sfytg == "1" ? "active" : "";
                this.jsgc.sfytg = element.sfytg;
                this.jsgc.sj = element.sj;
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
              case "来源":
                this.ly = element.value;
                break;
              case "人才信息":
                this.rcxx = element.value;
                break;
              case "项目情况":
                this.xmqk = element.value;
                break;
              case "拟入驻地址或载体":
                this.nrzdzhzt = element.value;
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
        url: this.GLOBAL.weburl_Onemap + "/handler/zhddson/rckc.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        this.dataTableALL.cells = this.data[0].cells;

        this.data[0].rows.forEach(row => {
          if (row[1].length > 7) {
            row[1] = row[1].substring(0, 6) + "...";
          }
          if (row[2].length > 10) {
            row[2] = row[2].substring(0, 9) + "...";
          }
        });
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
        this.getXMJD(this.dataTableXM.rows[0][0]);
      });
  }
};
</script>
<style lang="less" scoped>
.lg_main {
  .pt1 {
    height: 180px;
    margin-top: 10px;
    .panel_table {
      .list_cell0 {
        width: 40%;
      }
      .list_cell1 {
        width: 25%;
      }
      .list_cell2 {
        width: 35%;
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
        height: 40px;
        justify-content: space-between;
        position: relative;
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
        .partment {
          display: none;
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
          display: inline-block;
          opacity: 1;
        }
      }
      li.current {
      }
      .partment {
        //width: 30%;
        opacity: 0.4;
        text-align: right;
        background-color: rgba(255, 255, 255, 0.1);
        display: inline-block;
        border-radius: 50px;
        padding: 3px 20px 0 20px;
        vertical-align: middle;
        font-size: 12px;
        height: 20px;
        margin-top: 10px;
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
  .commontable {
    border: 1px solid #1b3d9e;
    width: 100%;
    th {
      text-align: left;
      padding: 3px 7px;
      background: rgba(10, 46, 154, 0.4);
      border: 1px solid #1b3d9e;
      color: #9babd8;
      //font-weight: normal;
    }
    td {
      padding: 3px 7px;
      border: 1px solid #1b3d9e;
    }
  }
}
</style>
