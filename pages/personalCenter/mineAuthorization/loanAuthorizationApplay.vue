<template>
	<!-- 用款授权申请 -->
	<view>
		<item-nav-bar title="用款授权申请"></item-nav-bar>
		<scroll-view class="content-body" scroll-y="true">
			<view class="card-body">
				<view class="card-head">
					<span class="card-title orange">申请信息</span>
				</view>
				<view class="content-top-view">
					<key-value title="产品名称" content="光伏贷"></key-value>
					<key-value title="申请人姓名" :content="detailInfo.applyName"></key-value>
					<key-value title="身份证号" :content="detailInfo.applyCertNo"></key-value>
					<key-value title="借款本金(元)" :content="'￥'+detailInfo.applyAmt?detailInfo.applyAmt:''"></key-value>
				</view>
			</view>

			<view class="card-body">
				<view class="card-head">
					<span class="card-title orange">申请人配偶</span>
				</view>
				<view class="content-top-view">
					<key-value title="姓名" :content="detailInfo.spname"></key-value>
					<key-value title="身份证号" :content="detailInfo.spcertno"></key-value>
					<key-value title="手机号" :content="detailInfo.spmobile"></key-value>
				</view>
			</view>
			<view class="sq-view">
				<view class="check-view" @click="handleAgree">
					<image class="check-img"
						:src="isAgree?'../../../static/img/cerdit/form_icon_agree.png':'../../../static/img/cerdit/form_icon_disagree.png'">
					</image>
					<text class="agree-tip">我已阅读并同意签署</text>
					<view class="text-name">《一般保证合同》</view>
				</view>
			</view>
			<view class="inline-button-content">
				<button class="button" type="primary" @click="handle">同意授权</button>
				<button class="button inline" type="default" @click="refuse">拒绝授权</button>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	import KeyValue from "@/component/KeyValue.vue"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			KeyValue,
			ItemNavBar
		},
		data() {
			return {
				isAgree: false,
				detailInfo: {},
				bizToken: '',
				applyType: '', //授权种类
				applyNo: '', //申请流水号
				grantId: '',
			}
		},
		onLoad(options) {
			sessionStorage.alreadyRead = false
			let searchURL = window.location.search;
			searchURL = searchURL.substring(1, searchURL.length);
			this.bizToken = searchURL.split("&")[0].split("=")[1];
			getApp().globalData.bizToken = this.bizToken
			uni.setStorageSync('bizToken', this.bizToken)
			this.applyType = options.applyType
			this.applyNo = options.applyNo
			this.grantId = options.grantId
			// this.getDetectInfo()
			this.getDetailInfo()
		},
		onShow() {
			const alreadyRead = JSON.parse(sessionStorage.alreadyRead)
			if(alreadyRead){
				console.log('alreadyReada为true', alreadyRead)
				this.isAgree = true
			} else {
				console.log('alreadyReada为false', alreadyRead)
				this.isAgree = false
			}
			console.log('isAgreeisAgreeisAgree：', this.isAgree)
		},
		methods: {
			//获取识别信息
			// getDetectInfo() {
			// 	uni.showLoading({
			// 		title: "加载中"
			// 	})
			// 	this.$request.postAjax(this.$apiUrl.getDetectInfoAction, {
			// 		queryType: '3', //3带身份验证4不带身份证
			// 		"bizToken": this.bizToken,
			// 	}).then(res => {
			// 		uni.hideLoading();
			// 		console.log('身份识别信息：', JSON.stringify(res));
			// 		this.getDetailInfo()
			// 	}).catch(error => {
			// 		console.log(error);
			// 		uni.hideLoading()
			// 	})
			// },
			//获取授信详情
			getDetailInfo() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.grantDetailForPvAction, {
					productId: "ZYD001",
					applyType: this.applyType,
					applyNo: this.applyNo
				}).then(res => {
					uni.hideLoading();
					console.log('授信授权详情：', JSON.stringify(res));
					this.detailInfo = res
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			//是否同意
			handleAgree() {
				this.isAgree = !this.isAgree
				if(!this.isAgree){
					sessionStorage.alreadyRead = false
				}
				if (this.isAgree && getApp().globalData.openReader) {
					this.$request.postAjax(this.$apiUrl.queryContractProtocol, {
						"contractType": "guarantee",
						"loanAmount": this.detailInfo.applyAmt, //借款金额
						"productId": "ZYD001",
						"applyId": this.applyNo
					}).then(res => {
						uni.hideLoading();
						console.log('文本地址：', res);
						getApp().globalData.contractInfoList = res.contractInfoList
						uni.navigateTo({
							url: '../../../component/ReadDocument'
						})
					}).catch(error => {
						console.log(error);
						uni.hideLoading();
					})
				}
			},
			//同意授权
			handle() {
				//TODO 后台修改后将注释放开
				if (!this.isAgree) {
					uni.showToast({
						title: "请先阅读并同意一般保证合同",
						icon: "none"
					})
					return
				}
				this.authorizationBtn('0')
			},
			//拒绝授权
			refuse() {
				this.authorizationBtn('1')
			},
			authorizationBtn(grantType) {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.grantForPvAction, {
					applyType: this.applyType,
					applyNo: this.applyNo,
					grantType: grantType,
					grantId: this.grantId,
					bizToken: this.bizToken,
				}).then(res => {
					uni.hideLoading();
					console.log('授权：', JSON.stringify(res));
					if (grantType === '0') {
						uni.redirectTo({
							url: "./authorizationResult?result=success"
						})
					} else {
						uni.showToast({
							title: "拒绝授权成功",
							icon: "none"
						})
						setTimeout(function() {
							uni.navigateBack()
						}, 1000);
					}
				}).catch(error => {
					console.log(error);
					uni.redirectTo({
						url: "./authorizationResult?result=fail"
					})
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style scoped>
	.content-body {
		padding-top: 0;
		margin-top: 30rpx;
	}

	.sq-view {
		padding-bottom: 0;
	}

	.content-top-view {
		color: var(--fontColor);
	}

	/deep/ .border-view {
		border-bottom: none;
	}
	
	.button[type=primary]{
		width: 300rpx;
		border-radius: 20rpx;
		margin-top: 50rpx;
	}
</style>
