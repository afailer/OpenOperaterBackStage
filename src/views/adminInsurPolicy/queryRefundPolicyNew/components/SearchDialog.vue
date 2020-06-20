<template>
    <div>
        <el-dialog
            class="dialog-style"
            width="80%"
            :visible="isDialogShow"
            @close="isDialogShow=false">
            <div slot="title" class="header-title">
                <span>退款详情</span>
            </div>
            <div class="title">退款概要</div>
            <el-table
                :data="refundSummary"
                fit
                :stripe="true"
                :highlight-current-row="true"
                :header-cell-style="$commonRowClass"
                border>
                <el-table-column
                    align="center"
                    prop="policy_title"
                    label="保险产品"
                    width="120">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="policy_no"
                    label="保单号"
                    width="150">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="payman_name"
                    label="投保人">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="insured_name"
                    label="被保人">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="保单状态">
                    <PolicyState v-if="scope.row.policy_state !== undefined" :state="scope.row.policy_state" slot-scope="scope"></PolicyState>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="pay_duration"
                    label="月缴/年缴/趸缴">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="退款总额（元）"
                    width="100">
                    <template slot-scope="scope">
                        {{'-' + (scope.row.refund_amount/100).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="policy_state_type"
                    label="退款类型"
                    width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="refund_state"
                    label="退款状态"
                    width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作人"
                    width="100">
                    <template slot-scope="scope">
                        系统
                    </template>
                </el-table-column>
            </el-table>
            <div class="title">退款详情</div>
            <el-table
                :data="refundTimesList"
                fit
                :stripe="true"
                :header-cell-style="$commonRowClass"
                :highlight-current-row="true"
                border>
                <el-table-column
                    align="center"
                    prop="times"
                    label="期数"
                    width="80">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="应付金额（元）"
                    width="80">
                    <template slot-scope="scope">
                        {{(scope.row.receivable_fee/100).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="实付金额（元）"
                    width="80">
                    <template slot-scope="scope">
                        {{(scope.row.pay_fee/100).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="补贴金额（元）"
                    width="80">
                    <template slot-scope="scope">
                       {{(scope.row.discount_fee/100).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="trade_no"
                    label="原始商户交易号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="pay_at"
                    label="支付时间"
                    width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="refund_no"
                    label="退款商户交易号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="refund_amount"
                    label="退款金额（元）">
                    <template slot-scope="scope">
                        {{'-' + (scope.row.refund_amount/100).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="refund_at"
                    label="退款时间"
                    width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="refund_state"
                    label="订单状态"
                    width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="退款进度">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.refund_no" :class="{'disable': scope.row.refund_state !== '退款成功'}" type="primary" size="mini" @click="handleAction(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog class="small-dialog"
            width="30%"
            top="28vh"
            :modal=false
            :visible="isSmallDialogShow"
            @close="isSmallDialogShow=false">
            <div slot="title" class="header-title">
                <span>退款进度</span>
            </div>
            <el-table
                :data="refundQuery"
                fit
                :stripe="true"
                :highlight-current-row="true"
                :header-cell-style="$commonRowClass"
                border>
                <el-table-column
                    align="center"
                    prop="refund_type_name"
                    label="交易渠道">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="金额（元）"
                    width="100">
                    <template slot-scope="scope">
                        {{'-' + (scope.row.amount / 100).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="refund_at"
                    label="时间"
                    width="180">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import PolicyState from '@/components/insurPolicyDetail/components/PolicyState'
import {getRefundDetail, getRefundQuery} from '@/api/policy'
import commonApi from "@/api/commonApi"
export default {
    name: "SearchDialog",
    components: {
        PolicyState,
    },
    data() {
        return {
            isDialogShow: false,
            isSmallDialogShow: false,
            refundSummary: [],
            refundTimesList: [],
            refundQuery: []
        }
    },
    created() {
        this.$bus.on('openDialog', (res) => {
            try {
                this.$loading()
                commonApi.getRefundDetail({
                    policy_id: res.policy_id,
                    user_id: res.user_id
                }).then(res => {
                    this.isDialogShow = true
                    this.refundSummary = [res.data]
                    this.refundTimesList = res.data.details_list
                    this.$loading().close()
                }).catch(() => {
                    this.$loading().close()
                })
            } catch (e) {
                this.$loading().close()
            }
        })
    },
    methods: {
        handleAction(val) {
            if (val.refund_state !== '退款成功') {
                return
            }
            try {
                this.$loading()
                commonApi.getRefundProgress({
                    refund_no: val.refund_no ? val.refund_no : '',
                    user_id: val.user_id ? val.user_id : ''
                }).then(res => {
                    this.isSmallDialogShow = true
                    this.refundQuery = res.data
                    this.$loading().close()
                }).catch(() => {
                    this.$loading().close()
                })
            } catch (e) {
                this.$loading().close()
            }
        }
    },
    destroyed() {
        this.$bus.off('openDialog')
    }
}
</script>
<style scoped lang="scss">
    .header-title {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 50px;
        background: #d8d8d8;
        border-bottom: 1px solid black;
        span {
            height: 50px;
            line-height: 50px;
            margin-left: 20px;
            font-size: 18px;
        }
    }
    .dialog-style {
        /*position: relative;*/
    }
    .small-dialog {
        .header-title {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 50px;
            background: #d8d8d8;
            border-bottom: 1px solid black;
            span {
                height: 50px;
                line-height: 50px;
                margin-left: 20px;
                font-size: 18px;
            }
        }
    }
    .title {
        margin: 20px 0;
        font-size: 16px;
        &:first-child {
             margin: 5px 0 20px;
        }
    }
    .disable{
        background-color: #ccc;
        border-color: #ccc;
    }
</style>
