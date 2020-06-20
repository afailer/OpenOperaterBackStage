<template>
    <div v-if="total > 0" class="app-container">
        <div class="title">共有数据：{{total}}条</div>
        <el-table
            :data="refundList"
            :stripe="true"
            :header-cell-style="$commonRowClass"
            :highlight-current-row="true"
            fit
            border>
            <el-table-column
                align="center"
                prop="sku_title"
                width="145"
                label="保险产品">
            </el-table-column>
            <el-table-column
                align="center"
                prop="policy_no"
                label="保单号"
                width="130">
            </el-table-column>
            <el-table-column
                align="center"
                prop="applicant_name"
                label="投保人"
                width="75">
            </el-table-column>
            <el-table-column
                align="center"
                prop="insured_name"
                label="被保人"
                width="80">
            </el-table-column>
            <el-table-column
                align="center"
                label="保单状态"
                width="100">
                <PolicyState v-if="scope.row.policy_state_name !== undefined" :state="scope.row.policy_state_name" slot-scope="scope"></PolicyState>
            </el-table-column>
            <el-table-column
                align="center"
                prop="platform"
                label="平台"
                width="70">
            </el-table-column>
            <el-table-column
                align="center"
                prop="refund_fee"
                label="退款总额（元）"
                width="100">
                <template slot-scope="scope">
                    {{'-' + (scope.row.refund_fee/100).toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="policy_created_at"
                label="保单记录创建时间"
                width="100">
            </el-table-column>
            <el-table-column
                align="center"
                prop="refund_at"
                label="退款时间"
                width="100">
            </el-table-column>
            <el-table-column
                align="center"
                prop="refund_type_name"
                label="退款类型">
            </el-table-column>
            <el-table-column
                align="center"
                prop="refund_state_name"
                label="退款状态">
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleAction(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagination-style"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="params.page"
            :page-sizes="[10, 15, 20]"
            :page-size="15"
            layout="sizes, prev, pager, next"
            :total="total"></el-pagination>
    </div>
</template>
<script>
import PolicyState from '@/components/insurPolicyDetail/components/PolicyState'
import commonApi from "@/api/commonApi"
export default {
    components: {
        PolicyState,
    },
    data() {
        return {
            refundList: [],
            total: 0,
            params: {
                type: "",
                key: "",
                page: 1,
                page_size: 15
            }
        }
    },
    created() {
        this.$bus.on('search', (searchParams) => {
            // 获取用户列表
            try {
                this.params.type = searchParams.type
                this.params.key = searchParams.key
                this.getRefundList(this.params)
            } catch (e) {
                this.$bus.emit('clearData')
                this.$loading().close()
                console.log(e)
            }
        })
        this.$bus.on('clearData', () => {
            this.refundList = []
            this.total = 0
        })
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.params.page = val
            this.getRefundList(this.params)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.params.page = 1
            this.params.page_size = val
            this.getRefundList(this.params)
        },
        getRefundList (params) {
            try {
                this.$loading()
                commonApi.getRefundList(params).then(res => {
                    this.refundList = res.data.list
                    this.total = res.data.total
                    this.$loading().close()
                }).catch(() => {
                    this.$bus.emit('clearData')
                    this.$loading().close()
                })
            } catch (e) {
                this.$loading().close()
            }
        },
        //查看订单详情，打开dialog
        handleAction(r) {
            this.$bus.emit('openDialog', {
                policy_id: r.policy_id,
                user_id: r.user_id
            })
        }
    },
    destroyed() {
        this.$bus.off('search')
        this.$bus.off('clearData')
    }
}
</script>
<style scoped lang="scss">
    .app-container {
        position: relative;
    }
    .title {
        margin: 20px 0;
        font-size: 18px;

        &:first-child {
            margin: 0 0 20px;
        }
    }
    .container {
        margin-top: 20px;
    }
    .pagination-style {
        margin-top: 20px;
        width: 100%;
        text-align: center;
    }
</style>
