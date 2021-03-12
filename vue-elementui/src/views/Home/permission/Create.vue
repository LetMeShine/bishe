<template>
    <div class="create-user">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPwd">
                <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限分配" prop="permi">
                <el-radio-group v-model="ruleForm.permi">
                    <el-radio label="3" value="3">普通用户</el-radio>
                    <el-radio label="2" value="2">初审人员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="bottom">
                <el-button type="primary" @click="submitForm('ruleForm')">创建用户</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {createUser} from '@/api/http.js'
    export default {
        data() {
        return {
            ruleForm: {
                name: '',
                pwd: '',
                checkPwd: '',
                permi: '',
            },
            rules: {
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: this.validatePass, trigger: 'blur' }
                ],
                checkPwd: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: this.validatePass2, trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                permi: [
                    { required: true, message: '请分配权限', trigger: 'change' }
                ],
            }
        };
        },
        methods: {
            /**
             * @description 密码输入验证
             * 
             * @param {Object} rule 验证规则
             * @param {String} value 验证的数据
             * @param {Function} callback 回调函数
             * @returns {void}
             */
            validatePass(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm.checkPwd !== '') {
                    this.$refs.ruleForm.validateField('checkPwd');
                }
                    callback();
                }
            },
            /**
             * @description 再次确认密码
             * 
             * @param {Object} rule 验证规则
             * @param {String} value 验证的数据
             * @param {Function} callback 回调函数
             * @returns {void}
             */
            validatePass2(rule, value, callback){
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            },
            /**
             * @description 创建用户
             * 
             * @param {Object} formName 创建的用户对象
             * @returns {void}
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            username: this.ruleForm.name,
                            password: this.ruleForm.checkPwd,
                            type: this.ruleForm.permi
                        };
                        createUser(data);
                        this.$notify({
                            title: '创建用户',
                            message: '新增用户成功',
                            type: 'success',
                            duration: 2000
                        });
                        this.ruleForm = {
                            name: '',
                            pwd: '',
                            checkPwd: '',
                            permi: ''
                        }
                    } else {
                        return false;
                    }
                });
            },
            /**
             * @description 重置数据
             * 
             * @param {String} formName 重置的对象
             * @returns {void}
             */
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .create-user {
        /* width: 40%; */
        margin: 60px auto;
        width: 500px;
        height: 380px;
        background-color: #e4fbff;
        border-radius: 6px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.247);
        padding: 20px;
    }
    .bottom {
        text-align: center;
    }
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
</style>
