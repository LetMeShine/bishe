<template>
    <el-header>
        Header,
        <el-button type="info" @click="goBack()">退出</el-button>
    </el-header>
</template>

<script>
    export default {
        methods:{
            goBack(){
                this.$router.push('/login')
            }
        },
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
</style>