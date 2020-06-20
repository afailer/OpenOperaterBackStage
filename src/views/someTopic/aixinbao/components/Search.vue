<template>
    <el-form :inline="true" ref="form" :model="form" label-width="105px">
        <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="form.phone"
                      placeholder="请输入注册手机号"
                      @keyup.enter.native="onSubmit"
                      clearable/>
        </el-form-item>
        <el-form-item label="微信-商户单号" prop="qsc_trade_no" label-width="135px">
            <el-input v-model="form.qsc_trade_no"
                      placeholder="请输入商户单号"
                      @keyup.enter.native="onSubmit"
                      style="width: 290px;"
                      clearable/>
        </el-form-item>
        <!--<el-form-item label="微信-爱心保商户单号" prop="axb_order_no" label-width="145px">-->
            <!--<el-input v-model="form.axb_order_no"-->
                      <!--placeholder="请输入商户单号"-->
                      <!--@keyup.enter.native="onSubmit"-->
                      <!--style="width: 290px;"-->
                      <!--clearable/>-->
        <!--</el-form-item>-->
        <el-form-item label="轻松筹ID" prop="qsc_id">
            <el-input v-model="form.qsc_id"
                  placeholder="请输入轻松筹ID"
                  @keyup.enter.native="onSubmit"
                  clearable/>
         </el-form-item>
        <el-form-item label="e保ID" prop="use_id">
            <el-input v-model="form.user_id"
                      placeholder="请输入e保ID"
                      @keyup.enter.native="onSubmit"
                      clearable/>
        </el-form-item>
        <el-form-item label="保单号" prop="policy_no">
            <el-input v-model="form.policy_no"
                      placeholder="请输入保单号"
                      @keyup.enter.native="onSubmit"
                      style="width: 290px;"
                      clearable/>
        </el-form-item>
        <el-form-item label="证件号" prop="id_card">
            <el-input v-model="form.id_card"
                      placeholder="请输入证件号"
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
                qsc_trade_no: '',
                axb_order_no: '',
                qsc_id: '',
                user_id: '',
                policy_no: '',
                id_card: '',
            },
        }
    },
    mounted() {
        let s = sessionStorage.getItem('SEATCH_PARAMS')
        let obj = JSON.parse(s)
        if(obj) {
            this.form = obj
        }
    },
    methods: {
        onSubmit() {
            let {phone, qsc_trade_no, qsc_id, user_id, policy_no, id_card, axb_order_no} = this.form

            let params = {}
            if (phone.toString().length === 11) {
                params = {
                    'phone':phone.toString(),
                }
            } else if (policy_no) {
                params = {
                    'policy_no': policy_no,
                }
            } else if (qsc_trade_no) {
                params = {
                    'qsc_trade_no': qsc_trade_no,
                }
            } else if (axb_order_no) {
                params = {
                    'axb_order_no': axb_order_no
                }
            } else if (qsc_id) {
                params = {
                    'qsc_id': parseInt(qsc_id),
                }
            } else if (user_id) {
                params = {
                    'user_id': parseInt(user_id),
                }
            } else if(id_card) {
                params = {
                    'id_card': id_card,
                }
            } else {
                this.$message({
                    message: '请填写正确信息',
                    type: 'info',
                })
                return false
            }

            this.$store.dispatch('SearchAXBInfo', params).then(() => {
                let jP = JSON.stringify(this.form)
                sessionStorage.setItem('SEATCH_PARAMS', jP)
                this.$message({
                    message: '获取数据成功',
                    type: 'success',
                })
            }).catch((e) => {
                    // this.$message.error(e)
            })
        },
        onClear() {
            this.form = {
                phone: '',
                qsc_trade_no: '',
                qsc_id: '',
                user_id: '',
                policy_no: '',
                id_card: '',
                axb_order_no: '',
            }
            sessionStorage.removeItem('SEATCH_PARAMS')
        },
    },
    destroyed() {
        this.$store.commit('SET_AXB_BLOCK')
    }
}
</script>

<style scoped>
    .btn-style {
        margin-left: 20px;
    }
</style>
