// 进行axios二次封装：使用请求与响应拦截器
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import useUserStore from "@/store/modules/user.js";

let request = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: '/api',
    // 超时时间，单位毫秒
    timeout: 5000
})

request.interceptors.request.use((config) => {
    let userStore = useUserStore()
    //可配置请求携带的公共参数，如token
    //config.headers.token = ""
    // 返回配置对象
    config.headers.Authorization = userStore.userToken
    return config
})

request.interceptors.response.use((response) => {
    let userStore = useUserStore()
    const res = response.data
    let code = res.code
    let message = res.msg
    if (code !== 200) {
        ElMessage({
            type: 'error',
            message
        })
    }
    if (code === 401) {
        ElMessageBox
            .confirm(
                '你已被登出，可以取消继续留在该页面，或者重新登录',
                '确认登出',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'error',
                })
            .then(() => {
                userStore.userLogout()
                location.reload()
            })
    }
    return response.data
}, (error) => {
    console.log(error)
    ElMessage({
        type: 'error',
        message: error.message,
    })
    return Promise.reject(error)

})
export default request