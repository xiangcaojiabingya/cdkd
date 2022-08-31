<template>
	<!-- 添加银行卡结果页面 -->
	<view>
		<item-nav-bar title="添加结果"></item-nav-bar>
		<view class="content">
			<view class="feedback">
				<view v-if="result === 'success'">
					<image src="../../../static/06pic_cg_160.png" mode="widthFix"></image>
					<view class="apply_success">添加成功</view>
					<view class="apply_feedback">尊敬的用户，您的卡片已经添加成功</view>
				</view>
				<view v-else-if="result === 'fail'">
					<image src="../../../static/06pic_sb_160.png" mode="widthFix"></image>
					<view class="apply_success">添加失败</view>
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
				result: '',
				bizToken: '',
			}
		},
		onLoad(st) {
			this.result = st.result
			let searchURL = window.location.search;
			searchURL = searchURL.substring(1, searchURL.length);
			this.bizToken = searchURL.split("&")[0].split("=")[1];
			// this.changeBindAcctAction()
		},
		onShow(){
			uni.removeStorageSync('info')
		},
		methods: {
			// changeBindAcctAction() {
			// 	uni.showLoading({
			// 		title: "加载中"
			// 	})
			// 	const that = this;
			// 	const addBankInfo = getApp().globalData.addBankInfo
			// 	const params = {
			// 		'productNo': 'ZYD001',
			// 		'bizToken': this.bizToken,
			// 		'acctNo': addBankInfo.acctNo,
			// 		'mobileNo': addBankInfo.phone,
			// 	}
			// 	this.$request.postAjax(this.$apiUrl.changeBindAcctAction, params).then(res => {
			// 		console.log('添加银行卡结果：', res);
			// 		that.result = 'success'
			// 		uni.hideLoading()
			// 	}).catch(error => {
			// 		console.log(error);
			// 		that.result = 'fail'
			// 		uni.hideLoading();
			// 	})
			// },
			finishFun() {
				uni.navigateBack({
					delta: 2
				})
				// uni.switchTab({
				// 	url: '../../index/index'
				// })
			}
		}
	}
</script>

<style scoped lang="less">
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

	/* 完成button */
	.apply_finish {
		color: #FFFFFF;
		position: relative;
		margin: 100rpx auto;
		background: url(../../../static/28088小.png) no-repeat center;
		background-size: 281rpx auto;
	}
</style>
