<template>
  <div class="popContainerSmall" :style="style">
    <div>
      <div class="title">
      <div class="title-text"><span>{{popinfo.title}}</span></div>
      <div class="close" @click="closePop"></div>
    </div>
    <div class="container">
      <div class="container-wrap">
          <iframe src="http://112.4.85.57:9000/customize/hqfq/simple" frameborder="0"></iframe>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popCommon",
  props:{
      popinfo:{
          type:Object,
          default:{
              title:"",
              src:"",
              width: 1920,
              height: 1080
          }
      }
  },
  data() {
    return {
      tabIndex: 0,
      style: ""
    };
  },
  mounted() {
    //console.log("width=" + document.body.clientWidth + ";height=" + document.body.clientHeight);
    var width = this.popinfo.width || 900;
    var height = this.popinfo.height || 700;
    var left = -1 * width / 2;
    var top = -1 * height / 2;
    var style = "width:" + width + "px;height:" + height + "px;margin: " + top + "px " + left + "px";
    console.log("yyy=" + style);
    this.style = style;
  },
  methods: {
    closePop() {
      this.$emit("closepop");
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
  &::before{
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // padding:35px 35px;
    border:34px solid transparent;
    box-sizing: border-box;
    border-image-source:url(~static/images/dsj/popbk.png);
    border-image-slice:	34 34 34 34;//图片边框向内偏移。	
    // border-image-width:	20;//图片边框的宽度。	
    // border-image-outset:20;	//边框图像区域超出边框的量。	
    border-image-repeat:stretched;
    pointer-events: none;
  }
  >div{
    width: 100%;
    height: 100%;
    background: #05223F;
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
    font-size: 26px;
      span{
        
        background: linear-gradient(to right, #0EC4FB, #ffffff);
        background: -webkit-linear-gradient(to right, #0EC4FB, #ffffff);
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

        left: 20px;
    top: 125px;
    bottom: 22px;
    right: 21px;
    position: absolute;


    .container-wrap {
      height: 100%;
      padding: 0 ;
      iframe{
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
