import config from "../config/config";
import mysql from 'mysql';
import logger from "../app/utils/logger";
const  connection = mysql.createConnection(config.database);

const db = {
    selectAll(sql){
        return new Promise(resolve => {
            connection.connect(err => {
                if(err) throw err;
                logger.info('数据库连接成功')
            });
            connection.query(sql,(err,res) => {
                if (err) logger.error(err);
                resolve(res);
            });
            connection.end();
        })
    },
    update(sql){
        return new Promise(resolve => {
            connection.connect(err => {
                if(err) throw err;
                logger.info('数据库连接成功')
            });
            connection.query(sql,(err,res) => {
                if (err) logger.error(err);
                resolve(res);
            });
            connection.end();
        })
    },
    delete(sql){
        return new Promise(resolve => {
            connection.connect(err => {
                if(err) throw err;
                logger.info('数据库连接成功')
            });
            connection.query(sql,(err,res) => {
                if (err) logger.error(err);
                resolve(res);
            });
            connection.end();
        })
    },
    add(sql,post){
        // let post = {id:null,username: 'test1', password: '123456', type: 2};
        // let sql = `INSERT into user set ?`;// 防止sql注入，字符串记得添加引号，数值就不用了
        return new Promise(resolve => {
            connection.connect(err => {
                if(err) throw err;
                logger.info('数据库连接成功')
            });
            connection.query(sql,post,(err,res) => {
                if (err) logger.error(err);
                resolve(res);
            });
            connection.end();
        })
    }
}

export default db;