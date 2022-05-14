/**
 * @fileoverview 用户服务层
 */
import db from '../../sql'

/**
 * @description 通过账号查找用户
 * 
 * @returns 查找的结果
 */
export function findUserByUsername(username='',password='') {
    let sql = `select id, username from user where username = '${username}' and password = '${password}'`;
    return new Promise((resolve, reject) => {
        db.query(sql, [], (err,result) => {
            if(err) reject(err);
            resolve(result);
        })
    });
}

/**
 * @returns 添加用户
 * @param {Object} user 用户json对象 {username:xx,password:yy}
 */
export function createUser(username, password, real_name) {
    let sql = `insert into user set ?`,
        post = {id:null,username, password, real_name};
    return new Promise((resolve, reject) => {
        db.query(sql, post, (err,result) => {
            if(err) reject(err);
            resolve(result);
        })
    });
}
/**
 * @description 根据id查找用户
 * @param {Number} userId
 */
export function findUser(userId) {
    let sql = `select id, username, type from user`;
    if(userId) {
        sql += ` where id=${userId}`;
    }
    return new Promise((resolve, reject) => {
        db.query(sql, [], (err,result) => {
            if(err) reject(err);
            resolve(result);
        })
    });
}

/**
 * @description 根据id删除用户---no
 * @param {Number} id 
 */
export function deleteUser(id) {
    let sql = ``;
    return new Promise((resolve, reject) => {
        db.query(sql, [], (err,result) => {
            if(err) reject(err);
            resolve(result);
        })
    });
}
