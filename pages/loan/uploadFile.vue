<template>
	<view>
		<item-nav-bar title="上传附件"></item-nav-bar>
		<view class="content-body">
			<view class="tip-text warn">
				<image class="img-tip" src="../../static/img/cerdit/04icon_ts.png"></image>
				<!-- <uni-icons type="info" size="20"></uni-icons> -->
				<view class="tip-title">上传证明材料有助于提高您的申请审批速度</view>
			</view>
		<!-- 	<view class="title-view">
				证明材料
			</view> -->
			<view class="content-view">
				<view class="apply-view">
					<image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image>
					<span class="apply-view-title">证明材料</span>
				</view>
				<view class="item-view" v-if="userInfo.spouseCertID">
					<text>本人结婚证</text>
					<span class="titlesp">(最多选择<span class="titlesp-sp-color">1</span>张图片)</span>
					<view class="example-body">
						<uni-file-picker ref="fileOne" limit="1" title="最多选择1张图片" :list-styles="listStyles"
							:image-styles="imageStyles" mode="grid" @select="selectMarriage" @delete="deleteMarriage">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>

				</view>
				<view class="item-view">
					<text>户口本</text>
					<span class="titlesp">(最多选择<span class="titlesp-sp-color">4</span>张图片)</span>
					<view class="example-body">
						<uni-file-picker ref="fileTwo" limit="4" :list-styles="listStyles"
							:image-styles="imageStyles" @select="selectAccount" @delete="deleteAccount">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>

				</view>
				<view class="item-view">
					<text>房屋证明</text>
					<span class="titlesp">(最多选择<span class="titlesp-sp-color">2</span>张图片)</span>
					<view class="example-body">
						<uni-file-picker ref="fileThree" limit="2" :list-styles="listStyles"
							:image-styles="imageStyles" @select="selectHouse" @delete="deleteHouse">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>

				</view>
				<!-- <view class="item-view">
					<text>设备安装与销售合同</text>
		
					<view class="example-body">
						<uni-file-picker limit="6" title="最多选择6张图片" :list-styles="listStyles" :image-styles="imageStyles">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>
		
				</view>
				<view class="item-view">
					<text>并网合同</text>
		
					<view class="example-body">
						<uni-file-picker limit="6" title="最多选择6张图片" :list-styles="listStyles" :image-styles="imageStyles">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>
		
				</view>
				<view class="item-view">
					<text>竣工表</text>
		
					<view class="example-body">
						<uni-file-picker limit="6" title="最多选择6张图片" :list-styles="listStyles" :image-styles="imageStyles">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>
		
				</view>
				<view class="item-view">
					<text>保险单</text>
		
					<view class="example-body">
						<uni-file-picker limit="6" title="最多选择6张图片" :list-styles="listStyles" :image-styles="imageStyles">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>
		
				</view>
				<view class="item-view">
					<text>并网照片</text>
		
					<view class="example-body">
						<uni-file-picker limit="6" title="最多选择6张图片" :list-styles="listStyles" :image-styles="imageStyles">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>
		
				</view>
				<view class="item-view">
					<text>营业执照</text>
		
					<view class="example-body">
						<uni-file-picker limit="6" title="最多选择6张图片" :list-styles="listStyles" :image-styles="imageStyles">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>
		
				</view>
				<view class="item-view">
					<text>其他</text>
		
					<view class="example-body">
						<uni-file-picker limit="6" title="最多选择6张图片" :list-styles="listStyles" :image-styles="imageStyles">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>
		
				</view> -->


			</view>
			<button class="button long" @click="submit" type="primary">确认发送</button>
		</view>
	</view>

</template>

<script>
	import ItemNavBar from "@/component/ItemNavBar.vue"
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				imageStyles: {
					width: 80,
					height: 80,
					border: false
				},
				listStyles: {
					// 是否显示边框
					border: false,
					// 是否显示分隔线
					dividline: true,
				},
				userInfo: {}, //用户信息
				applyInfoCheck: {}, //用款信息
				attachments: [], //影像文件列表
			}
		},
		onLoad() {
			let searchURL = window.location.search;
			searchURL = searchURL.substring(1, searchURL.length);
			this.bizToken = searchURL.split("&")[0].split("=")[1];
			getApp().globalData.bizToken = this.bizToken
			uni.setStorageSync('bizToken', this.bizToken)
			
			this.applyInfoCheck = this.$gfdGlobalData.getData('applyInfoCheck')
			// this.applyInfoCheck = getApp().globalData.applyInfoCheck
			this.getDetectInfoAction();
			uni.showLoading({
				title: "加载中"
			})
			this.$request.postAjax(this.$apiUrl.getUserInfoForPvAction, {
				productId: "ZYD001",
				creditLimitId: this.$gfdGlobalData.getData('creditLimitId')
			}).then(res => {
				this.userInfo = res
				console.log('用户信息：', res);
				uni.hideLoading()
			}).catch(error => {
				console.log(error);
				uni.hideLoading()
			})
		},
		methods: {
			getDetectInfoAction() {
				uni.showLoading({
					title: "加载中"
				})
				//获取订单信息
				this.$request.postAjax(this.$apiUrl.addOrderInfoForPvAction, {
					"bizToken": getApp().globalData.bizToken || uni.getStorageSync('bizToken'),
					"queryType": '3',
				}).then(res => {
					console.log('身份证信息：', res);
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},
			submit() {
				this.$gfdGlobalData.setData('attachments', this.attachments)
				// getApp().globalData.attachments = this.attachments
				if (this.userInfo.spouseCertID) {
					this.$gfdGlobalData.setData('userInfo', this.userInfo)
					// getApp().globalData.userInfo = this.userInfo
					uni.navigateTo({
						url: './creditApplyConfirm'
					});
				} else {
					uni.navigateTo({
						url: '../common/smsVerification/smsVerification?type=loan'
					})
				}
			},
			/**
			 * file图片文件转base64
			 * @param {*} img file文件或者blob
			 * @param {*} callback function (imgurl)通过参数获得base64
			 */
			getBase64(img, callback) {
				const reader = new FileReader()
				reader.addEventListener('load', () => callback(reader.result))
				reader.readAsDataURL(img)
			},
			// 选择图片后方法（结婚证）
			selectMarriage(e) {
				if(e.tempFiles.length != null && e.tempFiles.length != undefined && e.tempFiles.length > 0){
					for (var i = 0; i < e.tempFiles.length; i++) {
						console.log('图片前信息：', JSON.stringify(e))
						this.select(e.tempFiles[i].file, '46',i,"fileOne")
					}
				}
			},
			// 选择图片后方法（户口本）
			selectAccount(e) {
				if(e.tempFiles.length != null && e.tempFiles.length != undefined && e.tempFiles.length > 0){
					for (var i = 0; i < e.tempFiles.length; i++) {
						console.log('图片前信息：', JSON.stringify(e))
						this.select(e.tempFiles[i].file, '45',i,"fileTwo")
					}
				}
			},
			// 选择图片后方法（房屋证明）
			selectHouse(e) {
				if(e.tempFiles.length != null && e.tempFiles.length != undefined && e.tempFiles.length > 0){
					for (var i = 0; i < e.tempFiles.length; i++) {
						console.log('图片前信息：', JSON.stringify(e))
						this.select(e.tempFiles[i].file, '413',i,"fileThree")
					}
				}
			},
			select(e, type,i,refType) {
				// console.log('文件数据：', e)
				let _this = this;
				_this.getBase64(e, (base64Data) => {
					let content = base64Data; //图片的src，base64格式
					let img = new Image();
					img.src = content;
					img.onload = function() { //图片加载完毕
						_this.compressEvent(img, (dataURL) => {
							var blob = _this.base64ToBlob(dataURL);
							//压缩之后的图片大小
							var sizeZip = blob.size
							console.log('图片后信息：', sizeZip)
							var splitBase64Data = dataURL.split(",")[1]
							// console.log("截取字符："+dataURL.split(",")[0])
							_this.upLoad(splitBase64Data, type, e.name , i, refType);
						})
					}
					
				})
			},
			// 文件上传
			upLoad(base64Data, fileKind, fileName,i,refType) {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$request.postAjax(this.$apiUrl.uploadAction, {
					fileBase64: base64Data
				}).then(res => {
					console.log('上传成功返回数据：', res);
					this.attachments.push({
						fileKind: fileKind,
						fileName: fileName.substring(0,25),
						fileUrl: res.fileUrl
					})
					console.log('添加后的存储文件列表：',fileName)
					console.log('添加后的存储文件列表：', this.attachments)
					uni.hideLoading()
					uni.showToast({
						title: "上传成功",
						icon: "none"
					})
				}).catch(error => {
					console.log(error);
					if(refType == "fileOne"){
						this.$refs.fileOne.clearFiles(i);
					}else if(refType == "fileTwo"){
						this.$refs.fileTwo.clearFiles(i);
					}else if(refType == "fileThree"){
						this.$refs.fileThree.clearFiles(i);
					}
					uni.showToast({
						title: "上传失败",
						icon: "none"
					})
					uni.hideLoading()
				})
			},
			compressEvent(img, callback) {
				let canvasWidth = img.width //图片原始宽高
				let canvasHeight = img.height;
				//图片宽高比
				let base = canvasWidth / canvasHeight;
				//宽度最大设为1024
				if (canvasWidth > 1024) {
					canvasWidth = 1024;
					canvasHeight = Math.floor(canvasWidth / base);
				}
				//绘制图像到画布
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext("2d");
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				//将画布转为base64，mimeType类型为image/jpeg，图片质量为0.3
				let dataURL = canvas.toDataURL("image/jpeg", 0.3);
				callback ? callback(dataURL) : null; //调用回调函数
			},
			//base转Blob对象
			base64ToBlob(base64) {
				var arr = base64.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new Blob([u8arr], {
					type: mime
				});
			},
			// 选择图片后方法（结婚证）
			deleteMarriage(e) {
				this.deleteFile(e, '46')
			},
			// 选择图片后方法（户口本）
			deleteAccount(e) {
				this.deleteFile(e, '45')
			},
			// 选择图片后方法（房屋证明）
			deleteHouse(e) {
				this.deleteFile(e, '413')
			},
			// 移除图片
			deleteFile(e, fileKind) {
				console.log('移除文件：', e)
				let index = ''
				for (let i = 0; i < this.attachments.length; i++) {
					const item = this.attachments[i]
					if (item.fileKind === fileKind && item.fileName === e.tempFile.name.substring(0,25)) {
						index = i + ''
						break
					}
				}
				if (index) {
					this.attachments.splice(index - 0, 1)
				}
				console.log('移除后的存储文件列表：', this.attachments)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-body {
		padding-top: 0;
		padding-bottom: 88rpx;

		.tip-title {
			font-size: 28rpx;
		}
		
		.titlesp{
			margin-left: 20rpx;
			color: #999999;
			font-size: 28rpx;
			.titlesp-sp-color{
				color: var(--color-orange-text);
			}
		}
		
		.title-view {
			width: 100%;
			font-size: 36rpx;
			color: var(--color-orange-text);
			font-weight: 500;
			background: white;
			box-sizing: border-box;
			padding: 30rpx;
			border-bottom: 1rpx solid var(--lineColor);
		}

		.content-view {
			background-color: white;
			padding:19rpx 30rpx 39rpx 30rpx;
			font-size: 32rpx;
			color: var(--fontColor);
			border-radius: 16rpx;
			margin-top: 20rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			.apply-view {
				font-size: 36rpx;
				background-color: white;
				padding: 0 0 30rpx 0;
				// border-bottom: 2rpx solid #e6e6e6;
				color: var(--color-orange-text);
				font-weight: 500;
				.img-block{
					// margin-left: 20rpx;
					width: 7rpx;
					height: 34rpx;
					margin-bottom: 8rpx;
					vertical-align: middle;
				}
				.apply-view-title{
					margin-left: 16rpx;
				}
			}
			
			.item-view{
				margin-bottom: 50rpx;
				
				.example-body {
					// padding: 10px;
					padding-top: 0;
					margin-top: 30rpx;
				}
				
				.add-img {
					
				}
			}
		}
	}
</style>
