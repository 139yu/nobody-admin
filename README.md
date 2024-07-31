<<<<<<< HEAD
# nobody-admin
=======
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
pnpm install fast-glob -D
```

## 自定义全局组件

>>>>>>> master
