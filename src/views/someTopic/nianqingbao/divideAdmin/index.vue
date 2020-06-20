<template>
    <div class="app-container">
        <!-- 活动组详情 -->
		<com-activity-group :id="group_id" :activityDetail="activityDetail" @update="modalData=$event"></com-activity-group>
		<!-- 活动列表 -->
		<com-activity-list :activityItems="activityItems" @update="modalData=$event" ></com-activity-list>

		<!-- 编辑活动组 -->
		<el-dialog id="editGroup" title="编辑活动组" :visible.sync="modalData.type==='editGroup'" :show-close="false" width="800px">
			<div class="activity-group-container">
				<p class="item">
					<span class="title">标题：</span>
					<el-input class="content" type="textarea" v-model="modalData.data.title"></el-input>
				</p>
				<p class="item">
					<span class="title">持有人：</span>
					<el-input class="content" v-model="modalData.data.holder"></el-input>
				</p>
				<p class="item" style="max-width: 100%; min-width: 100%;">
					<span class="title">开始/结束时间：</span>
					<el-date-picker
						type="datetimerange"
						class="content"
						format="yyyy-MM-dd HH:mm"
						v-model="modalData.data.time"
						range-separator="至"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						placeholder="选择时间范围">
					</el-date-picker>
				</p>
				<p class="item" style="max-width: 100%; min-width: 100%;">
					<span class="title">描述：</span>
					<el-input class="content" type="textarea" v-model="modalData.data.desc"></el-input>
				</p>
				<p class="item">
					<span class="title">金额：</span>
					<el-input type="number" class="content" :value="modalData.data.amount/100" ref="editGroupAmount"></el-input>
				</p>
				<p class="item">
					<span class="title">周期：</span>
					<el-input type="number" class="content" v-model="modalData.data.period_number"></el-input>
				</p>
				<p class="item">
					<span class="title">是否启用：</span>
					<el-radio v-model="modalData.data.is_open" :label="true">启用</el-radio>
  					<el-radio v-model="modalData.data.is_open" :label="false">未启用</el-radio>
				</p>
				<p class="item">
					<span class="title">创建时间：</span>
					<span class="content">{{ modalData.data.created_at }}</span>
				</p>
				<p class="item">
					<span class="title">更新时间：</span>
					<span class="content">{{ modalData.data.updated_at }}</span>
				</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="modalData.type=null">取 消</el-button>
				<el-button type="primary" @click="apiUpdateActivityGroup">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 创建活动 -->
		<el-dialog id="createActivity" title="创建活动" :visible.sync="modalData.type==='createActivity'" :show-close="false" width="60%">
			<p class="oneline">
				<span class="title align-right">开始/结束时间</span>
				<el-date-picker
					type="datetimerange"
					class="content"
					format="yyyy-MM-dd HH:mm"
					v-model="modalData.data.time"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					placeholder="选择时间范围">
				</el-date-picker>
			</p>
			<p class="oneline">
				<span class="title align-right">种子红包金额</span>
				<el-input v-model="modalData.data.seed_amount" type="number" placeholder="金额"></el-input>
			</p>
			<p class="oneline">
				<span class="title align-right">裂变次/人数</span>
				<el-input v-model="modalData.data.max_follower" type="number" placeholder="次/人数"></el-input>
			</p>
            <p class="oneline">
                <span class="title align-right">裂变金额上限</span>
                <el-input v-model="modalData.data.follower_amount_lowlimit" type="number" placeholder="上限值" :step="0.01"></el-input>
            </p>
			<p class="oneline">
				<span class="title align-right">裂变金额下限</span>
				<el-input v-model="modalData.data.follower_amount_uplimit" type="number" placeholder="下限值" :step="0.01"></el-input>
			</p>
			<p class="oneline">
				<span class="title align-right">总金额</span>
				<el-input v-model="modalData.data.total_amount" type="number" placeholder="金额"></el-input>
			</p>
			<p class="oneline">
				<span class="title align-right">预警百分比</span>
				<el-input v-model="modalData.data.notify_rate" type="number" placeholder="百分比"></el-input>
			</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="modalData.type=null">取 消</el-button>
				<el-button type="primary" @click="apiCreateActivity">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改阈值 -->
		<el-dialog id="thresholdModal" title="修改阈值" :visible.sync="modalData.type==='threshold'" :show-close="false" width="30%" center>
			<p class="oneline">
				<span class="title align-right">报警阈值</span>
				<el-input v-model="modalData.data.notify_rate" class="content" type="number" min="1" minlength="0" max="100" maxlength="3" placeholder="1~100之间的整数"></el-input>
			</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="modalData.type=null">取 消</el-button>
				<el-button type="primary" @click="apiUpdateThreshod">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 调整预算 -->
		<el-dialog id="budgetModal" title="调整预算" :visible.sync="modalData.type==='budget'" :show-close="false" width="30%" center>
			<p class="oneline">
				<span class="title align-right">预算调整为</span>
				<el-input :value="modalData.data.total_amount/100" ref="editBudget" class="content" type="number" min="0" placeholder="新预算金额"></el-input>
				<span class="title align-left">元</span>
			</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="modalData.type=null">取 消</el-button>
				<el-button type="primary" @click="apiUpdateBudget">确 定</el-button>
			</span>
		</el-dialog>

    </div>
</template>

<script>
import * as Func from "@/utils/time.js";
import * as Api from '@/api/redPacket';

// 页面组件
import ComActivityGroup from "./com-activity-group";
import ComActivityList from "./com-activity-list";

export default {
	name: 'divideAdmin',
	components: {
		ComActivityGroup,
		ComActivityList,
	},
	data(){
		return {
			group_id: '1',
			activityDetail: {},  // 活动组详情
			activityItems: null,  // 活动列表
			modalData: {
				type: null,
				data: {}
			},
		}
	},
	mounted() {
		this.getActivityGroupDetail();
		this.getActivityList();
	},
	methods: {
		/**
		 * 活动组详情
		 */
        getActivityGroupDetail() {
            Api.activityGroupDetail(this.group_id).then(res => {
                // console.log(res.data);
                if(res && res.code===0){
                    this.activityDetail = res.data;
                }
            }).catch(console.log)
        },

		/**
		 * 更新活动组详情
		 */
		apiUpdateActivityGroup(){
			this.modalData.data.amount = String(parseInt(this.$refs.editGroupAmount.$data.currentValue)*100);
			[this.modalData.data.start_time, this.modalData.data.end_time] = this.modalData.data.time.map(item => Func.getTimeString('yyyy-MM-dd hh:mm:ss', item))
			this.modalData.data.period_number = String(this.modalData.data.period_number);

			Api.editActivityGroup(this.modalData.data).then(res => {
				if(res && res.code===0){
					this.activityDetail = this.modalData.data;
					this.modalData.type = null;
				}
			}).catch(console.log)
		},

		/**
		 * 活动列表
		 */
		getActivityList(){
			Api.activityList(this.group_id).then(res => {
				if(res && res.code===0){
					this.activityItems = res.data.list;
				}
			}).catch(console.log)
		},

		/**
		 * 弹窗: 创建活动
		 */
		apiCreateActivity(){
			// 组合数据
			let [time_begin, time_end] = this.modalData.data.time.map(item => Func.getTimeString('yyyy-MM-dd hh:mm:ss', item))
			let {
				group_id,
				seed_amount,
				max_follower,
				follower_amount_uplimit,
				follower_amount_lowlimit,
				total_amount,
				notify_rate
			} = this.modalData.data;
			seed_amount = String(parseInt(seed_amount*100));
			follower_amount_uplimit = String(parseInt(parseFloat(follower_amount_uplimit)*100));
			follower_amount_lowlimit = String(parseInt(parseFloat(follower_amount_lowlimit)*100));
			total_amount = String(parseInt(total_amount)*100);

			// 发送请求
			Api.createActivity({
				group_id,
				time_begin,
				time_end,
				seed_amount,
				max_follower,
				follower_amount_uplimit,
				follower_amount_lowlimit,
				total_amount,
				notify_rate
			}).then(res => {
				if(res && res.code===0){
					this.getActivityList();
					// 关闭弹窗
					this.modalData.type=null;
				}
			}).catch(console.log);
		},

		/**
		 * 弹窗: 调整阈值
		 */
		apiUpdateThreshod(){
			this.modalData.data.notify_rate = parseInt(this.modalData.data.notify_rate);
			Api.editActivity(this.modalData.data).then(res => {
				if(res && res.code===0){
					// 更新数据
					this.activityItems = this.activityItems.map(item => {
						if(item.av_id===this.modalData.data.av_id){
							item.notify_rate=this.modalData.data.notify_rate;
						}
						return item;
					});
					// 关闭弹窗
					this.modalData.type=null;
				}
			}).catch(console.log)
		},

		/**
		 * 弹窗: 调整预算
		 */
		apiUpdateBudget(){
			this.modalData.data.total_amount = String(parseInt(this.$refs.editBudget.$data.currentValue)*100)
			Api.editActivity(this.modalData.data).then(res => {
				if(res && res.code===0){
					// 更新数据
					this.activityItems = this.activityItems.map(item => {
						if(item.av_id===this.modalData.data.av_id){
							item.total_amount=this.modalData.data.total_amount;
						}
						return item;
					});
					// 关闭弹窗
					this.modalData.type=null;
				}
			}).catch(console.log)
		},

	},
}
</script>

<style lang="scss" scoped>
/deep/ .el-date-editor--datetimerange.el-input__inner{
	width: 630px;
}

.app-container{
    padding-top: 0;
    h3{
        margin-top: 24px;
    }

	.oneline{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.title{
			font-size: 14px;
			margin-top: 0;
			margin-bottom: 0;
		}
		.content{
			flex: 1;
		}
		.align-right{
			text-align: right;
			padding-right: 0.8em;
		}
		.align-left{
			text-align: left;
			padding-left: 0.8em;
		}
	}

	// 编辑活动组
	#editGroup{
		.activity-group-container{
			padding: 10px 0;
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
				align-items: center;

				span{
					font-size: 15px;
					line-height: 15px;
				}
				span.title{
					min-width: 130px;
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
	}

	#fissionModal,#thresholdModal, #budgetModal{
		.oneline{
			font-size: 16px;
			font-weight: bold;
		}
	}

	#createActivity .oneline{
		.title{ min-width: 160px;}
	}
}


</style>

