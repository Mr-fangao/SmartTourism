<template>
  <div :id="id"></div>
</template>
<script>
import echartsUtils from "js/echartsUtils.js";
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    legend: {
      type: String,
      default: ""
    }
  },
  mounted() {
    if (this.data === null && this.id === "") {
      return;
    }
    this.initCharts();
    console.log(this.data);
  },
  methods: {
    initCharts() {
      var option = echartsUtils.getEchartsConfig(
        this.data.chartType.toLowerCase(),
        this.data.xAxis,
        this.data.data,
        this.data.title
      );
      option.series[0].center = ["35%", "45%"];
      option.series[0].radius = ["40%", "50%"];
      option.legend.textStyle.fontSize = 10;
      // option.grid.left
      option.legend.x = "65%";
      option.legend.y = "45%";
      option.legend.itemWidth = 10;
      option.legend.itemHeight = 10;
      
      option.color = [
        "#F5BE20",
        "#4690CE",
        "#5456A3",
        "#79C286",
        "#0C5B86",
        "#58C2DD",
        "#514D9E",
        "#E7762C",
        "#CB4B92",
        "#6EBE7E"
      ];

      if (this.autoplay) {
        this.timer = echartsUtils.chartInit(this.id, option);
      } else {
        this.timer = echartsUtils.chartInit(this.id, option, "1");
      }
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style>
</style>
