/**
 * Prettier 配置文件
 * @see https://prettier.io/docs/en/configuration.html
 */
export default {
  /**
   * 单行代码长度限制
   */
  printWidth: 100,

  /**
   * 缩进空格数
   */
  tabWidth: 2,

  /**
   * 使用空格缩进
   */
  useTabs: false,

  /**
   * 语句末尾添加分号
   */
  semi: true,

  /**
   * 使用单引号
   */
  singleQuote: true,

  /**
   * 对象属性添加引号
   * 'as-needed' - 仅在需要时添加
   */
  quoteProps: 'as-needed',

  /**
   * JSX 中使用单引号
   */
  jsxSingleQuote: false,

  /**
   * 尾随逗号
   * 'none' - 不使用尾随逗号
   */
  trailingComma: 'none',

  /**
   * 对象大括号内部添加空格
   */
  bracketSpacing: true,

  /**
   * 多行 HTML 元素 > 单独一行
   */
  bracketSameLine: false,

  /**
   * 箭头函数参数括号
   * 'always' - 始终添加括号
   */
  arrowParens: 'always',

  /**
   * 格式化范围
   * 'file' - 整个文件
   */
  rangeStart: 0,
  rangeEnd: Infinity,

  /**
   * 是否解析流式语法
   */
  requirePragma: false,
  insertPragma: false,

  /**
   * Markdown 换行符
   * 'consistent' - 保持一致
   */
  proseWrap: 'preserve',

  /**
   * HTML 空白敏感度
   * 'css' - 遵守 CSS display 属性
   */
  htmlWhitespaceSensitivity: 'css',

  /**
   * 行尾符
   * 'lf' - Unix 风格
   */
  endOfLine: 'lf',

  /**
   * 是否在 Vue 文件中格式化 <template>
   */
  vueIndentScriptAndStyle: false,

  /**
   * 单一属性时水平显示
   */
  singleAttributePerLine: false,

  /**
   * 嵌套打印宽度
   */
  embeddedLanguageFormatting: 'auto'
};
