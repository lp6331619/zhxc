<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-05 15:49:46
 * @LastEditors: Teemor
 * @LastEditTime: 2020-11-07 19:15:14
-->
<template>
    <div class="box">
        <Title :title="title"></Title>
        <div
            :id="id"
            class="today"
        >
            <ul>
                <li
                    v-for="(item,i) in data"
                    :key="i"
                >
                    <div class="b"> {{ item }}</div>
                    {{ out[i] }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Title } from '@/components'
export default {
    name: 'Pie',
    components: { Title },
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
            type: String,
            default: ''
        }
    },
    data() {
        return {
            out: {
                equipment_num: '巡检站点',
                item_num: '巡检项目',
                task_num: '巡检任务'
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {

        }
    }
}
</script>

<style lang="scss" scoped>
.today {
    height: 100%;
}
.today ul {
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    li {
        text-align: center;
        color: #fff;
        font-size: 12px;
        border-radius: 20px 0;
        border: 1px solid #20bcfc;
        padding: 20px;
        box-shadow: #20bcfc 0px 0px 18px inset;
        .b {
            font-size: 25px;
            font-weight: bold;
            color: #6ec0ff;
        }
        &:nth-child(2) .b {
            color: #79d8ff;
        }
        &:nth-child(3) .b {
            color: #6effe5;
        }
    }
}
</style>
