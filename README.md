配置和构建说明
===

首先进入 `frontend` 和 `backend` 各自 `npm install`。

## 后端

- `backend` 为本项目后端程序，使用TypeScript开发。
- 为便于老师查阅，所有数据存储均采用本地文件，无需外部依赖（如MySQL）。

### 协议
前后端通讯采用的是 [TSRPC](https://github.com/k8w/tsrpc) 框架，协议定义位于 `backend/src/protocols/Ptl协议名.ts`
协议定义内，`Req协议名`、`Res协议名` 为该协议的请求和响应格式，已包含足够的注释，故此不再单列协议文档。

### 开发模式运行（建议）
```
cd backend
npm install
npm run dev
```

### 配置
如需修改服务端口号及其它配置，可以直接修改 `backend/config.ts`

### 构建正式版
```
cd backend
npm install
npm run build
```
需要Unix文件操作命令，Windows可能不包含，需要安装类似 `cygwin` 的工具以兼容。
构建完成后，`dist` 即为发行版程序。

---

## 前端
- `frontend`为小程序前端程序，采用TypeScript、LESS开发，使用Gulp进行打包构建
- `frontend/src` 为源代码，`frontend/dist` 为构建出的小程序

### 运行小程序
使用微信开发者工具，直接打开 `frontend` 目录即可。
**由于本压缩包内已经包含构建好的正式版，所以无需构建，直接运行即可。**

### 配置
如果需要修改远端服务器地址，按如下步骤配置。
1. 修改 `frontend/gulpfile.js` 顶部的 `RES_ROOT`，通常为`后端地址/static/app`
2. 修改 `frontend/src/config.ts` 中的 `server`

### 构建正式版
```
cd frontend
npm install
npm run build
```

### 开发模式
开发时使用此模式，源代码变更后会自动构建
```
cd frontend
npm install
npm run dev
```
