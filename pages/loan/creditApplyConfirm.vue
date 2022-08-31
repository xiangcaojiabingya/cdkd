<template>
	<view>
		<item-nav-bar title="用款授权申请确认"></item-nav-bar>
		<view class="content-body">
			<view class="tip-text warn">
				<image class="img-tip" src="../../static/img/cerdit/04icon_ts.png"></image>
				<!-- <uni-icons type="info" size="28"></uni-icons> -->
				<view class="tip-title">温馨提示：您的申请需配偶授权后方可提交</view>
			</view>
			<view class="card-body">
				<view class="card-head">
					<image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image>
					<span class="card-title orange">申请信息</span>
				</view>
				<view class="content-top-view">
					<key-value title="产品名称" content="光伏贷"></key-value>
					<view class="card-view"></view>
					<key-value title="申请人姓名" :content="this.userInfo.username"></key-value>
					<view class="card-view"></view>
					<key-value title="身份证号" :content="this.userInfo.userCertId"></key-value>
					<view class="card-view"></view>
					<key-value  class="borders" title="借款本金" :content="getMoneyFormat(this.loanSubmitInfo.loanAmount)"></key-value>
				</view>
			</view>

			<view class="card-body">
				<view class="card-head">
					<image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image>
					<span class="card-title orange">申请人配偶</span>
				</view>
				<view class="content-top-view">
					<key-value title="姓名" :content="this.userInfo.spouseName"></key-value>
					<view class="card-view"></view>
					<key-value title="身份证号" :content="this.userInfo.spouseCertID"></key-value>
					<view class="card-view"></view>
					<key-value  class="borders" title="手机号" :content="this.userInfo.spouseMobile"></key-value>
				</view>
			</view>
			<view class="warm-tip">
				<span>本人确认以上信息无误，同意将以上用款申请信息发送至配偶进行授权。</span>
			</view>
			<view>
				<button class="button long" type="primary" @tap="submit">确认提交</button>
			</view>
		</view>
	</view>

</template>

<script>
	import KeyValue from "../../component/KeyValue.vue"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	import {
		moneyFormat
	} from "../../utils/index.js"
	export default {
		components: {
			KeyValue,
			ItemNavBar
		},
		data() {
			return {
				applyNo: '',
				userInfo: {},
			}
		},
		onLoad() {
			this.userInfo = this.$gfdGlobalData.getData('userInfo')
			this.loanSubmitInfo = this.$gfdGlobalData.getData('loanSubmitInfo')
		},
		methods: {
			submit() {
				uni.navigateTo({
					url: '../common/smsVerification/smsVerification?type=loanOfSpouse'
				});
			},
			getMoneyFormat(str) {
				return moneyFormat(str + '')
			}
		}
	}
</script>

<style scoped>
	.content-body {
		padding-top: 0;
		padding-bottom: 80rpx;
	}

	.card-body{
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 16rpx;
	}
	
	.content-top-view {
		color: var(--fontColor);
		border-radius: 16rpx;
	}
	
	.warm-tip {
		padding: 0 32rpx;
	}
	.borders{
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}

	/deep/ .border-view {
		border-bottom: none;
	}
</style>
