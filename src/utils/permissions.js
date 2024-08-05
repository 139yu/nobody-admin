import router from "@/router/index.js";
import {ref} from "vue";
import useUserStore from "@/store/modules/user.js";

//白名单
const whiteList = ['/login','/404']
const registerFlag = ref(false)
router.beforeEach(async (to, from, next) => {
    let userStore = useUserStore()
    let destPath = to.path
    let userToken = userStore.userToken
    //用户已登录
    if (userToken){
        //已登录直接访问首页
        if (destPath === '/login'){
            next({path: '/'})
        }
        else{
            //没有用户信息，向服务端请求用户信息
            if (!userStore.username){
                await userStore.userInfo()
                if (!registerFlag.value){
                    registerFlag.value = !registerFlag.value
                    next({...to,replace:true})
                }
                else {
                    next()
                }
            }
            else {
                next()
            }
        }
    }else {
        if (whiteList.indexOf(destPath) !== -1){
            next()
        }else {
            next({path: '/login'})
        }
    }
})

