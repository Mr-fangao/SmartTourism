<template>
<div class="panel-container">
    <div class="close" @click="closePanel"></div>
    <template v-if="type == 'label'">
        <div class="details-content">
            <div class="label-item" v-for="(item,index) in data" :key="'details'+index">
                <div class="title">{{item.title}}</div>
                <div class="count">{{item.count}}</div>
            </div>
        </div>
    </template>
    <template v-if="type == 'grid'">
        <div class="grid-content" v-if="gridData.column" :style="{width:gridData.width}">
            <div class="row-line grid-header">
                <span v-for="(item,index) in gridData.column" :key="'header'+index">{{item.title}}</span>
            </div>
            <div class="grid-body">
                <div class="row-line" v-for="(row,rowIndex) in gridData.data" :key="'row'+rowIndex">
                    <template v-for="(property,propertyIndex) in gridData.column">
                        <span :key="rowIndex+'-'+propertyIndex" v-if="row[property.property]">
                          {{row[property.property]}}
                          <template v-if="property.unit">{{property.unit}}</template>
                        </span>
                    </template>
                </div>
            </div>
        </div>
    </template>
</div>
</template>

<script>
export default {
  name: 'panel',
  props: {
    type: {
      type: String,
      default: 'label'
    },
    data: {
      type: Array,
      default: null
    },
    gridData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    closePanel () {
      this.$emit('closepanel')
    }
  }
}
</script>

<style lang="less" scoped>
  .panel-container{
      width: 100%;
      height: 100%;
      position: relative;
    .details-content{
      width: 100%;
      padding-top: 30px;
      height: calc(100% - 30px);
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    .close{
      position: absolute;
      top: 0;
      right: 0;
      width: 26px;
      height: 27px;
      background: url("~static/images/common/close.png") center center no-repeat;
      background-size: 100% 100%;
      text-align: right;
      cursor: pointer;
      z-index: 9999;
    }
    .label-item{
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: calc((100% - 96px) / 3);
      height: 130px;
      margin-right: 48px;
      background: url("~static/images/common/label.png") center center no-repeat;
      background-size: 100% 100%;
      font-size: 16px;
      .count{
        font-size: 40px;
        color: #fee74b;
        font-weight: bold;
      }
      &:nth-child(3n){
        margin-right: 0;
      }
    }
  }
  .grid-content{
      padding-top: 20px;
      height: calc(100% - 20px);
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      .grid-body{
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
      }
      .row-line{
          position: relative;
          display: flex;
          align-items: center;
          height: 50px;
          span{
              flex: 1;
              padding: 0 10px;
              font-size: 22px;
              text-align: center;
              color: #02f3f0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:first-child{
                  text-align: left;
                  position: relative;
                  padding-left: 30px;
                  color: #ffffff;
              }
              &:first-child::before{
                  content: "";
                  top: 9px;
                  left: 7px;
                  position: absolute;
                  width: 10px;
                  height: 10px;
                  background: #04C7FF;
                  border-radius: 50%;
              }
              &:last-child{
                  color: #f74674;
              }
          }
          &.grid-header span:first-child::before{display: none!important;}
      }
      .row-line:after{
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(to right,rgba(13,91,176,0.3),rgba(13,91,176,1),rgba(13,91,176,0.3));
      }
  }
    /*滚动条样式*/
  ::-webkit-scrollbar {
    width: 5px!important;
    /*height: 4px;*/
    border-radius: 5px;
    background: #163e68;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #03C8FF;
  }
  ::-webkit-scrollbar-track {
    border-radius: 5px;
    background: #163e68;

  }
</style>
