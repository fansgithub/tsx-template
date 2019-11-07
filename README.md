# tsx-template
这是一份基于 webpack + typescript + mobx 的一份**多页面**打包项目模板。
## 项目结构
    tsx-template
    ├── build                                                           打包配置相关
    │   ├── dll
    │   │   ├── react.dll.c12e36ab.js
    │   │   └── react.manifest.json
    │   ├── webpack.analyzer.js
    │   ├── webpack.base.js
    │   ├── webpack.dev.js
    │   ├── webpack.devMock.js
    │   ├── webpack.dll.js
    │   └── webpack.prod.js
    ├── CHANGELOG.md                                                      
    ├── commitlint.config.js
    ├── dist                                                            打包后的文件夹
    │   ├── css
    │   │   ├── commons_819092da.css
    │   │   ├── login_202e3492.css
    │   │   ├── main_c65133dd.css
    │   │   ├── vendors~home_34a3e5f2.css
    │   │   └── vendors~login_55987ca0.css
    │   ├── favicon.ico
    │   ├── font
    │   │   └── XinYeYingTi-2_1cbefb9cotf
    │   ├── img
    │   │   └── a0d7ed56e6af26a7018ff97ac436df15.jpg
    │   ├── index.html
    │   ├── js
    │   │   ├── commons_2a214254.js
    │   │   ├── en-US_cfc43c8c.js
    │   │   ├── home_2ea856bc.js
    │   │   ├── login_241bc5f8.js
    │   │   ├── main_04170d27.js
    │   │   ├── systemManage_d192deae.js
    │   │   ├── vendors~antd-en-US_ab71d510.js
    │   │   ├── vendors~antd-zh-CN_c1c8a790.js
    │   │   ├── vendors~home_e60eab5a.js
    │   │   ├── vendors~login_0d49a695.js
    │   │   └── zh-CN_6b346e9d.js
    │   └── react.dll.c12e36ab.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── src                                                             业务代码根目录
    │   ├── @types                                                  
    │   │   ├── assets.d.ts
    │   │   └── global.d.ts
    │   ├── assets                                                      静态资源文件存储目录
    │   │   ├── font
    │   │   └── images
    │   ├── components                                                  公用组件目录
    │   │   ├── intlWrapper
    │   │   ├── layout
    │   │   ├── notFound
    │   │   └── pageLoading
    │   ├── constants                                                   系统常量
    │   │   └── index.ts
    │   ├── index.html                                                  项目html模板文件
    │   ├── index.less
    │   ├── index.tsx                                                   入口文件
    │   ├── locales                                                     多语言相关
    │   │   ├── en_US.json
    │   │   ├── loader.ts
    │   │   └── zh_CN.json
    │   ├── router                                                      路由相关
    │   │   ├── modules
    │   │   ├── router.tsx
    │   │   └── routerConfig.ts
    │   ├── services                                                    请求封装以及接口统一管理
    │   │   ├── api
    │   │   └── index.ts
    │   ├── store                                                       页面store的存储文件
    │   │   └── app.ts
    │   ├── theme.less                                                  主题色相关
    │   ├── utils                                                       公共函数以及公共类
    │   │   ├── index.ts
    │   │   ├── reactExt.ts
    │   │   └── reactExt.tsx
    │   └── views                                                       页面代码
    │       ├── app.less
    │       ├── app.tsx
    │       ├── dashboard
    │       ├── login
    │       └── system
    └── tsconfig.json                                                   ts配置文件
## 运行命令
执行npm run \<type\> 命令，type类型如下： 
- dev 启动项目
- build 打包项目
- build:dll 打包react、react-dom的dll包
- build:analyzer 启动打包分析工具
- build:mock ssr打包
- mock 启动模拟数据（预留）
- release 发布版本
- eslint 执行代码规范校验，并自动修复
    
    
## 代码提交规范
该项目模板配置了commitlint的钩子，提交代码时，必须按照规范书写commit信息，这是为了以后维护的成本考虑，并且按照规范书写commit，再发布系统时，通过执行 npm run release 命令，会自动更新 CHANGELOG.md 文件，请严格遵守！
具体的代码提交规范，请参考阮一峰的文章
[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
