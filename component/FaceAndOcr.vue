<template>
	<view>
		<!-- <iframe :src="url"/> -->
	</view>
</template>

<script>
	import config from '../config.js';
	export default {
		data() {
			return {
				RedirectUrl: '',
				url: '',
				bizToken: ''
			}
		},
		onLoad() {
			console.log('全局变量', this.$gfdGlobalData.getData('RedirectUrl'))
			this.getBizToken()
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
					queryType: this.options.queryType,
					appCode: "xfsd",
					url: this.getAccessUrl() + this.$gfdGlobalData.getData('RedirectUrl')
				}).then(res => {
					uni.hideLoading();
					console.log('获取人脸核身数据', res)
					this.bizToken = res.bizToken;
					this.$gfdGlobalData.setData('bizToken', this.bizToken)
					// getApp().globalData.bizToken = this.bizToken
					// uni.setStorageSync('bizToken', this.bizToken)
					this.url = this.decodeAmp(res.url)
					setTimeout(() => {
						window.location.replace(this.url)
					}, 1000)

				}).catch(error => {
					console.log(error);
				})
			}

		}
	}
</script>

<style>
</style>
