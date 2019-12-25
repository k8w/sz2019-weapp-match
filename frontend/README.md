# weapp-template
微信小程序工程化框架：TypeScript + LESS + WebPack

## 初始化
```
npm install
```

## 构建NPM
1. 将`project.config.json`中的`miniprogramRoot`修改为`.`
2. 进入微信开发者工具 -> 工具 -> 构建NPM
3. 将`project.config.json`中的`miniprogramRoot`改回`dist`

## 开发
```
npm run dev
```

开发者工具 -> 新建小程序 -> 打开此目录

## 构建
```
npm run build
```

开发者工具 -> 构建npm -> 上传