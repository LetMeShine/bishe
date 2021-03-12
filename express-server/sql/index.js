import config from "../config/config";
import mysql from 'mysql';
import logger from "../app/utils/logger";
const  pool = mysql.createPool(config.database);

function query(sql,values,callback){
    pool.getConnection((err, connection) => {
        if(err) throw new Error(err);
        logger.info("数据库连接成功");
        connection.query(sql,values, (err, results) => {
            callback(err, results);
            connection.release();
            logger.info("数据库关闭");
        })
    })
}
const db = {
    query
}
export default db;