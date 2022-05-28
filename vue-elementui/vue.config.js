let CompressionWebpackPlugin = require("compression-webpack-plugin")

module.exports = {
    // publicPath: './',
    // 打包到子域下面  http://www.baidu.com/sub
    publicPath: '/loanWeb/',
    outputDir: "dist/loanWeb",      //输出目录
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    //配置webpack
    configureWebpack: config => {
        let plugins = [
            new CompressionWebpackPlugin({
                algorithm: 'gzip', //压缩方式
                test: /\.js$|\.css$/, //匹配压缩文件
                threshold: 10240  //对大于10k压缩
            })
        ]
        if (process.env.NODE_ENV === 'production') {
            config.mode = "production";
            config.plugins = [...config.plugins, ...plugins]
        } else {
            config.mode = "development"
        }
        // Object.assign(config, {
        // externals: {    //排除不需要依赖包
        // vue: 'Vue',  //import Vue from 'vue'
        // axios: 'axios' //import axios from 'axios'
        // }
        // })
    }
}