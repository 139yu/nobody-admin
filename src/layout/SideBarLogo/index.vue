<template>
  <div class="side-logo">
    <el-image class="logo-img" :src="settings.sideBarLogUrl"></el-image>
    <h1 class="logo-title">{{settings.sideBarLogTitle}}</h1>
  </div>
</template>
<script setup>
import settings from "../../../settings.js";
</script>
<style scope lang="scss">
.side-logo {
  width: $side-bar-width;
  height: 40px;
  display: flex;
  align-items: center;

  .logo-img{
    border-radius: 50%;
    width: 40px;
    margin-left: 10px;
  }
  .logo-title{
    color: #fff;
    margin-left: 10px;
  }
}
</style>