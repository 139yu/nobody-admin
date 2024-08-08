import request from "@/utils/request.js";

export const reqListWithItem  = (params) => request.get('/nobody-admin/resourceCategory/listWithItem',{...params})

export const reqAddCategory = (resourceCategory) => request.post('/nobody-admin/resourceCategory/addCategory',{...resourceCategory})

export const reqUpdateCategory = (resourceCategory) => request.post('/nobody-admin/resourceCategory/updateCategory',{...resourceCategory})

export const reqDeleteCategory = (id) => request.post(`/nobody-admin/resourceCategory/deleteCategory/${id}`)