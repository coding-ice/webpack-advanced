# 背景

> `webpack`静态模块化打包工具。无论是前端工程化，还是高级前端岗位都是绕不开的话题之一，面试经常问到构建优化的的方案，自定义`loader`，自定义`plugin`等。无论是进阶，还是面试高级岗位，在这里你都可以找到答案。`webpack`简单来说就是各种令人眼花缭乱的配置，笔者也是感同身受，学了很快就会忘记，所以才有了这篇文章。采用`费曼学习法`，用简洁的思想和简单的语言向大家表达出来，帮助大家也是帮助自己，本文的学习资料大部分来自于官方文档。本文将持续迭代，收藏`===`学会～


## 安装
```shell
pnpm init
# 安装依赖
pnpm i webpack webpack-cli -D
```
## 结构划分
代码仓库：https://github.com/GetWebHB/webpack-advanced
- 每一个小的章节，都会存放在对应的文件夹中（例：`0.start`），文件夹会存放对应的**配置文件**,**源代码**，**产物**。打包命令如下所示，`npm run build`
```js
// src/0.start/package.json
"scripts": {
  "build": "webpack",
},
```
`scripts`脚本，本质上就只在`.bin`文件夹下寻找webpack, 即`npm run build`等同于`npx webpack`，默认会去存在`package.json`(即根目录查找配置文件`webpack.config.js`) ，它的`filename`可以更改,`--config filename`即可。**只要修改了配置文件，就需要重启服务** 
**目录结构**
```
├── README.MD
├── package-lock.json
├── package.json
└── src
    ├── 0.start
    │   ├── build
    │   │   └── bundle.js
    │   ├── package.json
    │   ├── pnpm-lock.yaml
    │   ├── src
    │   │   └── main.js
    │   └── webpack.config.js
```
`src`下是每个小节的代码，`cd`当前的小节，执行`pnpm install / npm run build`即可
## 起手式
本节代码见：`0.start`

```js
// main.js
function sayHi() {
  console.log('hi ice 24')
}
sayHi()
export { sayHi }

// webpack.config.js
const { resolve } = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
}

```
- 简单走读一下，`cjs`的方式导出了一个对象
1. `entry`代表入口，默认情况下相对路径为`package.json`存在的目录
2. `output`代表出口，即产物打包后的位置，同样是绝对路径，打包到`build`的文件夹下，文件名为`bundle.js`
3. `npm run build`, 即打包产物，就会发现该目录下出现了产物
## mode&devtool
本节代码见：`1.mode_devtool`  
上一小节中，我们学习到了`entry`,`output`这两项配置，这一章节中，我们学习`mode`和`devtool`  
### mode
概述：告诉webpack使用相应模式的内置优化  
当我们执行`npm run build`的时候，`webpack`会有这一串警告，说我们没有设置`mode`
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eee36533672c4c66aa9554840223f861~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1834&h=654&s=117215&e=png&b=282c34)
那什么是模式（即`mode`）,从提示看说我们可以设置为`development`or`production`   
**传送门**：https://webpack.js.org/configuration/mode/

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f9da85311ab4182bdbb7dc6c66fe054~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1466&h=748&s=148322&e=png&b=fcfcfc)
mode也是最重要的优化，`webpack`都会帮我们做好。接下来我们来一一了解对应模式展示的不同行为
- `mode` = `'none' | 'development' | 'production'(default)`
```js
// main.js
const mes = 'hi ice 24'
function sayHi() {
  console.log(mes)
}
sayHi()

export { sayHi }
```
#### none 
**产物分析**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13df19b8e0364eca89c28f9069f188f7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1368&h=1264&s=420317&e=png&b=292d35)
- 我们大致扫一眼即可

#### development
我们平常使用的`cli`, `vue/cli`(维护阶段)，`create-react-app`等，反正所有底层使用`webpack`的，`npm run serve / npm run start`这种在本地开启服务的，采用的策略都是使用`development`，主打的就是一个快，不需要通过一些`plugin`，例如`terser`（后面会讲）丑化压缩代码  
**产物分析**
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/564682dee1804992b3dc15ed1fb27d80~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2340&h=1242&s=387998&e=png&b=292d35)
从注释中我们可以得知，它使用`eval`函数可以在浏览器的开发工具中创建一个单独的源文件，在或者说`devtool`:`false`的时候就会移除（`source map`），那么创建一个单独的文件可以干嘛呢？可以映射到代码报错的位置，这也是`devtool`配置项的作用，我们后面会详细探讨。
#### production
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6da8af3c951a42fca16ae03ab7b5ec80~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=912&h=456&s=26353&e=png&b=292d35)
就是那么朴实无华，甚至连`函数`都帮你执行了，直接打印出结果
### devtool
概述：是否生成，控制如何生成source map(源码映射)，不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。  
**默认值**
- `dev: eval`  
- `prod: none`  
**传送门**：https://webpack.docschina.org/configuration/devtool/

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bf78e8eb6a14de2b6b5c2df926a3aef~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1484&h=936&s=115197&e=png&b=fbfbfb)
这幅图比较重要，介绍了该配置项的性能怎样，是否使用于`production`中，以及构建的速度如何
- 在`mode`模式为`development`中，我们看见了`eval`函数，可以映射出代码的错误位置信息，即配置为`mode: "eval"`，现在让我们来深入探讨一下`devtool`  

就拿`mode:prod`来说，我们发现代码是已经被丑化过，编译后的产物，如果在测试阶段，代码发生了错误压根不知道代码出错在哪里，那我们如何`debug`呢？这正是`source map`的作用，编译后的产物 ->（映射）源代码的位置   
#### false
```js
// main.js
const mes = 'hi ice 24'
function sayHi() {
  console.log(mes)
}
console.log(age) // age is not defined
sayHi()

export { sayHi }

// bundle.js
(()=>{"use strict";console.log(age),console.log("hi ice 24")})();
```
跑到浏览器上（测试阶段），我们可以看到错误信息，但是却看不到代码详细出错在第几行，这在一个庞大的项目中，是非常致命的（即`devtool: false`）,不开启`source map`


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3fa173da4744f9ba47dfcaccfcbce79~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1150&h=178&s=27161&e=png&b=fef8f8)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bcf8157212d4b109c87ae4408613815~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=884&h=34&s=12059&e=png&b=fefdfd)
#### eval
使用`eval`函数可以在浏览器的开发工具中创建一个单独的`source map`

#### source-map
当我们配置改为它，我们先看下产物

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeea7e0b0e9745a98c48778e76bc976d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1584&h=588&s=109640&e=png&b=272b32)
会多出来一个.map的文件，即源码映射文件，最后一行代表着引用哪个.map文件，接下来我们在到浏览器下看下行为。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d1334a74c42429fa2b22212c10c7c7c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1638&h=322&s=22788&e=png&b=fefafa)
竟然神奇的映射出来了源代码的位置（第几行，甚至第几个字符），非常的神奇是吧

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73fbc31fcfa44dc48ee8ae834a609a4c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=638&h=346&s=34665&e=png&b=fffbfb)  
接下来，让我们继续深入探究，简单看下`map`文件

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27b9d0dbcfa44df88d310b7cdd709964~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2112&h=356&s=78981&e=png&b=292d35)
- version：3，从之前1，2的版本构建出来的map文件有点大，随着不断的迭代构建出来的`.map`文件也越来小
- file：映射的源文件（转换后的源文件）
- mappings：记录位置信息的字符串（VLQ编码）
- sources：源的路径
- sourcesContent：源代码的内容
- names：转换前的所有变量名和属性名
- sourceRoot：映射目录的位置，为根目录
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/445d5faa0e304a28bf682b5e11003f20~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1026&h=752&s=79779&e=png&b=ffffff)
#### 最佳实践
- prod：`none(默认) | false`
- test：`source-map`
- development: `source-map`

## babel
本节代码见：`2.babel`  
babel你可能不太了解（因为`cli`全部帮我们做好了,配置`presets`），但是它现在是前端工程化必不缺少的一部分，它的本质就是一个
**编译器**，把A源代码转换为B源代码。更通俗的说：把`ES6+`的代码转换为`ES5`的代码，可以适配版本更低的浏览器

```mermaid
graph LR
ES6+-- babel --->ES5
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60f136fb077b4865ab68cdbc32d81940~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2196&h=646&s=156157&e=png&b=282c34)
过程大致分为3个阶段
1. 解析阶段
    - 词法分析，语法分析，生成ast树（抽象语法树）
2. 转换阶段
    - 转换为新的ast树
3. 生成阶段

### 基础使用
基础使用，我们不再讲解，直接看官网即可，还是比较简单的，它可以在终端直接使用，因为提供了对应的`CLI`工具
- 传送门：https://babel.docschina.org/docs/usage
### webpack中使用
```js
// main.js ES6代码
let mes = 'hi ice'
console.log(mes.toUpperCase())
console.log(mes.slice(0, 2))

const double = [1, 2, 3].map((num) => num * 2)
console.log(double) // [2,4,6]
```
安装开发时依赖，插件作用分别是  
1. 转换箭头函数
2. 转换块级作用域
3. 以及babel-loader
4. `@babel/core`不需要安装，因为`loader`中存在关联会被下载下来
```shell
pnpm i @babel/plugin-transform-arrow-functions @babel/plugin-transform-block-scoping babel-loader -D
```
走读一下配置，`module`中`rules`，匹配`js`文件，采用`loader`进行转换,
`options`里可以写`babel`的配置，也可以单独抽成一个独立的文件（`babel.config.js`）
```js
// webpack.config.js
const { resolve } = require('path')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          // ...一些配置
        },
      },
    ],
  },
}
```
使用`plugins`进行源代码代码转换
```js
// babel.config.js
module.exports = {
  plugins: ['@babel/plugin-transform-block-scoping', '@babel/plugin-transform-arrow-functions'],
}
```
执行`npm run build`查看打包的产物就会发现已经转换好了  
那么当我们高级语法有很多很多，比如`promise async await`等，我们难道一个一个去安装插件吗，这样显得太繁琐了，所以这个时候`preset`（预设）就登场了，提前把那些高级特性全部帮我们设置好
```shell
pnpm i @babel/preset-env -D
```
```js
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
}
```
接下来，在执行`npm run build`,效果一样，但是已经帮我们设置好了预设，高级语法都会被打包成低版本的代码，那提前帮我们安装了哪些插件呢？
详见：https://babel.docschina.org/docs/babel-preset-env  
`@babel/preset-env` 其中的`env`即是根据环境查询兼容性（`browserslist`）后面我们会讲解到
### polyfill
polyfill(补丁)，前面我们说到`preset-env`，可以把我们使用的高级语法，打包成更多浏览器适配的语法，但是对于某种`API`，不存在的情况它是无能为力的。比如`replaceAll` **ES2021**提出的，而`polyfill`就会帮我注入对应的`API`

**未使用polyfill**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39b4688e52444573a88103119d92f40e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1106&h=478&s=96288&e=png&b=2b2e36)
我们能非常直观的观察到，该`replaceAll`,直接被构建出来了，但是在低版本的浏览器上肯定是没有这个`API`的，就会出现类似的错误`Uncaught TypeError: mes.replaceAll is not a function`,笔者在实际生产中(微信浏览器上)，遇到了类似的`bug`，我们应该如何解决呢？    
**前置知识**  
```shell
pnpm i core-js regenerator-runtime
```
注意不是开发时依赖，因为它实际要被我们注入到代码当中，其中这两个包代表用于模拟完整的 `ES2015+` 环境  
#### 1. 直接引入API
我们可以根据实际需要直接引入对应的`API`即可，好比上方的`replaceAll`,我们知道它是较新的语法，直接从`core-js`引入即可
```js
// main.js
import 'core-js/es/string/replace-all'
```
进行打包，然后我们再次在分析下产物,对应的`API`就被注入到我们的产物当中，就实现了`polyfill`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d0557a5ec8046d9957b88a13dc9a3f5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2870&h=1306&s=418018&e=png&b=292c33)

#### 2.useBuiltIns

```js
// babel.config.js
const path = require('path')
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        modules: 'cjs',
      },
    ],
  ],
}
```
`useBuiltIns: usage | entry | false(default)`  
`usage`就是你有使用哪些，`entry`包含`node_modules`的第三方库使用的，根据实际情况选择即可，但是一般使用`usage`,因为这些`polyfill`都会被实际注入到代码中会影响构建产物的大小  
`corejs:3` 代表第三个版本  
`modules`默认是`auto`,但实际在我的`Mac`上，会报错不支持`cjs`的问题，所以我改了下，有可能在`windows`不需要配置，这点还没测试过。**如果你使用了高级特性，但是代码没有`polyfill`,请看下个章节`browserslist`,在那里你会找到答案（把市场占有率调低一些比如 > 0.1%）**
## browserslist
本节代码见：`2.babel`  
在谈起浏览器的兼容性，`browserslist`一定是前端必不可少的工具，早期无论是处理`css`(添加浏览器前缀)，还是`ES6+ -> ES5`。好比，我们针对的用户都是一些大学生，普遍这些用户电脑上的浏览器都是较新的，那这些浏览器本身就支持`ES6+`的语法，我们就没有必要去转换为`ES5`的代码，我们来简单介绍一下它

```
pnpm i browserslist -D
```
我们在根目录下新建文件`.browserslistrc`
```js
// .browserslistrc
> 1% //市场占有率 > 1%
last 2 versions // 最后两个版本
not dead // 还在维护的
```
此时，我们执行`npx run browserslist`
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb1e7ba5b38e4c9c95868bcee5cff864~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1106&h=1044&s=216921&e=png&b=2a2c33)
在控制台打印出来了，适配的浏览器版本。这里的版本代表的是区间`chrome109 - chrome 120`，那么疑问就来了，它是怎么知道要适配哪些浏览器呢？其实是上方的配置文件在影响  
`postcss` / `babel`它们兼容性的都是通过`browserslist`工具，然后`browserslist`是通过`can i use`网站，查询适配的
```mermaid
graph LR
postcss/babel-- browserslist --->caniuse
```

## 打包React代码
本节代码见：`3.build_react`  
前面我们讲过可以通过`babel`打包`js`语法，
而`react`使用的是`jsx`代码。`jsx`其实是`js`代码的扩展，加了一些特定的语法而已
- 以前：`jsx`通过`babel`打包成`react.createElement`,所以说`jsx`其实是`react.createElement`的语法糖
- `v18`后，本质是从`react/jsx-runtime`引入的`jsx`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9432196b62e640fdbfbb45df9dd2f331~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2424&h=874&s=96046&e=png&b=2c2c2c)
我们了解到这里即可，因为如果没有`jsx`语法，我们写嵌套的结构简直是噩梦。  
直观感受下`Count`组件，所以才需要`jsx`语法，更接近`html`让我们更容易上手
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d840d5360a77462a9f5c369195b3fe3e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2400&h=802&s=185419&e=png&b=2c2c2c)

### 编写React应用
```
pnpm i react react-dom
```

```jsx
//Counter.jsx
import React, { memo, useState } from 'react'

const Counter = memo(() => {
  const [count, setCount] = useState(0)
  return (
    <div className='count'>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <span style={{padding: '0 8px'}}>{count}</span>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  )
})

export default Counter

// App.js
import React from 'react'
import { createRoot } from '../node_modules/react-dom/client.js'
import Counter from './components/Counter.jsx'

const root = createRoot(document.getElementById('root'))
root.render(<Counter />)
```
就是一个简单的计数器代码，但是笔者遇到一个比较奇怪的问题，就是默认引入`react-dom/client.js`的时候，没有向上查找（`node_modules`），所以这里写了相对路径，效果如下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6a5320838f942e0ad187667402363b1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2448&h=864&s=209553&e=png&b=272b32)  暂时没定位出来哪里的问题，如果知道的同学可以指点一下, 接下来我们应用就就好了，我们执行`build` 
### 使用babel-loader
**错误：不支持jsx**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38e013f1325b490e9e5a506fb9266a8a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2350&h=538&s=157060&e=png&b=282c34)
报错信息：告诉我们需要一个合适的`loader`来处理`jsx`类型的文件,因为我们之前使用`loader`,`rules`规则中并没有匹配它，`webpack`不知道如何去解析它  
**解决办法**
```js
// webpack.config.js
module: {
  rules: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
    },
  ],
},
```
正则`?`代表1个或者0个，告诉它使用`babel`进行处理，然而它也需要许多插件对`jsx`代码进行支持，因为`plugin`过于繁琐，我能直接使用预设即可

```shell
pnpm i @babel/preset-react -D
```

```js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
}
```
再次执行`npm run build`我们就发现代码已经打包成功,，但是这里还差最后一步，我们在编写`jsx`代码的时候，是要把`react`应用挂载在`#root`上的，但是我们现在并没有`html`文件。当然我们也可以手动创建，但是这样太过于繁琐。我们可以使用另外一个插件，直接把产物挂载到`html`上即可
### html-webpack-plugin
```
pnpm i html-webpack-plugin -D
```
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
}
```
`build`以后就发现已经构建完毕，我们利用`live server`开启一个本地服务预览，后面我们还会讲解开启一个本地服务，热更新等，构建一个小型的开发环境  
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a37ec8c49eca475da4819f7c1dbb03af~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=352&h=176&s=12552&e=png&b=23272d)  
一个简单的计数器`React`应用，我们就构建好啦～
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21bafbbe76164fc4913b96cb743540ce~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1018&h=430&s=48454&e=png&b=fdfdfd)

## devServer
本小节见`4.webpack_dev_server`  
上一小节中，我们说到打包`react`应用，但是需要我们手动进行`build`，但是在实际开发中，肯定不可能这样，每次修改一次代码，就`build`一下，所以我们要像一些常规的`cli`一样，开启一个本地服务进行开发      
**安装**
```shell
pnpm i webpack-dev-server -D
```
```js
// package.json
"scripts": {
  "start": "webpack server",
},
```
**启动**

`npm run start`这样就开启了一个服务了，端口在8080，我们直接打开这个地址即可,同时也会进行热更新

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29559d7fdddf4892854cf956c0e7429e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2146&h=920&s=296067&e=png&b=282c34)

### static
#### 演练场
我们启动的这个服务，不像`build`,它是实实在在的文件，而我们开启的本地服务内容都是在内存当中的，其中打包的静态资源，一般都需要存放到`public`文件夹中。
**错误演练**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91ff790493f94d3ab9480f207a8938a5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2928&h=1300&s=223348&e=png&b=282b33)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d70f1326469458782538a93f680baf2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3010&h=1320&s=218634&e=png&b=ffffff)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62e2fa8a397e4d5c906204c43dd334bd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1488&h=1346&s=265148&e=png&b=fcfcfc)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2508fca069344dbaaf92d960f8745423~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1488&h=1346&s=265148&e=png&b=fcfcfc)
从上面内容，我们可以得知，`avatar.jpg`请求的地址，正是我们开启服务的地址，但是这个地址的内容都是存在于内存当中，即使我们在目录下存放了图片文件，该服务不知道从哪里去寻找  
**解决办法**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/393bb973f4744a2cb30b28fa3a3bc424~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=558&h=462&s=43263&e=png&b=282c34)
- 我们修改一下`avatar`的存在目录即可，把它修正到`public`文件夹中即可
```tsx
const Profile = memo(() => {
  return (
    <div>
      avatar1: <img src="../../avatar.jpg"/> <br/>
      avatar2: <img src="/avatar.jpg"/>
    </div>
  )
})
```
`avatar1`是走的相对路径，`avatar2`，`/avatar`代表的从根目录进行查找，最后它两都是从`8080`端口下访问资源，那为什么是`public`文件夹呢，不是`abc`呢

#### 配置详解
- default（public）
    - 它的默认值为`public`所以在这个文件夹下的资源，可以被访问到，如果想要改成其他文件夹，直接修改配置即可
    ```js
      devServer: {
        static: ['public', 'abc'],
      },
    ```
    如果是一个数组，那么它们两个文件夹都会起作用
### open
- 自动打开浏览器窗口
### port
- 修改端口号
### compress
- 开启`gzip`压缩，效果如下
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2aef7f0b05e6429e883009b5c615a706~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3024&h=1002&s=352528&e=png&b=ffffff)
### proxy
在我们日常开发中，经常会遇到跨域的问题，解决方案有很多种
- 生产阶段
    - 通过`nginx`进行反向代理来解决跨域问题
    - 后端开启CORS
        - Access-Control-Allow-Origin: *
- 开发阶段
    - 后端开启CORS
    - 利用`devServer开启Proxy`，本文重点讲解，其他大家自行了解
#### 后端服务
本节代码见：`koa`  
我们采用`Koa`编写
```shell
pnpm i koa koa-router
```
```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const userRouter = new Router({ prefix: '/users' })

userRouter.get('/', (ctx, next) => {
  const users = [
    {
      name: 'ice',
      age: 24,
    },
    {
      name: 'panda',
      age: 23,
    },
  ]

  ctx.body = users
})

app.use(userRouter.routes())
app.listen(3000, () => {
  console.log('服务启动成功')
})
```
#### 前端代码
```jsx
import React, { memo, useEffect,useState } from 'react'
import axios from 'axios'

const Users = memo(() => {
  const [list, setList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/users').then(res => {
      setList(res.data)
    })
  }, [])

  return (
    <div>
      <h4>Users:</h4>
      <ul>
        {list.map(({name, age}) => {
          return <li key={name}>{name}-{age}</li>
        })}
      </ul>
    </div>
  )
})

export default Users
```
当我们访问浏览器就会看到这样的错误

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fef79125ecfd497584b5e4a2cacc3609~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1226&h=358&s=84452&e=png&b=282828)
这正是跨域的错误，因为我们的前端服务开启在`8080`端口上，而后端的`api`服务开启在`3000`上，我们不能进行访问，这个是浏览器的限制，违背了同源策略，那么我们如何解决这个问题呢？

#### 解决办法
1. 后端解决开启`CORS`
```js
  ctx.set('Access-Control-Allow-Origin', '*')
```
2. 利用`proxy`开启代理
```js
// webpack.config.js
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    pathRewrite: {
      '^/api': '',
    },
  },
},
```
```js
axios.get('/api/users').then(res => {
  setList(res.data)
})
```
当我们以`/api`开头的，就会被代理到`proxy`中，而它是使用的`http-proxy-middleware`，是它开启的服务去我们`3000`端口请求数据，拿到数据以后在通过它返回给客户端这样就完成了代理，而`pathRewrite`是正则匹配，把以`/api`开头的，我们给它替换为空地址，最后拼接而成的就是后端`api`的地址
```js
// before
// /api/users

// after
// http://localhost:3000/users
```
**proxy原理**：中间人模式

```mermaid
flowchart LR
前端 --> proxy --> 后端api
后端api --> proxy --> 前端
```
#### changeOrigin
改变`host`的来源,有些服务器会根据`host`来源来判断，如果不是同一个host访问就给他屏蔽掉，防止爬虫。  
在`koa`服务器中，我们打印出它的`header`,就会发现请求的`origin`地址，也就是我们的前端地址`8080`。如果想要改变它的源，配置如下就可以解决

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f409fb9299a47ea9884f03634491e3e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1242&h=704&s=128609&e=png&b=292c33)
```js
proxy: {
  '/api': {
    // ...
    changeOrigin: true,
  },
},
```
因为正常情况下，我服务器在`3000`端口下，那么请求的`host`也应该在`3000`,这个最主要看后端是否有限制

### historyApiFallback
前端路由，都是一个`url -> components`，我们会在`url`上增加前端路由，然后渲染对应的组件，但是在浏览器中则会代表请求对应的资源，一般为`index.html`文件，刷新网页就会报一个`404`找不到文件的错误

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/340837c52fa04b11a3ececbbd25f0c30~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1124&h=512&s=82187&e=png&b=fefefe)  
那么我们如何解决呢？我们刷新网页的时候在给它重定下`index.html`文件即可
```js
devServer: {
  historyApiFallback: true,
},
```
## 多入口起点
本节代码见：`5.entry_points`  
我们前面就配置了`entry`，指向的`main.js`，当执行`build`,`webpack`就会从它出发，把有关联的代码形成一个依赖图（图结构），打包构建，而之前的`mode`中，我们只配置了单入口，其实是可以设置多入口起点的，不过日常使用的较少（`vite/create react app`都是单入口），我们了解即可  
### 创建文件
```js
// src/stu.js
console.log('stu')

// src/teacher.js
console.log('teacher')
```
此时，我们的`src`文件中，有两个文件，它们彼此并没有依赖，我们设置给他们两个都设置为入口文件
```js
// webpack.config.js
module.exports = {
  // ...
  entry: {
    stu: './src/stu.js',
    teacher: './src/teacher.js',
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
  },
}
```
### 文件打包
`entry`为对象的写法，我们可以配置多个入口，此时我们执行`build`，会发现如下错误，有多个`chunk`名字相同产生了冲突，它不知道如何打包了，其实学到这里，大家肯定知道应该要设置`output`（即出口配置）
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ce7d2593d534409819e2b42b5a6723b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1490&h=642&s=174555&e=png&b=282c34)
```js
output: {
  filename: '[name]_bundle.js',
  path: resolve(__dirname, 'build'),
},
```
现在执行`build`就可以发现打包成功了，其中`[name]`写法为`placeholder`（占位符语法）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fba31ac327b74a4986a3e171a3653866~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=380&h=220&s=18887&e=png&b=23272d)

### 依赖共享
如下图所示，我们在日常开发中，会有一些包会在很多文件中使用，比如`dayjs`在`stu teacher`文件中均有用到
```js
// src/stu.js
import dayjs from 'dayjs'

console.log('stu')
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// src/teacher.js
import dayjs from 'dayjs'

console.log('teacher')
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

```
然后我们进行`build`观察如下产物，会发现`dayjs`竟然会被打包两次（即`第10行`）

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8c71fead29b49cfbf8b8c1ed7969a5d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2920&h=1064&s=332955&e=png&b=2a2e36)
那么我们针对如上的场景如何优化呢？能不能把`库`文件单独打包到一个文件里面，然后让这两个文件应用这两个包呢？
```js
entry: {
  stu: {
    import: './src/stu.js',
    dependOn: 'shared',
  },
  teacher: {
    import: './src/teacher.js',
    dependOn: 'shared',
  },
  shared: ['dayjs'],
},
```
我们在另外增加一个入口，让`stu & teacher`去引入这个需要共享的第三方包，这样就可以实现，我们再次观察产物,就可以看见实现了对`shared`包进行了引入
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc200bd9192d4d1e8b0304ef736e15fc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2936&h=1614&s=596453&e=png&b=282c34)

## 动态导入
本节代码见：`6.dynamic_import`  
其实动态导入大家应该都用过，就是路由懒加载。Vue中利用`import`函数导入组件或者`React`中的`React.lazy`的函数引入的组件。何为路由懒加载？最主要的就是映射关系， `path: component`,有`history/hash`两种模式，监听路由的变化，动态加载`component`  
那么当浏览器首次渲染的时候，只需要下载对应`js`文件即可（不需要全部下载），有利于提高首屏渲染速度。当浏览器闲置的时候下载，或者使用到的时候在下载即可（路由变化）
### 基本用法
```js
// main.js
const btnEl1 = document.createElement('button')
const btnEl2 = document.createElement('button')

btnEl1.textContent = '加载stu'
btnEl1.addEventListener('click', () => {
  import('./stu').then((res) => {
    console.log(res)
  })
})

btnEl2.textContent = '加载tea'
btnEl2.addEventListener('click', () => {
  import('./teacher').then((res) => {
    console.log(res)
  })
})

document.body.append(btnEl1, btnEl2)
```
当我们执行`build`的时候，就会发现`stu`和`tea`是打成单独的包的，通过某种行为，动态的加载

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1be47f6d4864c2f8980aa4e11a81254~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=456&h=258&s=24736&e=png&b=23272d)  
当我们开启一个本地服务，首次加载的只有`bundle.js`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c51cb25aac4345a5ac3bb09ccae6eff7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1608&h=632&s=107876&e=png&b=303030)  
当我点击按钮，触发了某种行为的时候，才会加载动态导入的文件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21715742bb974b3abf6a624def08a656~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1842&h=530&s=110649&e=png&b=fcfcfc)
### 魔法注释
我们前面进行了动态导入，但是仔细看它的名字`src_stu_js.bundle`,是根据它的目录+filename生成的，但是实际`cli`中，都会是对应的页面名称，此时我们就需要用到魔法注释了
```js
btnEl2.addEventListener('click', () => {
  import(/* webpackChunkName: 'teacher' */'./teacher').then((res) => {
    console.log(res)
  })
})
```
此时，我们就可以发现名称已经改掉了
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63e0e75dfb3542d2ac095cc8c74746a3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1882&h=424&s=101681&e=png&b=272b33)