<script setup lang="ts">
// 这个是封装用于图片的通用组件
// 用这个函数暴露一个name属性
defineProps<{
  name: string
}>()
</script>
<!-- 封装的svg 图片组件 -->
<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped lang="scss">
.cp-icon {
  width: 1em;
  height: 1em;
}
</style>
