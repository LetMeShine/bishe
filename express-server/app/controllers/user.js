/**
 * @fileoverview 用户接口
 * 
 * @description 用户登录
 */
import crypto from "../../config/crypto";
import * as userService from "../service/user";
import Constant from "../utils/constant";
import logger from "../utils/logger";
import jwt from "jsonwebtoken"

function getIdByToken(token){
    let id;
    jwt.verify(token, Constant.secret, (err, decode) => {
        id = decode.id
    });
    return id;
}
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
        let {account, password} = req.body;
        console.log(req.body)

        //判断account pwd为空
        if (account && password) {
            // 加密密码
            let newPwd = crypto.md5(password);
            userService.findUserByUsername(account, newPwd).then(data => {
                if (data.length) {
                    //生成jwt
                    let result = {
                        id: data[0].id,
                        account: data[0].username
                    }
                    let jwt = userCtrl.generateJwtToken(result);
                    resp.json({code: 200, token: jwt});
                } else {
                    resp.json({code: 2005, msg: '无此用户||密码错误'});
                }
            }).catch(() => {
                resp.json({code: 2007, msg: '服务器报错'})
            })
        } else {
            resp.json({code: 2006, msg: '参数无效!'});
        }

    },
    createUser(req,resp) {
        let {username, password, type} = req.body;
        let real_name = '';
        switch(type){
            case 2 :
                real_name = 'approve';
                break;
            case 3 : 
                real_name = 'input';
                break;
            default :
                break
        }
        if(username && password){
            // 加密密码
            let newPwd = crypto.md5(password);// 加密密码
            userService.createUser(username, newPwd, real_name).then(data => {
                resp.json({code: 200,data})
            }).catch((err) => {
                logger.error(err.getMessge(),err);
                resp.josn({code: 2007, msg: "服务器报错"});
            })
        }
    },
    userList(req,resp){
        userService.findUser().then(data => {
            let ret = {
                code: 200,
                data
            }
            resp.json(ret);
        }).catch(() => {
            resp.json({code: 2007, msg: '服务器报错'})
        })
    },
    info(req,resp) {
        let id = getIdByToken(req.headers.token);
        userService.findUser(id).then(data => {
            let ret = {
                code: 200,
                roles: data
            }
            resp.json(ret);
        }).catch(() => {
            resp.json({code: 2007, msg: '服务器报错'})
        })
    },
    logout(req,resp) {
        let id = getIdByToken(req.headers.token);
        userService.findUser(id).then(data => {
            let ret = {
                code: 200,
                data: {
                    roles: data
                },
            }
            resp.json(ret);
        }).catch(() => {
            resp.json({code: 2007, msg: '服务器报错'})
        })
    }
}
export default userCtrl;