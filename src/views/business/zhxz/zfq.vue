<template>
  <div class="lg_main">
      <div class="pt4">
         <!-- <iframe id="iframe"
        src="https://idata.zhufengqiao.icommunity.mobi/#/"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height:100%;width:100%;"
        ></iframe> -->
        <iframe id="iframe"
        src="https://idata.fqhome.szicyun.com/#/fengqiao-bi"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        style="height:100%;width:100%;"
        ></iframe>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
	},
	mounted () {
		let _iframe = document.getElementById('iframe').contentWindow.document.getElementsByClassName('page-top')
		_iframe.style.display = 'none'
	}
}
</script>
<style lang="less" scoped>
.lg_main {
  width: 100%;
  height: 100%;
}
.pt4 {
  // grid-row-start: 1;
  // grid-row-end: 4;
  // grid-column-start: 1;
  // grid-column-end: 4;
  width: 100%;
	height: 100%;
}
</style>
