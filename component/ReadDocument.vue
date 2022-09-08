<template>
	<view>
		<item-nav-bar title="文档阅读"></item-nav-bar>
		<view class="content">
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	import config from '../config.js';
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				// 要访问的pdf的路径
				fileUrl: '',
				// 最终显示在web-view中的路径
				url: '',
			}
		},
		onLoad(params) {
			// console.log('文本地址：', this.$gfdGlobalData.getData('contractInfoList'));
			this.fileUrl = JSON.stringify({
				contractInfoList: this.$gfdGlobalData.getData('contractInfoList')
			});
			let documentUrl = this.getAccessUrl()
			let url =
				'https://ttt.ebanktest.com.cn:39009/statics/wxapp_file/pdfPageH5/#/pdfPage?docServer=' + documentUrl + '&linkList=' +
				 this.fileUrl + '&buttonText=我已知晓并同意签署&backFlag=back';
			if (!params.noTime) {
				url += '&timer=5'
			}
			this.url = url
		},
		methods: {
			//获取访问路径
			getAccessUrl() {
				if (process.env.NODE_ENV === 'development') {
					return config['local'].documentUrl
				} else {
					return config[config.env].documentUrl
				}
			},
		}
	}
</script>

<style>
	.content {
		padding-top: 30rpx;
		margin-top: 90rpx;
	}
</style>
