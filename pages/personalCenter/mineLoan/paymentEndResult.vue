<template>
	<!-- 提前结清结果页面 -->
	<view>
		<item-nav-bar title="提前结清结果"></item-nav-bar>
		<view class="content">
			<view class="reim_feedback" v-if="options.result === 'success'||!options.result">
				<image src="../../../static/06pic_cg_160.png"></image>
				<view class="reim_success">还款申请已提交</view>
				<view class="reim_feba">请您前往“我的”-“我的贷款”查看还款结果。</view>
			</view>
			<view class="reim_feedback" v-else="options.result === 'fail'">
				<!-- <uni-icons class="icon_success" type="clear" size="100" color="#f05656"></uni-icons> -->
				<image src="../../../static/06pic_sb_160.png" mode="widthFix"></image>
				<view class="apply_success">申请提交失败</view>
			</view>
			<button class="advance_finish" @click="advance_finish">完成</button>
		</view>
	</view>

</template>

<script>
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		onLoad(options) {},
		methods: {
			advance_finish() {
				uni.navigateBack({
					delta: 3
				})
				// uni.navigateTo({
				// 	url: './advancePaymentEnd'
				// })
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
	.reim_feedback {
		margin-top: 120rpx;
	}

	.reim_feedback image {
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 40rpx;
	}

	/* 第一段文字,申请提交成功 */
	.reim_success {
		font-size: 37rpx;
		margin-bottom: 29rpx;
	}

	/* 第二段文字,温馨提示 */
	.reim_feba {
		position: relative;
		width: 429rpx;
		left: 155rpx;
		font-size: 27rpx;
		color: #999999;
		line-height: 49rpx;
	}

	/* 完成button */
	.advance_finish {
		color: #FFFFFF;
		position: relative;
		margin: 100rpx auto;
		background: url(../../../static/28088小.png) no-repeat center;
		background-size: 281rpx auto;
	}
</style>
