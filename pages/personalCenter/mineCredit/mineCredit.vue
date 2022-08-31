<template>
	<!-- 我的授信页面 -->
	<view>
		<item-nav-bar title="我的额度"></item-nav-bar>
		<view class="content-body circle-body">
			<view class="card-body" v-for="item in list">
				<view class="card-head">
					<!-- <span class="orange-block"></span> -->
					<image class="img-block" src="../../../static/img/cerdit/card_img_titlebar_line.png"></image>
					<span class="card-title">授信申请</span>
					<span class="card-state">{{stateName(item.status)}}</span>
				</view>
				<view class="card-view"></view>
				<view class="card-content">
					<view class="list">
						<span class="list-label">额度编号</span>
						<span class="liat-content">{{item.creditLimitId}}</span>
					</view>
					<!-- <view class="list">
						<span class="list-label">授信额度</span>
						<span class="liat-content">{{item.creditAmount}}</span>
					</view> -->
					<view class="list">
						<span class="list-label">利率</span>
						<span class="liat-content">{{item.rate + '%'}}</span>
					</view>

					<view class="list">
						<span class="list-label">授信时间</span>
						<span class="liat-content">{{item.startTime}}</span>
					</view>
					<view class="list">
						<span class="list-label">用款状态</span>
						<span class="liat-content">{{loanStateName(item.status1)}}</span>
					</view>
				</view>
			</view>
			<view class="warm-tip">
				<view class="reminder">温馨提示：</view>
				<span>1、授信通过的申请，需用款后再新增授信；</span><br />
				<span>2、请您在授信通过的6个月内使用，否则授信失效。</span>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		creditState,
		loanState
	} from '../../utils/dictionary.js'
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				list: [],
				// list: [{
				// 	borrower: '王哈哈',
				// 	number: '1234567890',
				// 	time: '2021-05-05',
				// 	state: '0'
				// }, {
				// 	borrower: '王哈哈',
				// 	number: '1234567890',
				// 	time: '2021-05-05',
				// 	state: '1'
				// }]
			}
		},
		onLoad() {
			// this.getMyCreditList()
		},
		methods: {
			// 授信状态展示
			stateName(obj) {
				if (obj === '1') {
					return "有效"
				} else if (obj === '2') {
					return "失效"
				} else if (obj === '3') {
					return "冻结"
				}
			},
			//获取我的授信列表
			getMyCreditList() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.queryCreditLimitForPvAction, {
					productId: "ZYD001",
					status: ""
				}).then(res => {
					console.log("我的授信列表", JSON.stringify(res));
					this.list = res.creditLimitList
					uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			//用款状态
			loanStateName(str) {
				const arr = loanState.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			}
		}
	}
</script>

<style lang="scss">
	.card-body {
		border-radius: 15rpx;
	}
</style>
