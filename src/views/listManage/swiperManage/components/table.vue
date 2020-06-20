<template>
    <div class="swiper-table-container">
        <el-table
            :data="swipeData"
            style="width: 100%">
            <el-table-column
                prop="img"
                label="图片"
                width="280">
                <template slot-scope="scope">
                    <img style="height: 80px" :src="scope.row.img"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="link"
                label="对应链接"
                width="320">
            </el-table-column>
            <el-table-column
                prop="sort"
                label="显示顺序"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <div class="edit-con">
                        <span class="sort">
                            <i
                                v-show="scope.$index !== 0"
                                class="el-icon-sort-up click-high"
                                @click="handleUp(scope.$index, scope.row)"
                            />
                            <i
                                v-show="scope.$index !== swipeData.length - 1"
                                class="el-icon-sort-down click-high"
                                @click="handleDown(scope.$index,scope.row)"
                            />
                        </span>
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import ManageApi from '../../../../api/listManageApi'
export default {
    props: ['swipeData'],
    methods: {
        handleEdit (row) {
            this.$emit('emit', row)
        },
        handleDelete (row) {
            this.$confirm(`确认删除当前轮播？`).then(() => {
                row.is_deleted = 1
                ManageApi.createBanner(row).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$emit('refresh')
                })
            })
        },
        handleUp(index, row) {
            let swipe = this.swipeData[index - 1]
            let params = {
                "change_index": swipe.id, 
                "change_priority": row.sort,
                "current_index": row.id, 
                "current_priority": swipe.sort,
            }
            ManageApi.changeSwipeSort(params).then(res => {
                console.log(res)
                this.$emit('refresh')
            })
        },
        handleDown (index, row) {
            let swipe = this.swipeData[index + 1]
            let params = {
                "change_index": swipe.id, 
                "change_priority": row.sort,
                "current_index": row.id,
                "current_priority": swipe.sort,
            }
            ManageApi.changeSwipeSort(params).then(res => {
                console.log(res)
                this.$emit('refresh')
            })
            
        }
    }
}
</script>

<style lang="scss">
.swiper-table-container{
    .cell {
        text-align: center !important;
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
