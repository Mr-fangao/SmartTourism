<template>
  <div class="lg_main">
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">抽查详情</div>
      </div>
      <div class="panel_content">
        <div class="panel_table" v-if="dataTableCCXQ.rows.length>0">
          <div class="list_title">
            <span
              :class="'list_cell'+cellKey"
              v-for="(cell,cellKey) in dataTableCCXQ.cells"
              :key="cellKey"
            >{{cell}}</span>
          </div>
          <vue-seamless-scroll
            :data="dataTableCCXQ.rows"
            style="height:340px;overflow:hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li v-for="(row,rowKey) in dataTableCCXQ.rows" :key="rowKey">
                    <span
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
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div class="panel_headerTitle">抽查企业列表</div>
      </div>
      <div class="panel_content">
        <ul v-if="data.length>0">
          <li
            v-for="(item,index) in data[3].list"
            v-if="lxType==item.type"
            :key="index"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="panel pt3">
      <div class="panel_header">
        <div class="panel_headerTitle">双随机抽查系统</div>
      </div>
      <div class="panel_content" v-if="data.length>0">
        <div class="part1">
          <div class="row">
            <div class="type">{{'类型选择'}}</div>
            <div class="items">
              <span
                v-for="(item,index) in ssjccList"
                v-if="item.type=='类型选择'"
                :class="item.ischeck=='1'?'current':(item.disable=='1'?'':'disable')"
                @click="ClickLxType(item,index)"
              >{{item.name}}</span>
            </div>
          </div>
          <div class="row">
            <div class="type">{{'监管类型'}}</div>
            <div class="items">
              <span
                v-for="(item,index) in ssjccList"
                v-if="item.type=='监管类型'"
                :key="index"
                :class="item.ischeck=='1'?'current':(item.disable=='1'?'':'disable')"
                @click="ClickJGType(item,index)"
              >{{item.name}}</span>
            </div>
          </div>
          <div class="row">
            <div class="type">{{'企业数量'}}</div>
            <div class="items">
              <span
                v-for="(item,index) in ssjccList"
                v-if="item.type=='企业数量'"
                :key="index"
                :class="qysl==item.value?'current':(item.disable=='1'?'':'disable')"
                @click="ClickQYSL(item)"
              >{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="part2">
          <div class="row">
            <div class="type">抽查企业</div>
            <div class="items">
              <!-- <span>{{ccqy[0]}}</span> -->
              <span v-for="count in qysl">{{ccqy[count-1]==null?'点击开始后随即选择':ccqy[count-1]}}</span>
            </div>
          </div>
          <div class="row">
            <div class="type">抽查人员</div>
            <div class="items">
              <span v-for="count in 2">{{ccry[count-1]==null?'点击开始后随即选择':ccry[count-1]}}</span>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button v-if="startBtn" class="btn1" @click="ClickSSJCC">双随机抽查</button>
          <button v-if="!startBtn" class="btn4" @click="ClickEndSSJ">停止</button>
          <button class="btn2" @click="ClickSubmit">确定</button>
          <button class="btn3" @click="dialogVisible=true">查看抽查事项</button>
        </div>
      </div>
    </div>
    <div class="panel pt4">
      <div class="panel_header">
        <div class="panel_headerTitle">抽查人员列表</div>
      </div>
      <div class="panel_content">
        <vue-seamless-scroll
          :data="dataTableCCRY.rows"
          style="max-height:750px;overflow-y:auto;overflow-x:hidden; width:100%"
          :class-option="autoScrollOptionFalse"
        >
          <div class="item" v-for="item in dataTableCCRY.rows">
            <div class="pic">
              <img :src="item[2]" />
            </div>
            <div class="intro">
              <div class="cell0">{{item[1]}}</div>
              <div class="cell1">{{item[0]}}</div>
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>

    <div id="divDialog" class="popdiv" v-if="dialogVisible">
      <div class="popbg">
        <div class="corner"></div>
        <div class="close" @click="dialogVisible=false"></div>
        <div>
          <div class="panel_table">
            <div class="list_title">
              <span
                :class="'list_cell'+cellKey"
                v-for="(cell,cellKey) in dataTableCCSX.cells"
                :key="cellKey"
              >{{cell}}</span>
            </div>
            <vue-seamless-scroll
              :data="dataTableCCSX.rows"
              style="overflow:hidden"
              :class-option="autoScrollOptionFalse"
            >
              <div class="list_content">
                <div class="list_contentInfo">
                  <ul>
                    <li v-for="(row,rowKey) in dataTableCCSX.rows" :key="rowKey">
                      <span
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
      </div>
    </div>
    <!-- 确定 -->
    <div class="popupMsg" v-if="MsgVisible">
      <div class="popbg">
        <div class="corner"></div>
        <div class="close" @click="MsgVisible=false"></div>
        <div>
          <div class="panel_table">
            <div class="list_title">
              <span
                :class="'list_cell'+cellKey"
                v-for="(cell,cellKey) in dataTableCCJG.cells"
                :key="cellKey"
              >{{cell}}</span>
            </div>
            <vue-seamless-scroll
              v-if="MsgVisible"
              :data="dataTableCCJG.rows"
              style="overflow:hidden"
              :class-option="autoScrollOptionFalse"
            >
              <div class="list_content">
                <div class="list_contentInfo">
                  <ul>
                    <li v-for="(row,rowKey) in dataTableCCJG.rows" :key="rowKey">
                      <span
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
          <div class="buttons">
            <button class="btn2" @click="ClickXF">开始下发</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 下发成功 -->
    <div class="popupMsgTip" v-if="popupMsgTip">
      <div class="popbg">
        <div class="corner"></div>
        <div class="close" @click="popupMsgTip=false"></div>
        <div class="title">{{"提示！"}}</div>
        <div class="container">{{msg}}</div>

        <div class="buttons">
          <button class="btn2" @click="popupMsgTip=false">关闭</button>
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
      data: [],
      lxType: "企业",
      lxTypelist: [], //类型选择列表
      jgType: "教育",
      jgTypelist: [], //监管类型列表
      qysl: 2,
      preqysl: 2,
      msg: "",
      dialogVisible: false,
      MsgVisible: false,
      ccqy: [], //抽查企业
      ccry: [], //抽查人员
      dataTableCCXQ: {
        rows: [],
        cells: []
      },
      dataTableCCSX: {
        rows: [],
        cells: []
      },
      dataTableCCJG: {
        rows: [],
        cells: []
      },
      dataTableCCRY: {
        rows: [],
        cells: []
      },
      autoScrollOption: {
        autoPlay: true, //自动播放
        step: 0.2, //滚动速度（步长）
        limitMoveNum: 3, //开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      autoScrollOptionFalse: {
        autoPlay: false, //自动播放
        step: 0.2, //滚动速度（步长）
        limitMoveNum: 3, //开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      ccqyJson: [],
      ccryJson: [],
      startBtn: true, //是开始
      SJSEnd: false, //结束
      Interval: null,
      Interval2: null,
      popupMsgTip: false,
      ssjTab: ["类型选择", "监管类型", "企业数量"],
      ssjccList: [] //双随机系统抽查
    };
  },
  watch: {
    ssjccList: {
      handler(newVal, oldVal) {
        console.log(newVal, "变化");
        this.initSSJ();
      },
      deep: true
    }
  },
  methods: {
    initSSJ() {
      this.EndInterval();
      this.ccqy = [];
      this.ccry = [];
      this.startBtn = true;
    },
    ChangeIsCheck(item, index) {
      if (!this.startBtn) {
        return;
      }
      if (this.ssjccList[index].ischeck == "1") {
        this.ssjccList[index].ischeck = "0";
      } else if (this.ssjccList[index].ischeck == "0") {
        this.ssjccList[index].ischeck = "1";
        if (this.ssjccList[index].type == "类型选择") {
          this.lxType = this.ssjccList[index].name;
        }
      }
      console.log(this.ssjccList, "sdsdsldknlkn");
    },
    ClickLxType(item, index) {
      console.log(item.disable, "455555");
      if (item.disable != "1") {
        return;
      }
      this.ChangeIsCheck(item, index);
    },
    ClickJGType(item, index) {
      this.ChangeIsCheck(item, index);
    },
    ClickQYSL(item) {
      if (this.preqysl != parseInt(item.value)) {
        this.ccqy = [];
        this.ccry = [];
      }
      this.qysl = parseInt(item.value);
      this.preqysl = this.qysl;
    },
    GetCheckType(type) {
      var checkListArr = [];
      for (let index = 0; index < this.ssjccList.length; index++) {
        const element = this.ssjccList[index];
        if (element.ischeck == "1" && type == element.type) {
          checkListArr.push(element.name);
        }
      }
      if (checkListArr.length == 0) {
        return null;
      }
      return checkListArr.join(",");
    },
    ClickSSJCC() {
      //启动双随机
      console.log("启动双随机");
      this.lx = this.GetCheckType("类型选择");
      this.jg = this.GetCheckType("监管类型");
      this.QuerySSJ("0", this.lx, this.jg);
    },
    RandomCCQY() {
      let _this = this;
      var count = _this.ccqyJson.length;
      this.Interval = setInterval(function() {
        for (let index = 0; index < _this.qysl; index++) {
          var randNum = parseInt(Math.random() * (count + 1), 10);
          if (
            _this.ccqyJson[randNum] != null &&
            _this.ccqyJson[randNum] != undefined &&
            _this.ccqyJson[randNum] != ""
          ) {
            _this.$set(_this.ccqy, index, _this.ccqyJson[randNum]);
          }
          console.log(_this.ccqy, "dsdjs;jd;j;l");
        }
      }, 100);
    },
    RandomCCRY() {
      let _this = this;
      var count = _this.ccryJson.length;
      this.Interval2 = setInterval(function() {
        for (let index = 0; index < 2; index++) {
          var randNum = parseInt(Math.random() * (count + 1), 10);
          if (
            _this.ccqyJson[randNum] != null &&
            _this.ccqyJson[randNum] != undefined &&
            _this.ccqyJson[randNum] != ""
          ) {
            _this.$set(_this.ccry, index, _this.ccryJson[randNum]);
          }
          console.log(_this.ccry, "dsdjs;jd;j;l");
        }
      }, 100);
    },
    ClickEndSSJ() {
      this.QuerySSJ("", this.lx, this.jg);
    },
    ClickSubmit() {
      console.log("tijiao");
      if (this.startBtn) {
        if (
          this.ccry[0] != null &&
          this.ccry[0] != undefined &&
          this.ccry[0] != ""
        ) {
          this.MsgVisible = true;
          // this.ccqy = [];
          // this.ccry = [];
          //抽查事项
          this.dataTableCCJG.cells = ["抽查企业", "抽查人员"];
          var rows = [];
          for (let index = 0; index < this.ccqy.length; index++) {
            const element = this.ccqy[index];
            var temp = [element, this.ccry[0] + "," + this.ccry[1]];
            console.log(temp, "dsjdialihli");
            rows.push(temp);
          }
          this.dataTableCCJG.rows = rows;
        }
      }
    },
    ClickXF() {
      for (let index = 0; index < this.dataTableCCJG.rows.length; index++) {
        const element = this.dataTableCCJG.rows[index];
        this.dataTableCCXQ.rows.push(element);
      }
      this.MsgVisible = false;
      this.ccqy = [];
      this.ccry = [];
      this.msg = "下发成功,请继续抽查...";
      this.popupMsgTip = true;
      setTimeout(() => {
        if (this.popupMsgTip) {
          this.popupMsgTip = false;
        }
      }, 5000);
    },
    EndInterval() {
      clearInterval(this.Interval);
      clearInterval(this.Interval2);
    },
    QuerySSJ(type, lx, jg) {
      //判断抽查系统是否合格
      if (lx == null || jg == null) {
        this.msg = "抽查类型不满足条件,请选择...";
        this.popupMsgTip = true;
        return;
      }
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=QuerySSJSC&type=" +
        type +
        "&cclx=" +
        lx +
        "&jglx=" +
        jg;
      webAPI.server
        .get({
          url: url
        })
        .then(res => {
          if (res.data.length == 0) return;
          var obj = res.data[0];
          this.ccqyJson = obj["qymc"]
            .toString()
            .replace(/\s*/g, "")
            .split(",");
          this.ccryJson = obj["ccry"]
            .toString()
            .replace(/\s*/g, "")
            .split(",");
          if (type == "") {
            this.startBtn = true;
            console.log("结束");
            for (let index = 0; index < this.qysl; index++) {
              this.$set(this.ccqy, index, this.ccqyJson[index]);
              this.$set(this.ccry, index, this.ccryJson[index]);
            }
            console.log(this.ccqy, "Enddsdjs;jd;j;l");
            console.log(this.ccry, "Enddsdjs;jd;j;l");
            this.EndInterval();
          } else {
            this.startBtn = false;
            this.RandomCCQY();
            this.RandomCCRY();
          }
        });
    }
  },
  components: {  countTo, vueSeamlessScroll },
  mounted() {
    webAPI.server
      .get({
        //url: "static/json/zhxz/ssj.json"
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/ssj.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;
        //抽查详情
        this.dataTableCCXQ.cells = this.data[0].cells;
        this.dataTableCCXQ.rows = this.data[0].rows;

        this.ssjccList = this.data[4].list;
        console.log(this.ssjccList, "123");

        //抽查事项
        this.dataTableCCSX.cells = this.data[1].cells;
        this.dataTableCCSX.rows = this.data[1].rows;

        //抽查人员列表
        this.dataTableCCRY.cells = this.data[2].cells;
        this.dataTableCCRY.rows = this.data[2].rows;

        console.log(this.dataTableCCRY, "123654");
      });
  },
  destroyed() {
    clearInterval(this.Interval);
    clearInterval(this.Interval2);
    clearInterval(this.timeALL);
    clearInterval(this.timeTf);
  }
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 21% 58% 21%;
  grid-template-rows: 55% 45%;
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
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt4 {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
  }
}
@keyframes mymove {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
}
.lg_main {
  .pt1 {
    margin-top: 30px;
    .panel_table {
      .list_content {
        overflow: hidden;
      }
      .list_cell0 {
        width: 50%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell1 {
        width: 50%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
    }
  }
  .pt2 {
    .panel_content {
      li {
        background: url("~static/images/dsj/ssj_bg1.png") 0 0px no-repeat;
        width: 354px;
        line-height: 43px;
        height: 43px;
        text-align: center;
        color: #97cdff;
        font-size: 1.5rem;
        margin: 13px auto;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .pt3 {
    background: url("~static/images/dsj/ssj_box1.png") 0 0px no-repeat;
    height: 778px;
    margin-top: 70px;
    margin-left: 20px;
    position: relative;
    .panel_header {
      margin: 0;
      position: absolute;
      left: 120px;
      top: 5px;
      width: 300px;
      text-align: center;
      letter-spacing: 3px;
    }
    .panel_headerTitle {
      font-size: 2.2rem;
      line-height: 45px;
      &::after {
        display: none;
      }
    }
    .panel_content {
      padding: 90px 70px 30px 70px;
      .part1 {
        padding-bottom: 40px;
        margin-top: 60px;
      }
      .part2 {
        border-top: 1px solid #1b5587;
        padding-top: 40px;
        .row {
          .items {
            span {
              width: auto;
              padding: 0 20px;
            }
          }
        }
      }
      .buttons {
        text-align: center;
        margin-top: 60px;
        button {
          width: 260px;
          height: 48px;
          border: none;
          border-radius: 24px;
          font-size: 1.6rem;
          color: #fff;
          margin: 0 10px;
          outline: none;
          cursor: pointer;
        }
        .btn1 {
          background: #d96d2b;
          &:hover {
            background: #e77709;
          }
        }
        .btn2 {
          background: #1489dc;
          &:hover {
            background: #14a1dc;
          }
        }
        .btn3 {
          background: #1489dc;
          &:hover {
            background: #14a1dc;
          }
        }
        .btn4 {
          background: #eb3434;
          &:hover {
            background: #eb3434;
          }
        }
      }
      .row {
        .type {
          display: inline-block;
          width: 12%;
          vertical-align: top;
          padding-top: 5px;
          font-weight: bold;
          font-size: 1.5rem;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            left: 0px;
            bottom: -10px;
            width: 20px;
            height: 3px;
            border-radius: 2px;
            //background: #1283b8;
          }
        }
        .items {
          display: inline-block;
          width: 87%;
          vertical-align: top;
          font-size: 1.5rem;
          span {
            display: inline-block;
            width: 142px;
            border: 1px solid #1b5587;
            background: rgba(27, 85, 135, 0.1);
            height: 44px;
            line-height: 44px;
            text-align: center;
            margin: 6px 3px;
            cursor: pointer;
          }
          span.current {
            background: #1489dc;
            border: 1px solid #8ecffd;
          }
          span.disable {
            opacity: 0.3;
          }
        }
      }
    }
  }
  .pt4 {
    margin-top: 30px;
    .item {
      background: rgba(255, 255, 255, 0.05);
      margin-bottom: 10px;
      float: left;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      .pic {
        img {
          width: 75px;
          height: 112px;
          float: left;
        }
      }
      .intro {
        float: left;
        margin-left: 20px;
        .cell0 {
          font-size: 1.6rem;
          margin-top: 10px;
        }
        .cell1 {
          font-size: 1.8rem;
          font-weight: bold;
          background: url("~static/images/dsj/icon_1.png") 0 0px no-repeat;
          padding-left: 35px;
          margin-top: 10px;
        }
      }
    }
    .seamless-warp {
      height: 650px;
      line-height: 40px;
      overflow: hidden;
    }
  }
  .popupMsg {
    animation: mymove 0.5s 1;
    z-index: 999;
    width: 550px;
    //min-height: 300px;
    position: fixed;
    right: 35%;
    top: 255px;
    border: 1px solid #1d5287;
    border-top-color: #3fabed;
    background: #07143a;
    .buttons {
      //position: absolute;
      //bottom: 20px;
      //left: 50%;
      //margin-left: -65px;
      padding: 30px 0;
      text-align: center;
      button {
        width: 130px;
        height: 40px;
        border: none;
        border-radius: 24px;
        font-size: 1.4rem;
        color: #fff;
        margin: 0 10px;
        outline: none;
        cursor: pointer;
      }
      .btn1 {
        background: #d96d2b;
        &:hover {
          background: #e77709;
        }
      }
      .btn2 {
        background: #1489dc;
        &:hover {
          background: #14a1dc;
        }
      }
      .btn3 {
        background: #1489dc;
        &:hover {
          background: #14a1dc;
        }
      }
      .btn4 {
        background: red;
        &:hover {
          background: red;
        }
      }
    }
    .list_title {
      line-height: 2rem;
      //background:#0a2e9a;
      background: #0e2977;
      //border-bottom: 1px solid  #1582bb;
      border-bottom: 1px solid #163692;
      font-size: 1.4rem;
      text-align: center;
      font-weight: bold;
      display: flex;
      padding: 4px 0;
      color: #99c0f9;
    }
    .list_content {
      overflow: hidden;
      li:hover {
        background-color: #0e5ab8 !important;
      }
      li:nth-child(2n + 0) {
        background: rgba(255, 255, 255, 0.1);
      }
      li {
        display: flex;
        text-align: center;
        padding: 4px 0;
        box-sizing: border-box;
        span {
          font-size: 1.4rem;
          line-height: 2rem;
          vertical-align: bottom;
        }
      }
    }
    .panel_table {
      // max-height: 200px;
      .list_content {
        overflow: hidden;
      }
      .list_cell0 {
        line-height: 40px;
        width: 60%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell1 {
        width: 40%;
        line-height: 40px;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
    }
    .popbg {
      text-align: center;
      position: relative;
      width: 100%;
      min-height: 260px;
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
        border-left: 4px solid #54c8f8;
        border-top: 4px solid #54c8f8;
        position: absolute;
        left: -2px;
        top: -2px;
      }
      &:after {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        border-right: 4px solid #54c8f8;
        border-top: 4px solid #54c8f8;
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
          border-left: 4px solid #54c8f8;
          border-bottom: 4px solid #54c8f8;
          position: absolute;
          left: -2px;
          bottom: -2px;
        }
        &:after {
          content: "";
          display: block;
          width: 24px;
          height: 24px;
          border-right: 4px solid #54c8f8;
          border-bottom: 4px solid #54c8f8;
          position: absolute;
          right: -2px;
          bottom: -2px;
        }
      }
    }
  }
  .popdiv {
    z-index: 999;
    width: 46%;
    height: 600px;
    position: fixed;
    right: 27%;
    top: 145px;
    border: 1px solid #1d5287;
    border-top-color: #3fabed;
    background: #07143a;
    .popbg {
      height: 600px;
    }
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
    .list_title {
      line-height: 2rem;
      //background:#0a2e9a;
      background: #0e2977;
      //border-bottom: 1px solid  #1582bb;
      border-bottom: 1px solid #163692;
      font-size: 1.4rem;
      text-align: center;
      font-weight: bold;
      display: flex;
      padding: 4px 0;
      color: #99c0f9;
    }
    .list_content {
      overflow: hidden;
      li:hover {
        background-color: #0e5ab8 !important;
      }
      li:nth-child(2n + 0) {
        background: rgba(255, 255, 255, 0.1);
      }
      li {
        display: flex;
        text-align: center;
        padding: 4px 0;
        box-sizing: border-box;
        span {
          font-size: 1.4rem;
          line-height: 2rem;
          vertical-align: bottom;
        }
      }
    }
    .panel_table {
      .list_content {
        overflow: hidden;
      }
      .list_cell0 {
        line-height: 40px;
        width: 10%;
      }
      .list_cell1 {
        width: 30%;
        line-height: 40px;
      }
      .list_cell2 {
        line-height: 40px;
        width: 10%;
      }
      .list_cell3 {
        line-height: 40px;
        width: 30%;
      }
      .list_cell4 {
        width: 20%;
      }
    }
  }
  .popbg {
    text-align: center;
    position: relative;
    width: 100%;

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
  .popupMsgTip {
    animation: mymove 0.5s 1;
    z-index: 999;
    width: 380px;
    //height: 150px;
    position: fixed;
    right: 40%;
    top: 355px;
    border: 1px solid #1d5287;
    border-top-color: #3fabed;
    background: #052e7f;
    text-align: left;
    .title {
      padding-top: 20px;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      color: #fff000;
    }
    .container {
      text-align: center;
      padding-top: 15px;
      // color: #FFF000;
      font-size: 1.6rem;
    }
    .buttons {
      text-align: center;
      margin-top: 20px;
      button {
        width: 90px;
        height: 30px;
        border: none;
        border-radius: 24px;
        font-size: 1.4rem;
        color: #fff;
        margin: 0 10px;
        outline: none;
        cursor: pointer;
      }
      .btn1 {
        background: #d96d2b;
        &:hover {
          background: #e77709;
        }
      }
      .btn2 {
        background: #1489dc;
        &:hover {
          background: #14a1dc;
        }
      }
      .btn3 {
        background: #1489dc;
        &:hover {
          background: #14a1dc;
        }
      }
      .btn4 {
        background: red;
        &:hover {
          background: red;
        }
      }
    }
    .popbg {
      text-align: left;
      position: relative;
      width: 100%;
      height: 150px;
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
        border-left: 4px solid #54c8f8;
        border-top: 4px solid #54c8f8;
        position: absolute;
        left: -2px;
        top: -2px;
      }
      &:after {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        border-right: 4px solid #54c8f8;
        border-top: 4px solid #54c8f8;
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
          border-left: 4px solid #54c8f8;
          border-bottom: 4px solid #54c8f8;
          position: absolute;
          left: -2px;
          bottom: -2px;
        }
        &:after {
          content: "";
          display: block;
          width: 24px;
          height: 24px;
          border-right: 4px solid #54c8f8;
          border-bottom: 4px solid #54c8f8;
          position: absolute;
          right: -2px;
          bottom: -2px;
        }
      }
    }
  }
}
</style>
