<template>
	<!-- 提前结清结果页面 -->
	<view>
		<!-- <item-nav-bar title="账号注销结果"></item-nav-bar> -->
		<view class="content">
			<!-- <view class="reim_feedback" v-if="options.result === 'success'||!options.result">
				<image src="../../../static/06pic_cg_160.png"></image>
				<view class="reim_success">账号注销成功</view>
			</view>
			<view class="reim_feedback" v-else="options.result === 'fail'">
				<image src="../../../static/06pic_sb_160.png" mode="widthFix"></image>
				<view class="apply_success">账号注销失败</view>
			</view>
			<button class="advance_finish" @click="advance_finish">完成</button> -->
		</view>
	</view>

</template>

<script>
	import ItemNavBar from "@/component/ItemNavBar.vue"
	import {
		postAjax,
		getAjax
	} from "../../../request/api.js"
	import apiUrl from "../../../request/url.js"
	export default {
		components: {
			ItemNavBar
		},
		onLoad(options) {
			this.logoutMethod()
		},
		methods: {
			advance_finish() {
				uni.navigateBack({
					delta: 3
				})
			},
			logoutMethod(){
				uni.showLoading({
					title: "注销中"
				})
				this.$request.postAjax(this.$apiUrl.logoutForPvAction, {
					"productId": "ZYD001",
					"phone": getApp().globalData.phone || uni.getStorageSync("phone"),
				}).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: "注销成功",
						icon: "none"
					})
					console.log('注销结果：', res);
					getApp().globalData.iCIFID = ''
					try {
						let ph = uni.getStorageSync("phone");
						uni.clearStorageSync();
						uni.setStorageSync("phone", ph);
						uni.setStorageSync("iCIFID", '')
						uni.reLaunch({
							url: '/pages/login/login'
						});
					} catch (e) {
						// error
					}
				}).catch(error => {
					uni.hideLoading();
					uni.navigateBack({
						delta: 3
					})
					console.log(error);
				});
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
