// 路由元信息title类型
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
