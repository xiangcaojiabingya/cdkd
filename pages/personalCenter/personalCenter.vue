<template>
	<view>
		<!-- <item-nav-bar :isShowLeftIcon="false" title="我的"></item-nav-bar> -->
		<view class="content-view">
			<view class="center">
				<!-- <view class="center-list-item" @click="handleMineCredit">
					<view class="list_line">
						<span>
							<image src="../../static/11icon_sx_38.png"></image>
						</span>
						<span>我的额度</span>
					</view>
					<uni-icons class="right_icons" type="arrowright" size="15" color="#B8B8B8"></uni-icons>
				</view> -->
				<view class="center-list-item" @click="handleMineLoan">
					<view class="list_line">
						<span>
							<image src="../../static/11icon_dk_38.png"></image>
						</span>
						<span>我的贷款</span>
					</view>
					<uni-icons class="right_icons" type="arrowright" size="15" color="#B8B8B8"></uni-icons>
				</view>
				<!-- <view class="center-list-item" @click="handleMineAuthorization">
					<view class="list_line">
						<span>
							<image src="../../static/11icon_sq_38.png"></image>
						</span>
						<span>我的授权</span>
					</view>
					<uni-icons class="right_icons" type="arrowright" size="15" color="#B8B8B8"></uni-icons>
				</view> -->
				<view class="center-list-item" @click="handleCardManage">
					<view class="list_line">
						<span>
							<image src="../../static/11icon_yhk_38.png"></image>
						</span>
						<span>银行卡管理</span>
					</view>
					<uni-icons class="right_icons" type="arrowright" size="15" color="#B8B8B8"></uni-icons>
				</view>
				<view class="center-list-item" @click="CancelaccountCheck()">
					<view class="list_line">
						<span>
							<image src="../../static/img/person/11icon_zxzh_38.png"></image>
						</span>
						<span>注销账号</span>
					</view>
					<uni-icons class="right_icons" type="arrowright" size="15" color="#B8B8B8"></uni-icons>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		isLogin
	} from "../../utils/index.js"
	import {
		postAjax,
		getAjax
	} from "../../request/api.js"
	import apiUrl from "../../request/url.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		methods: {
			//我的授信
			handleMineCredit() {
				if (isLogin()) {
					uni.navigateTo({
						url: "./mineCredit/mineCredit"
					})
				}
			},
			//我的贷款
			handleMineLoan() {
				if (isLogin()) {
					uni.navigateTo({
						url: "./mineLoan/mineLoan"
					})
				}
			},
			// 银行卡管理
			handleCardManage() {
				if (isLogin()) {
					uni.navigateTo({
						url: "./cardManage/cardManage"
					})
				}
			},
			//我的授权
			handleMineAuthorization() {
				if (isLogin()) {
					uni.navigateTo({
						url: "mineAuthorization/mineAuthorization"
					})
				}
			},
			//注销账号验证
			CancelaccountCheck() {
				// let ph = uni.getStorageSync("phone");
				// uni.clearStorageSync();
				// uni.setStorageSync("phone", ph);
				// uni.setStorageSync("iCIFID", '')
				// uni.reLaunch({
				// 	url: '/pages/login/login'
				// });
				// return
				const that = this
				uni.showModal({
					title: '注销后账户不可用，如需使用需要重新注册',
					content: getApp().globalData.phone || uni.getStorageSync("phone"),
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						uni.showLoading({
							title: "加载中"
						})
						that.$request.postAjax(that.$apiUrl.checkBeforeLogoutForPvAction, {
							"productId": "ZYD001",
							"phone": getApp().globalData.phone || uni.getStorageSync("phone"),
						}).then(res => {
							uni.hideLoading();
							console.log('验证结果：', JSON.stringify(res));
							if(res.allowFlag === "1"){
								that.Cancelaccount()
							}
						
						}).catch(error => {
							uni.hideLoading();
							console.log(error);
						});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			//跳转注销账号
			Cancelaccount() {
				const that = this
				uni.showModal({
					title: '是否注销当前账号',
					content: getApp().globalData.phone || uni.getStorageSync("phone"),
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							if (getApp().globalData.openFaceAndOcr) {
								getApp().globalData.RedirectUrl = 'pages/personalCenter/logout/logoutResult'
								uni.navigateTo({
									url: '../../component/FaceAndOcr?queryType=3'
								});
							} else {
								uni.navigateTo({
									url: './logout/logoutResult'
								});
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style scoped>
	.content-view {
		/* background-color: white; */
		/* margin-top: 120rpx; */
	}

	.center {
		margin: 31rpx 30rpx 0 30rpx;
	}

	/* 行 */
	.center-list-item {
		display: flex;
		justify-content: space-between;
		background-color: white;
		font-size: 32rpx;
		line-height: 112rpx;
		margin-bottom: 20rpx;
		border-radius: 8rpx;
	}

	/* 左侧部分 */
	.list_line image {
		/* float: left;*/
		vertical-align: middle;
		margin-left: 20rpx;
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		margin-bottom: 8rpx;
	}

	.list_line {
		line-height: 122rpx;
		width: 248rpx;
		text-align: left;
		
	}
	.right_icons{
		margin-right: 20rpx;
		margin-top: 10rpx;
	}
</style>
