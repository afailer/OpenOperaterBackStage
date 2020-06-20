<template>
    <div>
        <div class="header">
            <h3>活动列表</h3>
            <!--<el-button type="primary" size="primary" @click="$emit('update',createActivity)">创建活动</el-button>-->
            <el-button type="primary" size="primary" @click="handleClickCreate">创建活动</el-button>
        </div>
        <el-table v-if="activityItems && activityItems.length" :data="activityItems" fit :stripe="true" :header-cell-style="$commonRowClass" :highlight-current-row="true" border>
            <el-table-column align="center" prop="av_id" label="ID" width="160"></el-table-column>
            <el-table-column align="center" prop="time_begin" label="开始时间" width="90"></el-table-column>
            <el-table-column align="center" prop="time_end" label="结束时间" width="90"></el-table-column>
            <el-table-column align="center" prop="seed_amount" label="种子红包金额(元)" :formatter="formatAmount"></el-table-column>
            <el-table-column align="center" prop="will_amount" label="当前经费占用（元)(今日)" :formatter="formatAmount" width="100"></el-table-column>
            <el-table-column align="center" prop="done_amount" label="已提现金额(元)(今日)" :formatter="formatAmount" width="110"></el-table-column>
            <el-table-column align="center" prop="total_amount" label="经费预算(元)" :formatter="formatAmount"></el-table-column>
            <el-table-column align="center" prop="surplus_amount" label="经费回收(元)">
                <template v-if="scope.row.is_show_surplus" slot-scope="scope">
                    {{scope.row.surplus_amount/100}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="max_follower" label="裂变次数" width="76"></el-table-column>
            <el-table-column align="center" prop="follower_amount_lowlimit" label="裂变上限(元)" width="80" :formatter="formatAmount"></el-table-column>
            <el-table-column align="center" prop="follower_amount_uplimit" label="裂变下限(元)" width="80" :formatter="formatAmount"></el-table-column>
            <el-table-column align="center" prop="notify_rate" label="预警百分比(%)"></el-table-column>
            <el-table-column align="center" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="$emit('update',{type:'threshold', data: Object.assign({},scope.row)})">修改阈值</el-button>
                    <el-button type="primary" size="mini" @click="$emit('update',{type:'budget', data: Object.assign({},scope.row)})">调整预算</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['activityItems'], // 活动列表
    data(){
        return {
            createActivity: {
                type:'createActivity',
                data: {
                    group_id: '1',
                    time: [new Date().setHours(8,0,0), new Date().setHours(18,0,0)],
                    seed_amount: 0,
                    max_follower: 0,
                    follower_amount_uplimit: 0,
                    follower_amount_lowlimit: 0,
                    total_amount: 0,
                    notify_rate: 50,
                }
            },
        }
    },
    mounted(){

    },
    methods: {
        /**
         * 金额: 分 => 元
         */
        formatAmount(row, col, value){
            return value/100;
        },

        /**
         * 编辑活动项
         */
        editActivity(e){
            console.log(e);
        },
        handleClickCreate() {
            this.$emit('update', JSON.parse(JSON.stringify(this.createActivity)))
        }
    }
}
</script>

<style lang="scss" scoped>
// 重置 el-table 样式
/deep/ .el-table div.cell{
    padding-left: 4px !important;
    padding-right: 4px !important;
}
/deep/ .el-table .el-button--mini{
    padding: 10px 3px !important;
    margin-left: 0 !important;
}

// 重置 p元素样式
p{margin: 10px 0;}

.header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>


