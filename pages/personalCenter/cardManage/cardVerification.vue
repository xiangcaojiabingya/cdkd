<template>
	<!-- 添加还款卡 -->
	<view>
		<item-nav-bar title="添加还款卡"></item-nav-bar>
		<view class="content-body">

			<view class="form-content">
				<view class="tip-text">请输入储蓄卡{{this.formatRepayAcctNo}}的信息</view>
				
				
				<view class="view phone-view row-view">
					<label class="form-label">手机号</label>
					<input  placeholder="请输入预留手机号" class="phone-input" maxlength="11" type='tel' v-model="phone" />
				</view>
				<view class="view code-view">
					<label class="form-label">验证码</label>
					<input placeholder="请输入短信验证码" v-model="phoneMsgCode" type="number" class="code-input"
						maxlength="6" />
					<button class="button short" type="default" size="mini" @click="getCode">{{codeText}}</button>
				</view>
			</view>
			<view>
				<button class="button long" type="primary" @tap="checkCard">下一步</button>
			</view>
		</view>
	</view>

</template>

<script>
	import ItemInput from "@/component/ItemInput.vue"
	import OnePxLine from "@/component/OnePxLine.vue"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	import {
		checkMobile
	} from "../../../utils/index.js"
	export default {
		components: {
			ItemInput,
			OnePxLine,
			ItemNavBar
		},
		data() {
			return {
				cardList: [],
				index: 0,
				codeText: "发送验证码",
				phone: "",
				name: "",
				repayAcctNo:'',
				loanInvoiceId:'',
				acctNo: "",
				acctNos: '请选择卡号',
				noCar: false,
				msgChkUniqCode: "",
				formatRepayAcctNo:'',
				phoneMsgCode: "",
				isGetMsgCode: false //是否获取过短信验证码
			}
		},
		onLoad(options) {
			console.log('mmmmmmmmmm',JSON.stringify(options))
	             this.loanInvoiceId = options.loanInvoiceId
			     this.repayAcctNo = options.repayAcctNo 
			this.formatRepayAcctNo = `****${this.repayAcctNo.substring(this.repayAcctNo.length - 4)}`
			// let userCardInfo = this.$gfdGlobalData.getData('userCardInfo')
			// this.name = userCardInfo.username
			// this.phone = userCardInfo.userPhone
			this.getInfo()
		},
		methods: {
			bindPickerChange(e) {
				console.log(e)
				// if(e.detail.value || e.detail.value === 0){
					this.index = e.detail.value
					this.acctNo = this.cardList[this.index].acctNo
					this.acctNos = this.cardList[this.index].acctNo
				// }
			},
			ckickPicter(){
				if(this.noCar){
					uni.showToast({
						title: '没有可用的二类卡账户，请到柜面开立！',
						icon: "none"
					})
				}
			},
			// getInfo() {
			// 	uni.showLoading({
			// 		title: "加载中"
			// 	})
			// 	let userCardInfo = this.$gfdGlobalData.getData('userCardInfo')
			// 	this.$request.postAjax(this.$apiUrl.queryBankCardPageForPvAction, {
			// 		"userName": userCardInfo.username,
			// 		"userPhone": userCardInfo.userPhone,
			// 		"certID": userCardInfo.userCertId,
			// 		"productId": "GFD001",
			// 	}).then(res => {
			// 		console.log('卡列表：', JSON.stringify(res.cardList))
			// 		this.cardList = res.cardList
			// 		// this.acctNo = this.cardList[this.index].acctNo
			// 		if(res.cardList.length<=0){
			// 			this.noCar = true
			// 		}
			// 		uni.hideLoading()
			// 	}).catch(error => {
			// 		console.log(error);
			// 		this.noCar = true
			// 		uni.hideLoading()
			// 	})
			// },
			valid() {
			
				if (!this.phone) {
					uni.showToast({
						title: "请填写手机号",
						icon: "none"
					})
					return false
				}
				if (!checkMobile(this.phone)) {
					uni.showToast({
						title: "手机号格式不正确",
						icon: "none"
					})
					return false
				}
				if (!this.phoneMsgCode) {
					uni.showToast({
						title: "请填写短信验证码",
						icon: "none"
					})
					return false
				}
				if (this.phoneMsgCode && this.phoneMsgCode.length < 6) {
					uni.showToast({
						title: "请填写6位短信验证码",
						icon: "none"
					})
					return false
				}

				return true
			},
			//获取验证码
			getCode() {
				if (!this.phone) {
					uni.showToast({
						title: "请填写手机号",
						icon: "none"
					})
					return
				}
				if (!checkMobile(this.phone)) {
					uni.showToast({
						title: "手机号格式不正确",
						icon: "none"
					})
					return
				}
				if (this.codeText != '发送验证码') {
					return
				}
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.smsSendNoCaptcha, {
					phone: this.phone,
					tmpCode: "ZYD0012",
				}).then(res => {
					this.isGetMsgCode = true
					let time = getApp().globalData.countdownTime
					var inter = setInterval(() => {
						time--
						this.codeText = time + "s后重新获取"
						if (time <= 0) {
							this.codeText = "发送验证码"
							clearInterval(inter)
						}
					}, 1000)
					console.log('发送验证码返回数据：', res);
					uni.showToast({
						title: "发送验证码成功",
						icon: "none"
					})
					this.msgChkUniqCode = res.msgChkUniqCode
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			//验证银行卡
			checkCard() {
				if (!this.isGetMsgCode) {
					uni.showToast({
						title: "请先获取短信验证码",
						icon: "none"
					})
					return
				}
				if (!this.valid()) {
					return
				}
				const that = this
				uni.showModal({
					title: '是否绑定该银行卡',
					content: this.acctNo,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.commitDatas()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			
			commitDatas() {
				const that = this;
				uni.showLoading({
					title: "加载中"
				})
				that.$request.postAjax(that.$apiUrl.changeCardAction, {
					mobileNo: that.phone,
					// name: that.name,
					acctNo: that.repayAcctNo,
					msgChkUniqCode: that.msgChkUniqCode,
					phoneMsgCode: that.phoneMsgCode,
					loanInvoiceId:that.loanInvoiceId
				}).then(res => {
					console.log('验证卡结果：', res);
					uni.hideLoading()
					getApp().globalData.addBankInfo = {
						phone: that.phone,
						name: that.name,
						acctNo: that.acctNo,
						msgChkUniqCode: that.msgChkUniqCode,
						phoneMsgCode: that.phoneMsgCode,
					}
					// 添加银行卡去掉人脸
					// if (getApp().globalData.openFaceAndOcr) {
					// 	getApp().globalData.RedirectUrl = 'pages/personalCenter/cardManage/addCardResult'
					// 	uni.navigateTo({
					// 		url: '../../../component/FaceAndOcr?queryType=4'
					// 	});
					// } else {
						uni.navigateTo({
							url: "./addCardResult"
						})
					// }
				}).catch(error => {
					console.log('验证卡结果error：', error);
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.form-content {
		background-color: var(--white);
		padding: 0 30rpx;

		.tip-text {
			padding-top: 20rpx;
			font-size: 28rpx;
			text-align: left;
			color: var(--fontColor2);
		}
	}
    .phone-input{
    	margin-right: 260rpx;
    }
	.view {
		box-sizing: border-box;
		width: 100%;
		padding: 34rpx 0;

		.form-label {
			padding-top: 8rpx;
			min-width: 150rpx;
		}
		.picker{
			width: 100%;
			    text-align: right;
		}
	}

	.row-view {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.phone-view {
		border-bottom: 1px solid var(--lineColor);
	}

	.code-view {
		display: flex;
		flex-direction: row;
		padding: 24rpx 0;
	}



	.code-input {
		padding-right: 20rpx;
	}

	.short {
		min-width: 240rpx;
	}

	uni-input {
		padding-top: 8rpx;
		text-align: left;
		width: 100%;
	}
</style>
