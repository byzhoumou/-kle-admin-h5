import {
  ConsultOrderPreData,
  DoctorPage,
  FollowType,
  Image,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  PartialConsult,
  TopDep,
  consultOrderPreParams
} from '@/types/consult'
import request from '@/utils/request'

// 首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表请求函数
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('patient/home/knowledge', 'GET', params)

// 关注的医生列表请求函数
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('home/page/doc', 'GET', params)

// 关注操作的接口请求函数                        这里意思是默认doc也可以是type里面其他值 这种写法可以省略第2个参数
export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request('like', 'POST', { id, type })

// 所有科室的请求函数
export const getAllDep = () => request<TopDep[]>('dep/all')

// 上传图片请求函数
//// 定义一个函数 uploadImage，用于上传图片文件
// 函数接收一个 File 类型的参数 file，表示要上传的文件
export const uploadImage = (file: File) => {
  // 创建一个新的 FormData 实例
  // FormData 用于构建键值对形式的数据，适合用于AJAX请求发送数据
  const fd = new FormData()
  // 向 FormData 实例中添加数据
  // 第一个参数 'file' 是数据的键名
  // 第二个参数 file 是实际的文件对象，代表要上传的图片
  fd.append('file', file)
  // 调用 request 函数发起网络请求，上传图片
  // 'upload' 是请求的目标资源路径
  // 'POST' 是请求使用的方法，表示数据将被上传到服务器
  // fd 是包含文件数据的 FormData 对象，作为请求的一部分发送
  // 函数返回一个类型为 Image 的Promise对象，可能是上传后的图片信息或响应结果
  return request<Image>('upload', 'POST', fd)
}

// 预支付请求函数
export const getConsultOrderPre = (params: consultOrderPreParams) =>
  request<ConsultOrderPreData>('patient/consult/order/pre', 'GET', params)

// 生成问诊订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('patient/consult/order', 'POST', data)
