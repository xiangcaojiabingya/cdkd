<template>
	<!-- 提前结清页面 -->
	<view>
		<item-nav-bar title="提前结清"></item-nav-bar>
		<view class="content-body">
			<view class="item-view mt40">
				<text>还款本金（元）</text>
				<text>{{'￥' + loanAmount}}</text>
			</view>
			<view class="item-view">
				<text>还款利息</text>
				<text>{{repayInterest}}</text>
			</view>
			<view class="item-view">
				<text>还款金额（总计）</text>
				<text>{{'￥' + repayAmount}}</text>
			</view>
			<view class="item-view">
				<text>还款账户</text>
				<text>{{repaymentPlan.repayAcctNo}}</text>
			</view>

			<button class="button" type="primary" @click="submit">确认还款</button>
		</view>
	</view>

</template>

<script>
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				repayAmount: '', //还款总金额
				loanAmount: '', //还款本金
				repayInterest: '', //还款总利息
				repaymentPlan: {},
				noRepayedAmount: '',
				// leftRepayAmount:'',
			}
		},
		onLoad(options) {
			// this.repaymentPlan = getApp().globalData.repaymentPlan
			// this.noRepayedAmount = getApp().globalData.noRepayedAmount
			// this.leftRepayAmount = getApp().globalData.leftRepayAmount
			// console.log("111111111111111111111", this.noRepayedAmount)
			// this.getAdvanceRepay()
		},
		methods: {
			submit() {
				getApp().globalData.loanAmount = this.loanAmount
				uni.navigateTo({
					url: '../../common/smsVerification/smsVerification?type=advancePay'
				})
			},
			//获取提前还款试算列表
			getAdvanceRepay() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.trialAdvanceRepayAction, {
					loanInvoiceId: this.repaymentPlan.loanInvoiceId,
					//借据编号
					amount: this.noRepayedAmount,
					// '329465.12',
					//还款金额
				}).then(res => {
					console.log("提前结清：", res);
					getApp().globalData.amount = res.repayAmount
					this.repayAmount = res.repayAmount //还款总金额
					this.loanAmount = res.loanAmount //还款本金
					this.repayInterest = res.repayInterest //还款总利息
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.item-view {
		background-color: white;
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		font-size: 32rpx;
		color: var(--fontColor);
		justify-content: space-between;

		text:first-child {
			color: var(--fontColor2);
		}
	}

	.button {
		width: calc(100% - 60rpx);
		margin-top: 80rpx;
	}
</style>
