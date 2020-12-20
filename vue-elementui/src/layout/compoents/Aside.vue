<template>
    <div>
        <el-aside width="200px">
            <el-menu
                    router
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="/index">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/loan-input">
                    <i class="el-icon-menu"></i>
                    <span slot="title">贷款申请</span>
                </el-menu-item>
                <el-menu-item index="/input-manager">
                    <i class="el-icon-menu"></i>
                    <span slot="title">申请管理</span>
                </el-menu-item>

                <el-submenu index="/loan-approve">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>贷款审批</span>
                    </template>
                    <el-menu-item index="/first">初审</el-menu-item>
                    <el-menu-item index="/second">复审</el-menu-item>
                    <el-menu-item index="/end">终审</el-menu-item>
                </el-submenu>

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>

                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
    export default {
        name: "Aside"
    }
</script>

<style scoped>
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
</style>