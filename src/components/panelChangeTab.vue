<template>
  <div class="panel-tabchange">
    <div
      v-for="(item,index) in data"
      :key="index"
      :class="index==changeTypeIndex?'current':''"
      @click="ChangeTab(item,index)"
      :style="'width:'+width+'px !important;'"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    changeType: {
      type: Number,
      default: 0
    },
    changekey: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 150
    }
  },
  mounted() {
    this.ChangeTab(this.data[0], this.changeType);
  },
  methods: {
    ChangeTab(item, index) {
      this.changeTypeIndex = index;
      this.$emit("ChangeTab", this.changekey, item, index);
    }
  },
  data() {
    return {
      changeTypeIndex: 0
    };
  }
};
</script>

<style  lang="less" scoped>
.panel-tabchange {
  display: flex;
  position: absolute;
  right: 15px;
  top: 31px;
  font-size: 2.4rem;
  height: 55px;
  line-height: 55px;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  background: #0a5d92;
  // background: url("~static/images/dsj/wggl/border2.png") center 0 no-repeat;
  // background-size: 100% 100%;
  // border: 2px solid #005190;
  // border-radius: 4px !important;
  // border: 0.5px solid #0a5d92;
  cursor: pointer;
  z-index: 999;
  .current {
    background: #005190;
    border: 1px solid #04dfff !important;
    border-radius: 1px;
    height: 53px !important;
    line-height: 53px !important;
    //   background: url("~static/images/dsj/wggl/current.png") center 0
    //     no-repeat;
    //     background-size: 100% 100%;
    //     border: 0px solid #00a2ff !important;
  }
  div {
    width: 100px;
    border: 2px solid #005190;
    // border-right: 1px solid #0a5d92;
  }
}
</style>