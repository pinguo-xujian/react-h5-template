# H5 模板项目

# 1. 项目描述

# 2. 项目启动

安装依赖,

```bash
$ yarn
```

启动项目

```bash
$ yarn start
```

```bash
默认
$ yarn build
QA环境
$ yarn build:qa
prod环境
$ yarn build:prod
```

# 3. 打包说明

# 4. 项目分支说明

# 5. 目录结构描述

```
blurrr-h5
├─ .DS_Store
├─ .babelrc
├─ .editorconfig
├─ .gitignore
├─ .husky
├─ .idea
├─ .lintstagedrc
├─ .npmrc
├─ .prettierignore
├─ .prettierrc.js
├─ .stylelintrc.js
├─ .umirc.ts
├─ .vscode
│  └─ settings.json
├─ README.md
├─ config
│  ├─ config.devlop.ts
│  ├─ config.production.ts
│  ├─ config.qa.ts
│  ├─ config.ts
│  └─ config.uat.ts
├─ package.json
├─ src
│  ├─ access.ts
│  ├─ apis
│  │  ├─ gateway.ts
│  │  ├─ index.tsx
│  │  └─ test.ts
│  ├─ app.ts
│  ├─ assets
│  ├─ components
│  ├─ constants
│  │  └─ index.tsx
│  ├─ global.less
│  ├─ global.ts
│  ├─ hooks
│  ├─ layouts
│  │  └─ index.tsx
│  ├─ loading.tsx
│  ├─ locales
│  ├─ models
│  ├─ modules
│  │  └─ Home
│  │     ├─ index.less
│  │     └─ index.tsx
│  ├─ overrides.less
│  ├─ router
│  │  ├─ index.tsx
│  │  └─ public-route.tsx
│  ├─ styles
│  │  ├─ antd.less
│  │  ├─ index.less
│  │  ├─ mixin.less
│  │  ├─ pinguo.less
│  │  ├─ reset.less
│  │  └─ variable.less
│  ├─ types
│  │  ├─ Form.d.ts
│  │  ├─ axios.d.ts
│  │  ├─ config.d.ts
│  │  ├─ index.d.ts
│  │  ├─ model.d.ts
│  │  ├─ router.d.ts
│  │  └─ table.d.ts
│  └─ utils
│     └─ format.ts
├─ tsconfig.json
├─ typings.d.ts
└─ yarn.lock
```

# 6. 第三方插件说明

## 6.1 Ant Design Mobile - 移动端 UI 组件

文档地址：https://mobile.ant.design/zh

## 6.2 classnames

文档地址：https://github.com/JedWatson/classnames#readme

## 6.3 dayjs-时间日期库

文档地址：https://dayjs.fenxianglu.cn/

## 6.4 lodash-工具库

文档地址：https://www.lodashjs.com/

## 6.5 ahooks - 开源的 React Hooks 库

文档地址：https://ahooks.js.org/zh-CN

## 6.6 react-virtualized - 虚拟滚动插件

文档地址：https://github.com/bvaughn/react-virtualized

## 6.7 react-window - 虚拟滚动插件(轻量版)

地址：https://github.com/bvaughn/react-window#how-is-react-window-different-from-react-virtualized
