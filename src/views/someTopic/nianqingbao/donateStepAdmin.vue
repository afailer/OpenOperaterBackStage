<template>
    <div class="app-container">
        <div class="title">步数配捐规则</div>
        <el-table
                :data="ruleList"
                fit
                :span-method="mergeSpanMethod"
                :header-cell-style="$commonRowClass"
                border>
            <el-table-column
                    align="center"
                    prop="type"
                    :formatter="formatterType"
                    label="类型">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="nodeStartSteps"
                    label="起始步数"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="nodeEndSteps"
                    label="截止步数"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="eachSteps"
                    label="单位步数"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="amount"
                    :formatter="formatterMoney"
                    label="单位步数可兑换金额（元）">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="maxStepsDay"
                    label="每日最多捐步数目"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="maxAmountDay"
                    :formatter="formatterMoney"
                    label="每日最多捐步金额"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="frequencyDay"
                    label="每日最多捐步次数"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="frequencyWeek"
                    label="每周最多捐步次数"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
                    width="300">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="changeDonationRule(scope.row)">修改兑换规则</el-button>
                    <el-button type="primary" size="mini" @click="changeLimitRule(scope.row)">修改限制规则</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="title">配捐设置</div>
        <el-table
                :data="donateConfig"
                fit
                :header-cell-style="$commonRowClass"
                border>
            <el-table-column
                    align="center"
                    prop="donationQuota"
                    :formatter="formatterMoney"
                    label="活动总预算(元)">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="donationQuotaUsed"
                    label="活动已使用预算（元）"
                    :formatter="formatterMoney"
                    width="200">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="donationQuotaLeft"
                    label="活动剩余预算（元）"
                    :formatter="formatterMoney"
                    width="200">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="donationWarningThreshold"
                    label="报警阈值"
                    width="150">
                <template slot-scope="scope">
                    {{scope.row.donationWarningThreshold}}%
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
            width="340">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="dialogQuotaVisible = true">调整总预算</el-button>
                    <el-button type="primary" size="mini" @click="dialogWarningVisible = true">修改阈值</el-button>
                    <el-button :type="scope.row.donationEnable?'danger':'success'" size="mini" @click="toggleDonation(scope.row)">{{scope.row.donationEnable? '暂停' : '开启'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="调整总预算"
                   width="450px"
                   :visible.sync="dialogQuotaVisible">
            <el-form :inline="true" :model="form">
                <el-form-item  label="总预算调整为" label-width='100px'>
                    <el-input v-model="form.quota"
                              type="number"
                              placeholder="总预算"
                              auto-complete="off"></el-input>
                </el-form-item>
                <span class="unit-style">元</span>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogQuotaVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveQuotaConfigDialog">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改阈值"
                   width="450px"
                   :visible.sync="dialogWarningVisible">
            <el-form :inline="true" :model="form">
                <el-form-item  label="报警阈值" label-width='100px'>
                    <el-input v-model="form.warningThreshold"
                              type="number"
                              placeholder="报警阈值"
                              auto-complete="off"></el-input>
                </el-form-item>
                <span class="unit-style">%</span>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWarningVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveWarningConfigDialog">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改限制规则"
                   width="450px"
                   :visible.sync="dialogLimitRuleVisible">
            <el-form :inline="true" :model="limitRule">
                <el-form-item  label="类型" label-width='140px'>
                    <div>{{limitRule.type ===1 ? '百万': '重疾'}}</div>
                </el-form-item>
                <el-form-item  label="每日最多捐步金额" label-width='140px'>
                    <el-input v-model="limitRule.maxAmountDay"
                              type="number"
                              placeholder="每日最多捐步金额"
                              auto-complete="off"
                              :step="0.01"></el-input>
                </el-form-item>
                <span class="unit-style">元</span>
                <el-form-item  label="每日最多捐步次数" label-width='140px'>
                    <el-input v-model="limitRule.frequencyDay"
                              type="number"
                              placeholder="每日最多捐步次数"
                              auto-complete="off"></el-input>
                </el-form-item>
                <span class="unit-style">次</span>
                <el-form-item  label="每周最多捐步次数" label-width='140px'>
                    <el-input v-model="limitRule.frequencyWeek"
                              type="number"
                              placeholder="每周最多捐步次数	"
                              auto-complete="off"></el-input>
                </el-form-item>
                <span class="unit-style">次</span>
                <el-form-item  label="每日最多捐步数" label-width='140px'>
                    <el-input v-model="limitRule.maxStepsDay"
                              type="number"
                              placeholder="每日最多捐步数	"
                              auto-complete="off"></el-input>
                </el-form-item>
                <span class="unit-style">步</span>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLimitRuleVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveLimitRule">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改兑换规则"
                   width="450px"
                   :visible.sync="dialogDonateRuleVisible">
            <el-form :inline="true" :model="donateRule">
                <el-form-item  label="类型" label-width='160px'>
                    <div>{{donateRule.type ===1 ? '百万': '重疾'}}</div>
                </el-form-item>
                <el-form-item  label="步数范围-起始（包含）" label-width='160px'>
                    <el-input v-model="donateRule.nodeStartSteps"
                              type="number"
                              placeholder="请输入步数"
                              auto-complete="off"></el-input>
                </el-form-item>
                <span class="unit-style">步</span>
                <el-form-item  label="步数范围-截止（不含）" label-width='160px'>
                    <el-input v-model="donateRule.nodeEndSteps"
                              type="number"
                              placeholder="请输入步数"
                              auto-complete="off"></el-input>
                </el-form-item>
                <span class="unit-style">步</span>
                <el-form-item  label="单位步数" label-width='160px'>
                    <el-input v-model="donateRule.eachSteps"
                              type="number"
                              placeholder="请输入步数"
                              auto-complete="off"></el-input>
                </el-form-item>
                <span class="unit-style">步</span>
                <el-form-item  label="单位步数可兑换金额" label-width='160px'>
                    <el-input v-model="donateRule.amount"
                              type="number"
                              placeholder="请输入金额"
                              auto-complete="off"
                              :step="0.01"></el-input>
                </el-form-item>
                <span class="unit-style">元</span>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDonateRuleVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDonateRule">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getDonationConfig, saveDonationQuotaConfig, saveDonationThresholdConfig, saveDonationStateConfig, saveDonationRuleConfig, saveDonationLimitConfig} from '@/api/youth'
export default {
    name: 'donateStepAdmin',
    data() {
        return {
            donateConfig: [],
            ruleList: [],
            dialogLimitRuleVisible: false,
            dialogDonateRuleVisible: false,
            dialogQuotaVisible: false,
            dialogWarningVisible: false,
            form: {
                quota: 100000,
                warningThreshold: 50,
            },
            limitRule: {},
            donateRule: {}
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        // 获取配置数据
        fetchData() {
            getDonationConfig().then((res)=> {
                if(res.code === 0) {
                    this.donateConfig = [res.data]
                    let illnessRuleList = res.data.donationRule.illness
                    let illnessDonationLimit = res.data.donationLimit.illness
                    illnessDonationLimit.type = 2
                    let millionRuleList = res.data.donationRule.million
                    let millionDonationLimit = res.data.donationLimit.million
                    millionDonationLimit.type = 1
                    let ill = illnessRuleList.map((item)=> {
                       return Object.assign(item, illnessDonationLimit)
                    })
                    let mil = millionRuleList.map((item)=> {
                        return Object.assign(item, millionDonationLimit)
                    })

                    this.illnessRuleListLength = illnessRuleList.length
                    this.millionRuleListLength = millionRuleList.length
                    this.ruleList = mil.concat(ill)
                }
            }).catch(console.log)
        },
        // 修改总预算
        saveQuotaConfigDialog() {
            if(this.form.quota) {
                let quota = parseInt(this.form.quota) * 100
                saveDonationQuotaConfig(quota).then(()=> {
                    this.fetchData()
                    this.dialogQuotaVisible = false
                }).catch(console.log)
            }else {
                this.$message({
                    message: '请输入总预算',
                    type: 'info',
                })
            }
        },
        // 修改告警阈值
        saveWarningConfigDialog() {
            let w = this.form.warningThreshold
            if(w && w <= 100 && w >= 0 ) {
                let warningThreshold = parseInt(this.form.warningThreshold)
                saveDonationThresholdConfig(warningThreshold).then(()=> {
                    this.fetchData()
                    this.dialogWarningVisible = false
                }).catch(console.log)
            }else {
                this.$message({
                    message: '请输入正确数值',
                    type: 'info',
                })
            }
        },
        // 活动开关
        toggleDonation(p) {
            let tx = [
                {tx:'确定开启配捐活动', status: 1},
                {tx:'确定暂停配捐活动', status: 0},
            ]
            this.$confirm(tx[p.donationEnable].tx, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return saveDonationStateConfig(tx[p.donationEnable].status)
            }).then(()=> {
                this.fetchData()
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
            }).catch((e) => {
                if(e === 'cancel') {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                }
            });
        },

        // 修改限制规则
        changeLimitRule(p) {
            let cp = Object.assign({}, p)
            cp.maxAmountDay = cp.maxAmountDay / 100
            this.limitRule = cp
            this.dialogLimitRuleVisible = true
        },
        // 将修改后的限制规则传到后端
        saveLimitRule() {
            let params = {}
            let {type, maxAmountDay, frequencyDay, frequencyWeek, maxStepsDay} = this.limitRule
            if(maxAmountDay < 0 || frequencyDay < 0 || frequencyWeek < 0 || maxStepsDay < 0) {
                this.$message({
                    message: '请输入正确数值',
                    type: 'info',
                })
                return
            }
            params.type = parseInt(type)
            params.maxAmountDay = parseInt(maxAmountDay * 100)
            params.frequencyDay = parseInt(frequencyDay)
            params.frequencyWeek = parseInt(frequencyWeek)
            params.maxStepsDay = parseInt(maxStepsDay)

            saveDonationLimitConfig(params).then(()=> {
                this.fetchData()
                this.dialogLimitRuleVisible = false
            }).catch(e => {
                console.log('修改限制规则出错了', e)
            })
        },

        // 修改兑换规则
        changeDonationRule(p) {
            let cp = Object.assign({}, p)
            cp.amount = cp.amount / 100
            this.donateRule = cp
            this.dialogDonateRuleVisible = true
        },
        // 将修改后的兑换规则传到后端
        saveDonateRule() {
            let params = {}
            let {type, nodeStartSteps, nodeEndSteps, eachSteps, amount} = this.donateRule
            if(nodeStartSteps < 0 || nodeEndSteps < 0 || eachSteps < 0 || amount < 0) {
                this.$message({
                    message: '请输入正确数值',
                    type: 'info',
                })
                return
            }
            params.type = parseInt(type)
            params.nodeStartSteps = parseInt(nodeStartSteps)
            params.nodeEndSteps = parseInt(nodeEndSteps)
            params.eachSteps = parseInt(eachSteps)
            params.amount = parseInt(amount * 100)
            saveDonationRuleConfig(params).then(()=> {
                this.fetchData()
                this.dialogDonateRuleVisible = false
            }).catch(e => {
                console.log('修改兑换规则出错了', e)
            })
        },
        // 合并单元格
        mergeSpanMethod({ row, column, rowIndex, columnIndex }) {
            let ml = this.millionRuleListLength
            let il = this.illnessRuleListLength
            if (columnIndex === 0 || columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8) {
                if (rowIndex === 0 ) {
                    return {
                        rowspan: ml,
                        colspan: 1
                    };
                } else if (rowIndex > 0 && rowIndex <= (ml - 1)) {
                    return  {
                        rowspan: 0,
                        colspan: 0
                    };
                } if (rowIndex === ml) {
                    return {
                        rowspan: il,
                        colspan: 1
                    };
                } else if (rowIndex > ml && rowIndex <= (ml + il - 1)) {
                    return  {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        // 金额: 分 to 元
        formatterMoney(row, column, cellValue) {
            return (cellValue/100).toLocaleString()
        },
        // 类型: 1 百万、 2 重疾
        formatterType(row, column, cellValue) {
            return cellValue === 1 ? '百万': '重疾'
        },
    }
}
</script>

<style lang="scss" scoped>
    .unit-style {
        display: inline-block;
        height: 43px;
        line-height: 43px;
        color: black;
    }
</style>
