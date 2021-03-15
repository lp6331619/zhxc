<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-11-07 09:43:03
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-01 21:09:23
-->
<template>
    <div class="box Alarm">
        <Title :title="title"></Title>
        <ul>
            <li
                v-for="(item,i) in data"
                :key="i"
            >
                <div class="text">
                    {{ i+1 }}.
                    {{ item.var_alias }}
                </div>
                <div class="time"> {{ item.recordtime }} </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Title } from '@/components'
export default {
    title: 'Alarm',
    name: 'Alarm',
    components: { Title },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    created() { },
    methods: {}
}
</script>

<style lang="scss" >
.box {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    &.Alarm {
        ul {
            height: 100%;
            overflow: auto;
            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
                height: 1px;
            }
            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 10px;
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #26506e;
            }
            &::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                background: #aaa;
            }
        }
        li {
            display: flex;
            font-size: 12px;
            line-height: 40px;
            flex-wrap: nowrap;
            justify-content: space-between;
            padding: 0 10px;
            &:nth-child(2n) {
                background: rgba(0, 0, 0, 0.6);
            }
            .text {
                width: 230px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .time {
                color: #82d6ff;
                width: 100px;
                position: relative;
                text-align: right;
            }
        }
    }
}
</style>
