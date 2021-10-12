<template>
  <div class="lg_main">
    <div class="map pt1">
      <iframe
        :src="this.GLOBAL.weburl_dsjMapbox+'/#/ch_zhdl'"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height:100%;width: 100%;"
      ></iframe>
    </div>

    <div class="panel pt2">
      <div class="pic">
        <img
          v-if="false"
          src="~static/images4800/jbgk.png"
        />
      </div>
    </div>
    <div class="panel pt3">
      <div class="total">
        <div class="title">镇域面积</div>
        <div class="container">
          <span>{{parseInt(zymj/10)}}</span>
          <span>{{parseInt(zymj%10)}}</span>
          <span>.</span>
          <span>{{(zymj*10)%10}}</span>平方公里
        </div>
      </div>
    </div>
    <div class="panel pt4">
      <div class="flexRow">
        <div class="listPanel">
          <div class="container">
            <span>
              {{jsl}}
              <span class="unit">%</span>
            </span>及时率
          </div>
          <div class="title">
            事件处置：
            <span>{{sjcz}}</span>起
          </div>
        </div>
        <div class="listPanel">
          <div class="container">
            <span>
              {{bjl}}
              <span class="unit">%</span>
            </span>办结率
          </div>
          <div class="title">
            办结工单：
            <span>{{bjgd}}</span>件
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt5">
      <div class="panel_content">
        <div class="flexRow">
          <div
            class="iconcardPanel"
            @click="getMap('XRegion_Village')"
          >
            <div class="title">行政村</div>
            <div class="container">
              <span>{{xzcgs}}</span>个
            </div>
          </div>
          <div class="iconcardPanel">
            <div class="title">户籍人口</div>
            <div class="container">
              <span>{{hjrk}}</span>万
            </div>
          </div>
          <div class="iconcardPanel">
            <div class="title">常住人口</div>
            <div class="container">
              <span>{{czrk}}</span>万
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zymj: 0,
      xzcgs: 0,
      sq: 0,
      hjrk: 0,
      czrk: 0,
      jsl: 0,
      bjl: 0,
      sjcz: 0,
      bjgd: 0
    };
  },
  methods: {
    getMap(type) {
      $("iframe")[0].contentWindow.window.addLayerByKey(type);
    }
  },
  components: {},
  mounted() {
    webAPI.server
      .get({
        url: this.GLOBAL.weburl_Onemap + "/handler/dsj/home.ashx"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;

        // 垃圾分类数值
        this.data[0]["list"].forEach(item => {
          switch (item["name"]) {
            case "镇域面积":
              this.zymj = item["value"];
              break;
            case "行政村个数":
              // this.xzcgs = item["value"];
              this.xzcgs = 9;
              break;

            case "户籍人口":
              this.hjrk = item["value"];
              break;
            case "常住人口":
              this.czrk = item["value"];
              break;
          }
        });
      });
  }
};
</script>
<style lang="less" scoped>
.lg_main {
  .panel {
    width: 100%;
    height: auto;
  }
  .pt1 {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    z-index: 3;
    &::before {
      background: url("~static/images/dsj/mask2.png") 0 0 no-repeat;
      //background: rgba(0, 0, 0, 0.3);
      opacity: 1;
    }
  }
  .pt2 {
    height: 370px;
    margin-top: 90px;
    text-align: left;
    .pic {
      padding: 20px 0 0 0px;
    }
    display: none;
  }
  .pt3 {
    position: absolute;
    top: 110px;
    left: 40px;
    pointer-events: none;
    .total {
      .title {
        font-weight: bold;
        font-size: 2.4rem;
        color: #24c2df;
      }
      .container {
        color: #24c2df;
        margin-top: 15px;
        font-size: 2.4rem;
        font-style: italic;
        span {
          //background: url("~static/images/dsj/nunbg.png") 0 0 no-repeat;
          font-style: initial;
          background: #0a4f84;
          border-radius: 4px;
          background-size: 100%;
          display: inline-block;
          width: 48px;
          height: 58px;
          margin: 2px;
          text-align: center;
          line-height: 58px;
          font-size: 6.4rem;
          font-weight: bold;
          font-family: "myfont";
          color: #fff;
          margin: 0 3px 0 0;
        }
      }
    }
  }
  .pt4 {
    margin-top: 40px;
    display: none;
    .flexRow {
      justify-content: left;
    }
    .listPanel {
      width: 43%;
      .title {
        text-align: center;
        display: block;
        //font-weight: bold;
        margin-top: 5px;
        span {
          color: #fff000;
          font-weight: bold;
          margin-right: 5px;
          font-size: 1.6rem;
        }
      }
      .container {
        background: url("~static/images4800/panelbg2.png") 0 0 no-repeat;
        width: 116px;
        height: 116px;
        text-align: center;
        margin: 0 auto;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        span {
          display: block;
          text-align: center;
          color: #fff000;
          font-size: 2rem;
          font-weight: bold;
          font-family: "myfont";
          letter-spacing: 1px;
          //letter-spacing: 2px;
          padding-top: 45px;
          padding-bottom: 20px;
          .unit {
            display: inline;
            font-size: 1.4rem;
          }
        }
      }
    }
  }
  .pt5 {
    position: absolute;
    bottom: 0;
    padding: 15px 0 70px 0;
    background: rgba(0, 0, 0, 0.05);
    left: 0;
    .iconcardPanel {
      padding-left: 100px;
      margin: 0 30px;
      .title {
        font-size: 1.6rem;
        font-weight: normal;
      }
      &:before {
        border-radius: 50px;
        width: 64px;
        height: 64px;
        background: #0a4f84;
        border: 2px solid #3ad5e8;
        background-position: center;
        background-repeat: no-repeat;
        top: 7px;
      }
      .container {
        font-size: 2rem;
        color: #24c2df;
        span {
          font-weight: bold;
          font-size: 5rem;
          background-image: -webkit-linear-gradient(
            bottom,
            #1b8bef,
            #24c2df,
            #59eff4
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .iconcardPanel:nth-child(1) {
      &:before {
        background-image: url("~static/images/dsj/icon-13.png");
      }
    }
    .iconcardPanel:nth-child(2) {
      &:before {
        background-image: url("~static/images/dsj/icon-14.png");
      }
    }
    .iconcardPanel:nth-child(3) {
      &:before {
        background-image: url("~static/images/dsj/icon-15.png");
      }
    }
    .iconcardPanel:nth-child(4) {
      &:before {
        background-image: url("~static/images/dsj/icon-28.png");
      }
    }
  }
}
</style>
