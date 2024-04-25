// export {}
// 建议枚举定义在ts文件中， 应为它也参与运行
// 枚举： 一组可用的常量
// 需求： 0 1 2 3 上下左右

// enum Direction {
//   Up = 0,
//   Down = 1,
//   Left = 2,
//   Right = 3
// }

// 默认值是从0开始一次类推
// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right
// }

// 如果给了一个默认数字，一样的 这里是从5开始以此类推678
// enum Direction {
//   Up = 5,
//   Down,
//   Left,
//   Right
// }

// 也可以是字符串
// enum Direction {
//   Up = 'Up',
//   Down = 'Down',
//   Left = 'Left',
//   Right = 'Right'
// }
// const changDirection = (direction: Direction) => {
//   console.log(direction)
// }
// changDirection(Direction.Right)

// 问诊类型
export enum ConsultType {
  Doctor = 1,
  Fast = 2,
  Medication = 3
}
// 问诊时间
export enum IllnessTime {
  Week = 1,
  Month,
  HalfYear,
  More
}
