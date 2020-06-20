<template>
    <div>
        <el-tabs v-model="activeName"
                 type="card">
            <el-tab-pane class="account-container"
                         v-for="(item, index) in accountList"
                         :label="`账号${index+1}`"
                         :key="index">
                <div class="title">账户信息</div>
                <el-table
                        :stripe="true"
                        :data="item"
                        :header-cell-style="$commonRowClass"
                        border>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="用户昵称">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="phone"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="user_id"
                            label="轻松筹-账号ID">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="id"
                            label="e保-账号ID">
                        <template slot-scope="scope">
                            /
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="updated_at"
                            label="最近登录时间">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {getCouponList} from '@/api/discountCoupon'
export default {
    name: "TabOfAccount",
    data() {
        return {
            activeName: 0,
            accountList: [],
        }
    },
    created() {
        this.$bus.on('search', async (searchParams) => {
            try {
                this.$loading()
                let {type, key} = searchParams
                let discountData = (await getCouponList(type, key)).data
                this.accountList = discountData.member.map(item => [item])
                this.$bus.emit('emitTableData',  discountData.coupon, searchParams)
                console.log('discountData', discountData.coupon)
                this.$loading().close()
            } catch (e) {
                this.$bus.emit('clearData')
                this.$loading().close()
                console.log(e)
            }
        })
        this.$bus.on('clearData', ()=> {
            this.accountList = []
        })
    },
    watch: {
        async activeName(v, ov) {
            if(v == ov) {
                return false
            }
            let searchParams = {
                type: 'user_id',
                key: this.accountList[v][0].user_id
            }
            let discountData = (await getCouponList(searchParams.type, searchParams.key)).data
            this.$bus.emit('emitTableData',  discountData.coupon, searchParams)
        }
    },
    destroyed() {
        this.$bus.off('search')
        this.$bus.off('clearData')
    }
}
</script>

<style scoped lang="scss">
    .account-container {
        margin: 0 20px;
    }
</style>
