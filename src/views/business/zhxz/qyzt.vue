<template>
  <div class="lg_main">
    <div class="panel pt1">
      <div class="panel_header">
        <div class="panel_headerTitle">企业安全普查</div>
      </div>
      <div class="flexRow">
        <div v-if="data.length>0">
          <div
            class="cardPanel"
            v-for="(item,key) in data[0].list"
            :key="key"
          >
            <div class="title">{{item.dataFirst}}</div>
            <div class="container">
              <countTo
                :startVal="0"
                :endVal="item.dataSec"
                :duration="2000"
              ></countTo>
              {{item.dataThird}}
            </div>
          </div>
        </div>
        <div
          id="chart1"
          style="width:800px;height:350px"
        ></div>
      </div>

      <!-- -->
    </div>
    <div class="panel pt2">
      <div class="panel_header">
        <div class="panel_headerTitle">村社区企业普查</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chart2"
            style="height:350px"
          ></div>
        </div>
      </div>
    </div>
    <div class="panel pt3">
      <div class="panel_header">
        <div class="panel_headerTitle">隐患整改部门</div>
      </div>
      <div
        class="flexRow"
        v-if="data.length>0"
      >
        <div
          class="pt3_img"
          v-for="(item,key) in data[2].list"
          :key="key"
        >
          <img :src="item.url">
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>

    <div class="panel pt4">
      <div class="panel_header">
        <div class="panel_headerTitle">主要经济指标</div>
      </div>
      <div
        class="flexRow"
        v-if="data.length>0"
      >
        <div
          class="cardPanel"
          v-for="(item,key) in data[3].list"
          :key="key"
        >
          <div class="title">{{item.dataFirst}}</div>
          <div class="container">
            <countTo
              :startVal="0"
              :endVal="item.dataSec"
              :duration="2000"
              :decimals="2"
            ></countTo>
            {{item.dataThird}}
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt5">
      <div class="panel_header">
        <div class="panel_headerTitle">行业类型分布</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chart3"
            style="height:350px"
          ></div>
        </div>
      </div>
    </div>
    <div class="panel pt6">
      <div class="panel_header">
        <div class="panel_headerTitle">安监重点监管企业</div>
      </div>
      <div
        class="flexRow"
        v-if="data.length>0"
      >
        <div class="cardPanel">
          <div class="title">{{data[5].dataFirst}}</div>
          <div class="container">
            <countTo
              :startVal="0"
              :endVal="data[5].dataSec"
              :duration="2000"
            ></countTo>
            {{data[5].dataThird}}
          </div>
        </div>
        <div
          class="cardPanel"
          v-for="(item,key) in data[5].list"
          :key="key"
        >
          <div class="title">{{item.title}}</div>
          <div
            class="container"
            v-for="(childItem,childKey) in item.list"
            :key="childKey"
          >
            <countTo
              :startVal="0"
              :endVal="childItem.dataFirst"
              :duration="2000"
              class="highLight"
            ></countTo>
            {{childItem.dataSec}}
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt8">
      <div class="panel_header">
        <div class="panel_headerTitle">亩均税收TOP5</div>
      </div>
      <div
        class="panel_table"
        v-if="data.length>0"
      >
        <div class="list_title">
          <span
            :class="'list_cell'+cellKey"
            v-for="(cell,cellKey) in data[6].cells"
            :key="cellKey"
          >{{cell}}</span>
        </div>
        <div class="list_content">
          <div class="list_contentInfo">
            <ul>
              <li
                v-for="(row,rowKey) in data[6].rows"
                :key="rowKey"
              >
                <span
                  :class="'list_cell'+row_cellKey"
                  v-for="(row_cell,row_cellKey) in row"
                  :key="row_cellKey"
                >{{row_cell}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt9">
      <div class="panel_header">
        <div class="panel_headerTitle">亩均税收红灯</div>
      </div>
      <div
        class="panel_table"
        v-if="data.length>0"
      >
        <div class="list_title">
          <span
            :class="'list_cell'+cellKey"
            v-for="(cell,cellKey) in data[7].cells"
            :key="cellKey"
          >{{cell}}</span>
        </div>
        <div class="list_content">
          <div class="list_contentInfo">
            <ul>
              <li
                v-for="(row,rowKey) in data[7].rows"
                :key="rowKey"
              >
                <span
                  :class="['list_cell'+row_cellKey,row_cellKey==0?'red':'']"
                  v-for="(row_cell,row_cellKey) in row"
                  :key="row_cellKey"
                >{{row_cell}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="panel pt10">
      <div class="panel_header">
        <div class="panel_headerTitle">企业规模分布</div>
      </div>
      <div class="panelDataChart">
        <div class="panelDataChart_part">
          <div
            id="chart4"
            style="height:350px"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echartsUtils from "js/echartsUtils.js";
import countTo from "vue-count-to";
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    openModalWin(url) {
      window.layerAPI.openResultWin("", url, ["1500px", "1024px"]);
    }
  },
  components: { countTo },
  mounted() {
    webAPI.server
      .get({
        url: "static/json/qyzt.json"
      })
      .then(res => {
        if (res.data.length == 0) return;
        this.data = res.data;
        var chart1_Option = echartsUtils.getEchartsConfig(
          this.data[0].chartType.toLowerCase(),
          this.data[0].xAxis,
          this.data[0].data,
          this.data[0].title,
          this.data[0].xUnit
        );
        var chart2_Option = echartsUtils.getEchartsConfig(
          this.data[1].chartType.toLowerCase(),
          this.data[1].xAxis,
          this.data[1].data,
          this.data[1].title,
          this.data[1].xUnit
        );
        var chart3_Option = echartsUtils.getEchartsConfig(
          this.data[4].chartType.toLowerCase(),
          this.data[4].xAxis,
          this.data[4].data,
          this.data[4].title,
          this.data[4].xUnit
        );
        var chart4_Option = echartsUtils.getEchartsConfig(
          this.data[8].chartType.toLowerCase(),
          this.data[8].xAxis,
          this.data[8].data,
          this.data[8].title,
          this.data[8].xUnit
        );

        // this.timer1 = echartsUtils.chartInit("chart1", chart5_Option);
        this.timer1 = echartsUtils.chartInit("chart1", chart1_Option);
        this.timer2 = echartsUtils.chartInit("chart2", chart2_Option);
        this.timer3 = echartsUtils.chartInit("chart3", chart3_Option);
        this.timer4 = echartsUtils.chartInit("chart4", chart4_Option);
        // this.timer3 = echartsUtils.chartInit("chart2", chart2_Option);
      });
  }
};
</script>
<style lang="less" scoped>
.lg_main {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  .pt1 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt2 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt3 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .pt4 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt5 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt6 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .pt8 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    grid-column-end: 4;
  }
  .pt9 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
  }
  .pt10 {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 4;
  }
}

.lg_main {
  .pt3 {
    .pt3_img {
      font-size: 28px;
      width: 280px;
      text-align: center;
      img {
        border: 2px solid rgb(132, 221, 254);
        margin: 50px 0px 30px 0px;
        width: 220px;
        height: 200px;
      }
    }
  }
  .pt4 {
    .cardPanel {
      margin: 60px 30px 0 30px;
    }
  }
  .pt6 {
    .cardPanel {
      margin: 50px 20px 0 20px;
    }
  }
  .pt8 {
    .panel_table {
      .list_content {
        height: 220px;
      }
    }
    .list_cell0 {
      width: 40%;
    }
    .list_cell1 {
      width: 10%;
    }
    .list_cell2 {
      width: 30%;
    }
    .list_cell3 {
      width: 20%;
    }
  }
  .pt9 {
    .list_content {
      height: 220px;
    }
    .red {
      margin-bottom: 20px;
      width: 30px;
      height: 30px;
      background: red;
      border-radius: 50%;
    }
  }
  .list_cell0 {
    width: 10%;
  }
  .list_cell1 {
    width: 40%;
  }
  .list_cell2 {
    width: 30%;
  }
  .list_cell3 {
    width: 20%;
  }
}
</style>
