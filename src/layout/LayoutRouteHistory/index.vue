<template>
  <div class="route-history" >
    <h1>route history</h1>
  </div>
</template>
<script setup>
import {useRoute} from "vue-router";
let $route = useRoute()
let matched = $route.matched
const historyRoutes = []

</script>
<style scope lang="scss">
.route-history{
  /*position: fixed;
  left: $side-bar-width;
  top: $top-bar-height;*/
  height: $route-history-height;
/*  width: calc(100% - $side-bar-width);*/
  width: 100%;
  background-color: #eee;
  &.collapse{
    width: calc(100% - $side-bar-collapse-width);
    left: $side-bar-collapse-width
  }
}
</style>