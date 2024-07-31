<template>
  <svg :style="{width,height}">
    <use :xlink:href="prefix+name" :fill="fillColor"></use>
  </svg>
</template>
<script setup>
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: String,
  fillColor: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<style scoped>

</style>
