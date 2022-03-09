/*
 * @Date: 2022-03-09 10:31:10
 * @Author: Bruce
 * @Description: 系统访问权限设置
 */

const USER_KEY = "USER_KEY"
const TOKEN_KEY = "JWT_TOKEN_KEY"

class Auth{
    // 构造函数
    constructor() {
        // 设置属性
        this.token = null
        this.user = null
        this.token = localStorage.getItem(TOKEN_KEY)
        const userJson = localStorage.getItem(USER_KEY)
        if(userJson){
            this.user = JSON.stringify(userJson)
        }
    }

    // 单例模式
    static getInstance() {
        if(!this._instance){
            this._instance = new Auth()
        }
        return this._instance
    }

    // 设置token
    setUserToken(user, token){
        this.user = user
        this.token = token
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        localStorage.setItem(TOKEN_KEY, token)
    }

    // 清除token
    clearToken(){
        this.user = null
        this.token = null
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
    }

    // 将方法设置为属性
    get is_auth(){
        if(this.user && this.token) {
            return true
        }else {
            return false
        }
    }

    get is_staff() {
        if(!this.is_auth) {
            return false
        }
        if(this.user.is_staff){
            return true
        }
        return false
    }

}

export default Auth.getInstance()