<script setup lang="ts">
import { IllnessTime } from '@/enums'
import { uploadImage } from '@/services/consult'
import { useConsultStore } from '@/stores'
import { ConsultIllness } from '@/types/consult'
import { showConfirmDialog } from 'vant'
import { UploaderFileListItem, showToast } from 'vant/es'
import { UploaderAfterRead } from 'vant/lib/uploader/types'
import { useRouter } from 'vue-router'
import { Image } from '@/types/consult'
// 选项数据
const timeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '半年以上', value: IllnessTime.More }
]

const flagOptions = [
  { label: '就诊过', value: 1 },
  { label: '没就诊过', value: 0 }
]
// 病情描述对象
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
// 上传图片
const fileList = ref<Image[]>([])
// 图片上传
// 定义一个处理上传后事件的函数，item参数代表上传的文件信息
const onAfterRead: UploaderAfterRead = (item) => {
  // 如果item是一个数组，则不进行任何操作。这可能是因为某些上传组件允许多文件上传，
  // 但在这个处理函数中，我们只处理单个文件的情况。
  if (Array.isArray(item)) return
  // 如果item中不存在file属性，也不进行任何操作。这是一个基本的有效性检查，
  // 确保我们有一个文件对象可以操作
  if (!item.file) return
  // 设置文件的上传状态为'uploading'，并显示一个消息给用户，告知他们上传正在进行中。
  item.status = 'uploading'
  item.message = '上传中...'
  // 调用uploadImage函数尝试上传文件，这个函数接受一个File对象作为参数。
  // 这里假设uploadImage是一个返回Promise的异步函数，它处理实际的上传逻辑
  uploadImage(item.file)
    .then((res) => {
      // 当文件上传成功时，更新状态为'done'，清除上传消息，并设置文件在服务器上的URL。
      // 这个URL是从上传函数返回的响应中获取的
      item.status = 'done'
      item.message = undefined
      item.url = res.data.url
      // 同步数据
      // 同步上传成功的文件数据到form.value.pictures数组中，这样做可以让其他部分
      // 的应用知道上传已完成，并可以访问上传的文件。
      // 使用?.操作符是为了确保form.value.pictures数组存在。
      form.value.pictures?.push(res.data)
    })
    .catch(() => {
      // 如果上传过程中出现错误，将状态设置为'failed'，并显示一个失败消息。
      item.status = 'failed'
      item.message = '上传失败'
    })
}
// 定义一个函数 onDeleteImg，用于处理图片的删除操作。
// 函数接收一个参数 item，这个参数是一个对象，代表要删除的图片项。
const onDeleteImg = (item: UploaderFileListItem) => {
  // 更新form.value.pictures数组，移除与要删除的图片项item具有相同URL的图片。
  // 使用?.操作符安全地访问form.value.pictures，以防它是undefined。
  // filter方法创建一个新数组，包含所有不满足条件的元素——即所有URL不等于item.url的图片。
  // 这样，被删除的图片就不会出现在新的pictures数组中。
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}

// 控制下一步按钮
//如果illnessDesc为空，或illnessTime或consultFlag任何一个为undefined
// 则disabled计算属性的值为true，意味着关联的操作应该被禁用。
const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
)

// 导入仓库.
const stoer = useConsultStore()
// 导入路由
const router = useRouter()
//选择提示
const next = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined) return showToast('请输入患病时间')
  if (form.value.consultFlag === undefined) return showToast('请输是否就诊过')
  // 记录病情
  stoer.setIllness(form.value)
  // 跳转，携带标识
  router.push('/user/patient?isChange=1')
}
// 组件挂载数据回显
// 使用onMounted生命周期钩子来确保以下代码块在组件挂载后执行。
onMounted(() => {
  // 首先检查store中是否有存储的病情描述（illnessDesc）信息。
  if (stoer.consult.illnessDesc) {
    // 首先检查store中是否有存储的病情描述（illnessDesc）信息。
    showConfirmDialog({
      title: '温馨提示', // 对话框标题
      message: '是否恢复之前填写的病情信息', // 对话框消息内容
      // 设置为false以确保对话框在浏览器历史状态变化时不会自动关闭
      closeOnPopstate: false
    }).then(() => {
      // 回显数据
      // 用户确认恢复信息后执行的操作
      // 从store中解构出之前保存的病情信息
      const { illnessDesc, illnessTime, consultFlag, pictures } = stoer.consult
      // 将这些信息赋值给表单的value，以实现数据的回显
      form.value = { illnessDesc, illnessTime, consultFlag, pictures }
      // 回显图片  这行代码的作用是将 pictures 数组赋值给 fileList 的 value 属性。如果 pictures 为 null、undefined 或其他假值，那么 fileList.value 将被设置为一个空数组 []。
      fileList.value = pictures || []
    })
  }
})
</script>
e

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe"><cp-icon name="consult-safe" /><span>内容仅医生可见</span></p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn :options="timeOptions" v-model="form.illnessTime" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn :options="flagOptions" v-model="form.consultFlag" />
      </div>
      <!-- 上传组件 -->
      <div class="illness-img">
        <van-uploader
          upload-icon="photo-o"
          upload-text="上传图片"
          :max-count="9"
          :max-size="5 * 1024 * 1024"
          v-model="fileList"
          :after-read="onAfterRead"
          @delete="onDeleteImg"
        ></van-uploader>
        <p class="tip" v-if="!fileList.length">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>
      <!-- 下一步 -->
      <van-button @click="next" :class="{ disabled }" type="primary" block round>下一步</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>
