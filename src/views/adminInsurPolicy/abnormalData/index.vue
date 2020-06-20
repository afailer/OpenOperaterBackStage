<template>
    <div class="abnormalData">
        <el-form ref="form" :model="form" label-width="100px" :inline="true">
            <el-form-item label="查询类型">
                <el-select v-model="form.type" placeholder="请选择查询类型">
                    <el-option label="保单号" value="policy_no"></el-option>
                    <el-option label="保单ID" value="policy_id"></el-option>
                    <el-option label="sku_name" value="sku_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保单信息">
                <el-input v-model="form.info" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="query(1,10)">查询</el-button>
            </el-form-item>
        </el-form>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="padding-left:20px">
            <el-tab-pane label="已支付,未续期" name="2048">
                <el-table
                :data="tableData"
                border
                style="width: 96%;">
                    <el-table-column prop="policy_no" label="保单号" />
                    <el-table-column prop="period" label="期次" />
                    <el-table-column prop="pay_state" label="期缴状态" />
                    <el-table-column prop="amount" label="应缴金额（元）">
                        <template slot-scope="scope">
                            <span>{{scope.row.amount/100}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paid_amount" label="实缴金额（元）">
                        <template slot-scope="scope">
                            <span>{{scope.row.paid_amount/100}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="begin_at" label="当期起期" />
                    <el-table-column prop="end_at" label="当期止期" />
                    <el-table-column prop="expire_date" label="宽限期" />
                    <el-table-column prop="order_no" label="订单号" />
                    <el-table-column prop="pay_at" label="实际支付时间" />
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="viewLogs(scope.row)">查看记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-if="tableData&&tableData.length>0"
                    :total="total"
                    :current-page.sync="page"
                    :page-size.sync="page_size"
                    @size-change="sizeChange"
                    @current-change="searchSubmit"
                    :page-sizes="[5,10,15,20,30]"
                    background
                    layout="jumper,prev, pager, next,total,sizes"
                    style="text-align: center;margin-top:15px"/>
            </el-tab-pane>
            <el-tab-pane label="未支付,未续期" name="4096">
                <el-table
                :data="tableData2"
                border
                style="width: 96%;">
                    <el-table-column prop="policy_no" label="保单号" />
                    <el-table-column prop="period" label="期次" />
                    <el-table-column prop="pay_state" label="期缴状态" />
                    <el-table-column prop="amount" label="应缴金额（元）">
                        <template slot-scope="scope">
                            <span>{{scope.row.amount/100}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paid_amount" label="实缴金额（元）">
                        <template slot-scope="scope">
                            <span>{{scope.row.paid_amount/100}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="begin_at" label="当期起期" />
                    <el-table-column prop="end_at" label="当期止期" />
                    <el-table-column prop="expire_date" label="宽限期" />
                    <el-table-column prop="order_no" label="订单号" />
                    <el-table-column prop="pay_at" label="实际支付时间" />
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="viewLogs(scope.row)">查看记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-if="tableData2&&tableData2.length>0"
                    :total="total2"
                    :current-page.sync="page2"
                    :page-size.sync="page_size2"
                    @size-change="sizeChange"
                    @current-change="searchSubmit"
                    :page-sizes="[5,10,15,20,30]"
                    background
                    layout="jumper,prev, pager, next,total,sizes"
                    style="text-align: center;margin-top:15px"/>
            </el-tab-pane>
        </el-tabs>

        <el-dialog
        title="续期重试"
        v-loading="contentLoading"
        :visible.sync="dialogVisible"
        @close="xqClose"
        width="1200px">
            <div class="records">
                <b>续期记录：</b>
                <i>保单号：</i><span>{{policy_no}}</span>
                <i>期次：</i><el-input v-model="period" clearable placeholder="请输入期次"></el-input>
                <el-button type="success" @click="tryAgain">重试</el-button>
            </div>
            <el-table
            :data="renewalData"
            border
            style="margin-top:10px">
                <el-table-column prop="created_at" label="时间" />
                <el-table-column prop="period" label="期次" />
                <el-table-column prop="policy_id" label="保单ID" />
                <el-table-column prop="user_id" label="用户ID" />
                <el-table-column prop="retry_count" label="已重试次数" />
                <el-table-column prop="sku_name" label="sku" />
                <el-table-column prop="payload" label="请求内容">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handlePop(scope.row.payload)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="result_msg" label="返回内容" />
            </el-table>
            <el-pagination
            v-if="renewalData&&renewalData.length>0"
            :total="renewal.total"
            :current-page.sync="renewal.page"
            :page-size.sync="renewal.page_size"
            @size-change="sizeChange2"
            @current-change="searchSubmit2"
            :page-sizes="[5,10,15,20,30]"
            background
            layout="jumper,prev, pager, next,total,sizes"
            style="text-align: center;margin-top:15px"/>
        </el-dialog>

        <!-- 请求内容 -->
        <el-dialog
        title="请求内容"
        :visible.sync="dialogVisible2"
        width="40%"
        :before-close="handleClose">
            <el-container style="height: 600px;">
                <el-main class="treesView">
                    <pre>{{msg}}</pre>
                    <!-- <tree-view :data="msg" :options="{maxDepth: 3}"></tree-view> -->
                </el-main>
            </el-container>
        </el-dialog>
    </div>
</template>

<script>
import abnormalData from '@/api/abnormalData'
    export default {
        name: "abnormalData",
        data() {
            return {
                form: {
                    type:"policy_no",
                    info: "",
                    sku_name:""
                },
                page:1,
                page_size:10,
                total:0,
                tableData:[],

                page2:1,
                page_size2:10,
                total2:0,
                tableData2:[],
                contentLoading:false,
                dialogVisible:false,
                policy_no:'',
                period:'',
                renewalData:[],
                renewal:{
                    policy_id:'',
                    period:'',
                    page:1,
                    page_size:10,
                    total:0
                },
                dialogVisible2:false,
                msg:'',
                activeName: '2048'
            }
        },
        created() {
            // this.query(1,10)
        },
        methods: {
            query(page,page_size){
                const vm=this
                const state=parseInt(vm.activeName)
                if(state===2048){
                    vm.page=page
                    vm.page_size=page_size
                    vm.tableData=[]
                }else{
                    vm.page2=page
                    vm.page_size2=page_size
                    vm.tableData2=[]
                }
                vm.$loading()
                let params={}
                if(vm.form.type==="policy_id"){
                    params.policy_id=vm.form.info
                }else if(vm.form.type==="sku_name"){
                    params.sku_name=vm.form.info
                }else{
                    params.policy_no=vm.form.info
                }
                params.page=page
                params.page_size=page_size
                params.state=state
                abnormalData.getAbnormalList(params).then(res=>{
                    if(state===2048){
                        vm.tableData=res.data.list
                        vm.total=res.data.total
                    }else{
                        vm.tableData2=res.data.list
                        vm.total2=res.data.total
                    }
                })
                .catch((err)=>{
                    if(state===2048){
                        vm.tableData=[]
                    }else{
                        vm.tableData2=[]
                    }
                    console.log(err)
                })
                .finally(()=>{
                    vm.$loading().close()
                })
            },
            sizeChange(page_size){
                this.query(1,page_size)
            },
            searchSubmit(page){
                if(parseInt(this.activeName)===2048){
                    this.query(page,this.page_size)
                }else{
                    this.query(page,this.page_size2)
                }
            },
            // 续期重试的记录
            renewalQuery(policy_id,period,page,page_size){
                const vm=this
                vm.dialogVisible=true
                vm.contentLoading=true
                abnormalData.v3Log(policy_id,period,page,page_size).then(res=>{
                    console.dir(res)
                    vm.renewalData=res.data.list
                    vm.renewal.total=res.data.total
                })
                .catch((err)=>{
                    vm.renewalData=[]
                    console.log(err)
                })
                .finally(()=>{
                    vm.contentLoading=false
                })
            },
            // 查看记录
            viewLogs(row){
                const vm=this
                vm.policy_no=row.policy_no
                vm.period=row.period_int
                vm.renewal.policy_id=row.policy_id
                vm.renewal.period=row.period_int
                vm.renewalQuery(vm.renewal.policy_id,parseInt(vm.renewal.period),1,10)
            },
            sizeChange2(page_size){
                const vm=this
                vm.renewal.page=1
                vm.renewal.page_size=page_size
                vm.renewalQuery(vm.renewal.policy_id,parseInt(vm.renewal.period),1,page_size)
            },
            searchSubmit2(page){
                const vm=this
                vm.renewal.page=page
                vm.renewalQuery(vm.renewal.policy_id,parseInt(vm.renewal.period),page,vm.renewal.page_size)
            },
            // 重试
            tryAgain(){
                const vm=this
                vm.$confirm('确定重试嘛?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    abnormalData.retry(vm.renewal.policy_id,parseInt(vm.period)).then(res=>{
                        vm.$message({
                            message: '操作成功!',
                            type: 'success',
                            duration: 1500,
                            showClose: true
                        })
                        vm.dialogVisible=false
                        vm.query(1,10)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    .finally(()=>{
                        vm.contentLoading=false
                    })
                }).catch((e) => {
                    if(e == 'cancel') {
                        this.$message({
                            type: 'info',
                            message: e
                        })
                    }
                })
            },
            // 关闭续期重试的弹窗
            xqClose(){
                this.dialogVisible=false
                this.renewalData=[]
                this.renewal.page=1
                this.renewal.page_size=10
            },
            // 点击请求内容查看关闭弹窗
            handleClose() {
                this.dialogVisible2=false
            },
            handlePop(data) {
                this.msg=JSON.parse(data)
                this.dialogVisible2=true
            },
            handleClick(tab, event) {
                const vm=this
                let name=parseInt(tab.name)
                if(name===2048){
                    vm.query(vm.page,vm.page_size)
                }else{
                    vm.query(vm.page2,vm.page_size2)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.abnormalData{
    margin-top: 20px;
    .el-input{
        width:300px;
    }
    .records{
        i{
            font-style: normal;
        }
        .el-input{
            width:160px;
            margin-right:45px;
        }
        >span{
            display:inline-block;
            width:700px;
        }
    }
    .treesView{
        .tree-view-wrapper{
            overflow: visible;
        }
        /deep/ .tree-view-item-node .tree-view-item-key::first-line{
            visibility: hidden;
        }
    }
}
</style>
