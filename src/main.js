/*
 * @Date: 2022-03-08 09:37:54
* @Author: Bruce
 */
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router.js"

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
