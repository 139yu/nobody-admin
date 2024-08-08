<template>
  <div class="resource-container">
    <el-form class="search-form" :inline="true">
      <el-form-item label="分类名称">
        <el-input v-model="searchForm.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addDialog = true">添加分类</el-button>
    <el-table :data="list" style="width: 100%" :border="false" default-expand-all>

      <el-table-column type="expand">
        <template #default="resources">
          <el-table style="margin: 0 50px;width: calc(100% - 100px)" :border="false" :indent="120" >
            <el-table-column prop="name" label="资源名称"/>
            <el-table-column prop="url" label="资源路径"/>
            <el-table-column prop="description" label="资源描述"/>
            <el-table-column>
              <template #default="resources">
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="分类名称"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEditCategory(scope.row)">编辑分类</el-button>
          <el-button type="primary" @click="handleAddResource(scope.row)">添加资源</el-button>
          <el-button type="danger" @click="deleteCategory(scope.row)">删除分类</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="addDialog" title="添加分类" width="600" center>
      <el-form label-width="100px" v-model="addCategoryForm">
        <el-form-item label="分类名称：">
          <el-input v-model="addCategoryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="addCategoryForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCategory">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="updateDialog" title="修改分类" width="600" center>
      <el-form label-width="100px" v-model="updateCategoryForm">
        <el-form-item label="分类名称：">
          <el-input v-model="updateCategoryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="updateCategoryForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateCategory">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="addResourceDialog" title="添加资源" width="600" center>
      <el-form label-width="100px" v-model="addResourceForm">
        <el-form-item label="资源名称：">
          <el-input v-model="addResourceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径：">
          <el-input v-model="addResourceForm.url"></el-input>
        </el-form-item>
        <el-form-item label="资源描述：">
          <el-input v-model="addResourceForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addResource">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {reqAddCategory, reqDeleteCategory, reqListWithItem, reqUpdateCategory} from "@/api/resourceCategory.js";
import {ElMessage} from "element-plus";
const addDialog = ref(false)
const updateDialog = ref(false)
const searchForm = ref({})
const list = ref([])
const resources = ref([])
const addCategoryForm = ref({
  name: '',
  sort: ''
})
const updateCategoryForm = ref({})
const addResourceDialog = ref(false)
const addResourceForm = ref({
  name: '',
  url: '',
  description: '',
  categoryId: ''
})
const handleAddResource = (category) => {
  addResourceForm.value.categoryId = category.id
  addResourceDialog.value = true
}
const addResource = () => {
  reqAddResource(addResourceForm.value).then(result => {
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      addResourceDialog.value = false
    }
    fetchData()
  })
}
const handleEditCategory = (category) => {
  updateCategoryForm.value = category
  updateDialog.value = true
}
const updateCategory = () => {
  reqUpdateCategory(updateCategoryForm.value).then(result => {
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      updateDialog.value = false
    }
    fetchData()
  })
}
const addCategory = () => {
  reqAddCategory(addCategoryForm.value).then(result => {
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      addDialog.value = false
    }
    fetchData()
  })
}
const deleteCategory = (category) => {
  reqDeleteCategory(category.id).then(result => {
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
    }
    fetchData()
  })
}
const fetchData = () => {
  return reqListWithItem(searchForm.value).then(result => {
    if (result.code === 200) {
      list.value = result.data
      if (result.data){
        resources.value = result.data.resources
      }
    }
  })
}
onMounted(() => {
  fetchData().then(() => {
    ElMessage({
      type: 'success',
      message: '操作成功'
    })
  })
})
</script>
<style scope>

</style>