<template>
	<view>
		<item-nav-bar title="用款申请确认" :st='5'></item-nav-bar>
		<view class="content-body">
			<view class="white-bg-view">
				<text>借款本金（元）</text>
				<text class="money-text">{{formatLoanAmount}}</text>
			</view>
			<view class="item-body">
				<view class="item-view">
					<text>贷款期限</text>
					<text>{{formatLoanPeriod}}</text>
					<!-- <text>{{this.loanSubmitInfo.loanPeriod + '个' + loanUnitMatch(this.loanSubmitInfo.loanUnit)}}</text> -->
				</view>
				<view class="item-view">
					<text class="min-width-140">还款方式</text>
					<text>{{formatRepayment}}</text>
				</view>
				<view class="item-view">
					<text>用途</text>
					<text>{{formatLoanPurpose}}</text>
				</view>
				<view class="item-view ">
					<text>担保方式</text>
					<text>{{formatGuarantWay}}</text>
				</view>

				<view class="item-view">
					<text>年利率</text>
					<text>{{initRate + '%'}}</text>
				</view>

				<view class="item-view">
					<text>还款计划</text>
					<view class="look-view" @click="toPlan">
						<text>查看</text>
						<image src="../../static/img/orange_right.png" mode="widthFix" class="right_icon"></image>
					</view>

				</view>
				<view class="item-view">
					<text>收款账户</text>
					<text>{{loanAcctNo}}</text>
				</view>
			</view>
			<view class="item-body mt22 borders">
				<!-- <view class="tip-view">贷款资金禁止用于购买房产、股票、期货、外汇、基金、保险、理财或其他股本权益性投资，禁止用于经营活动以及其他不符合法律、法规、监管政策及我行规定的用途。</view> -->
				<view class="tip-view"> 根据监管规定，贷款资金只能用于个人经营用途，不可用于购买
					理财、股票、房产等风险投资，请您合理规划贷款用途。</view>
				<view class="sq-view">

					<view class="check-view" @click="handleAgree">
						<image class="check-img"
							:src="isAgree?'../../static/img/cerdit/form_icon_agree.png':'../../static/img/cerdit/form_icon_disagree.png'">
						</image>
						<text class="agree-tip">请阅读协议信息</text>
					</view>
					<view class="ml60" @click="singleAgree('borrow')">《个人经营性借款合同（线上）》</view>
					<view class="mt22 ml60" @click="singleAgree('pledge')">《本金最高额权利质押合同（线上）》</view>
					<view class="mt22 ml60" @click="singleAgree('promise')">《资金使用承诺函》</view>
				</view>
			</view>
			<button class="button" type="primary" @click="nextStep">下一步</button>
		</view>

	</view>

</template>

<script>
	import {
		moneyFormat,
		formatThousandsNew
	} from "../../utils/index.js"
	import {
		loanUnitMap,
		repaymentMap,
		guarantWayMap,
		loanPurposeMap
	} from "../../common/projectFormConfig.js"
	import {
		guarantWay,
		loanPurpose,
		repayment,
		payMethod,
		loanUnit
	} from "../utils/dictionary.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"

	import config from '../../config.js';
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				isAgree: false,
				applyInfoCheck: {},
				loanSubmitInfo: {},
				creditLimitId: '',
				sequenceNo: "", //流水号
				/* ======================== */
				txtContractId: "", //文本编号
				formatLoanAmount: '',
				formatLoanPeriod: '',
				formatRepayment: '',
				formatLoanPurpose: '',
				formatGuarantWay: '',
				initRate: '',
				loanAcctNo: '',
				// showRepayPlans: '',
				creditLimitObj: {},
				loanAmount: '',
				loanPeriod: '',
				repaymen: '',

				isAgreeJsonFlag: {
					borrow: false,
					pledge: false,
					promise: false
				},

				RedirectUrl: '',
				url: '',
				bizToken: '',
			}
		},
		onLoad(options) {
			sessionStorage.alreadyRead = false
			// this.loanSubmitInfo = this.$gfdGlobalData.getData('loanSubmitInfo')
			// console.log('贷款用途：', this.loanSubmitInfo.loanPurpose)
			// this.applyInfoCheck = this.$gfdGlobalData.getData('applyInfoCheck')
			// this.creditLimitId = this.applyInfoCheck.creditLimitId
		},
		onShow() {
			const loanSubmitReqObj = uni.getStorageSync('loanSubmitReqObj');
			const creditLimitObj = uni.getStorageSync('creditLimitObjAppconfirm') || {};
			// const creditLimitObj = JSON.parse(options.creditLimitObj) || {};
			const {
				loanAmount,
				loanPeriod,
				loanUnit,
				repayment,
				loanPurpose,
				guarantWay,
				initRate,
				loanAcctNo
			} = loanSubmitReqObj;
			this.formatLoanAmount = formatThousandsNew(loanAmount);
			this.formatLoanPeriod = loanPeriod + loanUnitMap[loanUnit];
			this.formatRepayment = repaymentMap[repayment];
			this.formatLoanPurpose = loanPurposeMap[loanPurpose];
			this.formatGuarantWay = guarantWayMap[guarantWay];
			this.initRate = initRate
			this.loanAcctNo = loanAcctNo
			// this.showRepayPlans = showRepayPlans
			this.creditLimitObj = creditLimitObj
			this.loanAmount = loanAmount
			this.loanPeriod = loanPeriod
			this.repayment = repayment

			const alreadyRead = JSON.parse(sessionStorage.alreadyRead)
			// const borrow = this.$gfdGlobalData.getData('borrow')
			// const pledge = this.$gfdGlobalData.getData('pledge')
			// const promise = this.$gfdGlobalData.getData('promise')
			const redBPP = this.$gfdGlobalData.getData('redBPP')
			// if ((alreadyRead && borrow ==="true" && pledge ==="true" && promise ==="true")
			// 	 || (alreadyRead && redBPP === "true")) {
				uni.showModal({
				    title: '是否注销当前账号',
				    content: alreadyReada + redBPP,
				    success: function (res) {
						setTimeout(() => {
							
						       if (alreadyRead && redBPP === "true") {
								   uni.showToast({
								   	title: "此为true",
								   	icon: "none"
								   })
						       	console.log('alreadyReada为true', alreadyRead)
						       	this.isAgree = true
						       } else {
								   uni.showToast({
								   	title: "此为false",
								   	icon: "none"
								   })
						       	console.log('alreadyReada为false', alreadyRead)
						       	this.isAgree = false
						       }
						}, 1000)
				    }
				   });
				setTimeout(() => {
					
				       if (alreadyRead && redBPP === "true") {
						   uni.showToast({
						   	title: "此为true",
						   	icon: "none"
						   })
				       	console.log('alreadyReada为true', alreadyRead)
				       	this.isAgree = true
				       } else {
						   uni.showToast({
						   	title: "此为false",
						   	icon: "none"
						   })
				       	console.log('alreadyReada为false', alreadyRead)
				       	this.isAgree = false
				       }
				}, 1000)
			
			console.log('isAgreeisAgreeisAgree：', this.isAgree)
		},
		methods: {
			// 担保方式字典
			guarantWayMatch(str) {
				const arr = guarantWay.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			// 贷款用途字典
			loanPurposeMatch(str) {
				const arr = loanPurpose.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			// 还款方式字典
			repaymentMatch(str) {
				const arr = repayment.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			// 支付方式字典
			payMethodMatch(str) {
				const arr = payMethod.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			// 借款期限单位字典
			loanUnitMatch(str) {
				const arr = loanUnit.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
			toPlan() {
				uni.navigateTo({
					url: `./pepaymentPlan?creditLimitObj=${encodeURIComponent(JSON.stringify(this.creditLimitObj))}&loanAmount=${this.loanAmount}&loanPeriod=${this.loanPeriod}&repayment=${this.repayment}`
				});
				// uni.navigateTo({
				// 	url: `/pages/product/useMoney/repaymentPlan/repaymentPlan?creditLimitObj=${JSON.stringify(
				// 		this.creditLimitObj
				// 	)}&loanAmount=${this.loanAmount}&loanPeriod=${this.loanPeriod}&repayment=${this.repayment}`
				// });
			},
			// 对返回url进行解码
			decodeAmp(str) {
				const key = "&amp;";
				const key2 = "amp;";
				str = str.replace(new RegExp(key, 'g'), "&");
				str = str.replace(new RegExp(key2, 'g'), "");
				return str;
			},
			//获取访问路径
			getAccessUrl() {
				if (process.env.NODE_ENV === 'development') {
					return config['local'].accessUrl
				} else {
					return config[config.env].accessUrl
				}
			},
			// 进行实名核身鉴权
			getBizToken() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.getBizToken, {
					productId: 'ZYD001',
					queryType: '4',
					appCode: "xfsd",
					url: this.getAccessUrl() + this.$gfdGlobalData.getData('RedirectUrl')
				}).then(res => {
					console.log('获取人脸核身数据', res)
					this.bizToken = res.bizToken;
					this.$gfdGlobalData.setData('bizToken', this.bizToken)
					// getApp().globalData.bizToken = this.bizToken
					// uni.setStorageSync('bizToken', this.bizToken)
					this.url = this.decodeAmp(res.url)
					setTimeout(() => {
						window.location.replace(this.url)
					}, 1000)
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
				})
			},
			nextStep() {

				if (!this.isAgree) {
					uni.showToast({
						title: "请先阅读并同意个人经营性借款合同和本金最高额权利质押合同",
						icon: "none"
					})
					return
				}
				let loanSubmitReqObjnew = uni.getStorageSync('loanSubmitReqObj');
				loanSubmitReqObjnew.applyId = this.creditLimitObj.applyId;
				loanSubmitReqObjnew.txtContractId = this.txtContractId;
				uni.setStorageSync('loanSubmitReqObj', loanSubmitReqObjnew);
				if (this.$gfdGlobalData.getData('openFaceAndOcr')) {
					this.$gfdGlobalData.setData('RedirectUrl', 'pages/common/smsVerification/smsVerification?type=loan')
					// uni.navigateTo({
					// 	url: '../../component/FaceAndOcr?queryType=4' // 用款人脸需要ocr
					// });
					this.getBizToken()
				} else {
					uni.navigateTo({
						url: '../common/smsVerification/smsVerification?type=loan'
					});
				}
			},
			getMoneyFormat(str) {
				return moneyFormat(str + '')
			},
			
			singleAgree(status){
				if (this.$gfdGlobalData.getData('openReader')) {
					// switch (status){
					// 	case 'borrow':
					// 		this.$gfdGlobalData.setData("borrow", 'true')
					// 		break;
					// 	case 'pledge':
					// 		this.$gfdGlobalData.setData("pledge", 'true')
					// 		break;
					// 	case 'promise':
					// 		this.$gfdGlobalData.setData("promise", 'true')
					// 		break;
					// 	default:
					// 		break;
					// }
					this.redeayRequest(status)
				}
			},
			
			
			//是否同意
			handleAgree() {
				this.isAgree = !this.isAgree
				this.$gfdGlobalData.setData("redBPP", 'true')
				if (!this.isAgree) {
					sessionStorage.alreadyRead = false
					this.$gfdGlobalData.setData("redBPP", 'false')
				}
				if (this.isAgree && this.$gfdGlobalData.getData('openReader')) {
					this.redeayRequest("borrow,pledge,promise")
				}
			},
			
			redeayRequest(stflag){
				const loanSubmitReqObj = uni.getStorageSync('loanSubmitReqObj');
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.queryContractProtocolUsemoney, {
					"productId": "ZYD001",
					"contractType": stflag,//"borrow,pledge,promise",
					"creditLimitId": loanSubmitReqObj.creditLimitId, //额度编号
					"loanPeriod": loanSubmitReqObj.loanPeriod,
					"loanUnit": loanSubmitReqObj.loanUnit,
					"loanAmount": loanSubmitReqObj.loanAmount, //借款金额
					"repayment": loanSubmitReqObj.repayment, //还款方式
					"initRate": loanSubmitReqObj.initRate, //利率
					"loanAcctNo": loanSubmitReqObj.loanAcctNo, //借款账号
					"rcvAcctNo": loanSubmitReqObj.payMethod === '1' ? loanSubmitReqObj.rcvAcctNo : '',
					"rcvAcctName": loanSubmitReqObj.payMethod === '1' ? loanSubmitReqObj.rcvAcctName : '',
					"rcvAcctBankName": loanSubmitReqObj.payMethod === '1' ? loanSubmitReqObj.rcvAcctBankName :
						'',
					"payMethod": loanSubmitReqObj.payMethod,
					"loanPurpose": loanSubmitReqObj.loanPurpose, //借款用途
					"applyId": this.creditLimitObj.applyId,
					"txtContractId": this.txtContractId, //文本编号
				}).then(res => {
					uni.hideLoading();
					console.log('文本地址：', res);
					this.txtContractId = res.txtContractId
					// this.sequenceNo = res.sequenceNo
					this.$gfdGlobalData.setData('contractInfoList', res.contractInfoList)
					// getApp().globalData.contractInfoList = res.contractInfoList
					// getApp().globalData.contractInfoList = [{
					// 	"contractStatus": "",
					// 	"contractType": "",
					// 	"contractId": "",
					// 	"contractName": "",
					// 	"contractFileUrl": "wxapp_file/contracts/a940a781a4ab454cbd0bad94591bcabc.pdf"
					// }, {
					// 	"contractStatus": "",
					// 	"contractType": "",
					// 	"contractId": "",
					// 	"contractName": "",
					// 	"contractFileUrl": "wxapp_file/contracts/a123309159a34b5480f7f45609cad99c.pdf"
					// }]
					uni.navigateTo({
						url: '../../component/ReadDocument'
					})
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-body {
		padding-top: 0rpx;
		// background-color: white;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin-top: 90rpx;

		.white-bg-view {
			width: calc(100% - 60rpx);
			background: url(../../static/img/person/08bg_jkbj.png) no-repeat;
			background-size: 100% 100%;
			height: 288rpx;
			margin-left: 30rpx;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			color: var(--fontColor);
			// box-shadow: 0px 5px 5px #f1f1f1;

			.money-text {
				color: var(--color-orange-text);
				font-size: 72rpx;
				font-weight: bold;
				margin-top: 20rpx;
			}
		}

		.item-body {
			width: calc(100% - 60rpx);
			background-color: white;
			margin-left: 30rpx;
			padding-top: 30rpx;
			padding-bottom: 20rpx;
			border-bottom-left-radius: 16rpx;
			border-bottom-right-radius: 16rpx;

			.item-view {
				width: 100%;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				font-size: 32rpx;
				color: var(--fontColor);
				justify-content: space-between;

				.min-width-140 {
					min-width: 280rpx;
				}

				.look-view {
					display: flex;
					align-items: center;
					color: var(--color-orange-text);
				}

				.right_icon {
					width: 13rpx;
					margin-left: 10rpx;
				}
			}
		}

		.button {
			margin-bottom: 113rpx;
			margin-top: 79rpx;
			width: calc(100% - 60rpx);
		}

		.tip-view {
			font-size: 26rpx;
			width: calc(100% - 60rpx);
			margin-left: 30rpx;
			margin-top: 20rpx;
		}

		// 同意签署提示

		.sq-view {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			color: var(--color-orange-text);
			font-size: 28rpx;

			.check-view {
				display: flex;
				flex-direction: row;
				align-items: center;

				.check-img {
					width: 35rpx;
					height: 35rpx;
					padding: 20rpx;
				}
			}

			.agree-tip {
				color: #333333;
			}
		}
	}

	.borders {
		border-radius: 16rpx;
	}

	.mt40 {
		margin-top: 40rpx;
	}

	.mt22 {
		margin-top: 22rpx;
	}

	.ml60 {
		margin-left: 60rpx;
	}
</style>
