<template>
  <!--固定定位  左侧箭头 标题  右侧文字  -->
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>
<!-- 这是封装的头部组件 -->
<script lang="ts" setup>
import { useRouter } from 'vue-router'

//1.通过props来实现标题和文字的设置
const props = defineProps<{
  title?: string
  rightText?: string
  //暴露back属性
  back?: () => void
}>()

const emit = defineEmits<{
  (e: 'click-right'): void
}>()

// 2.使用emit函数来触发自定定义事件（点击右的文字）
const onClickRight = () => {
  emit('click-right')
}
const router = useRouter()
// 3.回退， 了解 history.state信息， 监听箭头的点击事件按条件进行跳转
// 有访问历史记录就正常回退 router.back()2.没有访问历史记录跳转首页 router.push('/”)
const onClickLeft = () => {
  // 这里是返回上一层 判断prpos里面有没有back 有的话终止函数 在调用props.back()
  if (props.back) return props.back()
  // 这里是返回到上一次路由
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
      color: var(--cp-primary);
    }
  }
}
</style>
