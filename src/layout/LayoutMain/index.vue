<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup>

</script>
<style scope lang="scss">
.main{
  /*position: fixed;
  top: $top-bar-height + $route-history-height;
  left: $side-bar-width;*/
 /* width: calc(100% - $side-bar-width);*/
  width: 100%;
  height: calc(100vh - $top-bar-height - $route-history-height);
  padding: 10px;
  overflow-y: scroll;
  .fade-enter-from{
    opacity: 0;
  }
  .fade-enter-active{
    transition: all .2s;
  }
  .fade-enter-to{
    opacity: 1;
  }
}

</style>