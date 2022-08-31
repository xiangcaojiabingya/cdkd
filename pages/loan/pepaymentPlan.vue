<template>
	<view>
		<item-nav-bar title="还款计划"></item-nav-bar>
		<view class="content-body">
			<view class="topbg">
				<view class="head-card">
					<p>借款本金（元）</p>
					<h1>{{formatRepayPrincipal}}</h1>
					<text class="year-text">最终执行年利率以用款时为准</text>
				</view>
				<view class="content-card">
					<ul>
						<li>
							<p>还款本息合计</p>
							<span>{{formatRepayAmount}}</span>
						</li>
						<li>
							<p>年利率</p>
							<span>{{rate + '%'}}</span>
						</li>
						<li>
							<p>期数（期）</p>
							<span>{{repayNum}}</span>
						</li>
					</ul>
				</view>
			</view>
			<view class="content-table">
				<table>
					<tr>
						<th>期数</th>
						<th>还款日期</th>
						<th>还款本息合计</th>
					</tr>
					<tr v-for="(item,index) in repayPlans" :key="item.currentNum">
						<td>{{item.currentNum}}</td>
						<td>{{item.repayDate}}</td>
						<td>{{'￥' + item.formatRepayAmount}}</td>
					</tr>
				</table>
			</view>
		</view>
		
<!-- 		<view class="content-body">
			<view class="topbg">
				<view class="head-card">
					<p>借款本金（元）</p>
					<h1>fhfgsfa</h1>
					<text class="year-text">最终执行年利率以用款时为准</text>
					
				</view>
				<view class="content-card">
					<ul>
						<li>
							<p>还款总金额</p>
							<span>220000.0</span>
						</li>
						<li>
							<p>年利率</p>
							<span>555%</span>
						</li>
						<li>
							<p>期数（期）</p>
							<span>144</span>
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
					<tr v-for="(item,index) in planInfo.repayPlans" :key="item.id">
						<td>{{item.currentNum}}</td>
						<td>{{item.repayDate}}</td>
						<td>{{'￥' + getMoneyFormat(item.repayAmount)}}</td>
					</tr>
				</table>
			</view>
		</view> -->
	</view>

</template>

<script>
	import {
		moneyFormat,formatThousandsNew
	} from "../../utils/index.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				// planInfo: {},
				// applyInfoCheck: {},
				// loanSubmitInfo: {},
				formatRepayPrincipal: '',
				rate: '',
				repayNum: '',
				formatRepayAmount: '',
				repayPlans: [],
			}
		},
		onLoad(options) {
			const creditLimitObj = JSON.parse(decodeURIComponent(options.creditLimitObj)) || {};
			console.log(creditLimitObj.creditLimitId+"---"+creditLimitObj.rate)
			const loanAmount = options.loanAmount || '';
			const loanPeriod = options.loanPeriod || '';
			const repayment = options.repayment || '';
			console.log(loanAmount+"--"+loanPeriod+"--"+repayment)
			// this.applyInfoCheck = this.$gfdGlobalData.getData('applyInfoCheck')
			// this.loanSubmitInfo = this.$gfdGlobalData.getData('loanSubmitInfo')
			uni.showLoading({
				title: "加载中"
			})
			this.$request.postAjax(this.$apiUrl.loanTrialAction, {
				// creditLimitId: this.applyInfoCheck.creditLimitId,
				// loanPeriod: this.loanSubmitInfo.loanPeriod,
				// loanUnit: '2',//this.loanSubmitInfo.loanUnit,
				// loanAmount: this.loanSubmitInfo.loanAmount,
				// //repayment: '1',
				// repayment: this.loanSubmitInfo.repayment,
				// // repaymentDay: '',
				// initRate: this.applyInfoCheck.rate,
				
				creditLimitId: creditLimitObj.creditLimitId,
				loanPeriod: loanPeriod,
				loanUnit: '2',
				loanAmount: loanAmount,
				repayment: repayment,
				initRate: creditLimitObj.rate
			}).then(res => {
				console.log('还款计划信息：', res);
				// this.planInfo = res
				// const { repayPrincipal, repayAmount, repayNum, repayPlans } = res;
				const formatRepayPrincipal = formatThousandsNew(res.repayPrincipal);
				const formatRepayAmount = formatThousandsNew(res.repayAmount);
				res.repayPlans.forEach((element) => {
					element.formatRepayAmount = formatThousandsNew(element.repayAmount);
				});
				// this.repayPrincipal = formatRepayPrincipal
				// this.repayAmount = formatRepayAmount
				this.repayNum = res.repayNum
				this.repayPlans = res.repayPlans
				this.formatRepayPrincipal = formatRepayPrincipal
				this.formatRepayAmount = formatRepayAmount
				this.rate = creditLimitObj.rate
				uni.hideLoading()
			}).catch(error => {
				console.log(error);
				uni.hideLoading()
			})
		},
		methods: {
			getMoneyFormat(str) {
				return moneyFormat(str + '')
			}
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
				background: url(../../static/img/person/08bg_jkbj.png) no-repeat;
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
