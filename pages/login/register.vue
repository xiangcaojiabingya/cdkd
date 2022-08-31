<template>
	<view>
		<item-nav-bar title="注册"></item-nav-bar>
		<view class="content-body">
			<h3>你好,<br>欢迎注册存单快贷产品</h3>
			<view class="row-view">
				<input placeholder="请输入手机号" v-model="phone" maxlength="11" type='tel' />
				<!-- <button plain="true" type="primary" size="mini" class="button">获取手机号</button> -->
			</view>
			<view class="row-view mt40">
				<input placeholder="图形验证码" v-model="ImageCaptchaCode" maxlength="4" autocapitalize="on" />
				<image @click="getPicCode()" mode="widthFix" style="width: 180rpx;" :src="ImageCaptcha"></image>
			</view>

			<view class="row-view mt40">
				<input placeholder="短信验证码" v-model="phoneMsgCode" maxlength="6" type='number' />
				<button class="button big-radius" plain="true" type="primary" size="mini"
					@click="getMsgCode()">{{codeText}}</button>
			</view>
			<view class="sq-view">
				<view class="check-view">
					<view class="check-view" @click="handleAgree">
						<!-- 两种方式都是可以的，但是src直接使用三元运算符时，需要使用require引入图片 -->
						<image class="check-img"
							:src="isAgree?require('../../static/img/cerdit/form_icon_agree.png'):require('../../static/img/cerdit/form_icon_disagree.png')">
						</image>
						<!-- <image v-if="isAgree" class="check-img" src="../../static/img/select_icon.png">
						</image>
						<image v-else class="check-img" src="../../static/img/unselect_icon.png">
						</image> -->
						<text class="agree-tip">我已阅读并同意</text>
					</view>
					<view>《注册协议》</view>
					<view>《隐私协议》</view>
				</view>
			</view>

			<button class="uni-button" type="primary" @click="handleRegist">立即注册</button>
		</view>
	</view>

</template>

<script>
	import {
		postAjax,
		getAjax
	} from "../../request/api.js"
	import apiUrl from "../../request/url.js"
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
				isAgree: false,
				imageChkUniqCode: "",
				ImageCaptcha: "",
				ImageCaptchaCode: "",
				phone: "",
				msgChkUniqCode: "",
				phoneMsgCode: "",
				isGetMsgCode: false //是否获取过短信验证码
			}
		},
		onLoad() {
			sessionStorage.alreadyRead = false
			this.getPicCode()
		},
		onShow() {
			const alreadyRead = JSON.parse(sessionStorage.alreadyRead)
			if (alreadyRead) {
				console.log('alreadyReada为true', alreadyRead)
				this.isAgree = true
			} else {
				console.log('alreadyReada为false', alreadyRead)
				this.isAgree = false
			}
			console.log('isAgreeisAgreeisAgree：', this.isAgree)
		},
		methods: {
			//是否同意
			handleAgree() {
				this.isAgree = !this.isAgree
				if (!this.isAgree) {
					sessionStorage.alreadyRead = false
				}
				if (this.isAgree && getApp().globalData.openReader) {
					getApp().globalData.contractInfoList = [{
						"contractStatus": "",
						"contractType": "",
						"contractId": "",
						"contractName": "",
						"contractFileUrl": "wxapp_file/template/userRegisterProtocolForPv.pdf"
					}, {
						"contractStatus": "",
						"contractType": "",
						"contractId": "",
						"contractName": "",
						"contractFileUrl": "wxapp_file/template/userPrivacyAgreementForPv.pdf"
					}]
					uni.navigateTo({
						url: '../../component/ReadDocument'
					})
				}
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
				if (this.phone == undefined || this.phone == "") {
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					})
					return
				}
				if (!checkMobile(this.phone)) {
					uni.showToast({
						title: "手机号格式不正确",
						icon: "none"
					})
					return
				}
				if (this.ImageCaptchaCode == undefined || this.ImageCaptchaCode == "") {
					uni.showToast({
						title: "请输入图形验证码",
						icon: "none"
					})
					return
				}
				if (this.codeText != '发送验证码') {
					return
				}
				uni.showLoading({
					title: "加载中"
				})
				postAjax(apiUrl.getMsgCodeUrl, {
					"phone": this.phone,
					"tmpCode": "ZYD0010",
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
			//注册
			handleRegist() {
				if (!this.isGetMsgCode) {
					uni.showToast({
						title: "请先获取短信验证码",
						icon: "none"
					})
					return
				}
				if (this.phone == undefined || this.phone == "") {
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					})
					return
				}
				if (!checkMobile(this.phone)) {
					uni.showToast({
						title: "手机号格式不正确",
						icon: "none"
					})
					return
				}
				if (this.ImageCaptchaCode == undefined || this.ImageCaptchaCode == "") {
					uni.showToast({
						title: "请输入图形验证码",
						icon: "none"
					})
					return
				}
				if (this.phoneMsgCode == undefined || this.phoneMsgCode == "") {
					uni.showToast({
						title: "请输入验证码",
						icon: "none"
					})
					return
				}
				if (this.phoneMsgCode && this.phoneMsgCode.length < 6) {
					uni.showToast({
						title: "请输入6位验证码",
						icon: "none"
					})
					return
				}
				if (!this.isAgree) {
					uni.showToast({
						title: "请阅读注册协议",
						icon: "none"
					})
					return
				}

				uni.showLoading({
					title: "加载中"
				})
				postAjax(apiUrl.registUrl, {
					"productId": "GFD001",
					"accessChannelNo": "00",
					"phone": this.phone,
					"msgChkUniqCode": this.msgChkUniqCode,
					"phoneMsgCode": this.phoneMsgCode

				}).then(res => {
					console.log(res);
					getApp().globalData.phone = this.phone
					uni.setStorageSync("phone", this.phone)
					uni.hideLoading();
					uni.showToast({
						title: "注册成功,请登录",
						icon: "none"
					})
					setTimeout(function() {
						uni.navigateBack()
					}, 500);

				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
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
			margin-top: 40rpx;
		}
	}

	uni-input {
		display: inline-block;
	}

	input {
		padding: 0 24rpx;
		margin: 24rpx 0;
	}

	.mt40 {
		margin-top: 40rpx;
	}

	.sq-view {
		padding: 15px 0 15px 15px;
	}
</style>
