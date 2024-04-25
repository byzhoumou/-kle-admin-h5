<script setup lang="ts">
import { mobileRules, passwordRulse, codeRule } from '@/utils/rules'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
import { FormInstance, showSuccessToast, showToast } from 'vant'
import { ref, onUnmounted } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'

const mobile = ref('13230000001')
const password = ref('abc12345')

// 路由实例
const router = useRouter()
// 路由信息
const route = useRoute()
// agree 复选框的数据默认false不勾选
const agree = ref(false)
// 吧拿到的用户信息存储
const store = useUserStore()
// 登录按钮点击之后执行
const onsubmit = async () => {
  // 判断复选框有没有勾选没有勾选的话弹出提示
  if (!agree.value) return showToast('请勾选协议')
  // 进行登录
  // 请求函数 携带2个参数
  // 合并短信登录  使用三元表达如果isPass为真密码登录否则短信登录
  const res = isPass.value
    ? // 密码登录api
      await loginByPassword(mobile.value, password.value)
    : // 短信登录api
      await loginByMobile(mobile.value, code.value)
  // 本地储存用户信息
  store.setUser(res.data)
  // 轻提示
  showSuccessToast('登录成功')
  // 如果有回跳地址就进行回跳，没有跳转到个人中心
  router.replace((route.query.returnUrl as string) || '/user')
}

// 短信登录界面切换
const isPass = ref(true)
const code = ref('')

// 发送短信验证
const time = ref(0)
//定义form表单实例的数据
const form = ref<FormInstance>()
// 定时器的id
let timer: number

const onSend = async () => {
  //验证： 倒计时 手机号
  // 如果你正在倒计时那倒计时的时间一定是大于0的
  if (time.value > 0) return
  //  使用form表单 使用里面的validate函数传入你想校验表单项的名字
  await form.value?.validate('mobile')
  // 异步调用接口函数传出2个数据 mobile字段 和type的类型login
  await sendMobileCode(mobile.value, 'login')
  // 轻提示
  showToast('发送成功')
  // 发送验证码之后吧time的值设置为60
  time.value = 60
  // 开启定时器之前判断如果有定时器 调用clearInterval(timer)清理定时器
  if (timer) clearInterval(timer)
  // 开始倒计时
  timer = setInterval(() => {
    time.value--
    // 判断倒计时结束 然后搜清理定时器
    if (time.value <= 0) clearInterval(timer)
  }, 1000)
}
// 定时组件销毁 生命周期钩子函数
onUnmounted(() => {
  clearInterval(timer)
})
// 密码的可见与不可见
const isShow = ref(false)
</script>

<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>
        {{ isPass ? '密码登录' : '短信验证码登录' }}
      </h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单              表单检验成功之后会触发一个submit事件-->
    <!-- name的id选择 用来校验表单对应id的哪一项  如果不传name就就校验正个表单项  ref=form实例-->
    <van-form autocomplete="off" @submit="onsubmit" ref="form">
      <van-field
        name="mobile"
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <!-- rules表单规则校验属性 -->
      <!-- 判断当前ispass密码登录是否为真如果不是就短信登录 -->
      <van-field
        v-if="isPass"
        v-model="password"
        :rules="passwordRulse"
        placeholder="请输入密码"
        :type="isShow ? 'text' : 'password'"
      >
        <template #button>
          <cp-icon
            :name="`login-eye-${isShow ? 'on' : 'off'}`"
            @click="isShow = !isShow"
            style="margin-right: 10px"
          ></cp-icon>
        </template>
      </van-field>
      <van-field v-else :rules="codeRule" placeholder="短信验证码" v-model="code">
        <!-- #具名插槽插槽按钮 -->
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="onSend">{{
            time > 0 ? `${time}s再次发送` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <!-- button按钮不能触发表单校验 给他改成submi-->
        <van-button native-type="submit" block round type="primary">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录 </van-divider>
      <div class="icon">
        <img src="../../assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .login {
    &-page {
      height: 100hv;
      // padding-top: 46px;
    }
    &-head {
      display: flex;
      padding: 120px 30px 30px 50px;
      justify-content: space-between;
      align-items: flex-end;
      line-height: 1;
      h3 {
        font-weight: normal;
        font-size: 24px;
      }
      a {
        font-size: 15px;
      }
    }
    &-other {
      margin-top: 60px;
      padding: 0 30px;
      .icon {
        display: flex;
        justify-content: center;
        img {
          width: 36px;
          height: 36px;
          padding: 4px;
        }
      }
    }
  }
  .van-form {
    padding: 0 14px;

    .cp-cell {
      font-size: 12px;
      height: 52px;
      line-height: 24px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
    .btn-send {
      color: var(--cp-primary);
      &.active {
        color: rgba(22, 194, 163, 0.5);
      }
    }
  }
  :deep() {
    .van-checkbox__icon {
      font-size: 14px;
    }

    .van-button--normal {
      font-size: 16px;
    }
    .van-cell-vertical {
      padding: 14px;
    }
    .van-cell {
      padding: 14px;
    }
  }
}
</style>
