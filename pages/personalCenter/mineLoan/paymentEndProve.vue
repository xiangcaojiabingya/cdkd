<template>
	<!-- 结清证明页面 -->
	<view>
		<item-nav-bar title="结清证明"></item-nav-bar>
		<view class="main-view">
			<!-- <web-view src="http://www.gov.cn/zhengce/pdfFile/1986_PDF.pdf"></web-view> -->
			<image :src="fileUrl"></image>
			<!-- <button type="primary" class="button">保存</button> -->
		</view>
	</view>

</template>

<script>
	import ItemNavBar from "@/component/ItemNavBar.vue"
	import config from "../../../config.js"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				fileUrl: '',
			}
		},
		onLoad() {
			this.fileUrl = config[config.env].documentUrl+getApp().globalData.paymentEndProveUrl
			console.log(this.fileUrl)
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
	.main-view {
		position: absolute;
		top: 80rpx;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	image {
		width: 100%;
		height: 85%;
	}

	.button {
		width: calc(100% - 60rpx);
		z-index: 999;
		position: absolute;
		left: 30rpx;
		bottom: 50rpx;
	}
</style>
