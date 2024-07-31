import {defineStore} from "pinia";

let useLayoutSettingsStore = defineStore("LayoutSettings", {
    state: () => {
        return {
            menuCollapse: false
        }
    }
})
export default useLayoutSettingsStore