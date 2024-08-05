<template>
  <div class="login-container">
    <el-row>
      <el-col :span="24" :xs="24">
        <el-form
            ref="ruleFormRef"
            :model="loginForm"
            :rules="rules"
            class="login-form">
          <h1 class="welcome">欢迎您</h1>
          <el-form-item prop="username">
            <el-input
                :prefix-icon="User"
                maxlength="20"
                v-model="loginForm.username"
                type="text"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                :prefix-icon="Lock"
                maxlength="20"
                v-model="loginForm.password"
                show-password="show-password"
                type="password"></el-input>
          </el-form-item>
          <el-form-item class="login-btn-wrap">
            <el-button
                :loading="loading"
                @click="login()"
                class="login-btn"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {reactive,ref} from 'vue'
import {ElNotification} from "element-plus";
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user.js";

let $router = useRouter()
//按钮loading状态
let loading = ref(false)

let userStore = useUserStore()
//收集账号密码
let loginForm = reactive({username: 'nobody', password: 'nobody'})


const ruleFormRef = ref()
const rules = reactive({
  username: [
    {required: true,message: '请输入用户名',trigger: 'blur'},
  ],
  password: [
    {required: true,message: '请输入密码',trigger: 'blur'}
  ]
})

const login = async () => {
  await ruleFormRef.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    //登录成功跳转到首页
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功'
    })
    loading.value = false
  }
  catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: error.message
    })
  }

}
</script>
<style scoped lang="scss">
.login-container {
  background: no-repeat url("@/assets/images/login-bg.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;

  .login-form {
    margin: 0 auto;
    position: relative;
    top: 30vh;
    width: 20%;
    padding: 50px;
    border-radius: 10px;
    background-color: #00000068;

    .welcome {
      text-align: center;
      margin-bottom: 50px;
      color: #fff;
      font-size: 24px;
    }

    .login-btn-wrap {
      margin-top: 30px;

      .login-btn {
        border-radius: 20px;
        text-align: center;
        width: 150px;
        height: 40px;
        line-height: 30px;
        margin: 0 auto;
        color: #fff;
        outline: none;
        border: none;
        background-image: linear-gradient(130deg, #a6c0fe 0%, #f68084 100%);
      }
      .login-btn:hover{
        background-image: linear-gradient(to top,#30cfd0 0%, #b08dda 100%);
      }
    }

  }
}
</style>