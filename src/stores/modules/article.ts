import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => {
    return {
      id: 100, // 用户的唯一标识符
      username: '张三', // 用户名
      gender: '男', // 用户性别
      avatar: '没有', // 用户头像URL
      isVip: false, // 用户是否为VIP会员
      email: '2676082711', // 用户的电子邮箱地址
      phone: '13974920409', // 用户的电话号码
      token: '1', // 认证用的Token，用于验证用户的登录状态
      status: '' // 新添加的字段，表示用户状态
    }
  },

  // getters计算属性
  getters: {
    userInfo(state) {
      // 返回格式化的用户信息
      return `姓名: ${state.username}, 性别: ${state.gender}, 头像: ${state.avatar}, 
              邮箱: ${state.email}, 电话: ${state.phone}, VIP状态: ${state.isVip ? '是' : '否'}`
    }
  },

  actions: {
    updateName(username: string, gender: string) {
      this.username = username
      this.gender = gender
      this.id = 0
      //   检查email是否已经包含qq
      if (!this.email.startsWith('qq')) this.email = 'qq' + this.email
    },
    idinfo() {
      this.id++
    },
    clear() {
      // 重置数据
      this.$reset()
      //   清空仓库
      localStorage.removeItem('article')
    }
  },

  persist: true
})
