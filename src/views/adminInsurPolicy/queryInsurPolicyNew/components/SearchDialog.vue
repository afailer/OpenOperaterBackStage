<template>
    <el-dialog
            class="dialog-style"
            width="80%"
            :visible="flowDetailDialogVisibleNew"
            @close="closeDialog">
        <div slot="title" class="header-title">
            <span >交易流水详情</span>
        </div>

        <div class="title">账户交易流水</div>
        <el-table
                :data="tradeInfo"
                fit
                :stripe="true"
                :highlight-current-row="true"
                :header-cell-style="$commonRowClass"
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
        </el-table>
        <div class="title">相关订单信息</div>
        <el-table
                :data="relatedOrders"
                fit
                :stripe="true"
                :header-cell-style="$commonRowClass"
                :highlight-current-row="true"
                border>
            <el-table-column
                    align="center"
                    prop="trade_no"
                    label="订单号">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="trade_type"
                    label="订单类型">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="pay_status"
                    label="订单状态"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="bill_amount"
                    label="应付金额"
                    width="80">
                <template slot-scope="scope">
                    {{scope.row.bill_amount/100}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="subsidy"
                    label="补贴金额"
                    width="80">
                <template slot-scope="scope">
                    {{scope.row.subsidy/100}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="subsidy"
                    label="优惠券（元）"
                    width="80">
                <template slot-scope="scope">
                    {{scope.row.coupon_amount/100}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="amount"
                    label="实付金额"
                    width="80">
                <template slot-scope="scope">
                    {{scope.row.amount/100}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="保单号">
                <template slot-scope="scope">
                    <div :class="{active: (exactFlag && exactFlag.type == 'policy_no' && exactFlag.key == scope.row.policy_no)}">{{scope.row.policy_no}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="desc"
                    label="订单描述">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="created_at"
                    label="创建时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="can_refund"
                    label="操作">
                <template slot-scope="scope">
                    <!-- 测试使用 暂时打开 12.17 -->
                    <el-button 
                    :disabled="(user.permissionPath&&(user.permissionPath.includes('*')||user.permissionPath.includes('/order_new/refund'))&&scope.row.can_refund>0)?false:true" 
                    type="primary" 
                    size="mini" 
                    @click="handleAction(scope.row)">退款</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="title">优惠信息</div>
        <el-table
                :data="couponInfo"
                fit
                :stripe="true"
                :highlight-current-row="true"
                :header-cell-style="$commonRowClass"
                border>
            <el-table-column
                    align="center"
                    prop="coupon_id"
                    label="券ID"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="heading"
                    label="券面标题">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="subheading"
                    label="券面副标题">
            </el-table-column>
            <el-table-column
                    prop="batch_discount_type_name"
                    align="center"
                    label="优惠券类型">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="discount_name"
                    label="面额">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="有效期"
                    width="165">
                <template slot-scope="scope">
                    {{scope.row.start_at}} ~ {{scope.row.end_at}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="applicable_type_name"
                    label="适用主体">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="applicable_platform_name"
                    label="适用平台">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="券状态"
                    width="70">
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
    name: "SearchDialog",
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'tradeFlowDetailNew',
            'flowDetailDialogVisibleNew',
            'exactFlag'
        ]),
        ...mapState([
            'user'
        ]),
        tradeInfo() {
            return this.tradeFlowDetailNew.tradeInfo
        },
        relatedOrders() {
            return this.tradeFlowDetailNew.relatedOrders
        },
        couponInfo() {
            return this.tradeFlowDetailNew.couponInfo
        }
    },
    methods: {
        //关闭dialog
        closeDialog() {
            this.$store.commit('CLOSE_DIALOG_NEW')
        },
        //退款操作
        handleAction(params) {
            const vm=this
            vm.$prompt('确认操作退款：目前剩余可退'+(params.can_refund/100)+'元', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
                inputPlaceholder:'请输入退款金额（非负数）！',
                inputValue:params.can_refund/100,
                inputErrorMessage:'输入框限定输入内容非空、正数、小数点后最多允许两位小数',
                customClass:'yuan'
            })
            .then(({value}) => {
                if(value>(params.can_refund/100)){
                    vm.$message({
                        type: 'warning',
                        message: '退款金额已超限！',
                        showClose:true
                    })
                }else{
                    vm.$confirm('是否确认退款'+value+'元？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let p = {
                            'trade_no_child': params.trade_no,
                            'refund_type': params.refund_type_id,
                            'trade_no': this.tradeInfo[0].trade_no,
                            'amount': parseInt(value*100)
                        }
                        return this.$store.dispatch('RefundOrderNew', p)
                    })
                    .then((res) => {
                        vm.$message({
                            type: 'success',
                            message: '退款成功！',
                            showClose:true
                        })
                        // if(res.data.result > 0){
                        //     vm.$message({
                        //         type: 'success',
                        //         message: '退款成功！'
                        //     })
                        // }else {
                        //     vm.$message.error(res.data.msg)
                        // }
                    })
                    .catch((e) => {
                        vm.$message({
                            type: 'error',
                            message: e
                        })
                        // if(e == 'cancel') {
                        //     vm.$message({
                        //         type: 'info',
                        //         message: e
                        //     })
                        // }
                    })
                }
            })
            .catch(() => {
                vm.$message({
                    type: 'info',
                    message: '已取消'
                });
            });



        },

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
    .title {
        margin: 20px 0;
        font-size: 16px;

        &:first-child {
             margin: 5px 0 20px;
        }
    }
    .active{
        color: #14892c;
        font-size: 14px;
        font-weight: 500;
    }
</style>
<style lang="scss">
.yuan{
    .el-input{
        text-align: center;
    }
    .el-input__inner{
        width:200px;
    }
    .el-input::after{
        content: '元';
        display: inline-block;
    }
}
</style>