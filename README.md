# mobile web 
baseon [UMI](https://umijs.org/zh/) + [DVA](https://dvajs.com/) + [Ant-Design](https://ant.design/) 

## 目录结构

    |-- config                                # umi配置，包含路由配置
    |-- mock                                  # 本地模拟数据
    |-- public                                
    |   |-- favicon.png                       # Favicon
    |   |-- iconfont                          # 字体图标资源
    |-- src                                   # 开发目录
    |   |-- assets                            # 本地静态资源
    |   |-- components                        # 业务组件
    |   |-- layout                            # 布局组件
    |   |-- models                            # 全局dva model
    |   |-- services                          # 接口服务
    |   |-- pages                             # 页面模板
    |   |-- tests                             # 单元测试
    |   |-- e2e                               # 冒烟测试／ui测试
    |   |-- global.css                        # 全局css
    |-- .gitignore                            # git忽略文件
    |-- .editorconfig                         # 编辑器代码风格配置
    |-- .eslintignore                         # eslint忽略文件
    |-- .eslintrc                             # eslint规则
    |-- .prettierignore                       # 代码风格配置忽略文件
    |-- .prettierrc                           # 代码风格配置文件
    |-- .stylelintrc                          # 样式风格配置文件
    |-- package.json                          # 依赖及配置
    |-- README.md                             # 简介

## 使用

```javascript
cd mobileweb
// 检出依赖
yarn
// 运行
yarn start
// 打包
yarn build
// 更多命令可在package.json中查看
```

## 样式

使用less作为样式语言。

## 业务图标库
使用阿里 [iconfont](http://iconfont.cn/)  图标库，在这里创建项目，Font class方式使用。开发阶段可以使用在线链接，发布时候采用，将源文件下载至本地。/src/public/iconfont 目录下。

1:在 /src/pages/document.ejs 引入iconfont目录下css文件(在线链接)。

```javascript
//at.alicdn.com/t/font_405362_lyhvoky9rc7ynwmi.css

<link href="/iconfont/iconfont.css" rel="stylesheet" />
```

2: 在 /src/components简单封装了图标组件，你可以这样使用

```javascript
import BizIcon from '../BizIcon'

<BizIcon type="xxx" />
```
