const path = require('path')
const fsExtra = require('fs-extra')
const webpack = require('webpack')

const dllPath = path.join(__dirname, './dll')
fsExtra.emptyDirSync(dllPath)

module.exports = {
    mode: 'production',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '[name].dll.[hash:8].js',
        path: dllPath,
        // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
        library: '_dll_[name]_[hash:8]'
    },
    plugins: [
        new webpack.DllPlugin({
            // path 指定manifest文件的输出路径
            path: path.resolve(__dirname, './dll/[name].manifest.json'),
            // 和library 一致，输出的manifest.json中的name值
            name: '_dll_[name]_[hash:8]'
        })
    ]
}
