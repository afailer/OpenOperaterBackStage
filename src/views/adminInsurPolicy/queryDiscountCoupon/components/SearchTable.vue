<template>
    <div class="app-container" v-if="total!==null">
        <div class="title">优惠券列表</div>
        <el-table
                :data="couponList"
                :stripe="true"
                :header-cell-style="$commonRowClass"
                :cell-style="setCellClass"
                :highlight-current-row="true"
                fit
                border>
            <el-table-column
                    align="center"
                    prop="coupon_id"
                    width="100"
                    label="券ID">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="heading"
                    label="券面标题"
                    width="130">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="subheading"
                    label="券面副标题"
                    width="150">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="batch_discount_type_name"
                    label="优惠类型"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="discount_name"
                    align="center"
                    label="面额"
                    width="100">
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
                    align="center"
                    prop="status"
                    label="券状态"
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
                class="pagination-style"
                :total="total"
                :page-size="20"
                background
                @current-change="changePolicyListPage"
                @prev-click="changePolicyListPage"
                @next-click="changePolicyListPage"
                layout="total, prev, pager, next">
        </el-pagination>
    </div>
</template>

<script>
import {getCouponList} from '@/api/discountCoupon'

export default {
    data() {
        return {
            couponList: [],
            total: null,
        }
    },
    created() {
        this.$bus.on('emitTableData', (tableData, searchParams) => {
            this.type = searchParams.type
            this.key = searchParams.key
            this.total = tableData.total
            this.couponList = tableData.list
            // console.log('couponList', this.couponList, this.type)
        })
        this.$bus.on('clearData', ()=> {
            this.couponList = []
            this.total = null
        })
    },
    methods: {
        //保单列表分页
        async changePolicyListPage(page) {
            try {
                this.$loading()
                let couponData = await getCouponList(this.type, this.key, page)
                this.couponList = couponData.data.coupon.list
                this.$loading().close()
            } catch (e) {
                this.$loading().close()
                console.log(e)
            }
        },
        handleAction(r) {
            this.$bus.emit('openDialog', r.coupon_id)
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
        this.$bus.off('emitTableData')
        this.$bus.off('clear')
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
