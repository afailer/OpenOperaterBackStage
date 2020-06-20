<template>
    <div class="header-bar">
        <el-button type="primary" @click="showInsuranceDialog">添加保险</el-button>
        <el-button type="success" @click="clearCatch">立即生效</el-button>
        <el-select clearable v-model="searchTag" multiple placeholder="请选择">
            <el-option-group
                v-for="tagDatas in tagList"
                :key="tagDatas.label"
                :label="tagDatas.label">
                <el-option
                    v-for="(tag, idx) in tagDatas.tags"
                    :key="idx + 'tag'"
                    :label="tag.show_name"
                    :value="tag.id">
                </el-option>
            </el-option-group>
        </el-select>
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
    </div>
</template>

<script>
import ManageApi from '../../../../../api/listManageApi'
export default {
    data () {
        return {
            tagList: [],
            searchTag:[],
            options: []
        }
    },
    methods: {
        handleSearch() {
            this.$emit('search', this.searchTag)
        },
        clearCatch() {
            ManageApi.clearCache().then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
            })
        },
        showInsuranceDialog () {
            this.$emit('add')
        },
        setTagList (tagListData) {
            let tabOption = {
                label: '头标签',
                tags: []
            }
            let tagOption = {
                label: '普通标签',
                tags: []
            }
            tagListData.forEach(tag => {
                if(tag.is_show_tab === 1){
                    tabOption.tags.push(tag)
                }else {
                    tagOption.tags.push(tag)
                }
            });
            this.tagList = [tabOption, tagOption]
        }
    }
}
</script>

<style lang="scss">
.header-bar{
    .el-input{
        width: 350px;
    }
}
</style>
