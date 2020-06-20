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
                        border>
                    <el-table-column
                            align="center"
                            prop="period"
                            label="期次"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="amount"
                            label="应缴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="paid_amount"
                            label="实缴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="subsidy_amount"
                            label="补贴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="refund_amount"
                            label="退款金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="subsidy_batch"
                            label="补贴批次">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="should_paid_day"
                            label="应缴日期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="paid_date"
                            label="实际支付时间"
                            width="100">
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
                            label="支付状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_duration"
                            label="月缴/年缴/趸缴">
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
                <div class="title">
                    异常续期情况
                    <el-button 
                    style="float:right;margin-bottom:15px" 
                    v-if="policyDetail.patch.length>0&&(user.permissionPath&&(user.permissionPath.includes('/v1/policy/pushrenew')||user.permissionPath.includes('*')))"
                    @click="tryRebuild"
                    type="primary">尝试重建</el-button>
                </div>
                <el-table
                        :data="patch"
                        :stripe="true"
                        :highlight-current-row="true"
                        :header-cell-style="$commonRowClass"
                        border>
                    <el-table-column
                            align="center"
                            prop="period"
                            label="期次"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="amount"
                            label="应缴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="paid_amount"
                            label="实缴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="subsidy_amount"
                            label="补贴金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="refund_amount"
                            label="退款金额（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="subsidy_batch"
                            label="补贴批次">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="should_paid_day"
                            label="应缴日期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="paid_date"
                            label="实际支付时间"
                            width="100">
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
                            label="支付状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="pay_duration"
                            label="月缴/年缴/趸缴">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.tryrenew_id>0" type="primary" size="mini" @click="retry(scope.row)">重试</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
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
                            prop="end_policy_type_desc"
                            label="保单结束状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="state_desc"
                            label="退保状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="premium"
                            label="承保保费">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="退保详情">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handlePop(scope.row.content)">查看</el-button>
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
                <div class="title">投保失败记录</div>
                <el-table
                        :data="policyFailedDataList"
                        :stripe="true"
                        :highlight-current-row="true"
                        :header-cell-style="$commonRowClass"
                        border>
                    <el-table-column
                            align="center"
                            prop="id"
                            label="ID"
                            width="80">
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
            </el-tab-pane>
            <el-tab-pane label="系统日志">
                <div class="title">系统日志</div>
                <el-table
                        :data="sysLogList"
                        :stripe="true"
                        :highlight-current-row="true"
                        :header-cell-style="$commonRowClass"
                        border>
                    <el-table-column
                            align="center"
                            prop="id"
                            label="ID"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="request"
                            label="发起"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="内容">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handlePop(scope.row.content)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="created_at"
                            label="创建时间">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!--<el-tab-pane label="扩展信息"></el-tab-pane>-->
        </el-tabs>
        <el-dialog
        title="续期失败重试"
        :visible.sync="dialogVisible"
        width="400px">
        <div class="demo-input-suffix">
            目标续期期次：
            <el-input v-model="input" v-enter-number clearable placeholder="请输入正整数"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="renewal()">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
import commonApi from "@/api/commonApi"
export default {
    name: "TabDetail",
    data() {
        return {
            activeName: 0,
            dialogVisible:false,
            input:'',
            id:''
        }
    },
    created() {},
    computed: {
        ...mapGetters([
            'policyDetail'
        ]),
        ...mapState([
            'user'
        ]),
        policyPayman() {
            return this.policyDetail.policyPayman
        },
        insuredUsers() {
            return this.policyDetail.insuredUsers
        },
        policyPayList() {
            return this.policyDetail.policyPayList
        },
        patch(){
            return this.policyDetail.patch
        },
        policyFailedDataList() {
            return this.policyDetail.policyFailedList
        },
        surrenderDataList() {
            return this.policyDetail.surrenderList
        },
        sysLogList() {
            return this.policyDetail.sysLogList;
        }
    },
    watch: {
        //切换tab标签
        activeName(v, ov) {
            if(v == ov) {
                return false
            }
            if(v == 0) {
                // this.$store.dispatch('GetPolicyView')
            }else if(v == 1) {
                this.$store.dispatch('GetPolicyPayment')
            }else if(v == 2) {
                this.$store.dispatch('GetPolicyFailedList')
            }else if(v == 3) {
                this.$store.dispatch('GetSysLogList')
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
                return this.$store.dispatch('RefundPolicy', p)
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
        retry(row){
            console.dir(row)
            this.dialogVisible=true
            this.input=row.period_int
            this.id=row.tryrenew_id
        },
        renewal(){
            const vm=this
            let reg = /^[1-9]\d*$/
            if(reg.test(vm.input)){
                vm.$confirm('确认修改目标续期期次为：'+vm.input+'     吗？')
                .then(_ => {
                    vm.$loading()
                    commonApi.retry(
                        vm.id,
                        parseInt(vm.input)
                    ).then(res => {
                        vm.$loading().close()
                        console.dir(res)
                        if(res.code===0){
                            vm.$message({
                                message: res.message,
                                type: 'success',
                                duration: 1500,
                                showClose: true
                            })
                            // let newArr=vm.policyDetail.patch.filter((value,index)=>value.tryrenew_id!==vm.id)
                            // console.dir(newArr)
                            // vm.policyDetail.patch=newArr
                            // vm.dialogVisible=false
                            location.reload()
                        }
                    })
                    .catch(function(err) {
                        vm.$loading().close()
                        location.reload()
                        console.log(err)
                    })
                })
                .catch(_ => {})
            }else{
                vm.$message({
                    message: '目标续期期次输入有误！',
                    type: 'warning',
                    duration: 1500,
                    showClose: true
                })
            }
        },
        handlePop(data) {
            let msg = "";
            try{
                let dataJson = JSON.parse(unescape(data.replace(/\\u/gi,'%u')));
                msg = this.handleJsonToHTML(dataJson);
            } catch(e){
                msg = data;
            }
            this.$alert(msg, '内容', {
                confirmButtonText: '确定',
                customClass: 'failed-reason',
                dangerouslyUseHTMLString: true
            });
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
        // 尝试重建
        tryRebuild(){
            const vm=this
            vm.$loading()
            let policy_id = vm.policyDetail.basis.policy_id
            commonApi.rebuild(policy_id).then(res => {
                vm.$message({
                    message: '操作成功!',
                    type: 'success',
                    duration: 1500,
                    showClose: true
                })
                window.location.reload()
                vm.activeName=1
            })
            .catch(function(err) {
                console.log(err)
            })
            .finally(()=>{
                vm.$loading().close()
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
    .el-input{
        width: auto;
    }
</style>
