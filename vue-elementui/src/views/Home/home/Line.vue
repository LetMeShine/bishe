<template>
    <div ref="chart" class="chart"></div>
</template>

<script>
    // import echarts from 'echarts' //4.9.0
    import {init} from 'echarts' //5.0.0
    import {line} from './config'
    export default {
        components: {
        },
        data(){
            return {
            }
        },
        methods: {
            /**
             * @description 初始化折线图
             */
            initChart(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = init(this.$refs.chart);
                myChart.setOption(line());
            }
        },
        mounted(){
            this.initChart();
        }
    }
</script>

<style lang="scss" scoped>
    .chart {
        width: 100%;
        height: 400px;
        background-color:rgb(199,228,219);
    }
</style>