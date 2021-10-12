<template>
  <div class="lg_main">
    <div class="child-menu">
      <div
        id="titleZFPT"
        @click="ssjPage(0)"
      >
        <span v-if="false">执法平台</span>
      </div>
      <!-- <div
        id="titleSSJ"
        :class="childid==1?'menuItem1 current':'menuItem1'"
        @click="ssjPage(1)"
      >
        <span>双随机</span>
      </div> -->
    </div>
    <zfpt v-if="childid==0"></zfpt>
    <ssj v-if="childid==1"></ssj>
  </div>
</template>
<script>
import zfpt from "views/business/zhxz/zfptnew";
import ssj from "views/business/zhxz/ssj";
export default {
  data() {
    return {
      classType: "0",
      classType2: "1",
      data: [],
      childid: 0
    };
  },
  components: {
    zfpt,
    ssj
  },
  methods: {
    ssjPage(id) {
      this.childid = id;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.lg_main {
  iframe {
    width: 100%;
    height: 100%;
  }
}
.child-menu {
  position: absolute;
  right: 795px;
  top: 95px;
  width: 260px;
}
.menuItem0 {
  color: white;
  background: rgba(0, 127, 174, 0.9);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 9999;
  width: 100px;
  height: 30px;
  right: 10px;
  text-align: center;
  line-height: 30px;
  box-sizing: border-box;
}

.menuItem1 {
  display: inline-block;
  cursor: pointer;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 9999;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 28px;
  font-weight: bold;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1489e2;
  border: 1px solid #1f6aa5;
  box-shadow: 0 0 7px inset rgba(28, 51, 188, 0.3);
  //background: rgba(0,0,0,0.1);
  border-radius: 15px;
  margin-right: 8px;
}
.menuItem1:hover {
  border: 1px solid #12a5f3;
  background: rgba(0, 0, 0, 0.05);
  color: #68cafd;
  box-shadow: 0 0 7px inset rgba(57, 187, 255, 0.7);
}
.current {
  border: 1px solid #12a5f3;
  //background: rgba(0,0,0,0.05);
  color: #fff;
  box-shadow: 0 0 7px inset rgba(57, 187, 255, 0.5);
  background: #003d81;
}
</style>
