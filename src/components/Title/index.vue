<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2020-09-30 12:27:21
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-01 09:38:46
-->
<template>
    <div class="titleBoxIndex">
        <span class="radio"></span>
        {{ title }}
    </div>
</template>
<script>
// lazyAMapApiLoaderInstance
export default {
    name: 'Title-box',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
</style>
