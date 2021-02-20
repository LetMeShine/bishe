<template>
    <div ref="chart" style="width: 440px;height: 400px; margin-top: 40px; background-color: rgb(237,218,189);"></div>
</template>

<script>
    // import echarts from 'echarts' //4.9.0
    import {init} from 'echarts' //5.0.0
    import {ring} from './config'
    export default {
        components: {
        },
        data(){
            return {
            }
        },
        methods: {
            /**
             * @description 初始化地图
             */
            initChart(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = init(this.$refs.chart);
                myChart.setOption(ring());
            }
        },
        mounted(){
            this.initChart();
        }
    }
</script>

<style lang="scss" scoped>
$darkColor: #000;

</style>