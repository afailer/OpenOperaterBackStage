<template>
    <div>
        <el-tabs v-model="activeName"
                 type="card">
            <el-tab-pane class="account-container"
                         v-for="(item, index) in r"
                         :label="`账号${index+1}`"
                         :key="index">
                <div class="title">账户信息</div>
                <el-table
                        :stripe="true"
                        :data="item"
                        :header-cell-style="$commonRowClass"
                        border>
                    <el-table-column
                            align="center"
                            prop="nickname"
                            label="用户昵称">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="qsc_phone"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="id"
                            label="e保-账号ID">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="gender"
                            label="性别">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="height"
                            label="身高(cm)">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="weight"
                            label="体重(kg)">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="age"
                            label="年龄">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="updated_at"
                            label="最近登录时间"
                            width="100">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <SearchTable></SearchTable>
    </div>
</template>

<script>
import SearchTable from './SearchTable'
import {mapGetters} from 'vuex'

export default {
    name: "TabOfAccount",
    components: {
        SearchTable,
    },
    data() {
        return {
            activeName: 0,
        }
    },
    computed: {
        ...mapGetters([
            'youthAccountList',
        ]),
        r() {
            return this.youthAccountList
        }
    },
    watch: {
        activeName(v, ov) {
            this.$store.dispatch('SwitchYouthAccountTab', this.activeName)
        }
    },
}
</script>

<style scoped lang="scss">
    .account-container {
        margin: 0 20px;
    }
</style>
