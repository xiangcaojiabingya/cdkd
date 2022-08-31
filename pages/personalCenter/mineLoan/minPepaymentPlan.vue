<template>
	<view>
		<item-nav-bar title="提前还款计划"></item-nav-bar>
		<view class="content-body">
			<view class="topbg">
				<view class="head-card">
					<p>剩余借款本金（元）</p>
					<h1>{{formatLoanAmount}}</h1>
					<text class="year-text">最终执行年利率以用款时为准</text>
				</view>
				<view class="content-card">
					<ul>
						<li>
							<p>剩余利息</p>
							<span>{{formatRepayAmount}}</span>
						</li>
						<li>
							<p>年利率</p>
							<span>{{rate + '%'}}</span>
						</li>
						<li>
							<p>期数（期）</p>
							<span>{{afterRepayDetail.length}}</span>
						</li>
					</ul>
				</view>
			</view>
			<view class="content-table">
				<table>
					<tr>
						<th>期数</th>
						<th>还款日期</th>
						<th>还款金额</th>
					</tr>
					<tr v-for="(item,index) in afterRepayDetail" :key="item.currentNum">
						<td>{{item.currentNum}}</td>
						<td>{{item.repayDate}}</td>
						<td>{{'￥' + item.formatRepayAmount}}</td>
					</tr>
				</table>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		moneyFormat,formatThousandsNew
	} from "../../../utils/index.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				afterRepayDetail: [],
				loanInvoiceId: '',
				amount: '',
				rate: '',
				formatRepayAmount: '',
				formatLoanAmount: '',
			}
		},
		onLoad(options) {
			console.log(JSON.stringify(options))
			this.loanInvoiceId = options.loanInvoiceId || ''
			this.amount = options.amount || ''
			this.trialAdvanceRepay()
			console.log(this.loanInvoiceId+"--"+this.amount)
		},
		methods: {
			getMoneyFormat(str) {
				return moneyFormat(str + '')
			},
			trialAdvanceRepay() {
				uni.showLoading({
					title: "加载中...",
				})
				this.$request.postAjax(this.$apiUrl.trialAdvanceRepayAction, {
					loanInvoiceId: this.loanInvoiceId,
					"productId": "ZYD001",
					//需要提前还款页面传
					amount: this.amount,
				}).then(res => {
					console.log(this.loanInvoiceId+"--"+this.amount)
					this.rate = res.rate
					this.formatLoanAmount = formatThousandsNew(res.leftPrincipal)
					this.formatRepayAmount = res.repayInterestSum // 还款总金额
					res.afterRepayDetail.forEach((element) => {
						element.formatRepayAmount = formatThousandsNew(element.leftRepayAmount)
					})
					this.afterRepayDetail = res.afterRepayDetail,
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: white;
	}
	.content-body {
		padding-top: 0px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin-top: 90rpx;
		// background-color: white;
		.topbg{
			// background: url(../../static/img/person/09bg_tc.png) no-repeat;
			// background-size: 100% 100%;
			background: linear-gradient(#EDEDED,#EDEDED,#EDEDED,#EDEDED,#FEFEFE);
			height: 550rpx;
			.head-card {
				// position: absolute;
				// left: 30rpx;
				// top: 20rpx;
				// right: 30rpx;
				// padding: 80rpx 24rpx 24rpx;
				// border-radius: 16rpx;
				// text-align: center;
				// width: calc(100% - 60rpx);
				// background: url(../../static/img/person/08bg_jkbj.png) no-repeat;
				// background-size: 100% 100%;
				
				width: calc(100% - 60rpx);
				background: url(../../../static/img/person/08bg_jkbj.png) no-repeat;
				background-size: 100% 100%;
				height: 338rpx;
				margin-left: 30rpx;
				// margin-top: -180rpx;
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				color: var(--fontColor);
				
				p {
					margin-bottom: 20rpx;
					color: #333333;
				}
			
				h1 {
					color: var(--color-orange-text);
					padding-bottom: 20rpx;
				}
				
				.year-text {
					background-color: #fff7f5;
					color: #ff8a66;
					font-size: 24rpx;
					margin-top: 20rpx;
					padding: 10rpx 24rpx;
				}
				
				
			
				// .warn {
				// 	margin-bottom: 0;
				// 	font-size: 28rpx;
				// 	color: var(--fontColor3);
				// }
			}
		}
		
		.content-card{
			width: calc(100% - 60rpx);
			background-color: white;
			margin-left: 30rpx;
			// padding-top: 30rpx;
			// padding-bottom: 20rpx;
			border-bottom-left-radius: 16rpx;
			border-bottom-right-radius: 16rpx;
			ul {
				padding: 0 44rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			
			li {
				list-style: none;
				text-align: center;
				padding: 20rpx 0 40rpx 0;
			
				p {
					color: #333333;
					margin-bottom: 20rpx;
				}
				
				span{
					font-size: 32rpx;
					color: #d5a45c;
				}
			}
		}

		.content-table {
			// margin-top: 60rpx;
			padding: 0 30rpx 30rpx;
			tr{
				&:nth-child(odd){
					th{
						background-color: #F7F7F7;
					}
					td{
						background-color: #ffffff;//var(--bgColor);
						&:nth-child(1){
							border-radius: 0;
						}
						&:nth-last-child(1){
							border-radius: 0;
						}
					}
					
				}
			}
		}
	}
</style>
