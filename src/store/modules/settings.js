import {defineStore} from "pinia";
import settings from "../../../settings.js";

let useLayoutSettingsStore = defineStore("LayoutSettings", {
    state: () => {
        return {
            menuCollapse: false,
            historyRouters: []
        }
    },
    actions: {
        addHistoryRouter(router) {
            if (settings.historyRouterSize < 1) {
                return
            }
            const addAndShift = (array, size, addEle) => {
                let currentIndex = array.indexOf(addEle)
                if (currentIndex !== -1) {
                    array.splice(currentIndex, 1)
                    array.push(addEle)
                    return
                }
                if (array.length < size) {
                    array.push(addEle)
                } else {
                    array.shift()
                    if (array.length >= size) {
                        addAndShift(array, size, addEle)
                    }
                }
            }
            addAndShift(this.historyRouters, settings.historyRouterSize, router)
        },
        popHistoryRouter(){
            console.log(this.historyRouters.length)
            if (this.historyRouters.length > 1){
                this.historyRouters.pop()
            }
            console.log(this.historyRouters.length)
        }
    }
})


export default useLayoutSettingsStore