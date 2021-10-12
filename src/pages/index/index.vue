<template>
  <div id="app">
    <router-view class="Router"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enterActive: "",
      leaveActive: "",
    };
  },
  mounted() {},
  components: {},
  watch: {
    $route(to, from) {
      if (to.meta.index < from.meta.index) {
        this.enterActive = "slideInLeft";
        this.leaveActive = "slideOutRight";
      } else if (to.meta.index > from.meta.index) {
        this.enterActive = "slideInRight";
        this.leaveActive = "slideOutLeft";
      }
    },
  },
};
</script>

<style scoped lang="less">
// .animated {
//   -webkit-animation-duration: 0.5s;
//   animation-duration: 0.5s;
// }
.Router {
  position: absolute;
  height: 100%;
  width: 100%;
}
// .total-count .el-date-editor.el-input.el-input--prefix {
//   display: flex;
//   .el-input__inner {
//     border: none;
//     background: rgba(0, 0, 0, 0);
//     align-self: center;
//   }
//   .el-input__prefix {
//     display: none;
//   }
// }
</style>
