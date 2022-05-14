/**
 * @fileoverview md5加密密码
 * 
 * @description 使用crypto模块进行加密
 */
import crypto from 'crypto';
export default {
    // 使用的是md5加密模式,加上此字符串就不能进行暴力破解了
    autograph: "this is pwd", 
    md5(password){
        // 设置加密模式为md5
        const md5 = crypto.createHash("md5"); 
        // 把传入的用户密码和自定义的字符串进行编译的到加密过后的密码
        md5.update(password + this.autograph); 
        //设置密码格式为16进制
        const result = md5.digest("hex");
        // 返回后加密过后的密码
        return result;
    }
}