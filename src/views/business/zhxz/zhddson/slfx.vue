<template>
  <div v-if="data.length>0">
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">{{data[0].title}}<span class="gxsj" v-if="data.length>0" >数据更新于{{updatetime1}}</span></div>
      </div>
      <div class="panel_content">
        <!-- <div class="tab">
          <ul>
            <li
              v-for="(item,index) in data"
              v-if="item.title==data[0].title"
              :class="selectItem==item.subtitle? 'current':''"
              @click="selectItem=item.subtitle"
            >
              <span>{{item.subtitle}}</span>
            </li>
          </ul>
        </div> -->
        <div
          v-if="selectItem=='闸站'"
          style="height:160px"
        >
          <div class="panel_table">
            <div class="list_title">
              <span
                :class="'list_cell'+cellKey"
                v-for="(cell,cellKey) in dataTableNH.cells"
                :key="cellKey"
              >{{cell}}</span>
            </div>
            <div class="list_content">
              <div class="list_contentInfo">
                <ul>
                  <li
                    v-for="(row,rowKey) in dataTableNH.rows"
                    :key="rowKey"
                  >
                    <span
                      :class="'list_cell'+row_cellKey"
                      v-for="(row_cell,row_cellKey) in row"
                      :key="row_cellKey"
                      @click="getZZPoint(row[0],row[1])"
                      :style="'color:'+(row_cellKey==4?row[row_cellKey]=='超警戒水位'?'red':row[row_cellKey]=='超控制水位'?'orange':'green':'')"
                    >{{row_cell}}</span>
                  </li>
                </ul>
              </div>
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
        <div
          v-if="selectItem=='水位'"
          class="flexRow"
          style="height:160px"
        >
          <div
            class="leftdiv"
            v-for="(item,index) in data[0].list"
          >
            <div class="cardPanel1">
              <div
                class="container"
                :style="'background:'+getClassColor(item.level)"
                @click="getSWList(item.cid,item.name)"
              >
                <span>
                  <countTo
                    :startVal="0"
                    :endVal="parseFloat(item.value)"
                    :duration="2000"
                    :decimals="item.value.indexOf('.')>-1?2:0"
                  ></countTo>
                </span>
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="dataSW.length>0"
          style=" text-align: center; margin-top:10px;"
        >{{selectName + dataSW[0].subtitle}}</div>
        <div
          id="chartSW"
          style=" height:160px;width:450px; "
        ></div>
      </div>
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div class="panel_headerTitle">{{data[2].title}}<span class="gxsj" v-if="data[2].list.length>0">数据更新于{{updatetime1}}</span></div>
      </div>
      <div class="weather">
        <span class="spanStyle">{{yqSelectName}}</span>
        <span class="spanStyle">{{tem}}°</span>
        <span class="spanStyle">{{wea}}</span>
        <img :src="'static/images/weather/'+wea_img+'.png'" />
        <span
          class="taifeng"
          @click="turnTF()"
        >关注台风</span>
      </div>
      <div class="flexRow">
        <div
          v-if="data.length>0"
          class="leftdiv"
          v-for="(item,index) in data[2].list"
        >
          <div class="cardPanel1">
            <div
              class="container"
              :style="'background:'+getClassColor2(item.level)"
              @click="getYQ(item,item.name)"
            >
              <span>
                <countTo
                  :startVal="0"
                  :endVal="parseFloat(item.value)"
                  :duration="2000"
                  :decimals="item.value.indexOf('.')>-1?2:0"
                ></countTo>
              </span>
              {{item.name}}
            </div>
          </div>
        </div>
      </div>

      <div
        id="chartYL"
        style=" height:160px;width:450px;float:left "
      ></div>
      <div
        v-if="dataYQ.length>0"
        style=" text-align: center; top: 210px;
    margin-left: 100px;
    position: absolute;"
      >{{yqSelectName+ dataYQ[0].subtitle}}</div>
      <div
        style="margin-top:180px;position: absolute;"
        v-if="dataYQ.length>0"
      >
        <div class="commontable">
          <div
            v-for="(item,index) in dataYQ[1].list"
            class="commontable-flex"
          >
            <div class="commontable-div">{{item.name}}</div>
            <div class="commontable-div2">{{item.value}}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="divDialog"
      class="popdiv"
      v-if="showTF"
    >
      <div class="popbg">
        <div class="corner"></div>
        <div
          class="close"
          @click="showTF=false"
        ></div>
        <iframe
          frameborder="0"
          width="650"
          height="488"
          src="http://typhoon.weather.com.cn/gis/typhoon_p.shtml"
          name="surf"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts-liquidfill'
import echartsUtils from 'js/echartsUtils.js'
import countTo from 'vue-count-to'

export default {
  props: {
    updatetime1: String
  },
  data () {
    return {
      listRowNum: 4,
      selectIndex: 0,
      spanList: [],
      selectItem: '水位',
      ylItem: '',
      data: [],
      dataSW: [],
      dataYQ: [],
      dataTableNH: {
        cells: [],
        rows: []
      },
      dataTableALL: {
        cells: [],
        rows: []
      },
      tem: '',
      wea: '',
      wea_img: '',
      air_level: '',
      showTF: false,
      isFirst: true,
      selectName: '',
      yqSelectName: ''
    }
  },
  watch: {
    selectIndex (val) {
      this.dataTableNH.rows = []
      for (
        let index = val * this.listRowNum;
        index < this.dataTableALL.rows.length;
        index++
      ) {
        if (index < val * this.listRowNum + this.listRowNum) {
          const item = this.dataTableALL.rows[index]
          this.dataTableNH.rows.push(item)
        } else {
          break
        }
      }
    },
    ylItem (val) {
      var url =
        this.GLOBAL.weburl_Onemap + '/handler/dsj/slfx_yl.ashx?cid=' + val
      webAPI.server
        .get({
          url: url
        })
        .then(res => {
          if (res.data.length == 0) return
          this.dataYQ = res.data
          var ylOption = echartsUtils.getEchartsConfig(
            res.data[0].chartType.toLowerCase(),
            res.data[0].xAxis,
            res.data[0].data,
            res.data[0].title,
            res.data[0].xUnit
          )
          ylOption.xAxis.axisLabel.interval = 6
          ylOption.xAxis.axisLabel.rotate = '0'
          ylOption.grid.left = '5%'
          ylOption.grid.right = '10%'
          ylOption.yAxis.scale = true
          this.timerYL = echartsUtils.chartInit('chartYL', ylOption, '1')

          res.data[1]['list'].forEach(item => {
            switch (item['name']) {
              case '近1小时雨量':
                this.yl1 = item['value']
                break
              case '近3小时雨量':
                this.yl3 = item['value']
                break
              case '近12小时雨量':
                this.yl12 = item['value']
                break
              case '近24小时雨量':
                this.yl24 = item['value']
                break
              default:
                break
            }
          })
        })
    }
  },
  methods: {
    getYQ (item, name) {
      this.ylItem = item.cid
      this.yqSelectName = item.name
      this.GetTianqi(item.cityid)
    },
    getPosition (id) {
      if (!this.isFirst) {
        var url =
          this.GLOBAL.weburl_DataCenter +
          '/Q.ashx?DBTag=' +
          this.GLOBAL.Appid +
          '&xKey=Query_ZZ&id=' +
          id
        webAPI.server
          .get({
            // url: "../static/json/rckc.json"
            url: url
          })
          .then(res => {
            $('iframe')[0].contentWindow.GeoneMap.clientShowPatrolPoints(
              res,
              true
            )
          })
      } else {
        this.isFirst = false
      }
    },
    turnTF () {
      this.showTF = true
    },
    getClassColor (type) {
      switch (type) {
        case '超警戒水位':
          return 'red'
        case '超控制水位':
          return 'orange'
        default:
          return '#00882d'
      }
    },
    getClassColor2 (type) {
      switch (type) {
        case '暴雨':
          return 'red'
        case '大雨':
          return 'orange'
        default:
          return '#00882d'
      }
    },
    getZZPoint (id, name) {
      console.log('闸站：id-' + id + ' name:' + name)
      // 闸站位置显示
      this.getPosition(id)
    },
    getSWList (id, name) {
      let url = ''
      this.selectName = name
      this.getPosition(id)
      webAPI.server
        .get({
          url: this.GLOBAL.weburl_Onemap + '/handler/dsj/slfx_sw.ashx?cid=' + id
        })
        .then(res => {
          if (res.data.length == 0) return
          this.dataSW = res.data
          var swOption = echartsUtils.getEchartsConfig(
            res.data[0].chartType.toLowerCase(),
            res.data[0].xAxis,
            res.data[0].data,
            res.data[0].title,
            res.data[0].xUnit
          )
          swOption.xAxis.axisLabel.interval = 6
          swOption.xAxis.axisLabel.rotate = '0'
          swOption.grid.left = '5%'
          swOption.grid.right = '10%'
          swOption.yAxis.splitLine = { show: false }
          swOption.yAxis.splitNumber = 3
          swOption.yAxis.scale = true
          swOption.series[0].markLine = {
            silent: true,
            data: [
              {
                yAxis: 3.2
              },
              {
                yAxis: 3.47
              }
            ]
          }
          swOption.visualMap = {
            show: false,
            top: 10,
            right: 10,
            pieces: [
              {
                gt: 0,
                lte: 3.2,
                color: 'green'
              },
              {
                gt: 3.2,
                lte: 3.47,
                color: 'orange'
              },
              {
                gt: 3.47,
                color: 'red'
              }
            ],
            outOfRange: {
              color: 'green'
            }
          }
          this.timerSW = echartsUtils.chartInit('chartSW', swOption, '1')
        })
    },
    GetTianqi (cityid) {
      console.log(cityid, 'dsmdmlk')
      webAPI.server
        .get({
          url: this.GLOBAL.webUrl_TianQi + cityid // 金湖 101190902
        })
        .then(res => {
          this.wea_img = res.wea_img
          this.wea = res.wea
          this.tem = res.tem
          this.air_level = res.air_level
        })
    },
    getdata () {
      webAPI.server
        .get({
          url: this.GLOBAL.weburl_Onemap + '/Handler/dsj/slfx.ashx'
        })
        .then(res => {
          if (res.data.length == 0) return
          this.data = res.data
          this.dataTableALL.cells = this.data[1].cells
          this.dataTableALL.rows = this.data[1].rows
          this.dataTableNH.cells = this.data[1].cells
          for (let index = 0; index < this.dataTableALL.rows.length; index++) {
            if (index < this.listRowNum) {
              const item = this.dataTableALL.rows[index]
              this.dataTableNH.rows.push(item)
            } else {
              break
            }
          }
          for (
            let index = 0;
            index < Math.ceil(this.data[1].rows.length / this.listRowNum);
            index++
          ) {
            this.spanList.push(index)
          }
          // if (this.dataTableNH.rows.length > 0) {
          setTimeout(() => {
            this.getSWList(this.data[0].list[0].cid, this.data[0].list[0].name)
            this.getYQ(this.data[2].list[0], '')
          }, 1000)
          // }
        })
    }
  },
  components: { countTo },
  mounted () {
    this.getdata()
    this.intertalSQYQ = setInterval(() => {
      this.getdata()
    }, 300000)
  },
  destroyed () {
    clearInterval(this.intertalSQYQ)
  }
}
</script>
<style lang="less" scoped>
.lg_main {
   .gxsj{
      width: 280px;
       right: -37px;
    position: absolute;
       text-align: center;
    display: inline-block !important;
  }
  .pt1 {
    height: 400px;
    .tab {
      position: absolute;
      right: 30px;
      top: 0;
      text-align: center;
      margin-bottom: 10px;
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
    .leftdiv {
      float: left;
      width: 50%;
      background-size: 100%;
      background: url("~static/images/dsj/panelbg.png") center bottom no-repeat;
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
          padding-top: 15px;
          border-radius: 42px;
          box-shadow: 0px 0px 16px inset rgba(0, 0, 0, 0.28);
          font-size: 1.4rem;
          font-weight: bold;
          span {
            font-size: 2.4rem;
            display: block;
            font-weight: bold;
          }
        }
      }
    }
    .rightdiv {
      display: flex;
      float: left;
      flex-wrap: wrap;
      width: 50%;
      .cardPanel1 {
        font-size: 12px;
        padding-left: 0;
        height: 46px;
        margin: 0.5rem 0 0 0.5rem;
        width: 90px;
        border: 1px solid #007a3e;
        box-sizing: border-box;
        border-radius: 4px;
        color: #fff;

        //height: 150px;
        .title {
          font-size: 1.2rem;
          text-align: center;
          height: 21px;
          line-height: 21px;
          //font-weight: bold;
          //color: #aab6d6;
        }
        .container {
          height: 23px;
          text-align: center;
          background: #007a3e;
          color: #c9c9c9;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          span {
            font-size: 1.5rem;
            font-weight: bold;
            font-family: "myfont";
            letter-spacing: 2px;
            color: #fff;
          }
        }
      }
    }
    .list_cell0 {
      display: none;
    }
    .list_cell1 {
      width: 30%;
    }
    .list_cell2 {
      width: 25%;
    }
    .list_cell3 {
      width: 25%;
    }
    .list_cell4 {
      width: 20%;
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
  .pt2 {
    margin-top: 40px;
    .airLevel {
      display: inline-block;
      vertical-align: middle;
      height: 24px;
      padding: 0 15px;
      line-height: 24px;
      font-weight: bold;
      font-weight: normal;
      border-radius: 13px;
      margin: 8px 20px 0 10px;
    }
    .taifeng {
      cursor: pointer;
      color: #6dddff;
      width: 95px;
      border: 1px solid #2666a6;
      box-shadow: 0 0 5px inset rgba(39, 150, 241, 0.6);
      height: 26px;
      line-height: 26px;
      margin: 6px 10px 0 30px;
      text-indent: 10px;
      background: url("~static/images/dsj/icon-25.png") 70px center no-repeat;
      transition: all 0.3s;
      &:hover {
        border: 1px solid #36bcff;
        box-shadow: 0 0 5px inset rgba(39, 172, 241, 0.8);
      }
    }
    .spanStyle {
      margin: 0 10px 0 10px;
    }
    img {
      margin: 0 20px 0 0px;
    }
    .weather {
      width: 430px;
      background: rgba(10, 46, 154, 0.4);
      //padding-bottom: 3px;
      height: 40px;
      line-height: 40px;
      justify-content: space-between;
      //border-top: 1px solid #1b3d9e;
      //border-bottom:  1px solid #1b3d9e;
      display: flex;
      img {
        width: 36px;
      }
    }
    .leftdiv {
      float: left;
      width: 100%;
      background-size: 100%;
      background: url("~static/images/dsj/panelbg.png") center bottom no-repeat;
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
          margin: -2px 0px 0px -2px;
          width: 84px;
          height: 84px;
          box-sizing: border-box;
          padding-top: 15px;
          border-radius: 42px;
          box-shadow: 0px 0px 16px inset rgba(0, 0, 0, 0.28);
          font-size: 1.4rem;
          font-weight: bold;
          span {
            font-size: 2.4rem;
            display: block;
            font-weight: bold;
          }
        }
      }
    }
    .rightdiv {
      display: flex;
      float: left;
      flex-wrap: wrap;
      width: 50%;
      .cardPanel1 {
        font-size: 12px;
        padding-left: 0;
        height: 46px;
        margin: 0.5rem 0 0 0.5rem;
        width: 90px;
        border: 1px solid #007a3e;
        box-sizing: border-box;
        border-radius: 4px;
        color: #fff;

        //height: 150px;
        .title {
          font-size: 1.2rem;
          text-align: center;
          height: 21px;
          line-height: 21px;
          //font-weight: bold;
          //color: #aab6d6;
        }
        .container {
          height: 23px;
          text-align: center;
          background: #007a3e;
          color: #c9c9c9;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          span {
            font-size: 1.5rem;
            font-weight: bold;
            font-family: "myfont";
            letter-spacing: 2px;
            color: #fff;
          }
        }
      }
    }

    .commontable {
      border: 1px solid #1b3d9e;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: center;

      .commontable-flex {
        flex-basis: 50%;
        display: flex;
      }
      .commontable-div {
        text-align: left;
        flex-basis: 60%;
        padding: 3px 7px;
        background: rgba(10, 46, 154, 0.4);
        border: 1px solid #1b3d9e;
        color: #9babd8;
      }
      .commontable-div2 {
        flex-basis: 40%;
        padding: 3px 7px;
        border: 1px solid #1b3d9e;
      }
    }
  }
  .panel {
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
      right: 35px;
      top: 10px;
      cursor: pointer;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
    // &:before {
    //   content: "";
    //   display: block;
    //   width: 24px;
    //   height: 24px;
    //   border-left: 4px solid #3fabed;
    //   border-top: 4px solid #3fabed;
    //   position: absolute;
    //   left: -2px;
    //   top: -2px;
    // }
    // &:after {
    //   content: "";
    //   display: block;
    //   width: 24px;
    //   height: 24px;
    //   border-right: 4px solid #3fabed;
    //   border-top: 4px solid #3fabed;
    //   position: absolute;
    //   right: -2px;
    //   top: -2px;
    // }
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
  .popdiv {
    z-index: 999;
    width: 650px;
    height: 488px;
    position: fixed;
    right: 33%;
    top: 250px;
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
}
</style>
