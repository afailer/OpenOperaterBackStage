<!--suppress ALL -->
<template>
    <el-form :inline="true" ref="form" :model="form" label-width="90px">
        <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="form.phone"
                      placeholder="请输入注册手机号"
                      @keyup.enter.native="onSubmit"
                      clearable/>
        </el-form-item>
        <el-form-item label="保单号" prop="policy_no">
            <el-input v-model="form.policy_no"
                      placeholder="请输入保单号"
                      @keyup.enter.native="onSubmit"
                      style="width: 260px;"
                      clearable/>
        </el-form-item>
        <el-form-item label="商户交易号" prop="trade_no">
            <el-input v-model="form.trade_no"
                      placeholder="请输入商户交易号"
                      @keyup.enter.native="onSubmit"
                      style="width: 260px;"
                      clearable/>
        </el-form-item>
        <el-form-item label="用户ID" prop="user_id">
            <el-input v-model="form.user_id"
                      placeholder="请输入用户ID"
                      @keyup.enter.native="onSubmit"
                      clearable/>
        </el-form-item>
        <el-form-item label="券ID" prop="coupon_id">
            <el-input v-model="form.coupon_id"
                      placeholder="请输入券ID"
                      @keyup.enter.native="onSubmit"
                      clearable/>
        </el-form-item>
        <el-form-item>
            <el-button class="btn-style" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button class="btn-style" type="warning" @click="onClear">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

export default {
    name: 'search',
    data() {
        return {
            form: {
                phone: '',
                policy_no: '',
                trade_no: '',
                user_id: '',
                coupon_id: '',
            },
        }
    },
    methods: {
        //提交
        onSubmit() {
            let {phone, policy_no, trade_no, user_id, coupon_id} = this.form
            let params = {}
            if(phone.toString().length === 11) {
                params = {
                    type: 'phone',
                    key: phone.toString()
                }
            }else if(policy_no) {
                params = {
                    type: 'policy_no',
                    key: policy_no
                }
            }else if(trade_no) {
                params = {
                    type: 'trade_no',
                    key: trade_no
                }
            }else if(user_id) {
                params = {
                    type: 'user_id',
                    key: user_id
                }
            }else if(coupon_id) {
                params = {
                    type: 'coupon_id',
                    key: coupon_id
                }
            }else {
                this.$message({
                    message: '请填写正确信息',
                    type: 'info',
                })
                this.$bus.emit('clearData')
                return false
            }
            this.$bus.emit('search', params)
        },
        //重置
        onClear() {
            this.form = {
                phone: '',
                policy_no: '',
                trade_no: '',
                user_id: '',
                coupon_id: '',
            }
        }
    },
}
</script>

<style scoped>
    .btn-style {
        margin-left: 20px;
    }
</style>
