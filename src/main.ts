// vue3入口文件
import { createApp } from 'vue'
// 优化:由 stores 统一维护，在 stores/index.ts 中完成 pinia 初始化，交付 main.ts 使用
import pinia from './stores'
// 导入vant组库样式
import 'vant/lib/index.css'
import App from './App.vue'
// 导入路由
import router from './router'
// 导入svg地图
import 'virtual:svg-icons-register'
//导入scss文件
import '@/styles/main.scss'
import 'reset.css'
// 导入枚举文件
// import '@/enums'

const app = createApp(App)

app.use(pinia)
// // 使用路由
app.use(router)
// 挂载app实例
app.mount('#app')
