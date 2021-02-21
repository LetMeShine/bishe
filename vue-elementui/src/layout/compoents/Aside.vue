<template>
    <el-aside width="200px">
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="$route.path" exact
            class="el-menu-vertical-demo" router>
            <SideItem v-for="v in get_routes[0].children" :key="v.path" :item="v" :path="v.path"/>
        </el-menu>
    </el-aside>
</template>

<script>
    import {mapGetters} from 'vuex'
    import SideItem from './SideItem'
    export default {
        name: "Aside",
        computed:{
            ...mapGetters(['get_routes'])
        },
        components:{
            SideItem
        }
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