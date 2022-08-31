<template>
	<view>
		<item-nav-bar title="添加还款卡" :st='9'></item-nav-bar>
		<view class="center">
			<view class="circle-body">

			</view>

			<view>
				<!-- <view class="orange-block" v-for="item in cardList"> -->
				<!-- <view class="rate">
						<image src="../../../static/15logo_70.png"></image>
						<span class="first-rate">日照银行</span>
						<span class="second-rate" @click="addCard(item)">变更银行卡</span>
					</view> -->
				<!-- <view class="rate bottom-rate"> -->
				<!-- <span>{{cardNum(item.cardNum)}}</span> -->
				<!-- <span>{{cardNum(item.repayAcctNo)}}</span> -->
				<!-- <span class='st-top'>****</span> -->
				<!-- <span class='st-top'>****</span> -->
				<!-- <span>{{card(item.repayAcctNo)}}</span> -->
				<!-- <span>{{card(item.cardNum)}}</span> -->
				<!-- </view> -->
				<!-- </view> -->
				<!-- <view> -->
				<!-- </view> -->
				<view class="center-list-item" @click="addCard(item)" v-for="item in cardList">
					<view class="list_line">
						<span class='card-style'>{{item.loanInvoiceId}}</span>
						<span class='card-style-year'>{{item.productName}}</span><span class='card-style-year'>{{item.subAcctNo}}</span><span  class='card-style-money'>{{formatThousandsNew(item.loanAmt)}}元</span>
						
					</view>
					<uni-icons class="right_icons" type="arrowright" size="15" color="#B8B8B8"></uni-icons>
				</view>
			</view>
		</view>
		<view class="warm-tip" v-if="cardList.length == 0">
			<image class="img-block-er" src="@/static/img/cerdit/empty-zqd.png"></image>

			<span>暂无相关记录</span>
		</view>
	</view>


</template>

<script>
	import ItemLine from "@/component/ItemLine.vue"
	import ItemNavBar from "@/component/ItemNavBar.vue"

	import config from '../../../config.js';
	export default {
		components: {
			ItemLine,
			ItemNavBar
		},
		data() {
			return {
				cardList: [],
				// loanInvoiceId:'',
				// {'repayAcctNo':'555'},{'repayAcctNo':'555'}
				// repayAcctNo:'',

				RedirectUrl: '',
				url: '',
				bizToken: '',

			}
		},
		onLoad() {

		},
		onShow() {
			this.getCardList()
		},
		methods: {

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

			//添加二类卡
			addCard(e) {
				
				const loanInvoiceId = e.loanInvoiceId
				const repayAcctNo = e.repayAcctNo
				const info = {
					loanInvoiceId: loanInvoiceId,
					repayAcctNo: repayAcctNo
				};
				uni.setStorageSync('info', info)
				console.log('卡列表信息：', e);
				// uni.navigateTo({
				// 	url: `./addBankCard?loanInvoiceId=${loanInvoiceId}&repayAcctNo=${repayAcctNo}`
				// })
				if (getApp().globalData.openFaceAndOcr) {
					getApp().globalData.RedirectUrl = 'pages/personalCenter/cardManage/addBankCard'
					// uni.navigateTo({
					// 	url: '../../../component/FaceAndOcr?queryType=4'
					// });
					this.getBizToken()
				} else {
					uni.navigateTo({
						// url: "./addCardResult?result=success",
						url: `./addBankCard`

					})
				}

				// else {
				// 	uni.showModal({
				// 		title: "提示",
				// 		content: "请先进行授信！",
				// 		showCancel: false,
				// 		confirmText: "确定"
				// 	})
			},
			openCard() {
				uni.showToast({
					title: '开通二类卡',
					icon: "none"
				});
			},
			formatThousandsNew(num, decimal = 2) {
				if(num){
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
			//获取银行卡列表
			getCardList() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.queryLoanListAction, {
					productNo: "ZYD001"
				}).then(res => {
					console.log('卡列表信息：', res);
					this.cardList = res.loanReceiptList,
						uni.hideLoading()
				}).catch(error => {
					console.log(error);
					uni.hideLoading()
				})
			},
			//银行卡隐藏中间八位并间隔显示
			cardNum(obj) {
				var reg = /^(\d{4})\d+(\d{4})$/;
				var num = obj.replace(reg, "$1");
				return num
			},
			card(obj2) {
				var reg = /^(\d{4})\d+(\d{4})$/;
				var num = obj2.replace(reg, "$2");
				return num
			}
		}
	}
</script>

<style scoped lang="scss">
	.img-block-er {
		margin: auto;
		margin-top: 150rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		width: 300rpx;
		height: 200rpx;
	}

	.warm-tip {
		text-align: center;

	}

	.center {
		margin-top: 80rpx;
		margin-left: 23rpx;
		margin-right: 23rpx;
	}
    .card-style{
		margin-bottom: 30rpx;
	display: block;
	height:30rpx;
	}
	.card-style-year{
		margin-right: 50rpx;
	}
	.card-style-money{
		color: red;
	}
	/* 行 */
	.center-list-item {
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding-left: 20rpx;
		font-size: 27rpx;
		line-height: 124rpx;
		margin-bottom: 20rpx;
		// border: ;
		border-radius: 20rpx;
	}

	/* 左侧部分 */
	.list_line image {
		/* float: left;*/
		vertical-align: middle;
		margin-left: 20rpx;
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		margin-bottom: 8rpx;
	}

	.list_line {
		// margin-top: 10rpx;
		// line-height: 124rpx;
		width: 248rpx;
		// height: 124rpx;
		text-align: left;

	}

	.right_icons {
		margin-top: 10rpx;
		margin-right: 20rpx;
	}

	.liat-content {
		margin-left: 40rpx;
		color: red;
	}

	.list_line {
		min-width: 600rpx;
	}


	/deep/ .uni-icons {
		vertical-align: sub;
		margin-right: 8rpx;
	}

	.warm-tip {
		text-align: center;
		margin: 0 0 23rpx;
	}

	.tip-text {
		margin-left: 0;
		margin-right: 0;
		color: #999999;

	}

	.write-block {
		background-color: white;
		padding: 52rpx;
		width: 100%;
		box-sizing: border-box;
		border-radius: 10rpx;
		text-align: center;
		color: var(--color-orange-text);
		margin-top: 20rpx;

		+.write-block {
			margin-top: 30rpx;
			padding: 60rpx;
		}
	}

	.add-image {
		width: 36rpx;
		height: 36rpx;
		margin-bottom: 4rpx;
		vertical-align: middle;
	}

	.button-title {
		margin-left: 19rpx;
		color: #ff6619;
	}

	/deep/ .uni-icons {
		vertical-align: sub;
		margin-right: 8rpx;
	}

	/deep/ .st-top {
		// z-index: 9;
		margin-top: 15rpx;
	}

	.orange-block {
		// background-image: linear-gradient(to right, var(--color-orange-text), var(--color-orange4-text));
		background: url(../../../static/img/person/15bg_yhk.png) no-repeat;
		background-size: cover;
		padding: 40rpx 50rpx;
		text-align: center;
		// height: 200rpx;
		// height: 100%;
		border-radius: 14rpx;
		color: var(--white);
		margin-top: 20rpx;

		.rate {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0;
			font-size: 38rpx;
			margin-left: 30rpx;

			image {
				width: 74rpx;
				height: 74rpx;
				vertical-align: middle;
			}

			.first-rate {
				font-size: 32rpx;
				padding-right: 180rpx;
				// font-weight: bold;
			}

			.second-rate {
				font-size: 28rpx;
				line-height: 48rpx;
				width: 160rpx;
				border: 1rpx solid rgba(255, 255, 255, 0);
				background-color: rgba(255, 255, 255, 0);
			}

			&.bottom-rate {
				margin: 40rpx 30rpx;
				font-size: 38rpx;
				font-weight: bold;
				color: var(--white);

				// margin: 20rpx 150rpx 0 150rpx;
				// height: 80rpx;
				// font-size: 32rpx;
				// // font-weight: bold;
				// color: var(--white);
				// text-align: center;
				// justify-content: space-around;
				// border: 1rpx solid #FFFFFF;
				// line-height: 45rpx;
			}
		}
	}
</style>
