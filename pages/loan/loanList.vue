<template>
	<view>
		<item-nav-bar title="用款申请" :st='7'></item-nav-bar>
		<view class="content-body circle-body">
			<view class="prompt">
				每一笔存单快贷额度只能进行一次用款，用款后可用借款额度为0，不可再次发起用款，用款时请合理录入用款金额
			</view>
			<view class="card-body" v-for="item in applyList" :key="item.creditLimitId">
				<view class="card-content">
					<view class="list">
						<span class="list-label">主账号</span>
						<span class="liat-content">{{item.acctCode}}</span>
					</view>
					<view class="list">
						<span class="list-label">子账号</span>
						<span class="liat-content">{{item.subAcctNo}}</span>
					</view>
					<view class="list">
						<span class="list-label">存单金额</span>
						<span class="liat-content">{{item.formatOpenAmt}}元</span>
					</view>
					<view class="list">
						<span class="list-label">申请时间</span>
						<span class="liat-content">{{item.startTime}}</span>
					</view>
					<view class="list" v-if="item.status1 === '1' || item.status1 === '3'">
						<span class="list-label">可用借款金额</span>
						<span class="liat-content">{{item.formatAvailableCreditAmount}}元</span>
					</view>
					<view class="list">
						<span class="list-label">利率</span>
						<span class="liat-content">{{item.rate}}%</span>
					</view>
					<view class="list">
						<span class="list-label">到期日期</span>
						<span class="liat-content">{{item.endTime}}</span>
					</view>
					<view class="list">
						<span class="list-label">状态</span>
						<span class="liat-content" v-if="item.status1 === '1'">未用款</span>
						<span class="liat-content" v-if="item.status1 === '2'">已用款</span>
						<span class="liat-content" v-if="item.status1 === '3'">用款审批中</span>
					</view>
					<view v-if="item.status1 === '1'">
						<button class="button" type="primary" @tap="toggle(item)">用款申请</button>
					</view>
				</view>
			</view>
			<view class="warm-tip" v-if="applyList.length == 0">
			  <image
			    class="img-block-er"
			    src="../../static/img/cerdit/empty-zqd.png"
			  ></image>
			
			  <span>暂无相关记录</span>
			</view>
			<!-- <view class="card-body" v-for="item in applyList" :key="item.id">
				<view class="card-content">
					<view class="list">
						<span class="list-label">额度编号</span>
						<span class="liat-content">{{item.creditLimitId}}</span>
					</view>
					<view class="list" v-if="(item.status1 === '4' || item.status1 === '9' || item.status1 === '10') && item.creditAmount != ''">
						<span class="list-label">借款本金</span>
						<span class="liat-content">{{item.creditAmount}}</span>
					</view>
					<view class="list">
						<span class="list-label">额度到期日</span>
						<span class="liat-content">{{item.endTime}}</span>
					</view>
					<view class="list">
						<span class="list-label">状态</span>
						<span class="liat-content">{{loanStateMatch(item.status1)}}</span>
					</view>
					<view v-if="item.loanStatus === '1'">
						<button class="button" type="primary" @tap="toggle(item)">用款申请</button>
					</view>
					<view v-else-if="item.loanStatus === '3'">
						<button class="button" type="primary" @tap="submit(item)">用款提交</button>
					</view>
				</view>
			</view> -->
			<!-- <view class="popup">
				<uni-popup ref="popup" background-color="#fff">
					<view class="popup-content">
						<view class="close" @click="close">
							<uni-icons type="closeempty" size="24" color="#c1c1c1"></uni-icons>
						</view>
						<h4>请您选择电站</h4>
						<p>您可以点击选择单个或多个电站</p>
						<scroll-view class="checkbox-content" scroll-y="true">
							<view :class="{ checked: item.checked, 'g-checkbox': true }"
								v-for="item in powerStationList" :key="item.plantNo" @click="choosePS(item)">
								<view class="checked-icon-content" v-if="item.checked">
									<view class="checked-icon"></view>
									<uni-icons type="checkmarkempty" size="13" color="#fff"></uni-icons>
								</view>
								<ul class="clearfix">
									<li>
										<p>{{item.plantNo}}</p>
										<span>电站编号</span>
									</li>
									<li>
										<p>{{item.plantScale}}</p>
										<span>电站容量（KW/h）</span>
									</li>
									<li>
										<p>{{item.totalAmount}}</p>
										<span>贷款金额（元）</span>
									</li>
								</ul>
							</view>
						</scroll-view>
						<view>
							<button class="button long" type="primary" @click="toLoan()">确定</button>
						</view>
					</view>
				</uni-popup>
			</view> -->
		</view>
	</view>

</template>

<script>
	import {
		loanState
	} from '../utils/dictionary.js'
	import {
		formatThousandsNew
	} from "../../utils/index.js"
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				applyList: [],
				applyInfoCheck: {},
				powerStationList: [{
					id: '1',
					plantNo: 'ZGluZ3l1bm5h1',
					creditNum: '',
					plantScale: '50',
					totalAmount: '100000',
					checked: false,
				}, {
					id: '2',
					plantNo: 'ZGluZ3l1bm5h2',
					creditNum: '',
					plantScale: '50',
					totalAmount: '100000',
					checked: true,
				}, {
					id: '3',
					plantNo: 'ZGluZ3l1bm5h3',
					creditNum: '',
					plantScale: '50',
					totalAmount: '100000',
					checked: false,
				}, {
					id: '4',
					plantNo: 'ZGluZ3l1bm5h4',
					creditNum: '',
					plantScale: '50',
					totalAmount: '100000',
					checked: false,
				}],
				rcvAcctName: '',
				rcvAcctNo: '',
				cnapsCode: '',
				cnapsName: '',
				pawneeName: '',
			}
		},
		onLoad() {
			this.queryCreditLimitAction();
			
		},
		onShow() {
			// this.getListData()
		},
		methods: {
			// 授信列表查询
			queryCreditLimitAction() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.getQueryCreditLimitAction, {
					"productId": "ZYD001",
					status: "1"
				}).then(res => {
					console.log('授信列表：', JSON.stringify(res))
					this.applyList = res.creditLimitList
					this.applyList.forEach((element) => {
						element.formatOpenAmt = formatThousandsNew(element.openAmt);
						element.formatAvailableCreditAmount = formatThousandsNew(element.availableCreditAmount);
					});
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					// uni.hideLoading();
				})
			},
			toggle(item){
				console.log(item)
				if (this.applyList.length > 1 && item.creditLimitId === '') {
					uni.showToast({
						title:"请点击选择对应的授信额度",
						icon: 'none'
					})
					return;
				}
				if (item.status === '99') {
					uni.showToast({
						title:"本业务仅可用款一次，请勿重复用款！",
						icon: 'none'
					})
					return;
				}
				uni.setStorageSync('creditLimitObjItem',item)
				// uni.navigateTo({
				// 	url: `./loanApply?creditLimitObj=${encodeURIComponent(JSON.stringify(item))}`
				// })
				uni.navigateTo({
					url: `./loanApply`
				})
			},
			//===============================================
			//获取授信列表数据
			getListData() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.queryCreditLimitForPvAction, {
					"productId": "ZYD001",
					status: "1"
				}).then(res => {
					console.log('授信列表：', res)
					this.applyList = res.creditLimitList;
					// uni.hideLoading();
				}).catch(error => {
					console.log(error);
					// uni.hideLoading();
				})
			},
			// 点击去借款，弹出选择电站
			toggle2(item) {
				this.applyInfoCheck = item

				//之前为了测试放款加的
				// getApp().globalData.creditLimitId = item.creditLimitId
				// this.rcvAcctName = "日照银行"
				// this.rcvAcctNo = "810000101421000781"
				// this.$refs.popup.open('bottom')

				// 大象接口不通的情况下暂时写死数据，隐藏接口
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.queryPowerForPvAction, {
					"productId": "ZYD001",
					"creditLimitId": item.creditLimitId,
				}).then(res => {
					//额度编号全局保存时为了查看借款合同时需要
					this.$gfdGlobalData.setData('creditLimitId', item.creditLimitId)
					// getApp().globalData.creditLimitId = item.creditLimitId
					console.log('电站数据：', JSON.stringify(res))
					this.powerStationList = res.powerStaList;
					this.rcvAcctName = res.rcvAcctName
					this.rcvAcctNo = res.rcvAcctNo
					this.cnapsCode = res.cnapsCode
					this.cnapsName = res.cnapsName
					this.pawneeName = res.pawneeName
					// uni.hideLoading();
					this.$refs.popup.open('bottom')
				}).catch(error => {
					console.log(error);
					// uni.hideLoading();
				})
			},
			//提交
			submit(item) {
				this.$gfdGlobalData.setData('applyInfoCheck', item)
				// getApp().globalData.applyInfoCheck = item
				uni.showModal({
					content: "您确定要提交申请吗？",
					confirmText: "确定",
					cancelText: "取消",
					success: (res) => {
						if (res.confirm) {
							// 用款在授权后的提交，去掉人脸
							// if (getApp().globalData.openFaceAndOcr) {
							// 	getApp().globalData.RedirectUrl =
							// 		`pages/common/smsVerification/smsVerification?type=loanAtlast`
							// 	uni.navigateTo({
							// 		url: '../../component/FaceAndOcr?queryType=4'
							// 	});
							// } else {
								uni.navigateTo({
									url: `../common/smsVerification/smsVerification?type=loanAtlast`
								})
							// }
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			// 关闭选择电站弹出框
			close() {
				this.$refs.popup.close()
			},
			//选择电站
			choosePS(item) {
				let list = this.powerStationList;
				for (let i = 0; i < list.length; i++) {
					if (list[i].plantNo === item.plantNo) {
						this.$set(list[i], 'checked', !list[i].checked)
					}
				}

			},
			// 选择完电站点击完成
			toLoan() {
				const list = this.powerStationList.filter((item) => item.checked)
				if (!list.length) {
					uni.showModal({
						title: "提示",
						content: '请选择至少一个电站！',
						showCancel: false,
						confirmText: "确定"
					})
				} else {
					this.$gfdGlobalData.setData('powerListCheck', list)
					this.$gfdGlobalData.setData('rcvAcctInfo', {
						rcvAcctName: this.rcvAcctName,
						rcvAcctNo: this.rcvAcctNo,
						cnapsCode: this.cnapsCode,
						cnapsName: this.cnapsName,
						pawneeName: this.pawneeName,
					})
					this.$gfdGlobalData.setData('applyInfoCheck', this.applyInfoCheck)
					// getApp().globalData.powerListCheck = list
					// getApp().globalData.rcvAcctInfo = {
					// 	rcvAcctName: this.rcvAcctName,
					// 	rcvAcctNo: this.rcvAcctNo,
					// 	cnapsCode: this.cnapsCode,
					// 	cnapsName: this.cnapsName,
					// 	pawneeName: this.pawneeName,
					// }
					// getApp().globalData.applyInfoCheck = this.applyInfoCheck
					this.close()
					uni.navigateTo({
						url: './applyForPay'
					});
				}
			},
			loanStateMatch(str) {
				const arr = loanState.filter((item) => item.state === str)
				return arr[0] ? arr[0].name : '';
			},
		}
	}
</script>

<style scoped lang="scss">
	.card-body {
		margin-top: 15rpx;
		border-radius: 15rpx;
	}

	.list .list-label {
		width: 200rpx;
	}

	/deep/ .popup {
		uni-view[name=content],
		.uni-popup__wrapper {
			border-radius: 30rpx 30rpx 0 0;
		}

		.button {
			margin-right: 0;
			margin-left: 0;
			width: 100%;
		}

		.close {
			position: absolute;
			right: 30rpx;
			top: 60rpx;
		}
	}

	.popup-content {
		padding: 60rpx 30rpx;
		position: relative;
	}

	.checkbox-content {
		max-height: 650rpx;
		overflow: auto;
	}

	.g-checkbox {
		position: relative;
		background-color: var(--bgColor);
		border: 1px solid var(--bgColor);
		border-radius: 16rpx;
		margin-bottom: 20rpx;

		ul {
			padding: 0 24rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}

		li {
			list-style: none;
			text-align: center;
			padding: 56rpx 0;

			p {
				color: #333;
				margin-bottom: 30rpx;
			}

			span {
				font-size: 28rpx;
				color: #999;
			}
		}

		&.checked {
			border-color: var(--color-orange-text);
			background-color: #fff;

			.checked-icon-content {
				position: absolute;
				right: -1px;
				top: -1px;
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
				overflow: hidden;
			}

			.checked-icon {
				position: absolute;
				width: 100%;
				height: 100%;
				background: var(--color-orange-text);
				transform: rotate(45deg);
				top: -32rpx;
				left: 32rpx;
			}

			.uni-icons {
				position: absolute;
				top: 4rpx;
				right: 4rpx;
			}
			
		}
		
	}
	.img-block-er {
	  margin: auto;
	  margin-top: 80rpx;
	  width: 500rpx;
	  height: 300rpx;
	}
	.warm-tip {
	  text-align: center;
	  display: flex;
	  flex-direction: column;
	}
	.prompt{
		font-size: 27rpx;
		color: #CCAA00;
		background-color: #FFF9DB;
		text-align: left;
		line-height: 47rpx;
		padding-left: 27rpx;
		padding-top: 11rpx;
		padding-bottom: 11rpx;
	}
</style>
