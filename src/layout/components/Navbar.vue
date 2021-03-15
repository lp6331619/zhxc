<template>
    <div class="navbarMenu">
        <div class="navbar">
            <!-- sidebar.opened -->
            <!-- <hamburger
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        /> -->
            <el-menu
                :default-active="active"
                class="el-menu-demo"
                mode="horizontal"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
            >
                <template v-for="(item,i) in menu">
                    <template v-if="i===parseInt((menuLength+1)/2)">
                        <li
                            :key="i"
                            class="logo"
                        >
                            <div class="logoDiv">
                                <img
                                    :src="data.company.logo?imgUrl+data.company.logo : logo"
                                    alt=""
                                >
                            </div>
                        </li>
                    </template>
                    <template v-if="item.childs && item.childs.length>0">
                        <el-submenu
                            :key="item.id"
                            :index="item.url"
                        >
                            <template slot="title">
                                <!-- @click="$router.push('/'+item.url)" -->
                                <a>
                                    <span
                                        class="iconfont"
                                        :class="item.icon"
                                    ></span>
                                    {{ item.title }}
                                </a>
                            </template>
                            <template v-if="item.childs && item.childs.length>0">
                                <el-menu-item
                                    v-for="(childs) in item.childs"
                                    :key="childs.id"
                                    :index="childs.url"
                                >
                                    <a @click="toDetail(childs.url)">
                                        <span
                                            class="iconfont"
                                            :class="childs.icon"
                                        > </span>{{ childs.title }}
                                    </a>
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <el-menu-item
                        v-else
                        :key="item.id"
                        :index="item.url"
                    >
                        <a @click="$router.push('/'+item.url)">
                            <span
                                class="iconfont"
                                :class="item.icon"
                            ></span>{{ item.title }}
                        </a>
                    </el-menu-item>
                </template>
                <el-menu-item index="3"><a @click="logout()">退出登录</a></el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FixiOSBug from './Sidebar/FixiOSBug'
export default {
    components: {
    },
    mixins: [FixiOSBug],
    data() {
        return {
            active: '1',
            logo: require('../../assets/image/10x/logo.png')
        }
    },
    computed: {
        ...mapGetters(['sidebar', 'menu', 'data']),
        menuLength() {
            return this.menu.length
        }
    },
    created() {
        console.log(this.data, 'menus')
        console.log(this.$router, 'router')
    },
    methods: {
        handleSelect(key, keyPath) {
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        toDetail(url) {
            this.$router.push('/' + url)
        }
    }
}
</script>

<style lang="scss" scoped>
.navbarMenu {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 100;
    height: 60px;
    overflow: hidden;
}
.navbar {
    .el-menu-demo {
        display: flex;
        justify-content: space-between;
    }
    height: 100px;
    overflow: hidden;
    background: url('../../assets/image/10x/headBg.png') no-repeat center;
    background-size: 100%;
    a {
        display: inline-block;
        height: 100%;
    }
}
.logo {
    max-width: 450px;
    height: 60px;
    padding: 0 80px;
    text-align: center;

    .logoDiv {
        position: relative;
        height: 100%;
        background: url('../../assets/image/10x/logoTop.png') no-repeat center;
        background-size: auto 100%;
        &::after,
        &::before {
            content: '';
            position: absolute;
            left: -80px;
            top: 0;
            bottom: 0;
            width: 80px;
            background: url('../../assets/image/10x/logoTop.png') no-repeat left;
            background-size: auto 100%;
        }
        &::after {
            left: auto;
            right: -80px;
            background: url('../../assets/image/10x/logoTop.png') no-repeat
                right;
            background-size: auto 100%;
        }
    }
    img {
        max-width: 100%;
        max-height: 100%;
    }
}
.el-menu {
    border: none;
    background: url('../../assets/image/10x/headeLine.png') no-repeat center
        bottom;
    background-size: cover;
    .iconfont {
        font-size: 20px;
    }
}
.iconfont {
    padding-right: 5px;
    position: relative;
    top: -2px;
}
</style>
