<template>
    <div  ref="map"  class="map"></div>
</template>

<script>
    import {init} from 'echarts'
    import 'echarts/map/js/china'
    // import './china'
    import {map} from './config'
    export default {
        data(){
            return {
            }
        },
        methods: {
            /**
             * @description 初始化地图
             */
            initMap(){
                let myChart = init(this.$refs.map);
                myChart.setOption(map());
            }
        },
        mounted(){
            this.initMap();
        },
    }
</script>

<style lang="scss" scoped>
    .map {
        width: 480px;
        height:400px;
        margin: 40px 0;
        background-color: rgb(226,202,204);
        padding: 20px;
    }
</style>