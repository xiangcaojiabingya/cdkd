<template>
	<!-- 还款计划-未结清页面 -->
	<view>
		<item-nav-bar title="我的贷款"></item-nav-bar>
		<view class="content-body">
			<view class="topbg">
				<view class="tip-text warn">
					<image class="img-tip" src="../../../static/img/cerdit/04icon_ts.png"></image>
					<view class="tip-title">请您于还款日当日北京时间17:00前将足额款项存入约定还款账户中，否则将有可能导致您的贷款发生逾期。</view>
				</view>
				<view class="head-card">
					<view class="horizontal-view">
						<h3 @click="waitRepayment" :class="[isHasRepayment?'has-h3 left-radius ':'wait-h3 right-radius ']">
							待还款
						</h3>
						<view :class="[isHasRepayment?'left-line':'right-line']"></view>
						<h3 @click="hasRepayment" :class="[!isHasRepayment?'has-h3 right-radius ':'wait-h3 left-radius']">
							已还款
						</h3>
					</view>
					<view class="bgimg">
						<view v-if="isHasRepayment" class="horizontal-view mt30">
							<view class="direction-view">
								<p>借款本金(元)</p>
								<p class="money-p">{{repaymentPlan.formatLoanAmt}}</p>
								<!-- <p class="money-p">-----------</p> -->
							</view>
							<view class="direction-view">
								<p>已还本金(元)</p>
								<p class="money-p">{{hadRepayedAmount}}</p>
								<!-- <p class="money-p">-0-------</p> -->
							</view>
							<view class="direction-view">
								<p>已还期数</p>
								<p class="money-p">{{hadRepayedNum}}</p>
								<!-- <p class="money-p">------ +planList.length-------</p> -->
							</view>
						</view>
						<view v-else class="horizontal-view mt30">
							<view class="direction-view">
								<p>借款本金(元)</p>
								<p class="money-p">{{repaymentPlan.formatLoanAmt}}</p>
								<!-- <p class="money-p">444444444444</p> -->
							</view>
							<view class="direction-view">
								<p>未还本息合计(元)</p>
								<p class="money-p">{{noRepayedAmount}}</p>
								<!-- <p class="money-p">000000</p> -->
							</view>
							<view class="direction-view">
								<p>未还期数</p>
								<p class="money-p">{{noRepayedNum}}</p>
								<!-- <p class="money-p">-----</p> -->
							</view>
						</view>

						<!-- <button v-if="!isHasRepayment && repaymentPlan.canRepayFlag === '0'" :class="[isOverdue ? 'button disabled':'button']" type="primary" @click="handle">提前结清</button> -->
					</view>
				</view>
			</view>
			<view :class="[isHasRepayment?' content-table':' content-table']">
				<!-- 已还款 -->
				<table v-if="isHasRepayment">
					<tr>
						<th>序号</th>
						<!-- <th>还款状态</th> -->
						<th>还款日期</th>
						<th>还款本息合计</th>
					</tr>
					<tr v-for="(item,index) in planList" :key="item.repayRecordId">
						<!-- <td>{{item.num}}</td> -->
						<td>{{planList.length - index}}</td>
						<td>{{item.repayDate}}</td>
						<td>{{'￥' + item.formatRepayAmount}}</td>
					</tr>
				</table>
				<!-- 待还款 -->
				<table v-else>
					<tr>
						<th>期数</th>
						<th>还款日期</th>
						<th>还款本息合计</th>
					</tr>
					<tr v-for="(item,index) in nonePlanList" :key="item.currentNum">
						<td>{{item.currentNum}}</td>
						<td>{{item.repayDate}}</td>
						<td>{{'￥' + item.formatRepayAmount}}</td>
					</tr>
				</table>
			</view>
			<view class="bottom-detail" @click="handleLoanDetail">
				查看详情
			</view>
		</view>
	</view>

</template>

<script>
	import {
		moneyFormat,formatThousandsNew
	} from "../../../utils/index.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	import {
		repayStatus
	} from '../../utils/dictionary.js'
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				planList: [],
				isOverdue: false,//是否是逾期
				isHasRepayment: false,
				nonePlanList: [],
				repaymentPlan: {},
				hadRepayedAmount: '',
				noRepayedAmount: '',
				hadRepayedNum: '',
				noRepayedNum: '',
			}
		},
		onLoad() {
			this.repaymentPlan = getApp().globalData.repaymentPlan
			// this.isOverdue = this.repaymentPlan.status === '2'
			this.getplanDetail();
		},
		methods: {
			// 贷款详情
			handleLoanDetail() {
				getApp().globalData.loanDetail = this.repaymentPlan
				uni.navigateTo({
					url: "./loanDetail"
				})
			},

			//还款计划查询
			getplanDetail() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.planDetailAction, {
					loanInvoiceId: this.repaymentPlan.loanInvoiceId,
				}).then(res => {
					console.log("还款计划列表", res);

					res.repayRecordList.forEach((element) => {
						element.formatRepayAmount = formatThousandsNew(element.repayAmount)
					})
					res.noRepayedPlans.forEach((element) => {
						element.formatRepayAmount = formatThousandsNew(element.leftRepayAmount)
					})
					//已还本金
					this.hadRepayedAmount = formatThousandsNew(res.hadRepayedAmount);
					//未还本金
					this.noRepayedAmount =formatThousandsNew(res.noRepayedAmount);
					//已还期数
					this.hadRepayedNum = res.hadRepayedNum;
					//未还期数
					this.noRepayedNum = res.noRepayedNum;
					// 未还明细
					this.nonePlanList = res.noRepayedPlans;
					// 借据还款记录
					this.planList = res.repayRecordList;
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			//点击提前结清
			handle(item) {
				if(this.isOverdue){
					return;
				}
				getApp().globalData.advancePaymentEnd = item
				getApp().globalData.noRepayedAmount = this.noRepayedAmount
				// getApp().globalData.leftRepayAmount = this.leftRepayAmount
				uni.navigateTo({
					url: "./advancePaymentEnd"
				})
			},
			//点击待还款
			waitRepayment() {
				this.isHasRepayment = false
			},
			//点击已还款
			hasRepayment() {
				this.isHasRepayment = true
			},
			getFormatMoney(str) {
				return moneyFormat(str)
			},
			//还款状态
			repayStateName(str) {
				const arr = repayStatus.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: white;
	}
	.content-body {
		padding-top: 0px;
		// background-color: white;
		position: absolute;
		top: 90rpx;
		left: 0;
		right: 0;

		// .orange-bg {
		// 	height: 320rpx;
		// }

		// .tip-view {
		// 	position: absolute;
		// 	left: 0rpx;
		// 	top: 20rpx;
		// 	right: 0rpx;
		// 	font-size: 26rpx;
		// 	padding: 20rpx 30rpx;
		// 	line-height: 1.5;
		// 	color: #ffccb2;
		// 	background-color: #ff7733;
		// }
		
		.topbg{
			// background: url(../../static/img/person/09bg_tc.png) no-repeat;
			// background-size: 100% 100%;
			background: linear-gradient(#EDEDED,#EDEDED,#EDEDED,#EDEDED,#ffffff);
			padding-bottom: 60rpx;
			height: 350rpx;
		}
		
		.tip-text{
			display: flex;
			.img-tip{
				margin-left: 10rpx;
				margin-top: 3rpx;
			}
			.tip-title{
				width: 100%;
				font-size: 27rpx;
			}
		}
		
		.head-card {
			// position: absolute;
			// left: 30rpx;
			// top: 190rpx;
			// right: 30rpx;
			margin-top: 20rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			padding: 0rpx 0rpx 20rpx;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			// box-shadow: 0px 0px 5px #f1f1f1;

			h3 {
				font-size: 34rpx;
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				margin-bottom: 0;
			}

			.right-line {
				border-right: 70rpx solid #FFEEE5;
				border-bottom: 70rpx solid transparent;
				width: 0rpx;
				height: 0rpx;
			}

			.left-line {
				border-left: 70rpx solid #FFEEE5;
				border-bottom: 70rpx solid transparent;
				width: 0rpx;
				height: 0rpx;
			}

			.wait-h3 {
				color: var(--color-orange-text);

			}

			.has-h3 {
				color: #e7b8a0;
				background-color: #FFEEE5;
			}

			.left-radius {
				border-top-left-radius: 20rpx;
			}

			.right-radius {
				border-top-right-radius: 20rpx;
			}

			p {
				margin-bottom: 20rpx;
				font-size: 24rpx;
			}

			.button {
				width: 50%;
				border-radius: 20rpx;
				font-size: 32rpx;
			}

			.horizontal-view {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
			}
			.bgimg{
				// background-color: #000000;
				background: url(../../../static/img/person/13bg_dd.png) no-repeat;
				background-size: 100% 100%;
			}
			.direction-view {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 30rpx;

				.money-p {
					color: var(--fontColor);
					font-size: 40rpx;
					font-weight: bold;
				}
			}

		}
		.bottom-detail{
			color: var(--color-orange-text);
			font-size: 24rpx;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			text-align: center;
		}

		.content-table {
			// margin-top: 60rpx;
			padding: 0 20rpx 20rpx 20rpx;
		}
		
		td{
			background-color: transparent;
		}
		
		.mt30{
			margin-top: 30rpx;
		}
		
		.mt390 {
			margin-top: 390rpx;
		}

		.mt260 {
			margin-top: 260rpx;
		}
	}
</style>
