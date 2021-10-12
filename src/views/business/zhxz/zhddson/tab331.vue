<template>
  <div>
    <!-- <div class="panel pt1">
      <div class="panel_header">
        <div
          v-if="data.length>0"
          class="panel_headerTitle"
        >{{data[0].title}}</div>
      </div>
      <div class="panel_content">
        <div
          id="chartZG"
          style=" height:590px;width:440px;"
        ></div>
        <div class="panel_table">
          <div class="list_title">
            <span
              :class="'list_cell'+cellKey"
              v-for="(cell,cellKey) in dataTableXX.cells"
              :key="cellKey"
            >{{cell}}</span>
          </div>
          <vue-seamless-scroll
            :data="dataTableXX.rows"
            style="height:280px;overflow:hidden"
            :class-option="autoScrollOption"
          >
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row,rowKey) in dataTableXX.rows"
                    :key="rowKey"
                  >
                    <span
                      :class="'list_cell'+row_cellKey"
                      v-for="(row_cell,row_cellKey) in row"
                      :key="row_cellKey"
                      @click="fixMap(row[0],row[4])"
                    >{{row_cell}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div> -->

  </div>
</template>
<script>
import echarts from 'echarts'
import echartsUtils from 'js/echartsUtils.js'
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  data () {
    return {
      data: [],
      dataTableXX: {
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
      }
    }
  },
  methods: {
    fixMap (key, id) {
      var urlgd = this.GLOBAL.weburl_HGXQ + key + '&s=' + Math.random()
      window.layerAPI.openResultWin('', urlgd, ['850px', '550px'])
      // 整改点定位
      var url =
        this.GLOBAL.weburl_DataCenter +
        '/Q.ashx?DBTag=' +
        this.GLOBAL.Appid +
        '&xKey=Query_AQSC_AJ&id=' +
        id
      webAPI.server
        .get({
          url: url
        })
        .then(res => {
          $('iframe')[0].contentWindow.GeoneMap.clientShowPatrolPoints(
            res,
            true
          )
        })
    },
    fixMapSQ (name) {
      // 整改区域
      var url =
        this.GLOBAL.weburl_DataCenter +
        '/Q.ashx?DBTag=' +
        this.GLOBAL.Appid +
        '&xKey=Query_LocationSQ&name=' +
        name
      webAPI.server
        .get({
          url: url
        })
        .then(res => {
          $('iframe')[0].contentWindow.GeoneMap.clientShowPatrolPoints(
            res,
            true
          )
        })
    },
    chartAction (ID, chart_Option) {
      var _this = this
      var chart = echarts.init(document.getElementById(ID))
      chart.on('click', function (param) {
        _this.fixPoint(param.name, param.seriesName)
      })
      chart.setOption(chart_Option)
    },
    fixPoint (name, type) {
      webAPI.server
        .get({
          url:
            this.GLOBAL.weburl_Onemap +
            '/handler/dsj/aqsc_xq.ashx?csq=' +
            name +
            '&hg=' +
            type
        })
        .then(res => {
          this.dataTableXX.cells = res.data[0].cells
          this.dataTableXX.rows = res.data[0].rows
          this.fixMapSQ(name)
        })
    }
  },
  components: { vueSeamlessScroll },
  mounted () {
    var _this = this
    webAPI.server
      .get({
        url: this.GLOBAL.weburl_Onemap + '/handler/dsj/aqsc.ashx'
      })
      .then(res => {
        if (res.data.length == 0) return
        this.data = res.data
        var zgOption = echartsUtils.getEchartsConfig_EX2(
          this.data[0].chartType.toLowerCase(),
          this.data[0].xAxis,
          this.data[0].data,
          this.data[0].title,
          this.data[0].xUnit,
          this.data[0].legend,
          this.data[0].stack
        )
        zgOption.grid.top = '50px'
        zgOption.grid.left = '2%'
        zgOption.grid.right = '12%'
        zgOption.series[1].label = {
          normal: {
            show: true,
            position: 'right',
            color: 'white',
            formatter: function (params) {
              for (
                let index = 0;
                index < _this.data[1]['list'].length;
                index++
              ) {
                const element = _this.data[1]['list'][index]
                if (element['name'] == params.name) {
                  return element['value']
                }
              }
            }
          }
        }
        this.timer4 = this.chartAction('chartZG', zgOption, '1')
        this.timesZG = setTimeout(() => {
          _this.fixPoint(
            zgOption.yAxis.data[zgOption.yAxis.data.length - 1],
            zgOption.series[0].name
          )
        }, 100)
      })
  },
  destroyed () {
    clearTimeout(this.timesZG)
  }
}
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 26% 48% 26%;
  grid-template-rows: 30% 30% 40%;
  .pt1 {
    .flexRow {
      height: 180px;
    }
    .panelDataChart {
      width: 60%;
    }
    .leftdiv {
      width: 40%;
      .cardPanel {
        //width: 0px;
        padding-left: 0;
        height: 45px;
        margin: 1rem 1rem 1rem 0;
        text-align: center;
        //height: 150px;
        .title {
          display: inline-block;
          float: left;
          font-size: 1.2rem;
          padding-left: 10px;
        }
        .container {
          //display: inline-block;
          height: 45px;
          line-height: 45px;
          span {
            font-size: 2rem;
          }
        }
      }
    }
    .panel_table {
      margin-top: -35px;
       .list_cell0 {
        display: none;
      }
      .list_cell1 {
        width: 15%;
      }
      .list_cell2 {
        width: 15%;
      }
      .list_cell3 {
        width: 35%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      .list_cell4 {
        width: 35%;
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        overflow: hidden; //超出一行文字自动隐藏
      }
      // .list_cell3 {
      //   width: 35%;
      //   text-overflow: ellipsis; //文字隐藏后添加省略号
      //   white-space: nowrap; //强制不换行
      //   overflow: hidden; //超出一行文字自动隐藏
      // }
      // .list_cell4 {
      //   display: none;
      // }
      .list_title {
        // padding: 2px 0;
      }
      .list_content {
        li {
          // padding: 2px 0;
        }
      }
    }
  }
}
</style>
