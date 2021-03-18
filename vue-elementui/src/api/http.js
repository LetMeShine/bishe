/**
 * @fileoverview 接口
 */
import axios from '@/utils/axios'

/**
 * @description 登录
 * 
 * @param {Object} data 用户登录的信息
 * @returns {promise} 接口返回的结果
 */
export function login(data) {
    return axios({
        method: 'post',
        url: 'http://localhost:3300/user/login',
        data: data
    })
}

/**
 * @description 用户详情
 * 
 * @returns {promise} 接口返回的结果
 */
export function userInfo(){
    return axios ({
        method:'get',
        url:`http://localhost:3300/user/info`,
    })
}

/**
 * @description 退出登录
 * 
 * @returns {promise} 接口返回的结果
 */
export function logout() { //退出
    return axios({
        method: 'get',
        url: 'http://localhost:3300/user/logout',
    })
}

/**
 * @description 贷款申请-提交
 * 
 * @param {Object} data 提交的数据
 * @returns {promise}
 */
export function loanCreate(data) {   //
    return axios({
        method: 'post',
        url: `http://localhost:3300/loan/create`,
        data
    })
}

/**
 * @description 申请管理-查询
 * 
 * @param {Object} data 查询条件 // 分页限制
 * @returns {promise} 接口返回的结果
 */
export function loanList(data) {
    return axios({
        method: 'get',
        url: `http://localhost:3300/loan/list`,
        data
    })
}

/**
 * @description 申请管理 -提交
 * 
 * @param {Object} data id
 * @returns {promise} 接口返回的结果
 */
export function submitToApprove(data) {
    return axios({
        method: 'post',
        url: 'loan/submitToApprove',
        data
    })
}

/**
 * @description 申请管理 -删除
 * 
 * @param {Object} data id
 * @returns {promise} 接口返回的结果
 */
export function loanDelete(id) {
    return axios({
        method: 'delete',
        url: 'loan/delete/' + id,
    })
}

/**
 * @description 申请管理 -编辑
 * 
 * @param {Object} data 编辑的对象
 * @returns {promise} 接口返回的结果
 */
export function loanUpdate(data) {
    return axios({
        method: 'put',
        url: 'loan/update',
        data
    })
}

/**
 * @description 贷款审批-初审-列表数据
 * 
 * @param {Object} data 查询条件
 * @returns {promise} 接口返回的结果
 */
export function approveFirstList(data) {
    return axios({
        url: 'approve/first/list',
        method: 'get',
        params: data
    })
}

/**
 * @description 贷款审批-初审-列表详情
 * 
 * @param {Object} data id
 * @returns {promise} 接口返回的结果
 */
export function loanQuery(data) {
    return axios({
        url: 'loan/query',
        method: 'get',
        params: data
    })
}

/**
 * @description 贷款审批-初审-通过
 * 
 * @param {Object} data 申请id和贷款id
 * @returns {promise} 接口返回的结果
 */
export function approveFirstPass(data) {  //
    return axios({
        url: 'approve/first/pass',
        method: 'post',
        data
    })
}

/**
 * @description 贷款审批-初审-拒绝
 * 
 * @param {Object} data 申请id和贷款id
 * @returns {promise} 接口返回的结果
 */
export function approveFirstReject(data) {
    return axios({
        url: 'approve/first/reject',
        method: 'post',
        data
    })
}

/**
 * @description 贷款审批-终审-列表数据
 * 
 * @param {Object} data 查询条件
 * @returns {promise} 终审列表
 */
export function approveEndList(data) {
    return axios({
        url: 'approve/end/list',
        method: 'get',
        params: data
    })
}

/**
 * @description 贷款审批-终审-通过
 * 
 * @param {Object} data 申请id和贷款id
 * @returns {promise} 接口返回的结果
 */
export function approveEndPass(data) {  //
    return axios({
        url: 'approve/end/pass',
        method: 'post',
        data
    })
}

/**
 * @description 贷款审批-终审-拒绝
 * 
 * @param {Object} data 申请id和贷款id
 * @returns {promise}
 */
export function approveEndReject(data) {
    return axios({
        url: 'approve/end/reject',
        method: 'post',
        data
    })
}

/**
 * @description 标的管理-获取数据
 * 
 * @param {Object} data 查询的信息
 * @returns {promise} 合同列表
 */
export function contractList(data){
    return axios({
        method:'get',
        url:'contract/list',
        params:data
    })
}

/**
 * @description 标的管理-生成合同
 * 
 * @param {Object} data id
 * @returns {promise} 合同信息
 */
export function contractCreateFile(data){
    return axios({
        method:'post',
        url:'contract/createFile',
        data
    })
}

/**
 * @description 标的管理-下载合同
 * 
 * @param {Object} data 合同id
 * @returns {promise} 合同下载的地址
 */
export function contractDownload(data){
    return axios({
        method:'get',
        url:'contract/download',
        params:data
    })
}

/**
 * @description 权限管理-创建用户
 * 
 * @param {Object} data 创建的用户的信息
 * @returns {promise} 接口返回的结果
 */
export function createUser(data){
    return axios({
        method:'post',
        url:'http://localhost:3300/user/register',
        data
    })
}

/**
 * @description 权限管理-列表展示
 * 
 * @returns {promise} 接口返回的结果
 */
export function userList(){
    return axios({
        method:'get',
        url:'http://localhost:3300/user/list'
    })
}
