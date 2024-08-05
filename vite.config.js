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
                mockPath: './mock',
                supportTs: false,
                logger: true,
                // 保证开发阶段使用mock接口
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
        },
        server:{
            proxy:{
                '/api': {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            }
        }
    }
})
