<template>
  <div class="ajzj">
    <div :class="isExpand ? 'center_left darkBackground_left' : 'center_left'">
      <div class="dsj-yc" @click="handlerExpand"></div>
      <transition name="el-zoom-in-center">
        <div class="highFreDiv" v-show="isExpand">
          <div class="title">本年高发案件</div>
          <div style="display: contents;">
            <div id="myChart" class="highFreCaseDiv"></div>
            <div class="highFreCaseTotal">
              <div class="value" v-if="GDZL !== 0">{{ GDZL }}</div>
              <div class="tag">总数</div>
            </div>
            <div class="list">
              <div
                class="oneList"
                v-for="(cell, cellKey) in dataTableAJGF"
                :key="cellKey"
                @click="selectDJDL(cell, cellKey)"
              >
                <div class="indexdjdltop">No.{{ cellKey + 1 }}</div>
                <div :class="currentDJDLindex == cellKey ? 'current' : 'name'">
                  {{ cell["name"] }}
                </div>
                <div class="value">{{ cell["value"] }}</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      pieList: [],
      isExpand: true,
      dataTableAJGF: [],
      GDZL: 0
    }
  },

  mounted () {
    this.getTop10()
  },

  methods: {
    handlerExpand () {
      console.log(122333)
      this.isExpand = !this.isExpand
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          // 提示框，可以在全局也可以在
          trigger: 'item', // 提示框的样式
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          color: '#000', // 提示框的背景色
          textStyle: {
            // 提示的字体样式
            color: 'white'
          }
        },
        series: [
          {
            name: '案件类型',
            type: 'pie', // 环形图的type和饼图相同
            radius: ['70%', '90%'], // 饼图的半径，第一个为内半径，第二个为外半径
            color: [
              '#F5A7C1',
              '#FF33CC',
              '#FF6600',
              '#FFFF00',
              '#CCFF00',
              '#003399',
              '#009999',
              '#663399',
              '#009999',
              '#66CC99',
              '#F5A7C1'
            ],
            label: {
              normal: {
                // 正常的样式
                show: false
              },
              emphasis: {
                // 选中时候的样式
                show: false
              }
            }, // 提示文字
            data: this.pieList
          }
        ]
      })
    },
    getTop10 () {
      var url =
        this.GLOBAL.weburl_DataCenter +
        '/Q.ashx?DBTag=' +
        this.GLOBAL.Appid +
        '&xKey=GetGDTOP_PM'
      webAPI.server
        .get({
          url: url
        })
        .then(res => {
          console.log(res, 7899999)
          this.dataTableAJGF = res.data
          this.dataTableAJGF.map(item => {
            var obj = { name: '', value: '' }
            obj.name = item.name
            obj.value = item.value
            this.pieList.push(obj)
          })
          this.drawLine()
          var number = 0
          this.dataTableAJGF.map(item => {
            number = number + Number(item.value)
          })
          this.GDZL = number
        })
    }
  }
}
</script>
<style lang="less">
.ajzj {
  position: absolute;
  .dsj-yc {
    position: relative;
    height: 60px;
    width: 60px;
    background: url("~static/images/dsj/zk.png") no-repeat;
  }
  .center_left {
    width: 450px;
    height: 800px;
    z-index: 1001;
    position: absolute;
  }
  .darkBackground_left {
    background: linear-gradient(
      to right,
      rgb(0, 6, 20),
      rgba(4, 10, 24, 0.7),
      rgba(0, 6, 20, 0.6),
      rgba(0, 6, 20, 0)
    );
  }
  .highFreDiv {
    width: 90%;
    height: 700px;
    // position: absolute;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
  }
  .highFreDiv .title {
    width: 100%;
    height: 30px;
    font-size: 18px;
    font-family: fanghei;
    margin-left: 15px;
    border-bottom: 2px solid #299cec;
    letter-spacing: 3px;
    font-weight: bolder;
    color: white;
  }
  .highFreCaseDiv {
    width: 40%;
    height: 120px;
    margin-left: 10px;
    // background: url("~static/images/dsj/ajbg.png") no-repeat;
  }
  .highFreCaseTotal {
    width: 50%;
    height: 130px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
  }
  .highFreCaseTotal div {
    width: 70%;
  }

  .highFreCaseTotal .value {
    font-size: 38px;
    font-family: digital;
    letter-spacing: 2px;
    text-align: center;
    //  background-image: -webkit-linear-gradient(
    //   bottom,
    //   rgb(62, 59, 255),
    //   rgb(55, 131, 255),
    //   rgb(132, 237, 255),
    //   rgb(255, 255, 255)
    // );
    // background: linear-gradient(
    //   0deg,
    //   rgb(62, 59, 255),
    //   rgb(55, 131, 255),
    //   rgb(132, 237, 255),
    //   rgb(255, 255, 255)
    // );
    // -webkit-background-clip: text;
    background-clip: text;
    color: rgb(55, 131, 255);
    font-weight: bolder;
  }

  .highFreCaseTotal .tag {
    font-size: 1.6rem;
    letter-spacing: 2px;
    text-align: center;
    color: white;
  }
  .list {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
  }

  .list .oneList {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .indexdjdltop {
    width: 80px;
    color: white;
    background: linear-gradient(to bottom, #bc340a, #d45602);
    font-size: 14px;
    text-align: center;
    border-radius: 10px;
  }
  .name {
    width: 150px;
    color: white;
    font-size: 14px;
    text-align: center;
  }

  .name:hover {
    width: 150px;
    text-align: center;
    color: #3b62fa;
    font-size: 1.6rem;
    font-weight: bold;
  }
  .list .oneList .value {
    width: 80px;
    //font-size: 24px;
    font-size: 1.6rem;
    font-weight: bold;
    color: #fdae03;
    text-align: center;
  }
  .current {
    width: 150px;
    text-align: center;
    color: #3b62fa;
    font-size: 1.6rem;
    font-weight: bold;
  }

  .timeLineDiv {
    width: 650px;
    z-index: 1001;
    right: 950px;
    bottom: 40px;
    position: fixed;
    .timeLineHr {
      margin-left: 15px;
      margin-right: 70px;
      margin-top: 25px;
      border: 1px solid #fff;
    }
    .timeLineUl {
      display: flex;
      justify-content: space-between;
      margin-left: 5px;
      list-style: none;
      .liMid {
        margin-top: -30px;
        img {
          margin-right: 0px;
        }
      }
      .liBottom {
        color: #fff;
      }
    }
  }
}
</style>
