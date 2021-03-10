<template>
    <div class="wapper">
        <div class="login">
            <h1 class="title">信贷管理系统</h1>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="80px" style="width:410px" class="demo-loginForm">
                <el-form-item label="用户名" prop="account">
                    <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {login } from '@/api/http'
import {setToken} from "../utils/token";
export default {
    name:'login',
    data() {
        return {
            // 登录的数据对象
            loginForm: {
                password: '',
                account: '',
            },
            // 登录的校验规则
            rules: {
                account: [
                    { validator: this.validLogin, trigger: 'blur' },
                    { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
                ],
                password: [
                    { validator: this.validLogin, trigger: 'blur' },
                    { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
                ],
            }
        };
    },
    methods:{
        /**
         * @description 点击登录
         * @example submitForm('loginForm')
         * @param formName 表单的对象
         */
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.loginForm).then((res) => {
                        let {code,data} = res.data;
                        if(code === 20000){
                            let token = data.token;
                            // token缓存
                            token && setToken(token);
                            this.$router.push('./home');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /**
         * @description 校验方法
         * @method validLogin
         * @example validLogin
         */
        validLogin(rule, value, callback){
            let info = rule.field === 'account' ? '请输入用户名' : '请输入密码';
            value === '' ? callback(new Error(info)) : callback();
        },
    }
}
</script>

<!--样式添加scoped当时前设置的样式不全局污染-->
<style scoped>
    .wapper {
        width: 100%;
        height: 100%;
        background-color: #7868e6;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .login {
        width: 450px;
        height: 300px;
        background-color: #e4fbff;
        text-align: center;
        border-radius: 6px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.247);
    }
    .title {
        margin-bottom: 40px;
    }

</style>
