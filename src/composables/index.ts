import { followOrUnfollow } from '@/services/consult'
import { FollowType } from '@/types/consult'

// Vue3概念：通过组合式API封装 数据逻辑 在一起的函数， 组合式函数(composables) 名字命名都是useXxx 开头

// 这里是封装逻辑的地方  封装的逻辑可以复用
// 封装关注的逻辑
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}
