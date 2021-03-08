import fs from 'fs'
import path from 'path'
export default () => {
    const express = require('express');
    // 用于http请求中body解析
    const bodyParser = require('body-parser');
    // 使用工具包
    const util = require('util');
    const app = express();

    // 后端路由
    const router = express.Router();

    // 暴露app.listen  把监听的方法延迟执行
    app.listenAsync = util.promisify(app.listen);

    // 跨域
    app.use((req,res,next) => {
        // http请求来源
        res.setHeader('Acces-Control-Allow-Orgin','*');
        // get post
        res.setHeader('Acces-Control-Allow-Methods','*');
        //token jwt cookie
        res.setHeader('Acces-Control-Allow-Headers','*');
        next();
    });

    // 日志中间件---拦截器
    app.use(async (req,res,next) => {
        if(req.originalUrl.includes('/login')){
            console.log('1.日志中间件开始');
        }
        next();
    });
    app.use(bodyParser.json());// json
    app.use(bodyParser.urlencoded({extended: true}));// 解析的表单

    // 添加路由,这里的第一个参数可以设置路由的前缀
    // require('../app/routes/user')(app);
    // 动态添加路由
    let routeFiles = path.join(__dirname,'../app/routes')
    fs.readdirSync(routeFiles).forEach(file => {
        let filePath = path.join(routeFiles,file);
        require(filePath)(app);
    })

    return app;
}