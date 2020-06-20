<template>
    <el-dialog :title="titleText" :visible.sync="visisble" width="50%">
        <div class="swiper-dialog-container">
            <el-form :model="swiperData" label-width="90px">
                <div style="height: 200px; overflow:auto; overflow-y:visible">
                    <el-form-item label="图片地址" prop="img">
                        <el-input
                            v-model.number="swiperData.img"
                            placeholder="请输入图片地址"
                            @keyup.enter.native="onSubmit"
                            clearable
                            type="textarea"
                        />
                    </el-form-item>
                    <el-form-item label="链接地址" prop="img">
                        <el-input
                            v-model.number="swiperData.link"
                            placeholder="请输入链接地址"
                            @keyup.enter.native="onSubmit"
                            clearable
                            type="textarea"
                        />
                    </el-form-item>
                </div>
                <div class="bottom-btn">
                    <el-button type="primary" @click="submit">{{isAdd ? '立即添加' : "提交编辑"}}</el-button>
                    <el-button @click="cancle">取消编辑</el-button>
                </div>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import ManageApi from '../../../../api/listManageApi'
import utils from '@/utils/util'
export default {
    methods: {
        show() {
            this.titleText = '轮播图添加'
            this.visisble = true
            this.swiperData = {}
        },
        edit(row) {
            this.titleText = '轮播图编辑'
            this.visisble = true
            this.swiperData = utils.deepClone(row)
        },
        submit () {
            ManageApi.createBanner(this.swiperData).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                this.$emit('refresh')
            })
            this.visisble = false
        },
        cancle() {
            this.visisble = false
        }
    },
    data () {
        return {
            isAdd: false,
            titleText: '',
            visisble: false,
            swiperData: {}
        }
    }
}
</script>

<style scoped lang="scss">
.swiper-dialog-container{
    .bottom-btn{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
}
</style>
