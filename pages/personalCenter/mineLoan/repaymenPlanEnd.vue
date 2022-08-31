<template>
	<!-- 还款计划-已还清 -->
	<view>
		<item-nav-bar title="我的贷款"></item-nav-bar>
		<view class="content-body">
			<view class="topbg">
				<!-- <view class="orange-bg"></view> -->
				<view class="tip-text warn">
					<image class="img-tip" src="../../../static/img/cerdit/04icon_ts.png"></image>
					<view class="tip-title">请您于还款日当日北京时间17:00前将足额款项存入约定还款账户中，否则将有可能导致您的贷款发生逾期。</view>
				</view>
				<view class="head-card">
					<view class="direction-view">
						<p>贷款本金(元)</p>
						<p class="money-p">{{repaymenPlanEnd.formatLoanAmt}}</p>
						<!-- <p class="money-p">--------</p> -->
					</view>
					<view class="direction-view">
						<p>已结清</p>
						<p class="money-p">{{hadRepayedAmount}}</p>
					</view>
					<!-- <view class="direction-view">
						<p>贷款本金(元)</p>
						<p class="money-p">444444444</p>
					</view>
					<view class="direction-view">
						<p>已还本金(元)</p>
						<p class="money-p">5555555555</p>
					</view> -->
					<image mode="widthFix" src="../../../static/img/payend_icon.png"></image>
				</view>
			</view>
			<view class="content-table">
				<table>
					<tr>
						<th>期数</th>
						<th>还款日期</th>
						<th>还款金额</th>
						<!-- <th>还款状态</th> -->
					</tr>
					<tr v-for="(item,index) in planList" :key="index">
						<td>第{{planList.length - index}}期</td>
						<td>{{item.repayDate}}</td>
						<td>{{'￥' + item.formatRepayAmount}}</td>
						<!-- <td>{{repayStateName(item.repayStatus)}}</td> -->
					</tr>
				</table>
			</view>
			<view class="bottom-detail">
				<view class="text-blue" @click="handleLoanDetail">借款详情</view>
				<view class="text-orange" @click="handlePaymentEndProve">结清证明</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		formatThousandsNew
	} from "../../../utils/index.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				planList: [],
				nonePlanList: [],
				repaymenPlanEnd: {},
				hadRepayedAmount: ''
			}
		},
		onLoad() {
			this.repaymenPlanEnd = getApp().globalData.repaymenPlanEnd
			this.getrepaymenPlanEnd()
		},
		methods: {

			//结清证明
			handlePaymentEndProve() {
				uni.showLoading({
					title: "加载中..."
				})
				this.$request.postAjax(this.$apiUrl.querySettleAction, {
					//借据编号
					loanInvoiceId: this.repaymenPlanEnd.loanInvoiceId,
					// this.repaymentPlan.loanInvoiceId,
					// item.loanInvoiceId,
					// 合同类型
					contractType: '8',
				}).then(res => {
					console.log("结清证明url地址", res);
					if (res.fileUrl) {
						getApp().globalData.paymentEndProveUrl = res.fileUrl
						uni.navigateTo({
							url: "./paymentEndProve"
						})
					} else if (res.errorMsg) {
						uni.showModal({
							title: "提示",
							content: res.errorMsg,
							showCancel: false,
							confirmText: "确定"
						})
					}
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},

			// 贷款详情
			handleLoanDetail() {
				getApp().globalData.loanDetail = this.repaymenPlanEnd
				uni.navigateTo({
					url: "./loanDetail"
				})
			},

			getrepaymenPlanEnd() {
				// console.log(this.repaymenPlanEnd.loanInvoiceId)
				uni.showLoading({
					title: "加载中...",
				})
				this.$request.postAjax(this.$apiUrl.planDetailAction, {
					loanInvoiceId: this.repaymenPlanEnd.loanInvoiceId,
					// this.repaymenPlanEnd.loanInvoiceId,
				}).then(res => {
					console.log("提前结清：", res);
					res.repayRecordList.forEach((element) => {
						element.formatRepayAmount = formatThousandsNew(element.repayAmount)
					})
					this.planList = res.repayRecordList
					// res.noRepayedPlans.forEach((element) => {
					// 	element.formatRepayAmount = formatThousandsNew(element.leftRepayAmount)
					// })

					// this.nonePlanList = res.noRepayedPlans
					this.hadRepayedAmount = formatThousandsNew(res.hadRepayedAmount)
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			//还款状态
			repayStateName(str) {
				if (str === '1') {
					return "待还款"
				} else if (str === '2') {
					return "部分还款"
				} else if (str === '3') {
					return "已还款"
				} else if (str === '4') {
					return "已逾期"
				} else if (str === '5') {
					return "逾期部分还清"
				} else if (str === '6') {
					return "逾期已还清"
				} else if (str === '7') {
					return "已结清"
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: white;
	}

	.content-body {
		padding-top: 0px;
		// background-color: white;
		position: absolute;
		top: 90rpx;
		left: 0;
		right: 0;

		// background: linear-gradient(#EDEDED,#EDEDED,#EDEDED,#EDEDED,#ffffff);
		.tip-text {
			display: flex;

			.img-tip {
				margin-left: 10rpx;
				margin-top: 3rpx;
			}

			.tip-title {
				font-size: 27rpx;
				width: 100%;
			}
		}

		.topbg {
			height: 440rpx;
			background: linear-gradient(#EDEDED, #EDEDED, #EDEDED, #EDEDED, #ffffff);
			// padding-bottom: 60rpx;
		}

		.head-card {
			// margin-top: 20rpx;
			// margin-left: 20rpx;
			// margin-right: 20rpx;
			// padding: 80rpx 24rpx 100rpx;
			// border-radius: 20rpx;
			// justify-content: space-around;
			// display: flex;
			// flex-direction: row;
			background: url(../../../static/img/person/13bg_xd.png) no-repeat;
			background-size: 100% 100%;
			// background-color: #fff;
			// box-shadow: 0px 0px 5px #f1f1f1;

			position: absolute;
			left: 20rpx;
			top: 110rpx;
			right: 20rpx;
			padding: 80rpx 24rpx 100rpx;
			border-radius: 20rpx;
			justify-content: space-around;
			display: flex;
			flex-direction: row;
			// background-color: #fff;
			// box-shadow: 0px 0px 5px #f1f1f1;

			p {
				margin-bottom: 20rpx;
				font-size: 24rpx;
			}

			image {
				position: absolute;
				width: 150rpx;
				bottom: 30rpx;
				right: 30rpx;
			}

			.direction-view {
				display: flex;
				flex-direction: column;
				align-items: center;

				.money-p {
					color: var(--fontColor);
					font-size: 40rpx;
					font-weight: bold;
				}
			}

		}

		.content-table {
			margin-top: 0;
			padding: 0 20rpx 20rpx 20rpx;
		}

		td {
			background-color: #ffffff;
		}

		.bottom-detail {
			color: var(--color-orange-text);
			font-size: 24rpx;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-around;
			padding: 0 120rpx;
		}
	}
</style>
