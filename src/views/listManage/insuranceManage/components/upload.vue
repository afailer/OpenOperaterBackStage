<template>
    <div class="upload-container">
        <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :on-change="onChange"
            :file-list="fileList"
            :multiple="true"
            :limit="1"
            drag
            :auto-upload="false">
            <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        </el-upload>
    </div>
</template>

<script>
import ManageApi from '../../../../api/listManageApi'
export default {
    data () {
        return {
            fileList: []
        }
    },
    methods: {
        onChange(file,fileList) {
            this.fileList = fileList
        }
    }
}
</script>

<style lang="scss">
.upload-container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .upload-demo{
        .el-upload{
            .el-upload-dragger{
                background: red($color: #000000);
                height: 40px !important;
                width: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>