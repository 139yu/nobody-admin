<template>
  <el-tree-select
      v-model="selectValue"
      :data="listTree"
      check-strictly
      filterable
  >

  </el-tree-select>
</template>
<script setup>
import {reqListTree} from "@/api/menu.js";
import {onMounted, ref} from "vue";
const selectValue = ref()
const listTree = ref([{value: 0,label: '主菜单',children:[]}])
onMounted(()=>{
  reqListTree().then(res=>{
    let menuTree = res.data
    menuTree.forEach(item => {
      listTree.value[0].children.push(parseToTreeNode(item))
    })
  })
})

const parseToTreeNode = (data) => {
  let node = {
    value: data.id,
    label: data.title
  }
  if (data.children && data.children.length > 0) {
    node.children = data.children.map(item => parseToTreeNode(item))
  }
  return node
}
</script>
<style scope lang="scss">

</style>