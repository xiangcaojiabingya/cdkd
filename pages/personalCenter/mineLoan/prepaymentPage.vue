<template>
	<!-- 提前还款 -->
	<view>
		
	
	<item-nav-bar title="我的贷款"></item-nav-bar>
	<view class="content-pre">
		<view class="principal">
			<view class="first-view">还款本金（元）</view>
			<view class="principal-input">
				<label>￥</label><input class="right-num" placeholder-class="right-num-ph" type="text" :disabled="inputDisable" :focus="inputFocue" v-model="formatAmount" placeholder="请输入还款本金" @blur="completeInput" />
				<image @click="editAmount" src="../../../static/img/edit-zqd.png" mode=""></image>
			</view>
			
		</view>
		<view class="message">
			<view class="payment-info">
				<span class="left-text">还款利息</span>
				<span>{{'￥'+formatRepayInterest}}</span>
			</view>
			<view class="payment-info">
				<span class="left-text">还款金额(总计)</span>
				<span class="">{{'￥'+formatRepayAmount}}</span>
			</view>
			<view class="payment-info">
				<span class="left-text">还款方式</span>
				<span>{{formatRepayment}}</span>
			</view>
			<view class="payment-info">
				<span class="left-text">还款计划(剩余应还)</span>
				<span @click="paymentPlan()">
					<!-- <text class="click-text">{{firstRepayDate?'下次' + firstRepayDate + '，':''}}应还￥{{formatFirstRepayAmount}}</text> -->
					<text class="click-text">￥{{formatFirstRepayAmount}}</text>
					<uni-icons class="right_icons" type="arrowright" size="15"></uni-icons>
				</span>
			</view>
			<view class="payment-info">
				<view class="zf" @click="isShouTuoClick('1')">
					<image v-if="isShouTuo" class="check-img" src="../../../static/img/select_icon.png">
					</image>
					<image v-else class="check-img" src="../../../static/img/unselect_icon.png">
					</image>
					<span>账户还款</span>
				</view>
				<view class="stzf" @click="isShouTuoClick('2')">
					<image v-if="unShouTuo" class="check-img" src="../../../static/img/select_icon.png">
					</image>
					<image v-else class="check-img" src="../../../static/img/unselect_icon.png">
					</image>
					<span>存单还款</span>
				</view>
			</view>
			<view class="payment-info" v-if="repaymentStatus === '2'">
				<span class="left-text">{{formatDepositName}}</span>
				<span class="">{{formatAcctBal + '元'}}</span>
			</view>
			<view class="payment-info">
				<span class="left-text">还款账户</span>
				<span class="">{{repayAcctNo}}</span>
				<!-- <span>{{cardNum(allLoanList.repayAcctNo)}}</span> -->
			</view>

		</view>

		<view class="prompt">
			<view class="col-gray1">温馨提示：</view>
			<view class="col-gray2">请确保您的还款账户余额不少于还款金额（总计）</view>
			<view class="col-gray2">存单还款时会提前结清所有贷款剩余本息</view>
			<view class="col-gray2">如变更还款卡号，请前往【我的】-【银行卡管理】</view>
		</view>
		<view>
			<button class="payment-btn" @click="next">提前还款</button>
		</view>
	</view>
	</view>
</template>

<script>
	import { formatThousandsNew,isNumber} from '../../../utils/index.js'
	import { repaymentMap } from '../../../common/projectFormConfig.js'
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				principal: '',
				prepaymentPlan: {}, //提前还款
				afterRepayDetail: {}, //还款之后的期次明细
				allLoanList: {}, //还款方式、还款账号
				isShouTuo: true,
				unShouTuo: false,
				rcvAcctCardBelong: '',
				
				inputFocue: false,
				inputDisable: true,
				repaymentStatus: '1',
				repayAcctNo: '',
				formatAmount: '',
				amount: '',
				firstRepayAmount: '',
				firstRepayDate: '',
				formatRepayInterest: '', // 还款利息
				formatRepayAmount : '', //还款总金额
				formatFirstRepayAmount: '',
				leftPrincipal: '',
				formatAcctBal: '',
				formatRepayment: '',
				formatDepositName: '',
			}
		},
		onLoad() {
			this.prepaymentPlan = getApp().globalData.prepaymentPage
			
			this.repayAcctNo = this.prepaymentPlan.repayAcctNo
			this.formatAmount = formatThousandsNew(this.prepaymentPlan.loanBalance)
			this.amount = this.prepaymentPlan.loanBalance
			console.log(this.repayAcctNo+"--------"+this.formatAmount+"----"+this.amount+"---"+this.prepaymentPlan.loanInvoiceId)
			this.queryLoanDetailAction()
			// this.allLoanList = getApp().globalData.allLoanList;
			this.trialAdvanceRepay();
		},
		methods: {
			editAmount() {
				if (this.repaymentStatus === '2') {
					uni.showToast({
						title: "存单还款时不允许改变还款本金",
						icon: "none"
					})
					return
				}
				// this.leftPrincipal
				if (Number(this.leftPrincipal) < 10000) {
					uni.showToast({
						title: "剩余本金小于10000元，需全部结清",
						icon: "none"
					})
					return
				}
				setTimeout(() => {
					this.inputFocue = true
				},100)
				this.inputDisable = false
			},
			completeInput(event) {
				let amount = event.detail.value.replace(',', '')
				if (!isNumber(amount)) {
					uni.showToast({
						title: "还款金额格式有误",
						icon: "none"
					})
					this.amount = ''
					this.formatAmount = ''
					return
				}
				if (Number(amount) > Number(this.prepaymentPlan.loanBalance)) {
					uni.showToast({
						title: "还款本金不能大于借据借款余额",
						icon: "none"
					})
					return
				}
				if (Number(amount) < 0.01) {
					uni.showToast({
						title: "还款本金最小金额为0.01元",
						icon: "none"
					})
					return
				}
				let formatAmount = formatThousandsNew(amount)
				this.amount = amount
				this.formatAmount = formatAmount
				this.trialAdvanceRepay()
			},
			
			isShouTuoClick(values) {
				if (values === '2') {
					this.isShouTuo = false;
					this.unShouTuo = true
					uni.showToast({
						title: "存单还未到期，利率以活期计算",
						icon: "none"
					})
					this.inputDisable = true
					this.inputFocue = false
				} else {
					this.isShouTuo = true;
					this.unShouTuo = false
					this.trialAdvanceRepay()
					this.inputDisable = false
					this.inputFocue = true
				}
				this.repaymentStatus = values
				console.log(this.repaymentStatus)
				this.amount = this.prepaymentPlan.loanBalance
				this.formatAmount = formatThousandsNew(this.prepaymentPlan.loanBalance)
				
			},
			
			cardNum(obj) {
				var reg = /^(\d{4})\d+(\d{4})$/;
				var num = obj.replace(reg, "$1 **** **** $2");
				return num
			},
			paymentPlan() {
				// getApp().globalData.planList = this.prepaymentPlan
				// 	getApp().globalData.afterRepayDetail = this.afterRepayDetail
				// 	uni.navigateTo({
				// 		url: "./prepaymentPlan",
				// 	})
				uni.navigateTo({
					url: `./minPepaymentPlan?loanInvoiceId=${this.prepaymentPlan.loanInvoiceId}&amount=${this.amount}`
					// ${encodeURIComponent(JSON.stringify(item))}
					// url: `../../../pepaymentPlan?creditLimitObj=${encodeURIComponent(JSON.stringify(this.creditLimitObj))}&loanAmount=${this.principal}&loanPeriod=${this.loanPeriod}&repayment=${this.repayment}`
				});
			},
			next() {
				if (!this.formatAmount) {
					uni.showToast({
						title: "请输入还款金额",
						icon: "none"
					})
					return false
				} 
				// 	amount=${this.data
				// .amount}&loanInvoiceId=${this.data.loanInvoiceId}&repaymentStatus=${this.data.repaymentStatus}`
				var parms = {
					amount: this.amount,
					loanInvoiceId: this.prepaymentPlan.loanInvoiceId,
					repaymentStatus: this.repaymentStatus
				}
				if(this.repaymentStatus == '2'){
					uni.showModal({
						title: '当前使用存单还款，将结清该笔借款，是否确认',
						content: this.acctNo,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.setStorageSync("minsPeaymentPlan", parms)
								uni.navigateTo({
									url: "../../common/smsVerification/smsVerification?type=minPeaymentPlan",
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}else{
					uni.setStorageSync("minsPeaymentPlan", parms)
					uni.navigateTo({
						url: "../../common/smsVerification/smsVerification?type=minPeaymentPlan",
					})
				}
				// uni.setStorageSync("minsPeaymentPlan", parms)
				// uni.navigateTo({
				// 	url: "../../common/smsVerification/smsVerification?type=minPeaymentPlan",
				// })
				
			},
			trialAdvanceRepay() {
				uni.showLoading({
					title: "加载中...",
				})
				this.$request.postAjax(this.$apiUrl.trialAdvanceRepayAction, {
					loanInvoiceId: this.prepaymentPlan.loanInvoiceId,
					//需要提前还款页面传
					amount: this.amount//this.prepaymentPlan.loanBalance,
				}).then(res => {
					this.firstRepayAmount = res.firstRepayAmount
					this.firstRepayDate = res.firstRepayDate
					this.formatRepayInterest = formatThousandsNew(res.repayInterest) // 还款利息
					this.formatRepayAmount = formatThousandsNew(res.repayAmount) // 还款总金额
					this.formatFirstRepayAmount = formatThousandsNew(res.repayAmountSum) // 首次还款金额
					// this.afterRepayDetail = res.afterRepayDetail,
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			queryLoanDetailAction() {
				uni.showLoading({
					title: "加载中...",
				})
				this.$request.postAjax(this.$apiUrl.queryLoanDetailAction, {
					loanInvoiceId: this.prepaymentPlan.loanInvoiceId,
				}).then(res => {
					this.leftPrincipal = res.leftPrincipal
					this.formatAcctBal = formatThousandsNew(res.acctBal)
					this.formatRepayment = repaymentMap[res.repayMethod]
					this.formatDepositName = `${res.productName}    ${res.subAcctNo}`
					// this.afterRepayDetail = res.afterRepayDetail,
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			}
			
		}
	}
</script>

<style lang="less">
	.content-pre {
		margin-top: 100rpx;
	}

	.principal {
		font-size: 32rpx;
		text-align: center;
		background-color: #FFFFFF;
		margin: 20rpx;
		border-radius: 15rpx;
		padding: 0 40rpx;
	}

	.first-view {
		text-align: left;
		padding: 48rpx 0 60rpx 0;
		color: #666666;
	}
	.principal-input{
		display: flex;
		image{
			width: 40rpx;height: 40rpx;margin-top: 17rpx;margin-left: 10rpx;
		}
	}

	.principal input {
		font-size: 50rpx;
		text-align: left;
		padding-bottom: 70rpx;
	}

	.principal label {
		float: left;
		font-size: 36rpx;
		padding-top: 15rpx;
		padding-right: 20rpx;
	}

	.message {
		margin: 20rpx;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		padding: 23rpx 0;
	}

	.payment-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 20rpx;
	}

	.left-text {
		color: #666666;
	}

	.right-num {
		color: #FF661A;
		width: 80%;
	}
	.right-num-ph{
		color: #cccccc;
	}

	.click-text {
		color: #ababab;
	}

	.payment-num {
		margin: 20rpx;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		line-height: 88rpx;
		display: flex;
		justify-content: space-between;
	}

	.prompt {
		font-size: 26rpx;
		padding: 0 30rpx;
		margin-top: 40rpx;
		line-height: 40rpx;
		margin-bottom: 87rpx;
	}

	.col-gray1 {
		color: #666666;
	}

	.col-gray2 {
		color: #999999;
	}

	.payment-btn {
		background-color: #FF661A;
		border-radius: 50rpx;
		color: #FFFFFF;
		width: 70%;
	}
	
	.loan-detail {
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 20rpx;
		
	}

	.zf {
		display: flex;
		padding-left: 100rpx;
	}
	
	.zf image,
	.stzf image {
		width: 40rpx;
		height: 40rpx;
		padding-right: 8rpx;
	}
	
	.stzf {
		display: flex;
		padding-right: 100rpx;
	}
	
</style>
