<template>
	<view>
		<view class="home">
			<view class="content">
				<view class="application" v-for="(item,index) in list" :key="index">
					<view class="top">
						<view class="left">
							<img :src="item.img" alt="">
							<span>{{item.title}}</span>
						</view>
						<view class="right">
							<view class="right-context">
								<span>{{item.right1}}</span>
							</view>
							<view class="right-context">
								<span>{{item.right2}}</span>
							</view>
						</view>
					</view>
					<view class="middle">
						<view class="middle-left">
							{{item.content}}
						</view>
						<view class="middle-right">
							<view class="creditApplication" @click="btn(index)">
								<image src="../../static/list_btn.png"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="bottom-content">
						<view>本服务由日照银行股份有限公司提供</view>
						<view>本产品除利息外，不收取任何费用</view>
						<view>客服电话：400-689-6588</view>
					</view>
					<view class="bottom-img">
						<image src="../../static/footer.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						img: require("../../static/list_光伏贷icon.png"),
						title: '光伏贷',
						right1: '期限长',
						right2: '利率低',
						content: '面向信用良好的自然人发放的，利用借款人自有或租赁的建筑，安装分布式光伏发电设施所需款项的贷款。'
					},
					{
						img: require("../../static/list_库容贷icon.png"),
						title: '二手车库容贷',
						right1: '无抵押',
						right2: '放款快',
						content: '面向信用良好的二手车经销商发放的，用于经营二手车所需款项的贷款。'
					},
					{
						img: require("../../static/list_存单质押贷icon.png"),
						title: '存单质押贷',
						right1: '利率低',
						right2: '放款快',
						content: '存单质押贷是指借款人已本人名下我行定期存单质押担保，申请用于个人经营用途的贷款。'
					},
				]
			}
		},
		methods: {
			btn(index) {
				if (index == 0) {
					console.log(1111);
				} else if(index == 1){
					console.log(2222);
				} else {
					uni.switchTab({
						url: '../index/index'
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.home {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: url(../../static/header_banner.png) no-repeat;
		background-size: 100% auto;
		/* background-position: 0rpx -50rpx; */
		/* margin-top: 90rpx; */
	}

	.content {
		padding-top: 280rpx;
	}

	.application {
		background-color: #fff;
		margin-bottom: 24rpx;
		border-radius: 12rpx;
		width: 690rpx;
		height: 365rpx;
	}

	.top {
		display: flex;
		justify-content: space-between;
		padding: 48rpx 30rpx 56rpx 30rpx;
	}

	.left img {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
	}

	.left span {
		color: #333333;
		vertical-align: middle;
		padding-left: 20rpx;
		font-size: 36rpx;
		font-weight: bolder;
	}

	.right {
		display: flex;
		justify-content: space-around;
	}

	.right-context {
		width: 112rpx;
		height: 44rpx;
		background-color: #fff1e8;
		margin-left: 12rpx;
		border-radius: 6rpx;
		line-height: 44rpx
	}

	.right-context span {
		display: block;
		text-align: center;
		font-size: 24rpx;
		color: #ff6619;
	}
	.middle {
		display: flex;
		justify-content: space-between;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 56rpx;
	}
	.middle-right {}
	.creditApplication {}
	.creditApplication image {
		padding-top: 30rpx;
		width: 190rpx;
		height: 99rpx;
	}
	.middle-left {
		color: #666666;
		padding-right: 35rpx;
		line-height: 44rpx;
		font-size: 28rpx;
	}
	.bottom {
		padding-top: 64rpx;
		
	}
	.bottom-content {
		color: #999999;
		font-size: 26rpx;
		text-align: center;
		padding-bottom: 64rpx;
		letter-spacing: 5rpx;
	} 
	.bottom-img {
		text-align: center;
		padding-bottom: 120rpx;
	}
	.bottom-img image {
		width: 200rpx;
		height: 52rpx;
	}
</style>
