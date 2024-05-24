<template>
  <div class="stoe-container">
    <!-- 匿名插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="nihao" :qian="transmit"></slot>
    <!-- 作用域插槽 -->
    <slot url="数据" :qian="transmit"></slot>
    <!-- 具名插槽传值 -->
    <slot name="slotName" :qian="transmit"> </slot>
  </div>
</template>

<script setup lang="ts">
let transmit = '测试数据'
</script>

<style scoped lang="scss">
.stoe-container {
  width: 100px;
  height: 50px;
  background-color: red;
}
</style>
