<template>
    <div class="basisInfo" v-loading="contentLoading">
        <div class="title">保单基本信息</div>
        <div class="insur-info flex-row">
            <div class="insur-title">公司：<span>{{basis.company_name&&basis.company_name.slice(0, 6)}}</span></div>
            <div class="insur-title">保险名称：<span>{{basis.policy_title}}</span></div>
            <div class="insur-title">保险计划：<span>{{basis.insurance_title}}</span></div>
            <div class="insur-title">每份保额：<span>{{Number(basis.coverage)/1000000}}万</span></div>
            <div class="insur-title">份数：<span>{{basis.number}}</span></div>
        </div>
        <el-table
                :data="basisArray"
                :header-cell-style="$commonRowClass"
                border>
            <el-table-column
                    align="center"
                    prop="policy_no"
                    label="保单号">
            </el-table-column>
            <el-table-column
                align="center"
                label="保单状态">
                <template slot-scope="scope">
                    <PolicyState :state="scope.row.state"></PolicyState>
                    <el-button 
                    v-if="basis.policy_state_can_modify===1&&(user.permissionPath&&(user.permissionPath.includes('/v1/policy/recover_state')||user.permissionPath.includes('*')))"
                    type="primary" 
                    size="mini" 
                    @click="recover"
                    style="margin-top:10px">恢复保单状态</el-button>

                    <el-button
                    v-if="(basis.policy_state_can_modify!==1)&&
                    (user.permissionPath&&
                    (user.permissionPath.includes('/v1/policy/ineffective')
                    ||user.permissionPath.includes('*')))"
                    type="danger"
                    style="margin-top:10px"
                    @click="activeReturn(scope.row)"
                    size="mini">客户主动退保</el-button>

                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="policy_url"
                    label="保险凭证/电子保单"
                    width="150">
                 <template slot-scope="scope">
                     <a :href="scope.row.policy_url" target="_blank">
                         <el-button type="primary" size="mini">查看保单</el-button>
                     </a>
                 </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="is_entrust"
                label="自动续费"
                width="120">
                <template slot-scope="scope">
                    <el-switch
                        v-model="switch_is_entrust"
                        @change="changeEntrustFunc(switch_is_entrust)"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="auto_renew"
                label="自动续保"
                width="120">
                <template slot-scope="scope">
                    <el-switch
                        v-model="switch_auto_renew"
                        @change="changeRenewFunc(switch_auto_renew)"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="platform"
                    label="平台"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="badges"
                    label="赠送">
                <template slot-scope="scope">
                    <template v-for="item in scope.row.badges">
                        <el-tag style="margin-left: 10px">{{item}}</el-tag>
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="labels"
                    label="特殊标识">
                <template slot-scope="scope">
                    <template v-for="item in scope.row.labels">
                        <el-tag style="margin-left: 10px">{{item}}</el-tag>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <el-table
                :data="basisArray"
                :header-cell-style="$commonRowClass"
                border>
            <el-table-column
                    align="center"
                    prop="created_at"
                    label="购买时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="activated_at"
                    label="激活时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="begin_at"
                    label="生效时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="time"
                    label="犹豫期">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="time_to"
                    label="等待期至">
            </el-table-column>
            <el-table-column
                align="center"
                prop="end_at"
                label="有效期至">
                <template slot-scope="scope">
                    <el-tooltip 
                    v-if="scope.row.end_at_can_modify"
                    class="item" effect="dark" 
                    content="请参考电子保单内截止日期填写" 
                    placement="bottom">
                        <el-date-picker
                            v-model="value1"
                            :editable="false"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            @change="validityPeriod(scope.row)"
                            placeholder="请选择有效期">
                        </el-date-picker>
                    </el-tooltip>
                    <span v-else>{{scope.row.end_at}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="updated_at"
                    label="更新时间">
            </el-table-column>
        </el-table>
        <el-button class="btn-style" type="primary" @click="onReturn">返回上一级</el-button>
        <el-dialog
        title="修改保单状态"
        v-loading="contentLoading2"
        :visible.sync="dialogVisible"
        width="400px">
            <el-radio-group v-model="state">
                <el-radio :label="20">有效</el-radio>
                <el-radio :label="35">即将到期</el-radio>
                <el-radio :label="50">失效</el-radio>
            </el-radio-group>
            <el-row style="margin-top:20px">宽限日期：{{expire_day}}天</el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyState">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {retryInsure} from '@/api/policy'
import PolicyState from './PolicyState'
import commonApi from "@/api/commonApi"

export default {
    name: "BasisDetail",
    components: {PolicyState},
    data() {
        return {
            switch_is_entrust:true,
            switch_auto_renew:true,
            contentLoading:false,
            contentLoading2:false,
            value1:'',
            value2:'',
            dialogVisible: false,
            state:'',
            expire_day:''
        }
    },
    mounted() {
        let policyId = this.$route.query.policyId
        this.$store.dispatch('GetPolicyDetail', policyId)
    },
    computed: {
        ...mapGetters([
            'accountList',
            'policyDetail'
        ]),
        ...mapState([
            'user'
        ]),
        basis() {
            return this.policyDetail.basis
        },
        basisArray() {
            if(this.policyDetail.basisArray[0].is_entrust==='是'){
                this.switch_is_entrust=true
            }else{
                this.switch_is_entrust=false
            }
            if(this.policyDetail.basisArray[0].auto_renew==='是'){
                this.switch_auto_renew=true
            }else{
                this.switch_auto_renew=false
            }
            this.value1=this.policyDetail.basisArray[0].end_at
            this.value2=this.policyDetail.basisArray[0].end_at
            return this.policyDetail.basisArray
        },
    },
    methods: {
        //返回上一级
        onReturn() {
            let redirect = this.$route.query.redirect
            if(redirect) {
                this.$router.push(redirect)
            } else {
                this.$router.push('/qurey-insur-policy')
            }
        },
        changeEntrustFunc(newVal){
            const vm = this
            vm.contentLoading = true
            let value=newVal?'open':'close'
            commonApi.changeOldEntrust(
                vm.policyDetail.basisArray[0].policy_id,
                'period',
                value
            ).then(res => {
                vm.contentLoading = false
                let txt=newVal?'自动续费已打开！':'自动续费已关闭！'
                vm.$message({
                    message: txt,
                    type: 'success',
                    duration: 1500,
                    showClose: true
                })
            })
            .catch(function(err) {
                vm.switch_is_entrust=!newVal
                vm.contentLoading = false
                console.log(err)
            })
        },
        changeRenewFunc(newVal){
            const vm = this
            vm.contentLoading = true
            let value=newVal?'open':'close'
            commonApi.changeOldEntrust(
                vm.policyDetail.basisArray[0].policy_id,
                'insure',
                value
            ).then(res => {
                vm.contentLoading = false
                let txt=newVal?'自动续保已打开！':'自动续保已关闭！'
                vm.$message({
                    message: txt,
                    type: 'success',
                    duration: 1500,
                    showClose: true
                })
            })
            .catch(function(err) {
                vm.switch_auto_renew=!newVal
                vm.contentLoading = false
                console.log(err)
            })
        },
        async retryToInsure(id){
            try {
                let res = await retryInsure(id);
                console.log(res);
            } catch (e) {
                console.log(e)
            }
        },
        validityPeriod(row){
            const vm=this
            let newVal=vm.value1
            vm.value1=vm.value2
            this.$confirm('确认修改有效期至'+newVal+'吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                vm.contentLoading = true
                commonApi.modifyValidityPeriod(
                    row.policy_id,
                    newVal
                ).then(res => {
                    vm.contentLoading = false
                    vm.value1=newVal
                    vm.value2=newVal
                    vm.$message({
                        message: res.message,
                        type: 'success',
                        duration: 1500,
                        showClose: true
                    })
                })
                .catch(function(err) {
                    vm.value1=vm.value2
                    vm.contentLoading = false
                    console.log(err)
                })
            }).catch(() => {
                vm.value1=vm.value2
                vm.$message({
                    type: 'info',
                    message: '已取消修改'
                });          
            });
            
        },
        recover(){
            const vm=this
            commonApi.recoverPop({
                policy_id: vm.policyDetail.basisArray[0].policy_id
            }).then(res => {
                vm.state=res.data.set_state
                vm.expire_day=res.data.expire_day
                vm.dialogVisible=true
            })
            .catch(function(err) {
                vm.dialogVisible=false
                console.log(err)
            })
        },
        // 客户主动退保
        activeReturn(row){
            console.dir(row)
            const vm=this
            vm.$confirm('确认退保吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                vm.$loading()
                commonApi.activeReturnOld(
                    row.policy_id,50
                ).then(res => {
                    console.dir(res)
                    vm.$loading().close()
                    vm.$message({
                        type: 'success',
                        message: '退保成功!',
                        duration: 1500,
                        showClose: true
                    })
                    row.state='保单失效'
                    vm.policyDetail.basis.policy_state_can_modify=1
                    vm.$forceUpdate()
                })
                .catch(function(err) {
                    vm.$loading().close()
                    console.log(err)
                })
            }).catch(() => {
                vm.$message({
                    type: 'info',
                    message: '已取消',
                    duration: 1500,
                    showClose: true
                })
            });
        },
        modifyState(){
            const vm=this
            vm.$confirm('确认修改吗？')
            .then(_ => {
                vm.contentLoading2=true
                commonApi.modifyState(
                    vm.policyDetail.basisArray[0].policy_id,
                    vm.state
                ).then(res => {
                    vm.contentLoading2=false
                    if(res.code===0){
                        vm.$message({
                            message: res.message,
                            type: 'success',
                            duration: 1500,
                            showClose: true
                        })
                        if(vm.state===20){
                            // vm.policyDetail.basisArray[0].state="有效"
                            vm.policyDetail.basisArray[0].state="保单生效"
                        }else if(vm.state===35){
                            vm.policyDetail.basisArray[0].state="即将到期"
                        }else if(vm.state===50){
                            vm.policyDetail.basisArray[0].state="失效"
                        }
                        vm.policyDetail.basis.policy_state_can_modify=0
                        vm.dialogVisible=false
                        vm.$forceUpdate()
                    }
                })
                .catch(function(err) {
                    vm.contentLoading2=false
                    console.log(err)
                })
            })
            .catch(_ => {})
        }
    }
}
</script>

<style scoped lang="scss">
    .basisInfo {
        width: 100%;
        padding: 20px;
        border: 1px solid rgba(174,174,174, 0.5);
        box-shadow: 0px 3px 10px rgba(174,174,174, 0.3);
        border-radius: 10px;
        position: relative;
        .title {
            margin-bottom: 20px;
            font-size: 18px;
        }
        .insur-info {
            justify-content: flex-start;
            margin-left: 30px;
            .insur-title {
                padding-right: 35px;
                margin-bottom: 20px;
                span {
                    font-size: 14px;
                    color: #828282
                }
            }
        }
    }
    .flex-row {
        display: flex;
        align-items: center;
    }
    .btn-style {
        position: absolute;
        top: 20px;
        right: 20px;
    }
</style>
