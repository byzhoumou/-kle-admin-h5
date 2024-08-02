// Api存放地
// 接口函数存放
import { User, CodeType, UserInfo, PatientList, Patient } from '@/types/user'
import request from '@/utils/request'

// 密码登录封装请求函数                         定义参数数据类型
export const loginByPassword = (mobile: string, password: string) =>
  // 用request工具函数发请求有3个参数 请求地址 请求方式  提交的数据
  //   User数据类型返回的类型是Data<User>
  request<User>('login/password', 'POST', { mobile, password })

// 短信验证   sendMoblieCode
export const sendMobileCode = (mobile: string, type: CodeType) =>
  request('code', 'GET', { mobile, type })

// 短信登录
export const loginByMobile = (mobile: string, code: string) =>
  request<User>('login', 'POST', { mobile, code })

// 获取用户信息  没有传参
export const getUserInfo = () => request<UserInfo>('patient/myUser')

// 患者列表信息
export const getPatientList = () => request<PatientList>('patient/mylist')

// 添加患者
export const addPatient = (patient: Patient) => request('patient/add', 'POST', patient)

// 编辑患者
export const editPatient = (patient: Patient) => request('patient/update', 'PUT', patient)

// 删除患者
export const delPatient = (id: string) => request(`patient/del/${id}`, 'DELETE')

// 查询患者详情          这里的GET在封装的时候设置了默认所以可以省略    上面没写请求方式的也是一样
export const getPatientDetail = (id: string) => request<Patient>(`patient/info/${id}`)

// 数据库的操作
