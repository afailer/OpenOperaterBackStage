<template>
    <div class="app-container">
        <div class="title">保单信息</div>
        <el-table
                :data="policyCurList"
                :stripe="true"
                :header-cell-style="$commonRowClass"
                :cell-style="setCellClass"
                :highlight-current-row="true"
                fit
                border>
            <el-table-column
                    align="center"
                    prop="policy_title"
                    label="保险名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="policy_no"
                    label="保单号">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="payman_name"
                    label="投保人"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="insured_name"
                    label="被保人"
                    width="75">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="保单状态"
                    width="80">
                <PolicyState :state="scope.row.policy_state" slot-scope="scope"></PolicyState>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="begin_at"
                    label="生效时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="end_at"
                    label="有效期至"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="labels"
                    label="特殊标识"
                    width="160">
                <template slot-scope="scope">
                    <template v-for="item in scope.row.labels">
                        <el-tag style="margin-left: 10px">{{item}}</el-tag>
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="platform"
                    label="平台"
                    width="60">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="updated_at"
                    label="更新时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="action"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="seePolicyDetail(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="pagination-style"
                :total="totalList"
                background
                @current-change="changePolicyListPage"
                @prev-click="changePolicyListPage"
                @next-click="changePolicyListPage"
                layout="prev, pager, next">
        </el-pagination>
        <el-tabs class="container"
                 v-model="activeName"
                 type="card">
            <el-tab-pane label="账户交易流水">
                <el-table
                    :data="orderCurList"
                    fit
                    :stripe="true"
                    :header-cell-style="$commonRowClass"
                    :highlight-current-row="true"
                    border>
                    <el-table-column
                            align="center"
                            prop="trade_no"
                            label="内部交易号"
                            width="280">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="transaction"
                            label="支付渠道-商户交易号"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="trade_type"
                            label="流水类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_action"
                            label="扣费方式">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="amount"
                            label="交易金额（元)">
                        <template slot-scope="scope">
                            {{scope.row.amount/100}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_status"
                            label="交易状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_time"
                            label="创建时间"
                            width="100">
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
                        :header-cell-style='styleObj'
                        class="pagination-style"
                        :page-count="orderListPage"
                        background
                        @prev-click="changeOrderPage"
                        @next-click="changeOrderPage"
                        layout="prev, next">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="异常流水">
                <el-table
                        :data="orderFailList"
                        fit
                        :stripe="true"
                        :header-cell-style="$commonRowClass"
                        :highlight-current-row="true"
                        border>
                    <el-table-column
                            align="center"
                            prop="trade_no"
                            label="内部交易号"
                            width="280">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="transaction"
                            label="支付渠道-商户交易号"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="trade_type"
                            label="流水类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_action"
                            label="扣费方式">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="amount"
                            label="交易金额（元)">
                        <template slot-scope="scope">
                            {{scope.row.amount/100}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_status"
                            label="交易状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_time"
                            label="创建时间"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleAction(scope.row)">查看</el-button>
                            <el-button type="warning" size="mini" 
                            :disabled="((getRoles.includes('2')||getRoles.includes('9'))&&scope.row.can_refund===1)?false:true" 
                            @click="abnormalRefund(scope.row)">退款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PolicyState from '../../../../components/insurPolicyDetail/components/PolicyState'

export default {
    components: {
        PolicyState,
    },
    data() {
        return {
            activeName: 0,
            styleObj:{
                'background': '#000000'
            }
        }
    },
    computed: {
        ...mapGetters([
            'policyList',
            'orderList',
            'roles'
        ]),
        policyCurList() {
            return this.policyList.policyList
        },
        orderCurList() {
            return this.orderList.orderCurList
        },
        orderListPage() {
            return this.orderList.orderListPage
        },
        totalList() {
            return this.policyList.totalList
        },
        orderFailList() {
            return this.orderList.orderFailList
        },
        getRoles(){
            return this.roles
        }
    },
    watch: {
        activeName (v, ov) {
            if(v == ov) {
                return false
            }
            if(v == 0) {
                this.$store.dispatch('UpdateOrderPage')
            }else if(v == 1) {
                this.$store.dispatch('GetEntrustFailed')
            }
        }
    },
    methods: {
        //保单列表分页
        changePolicyListPage(params) {
            this.$store.dispatch('GetPolicyList', params)
        },
        //订单列表分页
        changeOrderPage(params) {
            this.$store.dispatch('SwitchOrderPage', params)
        },
        //查看保单详情
        seePolicyDetail(params) {
            let path = this.$route.path
            let routeUrl = this.$router.resolve({
                path: "/insur-policy-detail",
                query: {
                    'redirect': path,
                    'policyId': params.policy_id
                }
            });
            window.open(routeUrl.href, '_blank')
        },
        //查看订单详情，打开dialog
        handleAction(r) {
            this.$store.dispatch('GetOrderInfoDetail', r.trade_no)
        },
        //单个cell样式处理
        setCellClass({row, column, rowIndex, columnIndex}) {
            if(columnIndex === 4) {
                return 'font-weight: 700'
            }  else {
                return ''
            }
        },
        // 异常流水退款
        abnormalRefund(row){
            const vm=this
            vm.$confirm('确认退款吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return vm.$store.dispatch('AbnormalRefundOrder', row)
            }).then((res) => {
                if(res.code===0){
                    vm.$message({
                        type: 'success',
                        message: res.message
                    })
                }else{
                    vm.$message.error(res.message)
                }
            }).catch((e) => {
                if(e == 'cancel') {
                    vm.$message({
                        type: 'info',
                        message: e
                    })
                }
            })
        }
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
