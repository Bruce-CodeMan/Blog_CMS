/*
 * @Date: 2022-03-08 09:37:54
 * @Author: Bruce
 * @Description: "主函数"
 */

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router.js"
import auth from "@/utils/auth"
import http from "@/utils/http"

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.config.globalProperties.$auth = auth
app.config.globalProperties.$http = http
app.mount('#app')
