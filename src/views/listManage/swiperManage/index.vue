<template>
    <div class="swiper-container">
        <el-button type="primary" @click="handleAddSwiper">添加轮播</el-button>
        <el-button type="success" @click="clearCatch">立即生效</el-button>
        <table-data @refresh="getBannerList" @emit="handleEdit" :swipeData="swipeData"></table-data>
        <swiper-dialog ref="swiperDialog"></swiper-dialog>
    </div>
</template>

<script>
import TableData from './components/table'
import SwiperDialog from './components/swiperDialog'
import ManageApi from '../../../api/listManageApi'
export default {
    components: {
        TableData,
        SwiperDialog
    },
    created() {
        this.getBannerList()
    },
    methods: {
        getBannerList () {
            ManageApi.getBannerList().then(res => {
                this.swipeData = res.data
            })
        },
        clearCatch() {
            ManageApi.clearCache().then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
            })
        },
        handleAddSwiper() {
            this.$refs.swiperDialog.show()
        },
        handleEdit(row) {
            this.$refs.swiperDialog.edit(row)
        }
    },
    data () {
        return {
            swipeData: [
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.swiper-container{
    padding: 30px 60px;
}
</style>
