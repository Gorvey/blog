---
title: Vue Composition API 完全指南
description: 深入理解 Vue 3 Composition API 的使用场景和最佳实践
date: 2024-12-15
category: 前端开发
tags:
  - Vue
  - Composition API
  - 前端框架
---

## 什么是 Composition API

Composition API 是 Vue 3 引入的一套新的 API,它提供了一种更灵活的方式来组织组件逻辑。

### 核心优势

- 更好的逻辑复用
- 更清晰的代码组织
- 更好的 TypeScript 支持
- 更小的打包体积

## 基础 API

### ref 和 reactive

```javascript
import { ref, reactive } from 'vue';

// ref - 用于基本类型
const count = ref(0);
console.log(count.value); // 访问值
count.value++; // 修改值

// reactive - 用于对象
const state = reactive({
  count: 0,
  message: 'Hello'
});
console.log(state.count); // 直接访问,不需要 .value
state.count++; // 直接修改
```

### computed

```javascript
import { ref, computed } from 'vue';

const count = ref(0);

// 只读计算属性
const doubleCount = computed(() => count.value * 2);

// 可写计算属性
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ');
  }
});
```

### watch 和 watchEffect

```javascript
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);

// watch - 需要明确指定监听源
watch(count, (newValue, oldValue) => {
  console.log(`从 ${oldValue} 变为 ${newValue}`);
});

// 监听多个源
watch([count, another], ([newCount, newAnother]) => {
  console.log(newCount, newAnother);
});

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(`当前 count: ${count.value}`);
});

// watchPostEffect - DOM 更新后执行
watchPostEffect(() => {
  console.log('DOM 已更新');
});
```

## 生命周期钩子

```javascript
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载');
    });

    onUpdated(() => {
      console.log('组件已更新');
    });

    onUnmounted(() => {
      console.log('组件已卸载');
    });

    return {};
  }
};
```

## 组合式函数(Composables)

### 创建可复用逻辑

```javascript
// useMouse.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x, y };
}
```

### 使用组合式函数

```javascript
import { useMouse } from './useMouse';

export default {
  setup() {
    const { x, y } = useMouse();

    return { x, y };
  }
};
```

## 依赖注入

### provide 和 inject

```javascript
// 父组件
import { provide, ref } from 'vue'

export default {
  setup() {
    const theme = ref('light')

    provide('theme', theme)

    return { theme }
  }
}

// 子组件
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme', 'light') // 默认值 'light'

    return { theme }
  }
}
```

## 模板引用

```javascript
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const inputRef = ref(null);

    onMounted(() => {
      inputRef.value.focus();
    });

    return { inputRef };
  }
};
```

```html
<template>
  <input ref="inputRef" />
</template>
```

## 组件通信

### defineProps 和 defineEmits

```vue
<script setup>
const props = defineProps({
  title: String,
  count: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update', 'delete']);

function handleClick() {
  emit('update', props.count + 1);
}
</script>
```

### defineExpose

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}

// 暴露给父组件
defineExpose({
  count,
  increment
});
</script>
```

## 最佳实践

### 1. 按功能组织代码

```javascript
export default {
  setup() {
    // 功能 1: 鼠标位置
    const { x, y } = useMouse();

    // 功能 2: 用户信息
    const { user, fetchUser } = useUser();

    // 功能 3: 主题切换
    const { theme, toggleTheme } = useTheme();

    return {
      x,
      y,
      user,
      fetchUser,
      theme,
      toggleTheme
    };
  }
};
```

### 2. 使用 TypeScript

```typescript
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

const user = ref<User | null>(null);

function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then((res) => res.json());
}
```

### 3. 响应式对象的最佳实践

```javascript
// ✓ 推荐: 使用 ref
const count = ref(0);
const user = ref({ name: '张三' });

// ✗ 避免: 解构 reactive
const state = reactive({ count: 0 });
const { count } = state; // 失去响应性

// ✓ 正确: 使用 toRefs
import { toRefs } from 'vue';
const state = reactive({ count: 0 });
const { count } = toRefs(state);
```

## 总结

Composition API 提供了更灵活的代码组织方式:

- 使用 ref 和 reactive 创建响应式数据
- 使用 computed 创建计算属性
- 使用 watch 和 watchEffect 监听变化
- 使用组合式函数复用逻辑
- 使用 provide/inject 跨层级通信

掌握这些概念,你就能写出更优雅、更易维护的 Vue 3 代码!
