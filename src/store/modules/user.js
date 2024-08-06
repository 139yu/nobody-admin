import {defineStore} from "pinia";
import {reqLogin, reqUserInfo} from "@/api/user.js";
import {SET_TOKEN,GET_TOKEN,REMOVE_TOKEN} from "@/utils/token.js";
import router from "@/router/index.js";
import {constantRouters,asyncRouters} from '@/router/routes.js'

let useUserStore = defineStore('User',{
    state: () => {
        return{
            userToken: GET_TOKEN(),
            userAvatar: '',
            username: '',
            resources: [],
            userRouters: [],
            constantRouters
        }
    },
    actions: {
        async userLogin(loginParams) {
            let {username,password} = loginParams
            let result = await reqLogin(username,password)
            let messageType = 'error'
            if (result.code === 200){
                messageType = 'success'
                let token = result.data.tokenHead + result.data.token
                this.userToken = token
                SET_TOKEN(token)
            }
            else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        async userInfo(){
            let result = await reqUserInfo()
            if (result.code === 200){
                let userInfo = result.data
                this.userAvatar = userInfo.avatar
                this.username = userInfo.username
                this.resources = userInfo.resourceList
                let menuList = userInfo.menuList
                sortedMenu(menuList)
                let finallyRouters = findFinallyRouters(menuList,asyncRouters)
                this.userRouters = finallyRouters
            }else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        userLogout(){
            this.username = ''
            this.userRouters = []
            REMOVE_TOKEN()
        },
        getRoutes(){
            return this.constantRouters.concat(this.userRouters)
        }
    }
})

const buildRoute = (item) => {
    let routeEle = {
        path: item.path,
        component: viewComponentMaps[item.path],
        name: item.name,
        meta: {
            title: item.title,
            icon: item.icon
        },
        children: []
    }
    if (item.children && item.children.length > 0){
        for (let i = 0; i < item.children.length; i++) {
            const child = buildRoute(item.children[i])
            routeEle.children.push(child)
        }
    }
    return routeEle
}
const sortedMenu = (menus) => {
    menus.sort((a,b) => a.sort - b.sort)
    menus.forEach(item => {
        if (item.children && item.children.length > 1){
            item.children.sort((a,b) => a.sort - b.sort)
        }
    })

}

const findFinallyRouters = (userRouters,routers) => {
    const finallyRouters = []
    userRouters.forEach(userRouter => {
        let destRouter = routers.find(item => item.path === userRouter.path)
        if (destRouter){
            if (userRouter.children && destRouter.children){
                destRouter.children = findFinallyRouters(userRouter.children,destRouter.children)
            }
            router.addRoute(destRouter)
            finallyRouters.push(destRouter)
        }

    })
    return finallyRouters
}

export default useUserStore