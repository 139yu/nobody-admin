<template>
  <template v-for="(item,index) in menuList">
<!--    没有子路由-->
      <el-menu-item
          :index="item.path"
          @click="goRoute"
          :data-title="item.meta ? item.meta.title : ''"
          v-if="!item.hidden && (!item.children || item.children.length < 1)">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
<!--    首页-->
    <el-menu-item
        @click="goRoute"
        :data-title="item.meta ? item.meta.title : ''"
        :index="item.path"
        v-if="!item.meta && item.children && item.children.length === 1">
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <span>{{ item.children[0].meta.title }}</span>
    </el-menu-item>
    <el-sub-menu :index="item.path" v-if="item.meta && item.children && item.children.length > 0">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <side-bar-menu :menuList="item.children"></side-bar-menu>
    </el-sub-menu>
  </template>
</template>
<script setup>
import {useRouter} from "vue-router";

defineProps(['menuList'])

let $router = useRouter()
const goRoute = (vc) => {
  $router.push(vc.index)
}

</script>
<script>
export default {
  name:'SideBarMenu'
}
</script>
<style scope lang="scss">

</style>