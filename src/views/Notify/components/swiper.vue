<template>
  <div class="carousel">
    <div
        class="img-list"
        :style="{ left: position + 'px', transition: enableTransition ? '0.5s ease' : 'none' }"
    >
      <img v-for="(v, k) in imgs" :key="k" :src="v.img" alt=""/>
    </div>
    <div class="Button-box">
      <button class="left" @click="scrollLeft"><</button>
      <button class="right" @click="scrollRight">></button>
    </div>
    <div class="circle-list">
      <div
          v-for="(img, k) in props.rows"
          :key="k"
          class="circle"
          :class="{ active: index === k + 1 }"
          @click="() => setIndex(k + 1)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, defineProps} from 'vue'
// 节流防抖函数的引入
import {throttle, debounce} from '@/utils/throttle'

interface IProps {
  rows: {
    img: string
  }[]
}

const props = defineProps<IProps>()

const imgs = computed(() => [props.rows[props.rows.length - 1], ...props.rows, props.rows[0]])
const index = ref(1)
const position = ref(-430)
const width = ref(430)
const interval = ref<number | null>(null)
const enableTransition = ref(true) // 控制过渡效果的响应式数据

onMounted(() => {
  // 设置定时器自动轮播
  interval.value = setInterval(() => {
    scrollRight() // 调用滚动到下一张图的函数
  }, 2000)
})

// 清除定时器
onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})

const updatePosition = () => {
  position.value = -index.value * width.value
}

// 向右滚动的函数
const scrollRight = throttle(() => {
  // 检查当前索引是否已经到达图片数组的末尾
  if (index.value >= props.rows.length) {
    // 如果当前索引等于图片数组长度，说明到达了最后一张图片，需要回到第一张图片
    index.value = 0 // 重置索引为0，准备移动到数组的首部，即真实的第一张图片前的复制的最后一张图片

    // 禁用过渡效果，使得图片切换看起来即刻发生，避免看到从最后一张滑动到第一张的过程
    enableTransition.value = false

    // 立即更新位置到第一张图片前的复制的最后一张图片
    updatePosition()

    // 使用 setTimeout 延迟0毫秒，目的是让浏览器有机会更新视图，禁用过渡效果后再激活
    setTimeout(() => {
      // 重置索引为1，这是真实的第一张图片
      index.value = 1
      // 更新位置到第一张图片
      updatePosition()
      // 重新启用过渡效果，之后的滑动将会有动画效果
      enableTransition.value = true
    }, 0) // setTimeout 延迟0毫秒，这是一个常见的技巧，用于将任务推到浏览器的下一个任务队列
  } else {
    // 如果不是最后一张图片，索引简单地增加1
    index.value++
    // 更新位置到新索引对应的图片
    updatePosition()
  }
}, 200)

// 向左滚动的函数
const scrollLeft = throttle(() => {
  // 检查是否已经滚动到了数组的开始，即第一张图
  if (index.value <= 1) {
    // 设置索引到数组的末尾，即复制的第一张图片，这样可以创建一个向左滚动到最后一张图的效果
    index.value = props.rows.length + 1

    // 禁用过渡效果以避免在滚动时看到从第一张图跳到最后一张图的动画
    enableTransition.value = false

    // 更新位置，让复制的第一张图片显示出来
    updatePosition()

    // 使用setTimeout将索引设置回实际的最后一张图片，并重新启用过渡效果
    setTimeout(() => {
      // 将索引设置为实际的最后一张图片的位置
      index.value = props.rows.length

      // 更新位置，现在指向实际的最后一张图片
      updatePosition()

      // 重新启用过渡效果，以便后续滚动操作有动画效果
      enableTransition.value = true
    }, 0) // 延迟0毫秒，即在下一个事件循环立即执行，这样用户几乎感觉不到延迟
  } else {
    // 如果不是在第一张图片，简单地将索引减1
    index.value--

    // 更新位置以反映新的索引位置
    updatePosition()
  }
}, 200)

const setIndex = throttle((k: number) => {
  index.value = k
  updatePosition()
}, 200)
</script>

<style scoped lang="scss">
.carousel {
  width: 100%;
  height: 200px;
  display: flex;
  overflow: hidden;
  position: relative;

  .img-list {
    width: 375px;
    height: 200px;
    display: flex;
    position: relative;
    left: 0px;
    transition: 0.5s ease;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .Button-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .left,
    .right {
      width: 40px;
      height: 40px;
      background-color: rgba(0, 0, 0, 0.5);
      border: none;
      position: absolute;
      top: 43%;
      transition: background-color 0.3s ease; // 平滑过渡效果

      &:active {
        background-color: rgb(243, 238, 238); // 点击时的颜色变为半透明红色
      }
    }

    .left {
      left: 0;
      border-radius: 0 5px 5px 0;
    }

    .right {
      right: 0;
      border-radius: 5px 0 0 5px;
    }
  }

  .circle-list {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    bottom: 10px;
    width: 100%;

    .circle {
      margin: 0 3px;
      display: flex;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
    }

    .active {
      background-color: #000;
    }
  }
}
</style>
