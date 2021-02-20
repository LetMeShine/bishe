<template>
    <div  ref="map" style="width: 480px;height:400px; margin: 40px 0; background-color: rgb(226,202,204);"></div>
</template>

<script>
    import {init} from 'echarts'
    import 'echarts/map/china'
    import {map} from './config'
    export default {
        data(){
            return {
            }
        },
        methods: {
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

</style>