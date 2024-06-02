<template>
  <div class="stoe-container">
    <!-- 这里的 $emit方法发送了一个add事件 携带数据123 传给父组件  -->
    <button @click="$emit('add1', transmit)">子1向父组件传的值：点击触发</button>
    <hr />
    <!-- 发送随机数方法-->
    <button @click="$emit('add2', Math.random())">子2向父组件传的值：点击触发</button>
    <!-- 子组件向付父组件传值的第二种方式 -->
    <button @click="onClick">子3向父组件传的值：点击触发</button>
  </div>
</template>

<script setup lang="ts">
let transmit = '测试数据 123'

// 子组件向付父组件传值的第二种方式、
const emit = defineEmits(['add3'])
const onClick = () => {
  emit('add3', '测试数据2')
}
</script>

<style scoped lang="scss">
.stoe-container {
  width: 100px;
  height: 150px;
  background-color: blue;
  button {
    font-size: 12px;
    display: flex;
  }
}
</style>
