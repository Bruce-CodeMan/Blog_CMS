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

    // 获取轮播图列表的请求
    getBannerList(){
        const url = "/banner/list"
        return this.http.get(url);
    }

    // 删除轮播图的请求
    deleteBanner(banner_id){
        const url = "/banner/delete"
        return this._post(url, {"id": banner_id})
    }

    // 编辑轮播图的请求
    editBanner(data){
        const url = "/banner/edit"
        return this._post(url, data)
    }

    // 获取帖子列表
    getPosterList(page){
        const url = "/poster/list?page=" + (page?page:1)
        console.log(url)
        return this.http.get(url);
    }

    // 删除帖子
    deletePoster(poster_id){
        const url = "/poster/delete"
        return this._post(url, {"id": poster_id});
    }
}

export default new Http()