/**
 * @fileoverview 用户路由
 */
import jwt from "jsonwebtoken";
import express from 'express'
import Constant from "../utils/constant";
import userRouter from '../controllers/user'
const router = express.Router();

export default (app) => {
    router.route('/user/login').post(userRouter.login);
    router.route('/user/register').post(userRouter.register);
    router.route('/user/test').post((req,res)=>{
        res.send('ok')
    });

    //jwt拦截器,未登录不能访问网站
    let checkLogin = (req, resp, next)=>{
        //跨域试探  预请求
        if (req.method === 'OPTIONS') {
            resp.send({});
        } else if (req.originalUrl === '/user/login') {
            // 登录请求
            next();
        } else if (req.headers.hasOwnProperty("token")){
            // 其他所有请求都需要检查token
            jwt.verify(req.headers.token, Constant.secret, (err, decode) => {
                    if (err) {
                        if (err.name === 'JsonWebTokenError') {
                            resp.json({msg: "token无效！请重新登录！",code: 2001})
                        }
                        if (err.name === 'TokenExpiredError') {
                            // resp.send("token过期了！请重新登录！")
                            // 若token刚过期且还在使用 需要重新生成新token
                            // 过期时间(分钟)=现在时间-过期时间
                            let expiredTime = ((new Date().getTime() - err.expiredAt.getTime())/(1000*60)).toFixed(2);
                            // 半小时过期 再操作时自动生成新token
                            if (expiredTime <= 30) {
                                //前端code==20002表示要更新token
                                resp.json({msg: "生成新token，请客户端更新token", code: 2002})
                            } else {
                                resp.json({msg: "token过期了！请重新登录！", code: 2003})
                            }
                        }
                    } else {
                        //token有效
                        next();
                    }
            })
        } else {
            //无token
            resp.json({msg: "token不存在，拒绝访问。", code: 2004})
        }
    }
    app.use(checkLogin);

    // /api是路由的前缀
    app.use('/',router);
}