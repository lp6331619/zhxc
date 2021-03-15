<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-05 15:49:46
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-03 10:16:08
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
    name: 'Bar',
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
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            myChart: undefined,
            dataArray: undefined
        }
    },
    watch: {
        data: {
            handler(newValue, oldValue) {
                this.dataArray = newValue
                this.init()
            },
            deep: true
        }
    },
    mounted() {
      /* console.log(this.data,'bar')
        this.name = this.data.name */
        this.myChart = echarts.init(document.getElementById(this.id))
        this.dataArray = this.data
        this.init()
    },
    methods: {
        init() {
            // var i=0;
            // 基于准备好的dom，初始化echarts实例
            if (this.dataArray) {
                // 绘制图表
                const data = this.dataArray.series
                var options = {
                    legend: {
                        top: 10,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        bottom: '45%'
                    },
                    tooltip: {},
                    dataZoom: [{
                        type: 'inside',
                        start: 0
                    }, {
                        start: 0
                    }],
                    color: [
                        new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, // 4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                            [
                                { offset: 0, color: '#44f0ff' },
                                { offset: 1, color: '#3486da' }
                            ] // 数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, // 4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                            [
                                { offset: 0, color: '#fd377d' },
                                { offset: 1, color: '#3486da' }
                            ] // 数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, // 4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                            [
                                { offset: 0, color: '#fdd57d' },
                                { offset: 1, color: '#3487da' }
                            ] // 数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                        )
                    ],
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            lineStyle: {
                                color: '#10234c'
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: '#fff',
                            fontSize: 10,
                            lineHeight: 16,
                            formatter: function (params) {
                                let text = ''
                                for (let i = 1; i < params.length; i++) {
                                    text += params[i]
                                    if (i % 5 === 0) {
                                        text += '\n'
                                    }
                                }
                                return text
                            }
                        },
                        data: this.dataArray.xdata
                    },
                    yAxis: [{
                        splitLine: {
                            lineStyle: {
                                color: '#10234c'
                            }
                        },
                        position: 'left',
                        axisLabel: {
                            show: true,
                            color: '#fff',
                            fontSize: 12
                        }
                    },{
                        splitLine: {
                            lineStyle: {
                                color: '#10234c'
                            }
                        },
                        position: 'right',
                        axisLabel: {
                            show: true,
                            color: '#fff',
                            fontSize: 12
                        }
                    },],
                    series: [
                        {
                            type: 'bar',
                            name: data[0].name,
                            itemStyle: {
                                barBorderRadius: [5, 5, 0, 0]
                            },
                            barWidth: 6,
                            data: data[0].data,
                             yAxisIndex: 1
                        },
                        {
                            type: 'bar',
                            name: data[1].name,
                            itemStyle: {
                                barBorderRadius: [5, 5, 0, 0]
                            },
                            barWidth: 6,
                            data: data[1].data
                        }
                    ]
                }
                if(data[2]){
                  options.series.push({
                    type: 'bar',
                    name: data[2].name,
                    itemStyle: {
                        barBorderRadius: [5, 5, 0, 0]
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#EE6666'
                        }
                    },
                    barWidth: 6,
                    data: data[2].data,
                     yAxisIndex: 1
                  });
                }
                this.myChart.setOption(options)
            }
        }
    }
}
</script>

<style scoped>
.pie {
    width: 100%;
    height: 110%;
}
.box {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
