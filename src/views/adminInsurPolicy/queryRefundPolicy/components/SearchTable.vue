<template>
    <div v-if="total > 0" class="app-container">
        <div class="title" >共有数据：{{total}}条</div>
        <el-table
                :data="refundList"
                :stripe="true"
                :header-cell-style="$commonRowClass"
                :cell-style="setCellClass"
                :highlight-current-row="true"
                fit
                border>
            <!--<el-table-column-->
                    <!--align="center"-->
                    <!--prop=""-->
                    <!--width="80"-->
                    <!--label="退款批次">-->
            <!--</el-table-column>-->
            <el-table-column
                    align="center"
                    prop="policy_title"
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
                    prop="payman_name"
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
                <PolicyState v-if="scope.row.policy_state !== undefined" :state="scope.row.policy_state" slot-scope="scope"></PolicyState>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="platform"
                    label="平台"
                    width="70">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="refund_amount"
                    label="退款总额（元）"
                    width="100">
                <template slot-scope="scope">
                    {{'-' + (scope.row.refund_amount/100).toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="created_at"
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
                    prop="policy_state_type"
                    label="退款类型">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="refund_state"
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
                :total="total"
                background
                @current-change="changePolicyListPage"
                @prev-click="changePolicyListPage"
                @next-click="changePolicyListPage"
                layout="prev, pager, next">
        </el-pagination>
    </div>
</template>

<script>
import PolicyState from '@/components/insurPolicyDetail/components/PolicyState'
import {getRefundList} from '@/api/policy'

export default {
    components: {
        PolicyState,
    },
    data() {
        return {
            refundList: [],
            total: 0,
        }
    },
    created() {
        this.$bus.on('search', async (searchParams) => {
            // 获取用户列表
            try {
                this.$loading()
                let {type, key} = searchParams
                this.type = type
                this.key = key
                let refundData = await getRefundList(type, key)
                // let userIdList = userList.data.map(item => item.id)
                // this.userIdList = userIdList
                // let refundData = await getRefundList(userIdList)
                this.refundList = refundData.data.list
                this.total = refundData.data.total
                this.$loading().close()
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
        //保单列表分页
        async changePolicyListPage(params) {
            try {
                this.$loading()
                let refundData = await getRefundList(this.type, this.key, params)
                this.refundList = refundData.data.list
                this.$loading().close()
            } catch (e) {
                this.$loading().close()
                console.log(e)
            }
        },
        //查看订单详情，打开dialog
        handleAction(r) {
            this.$bus.emit('openDialog', r.policy_id)
        },
        //单个cell样式处理
        setCellClass({row, column, rowIndex, columnIndex}) {
            if(columnIndex === 4) {
                return 'font-weight: 700'
            }  else {
                return ''
            }
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
        margin-top: 10px;
        width: 100%;
        text-align: center;
    }
</style>
