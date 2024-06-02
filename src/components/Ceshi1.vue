<template>
  <div class="stoe-container" v-if="ssss">
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
    required: true, // 此 prop 是必需的

    // 默认值
    default() {
      // 没有传值的默认值
      return { name: '默认值1', id: '默认值2' }
    }
  },
  // 这里接受一个Boolean类型的值控制他的开关  默认是不开
  ssss: {
    type: Boolean,
    required: false, // 此 prop 是必需的
    default: false
  }
})

// 计算属性拼接@
// const myname = computed(() => obj.name + '@')

// // props 的参数
// const props = defineProps({
//   obj: {
//     // 类型设置
//     type: Object,

//     required: true, // 此 prop 是必需的
//     // 校验你传递的值是否存在不存在使用默认的 返回的是布尔类型
//     validator: (value) => {
//       // 自定义验证：确保 obj 有 name 和 id 属性
//       return value.hasOwnProperty('name') && value.hasOwnProperty('id')
//     },
//     // 这个是传递的方法
//     default: () => ({ name: '默认值1', id: '默认值2' })
//   }
// })
</script>

<style scoped lang="scss">
.stoe-container {
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
}
</style>
