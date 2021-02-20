//指定图表的配置项和数据
//折线图
export function line() {
    return {
        // title: {
        //     text: '折线图堆叠'
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['2019', '2020']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '2019',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
            },
            {
                name: '2020',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310, 132, 101, 134, 90, 230]
            }
        ]
    };
}
//地图
export function map() {
    return {
        title: {
            text: '申请人分布位置'
        },
        series: [{
            type: 'map',
            map: 'china',
            label: {
                show: true
            },
            data: [
                {name: '北京', value: 20057},
                {name: '上海', value: 15477},
                {name: '新疆', value: 34432},
                {name: '西藏', value: 3245},
                {name: '青海', value: 265},
                {name: '浙江', value: 11205},
                {name: '广东', value: 9681}
            ]
        }],
        tooltip: {
            trigger: 'item',
            //地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
            formatter: '城市名：{b}<br/>数据：{c}人'
        },
        visualMap: {
            min: 100,
            max: 50000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
            // feature: {
                // dataView: {readOnly: false}, // 数据设置
                // restore: {}, // 刷新
                // saveAsImage: {} // 下载
            // }
        // }
    }
}
//环形图
export function ring() {
    return {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 1048, name: '申请人数'},
                    {value: 735, name: '审核通过'},
                    {value: 484, name: '贷款成功'},
                    {value: 300, name: '审核未通过'}
                ]
            }
        ]
    };
}