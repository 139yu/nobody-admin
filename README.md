# 项目搭建

## Element Plus集成

1. 安装Element Plus，参考文档：[Element Plus安装](https://element-plus.org/zh-CN/guide/installation.html)
2. 在main.js中引入依赖，并设置国际化，参考文档：[Element Plus使用](https://element-plus.org/zh-CN/guide/quickstart.html)，[Element Plus国际化](https://element-plus.org/zh-CN/guide/i18n.html)

## src别名配置

編輯vite.config.js，完整代碼如下：
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@': path.resolve('./src')
    }
  }
})
```

## 环境变量配置

在项目目录下创建`.env.development`（开发环境变量）、`.env.production`（生产环境变量）、`.env.test`（测试环境变量），内容如下：
```text
# 变量必须以VIT_E开头才能被外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = 'Nobody Admin'
VITE_APP_BASE_API = '/dev-api'
```
变量名前缀必须是`VIT_E`才能被外部获取。在package.json中scripts下添加如下代码：
```text
"build:test": "vue && vite build --mode test",
"build:prod": "vue && vite build --mode production"
```
在不同环境下打包可以使用对应的环境变量，完整代码如下：
```json
{
  "name": "nobody-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --open",
    "build": "vite build",
    "preview": "vite preview",
    "build:test": "vue && vite build --mode test",
    "build:prod": "vue && vite build --mode production"
  },
  "dependencies": {
    "@element-plus/icons-vue": "^2.3.1",
    "element-plus": "^2.7.7",
    "vue": "^3.4.31"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.5",
    "fast-glob": "^3.3.2",
    "vite": "^5.3.4",
    "vite-plugin-svg-icons": "^2.0.1"
  }
}
```

在项目使用环境变量：
```js
let env = import.meta.env
```


## svg图标的配置与使用

### svg图标配置

安装svg依赖插件：
```shell
pnpm install vite-plugin-svg-icons
```
在vite.config.js中配置插件，完整代码如下：
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // svg文件放在src/assets/icons目录下
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    // 给src路径取别名
    resolve: {
        alias: {
            '@': path.resolve('./src')
        }
    }
})

```
在入口文件main.js导入：
```js
import 'virtual:svg-icons-register'
```
### svg图标的使用

将svg图标添加到`src/assets/icons`目录下，假设图标名为cloud.svg，使用时添加如下代码：
```vue
<svg>
  <use xlink:href="#icon-cloud"></use>
</svg>
```
svg是图标的外层容器节点，需要与use标签结合使用，xlink:href选择使用哪个图标，属性必须是`#icon-图标名字`

在启动项目时可能会报错缺失fast-glob，安装该依赖即可：
```shell
pnpm install fast-glob
```

## 自定义插件注册svg全局组件

在`src/components`目录下新建文件夹SvgIcon，添加文件index.vue，代码如下：
```vue
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
```
在components目录下添加文件index.js，代码如下：
```js
import SvgIcon from '@/components/SvgIcon/index.vue'
const allGlobalComponent = {SvgIcon}
export default {
    install(app){
        Object.keys(allGlobalComponent).forEach(key => {
            app.use(key,allGlobalComponent[key])
        })
        
    }
}
```
修改main.js添加如下代码：
```js
import globalComponent from '@/components/index.vue'

app.use(globalComponent)
```

components目录下的index.js文件暴露的方法名一定要是install，在main.js中执行app.use(globalComponent)时，就会去
执行方法名为install的方法

## 集成sass

安装sass：
```shell
pnpm add sass sass-loader -D
```

### 配置sass全局变量

在`src/style`目录下添加文件variable.scss作为全局变量定义文件。

修改`vit.config.js`，添加全局变量相关配置，在defineConfig中添加如下代码：
```shell
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
    // other code
    css: {
        preprocessorOptions: {
            scss: {
                javascriptEnabled: true,
                additionalData: '@import "./src/styles/variable.scss";'
            }
        }
    }
})

```

## mock数据

参考文档：[vite-plugin-mock](https://www.viterc.cn/en/vite-plugin-mock.html)

安装mock依赖：
```shell
pnpm install -D vite-plugin-mock mockjs
```

在vite.config.js中启用插件，完整代码如下：
```js
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import {viteMockServe} from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            }),
            viteMockServe({
                localEnable: command == 'serve'
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve('./src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";'
                }
            }
        }
    }
})

```

在项目目录下新建文件夹mock，添加文件index.js，完整代码如下：
```js
function createUserList(){
    return [
        {
            username: 'nobody',
            password: 'nobody',
            token: 'nobody token',
            routes: ['home'],
            roles: ['平台管理员']
        }
    ]
}
export default [
    {
        url: '/api/user/login',
        method: 'post',
        response: ({body}) => {
            const {password,username} = body
            const checkUser = createUserList().find(item => {
                return item.username === username && item.password === password
            })
            if (!checkUser) {
                return {code: 500,data: {message: '账号或密码错误'}}
            }
            const {token} = checkUser
            return {code: 200,data: {token}}
        }
    },
    {
        url: 'api/user/info',
        method: 'get',
        response: (request) => {
            const token = request.headers.token
            const checkUser = createUserList().find(item => {
                return item.token === token
            })
            if (!checkUser) {
                return {code: 500,data: {message: '获取用户信息失败'}}
            }
            return {code: 200,data: {checkUser}}
        }
    }
]
```

## axios二次封装

参考文档：[axios官网](https://www.axios-http.cn/docs/intro)

安装axios：
```shell
pnpm i axios
```
在`src/utils`目录下添加请求工具文件request.js，代码如下：
```js
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
```
暴露的request也是axios对象，只是做了相关配置。

## 路由配置

安装vue router：
```shell
pnpm install vue-router
```
修改App.vue文件：
```vue
<template>
  <router-view></router-view>
</template>
<script setup>
</script>
<style scoped>
</style>
```
在`src/view`目录下分别创建404，home，login页面，在`src/router`目录下添加静态路由配置文件routes.js，代码如下：
```js
export const constantRouters = [

    {
        path: '/login',
        component: () => import('@/view/login/index.vue'),
        name: 'login',
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/view/404/index.vue'),
        name: '404',
        hidden: true
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        hidden: true
    }
]
```
在`src/router`目录下添加index.js文件，注册路由：
```js
import {constantRouters} from './routes.js'
import {createRouter,createWebHashHistory} from 'vue-router'

let router = createRouter({
    history: createWebHashHistory(),
    routes: constantRouters,
    scrollBehavior(){
        return {
            left: 0,
            top: 0
        }
    }
})
export default router
```
修改main.js，安装路由：
```js
import router from "@/router"
// other code
app.use(router)
```