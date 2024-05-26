// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
}
// module.exports = {
//   plugins: [
//     require('autoprefixer')
//     // 其他插件
//   ]
// }
