<template>
  <div class="top-bar" :class="{collapse: layoutSettingsStore.menuCollapse}">
    <div class="top-bar-left">
     <el-icon class="collapse" size="20" @click="changeCollapse">
       <component :is="layoutSettingsStore.menuCollapse ? Fold : Expand"></component>
     </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight" class="bread-crumb">
        <template v-for="(item,index) in currentRoutes">
          <el-breadcrumb-item v-if="item.meta">{{item.meta.title}}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="top-bar-right">
      <div class="bar-tools">
        <el-button circle :icon="Refresh" @click="refreshPage" size="small"></el-button>
      </div>
      <div class="user-tools">
        <el-image class="user-avatar" src="/src/assets/images/tom.jpg"></el-image>
        <el-dropdown class="dropdown-tools">
          <span>
            Nobody
          <el-icon>
            <arrow-down/>
          </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
import {watch,ref} from "vue";
import useLayoutSettingsStore from '@/store/modules/settings.js'
import {useRoute,useRouter} from "vue-router";
import {ArrowDown, ArrowRight, Expand, Fold, FullScreen, Refresh} from "@element-plus/icons-vue";

let $route = useRoute()
let $router = useRouter()
let currentRoutes = ref($route.matched)
let layoutSettingsStore = useLayoutSettingsStore()

const changeCollapse = () => {
  layoutSettingsStore.menuCollapse = !layoutSettingsStore.menuCollapse
}
const refreshPage = () => {
  $router.replace({path: $route.path})
}
watch($route,async (newRoute,OldRoute) => {
  currentRoutes.value = newRoute.matched
})
</script>
<style scope lang="scss">
.top-bar {
  /*position: fixed;
  top: 0;
  left: $side-bar-width;*/
/*  width: calc(100% - $side-bar-width);*/
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  height: $top-bar-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all .3s;
  /*&.collapse{
    width: calc(100% - $side-bar-collapse-width);
    left: $side-bar-collapse-width
  }*/
  .top-bar-left{
    display: flex;
    align-items: center;
    .collapse{
      cursor: pointer;
    }
    .bread-crumb{
      margin-left: 5px;
    }
  }
  .top-bar-right{
    display: flex;
    align-items: center;
    .bar-tools{
      margin-right: 30px;
    }
    .user-tools{
      display: flex;
      align-items: center;
      .user-avatar{
        border-radius: 50%;
        width: 30px;
        margin-right: 10px;
      }
      .dropdown-tools{
        cursor: pointer;
        span{
          display: flex;
          align-items: center;
        }
      }

    }
  }
}
</style>