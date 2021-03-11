/**
 * @fileoverview 用户接口
 * 
 * @description 用户登录
 */
import crypto from "../../config/crypto";
import * as userService from "../service/user";
import Constant from "../utils/constant";
import logger from "../utils/logger";
import jwt from 'jsonwebtoken'

const userCtrl = {
    /**
     * @description 生成jwt token
     * 
     * @param {Obejct} data 
     * @returns {String} token
     */
    generateJwtToken(data){
        return jwt.sign(data, Constant.secret, {
            expiresIn: '1800000'  //单位 毫秒  token 30分钟失效  1d-1天
        })
    },
    login(req, resp) {
        logger.info("===登录开始")
        let {username, password} = req.body;
        //判断account pwd为空
        if (username && password) {
            // 加密密码
            let newPwd = crypto.md5(password);
            userService.findUserByUsername(username, newPwd)
                .then(data => {
                    if (data.length) {
                        //生成jwt
                        let result = {
                            id: data[0].id,
                            account: data[0].username
                        }
                        let jwt = userCtrl.generateJwtToken(result);
                        resp.json({code: 200, token: jwt});
                    } else {
                        resp.json({code: 200, msg: '无此用户||密码错误'});
                    }
                })
        } else {
            resp.json({code: 200, msg: '参数无效!'});
        }

    },
    register(req,resp) {
        let {username, password, role_id} = req.body;
        if(username && password){
            // 加密密码
            let newPwd = crypto.md5(password);// 加密密码
            userService.createUser(username, newPwd, role_id).then(data => {
                console.log(data);
                resp.json({code: 200})
            }).catch((err) => {
                logger.error(err.getMessge(),err);
                resp.josn({code: 500});
            })
        }
    }
}
export default userCtrl;