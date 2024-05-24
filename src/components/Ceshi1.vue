<template>
  <div class="stoe-container">
    <P>父组件传过来的：{{ obj.name }}</P>
    <P>父组件传过来的id:{{ obj.id }}</P>
  </div>
</template>

<script setup lang="ts">
let transmit = '测试数据'
// 组件父传子值
// const props = defineProps({
//   // 这里的类型第一个要大写
//   name: String,
//   id: String
// })
defineProps({
  obj: {
    // 这里的类型第一个要大写
    type: Object,
    // 默认值
    default() {
      // 没有传值的默认值
      return { name: '默认值1', id: '默认值2' }
    }
  }
})

// 计算属性拼接@
// const myname = computed(() => obj.name + '@')
</script>

<style scoped lang="scss">
.stoe-container {
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
}
</style>
