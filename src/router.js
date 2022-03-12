/*
 * @Date: 2022-03-08 12:22:06
 * @Author: Bruce
 * @Description: "路由"
 */


import {createRouter, createWebHashHistory} from "vue-router";
import Home from "@/pages/Home.vue";
import Banner from "@/pages/Banner.vue";
import Poster from "@/pages/Poster.vue";
import Comment from "@/pages/Comment.vue";
import User from "@/pages/User.vue";
import Board from "@/pages/Board.vue";

const routes = [{
    path: "/", component: Home, name: "home"
}, {
    path: "/banner", component: Banner, name: "banner"
}, {
    path: "/poster", component: Poster, name: "poster"
}, {
    path: "/comment", component: Comment, name: "comment" 
}, {
    path: "/user", component: User, name: "user" 
}, {
    path: "/board", component: Board, name: "board"
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes:routes`的缩写
});


// 手动导出
export default router;
