import request from "@/utils/request.js";

export const reqLogin = (username, password) => request.post('/nobody-admin/admin/login',{username,password})

export const reqUserInfo = () => request.get('/nobody-admin/admin/getFullUserInfo')

export const reqLogout = () => request.post('/nobody-admin/admin/logout')