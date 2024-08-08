<template>
  <div class="menu-container">
    <el-button type="primary" @click="handleAdd">添加菜单</el-button>
    <el-table
        class="data-table"
        :data="listTree"
        row-key="id"
        default-expand-all
        style="width: 100%"
    >
      <el-table-column prop="title" label="菜单名称"/>
      <el-table-column prop="name" label="路由名称"/>
      <el-table-column prop="path" label="路径"/>
      <el-table-column prop="icon" label="图标">
        <template #default="scope">
          <el-icon>
            <component :is="scope.row.icon"></component>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column prop="hidden" label="是否隐藏">
        <template #default="scope">
          <el-switch name="hidden" v-model="scope.row.hidden" @click="changeHidden(scope.row)" :active-value="0" :inactive-value="1"></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100px">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="editDialog" title="修改菜单" width="600" center>

      <el-form v-model="editFormData" style="max-width: 600px" label-width="100">
        <el-form-item label="父菜单">
          <menu-tree-select v-model="editFormData.parentId"></menu-tree-select>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="editFormData.title"></el-input>
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="editFormData.path"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="editFormData.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editFormData.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateMenu">修改</el-button>
          <el-button @click="editDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="addDialog" title="添加菜单" width="600" center>
      <el-form v-model="addFormData" style="max-width: 600px" label-width="100">
        <el-form-item label="父菜单">
          <menu-tree-select v-model="addFormData.parentId"></menu-tree-select>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="addFormData.title"></el-input>
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input v-model="addFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="addFormData.path"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="addFormData.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addFormData.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addMenu">添加</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import {reqListTree,reqUpdateMenu,reqAddMenu,reqDeleteMenu,reqChangeHidden} from "@/api/menu.js";
import {ElMessage} from "element-plus";
import {onMounted, ref} from "vue";

const listTree = ref([])
const editDialog = ref(false)
const editFormData = ref({})
const addFormData = ref({
  parentId: 0,
  title: '',
  name: '',
  path: '',
  icon: '',
  sort: 0
})
const addDialog = ref(false)

const handleAdd = () => {
  addDialog.value = true
}
const addMenu = () => {
  reqAddMenu(addFormData.value).then(result => {
    if (result.code === 200){
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      addDialog.value = false
      fetchData()
    }
  })
}
const fetchData = async () => {
  return reqListTree().then(result => {
    listTree.value = result.data
    return result.code
  })
}
const handleDelete = async (row) => {
  const result = await reqDeleteMenu(row.id)
  if (result.code === 200){
    ElMessage({
      type: 'success',
      message: '操作成功'
    })
    await fetchData()
  }
}
const handleEdit = async (row) => {
  editDialog.value = true
  editFormData.value = row
}
const changeHidden = async (row) => {
  let hidden = row.hidden
  let id = row.id
  let result = await reqChangeHidden(id,hidden)
  if (result.code == 200){
    ElMessage({
      type: 'success',
      message: '操作成功'
    })
    await fetchData()
  }
}
const updateMenu = () => {
  reqUpdateMenu(editFormData.value).then(result => {
    if (result.code === 200){
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      editDialog.value = false
      fetchData()
    }
  })
}
onMounted(() => {
  fetchData().then(code => {
    if (code == 200){
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
    }
  })
})
</script>
<style scope>
.menu-container {

}
</style>