<template>
    <div class="box recent">
        <Title title="最新设备变量数据"></Title>
        <ul>
            <li
                v-for="(item,i) in data"
                :key="i"
            >
                <div class="time"> {{ item.refreshtime }} </div>
                <div class="text">
                    {{ item.var_alias }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Title } from '@/components'
export default {
    title: 'Recent',
    name: 'Recent',
    components: { Title },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {

        }
    },
    created() { },
    updated() {
        console.log(222)
    },
    methods: {}
}
</script>

<style lang="scss" >
.box {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    &.recent {
        ul {
            height: 100%;
            overflow: auto;
        }
        li {
            display: flex;
            font-size: 12px;
            line-height: 30px;
            flex-wrap: nowrap;
            justify-content: space-between;
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
                &:before {
                    content: '';
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    margin-top: -4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #44f0ff;
                }
                &:after {
                    content: '';
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    margin-top: -4px;
                    width: 0;
                    height: 100%;
                    border-left: 1px dashed #44f0ff;
                }
            }
            &:last-child .time:after {
                display: none;
            }
        }
    }
}
</style>
