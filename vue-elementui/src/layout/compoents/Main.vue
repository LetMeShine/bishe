<template>
    <el-main :class="isIndex">
        <!--二级路由-->
        <router-view />
    </el-main>
</template>

<script>
    export default {
        data(){
            return {
                isIndex: '',
            }
        },
        watch: {
            $route(to) {
                this.isIndex = to.fullPath === '/index' ? 'bg' : '';
            }
        },
        created(){
            this.isIndex = this.$route.fullPath === '/index' ? 'bg' : '';
        }
    }
</script>

<style scoped>
    .bg {
        background-color: #e5e9f2;
    }
    .el-main {
        color: #333;
        margin-top: 3px;
    }
</style>