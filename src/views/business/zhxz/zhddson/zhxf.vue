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
        <div class="flexRow">
          <div class="leftdiv">
            <div
              v-if="index==0"
              v-for="(item,index) in xfDataList.list"
              class="iconcardPanel"
            >
              <div class="container">
                {{item.name}}
                <span>
                  <countTo
                    :startVal="0"
                    :endVal="parseFloat(item.value)"
                    :duration="2000"
                    :decimals="item.value.indexOf('.')>-1?2:0"
                  ></countTo>
                </span>{{item.xUnit}}
              </div>
            </div>
          </div>
          <div class="rightdiv">
            <div
              v-if="index>0"
              v-for="(item,index) in xfDataList.list"
              class="iconcardPanel"
            >
              <div class="title"> {{item.name}}</div>
              <div class="container">
                <span>
                  <countTo
                    :startVal="0"
                    :endVal="parseFloat(item.value)"
                    :duration="2000"
                    :decimals="item.value.indexOf('.')>-1?2:0"
                  ></countTo>
                </span>{{item.xUnit}}
              </div>
            </div>

          </div>
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
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chart1"
              style="height:260px;"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt3">
      <div class="panel_header">
        <div
          v-if="data.length>0"
          class="panel_headerTitle"
        >{{data[2].title}}</div>
      </div>
      <div class="panel_content">
        <div class="panelDataChart">
          <div class="panelDataChart_part">
            <div
              id="chart2"
              style="height:260px;"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 智慧乡镇:网格管理
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";

export default {
  data() {
    return {
      xfDataList: {},
      dataTablelb: {},
      data: [],
      autoScrollOption: {
        autoPlay: true, // 自动播放
        step: 0.2, // 滚动速度（步长）
        limitMoveNum: 6, // 开始无缝滚动最小数据长度
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 20
      }
    };
  },
  methods: {},
  components: { countTo },
  mounted() {
    webAPI.server
      .get({
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/zhxf.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;
        this.xfDataList = this.data[0];

        // 年度统计
        var chart1Option = echartsUtils.getEchartsConfig(
          this.data[2].chartType.toLowerCase(),
          this.data[2].xAxis,
          this.data[2].data,
          this.data[2].title,
          this.data[2].xUnit
        );
        console.log(chart1Option, "159");
        // chart1Option.series[0].labelLine = {
        //   normal: {
        //     length: 20,
        //     length2: 70
        //   }
        // };
        // chart1Option.series[0].label = {
        //   normal: {
        //     formatter: "{b|{b}}{a|{d}%}\n\n",
        //     borderWidth: 20,
        //     borderRadius: 4,
        //     padding: [0, -80],
        //     rich: {
        //       a: {
        //         fontSize: 12,
        //         lineHeight: 20
        //       },
        //       b: {
        //         fontSize: 12,
        //         lineHeight: 20
        //       }
        //     }
        //   }
        // };
        // chart1Option.legend.orient = "horizontal";
        chart1Option.legend.x = "right";
        chart1Option.legend.y = "center";
        // chart1Option.legend.show = true;
        chart1Option.series[0].center = ["45%", "50%"];
        chart1Option.series[0].radius = ["0%", "60%"];
        // // chart1Option.legend.x = "left",
        // chart1Option.series[0].roseType = "radius";

        this.timer1 = echartsUtils.chartInit("chart2", chart1Option, "1");

        // 信访趋势
        var chart2_Option = echartsUtils.getEchartsConfig_EX(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          [this.data[1].data],
          this.data[1].title,
          this.data[1].xUnit,
          this.data[1].legend
        );
        console.log(chart2_Option, "123456");

        this.timer8 = echartsUtils.chartInit("chart1", chart2_Option, "1");
      });
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
.lg_main {
  .pt1 {
    margin-top: 10px;
    height: 280px;
    .flexRow {
    }
    .rightdiv {
      margin-top: 10px;
      .iconcardPanel {
        width: 170px;
        margin: 0.5rem 1rem;
        border: none;
        padding-bottom: 30px;
        .container {
          > span {
            font-size: 2.4rem;
          }
          &:before,
          &:after {
            display: none;
          }
        }
        &:before,
        &:after {
          display: none;
        }
        .title {
          height: 2rem;
          line-height: 2rem;
        }
      }
      .iconcardPanel:nth-child(1):before {
        background: url("~static/images/dsj/icon-22.png") 0 -5px no-repeat;
        display: block;
      }
      .iconcardPanel:nth-child(2):before {
        background: url("~static/images/dsj/icon-21.png") 0 -5px no-repeat;
        display: block;
      }
    }
    .leftdiv {
      background: url("~static/images/dsj/xfbg.png") center 0px no-repeat;
      .iconcardPanel {
        width: 210px;
        padding-left: 0;
        padding-top: 90px;
        margin-right: 40px;
        margin-left: 20px;
        text-align: center;
        //height: 150px;
        .title {
          display: inline-block;
        }
        .container {
          display: inline-block;
          //background: #1c3c9c;
          padding: 5px 10px;
          margin-top: 20px;
          span {
            margin-left: 10px;
          }
        }
      }
      .iconcardPanel:before {
        width: 210px;
        height: 58px;
        top: 20px;
      }
    }
  }
  .pt2 {
    .tab {
      text-align: center;
      padding-bottom: 20px;
      li {
        display: inline-block;
        height: 2.4rem;
        line-height: 2.4rem;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 1.2rem;
        padding: 0 1.5rem;
        margin: 0 0.7rem;
      }
      li.current {
        
        background: #0088f1;
      }
    }
    .panelDataChart {
      margin: 10px 10px;
      span {
        // color: #2bc6f4;
        font-size: 1.4rem;
        text-align: center;
        display: block;
        font-weight: bold;
      }
    }
  }
  .pt3 {
    margin-top: 20px;
  }
}
</style>
