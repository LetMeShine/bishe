/**
 * @fileoverview 路由
 */
import jwt from "jsonwebtoken";
import express from 'express'
import Constant from "../utils/constant";
import userContrl from '../controllers/user'
import loanContrl from '../controllers/loan'
import db from '../../sql'
const router = express.Router();

export default (app) => {
    // 用户管理
    router.route('/user/login').post(userContrl.login);
    router.route('/user/register').post(userContrl.createUser);
    router.route('/user/info').get(userContrl.info);
    router.route('/user/logout').get(userContrl.logout);
    router.route('/user/list').get(userContrl.userList);
    router.route('/user/test').get((req,res)=>{
        let date = new Date();
        let str = date.getFullYear() + '-' + date.getMonth()+'-'+date.getDate()+ ' ' +date.getHours() + ':'+date.getMinutes()+':'+date.getSeconds();
        let sql = `update user set modified = '${str}' where id = 3`;
        // let sql = `SELECT modified from user`;
        db.query(sql,[],(err,ret)=>{
            err;
            res.json({ret,str});
        });
    });

    // 申请管理
    router.route('/loan/create').post(loanContrl.create);

    /**
     * @description jwt拦截器,对token进行处理,未登录不能访问网站
     * 
     * @param {Object} req 请求参数
     * @param {Object} resp 请求参数
     * @param {Object} next 请求参数
     */
    let checkLogin = (req, resp, next)=>{
        //跨域试探 预请求
        if (req.method === 'OPTIONS') {
            resp.send({});
        } else if (req.originalUrl === '/user/login') {
            // 登录请求
            next();
        } else if (req.headers.hasOwnProperty("token")){
            // 其他所有请求都需要检查token
            jwt.verify(req.headers.token, Constant.secret, (err, decode) => {
                // console.log(decode.id,123456789)
                if (err) {
                    if (err.name === 'JsonWebTokenError') {
                        resp.json({msg: "token无效！请重新登录！",code: 2001})
                    }
                    if (err.name === 'TokenExpiredError') {
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
            });
        } else {
            //无token
            resp.json({msg: "token不存在，拒绝访问。", code: 2004})
        }
    }
    app.use(checkLogin);

    // /api是路由的前缀
    app.use('/',router);
}