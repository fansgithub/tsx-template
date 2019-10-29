# tsx-template
这是一份基于 webpack + typescript + mobx 的一份**多页面**打包项目模板。
## 项目结构

    tsx-template
    ├── assets                             一些静态资源文件（字体、图片等）
    │   └── images
    ├── build                              打包相关的配置
    │   ├── dll                            react、react-dom打包后的dll文件
    │   ├── webpack.analyzer.js            打包体积分析
    │   ├── webpack.base.js                公用的打包配置
    │   ├── webpack.dev.js                 开发环境打包配置
    │   ├── webpack.dll.js                 react、react-dom dll打包配置
    │   └── webpack.prod.js                生产环境打包配置
    ├── dist                               打包后的文件夹
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── index_42a6615a.css
    │   ├── index_cca069bb.js
    │   ├── react.dll.c12e36ab.js
    │   ├── setting_7238c857.js
    │   └── vendors~setting_c37597b0.js
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── src                                所有页面的入口文件夹
    │   └── index                          具体的页面
    └── tsconfig.json                      ts配置文件
## 代码提交规范
代码提交规范，请参考阮一峰的文章
[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
