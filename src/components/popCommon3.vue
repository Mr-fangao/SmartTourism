<template>
  <div
    class="popContainerSmall"
    :style="style"
  >
    <div>
      <div class="title">
        <div class="title-text"><span>{{popinfo.title}}</span></div>
        <div
          class="close"
          @click="closePop"
        ></div>
      </div>
      <div class="container">
        <div class="container-wrap">
          <iframe
            :src="popinfo.src"
            frameborder="0"
          ></iframe>
        </div>
        <div class="container-png">
          <img
            :src="item.url"
            class="item-png"
            alt=""
            v-for="(item,index) in pngList"
            :key="index"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popinfo: {
      type: Object,
      default: {
        title: "",
        src: "",
        width: 987,
        height: 752
      }
    }
  },
  data() {
    return {
      tabIndex: 0,
      style: "",
      pngList: [],
      height: 752
    };
  },
  mounted() {
    //console.log("width=" + document.body.clientWidth + ";height=" + document.body.clientHeight);
    var width = this.popinfo.width || 987;
    this.height = this.popinfo.height || 752;
    var left = this.popinfo.left || (-1 * width) / 2;
    var top = this.popinfo.top || (-1 * height) / 2;
    var style = //"width:" + width + "px;top: " + top + ";left: " + left;
      "width:" +
      width +
      "px;height:" +
      this.height +
      "px;top: " +
      top +
      ";left: " +
      left;

    console.log("yyy=" + style);

    // var height2 = $(".popContainerSmall .container").height();
    // var parentHeight = parseInt(height2) - 500;
    // if (parentHeight < 650) {
    //   parentHeight = 680;
    // }
    // if (parentHeight >= 1080) {
    //   parentHeight = 1080;
    // }
    this.style = style; //+ ";height:" + parentHeight + "px;";
    console.log("xxx=" + $(".popContainerSmall .container").height());
    // this.style = style;
    this.GetListPng();
  },
  methods: {
    closePop() {
      this.$emit("closepop");
    },
    GetListPng() {
      var url =
        this.GLOBAL.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        this.GLOBAL.Appid +
        "&xKey=" +
        this.popinfo.xkey +
        "&key=" +
        this.popinfo.key;
      webAPI.server
        .get({
          url: url
        })
        .then(res => {
          if (res.data.length === 0) return;
          this.pngList = res.data;
        });
    },
    tabChange(index) {
      this.tabIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
.popContainerSmall {
  position: absolute;
  width: 987px;
  height: 753px;
  // background: url("~static/images/pop/border-small.png") no-repeat;
  // background: url("~static/images/dsj/popbk.png") no-repeat;
  // background:#fff;
  // background-size: 100% 100%;
  box-sizing: border-box;
  padding: 30px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // padding:35px 35px;
    border: 34px solid transparent;
    box-sizing: border-box;
    border-image-source: url(~static/images/dsj/popbk.png);
    border-image-slice: 34 34 34 34; //图片边框向内偏移。
    // border-image-width:	20;//图片边框的宽度。
    // border-image-outset:20;	//边框图像区域超出边框的量。
    border-image-repeat: stretched;
    pointer-events: none;
  }
  > div {
    width: 100%;
    height: 100%;
    background: #05223f;
  }
  top: 50%;
  left: 50%;
  margin: -376px -493px;
  z-index: 999999999999999;
  .title {
    height: 50px;
    line-height: 50px;
    // padding: 35px 30px 0 30px;
    position: relative;
    text-align: center;
    font-size: 28px;
    span {
      background: linear-gradient(to right, #0ec4fb, #ffffff);
      background: -webkit-linear-gradient(to right, #0ec4fb, #ffffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-weight: bold;
  }

  .container {
    // padding: 20px 7px 30px 0;
    font-size: 2.2rem;
    display: flex;
    flex-direction: column;
    left: 20px;
    top: 90px;
    bottom: 22px;
    right: 21px;
    position: absolute;
    // height: fit-content;
    height: 100%;
    overflow: auto;
    .container-wrap {
      width: 100%;
      height: 45%;
      padding: 0;
      overflow: hidden;
      iframe {
        width: 100%;
        height: 100%;
      }
      .text {
        text-indent: 2em;
        line-height: 170%;
      }
      .img-list {
        text-align: center;
      }
      .article-title {
        text-align: center;
        padding-bottom: 20px;
        font-size: 33px;
      }
      .img-container {
        display: inline-block;
        vertical-align: top;
        padding: 20px 10px 0 10px;
        .line-img {
          width: 100%;
        }
        .normal-img {
          width: 430px;
          height: 285px;
        }
      }
    }
    .container-png {
      width: 100%;
      height: 40%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      overflow: auto;
      .item-png {
        width: 428px;
        height: 326px;
        // margin-left: 30px;
        // margin-top: 20px;
        border: 2px solid #3fabed;
      }
    }
  }
}
.close {
  position: absolute;
  top: 17px;
  right: 17px;
  width: 30px;
  height: 30px;
  background: url("~static/images/dsj/popclose.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.news-details {
  margin: 0 50px;
}

/*滚动条样式*/
::-webkit-scrollbar {
  width: 5px !important;
  /*height: 4px;*/
  background: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #03c8ff;
}
::-webkit-scrollbar-track {
  border-radius: 5px;
  background: transparent;
}
</style>
