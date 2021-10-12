<template>
  <div class="tab">
    <ul>
      <li
        v-for="(item,index) in data"
        :key="index"
        :class="index==changeTypeIndex?'current':''"
        @click="ChangeTab(item,index)"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
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
    this.changeTypeIndex = this.changeType;
    if (this.changeType > -1 && this.changeType < data.length) {
      this.ChangeTab(this.data[0], this.changeType);
    }
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
.tab {
  position: absolute;
  right: 40px;
  top: 18px;
}
.tab {
  ul {
    font-size: 0;
    border: 1px solid #1266a7;
    border-radius: 2px;
    display: inline-block;
  }
  li {
    display: inline-block;
    //background: rgba(21, 111, 187, 0.3);
    //border-radius: 2px;
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;
    position: relative;
    font-size: 2rem;
    border-right: 1px solid #1266a7;
    &:last-child {
      border: none;
    }
  }
  li.current {
    //background: rgba(21, 111, 187, 1);
    background: #0a4f84;
  }
}
</style>