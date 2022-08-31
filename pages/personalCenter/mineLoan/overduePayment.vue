<template>
	<!-- 逾期还款页面 -->
	<view>
		<item-nav-bar title="逾期还款"></item-nav-bar>
		<view class="content-body">
			<view class="top-view">
				<view class="je-text">本次实还总金额（元）</view>
				<view class="money-view">
					<text style="float: left; font-size: 35rpx;  padding-top: 15rpx;">￥</text>
					<input placeholder="请输入还款金额" placeholder-class="placeholderClass" type="text"
						:disabled="this.inputDisabled" :focus="this.inputFocus" @blur="completeInput"
						v-model="formatAmount" />
					<image src="../../../static/img/edit-zqd.png" mode="widthFix" class="money-img" @click="editAmount">
					</image>
				</view>
				<view class="tip-view">
					<!-- <uni-icons type="info" size="22"></uni-icons> -->
					<view class="tip-title">逾期会影响您的个人信用记录，请及时还款</view>
				</view>
			</view>
			<!-- <view class="line-view"></view> -->
			<view class="content-view">
				<!-- 数组：overdueList -->
				<view v-for="(item,index) in list" :class="index!=list.length-1?'card-view botBorder':'card-view'">
					<view class="second-view">
						<view class="left">
							<text style="color: #666666;">还款日:</text>
							<text style="padding-left: 15rpx;">{{item.repayDate}}</text>
						</view>
						<view class="right">
							<text class="current">第{{item.currentNum}}期</text>
							<text class="stat">已逾期</text>
						</view>
					</view>
					<view class="item-view">
						<view class="left-view">
							<view class="textWidth">逾期本金</view>
							<!-- 逾期本金：overduePrincipal -->
							<!-- <text>{{'￥'+ item.repayAmount}}</text> -->
							<text>{{'￥'+ item.overduePrincipal}}</text>
							<!-- <text >{{'￥'+ item.overduePrincipal}}</text> -->
						</view>
						<!-- 当前期次：currentNum -->
						<!-- <text >第2期</text> -->
						<!-- <text >{{item.currentNum}}</text> -->
					</view>
				</view>
			</view>
			<!-- <view class="line-view"></view> -->
			<view class="bottom-view">
				<!-- <view class="last">
					<text>逾期本金</text>
				
					<text style="color: #FF661A;">￥123.00</text>
				
				</view> -->
				<view class="last">
					<text>逾期利息（总计）</text>
					<!-- 逾期金额：overdueAmount  overduceAmtTemp 需要确定 -->
					<text style="color: #FF661A;">{{'￥'+ this.overdueInterest}}</text>
					<!-- <text style="color: #FF661A;">{{'￥'+this.overduceAmtTemp}}</text> -->
				</view>
				<view class="last">
					<text>罚息复利（总计）</text>
					<!-- 逾期金额：overdueAmount  overduceAmtTemp 需要确定 -->
					<text style="color: #FF661A;">{{'￥'+ this.leftRepayInterestFee}}</text>
					<!-- <text style="color: #FF661A;">{{'￥'+this.overduceAmtTemp}}</text> -->
				</view>
				<view class="last">
					<text>逾期金额（总计）</text>
					<!-- 逾期金额：overdueAmount  overduceAmtTemp 需要确定 -->
					<text style="color: #FF661A;">{{'￥'+ this.formatOverdueAmount}}</text>
					<!-- <text style="color: #FF661A;">{{'￥'+this.overduceAmtTemp}}</text> -->
				</view>
				<view class="last">
					<text>还款方式</text>
					<!-- 逾期金额：overdueAmount  overduceAmtTemp 需要确定 -->
					<text style="color: #FF661A;">{{this.repayMethod}}</text>
					<!-- <text style="color: #FF661A;">{{'￥'+this.overduceAmtTemp}}</text> -->
				</view>
				<view class="loan-detail">

					<view class="change">
						<view class="zf" @click="zzzf">
							<image v-if="isAgree" class="check-img" src="@/static/img/select_icon.png">
							</image>
							<image v-else class="check-img" src="@/static/img/unselect_icon.png">
							</image>
							<span>银行卡还款</span>
						</view>
						<view class="stzf" @click="stzf">
							<image v-if="isAgree2" class="check-img" src="@/static/img/select_icon.png">
							</image>
							<image v-else class="check-img" src="@/static/img/unselect_icon.png">
							</image>
							<span>存单还款</span>
						</view>
					</view>
				</view>
				<view class="last" v-if="isAgree2">
					<text>{{this.productName}}</text>
					<text>{{this.subAcctNo}}</text>
					<!-- 逾期金额：overdueAmount  overduceAmtTemp 需要确定 -->
					<text style="color: #FF661A;">{{this.acctBal}}元</text>
					<!-- <text style="color: #FF661A;">{{'￥'+this.overduceAmtTemp}}</text> -->
				</view>
				<view class="last">
					<text>还款卡号</text>
					<!-- 需要从借据列表页传值 还款账号 repayAcctNo -->
					<text>{{this.repayAcctNo}}</text>
				</view>
			</view>


			<view class="horizontal-view-st">
				<!-- <image src="@/static/img/cerdit/spot.png"mode="widthFix"></image> -->
				<text>选择存单还款时将结清本笔贷款，当剩余存单金额低于该产品</text>
			</view>
			<view class="horizontal-view-info">
				<!-- <image src="@/static/img/cerdit/spot.png"mode="widthFix"></image> -->
				<text>起存金额时，剩余存单金额将全部转为活期存款。</text>
			</view>
			<view class="horizontal-view-info">
				<!-- <image src="@/static/img/cerdit/spot.png"mode="widthFix"></image> -->
				<text>如需变更还款卡号，请前往【我的】-【银行卡管理】。</text>
			</view>
			<button type="primary" class="button" @click="toNext()">逾期还款</button>
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
				list: [],
				loanInvoiceId: '',
				amount: '',
				formatAmount: '',
				formatOverdueAmount: '',
				repayAcctNo: '',
				repayAmount: '', //输入还款金额
				overdueAmount: '',
				leftRepayInterestFee: '', //罚息
				overduceAmtTemp: '10',
				overdueInterest: '', //逾期利息
				repayMethod: '', //
				productName: '',
				subAcctNo: '',
				repaymentStatus: '1',
				inputDisabled: true,
				inputFocus: false,
				acctBal: '',
				isAgree: true,
				isAgree2: false,
			}
		},
		onLoad(st) {
			// this.overdueAmount = '4455.55'
			console.log('999999999', JSON.stringify(st))
			this.repayAcctNo = st.repayAcctNo
			this.loanInvoiceId = st.loanInvoiceId
			this.getOverdueDetail();

		},
		methods: {
			// 获取逾期详情
			getOverdueDetail() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.overdueDescAction, {
					loanInvoiceId: this.loanInvoiceId
				}).then(res => {
					this.list = res.overdueList;
					this.overdueAmount = res.overdueAmount;
					this.overduceAmtTemp = res.overduceAmtTemp;
					this.overdueInterest = res.overdueInterest;
					this.leftRepayInterestFee = res.leftRepayInterestFee;
					this.productName = res.productName;
					this.subAcctNo = res.subAcctNo
					this.acctBal = res.acctBal
					this.formatOverdueAmount = this.formatThousandsNew(this.overdueAmount)
					this.formatAmount = this.formatOverdueAmount
					this.amount = res.overdueAmount
					console.log('用户信息：', res);
					uni.hideLoading()
				}).catch(error => {
					console.log('vvvvvv', error);
					uni.hideLoading()
				})
			},
			editAmount() {
				if (this.isAgree2 == true) {
					uni.showToast({
						title: "存单还款时不允许改变还款本金",
						icon: "none"
					})
					this.inputDisabled = true,
						this.inputFocus = false
					return
				} else {
					// this.inputFocus=true,
					setTimeout(() => {
						this.inputFocus = true;
					}, 100)

					this.inputDisabled = false
				}
			},
			formatThousandsNew(num, decimal = 2) {
				if (num) {
					num = num.toString();
					let index = num.indexOf('.');
					if (index !== -1) {
						num = num.substring(0, decimal + index + 1);
					} else {
						num = num.substring(0);
					}
					let str = parseFloat(num).toFixed(decimal);
					const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
					return str.replace(reg, '$1,');
				}
				return num
			},
			isNumber(number = '') {
				var reg = /^\d+(\.\d+)?$/;
				if (reg.test(number)) {
					return true;
				} else {
					return false;
				}
			},
			// cardNum(obj) {
			// 	var reg = /^(\d{4})\d+(\d{4})$/;
			// 	var num = obj.replace(reg, "$1");
			// 	return num
			// },
			// card(obj2) {
			// 	var reg = /^(\d{4})\d+(\d{4})$/;
			// 	var num = obj2.replace(reg, "$2");
			// 	return num
			// }
			zzzf() {
				this.repaymentStatus = '1'
				this.isAgree = true;
				this.isAgree2 = false
			},
			stzf() {
				uni.showToast({
					title: "存单还未到期，利率以活期计算",
					icon: "none"
				})
				this.isAgree2 = true;
				this.isAgree = false;
				this.inputDisabled = true,
					this.inputFocus = false
				this.formatAmount = this.formatOverdueAmount
				this.repaymentStatus = '2'
			},
			completeInput(event) {

				let amount = event.detail.value.replace(',', '')
				console.log('1111111111', amount)
				if (!this.isNumber(amount)) {
					uni.showToast({
						title: "还款金额格式有误",
						icon: "none"
					})
					console.log('222222222')
					this.amount = ''
					this.formatAmount = ''
					return
				}
				if (Number(amount) > Number(this.overdueAmount)) {
					uni.showToast({
						title: "还款本金不能大于借据借款余额",
						icon: "none"
					})
					console.log('33333333333')
					return
				}
				//
				if (Number(amount) < 0.01) {
					uni.showToast({
						title: "还款本金最小金额为0.01元",
						icon: "none"
					})
					console.log('44444')
					return
				}
				//
				let formatAmount = this.formatThousandsNew(amount)
				this.amount = amount
				this.formatAmount = formatAmount
			},

			toNext() {
				if (!this.formatAmount) {
					uni.showToast({
						title: "请输入还款金额",
						icon: "none"
					})
					return false
				}
				var parms = {
					amount: this.amount,
					loanInvoiceId: this.loanInvoiceId,
					repaymentStatus: this.repaymentStatus
				}
				console.log('5555', JSON.stringify(parms))
				if(this.isAgree2 == true){
					uni.showModal({
						title: '当前使用存单还款，将结清该笔借款，是否确认',
						content: this.acctNo,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.setStorageSync("overduePayment", parms)
								uni.navigateTo({
									// url: "../../common/smsVerification/smsVerification?type=overduePayment",
									url: `../../common/smsVerification/smsVerification?type=overduePayment`
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}else{
					uni.setStorageSync("overduePayment", parms)
					uni.navigateTo({
						// url: "../../common/smsVerification/smsVerification?type=overduePayment",
						url: `../../common/smsVerification/smsVerification?type=overduePayment`
					})
				}
		

			}
		}
	}
</script>

<style scoped lang="scss">
	.content-body {

		// background-color: var(--white);
		// color: var(--color-orange-text);
		+.content-body {
			margin-top: 20rpx;
		}

		.top-view {
			// width: 100%;
			height: 300rpx;
			margin: 20rpx 20rpx 20rpx 20rpx;
			border-radius: 15rpx;
			background-color: #FFFFFF;
			padding-left: 40rpx;

			.je-text {
				font-size: 35rpx;
				text-align: left;
				width: 100%;
				padding-top: 50rpx;
				color: #666666;
			}

			.money-view {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 60rpx;

				input {
					font-size: 48rpx;
					text-align: left;
					// min-width: 300rpx;
				}
			}

			.tip-view {
				background-color: #fff7f5;
				padding-left: 30rpx;
				width: 515rpx;
				height: 42rpx;
				margin-top: 20rpx;
				margin-bottom: 30rpx;

				.tip-title {
					font-size: 25rpx;
					line-height: 42rpx;
					color: #FF8A66
				}
			}
		}

		.money-img {
			margin-right: 100rpx;
			width: 50rpx;
		}

		.second-view {
			display: flex;
			justify-content: space-between;
			font-size: 25rpx;
			text-align: center;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #e6e6e6;

			.current {
				padding-right: 20rpx;
				color: #ababab;
			}

			.stat {
				padding: 0 20rpx;
				color: #fd5956;
				background-color: #ffe4e1;
			}
		}

		.content-view {

			.botBorder {
				// border-bottom: 1rpx solid #e5e5e5;
			}

			.card-view {
				margin: 20rpx;
				border-radius: 15rpx;
				background-color: #FFFFFF;
				padding: 30rpx 0rpx 30rpx 20rpx;

				.item-view {
					width: 100%;
					padding: 24rpx 0;
					font-size: 33rpx;

					.left-view {
						display: flex;
						justify-content: space-between;
						padding-right: 20rpx;
					}

					.textWidth {
						min-width: 170rpx;
						color: #666666;
					}
				}
			}
		}

		.loan-detail {
			padding-top: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-bottom: 40rpx;
		}

		.bottom-view {
			// width: 100%;
			margin: 20rpx;
			border-radius: 15rpx;
			background-color: #FFFFFF;
			padding: 30rpx 0rpx 30rpx 20rpx;

			.last {
				display: flex;
				justify-content: space-between;
				padding: 25rpx 0;
				margin-right: 20rpx;
			}
		}

		.bot-tip-view {
			// color: #c2c2c2;
			// // display: flex;
			// // align-items: center;
			// // justify-content: center;
			font-size: 24rpx;
			padding: 0 30rpx;
			margin-top: 40rpx;
			line-height: 40rpx;

			.btom-tip {
				color: #666666;
			}

			.col-gray {
				color: #999999;
			}
		}

		.placeholderClass {

			color: #cccccc;
		}

		.button {
			margin-left: 30rpx;
			width: calc(100% - 60rpx);
			margin-bottom: 50rpx;
			background-image: url();
			background-size: cover;
		}

		.zf {
			display: flex;
		}

		.zf image,
		.stzf image {
			width: 40rpx;
			height: 40rpx;
			padding-right: 16rpx;
		}

		.stzf {
			display: flex;
			padding-left: 80rpx;
		}

		.change {
			display: flex;
			// flex-direction: column;
			justify-content: center;
		}

		.horizontal-view-st {
			margin: 30rpx 10rpx 0 30rpx;
			display: flex;
			align-items: center;

			text {
				font-size: 28rpx;
				margin-top: 30rpx;
				color: #808080;
				width: 100%;
			}

			image {
				width: 10rpx;
				margin: 30rpx 10rpx 0 30rpx;
			}
		}

		.horizontal-view-info {
			margin: 0 10rpx 0 30rpx;
			display: flex;
			display: flex;
			align-items: center;

			text {
				// margin-left: 50rpx;
				font-size: 28rpx;
				// margin-top: 30rpx;
				color: #808080;
				width: 100%;
			}

			image {
				width: 10rpx;
				margin: 0rpx 10rpx 0 30rpx;
			}
		}
	}
</style>
