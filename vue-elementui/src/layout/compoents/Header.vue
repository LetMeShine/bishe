<template>
    <el-header>
        <div>首页</div>
        <el-dropdown>
            <span class="el-dropdown-link">
            退出<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="goBack()">退出</el-dropdown-item>
                <!--<el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
                <!--<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
    import {logout} from '@/api/login'
    import {delToken} from "@/utils/token";

    export default {
        methods: {
            goBack() {
                logout().then((res) => {
                    delToken();
                    let {code} = res.data;
                    if (code === 20000) {
                        this.$router.push('/login')
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .el-header {
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>