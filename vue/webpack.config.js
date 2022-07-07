const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        // 模块加载顺序
        modules: [path.resolve(__dirname, 'vue-source'), path.resolve(__dirname, 'node_modules')]
    },
    plugins: [new htmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html')
    })]
}
