<template>
  <div class="stoe-container">
    <!-- 这里的 $emit方法发送了一个add事件 携带数据123 传给父组件  -->
    <button @click="$emit('add1', 123)">向父组件传的值：</button>
    <hr />
    <!-- 发送方法随机数-->
    <button @click="$emit('add2', Math.random())">向父组件传的方法：</button>
  </div>
</template>

<script setup lang="ts">
let transmit = '测试数据'
</script>

<style scoped lang="scss">
.stoe-container {
  width: 100px;
  height: 100px;
  background-color: blue;
}
</style>
