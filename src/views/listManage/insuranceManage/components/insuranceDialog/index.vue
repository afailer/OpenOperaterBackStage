<template>
    <el-dialog @closed="handleClose" :title="isAdd ? '添加保险' : '编辑保险'" :visible.sync="visible" width="60%">
        <div v-loading="loading" class="insurance-dialog-content-con">
            <el-form ref="insuranceModal" :model="insuranceData" :rules="insuranceRules" label-width="90px">
                <div style="height: 330px; overflow:auto; overflow-y:visible">
                    <el-form-item label="保险图" prop="icon">
                        <el-radio v-model="insuranceImg" label="edit">手动编辑地址</el-radio>
                        <el-radio v-model="insuranceImg" label="upload">选择图片上传</el-radio>
                        <upload-img ref="uploadInsuranceImg" v-show="insuranceImg === 'upload'"></upload-img>
                        <el-input
                            v-show="insuranceImg === 'edit'"
                            v-model="insuranceData.icon"
                            placeholder="请输入保险图片链接地址"
                            @keyup.enter.native="onSubmit"
                            clearable
                        />
                    </el-form-item>
                    <el-row class="el-row">
                        <el-form-item label="保险名" prop="insurance_name">
                            <el-input
                                v-model="insuranceData.insurance_name"
                                placeholder="请输入保险名称"
                                @keyup.enter.native="onSubmit"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input
                                v-model="insuranceData.description"
                                placeholder="请输入保险名称"
                                @keyup.enter.native="onSubmit"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item label="sku名称" prop="sku_name">
                            <el-input
                                v-model="insuranceData.sku_name"
                                placeholder="请输入sku名称"
                                @keyup.enter.native="onSubmit"
                                clearable
                            />
                        </el-form-item>
                    </el-row>
                    <el-form-item label="h5链接" prop="url">
                        <el-input
                            v-model="insuranceData.url"
                            placeholder="请输保险h5链接"
                            @keyup.enter.native="onSubmit"
                            clearable
                        />
                    </el-form-item>
                    
                    <el-form-item label="title标签图(非必填)" prop="right_icon">
                        <el-radio v-model="titleImg" label="edit">手动编辑地址</el-radio>
                        <el-radio v-model="titleImg" label="upload">选择图片上传</el-radio>
                        <upload-img ref="uploadTitleImg" v-show="titleImg === 'upload'"></upload-img>
                        <el-input
                            v-show="titleImg === 'edit'"
                            v-model="insuranceData.right_icon"
                            placeholder="请输入保险标签图片链接地址"
                            @keyup.enter.native="onSubmit"
                            clearable
                        />
                    </el-form-item>
                    <el-row class="el-row">
                        <el-form-item label="首月价格" prop="price">
                            <el-input
                                v-model.number="insuranceData.price"
                                placeholder="请输入价格/分"
                                @keyup.enter.native="onSubmit"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item label="价格单位" prop="unit">
                            <el-input
                                v-model="insuranceData.unit"
                                placeholder="请输入价格单位"
                                @keyup.enter.native="onSubmit"
                                clearable
                            />
                        </el-form-item>
                    </el-row>
                    <el-row class="el-row">
                        <el-form-item label-width="160px" label="是否在小程序中显示" prop="is_show_applet">
                            <el-switch
                                v-model="insuranceData.is_show_applet"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="显示"
                                :active-value="1"
                                :inactive-value="0"
                                inactive-text="不显示">
                            </el-switch>
                        </el-form-item>
                        <el-form-item style="flex: 1" label="小程序地址" prop="applet_url">
                            <el-input
                                v-model="insuranceData.applet_url"
                                placeholder="请输入小程序地址"
                                @keyup.enter.native="onSubmit"
                                clearable
                            />
                        </el-form-item>
                    </el-row>
                    <tag-edit v-model="currentTags" ref="tagEdit" :tagListData="tagListData"></tag-edit>
                </div>
                <div class="bottom-btn">
                    <el-button type="primary" @click="submitInsurace">提交</el-button>
                    <el-button @click="cancleSubmit">取消</el-button>
                </div>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import tagEdit from '../tagEdit'
import ManageApi from '../../../../../api/listManageApi'
import utils from '@/utils/util'
import UploadImg from '../upload'
export default {
    props: ['tagListData'],
    data () {
        return {
            visible: false,
            loading: false,
            insuranceImg: 'edit',
            titleImg: 'edit',
            insuranceData: {},
            isAdd: false,
            currentTags: [],
            insuranceRules: {
                icon: [
                    {validator: this.validateIcon, trigger: 'change',required: true }
                ],
                insurance_name: [
                    {required: true, message: '请填写保险名', trigger:'blur'}
                ],
                description: [
                    {required: true, message: '请填写保险描述', trigger:'blur'}
                ],
                sku_name: [
                    {required: true, message: '请填写sku名称', trigger:'blur'}
                ],
                url: [
                    {required: true, message: '请填写保险h5链接', trigger:'blur'}
                ],
                price: [
                    {required: true, message: '请填写保险首月价格', trigger:'blur'}
                ],
                unit: [
                    {required: true, message: '请填写保险价格单位', trigger:'blur'}
                ]
            }
        }
    },
    components: {
        tagEdit,
        UploadImg
    },
    methods: {
        handleClose() {
            this.$refs.uploadInsuranceImg.fileList = []
            this.$refs.uploadTitleImg.fileList = []
        },
        validateIcon(rule, value, callback) {
            if (this.insuranceImg === 'upload') {
                if (this.$refs.uploadInsuranceImg.fileList.length === 0 && !this.insuranceData.icon) {
                    callback(new Error('请选择需要上传的图片'))
                }
            } else {
                if (!this.insuranceData.icon) {
                    callback(new Error('请选填写图片地址'))
                }
            }
            callback()
        },
        initDialog() {
            this.visible = true
            this.loading = false
        },
        show (searchTags) {
            this.initDialog()
            this.isAdd = true
            this.currentTags = searchTags
            this.insuranceData = {
                is_show_applet: 1
            }
        },
        edit (data) {
            this.initDialog()
            this.isAdd = false
            this.insuranceData = utils.deepClone(data)
            ManageApi.getInsuranceTag(data.id).then(res => {
                this.currentTags = res.data || []
            })
        },
        submitInsurace () {
            let self = this
            this.$refs.insuranceModal.validate((valid) => {
                if (valid) {
                    self.loading = true
                    this.uploadImg().then(res => {
                        let params = {
                            product: self.insuranceData,
                            tag_ids: self.currentTags.join(',')
                        }
                        ManageApi.handleInsurance(params).then(res => {
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                            this.$emit('refresh')
                            this.loading = false
                            this.visible = false
                        }).catch(err => {
                            this.loading = false
                        })
                    })
                } else {
                    console.log('error submit!!');
                }
            });
        },
        uploadImg() {
            let self = this
            return new Promise((resolve, reject) => {
                let formData = new FormData()
                let hasInsuranceUpload = false
                let hasTitleImgUpload = false
                if(self.insuranceImg === 'upload' && self.$refs.uploadInsuranceImg.fileList.length > 0) {
                    formData.append('files', self.$refs.uploadInsuranceImg.fileList[0].raw)
                    hasInsuranceUpload = true
                }
                if(self.titleImg === 'upload' && self.$refs.uploadTitleImg.fileList.length > 0) {
                    formData.append('files', self.$refs.uploadTitleImg.fileList[0].raw)
                    hasTitleImgUpload = true
                }
                if(hasInsuranceUpload || hasTitleImgUpload) {
                    ManageApi.sendOss(formData).then(res => {
                        if (hasInsuranceUpload) {
                            self.insuranceData.icon = res.data.data[0].url + '?x-oss-process=style/origin.png'
                            if(hasTitleImgUpload) {
                                self.insuranceData.right_icon = res.data.data[1].url + '?x-oss-process=style/origin.png'
                            }
                        } else {
                            if(hasTitleImgUpload) {
                                self.insuranceData.right_icon = res.data.data[0].url + '?x-oss-process=style/origin.png'
                            }
                        }
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                } else {
                    resolve()
                }
            })
        },
        cancleSubmit() {
            this.visible = false
        }
    }
}
</script>

<style scoped lang="scss">
.insurance-dialog-content-con{
    .el-row{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .bottom-btn{
        display: flex;
        justify-content: center; 
        padding-top:20px;
        border-top:1px solid #409EFF;
    }
}
</style>
