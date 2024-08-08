import SvgIcon from '@/components/SvgIcon/index.vue'
import MenuTreeSelect from '@/components/MenuTreeSelect/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent = {SvgIcon,MenuTreeSelect}
export default {
    install(app){
        Object.keys(allGlobalComponent).forEach(key => {
            app.component(key,allGlobalComponent[key])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}