<template>
  <div>
      <!-- 没有子级 -->
      <el-menu-item :index="path" v-if="!item.children">
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
      <!-- 有子级 -->
      <el-submenu :index="path" v-else>
        <template slot="title">{{item.meta.title}}</template>
        <SideItem v-for="child in item.children" :key="child.path" :item="child" :path="getPath(child.path)"/>
      </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  name:'SideItem',
  data(){
    return {

    }
  },
  props:["item","path"],
  methods:{
    getPath(url){
      return path.resolve(this.path,url);
    }
  }
}
</script>



