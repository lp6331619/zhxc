<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2019-11-11 09:45:36
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-29 11:24:37
-->
<template>
    <section class="app-main">
        <transition
            name="fade-transform"
            mode="out-in"
        >
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script>
export default {
    name: 'AppMain',
    data() {
        return {}
    },
    computed: {
        key() {
            return this.$route.path
        }
    }
}
</script>

<style scoped lang="scss">
.app-main {
    /*50 = navbar  */
}
.fixed-header + .app-main {
    padding-top: 50px;
}
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
