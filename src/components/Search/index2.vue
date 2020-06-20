<template>
    <el-form :inline="true" ref="form" :model="form" label-width="90px">
        <el-form-item label="手机号" prop="phone">
            <el-input v-model.trim="form.phone"
                      placeholder="请输入注册手机号"
                      @keyup.enter.native="onSubmit()"
                      clearable/>
        </el-form-item>
        <el-form-item label="保单号" prop="policy_no">
            <el-input v-model.trim="form.policy_no"
                      placeholder="请输入保单号"
                      style="width: 280px"
                      @keyup.enter.native="onSubmit()"
                      clearable/>
        </el-form-item>
        <el-form-item label="商户交易号" prop="trade_no">
            <el-input v-model.trim="form.trade_no"
                      placeholder="请输入商户交易号"
                      style="width: 280px"
                      @keyup.enter.native="onSubmit()"
                      clearable/>
        </el-form-item>
        <el-form-item label="E保ID" prop="id">
            <el-input v-model.trim="form.id"
                      placeholder="请输入E保ID"
                      @keyup.enter.native="onSubmit()"
                      clearable/>
        </el-form-item>
        <el-form-item label="证件号" prop="idcard">
            <el-input v-model.trim="form.idcard"
                      placeholder="请输入证件号"
                      @keyup.enter.native="onSubmit()"
                      clearable/>
        </el-form-item>
        <el-form-item>
            <el-button class="btn-style" :class="{active: !isActive}" type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button class="btn-style" :class="{active: isActive}" type="primary" @click="onSubmit(true)">保单精准查询</el-button>
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
                id: '',
                idcard: '',
            },
            isActive: false
        }
    },
    mounted() {
        let s = sessionStorage.getItem('SEATCH_PARAMS')
        if(s) {
            let params = JSON.parse(s)
            this.form[params.type] = params.key
        }
    },
    methods: {
        //提交
        onSubmit(exactFlag = false) {
            let {phone, policy_no, trade_no, id, idcard} = this.form
            let params = {}
            // 保单精准查询处理
            if (exactFlag) {
                if(policy_no) {
                    params = {
                        type: 'policy_no',
                        key: policy_no
                    }
                } else {
                    this.$message({
                        message: '请输入保单号！',
                        type: 'info',
                    })
                    return false
                }
            } else {
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
                }else if(id) {
                    params = {
                        type: 'id',
                        key: id
                    }
                }else if(idcard) {
                    params = {
                        type: 'idcard',
                        key: idcard
                    }
                }else {
                    this.$message({
                        message: '请填写正确信息！',
                        type: 'info',
                    })
                    return false
                }
            }

            this.isActive = exactFlag
            params.exactFlag = exactFlag
            this.$store.dispatch('GetUserListNew', params).then(() => {
                let jP = JSON.stringify(params)
                sessionStorage.setItem('SEATCH_PARAMS', jP)
                this.$message({
                    message: '获取数据成功',
                    type: 'success',
                })
            }).catch((e) => {
                // this.$message.error(e)
            })
        },
        //重置
        onClear() {
            this.form = {
                phone: '',
                policy_no: '',
                trade_no: '',
                id: '',
                idcard: '',
            }
        }
    },
    destroyed() {
        this.$store.commit('CLEAR_DATA')
    }
}
</script>

<style scoped>
    .btn-style {
        margin-left: 20px;
    }
    .active {
        background-color: #007dfe;
        border-color: #007dfe;
    }
</style>
