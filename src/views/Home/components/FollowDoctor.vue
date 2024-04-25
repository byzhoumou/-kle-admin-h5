<!-- 这个是关注里面的轮播组件 -->
<script setup lang="ts">
//医生列表类型信息
import { DoctorList } from '@/types/consult'
// 导入医生卡片组件
import DoctorCard from '../components/DoctorCard.vue'
//导入关注的医生列表请求函数
import { getDoctorPage } from '@/services/consult'
// 导入vuesue库里面的函数 用来监听浏览器窗口大小变化的
import { useWindowSize } from '@vueuse/core'
// 用来监听浏览器窗口大小变化的
const { width } = useWindowSize()

// 原生的写法跟上面不同
// 1组件初始化获取设备宽度，页面吃尺寸发生改变获取设备的宽度
// import { onMounted, onUnmounted } from 'vue'
// 创建响应式数据
// width表示窗口宽度初始值为0
// const width = ref(0)
// setWidth用于设置width的值        window.innerWidth是浏览器窗口当前宽度
// const setWidth = () => (width.value = window.innerWidth)
// 当组件挂载到DOM上时，这个钩子会被调用。
// onMounted(() => {
// 调用这个函数操作是吧当前浏览器的宽度赋值给width.value
// setWidth()
// window：代表浏览器窗口的一个全局对象。
// .addEventListener：这是一个方法，用于在window对象上添加一个事件监听器。
// 'resize'：监听的事件类型，这里是窗口大小改变事件。
// setWidth：当窗口大小改变时，要调用的函数，即前面定义的setWidth函数
// window.addEventListener('resize', setWidth)
// })
// 当组件卸载时，这个钩子会被调用。
// onUnmounted(() => {
// window.removeEventListener('resize', setWidth)
// })

const list = ref<DoctorList>([])
const loadData = async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  list.value = res.data.rows
}

//组件挂载调用这上面这个函数
onMounted(() => loadData())
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件   showIndicators这个是控制轮播图下面的点   loop控制轮播图不用重复滚动-->
      <van-swipe :width="(150 / 375) * width" :showIndicators="false" :loop="false">
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :item="item"></doctor-card>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
