<template>
	<!-- 授权结果页面 -->
	<view>
		<item-nav-bar title="授权结果"></item-nav-bar>
		<view class="content">
			<view class="author_feedback" v-if="options.result === 'success'||!options.result">
				<image src="../../../static/06pic_cg_160.png" mode="widthFix"></image>
				<view class="author_success">授权成功</view>
			</view>
			<view class="author_feedback" v-else="options.result === 'fail'">
				<!-- <uni-icons class="icon_success" type="clear" size="100" color="#f05656"></uni-icons> -->
				<image src="../../../static/06pic_sb_160.png" mode="widthFix"></image>
				<view class="apply_success">授权失败</view>
			</view>
			<button class="author_finish" @click="author_finish()">完成</button>
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
			author_finish() {
				// uni.navigateBack({
				// 	delta: 1
				// })
				uni.switchTab({
					url: '../../index/index'
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
	.author_feedback {
		margin-top: 120rpx;
	}

	.author_feedback image {
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 40rpx;
	}

	/* 第一段文字,申请提交成功 */
	.author_success {
		font-size: 37rpx;
		margin-bottom: 29rpx;
	}

	/* 第二段文字,温馨提示 */
	.author_feba {
		position: relative;
		width: 429rpx;
		left: 153rpx;
		font-size: 27rpx;
		color: #999999;
		line-height: 49rpx;
	}

	/* 完成button */
	.author_finish {
		color: #FFFFFF;
		position: relative;
		margin: 100rpx auto;
		background: url(../../../static/28088小.png) no-repeat center;
		background-size: 281rpx auto;
	}
</style>
