<template>
    <div class="app-container">
        <div class="title">保单信息</div>
        <el-table
                :data="youthPolicyList"
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
                    prop="policy_state"
                    label="保单状态"
                    width="80">
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
        <el-tabs class="container"
                 v-model="activeName"
                 type="card">
            <el-tab-pane label="保费奖励">
                <div class="title">保费奖励总览</div>
                <el-table
                        :data="youthTotalPremium"
                        fit
                        :stripe="true"
                        :header-cell-style="$commonRowClass"
                        :highlight-current-row="true"
                        border>
                    <el-table-column
                            align="center"
                            prop="premiumTotal"
                            :formatter="formatterMoney"
                            label="累计总保费奖励（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="premiumMillion"
                            :formatter="formatterMoney"
                            label="累计总百万奖励（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="premiumIllness"
                            :formatter="formatterMoney"
                            label="累计重疾奖励（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="premiumSurplusTotal"
                            :formatter="formatterMoney"
                            label="剩余总保费奖励（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="premiumSurplusMillion"
                            :formatter="formatterMoney"
                            label="剩余百万奖励（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="premiumSurplusIllness"
                            :formatter="formatterMoney"
                            label="剩余重疾奖励（元）">
                    </el-table-column>

                    <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="amount"-->
                            <!--label="交易金额（元)">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.amount/100}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
                <div class="title">保费奖励流水</div>
                <el-table
                    :data="youthPremiumList"
                    fit
                    :stripe="true"
                    :header-cell-style="$commonRowClass"
                    :highlight-current-row="true"
                    border>
                    <el-table-column
                            align="center"
                            prop="id"
                            label="奖励流水号"
                            width="280">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="type"
                            :formatter="formatterType"
                            label="奖励类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="amount"
                            :formatter="formatterMoney"
                            label="奖励金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="createdAt"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="updatedAt"
                            label="修改时间">
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="pagination-style"
                        :page-count="youthPremiumPage"
                        background
                        @prev-click="changePremiumPage"
                        @next-click="changePremiumPage"
                        layout="prev, next">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="步数记录">
                <el-table
                        :data="youthUserStepList"
                        fit
                        :stripe="true"
                        :header-cell-style="$commonRowClass"
                        :highlight-current-row="true"
                        border>
                    <el-table-column
                            align="center"
                            prop="recordDate"
                            :formatter="formatterDate"
                            label="运动日期">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="steps"
                            label="步数">
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="amount"-->
                            <!--label="可配捐金额（元)">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.amount/100}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                            align="center"
                            prop="createdAt"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="updatedAt"
                            label="更新时间">
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="pagination-style"
                        :page-count="youthUserStepPage"
                        background
                        @prev-click="changeUserStepPage"
                        @next-click="changeUserStepPage"
                        layout="prev, next">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="捐步记录">
                <el-table
                        :data="youthUserDonationList"
                        fit
                        :stripe="true"
                        :header-cell-style="$commonRowClass"
                        :highlight-current-row="true"
                        border>
                    <el-table-column
                            align="center"
                            prop="donationItemId"
                            label="筹款项目ID">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="donationItem"
                            label="筹款项目名称"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="donationAmount"
                            :formatter="formatterMoney"
                            label="捐款金额（元)">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="donationSteps"
                            label="配捐步数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="updatedAt"
                            label="捐赠时间"
                            width="100">
                    </el-table-column>
                    <el-pagination
                            class="pagination-style"
                            :page-count="youthUserDonationPage"
                            background
                            @prev-click="changeDonationPage"
                            @next-click="changeDonationPage"
                            layout="prev, next">
                    </el-pagination>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="裂变红包">
                <div class="total-info">
                    <span>红包总金额:{{youthUserRedPacket && youthUserRedPacket.total_amount}}元</span>
                    <span>红包已提现金额:{{youthUserRedPacket && youthUserRedPacket.cash_amount}}元</span>
                </div>
                <el-table
                        :data="youthUserRedPacketList"
                        fit
                        :stripe="true"
                        :header-cell-style="$commonRowClass"
                        :highlight-current-row="true"
                        border>
                    <el-table-column
                            align="center"
                            prop="envelope_id"
                            label="红包ID">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="type"
                            label="类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="create_time"
                            label="发起/拆-时间"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="count"
                            label="参与人数">
                        <template v-if="scope.row.type==='发起'" slot-scope="scope">
                            {{scope.row.count}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="cash_state"
                            label="提现状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="amount"
                            label="红包金额（元)">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="update_at"
                            label="更新时间"
                            width="100">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
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
            'youthPolicyList',
            'youthTotalPremium',
            'youthPremiumList',
            'youthPremiumPage',
            'youthUserStepPage',
            'youthUserStepList',
            'youthUserDonationList',
            'youthUserDonationPage',
            'youthUserRedPacket',
        ]),
        youthUserRedPacketList() {
            if(this.youthUserRedPacket) {
                return this.youthUserRedPacket.list
            } else {
                return []
            }
        },
    },
    watch: {
        activeName (v, ov) {
            if(v == ov) {
                return v
            }
            if(v == 0) {
                this.$store.dispatch('SwitchYouthPremiumPage', parseInt(this.youthPremiumPage) - 1)
            }else if(v == 1) {
                this.$store.dispatch('GetYouthUserStep', parseInt(this.youthUserStepPage) - 1)
            }else if(v == 2) {
                this.$store.dispatch('GetYouthUserDonation', parseInt(this.youthUserStepPage) - 1)
            }else if(v == 3) {
                this.$store.dispatch('GetYouthUserRedPacket')
            }
        }
    },
    methods: {
        // 年轻保保费奖励分页
        changePremiumPage(params) {
            this.$store.dispatch('SwitchYouthPremiumPage', params)
        },
        // 步数分页
        changeUserStepPage(params) {
            this.$store.dispatch('GetYouthUserStep', params)
        },
        // 捐赠步数分页
        changeDonationPage(params) {
            this.$store.dispatch('GetYouthUserDonation', params)
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
        // 金额 分 to 元
        formatterMoney(row, column, cellValue) {
            return cellValue/100
        },
        // 类型: 1 百万、 2 重疾
        formatterType(row, column, cellValue) {
            return cellValue === 1 ? '百万': '重疾'
        },
        // 日期
        formatterDate(row, column, cellValue) {
            let date = cellValue.split(' ')[0]
            return date
        },
        //单个cell样式处理
        setCellClass({row, column, rowIndex, columnIndex}) {
            if(columnIndex === 4) {
                return 'font-weight: 700'
            }  else {
                return ''
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .app-container {
        position: relative;
    }
    .title {
        margin-bottom: 20px;
        font-size: 18px;
    }
    .container {
        margin-top: 20px;
    }

    .pagination-style {
        margin-top: 10px;
        width: 100%;
        text-align: center;
    }
    .total-info {
        padding-bottom: 10px;
        span {
            padding: 0 20px 10px ;
        }
    }

</style>
