<template>
  <div class="left-wrapper" :class="{collapse: layoutSettingsStore.menuCollapse}">
    <layout-top-bar></layout-top-bar>
    <layout-route-history></layout-route-history>
    <layout-main></layout-main>
  </div>
</template>
<script setup>
import LayoutTopBar from '../LayoutTopBar/index.vue'
import LayoutRouteHistory from '../LayoutRouteHistory/index.vue'
import LayoutMain from '../LayoutMain/index.vue'
import useLayoutSettingsStore from '@/store/modules/settings.js'

let layoutSettingsStore = useLayoutSettingsStore()
</script>
<style scope lang="scss">
.left-wrapper{
  width: calc(100% - $side-bar-width);
  height: 100vh;
  background-color: yellowgreen;
  overflow: hidden;
  transition: all .3s;
  &.collapse{
    width: calc(100% - $side-bar-collapse-width);
  }
}
</style>