<template>
  <div class="lg_main">
    <div class="panel pt1">
      <div class="panel_content">
        <iframe
          :src="this.GLOBAL.weburl_zhdd_kda"
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          class="iframeContainer"
          allow="microphone;camera;midi;encrypted-media;"
          allowfullscreen="allowfullscreen"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          oallowfullscreen="true"
          msallowfullscreen="true"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.lg_main {
  grid-template-columns: 19.9% auto 21.73%;
  grid-template-rows: 34% 34% 32%;
  .pt1 {
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 4;
  }
  .iframeContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>