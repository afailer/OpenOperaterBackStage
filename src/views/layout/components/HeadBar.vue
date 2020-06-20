<template>
    <div class="head-bar">
        <div class="head-title">保险统一后台</div>
        <div class="head-name">{{name}}</div>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
                <i class="el-icon-caret-bottom">个人中心</i>
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>首页</el-dropdown-item>
                </router-link>
                <!-- 修改密码 -->
                <div @click="editPassword">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                </div>
                <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "HeadBar",
    data() {
        return {
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        }
    },
    computed: {
        ...mapGetters([
            'name',
        ])
    },
    methods: {
        logout() {
            this.$store.dispatch('FedLogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        },
        editPassword () {
            this.$store.dispatch('editPassword', true)
        }
    }
}
</script>

<style lang="scss" scoped>
.head-bar {
    width: 100%;
    height: 50px;
    background: #1a2735;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    .head-title {
        color: white;
        font-size: 26px;
        padding-left: 40px;
    }
    .head-name {
        color: white;
        font-size: 16px;
        flex-grow: 2;
        text-align: right;
        margin-right: 30px;
    }
}
.avatar-container {
    height: 50px;
    margin-right: 40px;
    position: relative;
    .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        line-height: initial;
        width: 105px;
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
        }
        .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;

            color: #fff;
            position: relative;
            right: 0;
            top: -15px;
        }
    }
}

</style>
