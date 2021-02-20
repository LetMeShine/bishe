<template>
    <div class="home">
        <PanelProup/>
        <!--<my-banner :items="imgs"></my-banner>-->
        <LineChart/>
        <div class="count">
            <Map/>
            <Ring/>
        </div>
    </div>

</template>

<script>

    import LineChart from './Line'
    import Map from './Map'
    import Ring from './Ring'
    import PanelProup from './PanelProup'
    export default {
        components: {
            LineChart,
            Map,
            Ring,
            PanelProup
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        background-color: #e5e9f2;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height: 150px;
        line-height: 20px;
        text-align: center;
        margin-bottom: 20px;
        padding-top: 35px;
        font-size: 20px;
        .number {
            font-weight: 700;
            color: #fff;
        }
    }
    .count {
        display: flex;
        justify-content: space-between;
    }
</style>