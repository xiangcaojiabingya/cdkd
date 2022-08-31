<template>
	<!-- 授信申请页面 -->
	<view>
		<item-nav-bar title="授信申请" :st='3'></item-nav-bar>
		<view class="content-body">
			<view class="card-body button-sp-area" @click="addApply">
				<image src="../../static/img/cerdit/icon_addkey.png"></image>
				<span class="button-title">新增申请</span>
			</view>
			<view class="circle-body">
				<view class="card-body" v-for="item in list">
					<view class="card-head">
						<image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image>
						<!-- <span class="orange-block"></span> -->
						<span class="card-title">授信申请</span>
						<span class="liat-right" :style="{color:stateColr(item.status)}">{{ stateName(item.status) }}</span>
						<!-- <span class="card-state" :style="{color:stateColr(item)}">{{stateName(item)}}</span> -->
					</view>
					<view class="card-view"></view>
					<view class="card-content">
						<view class="list">
							<span class="list-label">申请时间</span>
							<span class="liat-content">{{formatDateNew(item.applyTime)}}</span>

						</view>
						<view class="list">
							<span class="list-label">申请编号</span>
							<span class="liat-content">{{ item.applyId }}</span>
						</view>
						<view class="list">
							<span class="list-label">借款人</span>
							<span class="liat-content">{{ item.userName }}</span>
						</view>
						<!--  -->
						<view v-if="item.applyState === '02'">
							<button class="button" type="primary" @tap="submit(item.applyNo)">
								立即提交
							</button>
						</view>
						<view v-if="item.applyState === '01'">
							<button class="button disabled" type="primary"></button>
							<view class="tip-text">*您的申请需配偶授权后方可提交</view>
						</view>
					</view>
				</view>
				<view class="warm-tip" v-if="list.length == 0">
					<image class="img-block-er" src="../../static/img/cerdit/empty-zqd.png"></image>

					<span>暂无相关记录</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		creditState
	} from "../utils/dictionary.js";
	import {
		postAjax,
		getAjax
	} from "../../request/api.js";
	import apiUrl from "../../request/url.js";
	import {
		creditApplyStateList
	} from "../../common/projectFormConfig.js"
	import ItemNavBar from "../../component/ItemNavBar.vue";
	import config from '../../config.js';
	export default {
		components: {
			ItemNavBar,
		},
		data() {
			return {
				list: [],
				
				RedirectUrl: '',
				url: '',
				bizToken: '',
				// list: [{ applyTime: "20030919", stateName: "未通过" }],
			};
		},
		onShow() {
			uni.showLoading({
				title: "加载中"
			})
			postAjax(apiUrl.queryOrderListForPvAction, {
				"productId": "ZYD001",
				"queryState": "00",
			}).then(res => {
				console.log('我的数据：', res)
				// this.list = res.dataList.reverse();
				this.list = res.dataList
				uni.hideLoading();
			}).catch(error => {
				console.log(error);
				uni.hideLoading();
			})
		},
		methods: {
			// getFormatDate(str) {
			// 	return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2)
			// },
			// 授信状态展示
			stateName(obj) {
				switch (obj) {
					case '01':
						return "预授信";
						break;
					case '02':
						return "授信审批中";
						break;
					case '03':
						return "授信通过";
						break;
					case '04':
						return "授信拒绝";
						break;
					case '05':
						return "补件";
						break;
					case '06':
						return "重申";
						break;
					case '07':
						return "授信失效";
						break;
					case '00':
						return "初始化";
						break;
					default:
						break;
				}
			},
			// 授信状态颜色
			stateColr(obj) {
				// const arr = creditState.filter((item) => item.state === obj.status)
				switch (obj) {
					case '00':
						return "#1bc820";
						break;
					case '01':
						return "#1bc820";
						break;
					case '02':
						return "#1bc820";
						break;
					case '03':
						return "#1bc820";
						break;
					case '04':
						return "#ff6619";
						break;
					case '05':
						return "#1bc820";
						break;
					case '06':
						return "#1bc820";
						break;
					case '07':
						return "#ff6619";
						break;
					default:
						return "#ff6619";
						break;
				}
			},
			formatDateNew(date) {
				return (
					date.slice(0, 4) +
					'-' +
					date.slice(4, 6) +
					'-' +
					date.slice(6, 8) +
					' ' +
					date.slice(8, 10) +
					':' +
					date.slice(10, 12) +
					':' +
					date.slice(12, 14)
				);
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
					queryType: '3',
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
			addApply() {
				if (this.$gfdGlobalData.getData("openFaceAndOcr")) {
					this.$gfdGlobalData.setData(
						"RedirectUrl",
						"pages/credit/queryDeposits"
					);
					this.getBizToken()
					// uni.navigateTo({
					// 	url: "../../component/FaceAndOcr?queryType=3",
					// });
				} else {
					uni.navigateTo({
						url: "./queryDeposits",
					});
				}
			},
			//立即提交申请
			submit(applyNo) {
				uni.showModal({
					content: "您确定要提交申请吗？",
					confirmText: "确定",
					cancelText: "取消",
					success: (res) => {
						console.log(applyNo);
						if (res.confirm) {
							// 授信再授权后的提交，去掉人脸
							// if (getApp().globalData.openFaceAndOcr) {
							// 	getApp().globalData.RedirectUrl =
							// 		`pages/common/smsVerification/smsVerification?type=creditAtlast&applyNo=${applyNo}`
							// 	uni.navigateTo({
							// 		url: '../../component/FaceAndOcr?queryType=4'
							// 	});
							// } else {
							uni.navigateTo({
								url: `../common/smsVerification/smsVerification?type=creditAtlast&applyNo=${applyNo}`,
							});
							// }
						} else if (res.cancel) {
							console.log("用户点击取消");
						}
					},
				});
			},
		},
		computed: {},
	};
</script>

<style lang="scss">
	.card-body {
		border-radius: 15rpx;
	}

	.button-sp-area {
		height: 114rpx;
		// line-height: 114rpx;
		text-align: center;
		border-radius: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-title {
		vertical-align: middle;
		font-size: 38rpx;
		text-align: center;
		align-items: center;
	}

	.button.disabled {
		background: url(../../static/img/card_btn_submit_disabled.png) no-repeat;
		background-size: 100% auto;
		height: 92rpx;
	}

	.liat-right {
		color: #15d0b3;
		position: absolute;
		right: 50rpx;
	}

	// .button{
	// 	width: calc(100% - 60rpx);
	// 	border-radius: 50rpx;
	// }

	uni-image {
		width: 36rpx;
		height: 36rpx;
		vertical-align: middle;
	}

	.tip-text {
		text-align: center;
		color: var(--fontColor3);
		margin-bottom: 20rpx;
	}

	.img-block-er {
		margin: auto;
		margin-top: 80rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		width: 300rpx;
		height: 200rpx;
	}

	.warm-tip {
		text-align: center;
	}
</style>
</style>
