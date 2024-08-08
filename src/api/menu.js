import request from "@/utils/request.js";

export const reqListTree = () => request.get('/nobody-admin/menu/listTree')

export const reqAddMenu = (menu) => request.post('/nobody-admin/menu/addMenu',{...menu})

export const reqUpdateMenu = (menu) => request.post('/nobody-admin/menu/updateMenu',{...menu})

export const reqDeleteMenu = (id) => request.post(`/nobody-admin/menu/delete/${id}`)

export const reqChangeHidden = (id,hidden) => request.post(`/nobody-admin/menu/changeHidden/${id}/${hidden}`)