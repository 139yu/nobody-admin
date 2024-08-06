<template>

  <div class="route-history">
    <template v-for="(item,index) in layoutSettingsStore.historyRouters">
      <div class="route-item" v-if="index !== (layoutSettingsStore.historyRouters.length - 1)" @click="goRouter(item.path)">
        <span>{{ item.meta.title }}</span>
        <el-icon v-if="index === (layoutSettingsStore.historyRouters.length - 1) && index !== 0" @click="popRoute()">
          <component :is="CircleCloseFilled"></component>
        </el-icon>
        <span v-if="index === (layoutSettingsStore.historyRouters.length - 1) && index !== 0"></span>
      </div>
      <div class="route-item active" v-if="index === (layoutSettingsStore.historyRouters.length - 1)">
        <span>{{ item.meta.title }}</span>
        <el-icon v-if="index === (layoutSettingsStore.historyRouters.length - 1) && index !== 0" @click="popRoute()">
          <component :is="CircleCloseFilled"></component>
        </el-icon>
        <span v-if="index === (layoutSettingsStore.historyRouters.length - 1) && index !== 0"></span>
      </div>
    </template>

  </div>
</template>
<script setup>
import {useRoute,useRouter} from "vue-router";
import {watch} from "vue";
import useLayoutSettingsStore from "@/store/modules/settings.js";
import {CircleCloseFilled} from "@element-plus/icons-vue";

let layoutSettingsStore = useLayoutSettingsStore()
let $route = useRoute()
let currentRouter = $route.matched[$route.matched.length - 1]
layoutSettingsStore.addHistoryRouter(currentRouter)
watch($route, () => {
  layoutSettingsStore.addHistoryRouter($route.matched[$route.matched.length - 1])
})
let $router = useRouter()
const goRouter = (path) => {
  $router.push({path})
}
const popRoute = () => {
  layoutSettingsStore.popHistoryRouter()
  let destRoute = layoutSettingsStore.historyRouters[layoutSettingsStore.historyRouters.length  - 1]
  goRouter(destRoute.path)
}
</script>
<style scope lang="scss">
.route-history {
  height: $route-history-height;
  width: 100%;
  background-color: #eee;
  display: flex;
  color: #fff;
  align-items: center;
  padding: 0 10px;

  &.collapse {
    width: calc(100% - $side-bar-collapse-width);
    left: $side-bar-collapse-width
  }

  .route-item {
    height: 22px;
    background-color: #0f375d;
    padding: 5px 14px;
    margin-right: 10px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    &.active {
      background-color: #fff;
      color: #001529;
      border: 1px solid #d5caca;
      font-size: 14px;
      span {
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
  .route-item.active:hover{
    color: #001529;
    border: 1px solid #001529;
  }
}
</style>