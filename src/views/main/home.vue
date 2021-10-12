<template>
  <div class="mHome">
    <div class="bg">
      <div class="headerPanel" @dblclick="showToallbar">
        <div class="leftPanel">
          <div
            v-if="item.visable || localhost"
            class="menuItem"
            :class="currentHeaderMenu == item.key ? 'currentMenuItem' : ''"
            v-for="(item, key) in leftMenu"
            :key="key"
            @click="switchHeaderMenu(item.key, item.url, true)"
          >
            <div class="itembg"></div>
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="headerLogo">
          <img
            class="logoimg"
            :src="
              this.GLOBAL.weburl_Onemap +
              '/images/' +
              this.GLOBAL.Appid +
              '/login-logo.png'
            "
            alt
          />
          <span class="name">{{ this.GLOBAL.web_title }}</span>
        </div>
        <div class="rightPanel">
          <div
            v-if="item.visable || localhost"
            class="menuItem"
            :class="currentHeaderMenu == item.key ? 'currentMenuItem' : ''"
            v-for="(item, key) in rightMenu"
            :key="key"
            @click="switchHeaderMenu(item.key, item.url, true)"
          >
            <div class="itembg"></div>
            <span>{{ item.name }}</span>
          </div>
        </div>
        <ul class="toplink">
          <li>
            <div class="toplink-icon">
              <img
                class="icon"
                src="~static/images/dsj/icon-return.png"
                title="业务端"
                @click="openHome()"
              />
            </div>
          </li>
          <li>
            <div class="toplink-icon">
              <img
                class="icon"
                src="~static/images/dsj/closehome.png"
                title="退出"
                @click="closeHome()"
              />
            </div>
          </li>
          <li v-if="false">
            <img
              class="icon"
              title="首页"
              src="~/static/images/dsj/on-off.png"
              @click="openHome()"
              style="width: 26px; height: 24px"
            />
          </li>
          <li v-if="false">
            <img
              class="icon"
              src="~/static/images/dsj/icon-23.png"
              @click="openJBGKHome()"
            />
          </li>

          <li v-if="false">
            <img
              class="icon"
              src="~/static/images/dsj/icon-27.png"
              @click="openSW()"
            />
          </li>
          <li v-if="false">
            <img
              class="icon"
              src="~/static/images/dsj/icon-29.png"
              @click="openZS()"
            />
          </li>
        </ul>
      </div>
      <!-- <div class="time">{{ nowTime }}</div> -->
      <div class="time">
        <div style="font-size: 0.8rem">{{ time }}</div>
        <div>
          <span style="font-size: 0.8rem">{{ weekday }}</span>
          <!-- <span></span> -->
          <span style="font-size: 0.8rem">{{ nowTime }}</span>
        </div>
      </div>
      <div class="containerPanel">
        <!-- <keep-alive> -->
        <router-view
          v-if="isRouterAlive"
          class="Router"
          @closeDPpopup="closeDPpopup"
          @showDpCommonRichtext="showDpCommonRichtext"
          @showDpCommonRichtextObj="showDpCommonRichtextObj"
          @showDpCommonRichtextChild="showDpCommonRichtextChild"
        ></router-view>
        <!-- </keep-alive> -->
        <pop-common
          id="homepopcommon"
          :popinfo="gsPopInfo"
          v-if="isShowPoup && gsPopInfo"
          @closepop="gsPopInfo = false"
          class="homepopcommon"
        ></pop-common>
        <pop-common3
          id="homepopcommon"
          :popinfo="gsPopInfo"
          v-if="isShowPoup3 && gsPopInfo"
          @closepop="gsPopInfo = false"
          class="homepopcommon"
        ></pop-common3>
        <pop-richtext
          id="homepopcommon"
          :popinfo="richPopInfo"
          v-if="isShowRich && richPopInfo"
          @closepop="richPopInfo = false"
          class="homepopcommon"
        ></pop-richtext>
        <pop-richtext2
          id="homepopcommon"
          :popinfo="richPopInfo"
          v-if="isShowRich2 && richPopInfo"
          @closepop="richPopInfo = false"
          class="homepopcommon"
        ></pop-richtext2>
        <poptext-picture
          id="homepopcommon"
          :popinfo="TWPopInfo"
          v-if="isShowTW && TWPopInfo"
          @closepop="TWPopInfo = false"
          class="homepopcommon"
        ></poptext-picture>
      </div>
      <m-loading v-show="showLoading"></m-loading>
    </div>
  </div>
</template>
<script>
import "api/layer";
import mLoading from "components/common/mLoading/mLoading";
import echartsUtils from "js/echartsUtils.js";
import axios from "axios";
import popCommon from "components/popCommon2";
import popCommon3 from "components/popCommon3";
import popRichtext from "components/popRichtext";
import popRichtext2 from "components/popRichtext2";
import poptextPicture from "components/poptextPicture";
export default {
  data() {
    return {
      nowTime: "",
      weekday: "",
      time: "",
      showLoading: true,
      localhost: false,
      leftMenu: [],
      rightMenu: [],
      allMenu: [],
      secondMenu: [],
      currentSecondMenu: "",
      currentHeaderMenu: "",
      weather: null,
      isShow: false,
      gsPopInfo: false,
      richPopInfo: false,
      TWPopInfo: false,
      isShowTW: false,
      isShowPoup: false,
      isShowPoup3: false,
      isShowRich: false,
      richPopInfo2: false,
      isShowRich2: false,
      isRouterAlive: true,
    };
  },
  watch: {},
  components: {
    mLoading,
    popCommon,
    popCommon3,
    popRichtext,
    popRichtext2,
    poptextPicture,
  },
  methods: {
    closeDPpopup(key) {
      //alert(key);
      if (key == 1) {
        this.isShowPoup = false;
        this.isShowPoup3 = false;
        this.$nextTick(function () {
          this.isShowPoup = false;
          this.isShowPoup3 = false;
        });
      }
    },
    showDptextPicture(event) {
      // console.log(event.url, "图文");
      var url = event.url;
      var id = webAPI.utils.getQueryString("title", url) || "";
      var title = webAPI.utils.getQueryString("name", url) || "";
      var type = webAPI.utils.getQueryString("type", url) || "";
      console.log(type, 887777);
      this.isShowTW = false;
      this.$nextTick(function () {
        this.TWPopInfo = {
          title: title,
          width: 900,
          src: "",
          id: id,
          height: 700,
          type: type,
          left: "50%",
          top: "50%",
        };
        this.isShowTW = true;
      });
    },
    showDpCommonPopup2(event) {
      console.log("首页通用弹出框");
      console.log(event.url);
      var url = event.url;
      var title = webAPI.utils.getQueryString("title", url) || "";
      var showpng = webAPI.utils.getQueryString("showpng", url) || "";
      // var width = webAPI.utils.getQueryString("layer_w", url);
      // var height = webAPI.utils.getQueryString("layer_h", url);
      var width = 900;
      var height = 700;
      var left = webAPI.utils.getQueryString("left", url) || "50%";
      var top = webAPI.utils.getQueryString("top", url) || "50%";
      this.isShowPoup = false;
      this.isShowPoup3 = false;
      this.$nextTick(function () {
        this.gsPopInfo = {
          title: title,
          src: url,
          width: width,
          height: height,
          left: left.indexOf("%") > -1 ? left : left + "%",
          top: top.indexOf("%") > -1 ? top : top + "%",
          showpng: showpng,
        };
        this.isShowPoup = true;
      });
    },
    showDpCommonPopup3(event) {
      console.log("首页通用弹出框");
      console.log(event.url);
      var url = event.url;
      var title = webAPI.utils.getQueryString("title", url) || "";
      var showpng = webAPI.utils.getQueryString("showpng", url) || "";
      // var width = webAPI.utils.getQueryString("layer_w", url);
      // var height = webAPI.utils.getQueryString("layer_h", url);
      var width = 900;
      var height = 700;
      var left = webAPI.utils.getQueryString("left", url) || "50%";
      var top = webAPI.utils.getQueryString("top", url) || "50%";
      var key = webAPI.utils.getQueryString("key", url) || null;
      var xkey = webAPI.utils.getQueryString("xkey", url) || null;
      this.isShowPoup3 = false;
      this.isShowPoup = false;
      this.$nextTick(function () {
        this.gsPopInfo = {
          title: title,
          src: url,
          width: width,
          height: height,
          left: left,
          top: top,
          key: key,
          xkey: xkey,
          showpng: showpng,
        };
        this.isShowPoup3 = true;
      });
    },
    showDpCommonRichtext2(event) {
      console.log(event.url);
      var url = event.url;
      var title = webAPI.utils.getQueryString("title", url) || "";
      // var width = webAPI.utils.getQueryString("layer_w", url);
      // var height = webAPI.utils.getQueryString("layer_h", url);
      var width = 900;
      var height = 700;
      var left = webAPI.utils.getQueryString("left", url) || "50%";
      var top = webAPI.utils.getQueryString("top", url) || "50%";
      var contentText = "";
      this.isShowRich2 = false;
      this.isShowRich = false;
      this.$nextTick(function () {
        this.richPopInfo = {
          title: title,
          src: "",
          width: width,
          height: height,
          left: left,
          top: top,
          richtext: contentText,
        };
        this.isShowRich2 = true;
      });
    },
    showDpCommonRichtextChild(richPopInfo) {
      console.log(richPopInfo, "文本框通用弹出框");

      this.isShowRich2 = false;
      this.isShowRich = false;
      this.$nextTick(function () {
        this.richPopInfo = richPopInfo;
        this.isShowRich2 = true;
      });
    },
    showDpCommonRichtextObj(obj) {
      console.log(obj, "文本框通用弹出框");
      this.isShowRich = false;
      this.isShowRich2 = false;
      this.$nextTick(function () {
        this.richPopInfo = obj;
        this.isShowRich = true;
      });
    },
    showDpCommonRichtext(key) {
      console.log(key, "文本框通用弹出框");
      this.isShowRich = false;
      this.isShowRich2 = false;
      this.$nextTick(function () {
        this.richPopInfo = {
          title: "优秀党员详情",
          src: "",
          width: 900,
          height: 700,
          richtext: key,
        };
        this.isShowRich = true;
      });
    },
    getTime() {
      var tempTime = new Date();
      var year = tempTime.getFullYear();
      var month = tempTime.getMonth() + 1;
      var day = tempTime.getDate();

      // 获取时分秒
      var h = tempTime.getHours();
      var m = tempTime.getMinutes();
      var s = tempTime.getSeconds();

      // 检查是否小于10
      h = this.check(h);
      m = this.check(m);
      s = this.check(s);

      var myddy = tempTime.getDay(); // 获取存储当前日期
      var weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      // this.nowTime =
      // year +
      // '年' +
      // month +
      // '月' +
      // day +
      // '日  ' +
      //   weekday[myddy] +
      //   ' ' +
      //   h +
      //   ':' +
      //   m
      this.weekday = weekday[myddy];
      this.nowTime = year + "/" + month + "/" + day;
      this.time = h + ":" + m + ":" + s;
    },
    check(i) {
      var num;
      i < 10 ? (num = "0" + i) : (num = i);
      return num;
    },
    openZS() {
      let nwin = window.open(this.GLOBAL.weburl_Onemap + "/map/map.html");
    },
    openSW() {
      let nwin = window.open(
        "http://58.210.9.133:8091/iserver/services/3D-huaian3Ddata/rest/realspace/scenes/huaian3ddata.openrealspace"
      );
    },
    openJBGKHome() {
      this.$router.push({
        path: "/home/jbgk",
      });
    },
    openHome() {
      window.location.href = "../map/mapBox.html?r=" + Math.random();
    },
    closeHome() {
      window.location.href = "../default.html?r=" + Math.random();
    },
    switchHeaderMenu(key, url, state) {
      this.isShowPoup = false;
      this.isShowPoup3 = false;
      this.isShowTW = false;
      this.isShowRich2 = false;
      if (!state) {
        var routerNextView = window.sessionStorage.getItem("routerNextView");
        console.log(routerNextView, 999);
        if (routerNextView) {
          var routerNexTJson = JSON.parse(routerNextView);
          this.switchHeaderMenu(routerNexTJson.key, routerNexTJson.url, true);
          return;
        }
      }
      this.showLoading = true;
      if (url.length > 0) {
        this.showLoading = true;
        //刷新页面-路由不跳转
        if (this.currentHeaderMenu == key) {
          return;
        }
        this.currentHeaderMenu = key;
        this.$router.push({
          path: url,
        });
        //var routerNextView = window.sessionStorage.getItem("routerNextView");
        // if (routerNextView) {
        // var routerNexTJson = JSON.parse(routerNextView);
        // if (routerNexTJson.url != url) {
        window.sessionStorage.setItem(
          "routerNextView",
          JSON.stringify({ key: key, url: url })
        );
        // }
        // }
      }
      setTimeout(() => {
        this.showLoading = false;
      }, 1000);
    },
    initData(data) {},
    async getWeather() {
      const res = await axios.get(
        "http://wthrcdn.etouch.cn/weather_mini?city=苏州"
      );
      this.weather = res.data.data.forecast[0];
    },
    showToallbar() {
      console.log("dbclick");
      this.isShow = !this.isShow;
      if (this.isShow) {
        document.body.style.overflowX = "auto";
      } else {
        document.body.style.overflowX = "hidden";
      }
    },
    showCommon(e) {
      window.showDpCommonPopup2(e);
    },
  },
  mounted() {
    var _this = this;
    window.addEventListener("message", function (e) {
      console.log(e, 1234569999);
      if (
        e.type == "message" &&
        e.data != undefined &&
        e.data != "" &&
        e.data.type != "webpackOk" &&
        e.data.type != "webpackInvalid"
      ) {
        var fun = e.data.type;
        if (_this[fun]) {
          _this[fun](e.data.data);
        }
        // if (_this[e.data.type] != undefined) {
        // }
      }
    });
    document.body.style.overflowX = "hidden";
    this.getTime();
    this.getWeather();
    webAPI.server
      .get({
        url: "static/json/menu.json",
      })
      .then((res) => {
        if (res.data) {
          if (res.data.length == 0) return;
          var nowUrl = window.location.href;
          this.leftMenu = res.data[0].leftMenu;
          this.rightMenu = res.data[0].rightMenu;
          var loginUserAccount = window.sessionStorage.getItem("userAccount");
          var token = this.$route.query.token || "";
          if (
            nowUrl.indexOf("localhost") != -1 ||
            nowUrl.indexOf("192.168.174.201") != -1 ||
            token.toLowerCase() == "gxq"
          ) {
            this.localhost = true;
            this.allMenu = this.leftMenu.concat(this.rightMenu);
            this.switchHeaderMenu(
              this.leftMenu[0].key,
              this.leftMenu[0].url,
              false
            );
          } else {
            if (!loginUserAccount) {
              window.location.href = "../default.html";
            } else {
              var url =
                this.GLOBAL.weburl_DataCenter +
                "/Q.ashx?DBTag=" +
                this.GLOBAL.Appid +
                "&xKey=dsj_role&UserAccount=" +
                loginUserAccount.replace(/"/g, "");
              webAPI.server
                .get({
                  url: url,
                })
                .then((resRole) => {
                  resRole.data.forEach((RoleItem) => {
                    this.leftMenu.forEach((MenuItem) => {
                      if (MenuItem.name == RoleItem.Name) {
                        MenuItem.visable = true;
                      }
                    });
                    this.rightMenu.forEach((MenuItem) => {
                      if (MenuItem.name == RoleItem.Name) {
                        MenuItem.visable = true;
                      }
                    });
                  });
                  this.allMenu = this.leftMenu.concat(this.rightMenu);
                  for (let index = 0; index < this.leftMenu.length; index++) {
                    var MenuItem = this.leftMenu[index];
                    if (MenuItem.visable) {
                      this.switchHeaderMenu(MenuItem.key, MenuItem.url, false);
                      break;
                    }
                  }
                });
            }
          }
        }
      });
    var _this = this;
    setInterval(function () {
      _this.getTime();
    }, 1000);
    window.showDpCommonPopup2 = this.showDpCommonPopup2;
    window.showDpCommonPopup3 = this.showDpCommonPopup3;
  },
  destroyed() {},
};
</script>
<style lang="less" scoped>
@import url("~resource/styles/map.less");
table td {
  border-color: red;
}
.mHome {
  background: url("~static/images/dsj/mainbg.jpg") no-repeat;
  background-size: cover;
  //font-size: 36px;
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 1.4rem;
  .bg {
    width: 100%;
    height: 100%;
  }
  iframe {
    display: block; /* iframes are inline by default */
    background: #000;
    border: none; /* Reset default border */
    height: 100%; /* Viewport-relative units */
    width: 100%;
  }
  .headerPanel {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100px;
    width: 100%;
    background: url("~static/images/dsj/headerbg.png") 0 0 no-repeat;
    display: flex;
    flex-direction: row;
    z-index: 4;
    background-size: 100% 100%;
  }
  .headerLogo {
    width: 48%;
    // height: 100px;
    // line-height: 114px;
    text-align: center;
    margin-top: 20px;
    box-sizing: border-box;
    // padding-left: 278px;
    .logoimg {
      width: 55px;
      height: 41px;
      display: inline-block;
      vertical-align: middle;
      // margin-top: -20px;
      //background: url("~static/images/dsj/logo.png") 0 0 no-repeat;
      // img{
      //   width: 100%;
      //   height: 100%;
      // }
    }

    .name {
      font-size: 2.8rem;
      font-weight: bold;
      letter-spacing: 1px;
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      // margin-top:-20px;
      /*       background-image: -webkit-linear-gradient(
        bottom,
        #0037ff,
        #03fdea,
        yellow
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; */
    }
  }
  .leftPanel,
  .rightPanel {
    display: flex;
    flex-direction: row;
    // margin-top: 5px;
    justify-content: flex-end;
    box-sizing: border-box;
    width: 24%;
  }
  .leftPanel {
    justify-content: flex-end;
    margin-left: 40px;
    margin-top: 26px;
  }
  .rightPanel {
    justify-content: flex-start;
    margin-right: 45px;
    margin-top: 26px;
  }

  .home-logoimg {
    min-width: 80px;
    min-height: 80px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 43px;
    position: absolute;
    left: 450px;
    line-height: 120px;
  }

  .menuItem {
    cursor: pointer;
    color: #4edeff;
    position: relative;
    z-index: 9999;
    padding: 0 10px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 1.8rem;
    letter-spacing: 2px;
    font-weight: 700;
    // margin-left: 6px;
    box-sizing: border-box;
    transition: all 0.5s;
    .itembg {
      /* position: absolute;
			  width: 100%;
			  height: 36px;
			  box-sizing: border-box;
			  transform: skew(30deg);
			  background: rgba(255, 255, 255, 0.07);
			  border: 1px solid rgba(63, 171, 237, 1);
			  box-shadow: 0px 0px 20px 10px inset rgba(63, 171, 237, 0.15);
			  z-index: -1;
			  transition: background 0.5s; */
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      bottom: -18px;
      width: 0;
      height: 47px;
      background: url("~static/images/dsj/menucurrent.png") center 0 no-repeat;
      opacity: 0;
      transition: all 0.5s;
    }

    &:hover:before {
      width: 100px;
      opacity: 1;
    }
  }
  .currentMenuItem {
    color: #fff;
    &:before {
      width: 100px;
      opacity: 1;
    }
  }
  .toplink {
    height: 110px;
    cursor: pointer;
    position: absolute;
    left: 10px;
    zoom: 0.8;
    line-height: 110px;
    li {
      display: inline-block;
      margin: 0 3px;
      vertical-align: middle;
      box-sizing: border-box;
      padding: 3px 0 0 6px;
      // background: rgba(10, 79, 132, 0.5);
      border-radius: 15px;
      font-size: 1.7rem;
      margin-right: 18px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .time {
    // display: none;
    font-size: 1rem;
    text-align: right;
    position: absolute;
    right: 2px;
    top: 25px;
    color: #fff;
    z-index: 4;
    font-family: "maetl";
  }
}
</style>
