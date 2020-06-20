<template>
    <div class="tag-container">
        <div class="label-pool">
            <span class="tag-label">当前标签：</span>
            <div class="tag-contents">
                <el-tag
                    v-for="(tagId, idx) in value"
                    :key="idx"
                    size="mini"
                    :type="getCommonTagType(tagId)"
                    @close="handleClose(tagId)"
                    @click="addTag"
                    closable>
                    {{(getTagByMap(tagId) || {}).tag_name || `已删除标签（id:${tagId}）`}}
                </el-tag>
            </div>
        </div>
        <div class="label-pool">
            <span class="tag-label">标签池:</span>
            <div class="tag-contents">
                <el-tag 
                    v-for="(tag, idx) in tagListData"
                    :key="idx"
                    :class="getTagAvailableClass(tag)" 
                    size="small" 
                    :type="getTagType(tag)"
                    @click.native="addTag(tag)"
                >
                    {{tag.tag_name}}
                </el-tag>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['tagListData', 'value'],
    data () {
        return {
            currentTags: [],
            tagMap: {}
        }
    },
    methods: {
        getTagByMap(tagId) {
            if (Object.keys(this.tagMap).length === 0) {
                this.tagListData.forEach(tag => {
                    this.tagMap[tag.id] = tag
                })
            }
            return this.tagMap[tagId]
        },
        existTag(tag) {
            let exist = true
            if(this.value.indexOf(tag.id) === -1) { // 未添加
                exist = false
            }
            return exist
        },
        addTag(tag) {
            if(!this.existTag(tag)) {
                this.$emit('input', [...this.value, tag.id])
            }
        },
        handleClose(tagId) {
            let v = [...this.value]
            v.splice(this.value.indexOf(tagId), 1);
            this.$emit('input', v)
        },
        getTagAvailableClass (tag) {
            if(this.existTag(tag)) { // 已添加，不可点
                return 'el-tag-default'
            }else { // 已添加，不可点
                return 'el-tag-available'
            }
        },
        getTagType (tag) {
            if(this.existTag(tag)) { // 已添加，只展示
                return 'info'
            }else { //
                if(tag.is_show_tab === 1) {
                    return 'danger'
                } else {
                    return ''
                }
            }
        },
        getCommonTagType(tagId) {
            let tag = this.getTagByMap(tagId)
            if(tag && tag.is_show_tab === 1) {
                return 'danger'
            } else {
                return ''
            }
        }
    }
}
</script>

<style scoped lang="scss">
.tag-container{
    padding-left: 20px;
    height: 100px;
    .label-pool{
        margin: 15px 0px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .tag-contents{
            flex: 1;
            border: 1px solid #dcdfe6;
            padding: 5px 5px; 
            min-height: 50px;
        }
    }
    .el-tag{
        margin: 5px;
    }
    .el-tag-available {
        cursor: pointer;
    }
    .el-tag-default {
        cursor: Default;
    }
    .tag-label{
        width: 80px;
        font-weight: 700;
        display: inline-block;
    }
}
</style>
