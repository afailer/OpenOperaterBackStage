<template>
    <div class="app-container">
        <div class="title">权益信息</div>
        <el-table
                :data="rightsList"
                :stripe="true"
                :header-cell-style="$commonRowClass"
                :cell-style="setCellClass"
                :highlight-current-row="true"
                :span-method="spanMethod"
                fit
                border>
            <el-table-column
                    align="center"
                    prop="rightTitle"
                    width="210"
                    label="权益名称">
                <template slot-scope="scope">
                    <div class="rightTitle">
                        <img :src="scope.row.imgSrc" alt="">
                        <div>{{scope.row.rightTitle}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="activeTime"
                    label="激活时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="endAt"
                    label="有效期至">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="policyNO"
                    label="保单号">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="action"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button v-if="canRefund" type="primary" size="mini" @click="handleRefund(scope.row)">退款</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="title">账户交易流水</div>
        <el-table
            :data="orderInfo"
            fit
            :stripe="true"
            :header-cell-style="$commonRowClass"
            :highlight-current-row="true"
            border>
            <el-table-column
                    align="center"
                    prop="trade_no"
                    label="微信-商户单号"
                    width="280">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="axb_order_no"
                    label="爱心保订单号"
                    width="260">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="amount"
                    label="交易金额（元)">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="pay_status"
                    label="交易状态">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="pay_at"
                    label="支付时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="refund_at"
                    label="退款时间"
                    width="100">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import time from './handleDate'

export default {
    data() {
        return {
            status:['已激活', '未激活', '已失效', '退款中', '退款失败', '退款完成']
        }
    },
    computed: {
        ...mapGetters([
            'axbCurInfo',
        ]),
        rightsList() {
            let status1, status2, endAtYear
            let fastHospitalEndAt = ''
            let healthyTestActive = ''
            let healthyTestEndAt = ''
            if (this.axbCurInfo.pay_at) {
                endAtYear = time.afterAYear(this.axbCurInfo.pay_at)

                if (!time.validityPeriodYear(this.axbCurInfo.pay_at)) {
                    status1 = this.status[2]
                    status2 = this.status[2]
                    healthyTestActive = this.axbCurInfo.begin_at
                    healthyTestEndAt = endAtYear
                } else {
                    status1 = this.status[0]
                    if (this.axbCurInfo.active_at) {
                        healthyTestActive = this.axbCurInfo.active_at
                        healthyTestEndAt = endAtYear
                        fastHospitalEndAt = time.afterMonth(this.axbCurInfo.active_at)
                        if (time.validityPeriodMonth(this.axbCurInfo.end_at)) {
                            status2 = this.status[0]
                        } else {
                            status2 = this.status[2]
                        }
                    } else {
                        status2 = this.status[1]
                    }
                }
                let refundState = this.axbCurInfo.refund_state

                if (refundState === 0) {
                    this.canRefund = true
                }else if(refundState === 10) {
                    this.canRefund = false
                    status1 = this.status[3]
                    status2 = this.status[3]
                }else if (refundState === 20) {
                    this.canRefund = true
                    status1 = this.status[4]
                    status2 = this.status[4]
                }else if (refundState === 30) {
                    this.canRefund = false
                    status1 = this.status[5]
                    status2 = this.status[5]
                }
            } else {
                return []
            }
            let t = [
                {
                    rightTitle: '爱心保·儿童成长测评',
                    imgSrc: '/static/someTopic/aixinbao/icon1.png',
                    activeTime: this.axbCurInfo.pay_at,
                    endAt: endAtYear,
                    status: status1,
                    policyNO: '',
                },
                {
                    rightTitle: '爱心保·筹款绿色通道',
                    imgSrc: '/static/someTopic/aixinbao/icon2.png',
                    activeTime: this.axbCurInfo.pay_at,
                    endAt: endAtYear,
                    status: status1,
                    policyNO: '',
                },
                {
                    rightTitle: '爱心保·百万医疗意外险',
                    imgSrc: '/static/someTopic/aixinbao/icon3.png',
                    activeTime: this.axbCurInfo.begin_at,
                    endAt: this.axbCurInfo.end_at,
                    status: status2,
                    policyNO: this.axbCurInfo.policy_no,
                },
                {
                    rightTitle: '爱心保·快速就医',
                    imgSrc: '/static/someTopic/aixinbao/icon4.png',
                    activeTime: this.axbCurInfo.active_at,
                    endAt: fastHospitalEndAt,
                    status: status2,
                    policyNO: '',
                },
                {
                    rightTitle: '爱心保·体检',
                    imgSrc: '/static/someTopic/aixinbao/icon5.png',
                    activeTime: healthyTestActive,
                    endAt: healthyTestEndAt,
                    status: status2,
                    policyNO: '',
                },
            ]
            return t
        },
        orderInfo() {
            if(JSON.stringify(this.axbCurInfo) !== '{}') {
                this.axbCurInfo.amount= 10
                this.axbCurInfo.pay_status = '已支付'
            }
            return [this.axbCurInfo]
        }

    },
    methods: {
        // 合并最后一列
        spanMethod({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 5) {
                if (rowIndex <= 4) {
                    return [5, 1]
                }
            }
        },
        //单个表格样式
        setCellClass({row, column, rowIndex, columnIndex}) {
            if(columnIndex === 3) {
                return 'font-weight: 700'
            }  else {
                return ''
            }
        },
        // 退款
        handleRefund() {
            this.$confirm('确认操作退款?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.$store.dispatch('RefundAXB')
            }).then((res) => {
                this.$message({
                    type: 'success',
                    message: res
                })
            }).catch((e) => {
                if(e == 'cancel') {
                    this.$message({
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
    .rightTitle {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
            width: 40px;
            height: 30px;
            padding-right: 10px;
        }
    }

</style>
