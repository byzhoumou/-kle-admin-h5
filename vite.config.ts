import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//组件自动导入 这里要安装这2个包npm install unplugin-auto-import @types/unplugin-auto-import --save-dev
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
// 配置svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // 这里是配置主题scss自动按需导入
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/styles/element/index.scss" as *;` //引入scss文件
  //     }
  //   }
  // },
  plugins: [
    vue(),
    vueJsx(),
    // 组件库下面是自动按需导入   就不用在入口文件 里面和组件里面引入elementt组件了
    AutoImport({
      // import自动倒入
      imports: ['vue'],
      // 自动生成类型定义文件
      dts: './auto-import.d.ts',
      // 这里的自动引入会导致组件样式重复  所以用括号里的不要导入
      resolvers: [VantResolver({ importStyle: true }), ElementPlusResolver()]
    }),
    Components({
      // 这里的importStyle: 'sass' 在这里 不要写在上面
      resolvers: [VantResolver({ importStyle: false }), ElementPlusResolver()]
    }),
    // 配置svg图片
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  resolve: {
    alias: {
      // 这里控制路由的基准地址的  默认值是（/）
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // src 路径配置
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  }
})
