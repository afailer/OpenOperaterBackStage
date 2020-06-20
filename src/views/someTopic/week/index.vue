<template>
    <div class="app-container week">
        <el-form :inline="true" :model="formInline" ref="formInline" label-width="70px" class="demo-form-inline">
            <el-form-item label="手机号">
                <el-input 
                v-model.trim="formInline.phone" 
                @keyup.enter.native="onSubmit(false)"
                clearable
                placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="保单号">
                <el-input 
                v-model.trim="formInline.policy_no" 
                @keyup.enter.native="onSubmit(false)"
                clearable
                placeholder="保单号"></el-input>
            </el-form-item>
            <el-form-item label="证件号">
                <el-input 
                v-model.trim="formInline.idacrd" 
                @keyup.enter.native="onSubmit(false)"
                clearable
                placeholder="证件号"></el-input>
            </el-form-item>
            <el-form-item label="用户ID">
                <el-input 
                v-model.trim="formInline.id" 
                @keyup.enter.native="onSubmit(false)"
                clearable
                placeholder="用户ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(false)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(true)">保单精准查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="resetForm('formInline')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in tabsArr" :key="index" :label="'账号'+(index+1)" :name="'tab'+index">
                <div class="head">账户信息</div>
                <el-table
                    :data="item[0]"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="nickname"
                    label="用户昵称">
                    </el-table-column>
                    <el-table-column
                    prop="qsc_phone"
                    label="手机号">
                    </el-table-column>
                    <el-table-column
                    prop="qsc_id"
                    label="轻松筹-账号ID">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="e保-账号ID">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="Q保-账号ID">
                    </el-table-column>
                    <el-table-column
                    prop="updated_at"
                    label="最近登录时间">
                    </el-table-column>
                </el-table>
                <div class="head head2">保单信息</div>
                <el-table
                    :data="item[1]"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="policy_title"
                    label="保险名称">
                    </el-table-column>
                    <el-table-column
                    prop="policy_no"
                    label="保单号">
                    </el-table-column>
                    <el-table-column
                    prop="payman_name"
                    label="投保人">
                    </el-table-column>
                    <el-table-column
                    prop="insured_name"
                    label="被保人">
                    </el-table-column>
                    <el-table-column
                    prop="policy_state"
                    align="center"
                    label="保单状态">
                    <template slot-scope="scope">
                        <PolicyState :state="scope.row.policy_state"></PolicyState>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="begin_at"
                    label="生效时间">
                    </el-table-column>
                    <el-table-column
                    prop="end_at"
                    label="有效期至">
                    </el-table-column>
                    <el-table-column
                    prop="labels"
                    align="center"
                    label="特殊标识">
                    <template slot-scope="scope">
                        <span class="gift">{{scope.row.labels[0]}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="platform"
                    label="平台">
                    </el-table-column>
                    <el-table-column
                    prop="updated_at"
                    label="更新时间">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    align="center"
                    label="操作"
                    width="80">
                    <template slot-scope="scope">
                        <el-button @click="seeDetails(scope.row)" type="primary" size="mini">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>

                <el-tabs type="border-card" class="borderCard">
                    <el-tab-pane label="批改记录">
                        <el-table
                            :data="item[3].items"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="pre_coverage"
                            label="原保额(元)">
                            <template slot-scope="scope">
                                <span>{{parseInt(scope.row.pre_coverage/100)}}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="coverage"
                            label="新保额(元)">
                            <template slot-scope="scope">
                                <span>{{parseInt(scope.row.coverage/100)}}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="state_text"
                            label="批改状态">
                            </el-table-column>
                            <el-table-column
                            prop="created_at"
                            label="批改时间">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        v-if="item[3]&&item[3].items&&item[3].items.length>0"
                        :total="item[3].total"
                        :current-page.sync="item[3].currentPage"
                        :page-size.sync="item[3].pageSize"
                        @size-change="sizeChange1"
                        @current-change="searchSubmit1"
                        :page-sizes="[5,10,15,20,30]"
                        background
                        layout="jumper,prev, pager, next,total,sizes"
                        style="text-align: center;margin-top:15px"/>
                    </el-tab-pane>
                    <el-tab-pane label="邀请记录">
                        <el-table
                            :data="item[2].invited_user"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="invited_nick_name"
                            label="被邀请人昵称">
                            </el-table-column>
                            <el-table-column
                            prop="invited_id"
                            label="被邀请人qscID">
                            </el-table-column>
                            <el-table-column
                            prop="success_time"
                            label="成功邀请时间">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        v-if="item[2]&&item[2].data_count&&item[2].data_count>0"
                        :total="item[2].data_count"
                        :current-page.sync="item[2].currentPage"
                        :page-size.sync="item[2].pageSize"
                        @size-change="sizeChange2"
                        @current-change="searchSubmit2"
                        :page-sizes="[5,10,15,20,30]"
                        background
                        layout="jumper,prev, pager, next,total,sizes"
                        style="text-align: center;margin-top:15px"/>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import week from '@/api/week'
import PolicyState from '@/components/insurPolicyDetailNew/components/PolicyState'
export default {
    components: {PolicyState},
    data() {
        return {
            formInline: {
                phone: '',
                policy_no: '',
                idacrd: '',
                id: ''
            },
            tabsArr:[],
            activeName: 'tab0',
            tabIndex:0,
            qsc_id_arr:[],
            policy_id_arr:[]
        }
    },
    methods: {
        onSubmit(bool) {
            const vm=this
            let type=''
            let key=''
            if(bool){//如果点击了“保单精准查询”
                if(vm.formInline.policy_no){
                    type='policy_no'
                    key=vm.formInline.policy_no

                    vm.formInline.phone=''
                    vm.formInline.idacrd=''
                    vm.formInline.id=''
                }else{
                    vm.$message({
                        message: '请输入保单号！',
                        type: 'warning',
                        duration: 1500,
                        showClose: true
                    })
                }
            }else{
                if(vm.formInline.phone!==''){
                    type='phone'
                    key=vm.formInline.phone
                    
                    vm.formInline.policy_no=''
                    vm.formInline.idacrd=''
                    vm.formInline.id=''
                }else if(vm.formInline.policy_no!==''){
                    type='policy_no'
                    key=vm.formInline.policy_no

                    vm.formInline.phone=''
                    vm.formInline.idacrd=''
                    vm.formInline.id=''
                }else if(vm.formInline.idacrd!==''){
                    type='idacrd'
                    key=vm.formInline.idacrd

                    vm.formInline.phone=''
                    vm.formInline.policy_no=''
                    vm.formInline.id=''
                }else if(vm.formInline.id!==''){
                    type='id'
                    key=vm.formInline.id

                    vm.formInline.phone=''
                    vm.formInline.policy_no=''
                    vm.formInline.idacrd=''
                }else{
                    vm.$message({
                        message: '请填写正确信息！',
                        type: 'warning',
                        duration: 1500,
                        showClose: true
                    })
                }
            }
            if(type&&key){//信息填写完整
                vm.$loading()
                week.weekQuery(type,key).then(res => {

                    /**
                     * 
                     * tabsArr=[
                     * [ [],[],{},{} ],
                     * [ [],[],{},{} ],
                     * [ [],[],{},{} ],
                     * ...
                     * [ [],[],{},{} ]
                     * ]
                     * 
                     * index=0，对应：账户信息
                     * index=1，对应：保单信息
                     * index=2，对应：邀请记录
                     * index=3，对应：批改记录
                     * 
                     * **/
                    vm.tabsArr=res.data.map(function(item){
                        let newArr=[]
                        newArr.push(item)
                        let anotherArr=[]
                        anotherArr.push(newArr)
                        anotherArr.push([])
                        anotherArr.push({})
                        anotherArr.push({})
                        return anotherArr
                    })
                    vm.activeName='tab0'
                    vm.$message({
                        message: '查询成功！',
                        type: 'success',
                        duration: 1500,
                        showClose: true
                    })
                    let qsc_id_arr=res.data.map(item=>item.qsc_id)
                    vm.qsc_id_arr=qsc_id_arr
                    let policy_id_arr=res.data.map(item=>'')
                    vm.policy_id_arr=policy_id_arr
                    return qsc_id_arr[0]
                })
                .then(data=>{
                    // 保单信息
                    let params_new={}
                    params_new.user_id=data
                    params_new.page=1
                    params_new.page_size=10
                    params_new.sku='zhonghui-gift-weekillness'
                    if(bool){
                        params_new.type='policy_no'
                        params_new.key=vm.formInline.policy_no
                    }
                    week.ebaoPolicyList(params_new).then(response=>{
                        vm.tabsArr[0][1]=JSON.parse(JSON.stringify(response.data.list))
                        vm.$forceUpdate()
                        if(response.data.list.length>0){
                            let policy_id=response.data.list[0].policy_id
                            vm.policy_id_arr[0]=policy_id
                            return policy_id
                        }
                    })
                    .then(policy_id=>{
                        if(policy_id){
                            // 批改记录
                            week.correctionRecord(policy_id,1,10).then(ress=>{
                                let newObj=JSON.parse(JSON.stringify(ress.data))
                                newObj.currentPage=1
                                newObj.pageSize=10
                                vm.tabsArr[0][3]=JSON.parse(JSON.stringify(newObj))
                                vm.$forceUpdate()
                            }).catch(function(err2) {
                                console.log(err2)
                            })
                        }else{
                            // 设置批改记录为空
                            vm.tabsArr[0][3]={}
                            vm.$forceUpdate()
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    })

                    // 邀请记录
                    week.invitationRecord(data,1,10).then(res1=>{
                        let newObj=JSON.parse(JSON.stringify(res1.data))
                        newObj.currentPage=1
                        newObj.pageSize=10
                        vm.tabsArr[0][2]=JSON.parse(JSON.stringify(newObj))
                        vm.$forceUpdate()
                    }).catch(function(err1) {
                        console.log(err1)
                    })
                })
                .catch(function(err) {
                    vm.tabsArr=[]
                    console.log(err)
                }).finally(()=>{
                    vm.$loading().close()
                })
            }
        },
        handleClick(tab, event) {
            const vm=this
            const idx=parseInt(tab.index)
            vm.tabIndex=idx
            let qsc_id=vm.qsc_id_arr[idx]
            // 保单信息
            // 如果保单信息里面有内容，即：已经切换过该tab标签页并加载过了，则不需要调用：保单信息和批改记录的接口
            // 如果保单信息里面没有内容，则需要第一次调用接口，获取：保单信息和批改记录
            if(vm.tabsArr[idx][1].length===0){

                let params_new={}
                params_new.user_id=qsc_id
                params_new.page=1
                params_new.page_size=10
                params_new.sku='zhonghui-gift-weekillness'
                if(bool){
                    params_new.type='policy_no'
                    params_new.key=vm.formInline.policy_no
                }
                week.ebaoPolicyList(params_new).then(response=>{
                    vm.tabsArr[idx][1]=JSON.parse(JSON.stringify(response.data.list))
                    vm.$forceUpdate()
                    if(response.data.list.length>0){
                        let policy_id=response.data.list[0].policy_id
                        vm.policy_id_arr[idx]=policy_id
                        return policy_id
                    }
                })
                .then(policy_id=>{
                    if(policy_id){
                        // 批改记录
                        vm.$loading()
                        week.correctionRecord(policy_id,1,10).then(ress=>{
                            let newObj=JSON.parse(JSON.stringify(ress.data))
                            newObj.currentPage=1
                            newObj.pageSize=10
                            vm.tabsArr[idx][3]=JSON.parse(JSON.stringify(newObj))
                            vm.$forceUpdate()
                        }).catch(function(err2) {
                            console.log(err2)
                        }).finally(()=>{
                            vm.$loading().close()
                        })
                    }else{
                        // 设置批改记录为空
                        vm.tabsArr[idx][3]={}
                        vm.$forceUpdate()
                    }
                })
                .catch(function(error) {
                    console.log(error)
                })
            }

            

            // 邀请记录
            // 如果邀请记录里面有内容，即：已经切换过该tab标签页并加载过了，则不需要调用：邀请记录 的接口
            // 如果邀请记录里面没有内容，则需要第一次调用接口，获取：邀请记录
            if(!vm.tabsArr[idx][2].currentPage){
                vm.$loading()
                week.invitationRecord(qsc_id,1,10).then(res1=>{
                    let newObj=JSON.parse(JSON.stringify(res1.data))
                    newObj.currentPage=1
                    newObj.pageSize=10
                    vm.tabsArr[idx][2]=JSON.parse(JSON.stringify(newObj))
                    vm.$forceUpdate()
                }).catch(function(err1) {
                    console.log(err1)
                }).finally(()=>{
                    vm.$loading().close()
                })
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
            this.formInline.phone=''
            this.formInline.policy_no=''
            this.formInline.idacrd=''
            this.formInline.id=''
            this.tabsArr=[]
            this.activeName='tab0'
            this.qsc_id_arr=[]
            this.policy_id_arr=[]
            this.tabIndex=0
        },
        seeDetails(row){
            let routeUrl = this.$router.resolve({
                path: '/insur-policy-detail-new',
                query: {
                    'redirect': '/qurey-insur-policy-new',
                    'policyId': row.policy_id
                }
            })
            window.open(routeUrl.href, '_blank')
        },
        // 批改记录，改变pageSize
        sizeChange1(pageSize){
            const vm=this
            const idx=vm.tabIndex
            const policy_id=vm.policy_id_arr[idx]
            vm.$loading()
            week.correctionRecord(policy_id,1,pageSize).then(ress=>{
                let newObj=JSON.parse(JSON.stringify(ress.data))
                newObj.currentPage=1
                newObj.pageSize=pageSize
                vm.tabsArr[idx][3]=JSON.parse(JSON.stringify(newObj))
                vm.$forceUpdate()
            }).catch(function(err2) {
                console.log(err2)
            }).finally(()=>{
                vm.$loading().close()
            })
        },
        // 批改记录，改变currentPage
        searchSubmit1(currentPage){
            const vm=this
            const idx=vm.tabIndex
            const policy_id=vm.policy_id_arr[idx]
            const pageSize=vm.tabsArr[idx][3].pageSize
            vm.$loading()
            week.correctionRecord(policy_id,currentPage,pageSize).then(ress=>{
                let newObj=JSON.parse(JSON.stringify(ress.data))
                newObj.currentPage=currentPage
                newObj.pageSize=pageSize
                vm.tabsArr[idx][3]=JSON.parse(JSON.stringify(newObj))
                vm.$forceUpdate()
            }).catch(function(err2) {
                console.log(err2)
            }).finally(()=>{
                vm.$loading().close()
            })
        },
        // 邀请记录，改变pageSize
        sizeChange2(pageSize){
            const vm=this
            const idx=vm.tabIndex
            const qsc_id=vm.qsc_id_arr[idx]
            vm.$loading()
            week.invitationRecord(qsc_id,1,pageSize).then(res1=>{
                let newObj=JSON.parse(JSON.stringify(res1.data))
                newObj.currentPage=1
                newObj.pageSize=pageSize
                vm.tabsArr[idx][2]=JSON.parse(JSON.stringify(newObj))
                vm.$forceUpdate()
            }).catch(function(err1) {
                console.log(err1)
            }).finally(()=>{
                vm.$loading().close()
            })
        },
        // 邀请记录，改变currentPage
        searchSubmit2(currentPage){
            const vm=this
            const idx=vm.tabIndex
            const qsc_id=vm.qsc_id_arr[idx]
            const pageSize=vm.tabsArr[idx][2].pageSize
            vm.$loading()
            week.invitationRecord(qsc_id,currentPage,pageSize).then(res1=>{
                let newObj=JSON.parse(JSON.stringify(res1.data))
                newObj.currentPage=currentPage
                newObj.pageSize=pageSize
                vm.tabsArr[idx][2]=JSON.parse(JSON.stringify(newObj))
                vm.$forceUpdate()
            }).catch(function(err1) {
                console.log(err1)
            }).finally(()=>{
                vm.$loading().close()
            })
        }
    }
}
</script>
<style scoped lang="scss">
.week{
    .head{
        font-weight: bold;
        font-size:16px;
        color:#333;
        margin-bottom: 10px;
        margin-top: 10px;
        &.head2{
            padding-top: 15px;
        }
    }
    .borderCard{
        margin-top:30px;
    }
    .gift{
        display: inline-block;
        height:30px;
        line-height: 30px;
        width:60px;
        color:#fff;
        background: #a4cefb;
        text-align: center;
    }
}
</style>



