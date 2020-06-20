<template>
    <div class="tag-manage-container">
        <el-button type="primary" @click="addTag">添加标签</el-button>
        <el-button type="success" @click="clearCatch">立即生效</el-button>
        <tag-table
            class="tag-table"
            @editTag="editTag"
            :tagData="tagList"
            @refresh="init"
        ></tag-table>
        <tag-dialog @refresh="init" ref="tagDialog"></tag-dialog>
    </div>
</template>

<script>
import TagTable from './components/tagTable'
import TagDialog from './components/tagDialog'
import ManageApi from '../../../api/listManageApi' 
export default {
    components: {
        TagTable,
        TagDialog
    },
    data () {
        return {
            tagList: []
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            ManageApi.getTagList().then(res => {
                this.tagList = res.data
            })
        },
        clearCatch() {
            console.log(ManageApi.clearCache)
            ManageApi.clearCache().then(res => {
                console.log(res)
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
            })
        },
        addTag () {
            this.$refs.tagDialog.show()
        },
        editTag(tag) {
            this.$refs.tagDialog.edit(tag)
        }
    }
}
</script>

<style scoped lang='scss'>
.tag-manage-container{
    height: calc(100vh - 100px);
    padding: 30px 60px;
    .tag-table{
        height: calc(100% - 30px);
        overflow: auto;
    }
}
</style>
