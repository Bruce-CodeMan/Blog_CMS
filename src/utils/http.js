/*
 * @Date: 2022-03-09 12:09:17
 * @Author: Bruce
 * @Description: 
 */
import axios from "axios"
import auth from "./auth"
import qs from "qs"

const SERVER_HOST = "http://127.0.0.1:5000"

class Http {
    constructor(){
        this.server_host = SERVER_HOST
        this.http = axios.create({
            baseURL: SERVER_HOST + "/cms",
            timeout: 1000 * 60
        });

        // 请求之前的拦截器，用来设置JWT
        this.http.interceptors.request.use(config => {
            const token = auth.token
            if(token) {
                config.headers.common.Authorization = "Bearer " + token
            }
            return config
        })
    }

    _post(url, data){
        return this.http.post(url, qs.stringify(data));
    }

    addBanner(data) {
        const url = "/banner/add"
        return this._post(url, data);
    }

    getBannerList(){
        const url = "/banner/list"
        return this.http.get(url);
    }
}

export default new Http()