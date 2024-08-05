<template>
  <el-scrollbar class="side-bar" :class="{collapse: layoutSettingsStore.menuCollapse}">
    <side-bar-logo v-if="settings.sideLogShow"></side-bar-logo>
    <el-menu
        background-color="#001529"
        :collapse="layoutSettingsStore.menuCollapse"
        :default-active="currentRoute"
        text-color="#fff"
        class="side-menu">
        <side-bar-menu :menuList="userStore.getRoutes()"></side-bar-menu>
    </el-menu>
  </el-scrollbar>
</template>
<script setup>
import SideBarLogo from '@/layout/SideBarLogo/index.vue'
import settings from "../../../settings.js";
import SideBarMenu from './SideBarMenu/index.vue'
import useLayoutSettingsStore from '@/store/modules/settings.js'
import useUserStore from "@/store/modules/user.js";
import {useRoute} from "vue-router";

let layoutSettingsStore = useLayoutSettingsStore()
let userStore = useUserStore()
let $route = useRoute()
let currentRoute = $route.path == '/home' ? '/' : $route.path

</script>
<style scope lang="scss">
.side-bar{
  width: $side-bar-width;
  height: 100vh;
  background-color: $side-bar-color;
  padding: $side-bar-padding;
  box-sizing: border-box;
  transition: all .3s;
  &.collapse{
    width: $side-bar-collapse-width;
  }
  .side-menu{
    border-right: none;
  }
}
</style>