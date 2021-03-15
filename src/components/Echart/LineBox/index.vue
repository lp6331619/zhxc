<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-05 15:49:46
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-01 09:41:55
-->
<template>
    <div class="box">
        <div class="titleBoxIndex">
            <span class="radio"></span>
            {{ name }}
        </div>
        <div
            :id="id"
            :ref="id"
            class="pie"
        ></div>
    </div>
</template>
<script>
import echarts from 'echarts'

export default {
    name: 'LineBox',
    components: {},
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        id: {
            type: String,
            default: ''
        },
        title: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            name: undefined,
            array: {},
            xdata: [],
            color: ['#EB3B9E', '#1159EB', '#ECC642', '#11EB49'],
            myChart: undefined
        }
    },
    watch: {
        data: {
            handler(newValue, oldValue) {
                this.array = newValue
                this.xdata = []
                for (const i in this.array.xdata) {
                    this.xdata.push(this.array.xdata[i])
                }
                console.log(this.array, 333)
                this.init()
            },
            deep: true
        }
    },
    mounted() {
        this.name = this.data.name
        this.array = this.data
        for (const i in this.array.xdata) {
            this.xdata.push(this.array.xdata[i])
        }
        this.myChart = echarts.init(document.getElementById(this.id))
        this.init()
    },

    methods: {
        init() {
            // var i=0;
            // 基于准备好的dom，初始化echarts实例
            const series = []
            this.array.list.forEach((item, i) => {
                if (i === 0) {
                    series.push({
                        type: 'line',
                        showSymbol: false,
                        clip: true,
                        data: item.data,
                        name: item.name,
                        smooth: true,
                        smoothMonotone: 'x',
                        lineStyle: {
                            color: '#44F0FF'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#44F0FF' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#021132' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    })
                } else {
                    series.push({
                        type: 'line',
                        showSymbol: false,
                        clip: true,
                        name: item.name,
                        data: item.data,
                        smooth: true,
                        smoothMonotone: 'x',
                        lineStyle: {
                            color: this.color[i]
                        }
                    })
                }
            })
            // 绘制图表
            this.myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%']
                    }
                },
                legend: {
                    data: !this.title ? this.array.legend : [],
                    textStyle: {
                        color: '#fff'
                    }
                },
                color: ['#44F0FF', '#EB3B9E', '#1159EB', '#ECC642', '#11EB49', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                grid: {
                    left: '3%',
                    top: '10%',
                    right: '4%',
                    bottom: '20%',
                    containLabel: true
                },
                xAxis: {
                    splitLine: {
                        lineStyle: {
                            color: '#10234c'
                        }
                    },
                    boundaryGap: false,
                    axisLabel: {
                        show: true,
                        color: '#fff',
                        fontSize: 12,
                        formatter: function (params) {
                            const l = params.split(' ')
                            if (l.length > 1) {
                                return l[0] + '\n' + l[1]
                            } else {
                                return params
                            }
                        }
                    },
                    data: this.xdata
                },
                yAxis: {
                    min: 0,
                    axisLabel: {
                        show: true,
                        color: '#fff',
                        fontSize: 12
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#10234c'
                        }
                    },
                    label: {
                        color: '#fff'
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0
                }],
                series: series
            })
            return false
        }
    }
}
</script>

<style scoped>
.pie {
    width: 100%;
    height: 100%;
}
.box {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
