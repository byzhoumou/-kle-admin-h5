<template>
  <div class="carousel">
    <div
      class="img-list"
      :style="{ left: position + 'px', transition: enableTransition ? '0.5s ease' : 'none' }"
      ref="carouselBox"
    >
      <img v-for="(v, k) in imgs" :key="k" :src="v.img" alt="" />
    </div>

    <div class="Button-box">
      <button class="left" @click="scrollLeft"><</button>
      <button class="right" @click="scrollRight">></button>
    </div>
    <div class="circle-list">
      <div
        class="circle"
        v-for="(img, k) in props.rows"
        :key="k"
        :class="{ active: index - 1 === k }"
        @click="setIndex(k + 1)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  rows: {
    img: string
  }[]
}

const props = defineProps<IProps>()

const imgs = computed(() => {
  const rows = props.rows
  const len = rows.length
  return [rows[len - 1], ...rows, rows[0]]
})

const index = ref(0)
const position = ref(0)
const width = ref(430)

onMounted(() => {
  index.value = 1
  position.value = -1 * width.value
})

const enableTransition = ref(true) // 控制过渡效果的响应式数据

// 图片总数，根据你的图片数量调整

const carouselBox = ref(null) // 用于引用 .img-list 的 DOM 元素

// 右点击函数
const scrollRight = () => {
  index.value++
  position.value = index.value * (-1 * width.value)
  // 如果到达最后一张图，重置到第一张
  if (index.value === props.rows.length + 1) {
    setTimeout(() => {
      index.value = 1
      position.value = -1 * width.value
      enableTransition.value = false // 禁用过渡
      setTimeout(() => {
        enableTransition.value = true // 重新启用过渡
      }, 50) // 短暂延迟后重新启用过渡效果
    }, 500)
  } else {
  }
}

// 左点击函数
const scrollLeft = () => {
  index.value--
  position.value = position.value + width.value

  // 获取真实对象长度
  const length = props.rows.length
  if (index.value == 0) {
    // // 延迟禁用过度
    setTimeout(() => {
      // 替换前后伪装真实位置
      index.value = length
      // 设置css偏移样式位置
      position.value = length * (-1 * width.value)

      enableTransition.value = false // 禁用过渡
      setTimeout(() => {
        enableTransition.value = true // 重新启用过渡
      }, 50) // 短暂延迟后重新启用过渡效果
    }, 500)
  }

  console.log(index.value, props.rows.length)

  // position.value = index.value * -430

  console.log(index.value)
  console.log(index.value)
}

// 小圆点点击事件
const setIndex = (k: any) => {
  // 更新索引值
  index.value = k
  position.value = -k * width.value
  console.log(k)
}
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
