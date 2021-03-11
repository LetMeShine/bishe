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
    return db.selectAll(sql);
}

/**
 * @returns 添加用户
 * @param {Object} user 用户json对象 {username:xx,password:yy}
 */
export function createUser(username, password, role_id) {
    let sql = `insert into user set ?`,
        post = {id:null,username, password,  type: role_id};
    return db.add(sql,post);
}
/**
 * @description 根据id查找用户
 * @param {Number} userId
 */
export function findUser(userId) {
    let sql = ``;
    return db.selectAll(sql);
}
/**
 * @description 修改用户，表--主键id
 * @param {*} user 用户json对象 {id:x,account:xx,password:yy,real_name:xx}
 */
export function updateUser(user) {
    let sql = ``;
    return db.update(sql);
}
/**
 * @description 根据id删除用户
 * @param {Number} id 
 */
export function deleteUser(id) {
    let sql = ``;
    return db.delete(sql);
}

/**
 * 分页查询 模糊 如手机号以136开头的
 * @param {*} pageNo 起始页码，从1开始
 * @param {*} pageSize 一页显示记录条数，如20
 */
export async function findPage(pageNo=1, pageSize=20, name) {
    let limit = pageSize;
    // 读取数据第起位置，第1页和第2页的起始读取数据位置不同 因为db从0开始记录数据行
    let offset = (pageNo-1) * pageSize;
    let result = {};
    if (name) {
        var d = await sequelize
        .query(`SELECT * from jd_user WHERE account LIKE ? LIMIT ${offset},${limit}`, 
        {replacements: ['%'+name+'%'], model: User});
        result.data = d;
        //模糊查询总条数
        d = await sequelize.query(`select count(*) num from jd_user where account LIKE ?`,
        {replacements: ['%'+name+'%']})
        if (d && d.length > 0) {
            result.rows = d[0][0].num;
            //计算总页数
            result.pages = Math.ceil(d[0][0].num/pageSize);
        }
    } else {
        var d = await User.findAll({
            limit: Number(limit),   //查询limit条数据
            offset: Number(offset)  //从offset数据行位置开始查询
        })
        result.data = d;
        //总条数
        d = await sequelize.query("select count(*) as num from jd_user");
        if (d && d.length > 0) {
            result.rows = d[0][0].num;
            //计算总页数
            result.pages = Math.ceil(d[0][0].num/pageSize);
        }
    }
    return result
}