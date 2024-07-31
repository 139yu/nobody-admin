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