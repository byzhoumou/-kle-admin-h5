/* eslint-env node */
// Eslint 配置代码风格
// 提示：安装Eskint且配置保存修复，不要同时间开启默认自动保存格式化
// prettier 风格配置 https://prettier.io  这个官网可以找到
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  // 格式:单引号，没有分号，行宽度100字符，没有对象数组最后一个逗号，换行字符串自动(系统不一样换行符号不一样)
  // vue 组件需要大驼峰命名，除去 index 之外，App 是默认支持的。
  // 允许对 props 进行解构，我们会开启解构保持响应式的语法糖
  rules: {
    "prettier/prettier": [
      "warn",
      {
        // 单引号
        singleQuote: true,
        // 不使用分号
        semi: false,
        // 宽度80字符
        printWidth: 80,
        // 不加对象 \ 数组最后的逗号
        trailingComma: "none",
        // 换行符号不限制(win mac 不一致)
        endOfLine: "auto",
      },
    ],

    // 控制回车行数的规则
    "no-multiple-empty-lines": [
      "warn",
      {
        max: "none", // 允许的最大空行数
      },
    ],
    // 具体而言，这个规则通常会建议或强制组件名称使用 PascalCase（驼峰命名法），即每个单词的首字母大写，而不使用破折号或下划线。
    "vue/multi-word-component-names": [
      "warn",
      {
        // (忽略index.vue 名字单词少的原因)
        ignores: ["index"],
      },
    ],
    // props解构（关闭）   让props可以解构
    "vue/no-setup-props-destructure": ["off"],
  },
};

// 开启Ts 托管模式
// @builtin  ty   找到这个插件 设置当前项目禁用（工作区）  底部边框出现（takeover）则托管开启
// npm run lint --fix    执行此代码全部格式化 就不会报错了
