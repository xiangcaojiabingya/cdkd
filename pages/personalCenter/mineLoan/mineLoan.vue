<template>
	<!-- 我的贷款页面 -->
	<view>
		<item-nav-bar title="我的贷款"></item-nav-bar>
		<view class="content_loan">
			<view class="loan_hint">请您于还款日当日北京时间17:00前将足额款项存入约定还款账户中，否则将有可能导致您的贷款发生逾期</view>
			<view class="mine_loan" v-if="this.loanReceiptList.length">
				<view class="loan_body" v-for="(item,index) in loanReceiptList" @click="onClickItem(item)">
					<view class="loan_head">
						<view class="loan_head_content">
							<span class="loan_title">借款</span>
							<span class="loan_title_mony">¥ {{item.formatLoanAmt}}</span>
						</view>
						<view class="loan_head_content" v-if="item.status === '1' || item.status === '2'">
							<span class="list-btm-label" v-if="item.status === '2'"
								@click.stop="handleRepaymentPlan(item,'2')">逾期还款</span>
							<span class="list-btm-label" v-if="item.status === '1'"
								@click.stop="handleRepaymentPlan(item,'1')">提前还款</span>
						</view>
					</view>
					<view class="loan_content">
						<view class="lists">
							<span class="list_label">{{item.loanStartTime}}</span>
							<view class="list_label_content">
								<span class="list_label_content_title">{{item.formatStatus}}</span>
								<image src="../../../static/img/to_right_icon.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="loan_none_entry" v-else>
				<!-- <view class="loan_hint">请您于还款日当日北京时间17:00前将足额款项存入约定还款账户中，否则将有可能导致您的贷款发生逾期</view> -->
				<view class="entry_hint">
					<image src="../../../static/mine_none.png" mode="widthFix"></image>
					<view>
						暂无贷款记录
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatThousandsNew
	} from "../../../utils/index.js"
	import {
		loanStatus
	} from "../../utils/dictionary.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				loanReceiptList: []
			}
		},
		onShow() {
			this.getMineLoanList()
		},
		methods: {
			//
			handleRepaymentPlan(item, type) {
				const repayAcctNo = item.repayAcctNo
				const loanInvoiceId = item.loanInvoiceId
				const canRepayFlag = item.canRepayFlag
				if (type === '2') { //逾期按钮

					//测试i这样些，不测试删掉return
					// uni.navigateTo({
					// 	url: `./overduePayment?repayAcctNo=${repayAcctNo}&loanInvoiceId=${loanInvoiceId}`
					// })
					// return;

					if (canRepayFlag === '0') {
						uni.navigateTo({
							url: `./overduePayment?repayAcctNo=${repayAcctNo}&loanInvoiceId=${loanInvoiceId}`
						})
					} else {
						uni.showToast({
							title: "该产品最早还款日期为借款次日",
							icon: "none"
						})
						return
					}
				} else { //提前还款按钮

					const status = item.status
					const loanBalance = item.loanBalance

					getApp().globalData.prepaymentPage = item
					// uni.navigateTo({
					// 	url: `./prepaymentPage`
					// })
					// return;

					if (status === '2') {
						uni.showToast({
							title: "您有逾期还款交易，请先进行逾期还款",
							icon: "none"
						})
						return
					}
					if (canRepayFlag === '0') {
						getApp().globalData.prepaymentPage = item
						uni.navigateTo({
							url: `./prepaymentPage`
						})
						console.log("111111111111")
					} else {
						uni.showToast({
							title: "该产品最早还款日期为借款次日。",
							icon: "none"
						})
						return
					}
				}
			},


			//获取我的贷款列表
			getMineLoanList() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.queryLoanListAction, {
					productId: 'ZYD001',
				}).then(res => {
					console.log("我的贷款列表", res);
					res.loanReceiptList.forEach((element) => {
						element.formatLoanAmt = formatThousandsNew(element.loanAmt)
						element.formatStatus = this.formatStatus(element.status)
					})
					this.loanReceiptList = res.loanReceiptList
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			formatStatus(status = '') {
				let formatStatus = ''
				if (status === '1') {
					formatStatus = '使用中'
				} else if (status === '2') {
					formatStatus = '已逾期'
				} else if (status === '3') {
					formatStatus = '已结清'
				} else {
					formatStatus = ''
				}
				return formatStatus
			},
			//进入详情
			onClickItem(item) {
				const status = item.status
				const loanInvoiceId = item.loanInvoiceId
				const formatLoanAmt = item.formatLoanAmt
				const loanStartTime = item.loanStartTime
				if (status === '1' || status === '2') {
					// 使用中，未结清
					getApp().globalData.repaymentPlan = item
					uni.navigateTo({
						url: "./repaymentPlan"
					})
				} else if (status === '3') {
					// 已结清
					getApp().globalData.repaymenPlanEnd = item
					uni.navigateTo({
						url: "./repaymenPlanEnd"
					})
				} else {
					return
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.content_loan {
		padding-top: 120rpx;

		.mine_loan {
			margin-top: 31rpx;
			margin-bottom: 36rpx;

			// 卡片整体
			.loan_body {
				width: 690rpx;
				background-color: #FFFFFF;
				margin-left: 31rpx;
				margin-right: 31rpx;
				border-radius: 16rpx;
				position: relative;
				margin-bottom: 20rpx;

				.loan_head {
					border-bottom: 1rpx solid var(--lineColor);
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 10rpx 30rpx 10rpx 0;


					.loan_head_content {
						display: flex;
						flex-direction: column;

						.loan_title {
							font-size: 30rpx;
							color: #999999;
							line-height: 84rpx;
							margin-left: 33rpx;
							margin-right: 20rpx;
						}

						.loan_title_mony {
							font-size: 30rpx;
							line-height: 54rpx;
							margin-left: 33rpx;
							margin-right: 20rpx;
						}

						.list-btm-label {
							padding: 5rpx;
							margin: 10rpx 0;
							font-size: 25rpx;
							border-radius: 30rpx;
							// line-height: 99rpx;
							text-align: center;
							width: 135rpx;
							color: #FF661A;
							border: 1px solid #FF661A;
						}
					}
				}

				.loan_content {
					margin-top: 24rpx;
					padding-bottom: 15rpx;


					.lists {
						display: flex;
						line-height: 63rpx;
						padding-right: 30rpx;
						display: flex;
						justify-content: space-between;

						.list_label {
							font-size: 31rpx;
							color: #999999;
							margin-left: 33rpx;
							display: inline-block;
							// width: 190rpx;
						}

						.list_label_content {
							display: flex;
							align-items: center;

							.list_label_content_title {
								font-size: 24rpx;
							}

							image {
								width: 10rpx;
								height: 20rpx;
								padding-left: 16rpx;
								margin-top: 5rpx;
							}
						}
					}
				}

			}
		}
	}

	.card_bottom {
		border-top: 1rpx solid var(--lineColor);
	}

	/* 无贷款记录 */
	.loan_none_entry {
		text-align: center;
	}

	/* 按钮 */

	/* 无贷款记录 */
	.loan_none_entry image {
		width: 120rpx;
		height: 136rpx;
		margin-bottom: 40rpx;
	}

	.loan_hint {
		font-size: 27rpx;
		color: #CCAA00;
		background-color: #FFF9DB;
		text-align: left;
		line-height: 47rpx;
		padding-left: 27rpx;
		padding-top: 11rpx;
		padding-bottom: 11rpx;
		// border-radius: 8rpx;
		// margin-right: 31rpx;
		// margin-left: 31rpx;
	}

	/* 无查询记录 */
	.entry_hint {
		padding-top: 200rpx;
		color: #999999;
		font-size: 28rpx;
		background: #FFFFFF;
		height: 932rpx;
	}
</style>
