<template>
	<!-- 添加还款卡 -->
	<view>
		<item-nav-bar title="添加还款卡" :st='8'></item-nav-bar>
		<view class="content-body">

			<view class="form-content">
				<view class="tip-text">只支持本人本行银行卡</view>
				<view class="view phone-view row-view">
					<label class="form-label">姓名</label>
					<span class='form-left'>{{this.name}}</span>
				</view>
				<view class="view phone-view code-view">
					<label class="form-label">原扣款卡号</label>
					<span class='form-left'>{{this.card}}</span>

				</view>

				<view class="view phone-view row-view">
					<label class="form-label">变更扣款卡号</label>
					<input class="phone-input" type='number' v-model="loanInvoiceId" placeholder="请输入变更扣款卡号"
						maxlength="19" />
				</view>
				<view class="view phone-view row-view">
					<label class="form-label">手机号</label>
					<input placeholder="请输入预留手机号" class="phone-input" maxlength="11" type='tel' v-model="phone" />
				</view>
				<view class="view code-view">
					<label class="form-label-er">验证码</label>
					<input placeholder="请输入短信验证码" v-model="phoneMsgCode" type="number" class="code-input"
						maxlength="6" />
					<button class="button short" type="default" size="mini" @click="getCode">{{codeText}}</button>
				</view>
			</view>
			<view class="sq-view">
				<view class="check-view" @click="handleAgree">
					<image class="check-img"
						:src="isAgree?require('@/static/img/cerdit/form_icon_agree.png'):require('@/static/img/cerdit/form_icon_disagree.png')">
					</image>
					<text class="agree-tip">我已阅读并同意签署</text>
				</view>

				<view class="text-name">《银行卡变更声明》</view>
				<!-- <view class="text-name">《日照银行个人信息查询授权书》</view> -->
			</view>
			<view>
				<button class="button long" type="primary" @tap="checkCard">下一步</button>
			</view>
		</view>
		<keyboard-package ref="number" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm"
			:disableDot="true" />
	</view>

</template>

<script>
	import ItemInput from "@/component/ItemInput.vue"
	import OnePxLine from "@/component/OnePxLine.vue"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	import keyboardPackage from "@/component/keyboards/keyboard-package/keyboard-package.vue"
	import {
		checkMobile
	} from "../../../utils/index.js"
	export default {
		components: {
			ItemInput,
			OnePxLine,
			ItemNavBar,
			keyboardPackage
		},
		data() {
			return {
				cardList: [],
				isAgree: false,
				crediter: '',
				index: 0,
				codeText: "发送验证码",
				loanInvoiceId: '', //变更扣款卡号
				IousNumber: "", //借据编号
				phone: "",
				name: "",
				card: '',
				acctNo: "",
				acctNos: '请选择卡号',
				noCar: false,
				msgChkUniqCode: "",
				phoneMsgCode: "",
				isGetMsgCode: false //是否获取过短信验证码
			}
		},
		onLoad(st) {
			this.crediter = uni.getStorageSync('info')

			sessionStorage.alreadyRead = false
			this.IousNumber = this.crediter.loanInvoiceId
			console.log('nnnnnnnnnnnnnnn', this.IousNumber)
			this.card = this.crediter.repayAcctNo
			let userCardInfo = this.$gfdGlobalData.getData('userCardInfo')
			this.name = userCardInfo.username
			// this.phone = userCardInfo.userPhone
			// let searchURL = window.location.search;
			// searchURL = searchURL.substring(1, searchURL.length);
			// this.bizToken = searchURL.split("&")[0].split("=")[1];
			// getApp().globalData.bizToken = this.bizToken
			// uni.setStorageSync('bizToken', this.bizToken)
			if (this.$gfdGlobalData.getData("openFaceAndOcr")) {
				let searchURL = window.location.search;
				searchURL = searchURL.substring(1, searchURL.length);
				this.bizToken = searchURL.split("&")[0].split("=")[1];
				getApp().globalData.bizToken = this.bizToken
				uni.setStorageSync('bizToken', this.bizToken)
				// //调用腾讯核身结果
				this.getDetectInfoAction()
			}
			this.getInfo()

		},
		onShow() {

			const alreadyRead = JSON.parse(sessionStorage.alreadyRead)
			if (alreadyRead) {
				console.log('alreadyReada为true', alreadyRead)
				this.isAgree = true
			} else {
				console.log('alreadyReada为false', alreadyRead)
				this.isAgree = false
			}
			console.log('isAgreeisAgreeisAgree：', this.isAgree)
		},
		methods: {
			// bindPickerChange(e) {
			// 	console.log(e)
			// 	// if(e.detail.value || e.detail.value === 0){
			// 		this.index = e.detail.value
			// 		this.acctNo = this.cardList[this.index].acctNo
			// 		this.acctNos = this.cardList[this.index].acctNo
			// 	// }
			// },
			// ckickPicter(){
			// 	if(this.noCar){
			// 		uni.showToast({
			// 			title: '没有可用的二类卡账户，请到柜面开立！',
			// 			icon: "none"
			// 		})
			// 	}
			// },

			getDetectInfoAction() {
				uni.showLoading({
					title: "加载中"
				})
				//获取订单信息
				this.$request.postAjax(this.$apiUrl.addOrderInfoForPvAction, {
					productId: 'ZYD001',
					"bizToken": this.bizToken,
					"queryType": '4',
				}).then(res => {
					console.log('身份证信息：', res);
					this.orderInfo = res
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
					uni.redirectTo({
						url: './cardManage'
					});
				})
			},
			getInfo() {
				uni.showLoading({
					title: "加载中"
				})
				let userCardInfo = this.$gfdGlobalData.getData('userCardInfo')
				this.$request.postAjax(this.$apiUrl.getUserInfoAction, {
					"productId": "ZYD001",
				}).then(res => {
					console.log('卡列表：', JSON.stringify(res.cardList))
					this.cardList = res.cardList
					this.name = res.username
					// this.acctNo = this.cardList[this.index].acctNo
					if (res.cardList.length <= 0) {
						this.noCar = true
					}
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					this.noCar = true
					uni.hideLoading()
				})
			},
			//是否同意
			handleAgree() {
				this.isAgree = !this.isAgree
				if (!this.isAgree) {
					sessionStorage.alreadyRead = false
				}
				if (this.isAgree && getApp().globalData.openReader) {
					uni.showLoading({
						title: "加载中"
					})
					this.$request.postAjax(this.$apiUrl.queryContractProtocolBank, {
						"contractType": "bank",
						"oldAcctNo": this.card,
						'acctNo': this.loanInvoiceId
					}).then(res => {
						uni.hideLoading();
						console.log('文本地址：', res);
						getApp().globalData.contractInfoList = res.contractInfoList
						uni.navigateTo({
							url: '../../../component/ReadDocument'
						})
					}).catch(error => {
						uni.hideLoading();
						console.log(error);
					});
				}
			},
			valid() {

				if (!this.loanInvoiceId) {
					uni.showToast({
						title: "请填写变更扣款卡号",
						icon: "none"
					})
					return false
				}
				if (this.card == this.loanInvoiceId) {
					uni.showToast({
						title: "变更卡号与原扣款卡号相同",
						icon: "none"
					})
					return false
				}
				if (!this.isAgree) {
					uni.showToast({
						title: "请先阅读并同意授权书",
						icon: "none"
					})
					return
				}
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
			commitDatas() {
				const that = this;
				uni.showLoading({
					title: "加载中"
				})
				that.$request.postAjax(that.$apiUrl.changeCardAction, {
					mobileNo: that.phone,
					// name: that.name,
					productNo: 'ZYD001',
					acctNo: that.loanInvoiceId,
					// bizToken:this.bizToken,
					msgChkUniqCode: that.msgChkUniqCode,
					phoneMsgCode: that.phoneMsgCode,
					loanInvoiceId: that.IousNumber
				}).then(res => {
					console.log('验证卡结果：', res);
					uni.hideLoading()

					uni.navigateTo({
						// url: "./addCardResult?result=success",
						url: `./addCardResult?result=success`
					})
				}).catch(error => {
					console.log('验证卡结果error：', error);
					uni.hideLoading()
					uni.navigateTo({
						// url: "./addCardResult?result=success",
						url: `./addCardResult?result=fail`

					})
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
				const that = this;
				// that.$request.postAjax(that.$apiUrl.checkAccNoAction, {
				// 	phone: this.phone,
				// 	name: this.name,
				// 	acctNo: this.loanInvoiceId,
				// 	msgChkUniqCode: that.msgChkUniqCode,
				// 	phoneMsgCode: that.phoneMsgCode,
				// 	msgChkUniqCode: this.msgChkUniqCode,
				// }).then(res => {
				// 	console.log('验证卡结果：', res);
				// 	uni.hideLoading()
				// 	const that = this
				// }).catch(error => {
				// 	console.log('验证卡结果error：', error);
				// 	uni.hideLoading()
				// })
				uni.showModal({
					title: '是否绑定该银行卡',
					content: this.acctNo,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.commitDatas()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			//验证银行卡
			// checkCard() {

			// 	if (!this.valid()) {
			// 		return
			// 	}

			// 	uni.navigateTo({
			// 		url: `./cardVerification?loanInvoiceId=${this.card}&repayAcctNo=${this.phone}`
			// 	})
			// },
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

	.phone-input {
		margin-left: 75rpx;
		width: 900rpx;
	}

	.view {
		box-sizing: border-box;
		width: 100%;
		padding: 34rpx 0;

		.form-label {

			// padding-top: 8rpx;
			min-width: 150rpx;
		}

		.picker {
			width: 100%;
			text-align: right;
		}
	}

	.form-label-er {

		padding-top: 12rpx;
		min-width: 150rpx;
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

	.phone-text {
		margin-left: 50rpx;
	}

	.code-input {
		padding-right: 20rpx;
	}

	.short {
		min-width: 240rpx;
	}

	.form-left {
		margin-left: 70rpx;
	}

	// 同意签署提示
	.sq-view {
		width: auto;
		padding: 15rpx 30rpx 30rpx 35rpx;
		box-sizing: border-box;
		color: var(--color-orange-text);
		font-size: 32rpx;
		margin-top: 20rpx;

		background-color: #FFFFFF;

		.check-view {
			display: flex;
			flex-direction: row;
			align-items: center;

			.check-img {
				width: 36rpx;
				height: 36rpx;
				padding: 20rpx 20rpx 20rpx 0;
			}
		}

		.text-name {
			margin-left: 44rpx;

			+.text-name {
				margin-top: 20rpx;
			}
		}

		.agree-tip {
			color: var(--fontColor);
		}
	}

	uni-input {
		padding-top: 8rpx;
		text-align: left;
		width: 100%;
	}
</style>
