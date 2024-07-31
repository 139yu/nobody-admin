import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from '@/App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import globalComponent from '@/components/index.js'
import router from "@/router"
import '@/styles/index.scss'
import pinia from "@/store"

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.use(globalComponent);
app.use(pinia)
app.mount('#app')
