<template>
    <div class="tag-table-container">
         <el-table
            :data="tagData"
            height="100%"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            >
            <el-table-column
                prop="tag_name"
                label="标签名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="show_name"
                label="显示标签名"
                width="180"
                >
            </el-table-column>
            <el-table-column
                prop="description"
                label="描述"
                width="180">
            </el-table-column>
            <el-table-column
                prop="insurance_explain"
                label="气泡描述"
                width="180">
                <template slot-scope="scope">
                    <el-tooltip v-if="scope.row.insurance_explain" class="item" effect="dark" :content="scope.row.insurance_explain" placement="top">
                        <p class="tag-item-detail">
                            {{scope.row.insurance_explain}}
                        </p>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="show_number"
                label="首页展示数量"
                width="70">
            </el-table-column>
            <el-table-column
                prop="include_or_not"
                label="是否显在h5中包含"
                width="80">
                <template slot-scope="scope">
                    <div>
                        {{isShowH5(scope.row)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="is_show_tab"
                label="是否显示为头"
                width="70">
                <template slot-scope="scope">
                    <div>
                        {{isTab(scope.row)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="is_show_page"
                label="是否作为列表标签"
                width="80">
                <template slot-scope="scope">
                    <div>
                        {{isPage(scope.row)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="编辑"
                width="320"
                fixed="right"
            >
                <template  slot-scope="scope">
                    <div class="edit-con">
                        <span class="sort">
                            <i
                                v-show="scope.$index !== 0"
                                class="el-icon-sort-up click-high"
                                @click="handleUp(scope.$index, scope.row)"
                            />
                            <i
                                v-show="scope.$index !== tagData.length - 1"
                                class="el-icon-sort-down click-high"
                                @click="handleDown(scope.$index,scope.row)"
                            />
                        </span>
                        <el-button
                            @click.native.prevent="editRow(scope.row)"
                            type="primary"
                            size="small"
                        >
                            编辑
                        </el-button>
                        <el-button
                            @click.native.prevent="getRowInsurance(scope.row)"
                            type="success"
                            size="small"
                        >
                            对应保险
                        </el-button>
                        <el-button
                            @click.native.prevent="deleteTag(scope.row)"
                            type="danger"
                            size="small"
                        >
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
         </el-table>
         <preview-tag-insurance-dialog ref="insuDialog"></preview-tag-insurance-dialog>
    </div>
</template>

<script>
import PreviewTagInsuranceDialog from '../previewTagInsuranceDialog'
import ManageApi from '../../../../../api/listManageApi'
export default {
    props: ['tagData'],
    methods: {
        isTab (tagItem) {
            return String(tagItem.is_show_tab) === '1' ? '是' : '否'
        },
        isPage (tagItem) {
            return String(tagItem.is_show_page) === '1' ? '是' : '否'
        },
        isShowH5(tagItem) {
            return String(tagItem.include_or_not) === '1' ? '是' : '否'
        },
        editRow(row) {
            this.$emit('editTag',row)
        },
        tableRowClassName ({row, rowIndex}) {
            if(String(row.include_or_not) === '0') {
                return 'tag-row-red'
            }
            if(String(row.is_show_tab) === '1') {
                return 'tag-row'
            }else{
                return ''
            }
        },
        getRowInsurance(row) {
            this.$refs.insuDialog.show(row)
        },
        deleteTag(row) {
            this.$confirm(`确认删除"${row.tag_name}"？`).then(() => {
                row.is_deleted = 1
                ManageApi.createTag(row).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$emit('refresh')
                })
            })
        },
        handleUp(index, row) {
            let tag = this.tagData[index - 1]
            let params = {
                "change_index": tag.id, 
                "change_priority": row.priority,
                "current_index": row.id, 
                "current_priority": tag.priority,
            }
            ManageApi.changeTagSort(params).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                this.$emit('refresh')
            })
        },
        handleDown (index, row) {
            let tag = this.tagData[index + 1]
            let params = {
                "change_index": tag.id, 
                "change_priority": row.priority,
                "current_index": row.id, 
                "current_priority": tag.priority,
            }
            ManageApi.changeTagSort(params).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                this.$emit('refresh')
            })
            
        }
    },
    components: {
        PreviewTagInsuranceDialog
    }
}
</script>

<style lang="scss">
.tag-table-container{
    .el-table .tag-row {
        color: #1989fa;
    }
    .el-table .tag-row-red {
        color: #f56c6c;
    }
    .cell {
        text-align: center !important;
    }
    .tag-item-detail{
        text-overflow: ellipsis;
        display: -webkit-box;
        max-height: 50px;
        -webkit-line-clamp: 3;//规定几行显示省略号
        -webkit-box-orient: vertical;
    }
    .edit-con{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .sort{
            width: 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            .click-high{
                color: #409EFF;
                cursor: pointer;
            }
        }
    }
    
}
</style>
