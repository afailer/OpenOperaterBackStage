<template>
    <div class="container">
        <el-tabs v-model="activeName"
                 type="card">
            <el-tab-pane label="投/被保人信息">
                <div class="title">投保人信息</div>
                <el-table
                        :data="policyPayman"
                        :stripe="true"
                        :header-cell-style="$commonRowClass"
                        :highlight-current-row="true"
                        border>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="投保人姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="idcard_type"
                            label="证件类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="idcard"
                            label="证件号码">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="birth_date"
                            label="出生日期">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="age"
                            label="年龄">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sex"
                            label="性别">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="phone"
                            label="手机号">
                        <template slot-scope="scope">
                            <div>{{formatNum(scope.row&&scope.row.phone)}}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="title">被保人信息</div>
                <el-table
                        :stripe="true"
                        :highlight-current-row="true"
                        :header-cell-style="$commonRowClass"
                        :data="insuredUsers"
                        border>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="被保人姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="idcard_type"
                            label="证件类型">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="idcard"
                            label="证件号码">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="birth_date"
                            label="出生日期">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="age"
                            label="年龄"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sex"
                            label="性别"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="relation_is_self"
                            label="是否本人"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="insured_is_main"
                            label="是否主被保人"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="relation"
                            label="关系"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="social_security"
                            label="有无社保"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="action"
                            label="操作"
                            width="100">
                       <!-- <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleAction(scope.row)">修改关系</el-button>
                        </template>-->
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="保单缴费信息">
                <div class="title">保单缴费情况</div>
                <el-table
                        :data="policyPayList"
                        :stripe="true"
                        :highlight-current-row="true"
                        :header-cell-style="$commonRowClass"
                        max-height="1500"
                        border>
                    <el-table-column
                            align="center"
                            prop="period"
                            label="期次"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            min-width="120px"
                            prop="amount"
                            :formatter="formatAmount"
                            label="应缴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            min-width="120px"
                            prop="paid_amount"
                            :formatter="formatAmount"
                            label="实缴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            min-width="120px"
                            prop="subsidy_amount"
                            :formatter="formatAmount"
                            label="补贴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            min-width="110px"
                            prop="coupon_amount"
                            :formatter="formatAmount"
                            label="优惠券（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            min-width="120px"
                            prop="refund_amount"
                            :formatter="formatAmount"
                            label="退款金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            min-width="100px"
                            prop="subsidy_batch"
                            label="补贴批次">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="order_no"
                            label="订单号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="begin_at"
                            label="当期起期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="end_at"
                            label="当期止期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="should_paid_day"
                            :formatter="formatTime"
                            label="应缴日期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            min-width="150px"
                            prop="pay_at"
                            label="实际支付时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="expire_date"
                            label="宽限期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="payment_mode"
                            label="扣费方式">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_state"
                            label="期缴状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            min-width="150px"
                            prop="pay_duration"
                            label="月缴/年缴/趸缴/周缴">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <!-- 测试使用 暂时打开 12.17 -->
                            <el-button v-if="scope.row.refund_id" type="primary" size="mini" @click="handleRefund(scope.row)">退款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- 异常记录 -->
            <el-tab-pane label="异常记录">
                <div class="title">退保记录</div>
                <el-table
                    :data="surrenderDataList"
                    :stripe="true"
                    :highlight-current-row="true"
                    :header-cell-style="$commonRowClass"
                    border>
                    <el-table-column
                        align="center"
                        prop="policy_no"
                        label="保单号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="operator_name"
                        label="退保操作方">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="state_name"
                        label="退保状态">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="premium"
                        label="承保保费">
                        <template slot-scope="scope">
                            {{(scope.row.premium / 100).toFixed(2)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="premium"
                        label="总退款金额（元）">
                        <template slot-scope="scope">
                            {{(scope.row.ret_money / 100).toFixed(2)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="退保详情">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handlePop(scope.row.detail)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="created_at"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updated_at"
                        label="修改时间">
                    </el-table-column>
                </el-table>
                <div class="title">失败记录</div>
                <el-table
                    :data="policyFailedDataList"
                    :stripe="true"
                    :highlight-current-row="true"
                    :header-cell-style="$commonRowClass"
                    border>
                    <el-table-column
                        align="center"
                        prop="id"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="action"
                        label="类型">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="reason"
                        label="失败原因">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="请求">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handlePop(scope.row.request)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="响应">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handlePop(scope.row.response)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="created_at"
                        label="创建时间">
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination" v-if="totalNum > 0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="params.page"
                        :page-sizes="[10, 15, 20]"
                        :page-size="15"
                        layout="sizes, prev, pager, next"
                        :total="totalNum"
                    ></el-pagination>
                </div>
            </el-tab-pane>
            <!-- 系统日志 -->
            <el-tab-pane label="系统日志">
                <div class="title">系统日志</div>
                <el-table
                        :data="sysLogList"
                        :stripe="true"
                        :highlight-current-row="true"
                        border>
                    <el-table-column
                            align="center"
                            prop="id"
                            label="序号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="action"
                            label="类型"
                            width="80">
                    </el-table-column>
                    <!-- <el-table-column
                            align="center"
                            prop="msg"
                            label="失败原因"
                            width="80">
                    </el-table-column> -->
                    <el-table-column
                            align="center"
                            label="请求">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handlePop(scope.row.request_body)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="响应">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handlePop(scope.row.response_body)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="created_at"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button 
                            v-if="scope.row.can_retry"
                            type="primary" size="mini" @click="retry(scope.row)">重试</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination" v-if="totalNum > 0">
                    <el-pagination
                        @size-change="handleSizeChangeLog"
                        @current-change="handleCurrentChangeLog"
                        :current-page.sync="params.page"
                        :page-sizes="[10, 15, 20]"
                        :page-size="15"
                        layout="sizes, prev, pager, next"
                        :total="totalNum"
                    ></el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!-- code by tuyuanyang -->
        <el-dialog
        title="内容"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
            <el-container style="height: 400px;">
                <el-main class="treesView">
                    <div v-html="msg"></div>
                    <!-- <tree-view :data="msg" :options="{maxDepth: 3}"></tree-view> -->
                </el-main>
            </el-container>
        </el-dialog>

        <el-dialog
        title="重试"
        :visible.sync="retryVisible"
        width="564px">
            <div class="beginEnd">
                <span>保单「起/止」期：</span>
                <el-date-picker
                v-model="value1"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="~"
                start-placeholder="保单起期"
                end-placeholder="保单止期">
                </el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="retryVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmRetry">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import commonApi from "@/api/commonApi"
export default {
    name: "TabDetail",
    data() {
        return {
            activeName: 0,
            params: {
                policy_id: this.$route.query.policyId,
                page: 1,
                pagesize: 15
            },
            totalNum: 0,
            surrenderDataList: [],
            policyFailedDataList: [],
            sysLogList: [],

            dialogVisible:false,
            msg:'',
            retryVisible:false,
            value1: [],
            retry_policy_id:''
        }
    },
    created() {},
    computed: {
        ...mapGetters([
            'policyDetailNew',
        ]),
        policyPayman() {
            return this.policyDetailNew.policyPayman
        },
        insuredUsers() {
            return this.policyDetailNew.insuredUsers
        },
        policyPayList() {
            return this.policyDetailNew.policyPayList
        },
        // policyFailedDataList() {
        //     return this.policyDetailNew.policyFailedList
        // },
        // surrenderDataList() {
        //     return this.policyDetailNew.surrenderList
        // },
        // sysLogList() {
        //     return this.policyDetailNew.sysLogList;
        // }
    },
    watch: {
        //切换tab标签
        activeName(v, ov) {
            if(v == ov) {
                return false
            }
            if(v == 0) {
                // this.$store.dispatch('GetPolicyViewNew')
            }else if(v == 1) {
                console.log('GetPolicyPaymentNew')
                this.$store.dispatch('GetPolicyPaymentNew')
            }else if(v == 2) {
                // this.$store.dispatch('GetPolicyFailedListNew')
                this.params.page = 1
                this.params.pagesize = 15
                this.getSurrenderList()
                this.getPolicyFailedList(this.params)
            }else if(v == 3) {
                // console.log('ddd4')
                // this.$store.dispatch('GetSysLogListNew')
                this.params.page = 1
                this.params.pagesize = 15
                this.getSysLogList(this.params)
            }
        }
    },

    methods: {
        //电话号码脱敏
        formatNum(tel){
            if(tel){
                let n = tel.substr(0, 3) + '****' + tel.substr(7)
                return n
            }
        },
        //退款操作
        handleRefund(params) {
            let policy_id = sessionStorage.getItem('INSUE_DETAIL')
            let p = {
                'refund_id': params.refund_id,
                'refund_type': params.refund_type,
                policy_id,
            }
            this.$confirm('确认操作退款?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.$store.dispatch('RefundPolicyNew', p)
            }).then((res) => {
                if(res =='0'){
                    this.$message.error('退款失败，该订单不可退款')

                }else if(res == '-1') {
                    this.$message.error('退款失败，请联系开发人员')
                }else {
                    this.$message({
                        type: 'success',
                        message: res
                    })
                }
            }).catch((e) => {
                if(e == 'cancel') {
                    this.$message({
                        type: 'info',
                        message: e
                    })
                }
            })
        },
        handlePop(data) {
            let msg = "";
            try{
                let newData
                newData = data.replace(/\r\n/g, '<br>')
                newData = newData.replace(/\n/g, '<br>')
                newData = newData.replace(/\s/g, '&nbsp;')
                newData = newData.replace(/\r\n/g, '')
                newData = newData.replace(/\n/g, '')
                newData = newData.replace(/\s/g, '')
                newData = newData.replace(/\\u/gi,'%u')
                let dataJson = JSON.parse(unescape(newData))
                msg = this.handleJsonToHTML(dataJson);
            } catch(e){
                msg = data;
            }
            this.msg=msg
            this.dialogVisible=true
        },


        // 点击异常记录查看关闭弹窗
        handleClose() {
            this.dialogVisible=false
        },

        /**
         * 处理json转字符串，用于格式化展示在textarea中
         * @method handleJsonToString
         * @param {Object} obj 规则的json
         * @param {Number} f 所处的json层级
         * @return {String} 格式化后的字符串
         */
        handleJsonToHTML(obj, f) {
            let floor = f ? f : 0;
            let str = '{<br>';
            let keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                let item = obj[keys[i]];
                let key = keys[i];
                // 引用对象继续遍历
                str += ('&nbsp;&nbsp;&nbsp;&nbsp;').repeat(floor + 1);    //加tab
                switch (typeof item) {
                    case 'object':
                        if (Array.isArray(item)) {
                            str += '"' + key + '":[';
                            item.forEach((subItem, index) => {
                                str += typeof subItem === 'object' ? this.handleJsonToHTML(subItem, floor + 1) : subItem;

                                if (index !== item.length -1) {
                                    str += ','
                                }
                            })
                            str += ']';
                        } else {
                            str += '"' + key + '":' + this.handleJsonToHTML(item, floor + 1);
                        }
                        break;
                    case 'number':
                        str += '"' + key + '":' + item;
                        break;
                    case 'string':
                        str += '"' + key + '":"' + item + '"';
                        break;
                    case 'boolean':
                        str += '"' + key + '":' + item;
                        break;
                    default:
                }
                if (i !== keys.length - 1) {
                    str += ',<br>'
                }
            }
            str += '<br>';
            str += ('&nbsp;&nbsp;&nbsp;&nbsp;').repeat(floor) + '}'
            return str;
        },
        // 金额处理成分
        formatAmount(row, col, value){
            // console.log('value', value)
            if(typeof value === 'number') return value/100;
            return value
        },
        // 应缴日期
        formatTime(row, col, value){
            let time_arr=value.split(' ')
            return time_arr[0]
        },
        // 保单异常单-退保记录
        getSurrenderList () {
            commonApi.getSurrenderList({
                policy_id: this.params.policy_id
            }).then(res => {
                if (res.code === 0) {
                    this.surrenderDataList = res.data
                }
            })
        },
        // 保单异常单-投保失败记录
        getPolicyFailedList (params, page = 1) {
            commonApi.getPolicyFailedList({
                policy_id: params.policy_id,
                page: page,
                pagesize: params.pagesize
            }).then(res => {
                this.policyFailedDataList = []
                if (res.code === 0) {
                    this.totalNum = res.data.total
                    this.policyFailedDataList = res.data.list
                }
            })
        },
        // 系统日志
        getSysLogList (params, page = 1) {
            commonApi.getSysLogList({
                policy_id: params.policy_id,
                page: page,
                pagesize: params.pagesize
            }).then(res => {
                this.sysLogList = []
                if (res.code === 0) {
                    this.totalNum = res.data.total
                    this.sysLogList = res.data.list
                }
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.params.page = 1
            this.params.pagesize = val
            this.getPolicyFailedList(this.params)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.params.page = val
            this.getPolicyFailedList(this.params, val)
        },
        handleSizeChangeLog(val) {
            console.log(`每页 ${val} 条`)
            this.params.page = 1
            this.params.pagesize = val
            this.getSysLogList(this.params)
        },
        handleCurrentChangeLog(val) {
            console.log(`当前页1: ${val}`)
            this.params.page = val
            this.getSysLogList(this.params, val)
        },
        // 系统日志--重试
        retry(row){
            this.retryVisible=true
            this.retry_policy_id=row.policy_id
            let begin_at_arr=this.policyDetailNew.basis.begin_at.split(' ')
            let policy_endat_arr=this.policyDetailNew.basis.policy_endat.split(' ')
            this.value1[0]=begin_at_arr[0]
            this.value1[1]=policy_endat_arr[0]
        },
        confirmRetry(done){
            const vm=this
            let begin_at=vm.value1&&vm.value1[0] ? vm.value1[0]+' 00:00:00' : ''
            let policy_endat=vm.value1&&vm.value1[1] ? vm.value1[1]+' 23:59:59' : ''
            vm.$confirm('确定重试吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                vm.$loading()
                commonApi.newRetry(
                    parseInt(vm.retry_policy_id),
                    begin_at,
                    policy_endat
                )
                .then(res => {
                    vm.$message({
                        type: 'success',
                        message: '重试成功！',
                        duration: 1500,
                        showClose: true
                    })
                    vm.retryVisible=false
                    vm.params.page = 1
                    vm.params.pagesize = 15
                    vm.getSysLogList(vm.params)
                })
                .catch(function(err) {
                    console.log(err)
                })
                .finally(()=>{
                    vm.$loading().close()
                })
            }).catch(() => {
                vm.$message({
                    type: 'info',
                    message: '已取消',
                    duration: 1500,
                    showClose: true
                })
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .container {
        margin-top: 20px;
    }
    .title {
        margin: 20px 0;
        font-size: 18px;
        &:first-child {
             margin: 0 0 20px;
        }
    }
    .pagination{
        margin: 20px;
        text-align: center;
    }
    .treesView{
        .tree-view-wrapper{
            overflow: visible;
        }
        /deep/ .tree-view-item-key{
            display: none;
        }
    }
    /deep/ .el-dialog__body{
        padding:0px 20px;
    }
    .beginEnd{
        padding:20px 0;
    }
</style>
