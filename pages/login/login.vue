<template>
	<view>
		<item-nav-bar title="登录"></item-nav-bar>
		<view class="content-body">

			<h3>你好,<br>欢迎登录存单快贷产品</h3>
			<view class="row-view">
				<input placeholder="请输入手机号" v-model="phone" maxlength="11" type='tel' />
				<!-- <button plain="true" type="primary" size="mini" class="button">获取手机号</button> -->
			</view>


			<view class="row-view mt40">
				<input placeholder="图形验证码" v-model="ImageCaptchaCode" maxlength="4" autocapitalize="on" type='text' />
				<image @click="getPicCode()" mode="widthFix" style="width: 180rpx;" :src="ImageCaptcha"></image>
			</view>

			<view class="row-view mt40">
				<input placeholder="短信验证码" v-model="phoneMsgCode" maxlength="6" type='number' />
				<button class="button big-radius" plain="true" type="primary" size="mini"
					@click="getMsgCode()">{{codeText}}</button>
			</view>

			<button class="uni-button" type="primary" @click="login">立即登录</button>
			<p @click="register">立即注册</p>
		</view>
	</view>

</template>

<script>
	import {
		GetKey
	} from "../../common/js/AESCryptoJS.js"
	import {
		postAjax,
		getAjax
	} from "../../request/api.js"
	import apiUrl from "../../request/url.js"
	import config from "../../config.js"
	import {
		checkMobile
	} from "../../utils/index.js"
	import ItemNavBar from "../../component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				codeText: "发送验证码",
				phone: getApp().globalData.phone || uni.getStorageSync("phone") || "", //手机号
				ImageCaptcha: "", //图形验证码base64
				ImageCaptchaCode: "", //图形验证码
				imageChkUniqCode: "", //图形验证码标识
				phoneMsgCode: "", //短信验证码
				msgChkUniqCode: "", //短信验证码标识
				isGetMsgCode: false //是否获取过短信验证码
			}
		},
		onShow() {
			var aesKey = GetKey()
			this.$gfdGlobalData.setData('aesKey', aesKey)
			this.getToken()
			this.phone = getApp().globalData.phone || uni.getStorageSync("phone") || ""
		},
		methods: {
			//获取中台Token
			getToken() {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.getAjax(this.$apiUrl.getToken, {
					grant_type: config[config.env].grant_type,
					client_id: config[config.env].chnlCode,
					client_secret: config[config.env].client_secret
				}).then(res => {
					console.log('我的数据：', res);
					getApp().globalData.token = res.access_token
					uni.setStorageSync("token", res.access_token)
					this.getPicCode()
					uni.hideLoading();
				}).catch(error => {
					console.log(error)
					uni.hideLoading();
				})
			},
			valid({
				phone,
				ImageCaptchaCode,
				phoneMsgCode
			}) {
				if (phone) {
					if (!this.phone) {
						uni.showToast({
							title: "请输入手机号",
							icon: "none"
						})
						return false
					}
					if (!checkMobile(this.phone)) {
						uni.showToast({
							title: "手机号格式不正确",
							icon: "none"
						})
						return false
					}
				}

				if (ImageCaptchaCode) {
					if (!this.ImageCaptchaCode) {
						uni.showToast({
							title: "请输入图形验证码",
							icon: "none"
						})
						return false
					}
				}

				if (phoneMsgCode) {
					if (!this.phoneMsgCode) {
						uni.showToast({
							title: "请输入短信验证码",
							icon: "none"
						})
						return false
					}
					if (this.phoneMsgCode && this.phoneMsgCode.length < 6) {
						uni.showToast({
							title: "请输入6位短信验证码",
							icon: "none"
						})
						return false
					}
				}
				return true
			},
			//获取图形验证码
			getPicCode() {
				uni.showLoading({
					title: "加载中"
				})
				postAjax(apiUrl.getPicCodeUrl, {
					length: "4"
				}).then(res => {
					this.imageChkUniqCode = res.imageChkUniqCode
					this.ImageCaptcha = "data:image/png;base64," + res.ImageCaptcha
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},
			//获取短信验证码
			getMsgCode() {
				const validResult = this.valid({
					phone: true,
					ImageCaptchaCode: true
				});
				if (!validResult) {
					return;
				}
				if (this.codeText != '发送验证码') {
					return
				}
				uni.showLoading({
					title: "加载中"
				})
				postAjax(apiUrl.getMsgCodeUrl, {
					"phone": this.phone,
					"tmpCode": "ZYD0011",
					"imageChkUniqCode": this.imageChkUniqCode,
					"ImageCaptchaCode": this.ImageCaptchaCode

				}).then(res => {
					this.isGetMsgCode = true
					let time = getApp().globalData.countdownTime
					var inter = setInterval(() => {
						time--
						this.codeText = time + "s后重新获取"
						if (time <= 0) {
							this.codeText = "发送验证码"
							clearInterval(inter)
						}
					}, 1000)
					console.log(res);
					uni.showToast({
						title: "发送验证码成功",
						icon: "none"
					})
					this.msgChkUniqCode = res.msgChkUniqCode
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					this.ImageCaptchaCode = ""
					this.getPicCode()
					uni.hideLoading();
				})
			},
			login() {
				if (!this.isGetMsgCode) {
					uni.showToast({
						title: "请先获取短信验证码",
						icon: "none"
					})
					return
				}
				const validResult = this.valid({
					phone: true,
					ImageCaptchaCode: true,
					phoneMsgCode: true
				});
				console.log(validResult)
				if (!validResult) {
					return;
				}
				uni.showLoading({
					title: "加载中"
				})
				postAjax(apiUrl.loginUrl, {
					"productId": "GFD001",
					"accessChannelNo": "00",
					"phone": this.phone,
					"msgChkUniqCode": this.msgChkUniqCode,
					"phoneMsgCode": this.phoneMsgCode

				}).then(res => {
					console.log(res);
					//登录成功后将手机号保存到缓存中
					getApp().globalData.phone = res.userPhone
					uni.setStorageSync("phone", res.userPhone)
					uni.switchTab({
						url: '../index/index'
					});
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},
			register() {
				uni.navigateTo({
					url: './register'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: white;
	}

	.content-body {
		padding: 100rpx 60rpx;

		h3 {
			font-size: 40rpx;
			margin-bottom: 100rpx;
		}

		.row-view {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #e6e6e6;
			// margin-top: 40rpx;
		}

		.button {
			border-color: var(--color-orange-text);
			color: var(--color-orange-text);
			font-size: 24rpx;
			max-width: 250rpx;
			margin-top: 0;
			margin-right: 0;
		}

		.uni-button {
			background-color: var(--color-orange-text);
			margin-top: 80rpx;
		}
	}

	uni-input {
		display: inline-block;
	}

	input {
		padding: 0 24rpx;
		margin: 24rpx 0;
	}

	p {
		text-align: right;
		color: var(--color-orange3-text);
		margin-top: 10rpx;
	}

	.mt40 {
		margin-top: 40rpx;
	}
</style>
