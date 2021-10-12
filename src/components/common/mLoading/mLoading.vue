<template>
    <div class="zhezhao">
        <div class="mLoader">          
            <div class="face">
                <div class="circle"></div>
            </div>
            <div class="face">
                <div class="circle"></div>
            </div>
            <span>加载中...</span>
        </div>
    </div>
    
</template>

<script>
export default {
  name: "mLoader",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.zhezhao {
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mLoader {
  color: white;
  font-size: 14px;
  width: 20em;
  height: 20em;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 18px;
  }
  .face {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    animation: animate 3s linear infinite;
    &:nth-child(1) {
      width: 100%;
      height: 100%;
      color: gold;
      border-color: currentColor transparent transparent currentColor;
      border-width: 0.2em 0.2em 0em 0em;
      --deg: -45deg;
      animation-direction: normal;
    }
    &:nth-child(2) {
      width: 70%;
      height: 70%;
      color: lime;
      border-color: currentColor currentColor transparent transparent;
      border-width: 0.2em 0em 0em 0.2em;
      --deg: -135deg;
      animation-direction: reverse;
    }
    .circle {
      position: absolute;
      width: 50%;
      height: 0.1em;
      top: 50%;
      left: 50%;
      background-color: transparent;
      transform: rotate(var(--deg));
      transform-origin: left;
      &:before {
        position: absolute;
        top: -0.5em;
        right: -0.5em;
        content: "";
        width: 1em;
        height: 1em;
        background-color: currentColor;
        border-radius: 50%;
        box-shadow: 0 0 2em, 0 0 4em, 0 0 6em, 0 0 8em, 0 0 10em,
          0 0 0 0.5em rgba(255, 255, 0, 0.1);
      }
    }
  }
}
@keyframes animate {
  to {
    transform: rotate(1turn);
  }
}
</style>
