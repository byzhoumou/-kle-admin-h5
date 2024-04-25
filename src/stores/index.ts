// 写在这没有写在main.ts中就是因为统一管理
// 这里是放关于pinia的路径  操作的

// 创建一个pinia实例（根store）并将其传递给应用  状态管理工具    （Pinia 文档）
import { createPinia } from 'pinia'
// 使用pania插件
// pinia-plugin-persistedstate 插件用于在 Vue.js 应用程序中使用 Pinia 状态管理库时，提供持久化状态的能力。具体而言，它能够将 Pinia 存储的状态保存到浏览器的本地存储（localStorage 或 sessionStorage），以便在页面重新加载时恢复状态
import presist from 'pinia-plugin-persistedstate'
// 创建pinia实例
const pinia = createPinia()
// use(presist)使用持久化状态插件
pinia.use(presist)
// 导出pinia    pinia独立维护优化:由 stores 统一维护，在 stores/index.ts 中完成 pinia 初始化，交付 main.ts 使用
export default pinia

// 统一导出 modules 下面的仓库
// 这样导出的好处是以后import { useUserstorre } from './stores' 路径就是只要使用'./stores'
export * from './modules/user'
export * from './modules/consult'
