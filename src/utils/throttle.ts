// 节流函数全局封装  让函数不管你点击多少次都只执行固定频率的次数  （用途轮播图快速点击卡顿）
export const throttle = <F extends (...args: any[]) => void>(
  func: F,
  limit: number
): ((...args: Parameters<F>) => void) => {
  let lastCall = 0
  return function (...args: Parameters<F>) {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func(...args)
    }
  }
}
// 防抖函数全局封装   让函数不管你点击多少次只有最后一次执行  （用途搜索框搜索触发请求频率限制）
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null // 用于存储setTimeout返回的定时器ID

  return function (...args: Parameters<F>) {
    // 清除之前的定时器，防止执行多次
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    // 设置新的定时器
    timeoutId = setTimeout(() => {
      func(...args) // 延迟后执行传入的函数
    }, delay)
  }
}
