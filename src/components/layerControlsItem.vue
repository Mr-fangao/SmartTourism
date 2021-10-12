<template>
  <ul class="menu">
    <li :class="{selected:item.select,expand:item.expand,hasChild:item.children}" v-for="(item,key) in data" :key="key" >
      <span @click="itemClick(item,data)"><input type="checkbox" v-model="item.select" v-if="!item.children">{{item.name}}</span>
        <layer-controls-item v-if="item.children" :data="item.children" :itemClick="itemClick"></layer-controls-item>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'layerControlsItem',
  props: {
    data: {
      type: Array,
      default: function(){
        return []
      }
    },
    itemClick: {
      type: Function,
      default: function(...e){
        console.log(e)
      }
    },

  },
  data() {
    return {
    };
  },
};
</script>
