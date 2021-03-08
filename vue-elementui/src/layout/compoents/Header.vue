<template>
    <el-header>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(v,i) in list" :key="i">
                <span v-if="i==list.length-1">{{v.meta.title}}</span>
                <router-link :to="v.path" v-else>{{v.meta.title}}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-dropdown @command="goBack">
            <span class="el-dropdown-link">
            退出<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出</el-dropdown-item>
                <!--<el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
                <!--<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
    import {logout} from '@/api/http'
    import {removeToken} from '@/utils/token'

    export default {
        name: 'logout',
        data() {
            return {
                list: [],// 面包屑
            }
        },
        methods: {
            /**
             * @description 获取面包屑
             */
            getBreadcrumb() {
                this.list = this.$route.matched.filter(item => item.meta && item.meta.title);
            },
            /**
             * @description 退出登录
             */
            goBack() {
                logout().then(res => {
                    let {code} = res.data;
                    if (code == 20000) {
                        //删除token
                        removeToken();
                        this.$router.push('/login');
                    }
                });
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb();
            }
        },
        created() {
            this.getBreadcrumb();
        },
    }
</script>

<style scoped>
    .el-breadcrumb {
        margin: 20px 10px;
    &> .right-menu {
        float: right;
    }
    }
    .el-header {
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 3px 3px #ccc;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>