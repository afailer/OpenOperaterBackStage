<template>
    <div>
        <el-tabs v-model="activeName"
                 type="card">
            <el-tab-pane class="account-container"
                         v-for="(item, index) in axbAccountList"
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
                            prop="qsc_id"
                            label="轻松筹-账号ID">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="id"
                            :formatter="formatId"
                            label="e保-账号ID">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="updated_at"
                            label="最近登录时间">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!--activeTab="activeName"-->
        <SearchTable ></SearchTable>
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
    mounted() {
    },
    computed: {
        ...mapGetters([
            'axbAccountList',
        ]),
    },
    watch: {
        activeName(v, ov) {
            if(v == ov) {
                return false
            }
            this.$store.dispatch('SwitchAxbAccountTab', this.activeName)
        }
    },
    methods: {
        formatId(row, col, value) {
            if(value === 0) {
                return ''
            }else {
                return value
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .account-container {
        margin: 0 20px;
        .title {
            margin-bottom: 10px;
            font-size: 18px;
        }
    }
</style>
