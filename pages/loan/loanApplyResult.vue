<template>
	<view>
		<item-nav-bar title="用款申请结果"></item-nav-bar>
		<view class="content">
			<view class="use_feedback" v-if="options.result === 'success'|| !options.result">
				<image src="../../static/06pic_cg_160.png"></image>
				<view class="use_success">申请成功</view>
				<!-- <view class="use_feba">{{text[options.type]}}</view> -->
			</view>
			<view class="use_feedback" v-else="options.result === 'fail'">
				<!-- <uni-icons class="icon_success" type="clear" size="100" color="#f05656"></uni-icons> -->
				<image src="../../static/06pic_sb_160.png" mode="widthFix"></image>
				<view class="apply_success">申请提交失败</view>
			</view>
			<button class="use_finish" @click="finish">完成</button>
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
					'loanOfSpouse': '请联系您的配偶登录“日照银行小微时贷”公众号-好产品-光伏贷页面，于24小时内授权同意后提交业务申请。',
					'loan': '申请审核中，请登录“日照银行小微时贷”公众号-好产品-光伏贷页面，查看审批结果。',
					'loanAtlast': '申请审核中，请登录“日照银行小微时贷”公众号-好产品-光伏贷页面，查看审批结果。'
				}
			}
		},
		onLoad(options) {

		},
		methods: {
			finish() {
				// if (this.options.type == 'loanAtlast') {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	})
				// } else if (this.options.type == 'loanOfSpouse') {
				// 	uni.navigateBack({
				// 		delta: 5
				// 	})
				// } else if (this.options.type == 'loan') {
				// 	uni.navigateBack({
				// 		delta: 4
				// 	})
				// }
				uni.switchTab({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		text-align: center;
		padding-top: 120rpx;
	}

	/* 文字总体 */
	.use_feedback {
		margin-top: 120rpx;
	}

	.use_feedback image {
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 40rpx;
	}

	/* 第一段文字,申请提交成功 */
	.use_success {
		font-size: 37rpx;
		margin-bottom: 29rpx;
	}

	/* 第二段文字,温馨提示 */
	.use_feba {
		position: relative;
		width: 429rpx;
		left: 153rpx;
		font-size: 27rpx;
		color: #999999;
		line-height: 49rpx;
	}

	/* 完成button */
	.use_finish {
		color: #FFFFFF;
		position: relative;
		margin: 100rpx auto;
		background: url(../../static/28088小.png) no-repeat center;
		background-size: 281rpx auto;
	}
</style>
