<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-05 15:49:46
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-03 10:17:02
-->
<template>
    <div class="box">
        <div class="titleBoxIndex">
            <span class="radio"></span>
            {{ title }}
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
    name: 'Pie',
    components: {},
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        id: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        piename: {
            type: String,
            default: ''
        },
        pie: {
            type: Boolean,
            default: false
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
        this.myChart = echarts.init(document.getElementById(this.id))
        this.dataArray = this.data
        this.init()
    },
    methods: {
        init() {
            // var i=0;
            // 基于准备好的dom，初始化echarts实例
            // 绘制图表
            const nameArray = []
            const dataArray = []
            this.dataArray.forEach((item, i) => {
                nameArray.push(item.name)
                dataArray.push({
                    value: item.num, name: item.name, itemStyle: {
                        normal: {
                            color: i === 1 ? '#46BFF8' : new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, // 4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                                [
                                    { offset: 0, color: '#3486DA' },
                                    { offset: 1, color: '#FD377D' }
                                ] // 数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                            )
                        }
                    }
                })
            })
            const radius = this.pie ? '50%' : ['40%', '48%']
            this.myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                bottom: 10,
                legend: {
                    orient: 'vertical',
                    right: 10,
                    top: '40%',
                    textStyle: {
                        color: '#fff'
                    },
                    data: nameArray
                },
                startAngle: 90,
                series: [
                    {
                        name: this.piename,
                        type: 'pie',
                        left: '-20%',
                        top: '-12%',
                        radius: radius,
                        label: {
                            show: true,
                            color: '#fff'
                        },
                        labelLine: {
                            show: true,
                            length: 15,
                            length2: 20,
                            lineStyle: {
                                color: '#BD87F1',
                                width: 1
                            }
                        },
                        data: dataArray
                    }
                ]
            })
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
