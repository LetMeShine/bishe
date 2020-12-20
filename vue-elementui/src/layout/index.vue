<template>
    <div class="about">
        <el-container>
            <Aside />
            <el-container>
                <Header />
                <Main />
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {Aside, Header, Main} from './compoents'
    export default {
        components: {
            Aside,
            Header,
            Main
        }
    }
</script>

<style>
    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>