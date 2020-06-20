<template>
    <el-dialog :title="titleText" :visible.sync="visible" width="40%">
        <div class="tag-insurance-container" :v-loading="loading">
            <div
                v-for="(insurance, idx) in insuranceList"
                :key="idx"
                class="tag-insurance-item-container"
            >
                <span>{{idx + 1}}</span>
                <insurance-item
                    :prop="insurance"
                ></insurance-item>
                <div class="sort">
                    <i
                        :style="(idx !== 0 && Number(currentTag.is_show_tab) === 0) ? '' : 'visibility: hidden'"
                        class="el-icon-sort-up click-high"
                        @click="handleUp(idx, insurance)"
                    />
                    <i
                        v-show="idx !== insuranceList.length - 1 && Number(currentTag.is_show_tab) === 0"
                        class="el-icon-sort-down click-high"
                        @click="handleDown(idx, insurance)"
                    />
                    <i
                        class="el-icon-close click-high"
                        @click="handleRemove(idx, insurance)"
                    />
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import insuranceItem from '../../../insuranceManage/components/insuranceTable/components/insuranceItem'
import ManageApi from '../../../../../api/listManageApi'
import utils from '@/utils/util'
export default {
    methods: {
        show (row) {
            this.insuranceList = []
            this.currentTag = utils.deepClone(row)
            this.titleText = `"${row.tag_name}"保险预览`
            this.visible = true
            this.loadInsuranceList()
        },
        loadInsuranceList() {
            this.loading = true
            ManageApi.getTagRelation(this.currentTag.id).then(res => {
                this.loading = false
                this.insuranceList = res.data
            })
        },
        handleRemove(index, row) {
            let tag_ids = []
            this.loading = true
            ManageApi.getInsuranceTag(row.id).then(res => {
                tag_ids = res.data
                tag_ids.splice(tag_ids.indexOf(this.currentTag.id), 1)
                let params = {
                    product: row,
                    tag_ids: tag_ids.join(',')
                }
                ManageApi.handleInsurance(params).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.loadInsuranceList()
                })
            })
            
        },
        handleUp (index, row) {
            let targetInsurance = this.insuranceList[index - 1]
            let params = {
                "change_index": targetInsurance.relation_id, 
                "change_priority": row.priority,
                "current_index": row.relation_id, 
                "current_priority": targetInsurance.priority,
            }
            ManageApi.changeTagInsuranceSort(params).then(res => {
                this.loadInsuranceList()
            })
        },
        handleDown (index, row) {
            let targetInsurance = this.insuranceList[index + 1]
            let params = {
                "change_index": targetInsurance.relation_id, 
                "change_priority": row.priority,
                "current_index": row.relation_id, 
                "current_priority": targetInsurance.priority,
            }
            ManageApi.changeTagInsuranceSort(params).then(res => {
                this.loadInsuranceList()
            })
        }
    },
    data () {
        return {
            visible: false,
            titleText: '',
            currentTag: {},
            loading: false,
            insuranceList: []
        }
    },
    components: {
        insuranceItem
    }
}
</script>

<style scoped lang="scss">
.tag-insurance-container{
    height: 60vh;
    overflow: auto;
    .tag-insurance-item-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        border-top: 1px solid #dcdcdc;
        .sort{
            width: 60px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .click-high{
                color: #409EFF;
                cursor: pointer;
                margin: 3px;
            }
        }
    }
}
</style>
