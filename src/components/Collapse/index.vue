<template>
    <el-card class="box-card collapse">
        <el-collapse v-model="activeNames">
            <el-collapse-item :title="title" name="1" :accordion="true">
                <template slot="title">
                    {{ title }}
                    <div class="ml20">
                        <slot name="titleRight" class="ml20"></slot>
                    </div>
                </template>
                <slot name="content"></slot>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>

<script>
export default {
    title: 'Collapse',
    name: 'Collapse',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            activeNames: ['1']
        }
    },
    created() {},
    methods: {}
}
</script>

<style lang="scss" >
.box-card.collapse {
    .el-card__body {
        padding: 0 20px;
    }

    .el-collapse {
        border: none;
    }
    .el-collapse-item__content {
        font-size: 14px;
    }
    .el-collapse-item__header {
        padding: 18px 20px;
        border-bottom: 1px solid #ebeef5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: normal;
        height: 55px;
    }
}
</style>
