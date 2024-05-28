<template>
  <div class="article-page">
    <p>id:{{ store.id }}</p>
    <hr />
    <p>用户名:{{ store.username }}</p>
    <hr />

    <p>性别:{{ store.gender }}</p>
    <hr />

    <p>头像:{{ store.avatar }}</p>

    <hr />

    <p>会员:{{ store.isVip }}</p>
    <hr />

    <p>邮箱:{{ store.email }}</p>
    <hr />

    <p>电话:{{ store.phone }}</p>
    <hr />

    <p>token:{{ store.token }}</p>
    <hr />
    <van-button @click="clickA">按钮</van-button>
    <hr />

    <van-button @click="caickclear">清空数据</van-button>
    <hr />
    '
    <van-button @click="clickplus">点击+1</van-button>
    <hr />

    <p>电话:{{ grade }}</p>
    <hr />

    <p>新加标签:{{ userInfo }}</p>
    <hr />
    <stoe>
      <!-- 匿名插槽 -->
      <button>匿名插槽</button>
    </stoe>
    <hr />
    <stoe>
      <!-- 具名插槽 -->
      <template #nihao>
        <button>具名插槽</button>
      </template>
    </stoe>
    <hr />
    <stoe>
      <!-- 作用域插槽 可以传递数据  没有类名  通过slotProps  简写为{要接收的数据} 传递数据-->
      <template v-slot="{ url, qian }">
        <button>{{ url }}</button>
        <button>{{ qian }}</button>
      </template>
    </stoe>
    <hr />
    <stoe>
      <!-- 具名插槽传值  名字写在v-slot后面  -->
      <template v-slot:slotName="{ qian }">
        <button>{{ qian }}</button>
      </template>
    </stoe>
    <hr />

    <!-- 用于监听数据变化 -->
    <input type="text" v-model="watchid" />
    <hr />

    <!-- 父子传值  这里的item代表propslist数组中的每一项 传给子组件-->
    <Ceshi1 :obj="item" v-for="(item, idenx) in propslist"></Ceshi1>

    <hr />
    <!-- 子组件传过来的数据  这里的add是子组件发送的数据携带了一个参数e -->
    <Ceshi2 @add1="onAdd1"></Ceshi2>
    <hr />
    <!-- 子组件传过来的数据  这里的add是子组件发送的数据携带了一个方法e -->
    <Ceshi2 @add2="onAdd2"></Ceshi2>
    <p>子传来方法赋值{{ num }}</p>
    <!-- // 子传父亲传递数据的的第二种方法 -->
    <Ceshi2 @add3="onAdd3"></Ceshi2>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/stores/modules/article'
import stoe from '@/components/stoe.vue'
import Ceshi1 from '@/components/Ceshi1.vue'
import Ceshi2 from '@/components/Ceshi2.vue'

// 父子组件传值 的数据   这个数据是传个子组件用的、
const propslist = ref([
  { name: '张三', id: 1 },
  { name: '李四', id: 2 },
  { name: '王五', id: 3 }
])

// 子传父  接受子组件传过来的数据 这里就是携带的数据
const onAdd1 = (e: any) => {
  console.log('子组件传过来的数据=====》', e)
}

// 子传父  接受子组件传过来的数据 这里就是携带的放发
const num = ref(0)
const onAdd2 = (e: any) => {
  console.log('子组件传过来的方法=====》', e)
  // 这里的e是子组件传过来的随机数方法
  num.value = e
  console.log(e)
}
// 子传父亲传递数据的的第二种方法
const onAdd3 = (e) => {
  console.log('子组件传递的的数据第二种方法', e)
}
// 计算属性的玩法
const userInfo = computed(() => store.userInfo)

// 计算数字
const score = ref(75)
const grade = computed(() => {
  if (score.value >= 90) {
    return 'A'
  } else if (score.value >= 80) {
    return 'B'
  } else if (score.value >= 70) {
    return 'C'
  } else {
    return 'D'
  }
})

const store = useArticleStore()
// 更新数据
const clickA = () => {
  store.updateName('Qiye', '女')
}

const clickplus = () => {
  // 点击增加数据
  store.idinfo()
}
// 这里删除仓库数据
const caickclear = () => {
  store.clear()
}
const nihao = (day: number) => {
  switch (day) {
    case 0:
      // setInterval(() => {
      //   console.log('你好')
      // }, 3000)
      console.log('今天是星期日')
      return console.log('测试')

    case 1:
      console.log('今天是星期一')
      break
    case 2:
      console.log('今天是星期二')
      break
    case 3:
      console.log('今天是星期三')
      break
    case 4:
      console.log('今天是星期四')
      break
    case 5:
      console.log('今天是星期五')
      break
    case 6:
      console.log('今天是星期六')
      break
    default:
      console.log('无法识别的日期')
  }
}

// 操作数组
let arr = [5, 7, 21, 56, 4, 46, 41, 561, 63, 165, 165, 45, 56, 4, 651]
arr.sort((a, b) => a - b)

// 数据监听
const watchid = ref(0)
// watch监听第一个是要监听的响应式数据 （新值，老值）
watch(
  watchid,
  (newValue, oldValue) => {
    console.log(newValue, oldValue)
  },

  {
    // 这里开启深度监听
    deep: true,
    // 这里开启立即执行
    immediate: true
  }
)
// 监听所有 拿过来就过来就能用 性能消耗大
watchEffect(() => {
  console.log(watchid.value)
})

onMounted(() => {
  console.log('switch测试 ==========》')
  nihao(0)
  nihao(1)
  nihao(5)
  nihao(6)

  console.log('sort（）===》 数组排列方法')
  console.log(arr)

  //  第一个参数是要监听的事件 第二个是要监听的函数  方法本身既可以用于单个元素的监听，也可以通过应用于全局对象如 window 来实现全局级别的监听。
  console.log('========》监听')
  addEventListener('click', clickA)
})
</script>
<style scoped lang="scss">
.article-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}
</style>
