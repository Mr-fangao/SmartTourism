<template>
    <div class="lg_main">
        <iframe src="http://toursim.v-data.com.cn:8088/iBigScreen/#/shaxi" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
    </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.lg_main {
  padding-bottom: 50px;
  iframe {
    width: 100%;
    height: 100%;
    margin-bottom: 50px;
  }
}
</style>
