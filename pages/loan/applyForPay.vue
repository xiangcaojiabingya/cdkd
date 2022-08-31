<template>
	<view>
		<item-nav-bar title="用款申请"></item-nav-bar>
		<view class="content-body">
			<view class="white-bg-view">
				<text>借款本金（元）</text>
				<text class="money-text">qqqqqqqqqqqqq</text>
				<!-- <text class="money-text">{{getMoneyFormat(this.info.loanAmount)}}</text> -->
				<text class="year-text">最终执行年利率以用款时为准</text>
			</view>
			<view class="item-body">
				<view class="item-view">
					<text>担保方式</text>
					<text>111111111111111</text>
					<!-- <text>{{guarantWayMatch(this.info.guarantWay)}}</text> -->
				</view>
				<view class="item-view">
					<text>贷款期限</text>
					<text>ggggggggg</text>
					<!-- <text>{{this.info.loanPeriod + '个' + loanUnitMatch(this.info.loanUnit)}}</text> -->
				</view>
				<view class="item-view">
					<text>贷款用途</text>
					<text>fgerge</text>
					<!-- <text>{{loanPurposeMatch(this.info.loanPurpose)}}</text> -->
				</view>
				<view class="item-view">
					<text>年利率</text>
					<text>00000000</text>
					<!-- <text>{{this.applyInfoCheck.rate + '%'}}</text> -->
				</view>
				<view class="item-view">
					<text class="min-width-140">还款方式</text>
					<text>9999</text>
					<!-- <text>{{repaymentMatch(this.info.repayment)}}</text> -->
				</view>
				<view class="item-view">
					<text>还款计划</text>
					<view class="look-view" @click="toPlan">
						<text>查看</text>
						<image src="../../static/img/orange_right.png" mode="widthFix" class="right_icon"></image>
					</view>

				</view>

				<view class="item-view">
					<text>支付方式</text>
					<text>22222222</text>
					<!-- <text>{{payMethodMatch(this.info.payMethod)}}</text> -->
				</view>
				<view class="item-view">
					<text>受托收款户名</text>
					<text>oooooooo</text>
					<!-- <text>{{this.rcvAcctInfo && this.rcvAcctInfo.rcvAcctName}}</text> -->
				</view>
				<view class="item-view">
					<text>受托收款账号</text>
					<text>fggggg</text>
					<!-- <text>{{this.rcvAcctInfo && this.rcvAcctInfo.rcvAcctNo}}</text> -->
				</view>
				<!-- <view class="item-view">
					<text>受托收款账户行号</text>
					<text>{{this.rcvAcctInfo && this.rcvAcctInfo.cnapsCode}}</text>
				</view> -->
				<view class="item-view">
					<text>受托收款行名</text>
					<text>bbbbb</text>
					<!-- <text>{{this.rcvAcctInfo && this.rcvAcctInfo.cnapsName}}</text> -->
				</view>
				<view class="item-view">
					<text>收款账户</text>
					<text>kkkkkkkkkkk</text>
					<!-- <text>{{dealLoanAcctNo(this.info.loanAcctNo)}}</text> -->
				</view>
			</view>
			<button class="button" type="primary" @click="nextStep">下一步</button>
		</view>
		
	</view>

</template>

<script>
	import {
		moneyFormat,
		bankAccountMask
	} from "../../utils/index.js"
	import {
		guarantWay,
		loanPurpose,
		repayment,
		payMethod,
		loanUnit
	} from "../utils/dictionary.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"

	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				powerListCheck: [],
				applyInfoCheck: {},
				rcvAcctInfo: {},
				info: {
					guarantWay: 'C', //担保方式
					loanPurpose: '2101', //贷款用途
					repayment: '9', //还款方式
					payMethod: '1', //支付方式
					loanAmount: 0, //还款总金额
					loanAcctNo: '', //收款账户
					loanPeriod: '144', //借款期限
					loanUnit: '2', //借款期限单位
				}
			}
		},
		onLoad() {
			this.$gfdGlobalData.setData('loanSubmitInfo', this.info)
			// getApp().globalData.loanSubmitInfo = this.info
			this.powerListCheck = this.$gfdGlobalData.getData('powerListCheck')
			this.applyInfoCheck = this.$gfdGlobalData.getData('applyInfoCheck')
			this.rcvAcctInfo = this.$gfdGlobalData.getData('rcvAcctInfo')
			for (let i = 0; i < this.powerListCheck.length; i++) {
				this.info.loanAmount += Number.parseInt(this.powerListCheck[i].totalAmount)
			}
			uni.showLoading({
				title: "加载中"
			})
			// this.$request.postAjax(this.$apiUrl.queryBindAcctAction, {
			// 	productNo: "ZYD001"
			// }).then(res => {
			// 	console.log('卡列表信息：', res);
			// 	this.info.loanAcctNo = res.accList && res.accList[0] && res.accList[0].acctNo
			// 	this.$gfdGlobalData.setData('loanSubmitInfo', this.info)
			// 	uni.hideLoading()
			// }).catch(error => {
			// 	console.log(error);
			// 	uni.hideLoading()
			// })
		},
		methods: {
			// 担保方式字典
			guarantWayMatch(str) {
				const arr = guarantWay.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			// 贷款用途字典
			loanPurposeMatch(str) {
				const arr = loanPurpose.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			// 还款方式字典
			repaymentMatch(str) {
				const arr = repayment.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			// 支付方式字典
			payMethodMatch(str) {
				const arr = payMethod.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			// 借款期限单位字典
			loanUnitMatch(str) {
				const arr = loanUnit.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			toPlan() {
				uni.navigateTo({
					url: './pepaymentPlan'
				});
			},
			//处理收款账户展示
			dealLoanAcctNo(str) {
				return bankAccountMask(str)
			},
			nextStep() {
				uni.navigateTo({
					url: './applyConfirm'
				});
				// this.$request.postAjax(this.$apiUrl.checkAccountCreditForPvAction, {
				// 	"acctNo": this.$gfdGlobalData.getData('rcvAcctInfo').rcvAcctNo,
				// 	"acctName": this.$gfdGlobalData.getData('rcvAcctInfo').rcvAcctName,
				// 	"productId": "ZYD001",
				// }).then(res => {
				// 	uni.hideLoading();
				// 	console.log('文本地址：', res);
				// 	uni.navigateTo({
				// 		url: './applyConfirm'
				// 	});
				// });
			},
			getMoneyFormat(str) {
				return moneyFormat(str + '')
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-body {
		padding-top: 0rpx;
		// background-color: white;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin-top: 90rpx;

		.white-bg-view {
			width: calc(100% - 60rpx);
			background: url(../../static/img/person/08bg_jkbj.png) no-repeat;
			background-size: 100% 100%;
			height: 338rpx;
			margin-left: 30rpx;
			// margin-top: -180rpx;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			color: var(--fontColor);
			// box-shadow: 0px 5px 5px #f1f1f1;
			text{
				text-align: center;
			}
			.money-text {
				color: var(--color-orange-text);
				font-size: 72rpx;
				font-weight: bold;
				margin-top: 20rpx;
			}
			.year-text {
				background-color: #fff7f5;
				color: #ff8a66;
				font-size: 24rpx;
				margin-top: 20rpx;
				padding: 10rpx 24rpx;
			}
		}
		.item-body{
			width: calc(100% - 60rpx);
			background-color: white;
			margin-left: 30rpx;
			padding-top: 30rpx;
			padding-bottom: 20rpx;
			border-bottom-left-radius: 16rpx;
			border-bottom-right-radius: 16rpx;
			.item-view {
				width: 100%;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				font-size: 32rpx;
				color: var(--fontColor);
				justify-content: space-between;
			
				.min-width-140 {
					min-width: 280rpx;
				}
			
				.look-view {
					display: flex;
					align-items: center;
					color: var(--color-orange-text);
				}
			
				.right_icon {
					width: 13rpx;
					margin-left: 10rpx;
				}
			}
		}
		

		.button {
			margin-bottom: 113rpx;
			margin-top: 79rpx;
			width: calc(100% - 60rpx);
		}
	}

	.mt40 {
		// margin-top: 40rpx;
	}
</style>
