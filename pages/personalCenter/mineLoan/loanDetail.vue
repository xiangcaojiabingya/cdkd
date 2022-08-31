<template>
	<!-- 贷款详情页面 -->
	<view>
		<item-nav-bar title="贷款详情"></item-nav-bar>
		<view class="content-body" v-cloak>
			<view class="item-view">
				<text class="lable">借款金额</text>
				<text>{{queryLoanDetailActionObj.formatLoanAmount}}</text>
			</view>
			<view class="item-view">
				<text class="lable">起止时间</text>
				<text>{{queryLoanDetailActionObj.loanStartTime}}至{{queryLoanDetailActionObj.loanEndTime}}</text>
			</view>
			<view class="item-view">
				<text class="lable">年化利率</text>
				<text>{{queryLoanDetailActionObj.rate}}%</text>
			</view>
			<view class="item-view">
				<text class="lable">还款方式</text>
				<text>{{formatRepayMethod}}</text>
			</view>
			<view class="item-view">
				<text class="lable">首次还款日</text>
				<text>{{queryLoanDetailActionObj.firstRepayDay}}</text>
			</view>
			<view class="item-view">
				<!-- /xsdk/getUserInfoAction获取用户信息 -->
				<text class="lable">借款人姓名</text>
				<text>{{queryLoanDetailActionObj.userName}}</text>
			</view>
			<view class="item-view">
				<!-- /xsdk/getUserInfoAction获取用户信息 -->
				<text class="lable">借款人身份证</text>
				<text>{{queryLoanDetailActionObj.certificateNo}}</text>
			</view>
			<view class="item-view">
				<text class="lable">还款日</text>
				<text>每月{{queryLoanDetailActionObj.repayDay}}号</text>
			</view>
			<view class="item-view">
				<text class="lable">借款期限</text>
				<text>{{formatApplyTerm}}（期）</text>
				<!-- <text>{{loanReceipt.term + '个' + loanUnitMatch(loanReceipt.termUnit)}}</text> -->
			</view>
			<!-- <view class="item-view">
				<text class="lable">默认还款账号</text>
				<text>{{loanReceipt.repayAcctNo}}</text>
			</view> -->
			<view class="item-view">
				<text class="lable">合同及协议</text>
				<view class="look-view">
					<span class="selectlook"  v-for="(item,index) in queryLoanDetailActionObj.contractInfoList"
					@click="viewContract(item.contractFileUrl)"> {{"《" + item.contractName + "》"}}</span>
				</view>
			</view>
			<view class="item-view">
				<text class="lable">借款用途</text>
				<text>{{formatLoanPurpose}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		loanUnitMap,
		repaymentMap,
		loanPurposeMap,
	} from '../../../common/projectFormConfig.js';
	import {
		formatThousandsNew
	} from "../../../utils/index.js"
	import {
		repayment,
		loanUnit
	} from '../../utils/dictionary.js'
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				// 申请人信息
				username: '', //姓名
				userCertId: '', //身份证号
				// 贷款信息
				loanReceipt: {},
				// 贷款详情
				loanDetail: {},

				formatApplyTerm: '',
				formatRepayMethod: '',
				formatLoanPurpose: '',
				queryLoanDetailActionObj: {},
			}
		},
		onLoad() {
			this.loanReceipt = getApp().globalData.loanDetail;
			// this.getApplyInfo();
			this.getLoanDetail();
		},
		methods: {
			repaymentMatch(str) {
				const arr = repayment.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			loanUnitMatch(str) {
				const arr = loanUnit.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			viewContract(pdfurl) {

				if (getApp().globalData.openReader) {
					let linkList = JSON.stringify({
						contractInfoList: [{
							contractFileUrl: pdfurl
						}]
					})
					//this.queryLoanDetailActionObj.contractInfoList
					getApp().globalData.contractInfoList = [{
							contractFileUrl: pdfurl
						}]
					// getApp().globalData.contractInfoList = [{
					//     "contractStatus": "",
					//     "contractType": "",
					//     "contractId": "",
					//     "contractName": "",
					//     "contractFileUrl": "wxapp_file/contracts/a940a781a4ab454cbd0bad94591bcabc.pdf"
					// }]
					uni.navigateTo({
						url: '../../../component/ReadDocument?noTime=true'
					})

				}
			},
			// //获取申请人信息
			// getApplyInfo() {
			// 	uni.showLoading({
			// 		title: "加载中",
			// 	})
			// 	this.$request.postAjax(this.$apiUrl.getUserInfoAction, {
			// 		productId: 'ZYD001',
			// 	}).then(res => {
			// 		console.log("申请人信息", res);
			// 		this.username = res.username;
			// 		this.userCertId = res.userCertId;
			// 		uni.hideLoading()
			// 	}).catch(error => {
			// 		console.log(error);
			// 		uni.hideLoading()
			// 	})
			// },
			getLoanDetail() {
				uni.showLoading({
					title: "加载中",
				})
				this.$request.postAjax(this.$apiUrl.queryLoanDetailAction, {
					productId: 'ZYD001',
					loanInvoiceId: this.loanReceipt.loanInvoiceId
				}).then(res => {
					console.log("贷款详情：", res);
					// this.loanDetail = res
					res.formatLoanAmount = formatThousandsNew(res.loanAmount);
					this.formatApplyTerm = res.applyTerm + loanUnitMap[res.applyTermUnit];
					this.formatRepayMethod = repaymentMap[res.repayMethod];
					this.formatLoanPurpose = loanPurposeMap[res.loanPurpose];
					this.queryLoanDetailActionObj = res
					// this.contractInfoList = res.contractInfoList
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-body {
		// margin-top: 30rpx;
		background-color: white;
		padding: 20rpx 0;
		width: calc(100% - 40rpx);
		border-radius: 16rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.item-view {
		width: 100%;
		padding: 20rpx 20rpx 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		font-size: 30rpx;
		color: var(--fontColor);
		justify-content: space-between;

		.lable {
			color: var(--fontColor);
			min-width: 240rpx;
		}

		.look-view {
			align-items: center;
			color:var(--color-orange-text);

			.selectlook {
				// background-color: var(--color-orange-text);
				// padding: 7rpx 35rpx;
				// border-radius: 50rpx;
			}
		}
	}
</style>
