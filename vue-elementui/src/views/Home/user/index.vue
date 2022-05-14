<template>
  <div class="app-container">
    <div class="title">
      <h3>个人中心</h3>
      <router-link to="/index">
        <h3 style="color: #fff">首页></h3>
      </router-link>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleFormRef"
      label-width="100px"
      class="demo-ruleForm myForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPass">
        <el-input
          type="password"
          v-model="ruleForm.oldPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input
          type="password"
          v-model="ruleForm.newPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">确认修改</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "userCenter",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    // 旧密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        if (this.ruleForm.newPass !== "") {
          this.$refs.ruleFormRef.validateField("newPass");
        }
        callback();
      }
    };
    // 新密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value === this.ruleForm.oldPass) {
        callback(new Error("两次密码重复"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: "",
        newPass: "",
        name: "",
      },
      rules: {
        oldPass: [{ validator: validatePass, trigger: "blur" }],
        newPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  // computed: {
  //   test() {
  //     return function (x) {
  //       return x == 0 ? "普通用户" : x == 1 ? "管理员" : "超级管理员";
  //     };
  //   },
  // },
  methods: {
    submitForm() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          this.$notify({
            //通知框
            title: "个人中心",
            message: "修改成功",
            type: "success",
            duration: 2000,
          });
        } else {
          console.log("error submit!!");
          this.$notify({
            //通知框
            title: "个人中心",
            message: "密码错误",
            type: "error",
            duration: 2000,
          });
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleFormRef.resetFields();
    },
  },
};
</script>
<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  padding: 100px;
  background-color: #7868e6;
  text-align: center;
}
.myForm {
  width: 400px;
  margin: 0 auto;
  padding-right: 50px;
  padding-top: 50px;
  height: 300px;
  text-align: center;
  background-color: #e4fbff;
  border-radius: 6px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.247);
}
.title {
  margin: 0 auto;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
