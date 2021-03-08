/**
 * @fileoverview 全局过滤器
 */

/**
 * @description 过滤性别
 * 
 * @param {String} value 性别字段
 * @returns 过滤结果
 */
export function getSex(value) {
    switch (value) {
        case 'man':
            return '男';
        case 'woman':
            return '女';
        default:
            return value;
    }
}

/**
 * @description 过滤时间
 * 
 * @param {Number} time 时间
 * @returns {Strring} 统一格式时间
 */
export function getDate(time) {
    let d = new Date(time);
    let times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return times;
}

/**
 * @description 过滤学历
 * @param {String} value 学历字段
 * @returns {String} 学历过滤结果
 */
export function getEducation(value) {
    switch (value) {
        case 'college':
            return '大学';
        case 'highschool':
            return '高中';
        default:
            return value;
    }
}