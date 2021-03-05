const express = require('express')
// 用于http请求中body解析
const bodyParser = require('body-parser');

const app = express();

// 后端路由
const router = express.Router();

// 日志中间件---拦截器
app.use(async (req,res,next) => {
    if(req.originalUrl.includes('/login')){
        console.log('1.日志中间件开始');
    }
    next();
});

app.get('/',(req,res)=>{
    res.status(200).send('hello');
});

// 添加路由
app.use('/',router);

app.listen(3000,()=>{
    console.log('server 3000 is runing......');
})
