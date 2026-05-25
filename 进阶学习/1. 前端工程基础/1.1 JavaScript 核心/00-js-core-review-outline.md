# JavaScript 核心快速复习大纲

这个文件用于快速回忆 JavaScript 核心能力，不追求细节推导，重点是知道每个模块在解决什么问题，以及常用函数/方法的作用。

## 01. 运行环境与调试

### 模块作用

- JavaScript 运行在浏览器或 Node.js 中。
- 浏览器里的 JS 主要负责页面交互、数据处理、接口请求、DOM 操作。
- 浏览器环境由 JS 引擎和 Web API 组成，常见 Web API 包括 DOM、事件、定时器、网络请求等。

### 常用函数/方法

- `console.log(value)`：普通输出，用于查看变量和执行结果。
- `console.warn(value)`：输出警告信息。
- `console.error(value)`：输出错误信息。
- `console.table(arrayOrObject)`：用表格形式查看数组或对象。
- `console.time(label)`：开始计时。
- `console.timeEnd(label)`：结束计时并输出耗时。
- `alert(message)`：弹出提示框。
- `confirm(message)`：弹出确认框，返回 `true` 或 `false`。
- `prompt(message)`：弹出输入框，返回用户输入内容。
- `setTimeout(fn, delay)`：延迟执行一次函数。
- `clearTimeout(timerId)`：取消 `setTimeout`。
- `setInterval(fn, delay)`：按固定间隔重复执行函数。
- `clearInterval(timerId)`：取消 `setInterval`。
- `requestAnimationFrame(fn)`：在浏览器下一次重绘前执行，常用于动画。
- `cancelAnimationFrame(id)`：取消动画帧任务。

## 02. 变量、数据类型与类型转换

### 模块作用

- 变量用于保存数据。
- 数据类型决定了数据能做什么操作。
- JS 有原始类型和引用类型，理解它们是判断赋值、比较、函数传参的基础。

### 核心概念

- `let`：声明可重新赋值的变量。
- `const`：声明不可重新赋值的常量。
- `var`：旧写法，有函数作用域和变量提升问题，现代项目少用。
- 原始类型：`string`、`number`、`boolean`、`undefined`、`null`、`symbol`、`bigint`。
- 引用类型：`object`、`array`、`function`、`date`、`regexp` 等。

### 常用函数/方法

- `typeof value`：判断基本类型，返回字符串。
- `value instanceof Constructor`：判断对象是否来自某个构造函数。
- `Array.isArray(value)`：判断是否为数组。
- `Number(value)`：把值转成数字。
- `String(value)`：把值转成字符串。
- `Boolean(value)`：把值转成布尔值。
- `parseInt(value, radix)`：把字符串解析成整数。
- `parseFloat(value)`：把字符串解析成小数。
- `Number.isNaN(value)`：判断是否为真正的 `NaN`。
- `Number.isFinite(value)`：判断是否为有限数字。
- `Object.is(a, b)`：更严格地比较两个值是否相同。

## 03. 运算符与流程控制

### 模块作用

- 运算符用于计算、比较、赋值、组合逻辑。
- 流程控制决定代码按什么条件、什么顺序执行。

### 核心概念

- 算术运算：`+`、`-`、`*`、`/`、`%`、`**`。
- 比较运算：`>`、`<`、`>=`、`<=`、`==`、`===`。
- 逻辑运算：`&&`、`||`、`!`。
- 空值合并：`??`，左侧是 `null` 或 `undefined` 时才使用右侧。
- 可选链：`?.`，安全访问可能不存在的属性。
- 三元表达式：`condition ? a : b`。
- 条件判断：`if`、`else if`、`else`、`switch`。
- 循环：`for`、`while`、`do...while`、`for...of`、`for...in`。
- 异常处理：`try...catch...finally`。

### 常用语句

- `break`：跳出当前循环或 `switch`。
- `continue`：跳过本轮循环，进入下一轮。
- `return`：结束函数并返回结果。
- `throw new Error(message)`：主动抛出错误。

## 04. 函数、作用域与 this

### 模块作用

- 函数用于封装可复用逻辑。
- 作用域决定变量在哪里能被访问。
- `this` 决定函数运行时指向谁，是理解事件、对象方法、类的关键。

### 核心概念

- 函数声明：`function fn() {}`。
- 函数表达式：`const fn = function () {}`。
- 箭头函数：`const fn = () => {}`。
- 参数：函数接收的输入。
- 返回值：函数处理后的输出。
- 默认参数：`function fn(name = '默认值') {}`。
- 剩余参数：`function fn(...args) {}`。
- 作用域：全局作用域、函数作用域、块级作用域。
- 闭包：函数记住它定义时所在的作用域。
- `this`：普通函数由调用方式决定，箭头函数继承外层 `this`。

### 常用函数/方法

- `fn()`：直接调用函数。
- `fn.call(thisArg, a, b)`：指定 `this` 并逐个传参调用。
- `fn.apply(thisArg, [a, b])`：指定 `this` 并用数组传参调用。
- `fn.bind(thisArg)`：返回一个绑定了 `this` 的新函数。
- `arguments`：普通函数中的类数组参数集合。

## 05. 对象、原型与类

### 模块作用

- 对象用于描述复杂数据。
- 原型链是 JS 对象继承机制的基础。
- `class` 是构造函数和原型的语法糖，更适合组织复杂对象。

### 核心概念

- 对象字面量：`const user = { name: '小明' }`。
- 属性访问：`user.name` 和 `user['name']`。
- 方法：对象里的函数。
- 解构赋值：`const { name } = user`。
- 展开语法：`const newUser = { ...user }`。
- 原型：对象共享方法的机制。
- 原型链：对象查找属性时会沿着原型一层层查找。
- 构造函数：用 `new` 创建对象的函数。
- 类：`class User { constructor() {} }`。

### 常用函数/方法

- `Object.keys(obj)`：获取对象所有可枚举属性名。
- `Object.values(obj)`：获取对象所有可枚举属性值。
- `Object.entries(obj)`：获取对象键值对数组。
- `Object.fromEntries(entries)`：把键值对数组转回对象。
- `Object.assign(target, source)`：合并对象属性。
- `Object.create(proto)`：以指定原型创建对象。
- `Object.freeze(obj)`：冻结对象，不能增删改属性。
- `Object.seal(obj)`：密封对象，不能增删属性，但可改已有属性。
- `Object.hasOwn(obj, key)`：判断对象自身是否有某个属性。
- `obj.hasOwnProperty(key)`：旧写法，判断自身属性。

## 06. 数组与数据处理

### 模块作用

- 数组用于保存列表数据。
- 前端业务里大量操作都是把接口返回的数组筛选、转换、排序、统计后展示到页面。

### 常用函数/方法

- `array.push(item)`：向末尾添加元素。
- `array.pop()`：删除并返回末尾元素。
- `array.unshift(item)`：向开头添加元素。
- `array.shift()`：删除并返回开头元素。
- `array.slice(start, end)`：截取数组，不修改原数组。
- `array.splice(start, deleteCount, ...items)`：增删改数组，会修改原数组。
- `array.map(fn)`：把每一项转换成新数组。
- `array.filter(fn)`：筛选符合条件的项。
- `array.find(fn)`：找到第一个符合条件的项。
- `array.findIndex(fn)`：找到第一个符合条件项的索引。
- `array.some(fn)`：判断是否至少有一项符合条件。
- `array.every(fn)`：判断是否所有项都符合条件。
- `array.reduce(fn, initialValue)`：累加、统计、分组、转换复杂结构。
- `array.forEach(fn)`：遍历数组，适合执行副作用。
- `array.includes(value)`：判断是否包含某个值。
- `array.indexOf(value)`：查找元素索引，找不到返回 `-1`。
- `array.join(separator)`：把数组拼成字符串。
- `array.sort(fn)`：排序，会修改原数组。
- `array.reverse()`：反转数组，会修改原数组。
- `array.flat(depth)`：拍平嵌套数组。
- `array.flatMap(fn)`：先 `map` 再 `flat(1)`。

## 07. 字符串、数字、日期与数学工具

### 模块作用

- 字符串用于处理文本。
- 数字和数学工具用于计算。
- 日期用于处理时间展示、筛选、排序。

### 字符串常用方法

- `str.length`：字符串长度。
- `str.trim()`：去除首尾空格。
- `str.includes(keyword)`：判断是否包含关键字。
- `str.startsWith(prefix)`：判断是否以某内容开头。
- `str.endsWith(suffix)`：判断是否以某内容结尾。
- `str.indexOf(keyword)`：查找位置，找不到返回 `-1`。
- `str.slice(start, end)`：截取字符串。
- `str.substring(start, end)`：截取字符串，不支持负数。
- `str.replace(oldValue, newValue)`：替换第一个匹配内容。
- `str.replaceAll(oldValue, newValue)`：替换全部匹配内容。
- `str.split(separator)`：按分隔符拆成数组。
- `str.toUpperCase()`：转大写。
- `str.toLowerCase()`：转小写。

### 数字与数学常用方法

- `num.toFixed(count)`：保留指定小数位，返回字符串。
- `Math.round(num)`：四舍五入。
- `Math.floor(num)`：向下取整。
- `Math.ceil(num)`：向上取整。
- `Math.trunc(num)`：去掉小数部分。
- `Math.max(...nums)`：取最大值。
- `Math.min(...nums)`：取最小值。
- `Math.random()`：生成 `[0, 1)` 随机数。
- `Math.abs(num)`：取绝对值。
- `Math.pow(a, b)`：计算 `a` 的 `b` 次方。
- `Math.sqrt(num)`：计算平方根。

### 日期常用方法

- `new Date()`：创建当前时间。
- `new Date(value)`：根据字符串、时间戳等创建时间。
- `date.getFullYear()`：获取年份。
- `date.getMonth()`：获取月份，范围是 `0-11`。
- `date.getDate()`：获取月份中的日期。
- `date.getDay()`：获取星期，范围是 `0-6`。
- `date.getHours()`：获取小时。
- `date.getMinutes()`：获取分钟。
- `date.getSeconds()`：获取秒。
- `date.getTime()`：获取时间戳。
- `Date.now()`：获取当前时间戳。
- `date.toLocaleString()`：本地化日期时间字符串。
- `date.toISOString()`：ISO 格式时间字符串。

## 08. DOM 操作

### 模块作用

- DOM 是浏览器把 HTML 解析成的对象树。
- JS 操作 DOM，本质上就是查找元素、修改内容、修改样式、增删节点。

### 常用函数/方法

- `document.querySelector(selector)`：获取第一个匹配元素。
- `document.querySelectorAll(selector)`：获取所有匹配元素。
- `document.getElementById(id)`：通过 id 获取元素。
- `document.createElement(tagName)`：创建元素。
- `element.textContent`：读取或设置纯文本。
- `element.innerHTML`：读取或设置 HTML 内容。
- `element.value`：读取或设置表单值。
- `element.classList.add(className)`：添加类名。
- `element.classList.remove(className)`：删除类名。
- `element.classList.toggle(className)`：切换类名。
- `element.classList.contains(className)`：判断是否有类名。
- `element.setAttribute(name, value)`：设置属性。
- `element.getAttribute(name)`：获取属性。
- `element.removeAttribute(name)`：删除属性。
- `parent.appendChild(child)`：追加子元素。
- `parent.removeChild(child)`：删除子元素。
- `element.remove()`：删除当前元素。
- `element.closest(selector)`：向上查找最近的匹配祖先元素。
- `element.dataset`：读取 `data-*` 自定义属性。

## 09. 事件

### 模块作用

- 事件用于响应用户操作。
- 前端交互的核心就是监听事件，然后执行对应逻辑。

### 核心概念

- 事件源：触发事件的元素。
- 事件类型：如 `click`、`input`、`change`、`submit`。
- 事件对象：事件发生时浏览器传入的参数。
- 事件冒泡：事件从目标元素向父元素传播。
- 事件委托：把子元素事件统一交给父元素处理。

### 常用函数/方法

- `element.addEventListener(type, handler)`：绑定事件监听。
- `element.removeEventListener(type, handler)`：移除事件监听。
- `event.preventDefault()`：阻止默认行为。
- `event.stopPropagation()`：阻止事件继续冒泡。
- `event.target`：真正触发事件的元素。
- `event.currentTarget`：当前绑定事件的元素。
- `form.submit()`：提交表单。
- `input.focus()`：让输入框获得焦点。
- `input.blur()`：让输入框失去焦点。

## 10. 异步编程

### 模块作用

- 异步用于处理不会立刻完成的任务，如定时器、接口请求、文件读取、地图数据加载。
- 现代前端主要用 `Promise` 和 `async/await` 写异步逻辑。

### 核心概念

- 同步：代码一行一行执行。
- 异步：任务先挂起，完成后再回来执行回调。
- 回调函数：把函数作为参数传给另一个函数。
- `Promise`：表示一个未来会完成或失败的任务。
- `async`：声明异步函数。
- `await`：等待 Promise 完成。
- 宏任务：如 `setTimeout`、`setInterval`。
- 微任务：如 `Promise.then`。

### 常用函数/方法

- `new Promise((resolve, reject) => {})`：创建 Promise。
- `resolve(value)`：把 Promise 状态变成成功。
- `reject(error)`：把 Promise 状态变成失败。
- `promise.then(fn)`：处理成功结果。
- `promise.catch(fn)`：处理失败结果。
- `promise.finally(fn)`：无论成功失败都执行。
- `Promise.resolve(value)`：创建成功的 Promise。
- `Promise.reject(error)`：创建失败的 Promise。
- `Promise.all(promises)`：等待全部成功，一个失败就失败。
- `Promise.allSettled(promises)`：等待全部结束，不管成功失败。
- `Promise.race(promises)`：谁先结束就用谁的结果。
- `Promise.any(promises)`：谁先成功就用谁的结果。
- `fetch(url, options)`：浏览器内置网络请求函数。
- `response.json()`：把响应体解析成 JSON。
- `response.text()`：把响应体解析成文本。

## 11. 模块化

### 模块作用

- 模块化用于拆分代码。
- 一个文件负责一类能力，通过导入导出组合成项目。
- Vue、Vite、OpenLayers、Cesium 项目都会大量使用模块化。

### 常用语法

- `export const name = value`：命名导出。
- `export function fn() {}`：导出函数。
- `export default value`：默认导出。
- `import { name } from './module.js'`：导入命名导出。
- `import value from './module.js'`：导入默认导出。
- `import * as module from './module.js'`：把全部导出作为一个对象导入。

## 12. JSON 与本地存储

### 模块作用

- JSON 是前后端传输数据最常用的格式。
- 本地存储用于在浏览器里保存少量数据，如 token、用户设置、草稿状态。

### 常用函数/方法

- `JSON.stringify(value)`：把对象或数组转成 JSON 字符串。
- `JSON.parse(jsonString)`：把 JSON 字符串转回对象或数组。
- `localStorage.setItem(key, value)`：持久保存字符串。
- `localStorage.getItem(key)`：读取字符串。
- `localStorage.removeItem(key)`：删除某个值。
- `localStorage.clear()`：清空本地存储。
- `sessionStorage.setItem(key, value)`：会话级保存字符串。
- `sessionStorage.getItem(key)`：读取会话级数据。

## 13. 正则表达式

### 模块作用

- 正则用于文本匹配、格式校验、替换、提取。
- 表单校验、字段清洗、URL 参数处理时常用。

### 常用函数/方法

- `/pattern/.test(str)`：判断字符串是否匹配。
- `str.match(regexp)`：返回匹配结果。
- `str.replace(regexp, newValue)`：按正则替换内容。
- `str.split(regexp)`：按正则拆分字符串。
- `regexp.exec(str)`：执行匹配并返回详细结果。

## 14. 常见 WebGIS 场景里的 JS 用法

### 模块作用

- WebGIS 开发里 JS 负责地图初始化、图层控制、空间数据处理、交互事件、接口请求。

### 常见能力

- 用对象描述地图配置。
- 用数组保存图层、点位、行政区数据。
- 用 `map/filter/reduce` 处理空间要素列表。
- 用 `fetch` 请求 GeoJSON、瓦片服务、业务接口。
- 用事件监听处理点击地图、选择要素、切换图层。
- 用模块化拆分地图初始化、图层管理、工具函数。

### 常见函数/方法方向

- `initMap()`：初始化地图实例。
- `createLayer(config)`：根据配置创建图层。
- `addLayer(layer)`：添加图层。
- `removeLayer(layer)`：移除图层。
- `toggleLayerVisible(layer, visible)`：切换图层显示隐藏。
- `loadGeoJSON(url)`：请求并加载 GeoJSON 数据。
- `handleMapClick(event)`：处理地图点击事件。
- `formatCoordinate(coordinate)`：格式化坐标显示。
- `filterFeatures(features, condition)`：筛选空间要素。

## 15. 复习优先级

如果时间很紧，优先复习下面这些：

1. `let` / `const`、数据类型、类型转换。
2. 函数、箭头函数、作用域、`this`。
3. 对象和数组，尤其是 `map`、`filter`、`reduce`。
4. DOM 查询、内容修改、事件监听。
5. `Promise`、`async/await`、`fetch`。
6. `export` / `import` 模块化。

