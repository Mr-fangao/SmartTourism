<template>
  <div
    class="layerControls"
    :style="`top:${position[0]}px;left:${position[1]}px`"
  >
    <div class="search-find">
      <div class="mquick-search-drop">
        <div class="mquick-search-drop-value">
          {{'社区监控' }}
        </div>
      </div>
      <div
        id="input"
        class="mquick-search-input"
        contenteditable="true"
        @input="onInput($event)"
      >
      </div>
      <div
        class="mquick-search-clear"
        @click="ClearInput"
      ></div>
      <div
        class="mquick-search-btn"
        @click.stop="handlerSearch()"
      >
        <div class="mquick-search-btnIco"></div>
      </div>
    </div>
    <ul class="dropDown-menu menu">
      <li
        :class="{ selected: item.select, expand: item.expand, hasChild: item.childBtn }"
        v-for="(item, key) in jsonData"
        :key="key"
      >
        <span @click="nodeClick(item, jsonData)">
          <input
            type="checkbox"
            v-model="item.select"
            v-if="!item.childBtn"
          />
          {{ item.name }}
        </span>
        <layer-controls-item
          v-if="item.childBtn"
          :data="item.childBtn"
          :itemClick="nodeClick"
        ></layer-controls-item>
      </li>
    </ul>
  </div>
</template>

<script>
import layerControlsItem from "./layerControlsItem";

import layerControlsDemo from "./demo.json";

export default {
  components: {
    layerControlsItem,
  },
  name: "layerControls",
  props: {
    keyName: {
      type: String,
      default: "",
    },
    appid: {
      type: String,
      default: "ZHXZ_FQ",
    },
    position: {
      type: Array,
      default: () => {
        return [230, 3402];
      },
    },
    type: {
      type: Number,
      default: 2,
      //1：仅单选  2：可多选
    },
  },
  data() {
    return {
      jsonData: [],
      SearchValue: "",
      // type : 2,   //1：仅单选  2：可多选
    };
  },
  methods: {
    onInput(e) {
      this.SearchValue = e.target.innerHTML; //去掉回车换行;
    },
    ClearInput() {
      document.getElementById("input").innerHTML = "";
    },
    handlerSearch() {},
    nodeClick(nodeData, allData) {
      console.log(nodeData);
      if (nodeData.childBtn) {
        nodeData.expand = !nodeData.expand;
      } else {
        //仅单选
        if (this.type == 1) {
          console.log(allData);
          // this.resetAllStatus(allData)
          this.resetAllStatus(this.jsonData);

          nodeData.select = true;
        }
        // 可多选
        if (this.type == 2) {
          nodeData.select = !nodeData.select;
        }
        this.getResult();
      }
    },
    getResult() {
      let Data = this.getIds(this.jsonData, null);
      console.log(Data, 123456);
      var postObj = {
        id: "5367bb91-e6d5-4134-8696-e2634e03cbb1",
        name: "社区监控",
        Label: "",
        Category: "dynamic",
        Url: "http://58.210.9.133/arcgis/rest/services/GXQ/FQDT/MapServer",
        Filter: "",
        LayerIds: "14",
        TokenName: "",
        Alpha: "1",
        ImgSrc: "",
        type: "点",
        Legend: "",
      };
      var filterStr = "";
      var key = "";
      Data.forEach((element) => {
        if (filterStr != "") {
          filterStr += " or ";
        }
        filterStr =
          filterStr +
          `(小区名称=N'${element.parentname}' and 设备名称 like N'%${element.name}%')`;
        key = key + element.ID + "|";
      });
      postObj.Filter = filterStr;
      postObj.key = key;
      console.log("调用参数0012", postObj);
      this.$emit("openLayerByFilter", postObj);
      // $(".map iframe")[0].contentWindow.GeoneMap.setFilterLayer(postObj);
    },
    getIds(data, parentname) {
      let data_copy = JSON.parse(JSON.stringify(data));
      let idsArr = [];
      for (let i = 0; i < data_copy.length; i++) {
        if (data_copy[i].select == 1 && !data_copy[i].childBtn) {
          data_copy[i].parentname = parentname;
          idsArr.push(data_copy[i]);
        } else {
          if (data_copy[i].childBtn) {
            var parentname = data_copy[i].name;
            let res = this.getIds(data_copy[i].childBtn, parentname);
            idsArr.push(...res);
          }
        }
      }
      return idsArr;
    },
    resetAllStatus(data) {
      data.forEach((i) => {
        i.select = false;
        if (i.childBtn) {
          this.resetAllStatus(i.childBtn);
        }
      });
    },
    loadDataByKey() {
      // 获取当前key
      let key = this.keyName;
      let appid = this.appid;
      // this.jsonData = layerControlsDemo.MapControlsLayers;
      // return;
      var url = this.GLOBAL.weburl_Onemap + "vue/FQ_SQJK.ashx";
      //"http://58.210.9.133/DataCenter/MapLayers.ashx?QueryType=dsj_menu&AppID=TC_ZHCX&mid=06C2A728-A675-4DEE-9E81-7F4878B5B771F";
      webAPI.server.get({ url: url }).then((res) => {
        this.jsonData = res.MapControlsLayers;
      });
    },
    loadLayer(layerid) {
      console.log("open layerid -->", layerid);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loadDataByKey();
    });
  },
};
</script>

<style lang="less">
.layerControls {
  user-select: none;
  position: absolute;
  top: 384px;
  right: 4479px;
  background: #03254185;
  border: 2px solid #165174;
  z-index: 10000;
  // height: 800px;
  width: 450px;
  overflow: auto;
  max-height: 1300px;
  // width: 207px;
  .mquick-search-drop {
    border: 1px solid #fff;
    flex-basis: 23%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .mquick-search-drop-value {
    letter-spacing: 2px;
    padding-left: 20px;
    max-width: 80%;
    flex-basis: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .mquick-search-dropIco {
    height: 60px;
    max-width: 90%;
    flex-basis: 20%;
    // background: url("~static/images/toolbar/下拉.png") 0 0 no-repeat;
    background-position: center;
    background-size: 40%, 40%;
    display: none;
  }

  .search-find {
    display: none;
    // display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 634px;
    line-height: 60px;
    font-size: 24px;
    background: rgba(12, 52, 94, 0.7);
  }
  .mquick-search-input {
    letter-spacing: 2px;
    padding-left: 20px;
    border: 1px solid #fff;
    flex-basis: 34%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-height: 60px;
  }
  .mquick-search-input:empty:before {
    content: "请输入关键字...";
    color: rgba(238, 238, 238, 0.74);
  }
  .mquick-search-content:hover .mquick-search-clear {
    display: block;
  }
  .mquick-search-clear {
    width: 60px;
    height: 60px;
    background: url("~static/images/toolbar/clear.png") 0 0 no-repeat;
    background-position: center;
    background-size: 40%, 40%;
    position: absolute;
    right: 60px;
    cursor: pointer;
    display: none;
  }
  // .mquick-search-input:focus:before {
  //   content: none;
  // }
  .mquick-search-btn {
    border: 1px solid #fff;
    flex-basis: 10%;
    min-width: 10%;
    background-color: #04c6fe;
    cursor: pointer;
    .mquick-search-btnIco {
      height: 60px;
      float: center;
      background: url("~static/images/toolbar/搜索.png") 0 0 no-repeat;
      // background-size: auto;
      background-position: center;
      background-size: 60%, 60%;
    }
  }
  .mquick-search-btn:hover {
    background-color: #06b2e7;
  }
  .dropDown-menu {
    // background:  rgba(10, 157, 255, 0.1);
    width: 100%;
    line-height: 70px;
    // text-align: center;
    span {
      // border-left:3px solid rgba(255, 255, 255, 0.28);
      width: 100%;
      // background: rgba(255, 255, 255, 0.05);
      display: block;
      padding-left: 25px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      line-height: 48px;
      // &::after{
      //   content: "";
      //   position: absolute;
      //   left: -100%;
      //   top: 0;
      //   width: 100%;
      //   height: 100%;
      //   transition: all 1.2s;
      // }
    }
    span:hover {
      // background: rgba(255, 255, 255, 0.15);
      &::after {
        // background: linear-gradient( 120deg, transparent, rgba(10, 157, 255, 0.5), transparent );
        // left: 100%;
      }
    }
    > li {
      // padding-left: 10px;
      text-align: left;
    }
    li {
      display: block;
      margin-top: 10px;
      margin-bottom: 10px;
      // width: 207px;
      // height: 70px;
      font-size: 24px;
      font-weight: 500;
      cursor: pointer;
      // background: url(./btn.png) center center no-repeat;
      // background: linear-gradient( 120deg, transparent, rgba(255, 8, 86, 0.8), transparent );
      position: relative;
      input[type="checkbox"] {
        cursor: pointer;
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-right: 10px;
        position: relative;
        top: 5px;
        -webkit-appearance: none;
        background: transparent;
        border: 1px solid #318ec7;
      }
      input[type="checkbox"]:checked {
        background: #0092ff;
        border: 1px solid #318ec7;
        top: 0;
        &:after {
          content: "✔";
          color: #fff;
          position: relative;
          top: 0px;
          left: 4px;
        }
      }
      input[type="checkbox"]:focus {
        outline: 0 solid transparent;
      }
      .menu {
        display: none;

        // position: absolute;
        // top: 0;
        // right: 100%;
        li {
          margin: 5px 10px 5px 10px;
          padding-left: 50px;
          // background:red;
          // background: linear-gradient( 120deg, transparent, rgba(10, 157, 255, 0.5), transparent );
          // background:  rgba(10, 157, 255, 0.5);
          // border-radius: 35px 0 35px 0;
        }
      }
    }
    li.expand {
      > span::before {
        content: "▼" !important;
      }
      > .menu {
        display: block;
        max-height: 900px;
        overflow-y: auto;
      }
    }
    li.selected {
      // background: url(./currentbtn.png) center center no-repeat;
      > span {
        // color: rgb(254, 231, 75);
        // background: rgba(255, 255, 255, 0.15);
        // border-left: 3px solid #3784ff;
        // &::before{
        //   content: "✔";
        //   margin: 0 5px;
        // }
      }
    }
    li.hasChild {
      // background: url(./currentbtn.png) center center no-repeat;
      > span::before {
        content: "►";
        margin: 0 5px;
        font-size: 12px;
        position: relative;
        top: -2px;
        color: #17b1f9;
      }
      > span {
        // color: #aeacac !important;
      }
    }
    li:hover {
      > .menu {
        // display: block;
      }
    }
  }
}
</style>
