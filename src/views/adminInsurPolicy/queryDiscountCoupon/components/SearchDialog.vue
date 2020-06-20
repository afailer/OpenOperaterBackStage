<template>
    <div>
        <el-dialog
                class="dialog-style"
                width="80%"
                :visible="isDialogShow"
                @close="isDialogShow=false">
            <div slot="title" class="header-title">
                <span>优惠券详情</span>
            </div>
            <div class="title">券详情</div>
            <el-table
                    :data="couponSummary"
                    fit
                    :stripe="true"
                    :highlight-current-row="true"
                    :header-cell-style="$commonRowClass"
                    border>
                <el-table-column
                        align="center"
                        prop="batch_id"
                        label="券批次ID"
                        width="80">
                </el-table-column>
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
                    <!--缺枚举-->
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
            <div class="title">领用详情</div>
            <el-table
                    :data="orderLIst"
                    fit
                    :stripe="true"
                    :header-cell-style="$commonRowClass"
                    :span-method="arraySpanMethod"
                    :highlight-current-row="true"
                    border>
                <el-table-column
                        align="center"
                        prop="created_at"
                        label="领用时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="confirmed_at"
                        align="center"
                        label="使用时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="trade_no"
                        align="center"
                        label="关联商户交易号"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="order_no"
                        align="center"
                        label="关联订单"
                        width="130">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="order_type"
                        label="订单类型"
                        width="80">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="sku_title"
                        label="产品名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="policy_no"
                        label="保单号">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="receivable_fee"
                        label="应付金额（元）"
                        width="90">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="discount"
                        label="补贴金额（元）"
                        width="90">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="coupon_fee"
                        label="优惠券（元）"
                        width="90">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="pay_fee"
                        label="实付金额（元）"
                        width="90">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import {getCouponDetail} from '@/api/discountCoupon'

export default {
    name: "SearchDialog",
    data() {
        return {
            isDialogShow: false,
            isSmallDialogShow: false,
            couponSummary: [],
            orderLIst: []
        }
    },
    created() {
        this.$bus.on('openDialog', async (couponId) => {
            try {
                let couponDetail = await getCouponDetail(couponId)
                if(couponDetail.code === 0) {
                    this.isDialogShow = true
                    this.couponSummary = [couponDetail.data.coupon]
                    let couponOrderList = couponDetail.data

                    this.orderLIst = couponOrderList.order.list ? couponOrderList.order.list : [{}]
                    this.orderLIst[0].trade_no = couponOrderList.order.trade_no
                    this.orderLIst[0].confirmed_at = couponOrderList.coupon.confirmed_at
                    this.orderLIst[0].created_at = couponOrderList.coupon.created_at
                    console.log('this.couponOrderList2', couponOrderList)
                }
            } catch (e) {
                console.log(e)
            }
        })
    },
    methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 ) {
                if (rowIndex === 0) {
                    return {
                        rowspan: 100,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
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
</style>
