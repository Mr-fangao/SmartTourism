<template>
  <div>
    <div class="panel pt1">
      <div class="panel_header">
        <div
          v-if="data.length>0"
          class="panel_headerTitle"
        >{{kqzlDataList.title}}<span class="gxsj" v-if="kqzlDataList.list.length>0">数据更新于{{updatetime}}</span></div>
      </div>
      <div class="panel_content">
        <div class="flexRow">
          <div class="leftdiv">
            <div class="cardPanel1">
              <div
                class="container"
                v-if="data.length>0&&index==0"
                v-for="(item,index) in kqzlDataList.list"
                :style="'background:'+getClassColor(item.level)"
              >
                <span>{{item.value}}</span>
                {{item.level}}
              </div>
            </div>
          </div>
          <div class="rightdiv">
            <div class="time">{{kqUpTime}}</div>
            <div
              class="cardPanel1"
              v-if="data.length>0&&index>0"
              v-for="(item,index) in kqzlDataList.list"
              :style="'border:1px solid '+getClassColor(item.level)"
            >
              <div class="title">
                {{item.name}}
              </div>
              <div
                class="container"
                :style="'background:'+getClassColor(item.level)"
              >
                <span>{{item.value}}</span>
                {{item.xUnit}}
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="(item,index) in kqzlDataList.list"
          v-if="data.length>0&&index>0"
          class="dsj-panel-flex-row"
        >
          <div class="titleLeft">{{item.name}}</div>
          <div
            :id="'chart'+item.name"
            :style="'height:'+handlerEchartHeight()+'px;width:100%;'"
          ></div>
        </div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div
          v-if="data.length>0"
          class="panel_headerTitle"
        >{{data[1].title}}<span class="gxsj" v-if="data[1].rows.length>0">数据更新于{{updatetime}}</span></div>
      </div>
      <div class="panel_content">
        <div class="time">{{szUpTime}}</div>
        <div class="panel_table">
          <div class="list_title">
            <span
              :class="'list_cell'+cellKey"
              v-for="(cell,cellKey) in dataTableSZ.cells"
              :key="cellKey"
            >{{cell}}</span>
          </div>
          <vue-seamless-scroll
            :data="dataTableSZ.rows"
            style="height:145px;overflow:hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row,rowKey) in dataTableSZ.rows"
                    :key="rowKey"
                  >
                    <span
                      :class="'list_cell'+row_cellKey+getStyle(rowKey,row_cellKey)"
                      v-for="(row_cell,row_cellKey) in row"
                      :key="row_cellKey"
                      @click="getCDSZ(row[0])"
                    >{{row_cell}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chartSZ"
              style=" height:250px;width:430px;"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echartsUtils from 'js/echartsUtils.js'
import countTo from 'vue-count-to'

import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  props: {
    updatetime: String
  },
  data () {
    return {
      kqzlDataList: {},

      dataTableSZ: {
        cells: [],
        rows: []
      },
      data: [],
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      },
      kqUpTime: '',
      szUpTime: '',
      // 判断是都是初始化，0是初始进入
      isFirst: 0
    }
  },
  methods: {
    handlerEchartHeight () {
      var count = this.kqzlDataList.list.length - 1
      return parseInt(220 / count)
    },
    handlerEcharts () {
      var _this = this
      var kqzlData = _this.kqzlDataList.list
      var idDom = document.getElementById('chart' + 'PM2.5')
      if (idDom == null) {
        setTimeout(() => {
          _this.handlerEcharts()
        }, 500)
      } else {
        var count = kqzlData.length
        console.log(kqzlData, 123)

        for (let index = 0; index < kqzlData.length; index++) {
          const element1 = kqzlData[index]
          this.data.forEach(element => {
            if (
              element.subtitle != undefined &&
              element.subtitle == '空气质量' + element1.name
            ) {
              var chartOption = echartsUtils.getEchartsConfig_NoAxis(
                element.chartType.toLowerCase(),
                element.xAxis,
                element.data,
                element.title,
                element.xUnit
              )
              chartOption.xAxis.show = true
              chartOption.xAxis.axisLabel.interval = 8
              if (index == count - 1) {
                chartOption.xAxis.axisLabel.rotate = '0'
                chartOption.grid.bottom = '20%'
              }
              this.time1 = echartsUtils.chartInit(
                'chart' + element1.name,
                chartOption,
                '1'
              )
              console.log(chartOption, 123)
            }
          })
        }
      }
    },
    getClassColor (type) {
      switch (type) {
        case '优':
          return '#00882d'
        case '良':
          return '#ffc000'
        case '轻度污染':
          return '#f1621b'
        case '中度污染':
          return '#c71919'
        case '重度污染':
          return '#7123ac'
        case '严重污染':
          return '#7a2500'
        default:
          return '#00882d'
      }
    },
    getGXSJ (type) {
      webAPI.server
        .get({
          url:
            this.GLOBAL.weburl_Onemap +
            '/handler/dsj/hjjc_gxsj.ashx?type=' +
            type
        })
        .then(res => {
          var data = res.data[0]
          if (type == '空气') {
            this.kqUpTime = data.list[0]['更新时间']
          } else if (type == '水质') {
            this.szUpTime =
              data.list[0]['更新时间'] == undefined
                ? ''
                : data.list[0]['更新时间']
          }
        })
    },
    getCDSZ (name) {
      if (this.isFirst == 0) {
        name = '环境监测站'
        this.isFirst = 1
      }
      webAPI.server
        .get({
          // url: "../static/json/rckc.json" //+ name
          url:
            this.GLOBAL.weburl_Onemap + '/handler/dsj/hjjc_cd.ashx?name=' + name
        })
        .then(res => {
          if (res.data.length == 0) return
          var szOption = echartsUtils.getEchartsConfig_EXS(
            res.data[0].chartType.toLowerCase(),
            res.data[0].xAxis,
            res.data[0].data,
            res.data[0].title,
            res.data[0].yAxis,
            res.data[0].legend,
            3, // 线和柱状图
            1 // 线状开始索引
          )
          this.timerSZ = echartsUtils.chartInit('chartSZ', szOption, '1')
        })
    },
    getStyle (rowKey, row_cellKey) {
      if (row_cellKey == 2 || row_cellKey == 3) {
        if (this.dataTableSZ.rows[rowKey][row_cellKey + 2] == '上升') {
          return ' Red'
        } else if (this.dataTableSZ.rows[rowKey][row_cellKey + 2] == '下降') {
          return ' Green'
        }
      }
      return ''
    }
  },
  components: { countTo, vueSeamlessScroll },
  mounted () {
    webAPI.server
      .get({
        // url: "../static/json/rckc.json"
        url: this.GLOBAL.weburl_Onemap + '/handler/dsj/hjjc.ashx'
      })
      .then(res => {
        if (res.data.length == 0) return
        this.data = res.data

        this.kqzlDataList = this.data[0]
        this.handlerEcharts()

        this.dataTableSZ.cells = this.data[1].cells
        this.dataTableSZ.rows = this.data[1].rows
        this.getCDSZ(this.dataTableSZ.rows[0][0])
        this.getGXSJ('空气')
        this.getGXSJ('水质')
      })
    var hours = 0
    this.timerKq = setInterval(() => {
      hours++
      this.getGXSJ('空气')
      if (hours % 4 == 0) {
        this.getGXSJ('水质')
      }
    }, 3600000)
  },

  destroyed () {
    clearInterval(this.timerKq)
  }
}
</script>
<style lang="less" scoped>
.pt1 {
  height: 500px;
   .gxsj{
    margin-left: 30px;
    position: absolute;
  }
  .titleLeft {
    float: left;
    width: 10%;
    margin: 6px 0 0 0;
    position: initial;
    text-align: center;
    line-height: 50px;
    height: 30px;
    font-weight: bold;
    padding-top: 5px;
    box-sizing: border-box;
    font-size: 1.3rem;
  }
  .dsj-panel-flex-row {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
    width: 90%;
    height: 90%;
  }
  .barStyle {
    float: left;
    margin: 6px 0 0 0;
    // height: 100px;
    width: 90%;
  }
  .flexRow {
  }
  .leftdiv {
    width: 50%;
    background: url("~static/images/dsj/panelbg.png") center bottom no-repeat;
    background-size: 80%;
    height: 150px;
    .cardPanel1 {
      height: 140px;
      //width: 140px;
      box-shadow: 0 0 10px inset rgba(255, 255, 255, 0.2);
      width: 80px;
      height: 80px;
      padding: 10px;
      border-radius: 50px;
      text-align: center;
      margin: 10px auto 0 auto;
      .container {
        margin: 0 auto;
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        padding-top: 10px;
        border-radius: 42px;
        box-shadow: 0px 0px 16px inset rgba(0, 0, 0, 0.28);
        font-size: 1.6rem;
        font-weight: bold;
        span {
          font-size: 2.8rem;
          display: block;
          font-weight: bold;
        }
      }
    }
  }
  .rightdiv {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    .cardPanel1 {
      font-size: 12px;
      padding-left: 0;
      height: 44px;
      margin: 0.7rem 0 0 0.7rem;
      width: 82px;
      border: 1px solid #007a3e;
      box-sizing: border-box;
      border-radius: 4px;
      color: #fff;

      //height: 150px;
      .title {
        font-size: 1.2rem;
        text-align: center;
        height: 20px;
        line-height: 20px;
        //font-weight: bold;
        //color: #aab6d6;
      }
      .container {
        height: 22px;
        line-height: 20px;
        text-align: center;
        background: #007a3e;
        color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        span {
          font-size: 1.4rem;
          font-weight: bold;
          font-family: "myfont";
          letter-spacing: 2px;
          color: #fff;
        }
      }
    }
  }
  .bg {
    height: 380px;
  }
}
.pt2 {
  .panelDataChart {
    margin-top: 30px;
    span {
      // color: #2bc6f4;
      font-size: 1.4rem;
      text-align: center;
      display: block;
      font-weight: bold;
    }
  }
  .list_title {
    padding: 2px 0;
  }
  .list_content {
    li {
      padding: 2px 0;
    }
  }
  .list_cell0 {
    width: 30%;
  }
  .list_cell1 {
    width: 30%;
  }
  .list_cell2 {
    width: 20%;
  }
  .list_cell3 {
    width: 20%;
  }
  .list_cell4 {
    display: none;
  }
  .list_cell5 {
    display: none;
  }
  .list_content .Red {
    background-image: url(~static/images/dsj/up.png);
    background-repeat: no-repeat;
    background-position: 70px 5px;
  }
  .list_content .Green {
    background-image: url(~static/images/dsj/down.png);
    background-repeat: no-repeat;
    background-position: 70px 5px;
  }
}
.panel {
  position: relative;

  .time {
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 1.2rem;
  }
}
</style>
