<template>
    <div class="insurance-container">
        <header-bar @search="handleSearch" ref="headerBar" @add="handleAdd"></header-bar>
        <insurance-table 
            class="insurance-table"
            @edit="handleEmit"
            :tableData="tableData"
            :loading="loading"
            @refresh="loadProductList"
        ></insurance-table>
        <el-pagination
            @size-change="handlePageSizeChange"
            @current-change="hanlePageChange"
            :current-page="pageInfo.page"
            :page-sizes="[8, 10, 20]"
            :page-size="pageInfo.limit"
            layout="total, sizes, prev, pager, next"
            :total="total"
            style="margin: 40px auto 0px; display:flex; justify-content:center">
            </el-pagination>
        <insurance-dialog @refresh="loadProductList" :tagListData="tagListData" ref="insuranceDialog"></insurance-dialog>
    </div>
</template>

<script>
import HeaderBar from './components/headerBar'
import InsuranceTable from './components/insuranceTable'
import insuranceDialog from './components/insuranceDialog'
import ManageApi from '../../../api/listManageApi'
export default {
    data () {
        return {
            total: 0,
            loading: false,
            tagListData: [],
            tableData: [],
            searchTags: [],
            pageInfo: {
                page: 1,
                limit: 10
            }
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            this.loadProductList()
            ManageApi.getTagList().then(res => {
                this.tagListData = res.data
                this.$refs.headerBar.setTagList(res.data)
            })
        },
        handleSearch(tags) {
            this.searchTags = tags
            this.pageInfo.page = 1
            this.loadProductList()
        },
        hanlePageChange(page) {
            this.pageInfo.page = page
            this.loadProductList()
        },
        handlePageSizeChange(limit) {
            this.pageInfo.limit = limit
            this.loadProductList()
        },
        loadProductList () {
            this.loading = true
            let self = this
            let params = {
                tag_ids: self.searchTags.join(',')
            }
            ManageApi.getProductList(this.pageInfo.page, this.pageInfo.limit, params).then(res => {
                this.tableData = res.data.product_list
                this.total = res.data.total
                this.loading = false
            })
        },
        handleAdd () {
            this.$refs.insuranceDialog.show(this.searchTags)
        },
        handleEmit (row) {
            this.$refs.insuranceDialog.edit(row)
        }
    },
    components: {
        HeaderBar,
        InsuranceTable,
        insuranceDialog
    }
}
</script>

<style scoped lang="scss">
.insurance-container{
    padding: 30px 60px;
    height: calc(100vh - 100px);
    .insurance-table{
        height: calc(100% - 100px);
        overflow: auto
    }
}
</style>