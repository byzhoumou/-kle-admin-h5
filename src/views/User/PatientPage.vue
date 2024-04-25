<script setup lang="ts">
import { addPatient, delPatient, editPatient, getPatientList } from '@/services/user'
import type { PatientList, Patient } from '@/types/user'
import { ref, onMounted } from 'vue'
import { nameRlues, idCardRluse } from '@/utils/rules'
import { FormInstance, showConfirmDialog, showSuccessToast, showToast } from 'vant'
import { useRoute } from 'vue-router'
import { useConsultStore } from '@/stores'
import router from '@/router'

// 组件挂载完毕，获取数据
const list = ref<PatientList>([])
const loadList = async () => {
  const res = await getPatientList()
  list.value = res.data
  // 默认选中患者
  // 判断 有isChange 且数组有长度 才执行下面操作
  if (isChange.value && list.value.length) {
    // find(）它的作用是查找数组中第一个满足提供的测试函数的元素。一旦找到这样的元素，find() 立即返回该元素的值，否则返回 undefined。这个方法不会改变原数组。
    // 在list 数组里用find()方法查找患者defaultFlag===1 的字段 并重新赋值给defPatient
    const defPatient = list.value.find((item) => item.defaultFlag === 1)
    // 如果有了defPatient这个字段   更新patienId的值为默认患者的id
    if (defPatient) patienId.value = defPatient.id
    // 如果没有找到默认患者，则将patienId的值设置为列表中第一个患者的id
    else patienId.value = list.value[0].id
  }
}
// 组件渲染完在调用里面的函数
onMounted(() => {
  loadList()
})
// 按钮的选项数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
// 控制popup
const show = ref(false)
const showPopup = (item?: Patient) => {
  if (item) {
    // 如果点的是编辑携带item，回填数据
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    // 重置表单校验
    form.value?.resetValidation()
    // 重新赋值数据  用于重置表单为空
    patient.value = { ...initPatient }
  }
  // 打开弹层 患者界面
  show.value = true
}
// 初始化数据类型
const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
//初始化数据类型     解构数据
const patient = ref<Patient>({ ...initPatient })

// 支持复选框
const defaultFlag = computed({
  get: () => (patient.value.defaultFlag === 1 ? true : false),
  set: (value) => (patient.value.defaultFlag = value ? 1 : 0)
})
// 进行提交
const form = ref<FormInstance>()
const onSubmit = async () => {
  // 表单整体校验 validate 进行校验 整体校验validate（这里就不需要传表单项的名字单独的校验要传）
  await form.value?.validate()
  // 性别校验
  // 取出身份证倒数第2位 %2之后 1男 0女
  const gender = +patient.value.idCard.slice(-2, -1) % 2
  if (gender !== patient.value.gender) {
    // 提示框
    await showConfirmDialog({
      title: '温馨提示',
      message: '填写的性别和身份证上的不一致\n您确认提交吗?'
    })
  }
  // 提交即可  添加或者编辑
  patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
  //  成功：关闭添加患者界面
  show.value = false
  // 加载患者列表
  loadList()
  // 成功提示
  showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
}
// 删除患者
const remove = async () => {
  if (patient.value.id) {
    // 确认框
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认删除 ${patient.value.name} 患者信息？`
    })
    // 删除请求
    await delPatient(patient.value.id)
    // 关闭患者信息页面
    show.value = false
    // 加载患者列表
    loadList()
    // 提示
    showSuccessToast('删除成功')
  }
}

// 导入路由
const route = useRoute()
// 定义一个计算属性isChange，用于检查URL中的查询参数`isChange`是否等于'1'
// 通过`route.query.isChange`访问到当前路由的查询参数`isChange`
// 使用严格等于'1'的字符串比较，确保只有当参数确切地为'1'时，返回true
// 否则，即使参数存在但不是'1'，也返回fal isChange值在路经views/consult/ConsultIllness第97行
const isChange = computed(() => route.query.isChange === '1')

// 选择效果
// 定义一个响应式引用（ref），这个引用将持有一个字符串类型的值。
// 这通常用于在Vue组件中保持一个响应式的状态。
const patienId = ref<string>()
// 定义一个函数，这个函数接受一个参数 item，参数类型为 Patient。
// 当这个函数被调用时，它将根据某个条件（isChange.value）来更新 patienId 的值。
const selectedPatient = (item: Patient) => {
  // 检查 isChange 的值是否为 true。isChange 是另一个响应式引用，
  // 它可能在这段代码之外被定义。如果是 true，表示有一些变化发生，
  // 需要更新 patienId 的值。
  if (isChange.value) {
    // 将 patienId 的值更新为传入的 item 的 id 属性的值。
    // 这里假设 item 对象有一个 id 属性，且 id 的类型与 patienId 能够兼容。
    patienId.value = item.id
  }
}
// 导入路由
const store = useConsultStore()
// 下一步
const next = () => {
  // 判断patienId 的值是否存在   // 如果 patienId 的值不存在，显示一个提示信息要求用户选择一个患者
  if (!patienId.value) return showToast('请选择患者')
  // 如果 patienId 的值存在 吧值传给仓库
  store.setPatient(patienId.value)

  // 跳转到咨询支付页面
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar :title="isChange ? '添加患者' : '家庭档案'"></cp-nav-bar>
    <!-- 头部提示   这段代码只在添加患者页面中显示 下面判断有有没ischange 有就显示没没就不显示此代码-->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in list"
        :key="item.id"
        @click="selectedPatient(item)"
        :class="{ selected: patienId === item.id }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}</span>
        </div>
        <!--              这里的.stop阻止点击编辑按钮的事件冒泡  -->
        <div class="icon" @click.stop="showPopup(item)">
          <cp-icon name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <!--                             这里点击添加患者调用showPopup打开popup组件 -->
      <div class="patient-add" v-if="list.length < 6" @click="showPopup()">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
      <!-- 底部按钮  这段代码只在添加患者页面中显示 下面判断有有没ischange 有就显示没没就不显示此代码 -->
      <div class="patient-next" @click="next" v-if="isChange">
        <van-button type="primary" round block>下一步</van-button>
      </div>
    </div>
    <!-- 使用 popup 组件 -->
    <van-popup position="right" v-model:show="show">
      <!-- 封装的头部组件    调用组件里的函数 back操作上面的show函数关闭popup -->
      <cp-nav-bar
        :title="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        :back="() => (show = false)"
        @click-right="onSubmit"
      ></cp-nav-bar>
      <van-form autocomplete="off" ref="form">
        <van-field
          v-model="patient.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :rules="nameRlues"
        />
        <van-field
          v-model="patient.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="idCardRluse"
        />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn v-model="patient.gender" :options="options"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" :icon-size="'15px'" round />
          </template>
        </van-field>
      </van-form>
      <!-- 删除按钮 -->
      <van-action-bar v-if="patient.id">
        <van-action-bar-button text="删除" @click="remove" />
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}

.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}

.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
