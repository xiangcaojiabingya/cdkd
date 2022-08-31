<template>
	<!-- 我的授权页面 -->
	<view>
		<item-nav-bar title="我的授权"></item-nav-bar>
		<view class="content-body circle-body">
			<view class="card-body" v-for="item in list">
				<view class="card-head">
					<!-- <span class="orange-block"></span> -->
					<image class="img-block" src="../../../static/img/cerdit/card_img_titlebar_line.png"></image>
					<span class="card-title">{{applyTypeName(item.applyType)}}</span>
					<span class="card-state">{{stateName(item.applyState)}}</span>
				</view>
				<view class="card-view"></view>
				<view class="card-content">
					<view class="list">
						<span class="list-label">产品名称</span>
						<span class="liat-content">光伏贷</span>
					</view>
					<view class="list">
						<span class="list-label">申请人</span>
						<span class="liat-content">{{item.applyName}}</span>
					</view>

					<view class="list">
						<span class="list-label">申请时间</span>
						<span class="liat-content">{{dealTime(item.applyTime)}}</span>
					</view>
					<view v-if="item.applyState==='00'">
						<button class="button" type="primary"
							@tap="handleCreditAuthorization(item)">立即提交</button>
					</view>
				</view>
			</view>
			<view class="warm-tip">
				<view class="reminder">温馨提示：</view>
				<span>如您自申请时间24小时内未完成授权，待授权申请将自动失效。</span>
			</view>
		</view>
		<!-- <view>
			<button @click="handleCreditAuthorization">授信授权</button>
			<button @click="handleWithMonAuthorization">用款授权</button>
		</view> -->
	</view>

</template>

<script>
	import {
		creditState
	} from '../../utils/dictionary.js'
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {},
		onShow() {
			this.getGrantList()
		},
		methods: {
			getGrantList() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.grantListForPvAction, {
					productId: "ZYD001"
				}).then(res => {
					uni.hideLoading();
					console.log('授权列表数据：', res);
					this.list = res.agreeList
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			//授信授权
			handleCreditAuthorization({applyType, applyNo, grantId}) {
				if (applyType === '1') {
					if (this.$gfdGlobalData.getData('openFaceAndOcr')) {
						this.$gfdGlobalData.setData('RedirectUrl', 'pages/personalCenter/mineAuthorization/creditAuthorizationApplay?applyType=' + applyType +
							'&applyNo=' + applyNo + '&grantId=' + grantId)
						uni.navigateTo({
							url: '../../../component/FaceAndOcr?queryType=3'
						});
					} else {
						uni.navigateTo({
							url: "./creditAuthorizationApplay?applyType=" + applyType + "&applyNo=" + applyNo +
								"&grantId=" + grantId
						})
					}
				} else {
					this.handleWithMonAuthorization({applyType, applyNo, grantId})
				}

			},
			//用款授权
			handleWithMonAuthorization({applyType, applyNo, grantId}) {
				if (this.$gfdGlobalData.getData('openFaceAndOcr')) {
					this.$gfdGlobalData.setData('RedirectUrl', 'pages/personalCenter/mineAuthorization/loanAuthorizationApplay?applyType=' + applyType +
						'&applyNo=' + applyNo + '&grantId=' + grantId)
					uni.navigateTo({
						url: '../../../component/FaceAndOcr?queryType=3'
					});
				} else {
					uni.navigateTo({
						url: "./loanAuthorizationApplay?applyType=" + applyType + "&applyNo=" + applyNo +
							"&grantId=" + grantId
					})
				}

			},
			// 授信状态展示
			stateName(obj) {
				if (obj === '00') {
					return "待授权"
				} else if (obj === '01') {
					return "已授权"
				} else if (obj === '02') {
					return "已失效"
				} else if (obj === '99') {
					return "拒绝授权"
				}

			},
			//授权种类
			applyTypeName(obj) {
				if (obj === '1') {
					return "授信授权"
				} else if (obj === '2') {
					return "用款授权"
				}
			},
			//处理申请时间格式
			dealTime(obj) {
				if (obj) {
					return obj.slice(0, 4) + "-" + obj.slice(4, 6) + "-" + obj.slice(6, 8) + " " + obj.slice(8, 10) + ":" +
						obj
						.slice(10, 12) + ":" + obj.slice(12, 14)
				} else {
					return ""
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.card-body {
		border-radius: 15rpx;
	}
</style>
