function createUserList(){
    return [
        {
            username: 'nobody',
            password: 'nobody',
            token: 'nobody token',
            routes: ['home'],
            roles: ['平台管理员']
        }
    ]
}
export default [
    {
        url: '/api/user/login',
        method: 'post',
        response: ({body}) => {
            const {password,username} = body
            const checkUser = createUserList().find(item => {
                return item.username === username && item.password === password
            })
            if (!checkUser) {
                return {code: 500,data: {message: '账号或密码错误'}}
            }
            const {token} = checkUser
            return {code: 200,data: {token}}
        }
    },
    {
        url: 'api/user/info',
        method: 'get',
        response: (request) => {
            const token = request.headers.token
            const checkUser = createUserList().find(item => {
                return item.token === token
            })
            if (!checkUser) {
                return {code: 500,data: {message: '获取用户信息失败'}}
            }
            return {code: 200,data: {checkUser}}
        }
    }
]