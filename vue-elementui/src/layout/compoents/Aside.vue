<template>
    <el-aside width="200px">
        <el-menu
                router
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="/index">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/loan-input">
                <i class="el-icon-s-order"></i>
                <span slot="title">贷款申请</span>
            </el-menu-item>
            <el-menu-item index="/input-manager">
                <i class="el-icon-s-management"></i>
                <span slot="title">申请管理</span>
            </el-menu-item>

            <el-submenu index="/loan-approve">
                <template slot="title">
                    <i class="el-icon-s-claim"></i>
                    <span>贷款审批</span>
                </template>
                <el-menu-item index="/first">初审</el-menu-item>
                <el-menu-item index="/second">复审</el-menu-item>
                <el-menu-item index="/end">终审</el-menu-item>
            </el-submenu>
            <el-menu-item index="/contract-manager">
                <i class="el-icon-s-finance"></i>
                <span slot="title">标的管理</span>
            </el-menu-item>
            <el-submenu index="/permission">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>权限管理</span>
                </template>
                <el-menu-item index="/create">创建用户</el-menu-item>
                <el-menu-item index="/userList">用户列表</el-menu-item>
            </el-submenu>

        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "Aside"
    }
</script>

<style scoped>
    li {
        text-align: left;
    }
    .el-aside {
        background-color: #545c64;
    }
    .el-menu {
        border: none;
    }
</style>