import {defineStore} from "pinia";
import {constantRouters} from '@/router/routes.js'

let useUserStore = defineStore('User',{
    state: () => {
        return{
            currentUserMenus: constantRouters
        }
    },
    actions: {

    }
})
export default useUserStore