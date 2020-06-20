<template>
    <div class="wechat">
        <el-form ref="form" :model="form" label-width="80px" :inline="true">
            <el-form-item label="订单号">
                <el-input v-model="form.order_no" clearable></el-input>
            </el-form-item>
            <el-form-item label="查询类型">
                <el-select v-model="form.type" placeholder="请选择查询类型">
                    <el-option label="支付" value="pay"></el-option>
                    <el-option label="退款" value="refund"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
        :data="tableData"
        border
        style="width: 95%;margin-left:25px">
            <el-table-column prop="pay_status" label="支付状态" />
            <el-table-column prop="user_id" label="用户ID" />
            <el-table-column prop="order_no" label="订单号" />
            <el-table-column prop="amount" label="金额（元）">
                <template slot-scope="scope">
                    <span>{{scope.row.amount/100}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="transaction_id" label="微信单号" />
            <el-table-column prop="version" label="版本" />
            <el-table-column prop="refund_info" label="退款信息" />>
            <el-table-column prop="order_info" label="本地数据库数据" />
        </el-table>
    </div>
</template>

<script>
import {getWechatState} from '@/api/wechat'
    export default {
        name: "wechat",
        data() {
            return {
                form: {
                    order_no: "",
                    type:""
                },
                tableData:[]
            }
        },
        created() {

        },
        methods: {
            async query(){
                const vm=this
                vm.$loading()
                vm.tableData=[]
                getWechatState(vm.form.order_no,vm.form.type)
                .then(res=>{
                    let newObj=Object.assign({},res.data)
                    vm.tableData.push(newObj)
                    vm.tableData[0].refund_info=JSON.stringify(res.data.refund_info)
                    vm.tableData[0].order_info=JSON.stringify(res.data.order_info)
                    vm.$loading().close()
                })
                .catch((err)=>{
                    vm.tableData=[]
                    vm.$loading().close()
                    console.log(err)
                })
            },

        }
    }
</script>

<style scoped lang="scss">
.wechat{
    margin-top: 20px;
    .el-input{
        width:300px;
    }
}
</style>
