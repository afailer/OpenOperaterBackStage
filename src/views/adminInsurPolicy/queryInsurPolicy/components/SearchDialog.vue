<template>
    <el-dialog
            class="dialog-style"
            width="80%"
            :visible="flowDetailDialogVisible"
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
            <!--<el-table-column-->
                    <!--align="center"-->
                    <!--prop="trade_source"-->
                    <!--label="交易来源">-->
            <!--</el-table-column>-->
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
                    prop="id"
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
                        slot="reference"
                        :disabled="(user.permissionPath&&(user.permissionPath.includes('*')||user.permissionPath.includes('/v1/refund/entrust/apply'))&&scope.row.can_refund>0)?false:true" 
                        type="primary" 
                        size="mini" 
                        @click="handleAction(scope.row)">退款</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {getInfo} from '@/api/login'

export default {
    name: "SearchDialog",
    computed: {
        ...mapGetters([
            'tradeFlowDetail',
            'flowDetailDialogVisible',
            'exactFlag'
        ]),
        ...mapState([
            'user'
        ]),
        tradeInfo() {
            return this.tradeFlowDetail.tradeInfo
        },
        relatedOrders() {
            return this.tradeFlowDetail.relatedOrders
        }
    },
    methods: {
        //关闭dialog
        closeDialog() {
            this.$store.commit('CLOSE_DIALOG')
        },
        //退款操作
        handleAction(params) {
            const vm=this
            vm.$prompt('确认操作退款：目前剩余可退'+(params.can_refund/100)+'元', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // inputPattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
                inputPattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
                inputPlaceholder:'请输入退款金额（非负数）！',
                inputValue:params.can_refund/100,
                // inputErrorMessage: '请输入退款金额（非负数）！'
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
                            'id': params.id,
                            'entity_type': params.entity_type,
                            'trade_no': vm.tradeInfo[0].trade_no,
                            'amount': parseInt(value*100)
                        }
                        return vm.$store.dispatch('RefundOrder', p)
                        
                    })
                    .then((res) => {
                        console.log('res')
                        console.dir(res)

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
                        // if(e == 'cancel') {
                        //     vm.$message({
                        //         type: 'info',
                        //         message: e
                        //     })
                        // }
                        vm.$message({
                            type: 'error',
                            message: e
                        })
                    })
                }
            })
            .catch(() => {
                vm.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
            
            
        }
    }
}
</script>

<style lang="scss">
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
