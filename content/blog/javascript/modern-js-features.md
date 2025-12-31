---
title: 现代 JavaScript 特性详解
description: 深入了解 ES6+ 新特性,掌握现代 JavaScript 开发
date: 2024-12-18
category: 前端开发
tags:
  - JavaScript
  - ES6+
  - 前端
---

## let 和 const

ES6 引入了两个新的变量声明关键字:`let` 和 `const`。

```javascript
// let - 可变的块级作用域变量
let count = 0
count = 1

// const - 不可重新赋值
const PI = 3.14159
// PI = 3 // 错误:不能重新赋值

// 块级作用域
{
  let blockScoped = '只在块内可见'
  const alsoBlockScoped = '同样只在块内可见'
}
```

## 箭头函数

箭头函数提供了更简洁的函数语法:

```javascript
// 传统函数
function add(a, b) {
  return a + b
}

// 箭头函数
const add = (a, b) => a + b

// 单参数可省略括号
const double = x => x * 2

// 多行函数体
const greet = name => {
  const message = `Hello, ${name}!`
  console.log(message)
  return message
}
```

## 解构赋值

### 数组解构

```javascript
const numbers = [1, 2, 3, 4, 5]

const [first, second, ...rest] = numbers
console.log(first) // 1
console.log(second) // 2
console.log(rest) // [3, 4, 5]

// 交换变量
let a = 1
let b = 2
;[a, b] = [b, a]
```

### 对象解构

```javascript
const user = {
  name: '张三',
  age: 25,
  city: '北京'
}

const { name, age, city } = user
console.log(name) // '张三'

// 解构重命名
const { name: userName, age: userAge } = user

// 默认值
const { country = '中国' } = user
```

## 模板字符串

```javascript
const name = '李四'
const age = 30

// 多行字符串
const message = `
  你好,${name}!
  今年 ${age} 岁。
`

// 表达式插值
const result = `2 + 3 = ${2 + 3}` // "2 + 3 = 5"
```

## 扩展运算符

```javascript
// 数组展开
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5, 6]
console.log(arr2) // [1, 2, 3, 4, 5, 6]

// 对象展开
const obj1 = { a: 1, b: 2 }
const obj2 = { ...obj1, c: 3 }
console.log(obj2) // { a: 1, b: 2, c: 3 }

// 函数参数
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0)
}
console.log(sum(1, 2, 3, 4)) // 10
```

## Promise 和 async/await

### Promise

```javascript
// 创建 Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('数据获取成功')
    }, 1000)
  })
}

// 使用 Promise
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

### async/await

```javascript
// async 函数
async function getData() {
  try {
    const data = await fetchData()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// 箭头 async 函数
const getDataAsync = async () => {
  const result = await fetchData()
  return result
}
```

## 类(Class)

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // 实例方法
  greet() {
    return `你好,我是 ${this.name}`
  }

  // 静态方法
  static createAnonymous() {
    return new Person('匿名', 0)
  }
}

// 继承
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age)
    this.grade = grade
  }

  study() {
    return `${this.name} 正在学习`
  }
}
```

## 模块化

```javascript
// 导出
// utils.js
export const add = (a, b) => a + b
export const multiply = (a, b) => a * b
export default Math

// 导入
import Math, { add, multiply } from './utils'
```

## 可选链操作符

```javascript
const user = {
  name: '王五',
  address: {
    city: '上海'
  }
}

// 安全访问嵌套属性
const city = user?.address?.city
const zip = user?.address?.zip // undefined

// 可选链调用函数
const result = user.getAddress?.()
```

## 空值合并操作符

```javascript
const value = null ?? '默认值' // '默认值'
const value2 = 0 ?? '默认值' // 0
const value3 = '' ?? '默认值' // ''

// 与 || 的区别
const a = 0 || '默认' // '默认'
const b = 0 ?? '默认' // 0
```

## 总结

现代 JavaScript 提供了许多强大的特性,让代码更简洁、更易维护。掌握这些特性对于现代前端开发至关重要。

继续学习,探索更多 JavaScript 的高级特性!
