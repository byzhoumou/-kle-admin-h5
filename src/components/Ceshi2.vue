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

// 子组件向付父组件传值的第二种方式、   一搬都是用第2种方法
const emit = defineEmits(['add3'])
const onClick = () => {
  emit('add3', '测试数据2')
}

// 传递多个值
// const emit = defineEmits({
//   // 声明一个事件，这个事件接受一个对象参数，包含 name 和 age 两个字段
//   'add-details': (payload: { name: string; age: number }) => true
// })

// const sendDetails = () => {
//   emit('add-details', { name: '张三', age: 30 })
// }

// 多个事件的传递
// // 使用对象定义多个事件及其参数类型
// const emit = defineEmits({
//   // 事件1：更新用户信息，传递用户名和年龄
//   'update-user': (username: string, age: number) => true,
//   // 事件2：发送消息，传递消息内容和时间戳
//   'send-message': (message: string, timestamp: Date) => true,
//   // 事件3：记录事件，传递事件类型和详情
//   'log-event': (eventType: string, details: any) => true
// })

// // 定义事件触发函数
// const updateUser = () => {
//   emit('update-user', '张三', 30)
// }

// const sendMessage = () => {
//   emit('send-message', 'Hello, world!', new Date())
// }

// const logEvent = () => {
//   emit('log-event', 'user-action', { action: 'login', status: 'success' })
// }
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
