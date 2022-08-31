<template>
	<view>
		<item-nav-bar title="授信申请结果"></item-nav-bar>
		<view class="content">
			<view class="feedback">
				<view v-if="options.result === 'success' || !options.result">
					<!-- <uni-icons class="icon_success" type="checkbox-filled" size="100" color="#2cbd71"></uni-icons> -->
					<image src="../../static/06pic_cg_160.png" mode="widthFix"></image>
					<view class="apply_success">申请提交成功</view>
					<!-- <view class="apply_feedback">{{text[options.type]}}</view> -->
				</view>
				<view v-else="options.result === 'fail'">
					<!-- <uni-icons class="icon_success" type="clear" size="100" color="#f05656"></uni-icons> -->
					<image src="../../static/06pic_sb_160.png" mode="widthFix"></image>
					<view class="apply_success">申请提交失败</view>
				</view>
			</view>
			<button class="button big-radius" type="primary" @click="finishFun">完成</button>
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
				text: {
					'creditOfSpouse': '请联系您的配偶登录“日照银行小微时贷”公众号-好产品-光伏贷页面，于24小时内授权同意后提交业务申请。',
					'credit': '申请审核中，请登录“日照银行小微时贷”公众号-好产品-光伏贷页面，查看审批结果。',
					'creditAtlast': '申请审核中，请登录“日照银行小微时贷”公众号-好产品-光伏贷页面，查看审批结果。'
				}
			}
		},
		onLoad(options) {
			uni.removeStorageSync('infoer')
			console.log(this.options.type)
			console.log(this.options.result)
		},
		methods: {
			finishFun() {
				// if (this.options.type == 'creditAtlast') {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	})
				// } else if (this.options.type == 'creditOfSpouse') {
				// 	uni.navigateBack({
				// 		delta: 4
				// 	})
				// } else if (this.options.type == 'credit') {
				// 	uni.navigateBack({
				// 		delta: 3
				// 	})
				// }
				uni.switchTab({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		padding-top: 120rpx;
	}

	/* 文字总体 */
	.feedback {
		margin-top: 120rpx;
	}

	.feedback image {
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 40rpx;
	}

	/* 第一段文字,申请提交成功 */
	.apply_success {
		font-size: 37rpx;
		margin-bottom: 29rpx;
	}

	/* 第二段文字,温馨提示 */
	.apply_feedback {
		position: relative;
		width: 429rpx;
		left: 153rpx;
		font-size: 27rpx;
		color: #999999;
		/* var(--fontColor2) */
		line-height: 49rpx;
	}
</style>
