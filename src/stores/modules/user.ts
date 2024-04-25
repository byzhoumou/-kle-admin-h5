// modules文件夹下面统一管理 这些仓库  用户创仓库

import { ref } from 'vue'
//从 Pinia 库中导入 defineStore 函数，用于创建状态管理仓
import { defineStore } from 'pinia'
// 这里是不知道这个User的类型用type给他定义一下
import type { User } from '@/types/user.d.ts'
//下面defneStore这个函数有有一个返回值 要到导出去才能给别的模块使用
// 使用 defineStore 创建一个名为 cp-user 的状态管理仓库，并将其赋值给 useAppStore 变量。
export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 用户信息的状态
    // 在状态管理仓库中定义了一个响应式数据 user，其类型为 User：
    const user = ref<User>()

    // 设置用户信息的函数
    // 定义了存储用户信息的函数 delUser，里面的u型参类型为User 该函数将 user 的值设为 undefined，实现了清空用户信息的效果：
    const setUser = (u: User) => {
      user.value = u
    }
    // 定义了删除用户信息的函数 delUser，该函数将 user 的值设为 undefined，实现了清空用户信息的效果：
    const delUser = () => {
      // 这个函数触发是清空里面的数据
      user.value = undefined
    }
    // 最后，通过 return 语句将定义的 user、setUser、delUser 返回，以便在其他模块中可以访问和使用这些状态和函数：
    return { user, setUser, delUser }
  },
  {
    // mian.ts导入文件之后在这里开启本地持久化
    // persist 是用于启用或禁用插件的持久化状态的选项。当设置为 true 时，它告诉插件在浏览器的本地存储（localStorage 或 sessionStorage）中保存 Pinia 存储的状态，以便在页面重新加载时恢复状态。
    persist: true
  }
)
