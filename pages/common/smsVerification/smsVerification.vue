<template>
	<view>
		<item-nav-bar title="短信验证" :st='st'></item-nav-bar>
		<view class="content-body">
			<view class="form-content">
				<view class="view phone-view">
					<label class="form-label">手机号</label>
					<text class="phone-text">{{phone}}</text>
				</view>
				<view class="view code-view">
					<label class="form-label">验证码</label>
					<input placeholder="请输入短信验证码" v-model="phoneMsgCode" maxlength="6" type='number' />
					<button class="button short" type="default" size="mini" @click="getMsgCode()">{{codeText}}</button>
				</view>
			</view>
			<view>
				<button class="button long" type="primary" @tap="submit">提交申请</button>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		postAjax,
		getAjax
	} from "../../../request/api.js"
	import apiUrl from "../../../request/url.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				st:2,
				crediter: {},
				codeText: "发送验证码",
				phone: '',
				phoneMsgCode: '', //短信验证码
				msgChkUniqCode: "", //短信验证码标识
				creditTypeList: ['creditOfSpouse', 'credit', 'creditAtlast', ],
				loanTypeList: ['loanOfSpouse', 'loan'],
				urlObject: {
					'otherInformation': {
						resultUrl: '../../credit/creditApplyResult',
						url: this.$apiUrl.creditApplyAction,
						tmpCode: "ZYD0016"
					},
					'creditOfSpouse': {
						resultUrl: '../../credit/creditApplyResult',
						url: this.$apiUrl.applySubmitForPvAction,
						tmpCode: "GFD003"
					},
					'credit': {
						resultUrl: '../../credit/creditApplyResult',
						url: this.$apiUrl.applySubmitForPvAction,
						tmpCode: "GFD003"
					},
					'creditAtlast': {
						resultUrl: '../../credit/creditApplyResult',
						url: this.$apiUrl.applySubmitForPvAction,
						tmpCode: "GFD003"
					},
					'loanOfSpouse': {
						resultUrl: '../../loan/loanApplyResult',
						url: this.$apiUrl.loanSubmitAction,
						tmpCode: "GFD010"
					},
					'loan': {
						resultUrl: '../../loan/loanApplyResult',
						url: this.$apiUrl.loanSubmitAction,
						tmpCode: "ZYD0017"
					},
					'loanAtlast': {
						resultUrl: '../../loan/loanApplyResult',
						url: this.$apiUrl.loanSubmitForPvAction,
						tmpCode: "GFD010"
					},
					'advancePay': {
						//还款
						resultUrl: '../../personalCenter/mineLoan/paymentEndResult',
						url: this.$apiUrl.loanRepayAction,
						tmpCode: "GFD012"
					},
					'minPeaymentPlan': {
						resultUrl: '../../personalCenter/mineLoan/paymentEndResult',
						url: this.$apiUrl.loanRepayAction,
						tmpCode: "ZYD0015"
					},
					'overduePayment': {
						resultUrl: '../../personalCenter/mineLoan/paymentEndResult',
						url: this.$apiUrl.loanRepayAction,
						tmpCode: "ZYD0014"
					},
				},
				bizToken: '',
				isGetMsgCode: false, //是否获取过短信验证码
			}
		},
		onLoad() {
			this.phone = getApp().globalData.phone || uni.getStorageSync("phone");
			if (this.$gfdGlobalData.getData('openFaceAndOcr')) {
				if (this.options.type === 'loan') {
					this.st = 4
					let searchURL = window.location.search;
					searchURL = searchURL.substring(1, searchURL.length);
					this.bizToken = searchURL.split("&")[0].split("=")[1];
					// getApp().globalData.bizToken = this.bizToken
					// uni.setStorageSync('bizToken', this.bizToken)
					this.getDetectInfo()
				}
			}
		},
		methods: {
			//获取识别信息
			getDetectInfo() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.getDetectInfoAction, {
					queryType: '4', // 1 用款人脸后进
					"bizToken": this.bizToken,
				}).then(res => {
					uni.hideLoading();
					console.log('身份识别信息：', JSON.stringify(res));
				}).catch(error => {
					console.log(error);
						
					uni.hideLoading()
					uni.redirectTo({
						url: `../../loan/applyConfirm`
					})
				})
			},
			//获取短信验证码
			getMsgCode() {
				if (this.codeText != '发送验证码') {
					return
				}
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.smsSendNoCaptcha, {
					"phone": this.phone,
					"tmpCode": this.urlObject[this.options.type].tmpCode,
				}).then(res => {
					this.isGetMsgCode = true
					let time = this.$gfdGlobalData.getData('countdownTime')
					// let time = getApp().globalData.countdownTime
					var inter = setInterval(() => {
						time--
						this.codeText = time + "s后重新获取"
						if (time <= 0) {
							this.codeText = "发送验证码"
							clearInterval(inter)
						}
					}, 1000)
					console.log(res);
					uni.showToast({
						title: "发送验证码成功",
						icon: "none"
					})
					this.msgChkUniqCode = res.msgChkUniqCode
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},
			submit: function() {
				if (!this.isGetMsgCode) {
					uni.showToast({
						title: "请先获取短信验证码",
						icon: "none"
					})
					return
				}
				if (!this.phoneMsgCode) {
					uni.showToast({
						title: "请输入短信验证码",
						icon: "none"
					})
					return false
				}
				if (this.phoneMsgCode && this.phoneMsgCode.length < 6) {
					uni.showToast({
						title: "请输入6位短信验证码",
						icon: "none"
					})
					return false
				}
				console.log(this.options)
				if (this.urlObject[this.options.type].url) {
					uni.showLoading({
						title: "加载中"
					})
					let params = {}
					// if (this.creditTypeList.includes(this.options.type)) {
					// 	params = {
					// 		applyNo: this.options.applyNo,
					// 		msgChkUniqCode: this.msgChkUniqCode,
					// 		phoneMsgCode: this.phoneMsgCode,
					// 		bizToken: this.$gfdGlobalData.getData('bizToken') || '',
					// 		productId: 'ZYD001',
					// 		userPhone: this.phone,
					// 	}

					// } else if (this.loanTypeList.includes(this.options.type)) {
					// 	const attachments = this.$gfdGlobalData.getData('attachments')
					// 	const loanSubmitInfo = this.$gfdGlobalData.getData('loanSubmitInfo')
					// 	const rcvAcctInfo = this.$gfdGlobalData.getData('rcvAcctInfo')
					// 	const applyInfoCheck = this.$gfdGlobalData.getData('applyInfoCheck')
					// 	const powerListCheck = this.$gfdGlobalData.getData('powerListCheck')
					// 	let creditNum = ''
					// 	let plantNo = ''
					// 	for (let i = 0, len = powerListCheck.length; i < len; i++) {
					// 		plantNo = i ? plantNo + '|' + Buffer.from(powerListCheck[i].plantNo).toString("base64") : plantNo + Buffer.from(powerListCheck[i].plantNo).toString("base64")
					// 		creditNum = i ? creditNum + '|' + powerListCheck[i].creditNum : creditNum + powerListCheck[
					// 				i]
					// 			.creditNum
					// 	}
					// 	params = {
					// 		productId: 'ZYD001',
					// 		creditNum: creditNum,
					// 		plantNo: plantNo,
					// 		...rcvAcctInfo,
					// 		...applyInfoCheck,
					// 		...loanSubmitInfo,
					// 		initRate: applyInfoCheck.rate,
					// 		rcvAcctCardBelong: '1',
					// 		msgChkUniqCode: this.msgChkUniqCode,
					// 		phoneMsgCode: this.phoneMsgCode,
					// 		attachments: attachments,
					// 		rcvAcctBankNo: rcvAcctInfo.cnapsCode,
					// 		rcvAcctBankName: rcvAcctInfo.cnapsName,
					// 		// loanAmount: '10000',
					// 		// loanPurpose: '21',
					// 		// repayment: '2',
					// 	}
					// 	console.log('params', params)
					// } else if (this.options.type === 'loanAtlast') {
					// 	const applyInfoCheck = this.$gfdGlobalData.getData('applyInfoCheck')
					// 	params = {
					// 		creditLimitId: applyInfoCheck.creditLimitId,
					// 		msgChkUniqCode: this.msgChkUniqCode,
					// 		phoneMsgCode: this.phoneMsgCode,
					// 		rcvAcctCardBelong: "1",
					// 		applyId: applyInfoCheck.applyId
					// 	}
					// } else if (this.options.type === 'advancePay') { //提前还款
					// 	const repaymentPlan = this.$gfdGlobalData.getData('repaymentPlan')
					// 	params = {
					// 		productId: 'ZYD001',
					// 		loanInvoiceId: repaymentPlan.loanInvoiceId,
					// 		amount: this.$gfdGlobalData.getData('loanAmount'),
					// 		msgChkUniqCode: this.msgChkUniqCode,
					// 		phoneMsgCode: this.phoneMsgCode,
					// 	}
					// } else 
					if (this.options.type === "loan") { //用款
						let loanSubmitReqObj = uni.getStorageSync('loanSubmitReqObj')
						loanSubmitReqObj.phoneMsgCode = this.phoneMsgCode
						loanSubmitReqObj.msgChkUniqCode = this.msgChkUniqCode
						params = loanSubmitReqObj
					} else if (this.options.type === "minPeaymentPlan") { //提前还款
						const stroData = uni.getStorageSync("minsPeaymentPlan")
						console.log(stroData.amount)
						params = {
							businessType: stroData.repaymentStatus === '2' ? stroData.repaymentStatus : '',
							loanInvoiceId: stroData.loanInvoiceId,
							amount: stroData.amount,
							phoneMsgCode: this.phoneMsgCode,
							msgChkUniqCode: this.msgChkUniqCode
						}
					} else if (this.options.type === "overduePayment") { //提前还款
						const stroData = uni.getStorageSync("overduePayment")
						console.log(stroData.amount)
						params = {
							businessType: stroData.repaymentStatus === '2' ? stroData.repaymentStatus : '',
							loanInvoiceId: stroData.loanInvoiceId,
							amount: stroData.amount,
							phoneMsgCode: this.phoneMsgCode,
							msgChkUniqCode: this.msgChkUniqCode
						}
					} else if (this.options.type === 'otherInformation') { //授信申请
						this.crediter = uni.getStorageSync('infoer')
						console.log('mmmmmmmmmm', JSON.stringify(this.crediter));
						params = {
							// productId: 'ZYD001',
							// loanInvoiceId: repaymentPlan.loanInvoiceId,
							// amount: this.$gfdGlobalData.getData('loanAmount'),
							marriageStatus: this.crediter.marriageState,
							liveAddress: this.crediter.liveAddress,
							liveAreaCode: this.crediter.liveAreaCode,
							highestEducation: this.crediter.highestEducation,
							vocationCode: this.crediter.vocationCode,
							position: this.crediter.position,
							workName: this.crediter.workName,
							workAddrAreaCode: this.crediter.workAddrAreaCode,
							workAddrAddress: this.crediter.workAddrAddress,
							familyInCome: this.crediter.familyInCome,
							msgChkUniqCode: this.msgChkUniqCode,
							phoneMsgCode: this.phoneMsgCode,
							coreCustNo: uni.getStorageSync('coreCustNo'),
							fixedDepositId: uni.getStorageSync('fixedDepositId'),
							branch: this.crediter.branch,
							openBranchNo: this.crediter.branch,
							bankEmpNo: this.crediter.bankEmpNo,
							contactList: this.crediter.contactList,
							entCertificateNo: this.crediter.entCertificateNo,
							enterpriseName: this.crediter.enterpriseName,
							entCertificateKind: "18",
							isSelfEmployed: this.crediter.isSelfEmployed,
							legalName: this.crediter.legalName,
							industry: this.crediter.industry,
							attachments: this.crediter.attachments,
							isPeasant: this.crediter.isPeasant,
							isBusiness: this.crediter.isBusiness,
							workAddCityCode: this.crediter.workAddCityCode,
							workAddProvinceCode: this.crediter.workAddProvinceCode,
							occupation: this.crediter.occupation,
							regAddress:this.crediter.regAddress
						}
					}
					this.$request.postAjax(this.urlObject[this.options.type].url, params).then(res => {
						console.log(res);
						if(this.options.type === "loan"){
							setTimeout(() => {
							       this.requestResult(res)
							}, 5000)
							
						}else{
							uni.redirectTo({
								url: this.urlObject[this.options.type].resultUrl +
									'?result=success&type=' + this.options.type
							})
						}
						uni.hideLoading();
					}).catch(error => {
						uni.hideLoading();
						console.log(error);
						if (error.errorCode === "10020003" || error.errorCode === "10020002") {
							return;
						}
						uni.redirectTo({
							url: this.urlObject[this.options.type].resultUrl + '?result=fail&type=' +
								this.options.type
						})
					})
				} else {
					console.log(this.urlObject[this.options.type].resultUrl)
					uni.navigateTo({
						url: this.urlObject[this.options.type].resultUrl + '?result=success&type=' + this
							.options.type
					})
				}
			},
			//支用申请提交结果请求
			requestResult(response){
				this.$request.postAjax(this.$apiUrl.queryLoanResultAction, {
					loanApplyId: response.loanApplyId
				}).then(res => {
					console.log(res);
					const { status, statusName, failReason } = res
					if(status === '0'){
						uni.redirectTo({
							url: this.urlObject[this.options.type].resultUrl +
								'?result=success&type=' + this.options.type
						})
					}else{
						uni.redirectTo({
							url: this.urlObject[this.options.type].resultUrl + '?result=fail&type=' +
								this.options.type
						})
					}
					uni.hideLoading();
				}).catch(error => {
					uni.hideLoading();
					console.log(error);
					if (error.errorCode === "10020003" || error.errorCode === "10020002") {
						return;
					}
					uni.redirectTo({
						url: this.urlObject[this.options.type].resultUrl + '?result=fail&type=' +
							this.options.type
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-body {
		margin-top: 30rpx;
	}

	.form-content {
		background-color: var(--white);
		padding: 0 30rpx;
	}

	.view {
		box-sizing: border-box;
		width: 100%;
		padding: 34rpx 0;

		.form-label {
			min-width: 120rpx;
			padding-top: 8rpx;
		}
	}

	.phone-view {
		border-bottom: 1px solid var(--lineColor);
	}

	.code-view {
		display: flex;
		flex-direction: row;
		padding: 24rpx 0;
	}

	.short {
		min-width: 220rpx;
		font-size: 24rpx;
	}


	.phone-text {
		margin-left: 50rpx;
	}

	uni-input {
		margin-left: 38rpx;
		padding-top: 8rpx;
	}
</style>
