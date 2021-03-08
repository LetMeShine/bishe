<template>
    <el-container>
        <Aside/>
        <el-container direction="vertical">
            <Header/>
            <Main/>
        </el-container>
    </el-container>
</template>

<script>
    /**
    * @fileoverview 布局组件
    */
    import {Aside, Header, Main} from './compoents'

    export default {
        components: {
            Aside,
            Header,
            Main
        }
    }
</script>
<style scoped>
    .el-container {
        height: 100%;
    }
</style>