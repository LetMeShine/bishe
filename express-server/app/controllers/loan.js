/**
 * @fileoverview 贷款接口
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
    create(req,resp) {
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