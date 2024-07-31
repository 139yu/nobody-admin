// 进行axios二次封装：使用请求与响应拦截器
import axios from "axios";
import {ElMessage} from "element-plus";

let request = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时时间，单位毫秒
    timeout: 5000
})

request.interceptors.request.use((config) => {
    //可配置请求携带的公共参数，如token
    //config.headers.token = ""
    // 返回配置对象
    return config
})

request.interceptors.response.use((response) => {
    return response.data
},(error) => {
    //处理网络错误
    let message = null
    let status = error.response.status
    switch (status) {
        case 401:
            message = 'token过期'
            break
        case 500:
            message = '系统繁忙'
            break
        case 404:
            message = '请求地址不存在'
            break
        case 403:
            message = '无权限访问'
            break
        default:
            message = '位置错误'
            break

    }
    ElMessage({
        type: 'error',
        message
    })

    return Promise.reject(error)
})
export default request