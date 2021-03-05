// const express = require('./config/default');
// babel-cli包含babel-node 支持es6模块化
// cnpm i babel-cli babel-preset-env babel-plugin-add-module-exports --save
// 测试babel-node
// npx babel-node 输入es6语法看能不能执行
import express from './config/default'
import config from './config/config'
const server = express();
server.listenAsync(config.port).then(() => {
    console.log('server ' + config.port + ' is runing');
})