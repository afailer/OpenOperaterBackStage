<template>
    <div>
        <div class="header">
            <h3>活动组详情</h3>
            <el-button type="primary" size="primary" @click="editGroupFunc">编辑</el-button>
        </div>
        <div class="activity-group-container">
            <p class="item">
                <span class="title">标题：</span>
                <span class="content">{{ activityDetail.title }}</span>
            </p>
            <p class="item">
                <span class="title">持有人：</span>
                <span class="content">{{ activityDetail.holder }}</span>
            </p>
            <p class="item">
                <span class="title">描述：</span>
                <span class="content">{{ activityDetail.desc }}</span>
            </p>
            <p class="item">
                <span class="title">金额：</span>
                <span class="content">{{ activityDetail.amount/100 }} 元</span>
            </p>
            <p class="item">
                <span class="title">周期：</span>
                <span class="content">{{ activityDetail.period_number }}</span>
            </p>
            <p class="item">
                <span class="title">是否启用：</span>
                <span class="content">{{ activityDetail.is_open?'是':'否' }}</span>
            </p>
            <p class="item">
                <span class="title">开始时间：</span>
                <span class="content">{{ activityDetail.start_time }}</span>
            </p>
            <p class="item">
                <span class="title">结束时间：</span>
                <span class="content">{{ activityDetail.end_time }}</span>
            </p>
            <p class="item">
                <span class="title">创建时间：</span>
                <span class="content">{{ activityDetail.created_at }}</span>
            </p>
            <p class="item">
                <span class="title">更新时间：</span>
                <span class="content">{{ activityDetail.updated_at }}</span>
            </p>
        </div>
    </div>
</template>

<script>
import * as Func from "@/utils/time.js";

export default {
    props: ['id','activityDetail'],
    data(){
        return {
            editGroup: {
                type:'editGroup', 
                data: {}
            }
        }
    },
    methods: {
        editGroupFunc(){
            this.editGroup.data = this.activityDetail;
            this.editGroup.data.id = this.id;
            this.editGroup.data.time = [Func.getTimeStamp(this.editGroup.data.start_time), Func.getTimeStamp(this.editGroup.data.end_time)]

            this.$emit('update', JSON.parse(JSON.stringify(this.editGroup)))
        }
    }
}
</script>


<style lang="scss" scoped>
.header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.activity-group-container{
    padding: 10px 0;
    background-color: rgb(242, 242, 242);
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    .item{
        flex: 1;
        min-width: 50%;
        max-width: 50%;
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        align-items: flex-start;

        span{
            font-size: 15px;
            line-height: 15px;
        }
        span.title{
            width: 120px;
            text-align: right;
            padding-right: 0em;
            margin: 0;
            color: gray;
        }
        span.content{
            flex: 1;
        }
    }
}
</style>

