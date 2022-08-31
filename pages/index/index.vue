<template>

	<view>
		<!-- <item-nav-bar  title="存单快贷" :st='10' :st_style='1'></item-nav-bar> -->
		<view class="content">

			<!-- 第一部分 -->
			<view class="application">
				<!-- 文本显示贷款金额 -->
				<view class="app_text">
					<view class="textShow">
						最高可贷款金额（元）
					</view>
					<view class="numShow">
						{{top_quota}}万</text>
					</view>
				</view>
				<!-- 申请按钮 -->
				<view class="app_button">
					<view class="creditApplication" @click="handle">
						<image src="../../static/img/index/card_btn_credit.png"></image>
					</view>
					<view class="useApplication" @click="handle2">
						<image src="../../static/img/index/card_btn_use.png"></image>
					</view>
				</view>
				
				<view class="tip">
					<image class="tip_img" src="../../static/img/index/zyd_tip.png"></image>
					<view class="warm-tip">
						<span>若您的存单为纸质存单，需持本人身份证、银行卡</span>
						<view>到我行任一网点将其转换成电子存单才能申请。</view>
					</view>
				</view>
			</view>
			
			
			
			<!-- <view class="bottom-log">
				<image class="bottom-log-img" src="../../static/img/index/zyd_log_sy.png"></image>
			</view> -->
			<!-- 第二部分 -->
			<view class="second_view">
				<view class="product_list">
					<image src="../../static/img/index/zyd_llyh.png"></image>
					<view class="right-context">
						<view class="explain_list"> 利率优惠 </view>
						<view class="explain"> 年利率低至4.15% </view>
					</view>
				</view>
			</view>
			<view class="second_view">
				<view class="product_list">
					<image src="../../static/img/index/list_img_gxkj.png"></image>
					<view class="right-context">
						<view class="explain_list"> 高效快捷 </view>
						<view class="explain"> 线上申请，线上放款 </view>
					</view>
				</view>
			</view>
			<!-- <view class="second_view">
				<view class="product_list">
					<image src="../../static/img/index/list_img_gxkj.png"></image>
					<view class="right-context">
						<view class="explain_list"> 高效快捷 </view>
						<view class="explain"> 线上申请，自动审批 </view>
					</view>
				</view>
			</view>
			<view class="second_view">
				<view class="product_list">
					<image src="../../static/img/index/list_img_bjyk.png"></image>
					<view class="right-context">
						<view class="explain_list"> 便捷用款 </view>
						<view class="explain"> 无需抵押，自主申请 </view>
					</view>
				</view>
			</view>
			<view class="second_view">
				<view class="product_list">
					<image src="../../static/img/index/list_img_zkzy.png"></image>
					<view class="right-context">
						<view class="explain_list"> 专款专用 </view>
						<view class="explain"> 贷款专用，光伏发电 </view>
					</view>
				</view>
			</view> -->
		<!-- 	<view class="second_view">
				<view class="productFeatures">
					<view class="product_list">
						<image src="../../static/01icon_ccqx_130.png" style="margin-top:61rpx;"></image>
						<view class="explain_list"> 超长期限 </view>
						<view class="explain"> 贷款期限 <br> 12年 </view>
					</view>
					<view class="product_list">
						<image src="../../static/01icon_gxbj_130.png" style="margin-top:61rpx;"></image>
						<view class="explain_list"> 高效快捷 </view>
						<view class="explain"> 线上申请 <br> 线上放款 </view>
					</view>
				</view>
				<view class="productFeatures">
					<view class="product_list">
						<image src="../../static/01icon_bjyk_130.png" style="margin-top:41rpx;"></image>
						<view class="explain_list"> 便捷用款 </view>
						<view class="explain" style="margin-bottom:53rpx;"> 无需抵押 <br> 信用贷款 </view>
					</view>
					<view class="product_list">
						<image src="../../static/01icon_zkzy_130.png" style="margin-top:41rpx;"></image>
						<view class="explain_list"> 专款专用 </view>
						<view class="explain" style="margin-bottom:53rpx;"> 贷款专用 <br> 光伏安装 </view>
					</view>
				</view>
			</view> -->
			<!-- <view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{longitude}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{latitude}}</text>
		</view>
		<view class="text-area">
			<text class="title">{{address}}</text>
		</view> -->
		</view>
	</view>


</template>

<script>
	import {
		GetKey
	} from "../../common/js/AESCryptoJS.js"
	import config from "../../config.js"
	import {
		isLogin
	} from "../../utils/index.js"
	import ItemNavBar from "../../component/ItemNavBar.vue"
	import {loanUnitMap} from "../utils/projectFormConfig.js"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				title: 'Hello',
				longitude: '',
				latitude: '',
				address: '',
				
				top_quota: '',
				maxCreditPeriod: '',
				detail_quota: '',
				formatMaxCreditPeriod: ''
			}
		},
		onLoad() {
			// uni.openSetting()
			//AES的钥匙
			var aesKey = GetKey()
			this.$gfdGlobalData.setData('aesKey', aesKey)
			
			this.fetchProductInformation();
			
			// console.log(maxCreditAmt)
			
			// getApp().globalData.aesKey = GetKey()
			// uni.setStorageSync("aesKey", GetKey())
			//判断中台Token
			// this.getToken()
		},
		methods: {
			// 获取产品信息
			fetchProductInformation() {
				this.$request.postAjax(this.$apiUrl.getQueryProductDetailAction, {
					productId: "ZYD001"
				}).then(res =>{
					this.top_quota = Number(res.maxCreditAmt) / 10000;
					this.formatMaxCreditPeriod = res.maxCreditPeriod + loanUnitMap[res.creditTermUnit];
					this.detail_quota = Number(res.maxCreditAmt) / 10000;
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				});
			},
			// //判断中台Token
			// getToken() {
			// 	if (!uni.getStorageSync("token")) {
			// 		// uni.navigateTo({
			// 		// 	url: '../credit/credit'
			// 		// });
			// 	}
			// },
			handle() {
				if (isLogin()) {
					uni.navigateTo({
						url: '../credit/credit'
					});
				}
			},
			handle2() {
				if (isLogin()) {
					uni.navigateTo({
						url: '../loan/loanList'
					});
				}
			},
			// gotoPage(index) {
			// 	this.currentIndex = index;

			// },
			// toPersonalCenter() {
			// 	uni.navigateTo({
			// 		url: "../personalCenter/personalCenter"
			// 	})
			// },
			handle2gf() {
				if (isLogin()) {
					uni.showLoading({
						title: "加载中"
					})
					new Promise((resolve, reject) => {
						this.$request.postAjax(this.$apiUrl.queryCreditLimitForPvAction, {
							"productId": "ZYD001",
						}).then(res => {
							console.log('授信列表：', res)
							uni.hideLoading();
							const creditLimitList = res.creditLimitList
							// let canLoan = false
							// for(let i = 0; i < creditLimitList.length; i++){
							// 	if(['1', '2', '3', '5'].includes(creditLimitList[i].loanStatus)){
							// 		canLoan = true
							// 	}
							// }
							console.log(creditLimitList.length)
							if (creditLimitList.length) {
								resolve();
							} else {
								uni.showModal({
									title: "提示",
									content: '无可用授信！',
									showCancel: false,
									confirmText: "确定"
								})
							}
						});
					}).then(res => {
						uni.showLoading({
							title: "加载中"
						})
						this.$request.postAjax(this.$apiUrl.queryBindAcctAction, {
							"productNo": "ZYD001",
						}).then(res => {
							console.log('绑定卡数据：', res.accList)
							if (res.accList.length) {
								uni.navigateTo({
									url: '../loan/loanList'
								});
							} else {
								uni.showModal({
									title: "提示",
									content: '请先绑定二类卡！',
									showCancel: false,
									confirmText: "确定"
								})
							}
							uni.hideLoading();
						});
					})
				}

			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: url(../../static/img/index/zyd_index_banner.png) no-repeat;
		background-size: 100% auto;
		/* background-position: 0rpx -50rpx; */
		/* margin-top: 90rpx; */
	}

	/* 第一部分 */
	.application {
		background-color: #FFFFFF;
		width: 692rpx;
		height: 677rpx;
		border-radius: 8rpx;
		margin-top: 200rpx;
		margin-bottom: 30rpx;
	}

	/* 最高额度显示 */
	.textShow {
		text-align: center;
		color: rgb(25,25,25);
		font-size: 32rpx;
		line-height: 32rpx;
		margin-top: 63rpx;
	}

	.numShow {
		text-align: center;
		font-size: 100rpx;
		color: rgb(255,102,25);
		// line-height: 100rpx;
		margin-top: 35rpx;
		font-weight: bold;
	}

	/* 申请按钮 */
	.app_button {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.app_button view {
		text-align: center;
		/* line-height: 85rpx; */
		/* width: 283rpx; */
		/* height: 104rpx; */
		/* font-size: 36rpx; */
		/* margin: 60rpx 33rpx 42rpx 41rpx; */
		/* background-size: 100% auto; */
	}
	
	.creditApplication{
		margin: 40rpx 24rpx 20rpx 41rpx;
	}

	/* 授信申请 */
	.creditApplication image{
		/* background: linear-gradient(to right, #FFF7EA, #ffefe8); */
	/* 	background: url(../../static/01btn_sxsq.png);
		color: #FF6619; */
		width: 280rpx;
		height: 108rpx;
	}
	
	.useApplication{
		margin: 40rpx 24rpx 20rpx 41rpx;
	}

	/* 用款申请 */
	.useApplication image{
		/* right: 48rpx; */
		/* background: linear-gradient(to right, #FFAD33, #FF661A); */
	/* 	background: url(../../static/01btn_yksq.png);
		color: #FFFFFF; */
		width: 280rpx;
		height: 108rpx;
	}
	
	/* tip */
	.tip{
		width: 100%;
		text-align: center;
		
		.tip_img{
			margin-top: 10rpx;
			width: 478rpx;
			height: 33rpx;
		}
		.warm-tip{
			text-align: center;
			// padding: 0 48rpx;
			view,span{
				width: 90%;
				margin: 0 4%;
				padding: 0 15rpx;
				text-align: center;
				color: #666666;
				font-size: 26rpx;
			}
		}
	}
	.bottom-log{
		position: absolute;
		
		bottom: 72rpx;
		
		.bottom-log-img{
			width: 200rpx;
			height: 52rpx;
		}
	}
	

	/* 第二部分整体 */
	.second_view {
		margin-bottom: 24rpx;
		/* text-align: center; */
		background-color: #FFFFFF;
		width: 692rpx;
		border-radius: 8rpx;
	}
	
	/* 产品特点 */
/* 	.productFeatures {
		display: flex;
		justify-content: center;
		align-items: center;
	} */
	
	.product_list {
		display: flex;
		margin: 30rpx 19rpx 30rpx 40rpx;
		align-items: center;
	}
	
	.product_list image{
		width: 64rpx;
		height: 64rpx;
	}
	
	.right-context{
		margin-left: 30rpx;
	}
	
	/* .productFeatures image {
		width: 132rpx;
		height: 132rpx;
	} */

	/* 特点概要 */
	.explain_list {
		font-size: 32rpx;
		/* margin-top: 25rpx; */
		margin-bottom: 7rpx;
		color: rgb(51, 51, 51);
	}
	
	.explain {
		color: rgb(119,119,119);
		font-size: 26rpx;
		line-height: 41rpx;
	}
</style>
