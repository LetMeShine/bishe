import config from "../config/config";
import mysql from 'mysql';
import logger from "../app/utils/logger";
const  connection = mysql.createConnection(config.database);

const db = {
    selectAll(sql){
        return new Promise((resolve,reject) => {
            connection.connect(err => {
                if(err) reject(err);;
                logger.info('数据库连接成功')
            });
            connection.query(sql,(err,res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
            connection.end();
            logger.info('数据库关闭')
        })
    },
    update(sql){
        return new Promise((resolve,reject) => {
            connection.connect(err => {
                if(err) reject(err);;
                logger.info('数据库连接成功')
            });
            connection.query(sql,(err,res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
            connection.end();
            logger.info('数据库关闭')
        })
    },
    delete(sql){
        return new Promise((resolve,reject) => {
            connection.connect(err => {
                if(err) reject(err);;
                logger.info('数据库连接成功')
            });
            connection.query(sql,(err,res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
            connection.end();
            logger.info('数据库关闭')
        })
    },
    add(sql,post){
        // let post = {id:null,username: 'test1', password: '123456', type: 2};
        // let sql = `INSERT into user set ?`;// 防止sql注入，字符串记得添加引号，数值就不用了
        return new Promise((resolve,reject) => {
            connection.connect(err => {
                if(err) reject(err);
                logger.info('数据库连接成功')
            });
            connection.query(sql,post,(err,res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
            connection.end();
            logger.info('数据库关闭')
        })
    }
}

export default db;