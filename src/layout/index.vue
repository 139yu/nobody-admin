<template>
  <div class="common-layout">
    <layout-side-bar></layout-side-bar>
    <layout-left-wrapper></layout-left-wrapper>
  </div>
</template>
<script setup>
import LayoutSideBar from './LayoutSideBar/index.vue'
import LayoutLeftWrapper from './LayoutLeftWrapper/index.vue'



</script>
<style scope lang="scss">
  .common-layout{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
  }
</style>