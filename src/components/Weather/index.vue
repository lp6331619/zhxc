<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-07 09:46:56
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-09 10:45:29
-->
<template>
    <div class="box weather">
        <Title title="天气预报"></Title>
        <div class="top">
            <div class="left">
                <div class="time"> {{ str }} </div>
                <div class="day"> {{ day }}</div>
            </div>
            <div class="center">
                {{ weather.weather }} <br>
                {{ weather.temperature }} °C
            </div>
            <div class="right">
                <span
                    class="iconfont "
                    :class="icon[weather.weather]"
                ></span>
            </div>
        </div>
        <ul>
            <li
                v-for="(item,i) in data.forecasts"
                :key="i"
            >
                <div class="week">周{{ week(item.week) }}</div>
                <div
                    class="iconfont"
                    :class="icon[item.dayWeather]"
                >
                </div>
                <div class="wd">
                    {{ item.nightTemp }} ~ {{ item.dayTemp }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Title } from '@/components'
export default {
    title: 'Weather',
    name: 'Weather',
    components: { Title },
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        weather: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },

    data() {
        return {
            hour: 0, // 定义时，分，秒，毫秒并初始化为0；
            minute: 0,
            ms: 0,
            second: 0, // 秒
            time: '',
            str: '',
            icon: {
                '晴': 'icon-tianqi-qing',
                '少云': 'icon-tianqizitiku03',
                '晴间多云': 'icon-tianqizitiku04',
                '多云': 'icon-tianqizitiku02',
                '阴': 'icon-tianqizitiku05',
                '有风': 'icon-tianqizitiku06',
                '平静': 'icon-tianqizitiku07',
                '微风': 'icon-tianqizitiku08',
                '和风': 'icon-tianqizitiku09',
                '清风': 'icon-tianqizitiku10',
                '强风/劲风': 'icon-tianqizitiku11',
                '疾风': 'icon-tianqizitiku12',
                '大风': 'icon-tianqizitiku13',
                '烈风': 'icon-tianqizitiku14',
                '风暴': 'icon-tianqizitiku15',
                '狂爆风': 'icon-tianqizitiku16',
                '飓风': 'icon-tianqizitiku17',
                '热带风暴': 'icon-tianqizitiku19',
                '霾': 'icon-tianqizitiku44',
                '中度霾': 'icon-tianqi-wumai',
                '重度霾': 'icon-tianqi-wumai',
                '严重霾': 'icon-tianqi-wumai',
                '阵雨': 'icon-tianqizitiku20',
                '雷阵雨': 'icon-tianqizitiku22',
                '雷阵雨并伴有冰雹': 'icon-tianqizitiku24',
                '小雨': 'icon-tianqizitiku25',
                '中雨': 'icon-tianqizitiku26',
                '大雨': 'icon-tianqizitiku27',
                '暴雨': 'icon-tianqizitiku30',
                '大暴雨': 'icon-tianqizitiku31',
                '特大暴雨': 'icon-tianqizitiku32',
                '强阵雨': 'icon-tianqizitiku21',
                '强雷阵雨': 'icon-tianqizitiku23',
                '极端降雨': 'icon-tianqizitiku28',
                '毛毛雨/细雨': 'icon-tianqizitiku29',
                '雨': 'icon-tianqi-yu',
                '小雨-中雨': 'icon-tianqi-xiaoyuzhuanzhongyu',
                '中雨-大雨': 'icon-tianqi-zhongyuzhuandayu',
                '大雨-暴雨': 'icon-tianqi-dayuzhuanbaoyu',
                '暴雨-大暴雨': 'icon-tianqi-baoyuzhuandabaoyu',
                '大暴雨-特大暴雨': 'icon-tianqi-dayuzhuantedabaoyu',
                '雨雪天气': 'icon-tianqizitiku39',
                '雨夹雪': 'icon-tianqizitiku38',
                '阵雨夹雪': 'icon-tianqizitiku40',
                '冻雨': 'icon-tianqizitiku33',
                '雪': 'icon-tianqi-xue',
                '阵雪': 'icon-tianqizitiku41',
                '小雪': 'icon-tianqizitiku34',
                '中雪': 'icon-tianqizitiku35',
                '大雪': 'icon-tianqizitiku36',
                '暴雪': 'icon-tianqizitiku37',
                '小雪-中雪': 'icon-tianqi-xiaoxuezhuanzhongxue',
                '中雪-大雪': 'icon-tianqi-zhongxuezhuandaxue',
                '大雪-暴雪': 'icon-tianqi-baoxue',
                '浮尘': 'icon-tianqizitiku46',
                '扬沙': 'icon-tianqizitiku45',
                '沙尘暴': 'icon-tianqizitiku47',
                '强沙尘暴': 'icon-tianqizitiku48',
                '龙卷风': 'icon-tianqizitiku18',
                '雾': 'icon-tianqizitiku43',
                '浓雾': 'icon-tianqi-wu',
                '强浓雾': 'icon-tianqi-wu',
                '轻雾': 'icon-tianqi-wu',
                '大雾': 'icon-tianqi-wu',
                '特强浓雾': 'icon-tianqi-wu',
                '热': 'icon-tianqizitiku49',
                '冷': 'icon-tianqizitiku50',
                '未知': 'icon-tianqizitiku51'
            }
        }
    },
    computed: {
        day() {
            const day = this.weather.reportTime.split(' ')
            return day[0]
        }
    },
    created() {
        this.timeStart()
    },
    methods: {
        week(week) {
            let text = ''
            switch (week) {
                case '1':
                    text = '一'
                    break
                case '2':
                    text = '二'
                    break
                case '3':
                    text = '三'
                    break
                case '4':
                    text = '四'
                    break
                case '5':
                    text = '五'
                    break
                case '6':
                    text = '六'
                    break
                case '7':
                    text = '天'
                    break
            }
            return text
        },
        timeStart() {
            const date = new Date()
            this.hour = date.getHours()
            this.second = date.getSeconds()
            this.minute = date.getMinutes()
            this.time = setInterval(this.timer, 50)
        },
        timer() {
            this.ms = this.ms + 50
            if (this.ms >= 1000) {
                this.ms = 0
                this.second = this.second + 1
            }
            if (this.second >= 60) {
                this.second = 0
                this.minute = this.minute + 1
            }
            if (this.minute >= 60) {
                this.minute = 0
                this.hour = this.hour + 1
            }
            this.str = this.toDub(this.hour) + ':' + this.toDub(this.minute) + ':' + this.toDub(this.second)
        },
        toDub(n) { // 补0操作
            if (n < 10) {
                return '0' + n
            } else {
                return '' + n
            }
        },
        reset() { // 重置
            clearInterval(this.time)
            this.hour = 0
            this.minute = 0
            this.ms = 0
            this.second = 0
            this.str = '00:00:00'
        }
    }
}
</script>

<style lang="scss" >
.box {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    &.weather {
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            .left {
                padding-left: 10px;
                .time {
                    font-size: 24px;
                    font-weight: bold;
                }
                .day {
                    padding: 10px 0 0;
                    font-size: 12px;
                    text-align: center;
                }
            }
            .center {
                line-height: 26px;
                font-size: 14px;
            }
            .right {
                text-align: center;
                width: 100px;
                .iconfont {
                    font-size: 50px;
                    background-image: -webkit-linear-gradient(
                        bottom,
                        #3486da,
                        #44f0ff
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }
        ul {
            display: flex;
            justify-content: space-around;
            margin: 0;
            li {
                flex: 1;
                margin: 0 5px;
                background: rgba(255, 255, 255, 0.1);
                text-align: center;
                align-items: center;
                padding: 15px 10px;
                font-size: 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                .week {
                }
                .iconfont {
                    font-size: 30px;
                    padding: 5px 0;
                }
                .wd {
                    font-size: 10px;
                }
            }
        }
    }
}
</style>
