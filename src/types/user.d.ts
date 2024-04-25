// types 存放的都是一些数据类型
// 用户信息类型
// 定义User的数据类型
export type User = {
  // token令牌
  token: string
  // 用户ID
  id: string
  // 用户名称
  account: string
  // 手机号
  mobile: string
  // 头像
  avatar: string
}
// 验证码类型
// login登录register注册changeMobile更换手机号forgetPassword找回密码,bindMobile绑定三方登录
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

// pick  和Omit TS的内置内型
//Pick 可以从一个对象类型中 取出某些属性 从类型对象中取出指定的属性类型
//Omit 可以从一个对象类型中 排出某些属性 从类型对象中排出指定的属性类型，得到剩余的
//                   User类型里排除token
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}

// 家庭档案-患者信息
export type Patient = {
  /** 患者ID */
  id?: string
  /** 患者名称 */
  name: string
  /** 身份证号 */
  idCard: string
  /** 0不默认  1默认 */
  defaultFlag: 0 | 1
  /** 0 女  1 男 */
  gender: 0 | 1
  /** 性别文字 */
  genderValue?: string
  /** 年龄 */
  age?: number
}

// 家庭档案-患者信息列表
export type PatientList = Patient[]

// 首页
