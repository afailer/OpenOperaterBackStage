<template>
    <el-dialog :title="isAdd ? '添加标签' : '编辑标签'" :visible.sync="tagDialogVisible" width="60%">
        <div class="tag-dialog-container">
            <el-form ref="tagForm" :model="tagData" :rules="tagRules" label-width="100px">
                <div style="height: 330px; overflow:auto; overflow-y:visible">
                    <el-form-item label="标签名" prop="tag_name">
                        <el-input
                            v-model.number="tagData.tag_name"
                            placeholder="请输入标签名"
                            @keyup.enter.native="onSubmit"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="显示标签名" prop="show_name">
                        <el-input
                            v-model.number="tagData.show_name"
                            placeholder="请输入标签名"
                            @keyup.enter.native="onSubmit"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input
                            v-model.number="tagData.description"
                            placeholder="请输入描述"
                            @keyup.enter.native="onSubmit"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="气泡描述" prop="insurance_explain">
                        <el-input
                            v-model.number="tagData.insurance_explain"
                            placeholder="请输入气泡描述"
                            type="textarea"
                            @keyup.enter.native="onSubmit"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="首页加载数" prop="show_number">
                        <el-input
                            v-model.number="tagData.show_number"
                            placeholder="请输入首页加载数"
                            @keyup.enter.native="onSubmit"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label-width="160px" label="是否显在h5中包含" prop="include_or_not">
                        <el-switch
                            v-model="tagData.include_or_not"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            active-text="包含"
                            inactive-text="不包含">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label-width="160px" label="是否显示为头" prop="is_show_tab">
                        <el-switch
                            v-model="tagData.is_show_tab"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            active-text="显示"
                            inactive-text="不显示">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label-width="160px" label="是否作为列表标签" prop="is_show_page">
                        <el-switch
                            v-model="tagData.is_show_page"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            active-text="显示"
                            inactive-text="不显示">
                        </el-switch>
                        
                    </el-form-item>

                </div>
                <div class="bottom-btn">
                    <el-button type="primary" @click="submitTag">{{isAdd? '立即添加':'立即编辑'}}</el-button>
                    <el-button @click="cancleTag">取消提交</el-button>
                </div>
            </el-form>

        </div>
    </el-dialog>
</template>

<script>
import ManageApi from '../../../../../api/listManageApi' 
import utils from '../../../../../utils/util'
export default {
    data () {
        return {
            tagDialogVisible: false,
            tagData: {
                is_show_tab: 0,
                is_show_page: 1,
                include_or_not: 1
            },
            isAdd: false,
            tagRules: {
                tag_name: [
                    {required: true, message: '请填写标签名', trigger:'blur'}
                ],
                show_name: [{required: true, message: '请填写标签显示名', trigger:'blur'}],
                description: [{required: true, message: '请填写描述', trigger:'blur'}],
                show_number: [{validator: this.checkFirstPageNum, trigger: 'blur',required: true}],
            }
        }
    },
    methods: {
        checkFirstPageNum(rule, value, callback) {
            if(Number.isNaN(Number(this.tagData.show_number))){
                callback(new Error('显示条数需为数字'))
            }
            if(!this.tagData.show_number || Number(this.tagData.show_number) < 0 || parseInt(this.tagData.show_number) === 0) {
                callback(new Error('首次显示条数需为大于0的整数'))
            }
            callback()
        },
        show() {
            this.tagData = {
                is_show_tab: 0,
                is_show_page: 1,
                include_or_not: 1
            }
            this.tagDialogVisible = true
            this.isAdd = true
        },
        edit(tag) {
            this.tagData = utils.deepClone(tag)
            this.tagDialogVisible = true
            this.isAdd = false
        },
        submitTag() {
            this.$refs.tagForm.validate((valid) => {
                if (valid) {
                    ManageApi.createTag(this.tagData).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.$emit('refresh')
                        this.tagDialogVisible = false
                    })
                }
            })
        },
        cancleTag() {
            this.tagDialogVisible = false
        }
    }
}
</script>

<style scoped lang="scss">
.tag-dialog-container{
    .bottom-btn{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
