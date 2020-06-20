<template>
    <div class="insurance-table-con">
        <el-table
                :data="tableData"
                style="width: 100%"
                height="100%"
                stripe
                v-loading="loading"
            >
            <el-table-column
                fixed
                prop="date"
                label="h5内容预览"
                fit="true">
                <template slot-scope="scope">
                    <div>
                        <insurance-item :prop="scope.row"></insurance-item>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                fixed
                prop="date"
                label="小程序配置"
                width="200">
                <template slot-scope="scope">
                    <div>
                        <el-tooltip class="item" effect="dark" :content="scope.row.applet_url" placement="top">
                            <p class="applet-url">
                                <span class="desc-bold">小程序地址：</span>
                                {{scope.row.applet_url}}
                            </p>
                        </el-tooltip>
                        <p>
                            <span class="desc-bold">在小程序是否显示: </span>
                            {{isShowApplete(scope.row)}}
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="editRow(scope.$index, scope.row)"
                        type="primary"
                        size="small"
                    >
                        编辑
                    </el-button>
                    <el-button
                        @click.native.prevent="deleteRow(scope.$index, scope.row)"
                        type="danger"
                        size="small"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import insuranceItem from './components/insuranceItem'
import ManageApi from '../../../../../api/listManageApi'
import utils from '@/utils/util'
export default {
    props: ['tableData', 'loading'],
    components: {
        insuranceItem
    },
    methods: {
        isShowApplete (item) {
            return String(item.is_show_applet) === '1' ? '是' : '否'
        },
        editRow(index, row) {
            this.$emit('edit', row)
        },
        deleteRow(index, row) {
            this.$confirm(`确认删除"${row.insurance_name}"？`).then(() => {
                ManageApi.getInsuranceTag(row.id).then(res => {
                    console.log(res)
                    let params = {
                        product: utils.deepClone(row),
                        tag_ids: (res.data || []).join(',')
                    }
                    params.product.is_deleted = 1
                    ManageApi.handleInsurance(params).then(res => {
                        console.log('---delete')
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.$emit('refresh')
                    })
                })
            })
        }
    }
}
</script>

<style lang='scss'>
.insurance-table-con{
    .cell {
        text-align: center;
    }
    .applet-url{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .desc-bold{
        font-weight: 600;
    }
}
</style>
