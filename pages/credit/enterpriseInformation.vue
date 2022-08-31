<template>
	<!-- 申请信息页面 -->
	<view>
		<item-nav-bar title="授信申请" ></item-nav-bar>
		<scroll-view class="content-body" scroll-y="true">
			<view class="form-content">
				<view class="sq-view">
					<view class=" item-input_er">
						<view class="title-text">
							<image src="../../static/img/03icon_txh.png" mode="widthFix" class="family_img_left">
							</image>
							<view class="process"></view>
							<view class="process_er"></view>

							<image src="../../static/img/03icon_txq.png" mode="widthFix" class="family_img_liu"></image>
							<view class="process_er_cc"></view>
							<view class="process_er_cc"></view>
							<image src="../../static/img/03icon_txq.png" mode="widthFix" class="family_img_liu"></image>
						</view>

						<view class="direction-view">
						</view>
					</view>
					<view class="title-text_two">
						<text class="information_jb">基本信息</text>
						<text class="information_qy">企业信息</text>
						<text class="information_qt">其他信息</text>
					</view>
				</view>
				<form @submit="formSubmit" @reset="formReset">
					<view class="application-user-data">
						<view class="apply-view">
							<image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image>
							<span class="apply-view-title">企业信息</span>
						</view>
						<view class="item-view">
							<view class=" item-input-image">
								<text class="lable">营业执照</text>
								<span class="titlesp">请上传</span>
								<view class="img_up">
									<uni-file-picker ref="fileOne" limit="1" :list-styles="listStyles"
										:image-styles="imageStyles" mode="grid" @select="selectAccount"
										@delete="deleteAccount">
										<image src="../../static/img/saomiao.png" class="add-img" mode="widthFix">
										</image>
									</uni-file-picker>
								</view>
							</view>
						</view>
						<key-value title="法定代表人" :content="this.legalName" class='key-value-style'></key-value>
				<!-- 		<view class="item-view">
							<view class=" item-input">
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image>
									<text>法定代表人</text>
								</view>
								<view class="direction-view">
									<input class="text-size" name="liveAdressDesc" v-model="legalName" placeholder="请输入法定代表人" />
								</view>
							</view>
						</view> -->
						<key-value title="企业证照类型" content="营业执照"></key-value>
						<view class="item-view-er">
							<view class=" item-input-er">
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>企业名称</text>
								</view>
								<view class="direction-view">
									<textarea name="enterpriseName" auto-height v-model="enterpriseName"
										placeholder="请输入企业名称" />
									<!-- <input name="enterpriseName" v-model="enterpriseName" placeholder="请输入企业名称" /> -->
								</view>
							</view>
						</view>
						<view class="item-view">
							<view class=" item-input">
								<view class="title-text">
									<!-- <image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"> -->
									</image>
									<text>统一社会信用代码</text>
								</view>
								<view class="direction-view-er">
									<span name="enterpriseName">{{this.creditCode}}</span>
									<!-- <input name="enterpriseName" v-model="enterpriseName" placeholder="请输入企业名称" /> -->
								</view>
							</view>
						</view>
					<!-- 	<view class="item-view">
							<view class="item-input-st">
								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>是否个体工商户</text>
								</view>
								<picker mode="selector" @change="businessPickerChange" :value="businessIndex"
									:range="businessList" range-key="text">
									<view class="grayColor horizontal-view" v-if="businessIndex==-1">
										<text>请选择是否个体工商户</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-view" v-else>
										<text>
											{{businessList[businessIndex].text}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view> -->
                       <key-value title="是否个体工商户" :content="this.commercial"></key-value>

					</view>
					<button class="button" type="primary" form-type="submit">下一步</button>
				</form>
			</view>
		</scroll-view>
		<!-- 数字键盘 -->
		<keyboard-package ref="number" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm"
			:disableDot="true" />

		<!-- 身份证键盘 -->
		<keyboard-package ref="idCard" type="idCard" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm" />
	</view>

</template>

<script>
	import KeyValue from "../../component/KeyValue.vue"
	import ItemInput from "../../component/ItemInput.vue"
	import ItemPicker from "../../component/ItemPicker.vue"
	import ItemLine from "../../component/ItemLine.vue"
	import keyboardPackage from "@/component/keyboards/keyboard-package/keyboard-package.vue"
	import {
		checkMobile
	} from "../../utils/index.js"
	import {
		vocation_code_list,
		businessNature,
		relation_type_list
	} from "../../common/projectFormConfig.js"
	import ItemNavBar from "../../component/ItemNavBar.vue"
	export default {
		components: {
			KeyValue,
			ItemInput,
			ItemPicker,
			ItemLine,
			ItemNavBar,
			keyboardPackage
		},
		data() {
			return {
				info: {},
				creditCode: '', //社会信用代码
				enterpriseName: '', //企业名称
				enterpriseLicense: '', //企业证照类型
				imageStyles: {
					width: 45,
					height: 45,
					border: false,
				},
				educationList: ['是', '否', ],
				legalName: '',
				multiIndex: [-1],
				listStyles: {
					// 是否显示边框
					border: false,
					// 是否显示分隔线
					dividline: true,
				},
				commercial:'',
				imageUrl: '',
				regAddress: '',
				userInfo: {}, //用户信息
				applyInfoCheck: {}, //用款信息
				attachments: [], //影像文件列表
				bizToken: '',
				orderInfo: {},
				username:'',
				Industrial:'',
				phone: '',
				isAgree: false,
				businessList: businessNature, //经营性质列表
				businessIndex: -1,
				business: '',
				professionalList: vocation_code_list, //职业列表
				professionalIndex: -1,
				professional: '',
				currentBranch: "",
				educationBranch: '',
				applyNo: "",
				isRiskFlag:'',
				grantId: "",
				recmmendName: "",
				recmmend: "",
				type: 'number', //键盘类型判断
				numberList: [], //数字键盘数组
				idCardList: [], //身份证键盘数组
			}
		},
		onLoad(e) {
			if (e.infoer) {
				this.info = JSON.parse(decodeURIComponent(e.infoer))
			}

			console.log('ccccccccc' + JSON.stringify(this.info))
			sessionStorage.alreadyRead = false
			this.phone = getApp().globalData.phone || uni.getStorageSync("phone")
			//调用腾讯核身结果
			// this.getDetectInfoAction()
			//获取机构列表
			// this.getBtranthList()
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
		computed: {
			//电话号码输入的数据
			telStr() {
				let str = '';
				this.numberList.forEach(item => {
					str += item.toString();
				})
				return str;
			},
			//身份证输入的数据
			passStr() {
				let str = '';
				this.idCardList.forEach(item => {
					str += item.toString();
				})
				return str;
			}
		},
		methods: {

			//自定义键盘完成输入按钮
			onConfirm() {},
			//自定义键盘删除按钮
			onDelete() {
				switch (this.type) {
					case 'number':
						this.numberList.pop();
						break;
					case 'idCard':
						this.idCardList.pop();
						break;
				}
			},
			//自定义键盘弹出事件
			openKeyBoard(key) {
				uni.hideKeyboard();
				this.type = key;
				this.$refs[key].open();
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
			// 选择图片后方法（户口本）
			selectAccount(e) {
				if (e.tempFiles.length != null && e.tempFiles.length != undefined && e.tempFiles.length > 0) {
					for (var i = 0; i < e.tempFiles.length; i++) {
						console.log('图片前信息：', JSON.stringify(e))
						this.select(e.tempFiles[i].file, '6', i, "fileTwo")
					}
				}
			},
			select(e, type, i, refType) {
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
							_this.upLoad(splitBase64Data, type, e.name, i, refType);
						})
					}

				})
			},
			// 选择图片后方法
			deleteAccount(e) {
				this.deleteFile(e, '6')
			},
			// 文件上传
			upLoad(base64Data, fileKind, fileName, i, refType) {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$request.postAjax(this.$apiUrl.uploadAction, {
					fileBase64: base64Data
				}).then(res => {
					console.log('上传成功返回数据：', res);
					this.imageUrl = res.fileUrl
					this.attachments.push({
						fileKind: fileKind,
						fileName: fileName.substring(0, 25),
						fileUrl: res.fileUrl
					})
					console.log('添加后的存储文件列表：', fileName)
					console.log('添加后的存储文件列表：', JSON.stringify(this.attachments))
					uni.hideLoading()
					uni.showToast({
						title: "上传成功",
						icon: "none"
					})
					this.$request.postAjax(this.$apiUrl.ocrEnterInfoAction, {
						idImg: base64Data
					}).then(res => {
						console.log('上传成功返回数据：', res);
						this.enterpriseLicense = res.enterLicenseType,
						this.enterpriseName = res.enterName,
						this.creditCode = res.creditCode,
						this.legalName = res.legalName,
						this.regAddress = res.regAddress,
						this.username = res.username,
						this.Industrial = res.creditCode.substring(0,2)
						if(this.Industrial == 92){
							this.commercial = '是'
						}else{
							this.commercial = '否'
						}
						console.log('添加后的存储文件列表：', this.Industrial)
						console.log('添加后的存储文件列表：', this.attachments)
						uni.hideLoading()
						uni.showToast({
							title: "识别成功",
							icon: "none"
						})
					}).catch(error => {
						console.log(error);

						uni.showToast({
							title: "识别失败",
							icon: "none"
						})
						uni.hideLoading()
					})
				}).catch(error => {
					console.log(error);
					if (refType == "fileOne") {
						this.$refs.fileOne.clearFiles(i);
					} else if (refType == "fileTwo") {
						this.$refs.fileTwo.clearFiles(i);
					} else if (refType == "fileThree") {
						this.$refs.fileThree.clearFiles(i);
					}
					uni.showToast({
						title: "上传失败",
						icon: "none"
					})
					uni.hideLoading()
				})
			},
			// 文件上传
			// upLoad(base64Data, fileKind, fileName,i,refType) {
			// 	uni.showLoading({
			// 		title: "加载中",
			// 		mask: true
			// 	})

			// },
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
			// 移除图片
			deleteFile(e, fileKind) {
				console.log('移除文件：', e)
				this.imageUrl = '';
				this.enterpriseLicense = '';
				this.enterpriseName = '';
				this.creditCode = '';
				this.legalName = '';
				this.regAddress = '';
				this.username = '';
				this.commercial = '';
				let index = '';
				for (let i = 0; i < this.attachments.length; i++) {
					const item = this.attachments[i]
					if (item.fileKind === fileKind && item.fileName === e.tempFile.name.substring(0, 25)) {
						index = i + ''
						break
					}
				}
				if (index) {
					this.attachments.splice(index - 0, 1)
				}
				console.log('移除后的存储文件列表：', this.attachments)
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
			//自定义键盘input事件
			onInput(val) {
				switch (this.type) {
					case 'number':
						if (this.numberList.length >= 11) {
							this.close();
							return;
						};
						this.numberList.push(val);
						break;
					case 'idCard':
						if (this.idCardList.length >= 18) {
							this.close();
							return;
						};
						this.idCardList.push(val);
						break;
				}

			},

			professionalPickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.professionalIndex = educationArr
				this.professional = this.professionalList[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.professional));
			},
			businessPickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.businessIndex = educationArr
				this.business = this.businessList[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.professional));
			},
			getDetectInfoAction() {
				uni.showLoading({
					title: "加载中"
				})
				//获取订单信息
				this.$request.postAjax(this.$apiUrl.addOrderInfoForPvAction, {
					"bizToken": this.bizToken,
					"queryType": '3',
				}).then(res => {
					console.log('身份证信息：', res);
					this.orderInfo = res
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},



			valid(data) {
				if (!this.imageUrl) {
					uni.showToast({
						title: "请上传营业执照",
						icon: "none"
					})
					return false
				}
				if (this.legalName != this.username) {
					uni.showToast({
						title: "营业执照法定代表人与本人不符",
						icon: "none"
					})
					return false
				}
				if (!this.enterpriseName) {
					uni.showToast({
						title: "请填写企业名称",
						icon: "none"
					})
					return false
				}
				if (!this.creditCode) {
					uni.showToast({
						title: "请填写统一社会信用代码",
						icon: "none"
					})
					return false
				}
				// if (!this.business) {
				// 	uni.showToast({
				// 		title: "请选择经营性质",
				// 		icon: "none"
				// 	})
				// 	return false
				// }
				// if (!this.business) {
				// 	uni.showToast({
				// 		title: "请选择是否个体工商户",
				// 		icon: "none"
				// 	})
				// 	return false
				// }
				return true
			},
			//授信数据保存
			formSubmit: function(e) {
				const that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value
				let enterType = this.educationBranch == '是' ? 'Y' : 'N'
				console.log("jjjjjjjjjj" + enterType)
                
				if (!this.valid(formData)) {
					return
				}
				uni.showLoading({
					title: "加载中"
				})
				
				this.$request.postAjax(this.$apiUrl.queryRiskCreditCodeAction, {
					"creditCode": this.creditCode,
					"enterpriseName": this.enterpriseName,
				}).then(res => {
					
					this.isRiskFlag = res.isRiskFlag
					console.log('身份证信息：', this.isRiskFlag)
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
				// if (!this.isAgree) {
				// 	uni.showToast({
				// 		title: "请先阅读并同意授权书",
				// 		icon: "none"
				// 	})
				// 	return
				// }

				const infos = {
					entCertificateNo: this.creditCode,
					enterpriseName: this.enterpriseName,
					isSelfEmployed: this.commercial == '是' ?'1' : '0',
					legalName: this.legalName,
					industry: this.professional.code,
					attachments: this.attachments,
					regAddress: this.regAddress
				};
				
				const infoer = JSON.stringify({
					...this.info,
					...infos
				});
				console.log('hhhhhhhhh' + JSON.stringify(infoer))
				setTimeout(() => {
				      if( this.isRiskFlag == '1'){
				      	uni.navigateTo({
				      		url: `./otherInformation?infoer=` + infoer
				      	})
				      }else{
				      	uni.showToast({
				      		title: "社会统一信用代码错误，请重新上传营业执照",
				      		icon: "none"
				      	})
				      }
				}, 2000)
			
				
			},
			// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
			// 详情查看javascript的数值范围
			checkIDCard(idcode) {
				// 加权因子
				var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				// 校验码
				var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
				var code = idcode + "";
				var last = idcode[17]; //最后一个
				var seventeen = code.substring(0, 17);
				// ISO 7064:1983.MOD 11-2
				// 判断最后一位校验码是否正确
				var arr = seventeen.split("");
				var len = arr.length;
				var num = 0;
				for (var i = 0; i < len; i++) {
					num = num + arr[i] * weight_factor[i];
				}

				// 获取余数
				var resisue = num % 11;
				var last_no = check_code[resisue];

				// 格式的正则
				// 正则思路
				/*
				第一位不可能是0
				第二位到第六位可以是0-9
				第七位到第十位是年份，所以七八位为19或者20
				十一位和十二位是月份，这两位是01-12之间的数值
				十三位和十四位是日期，是从01-31之间的数值
				十五，十六，十七都是数字0-9
				十八位可能是数字0-9，也可能是X
				*/
				var idcard_patter =
					/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				// 判断格式是否正确
				var format = idcard_patter.test(idcode);
				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				return last === last_no && format ? true : false;
			}
		}
	}
</script>

<style scoped lang="less">
	.content-body {
		display: flex;
		flex-direction: column;
		width: 100%;
		font-size: 32rpx;
		color: #333333;
		font-weight: 500;

		// margin-top: 30rpx;
		.application-user-data {
			margin-top: 20rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			border-radius: 16rpx;

			// 申请信息
			.apply-view {
				border-top-left-radius: 16rpx;
				border-top-right-radius: 16rpx;
				font-size: 36rpx;
				background-color: white;
				padding: 30rpx 35rpx 15rpx 35rpx;
				// border-bottom: 2rpx solid #e6e6e6;
				color: var(--color-orange-text);
				font-weight: 500;

				.orange-block {
					background-color: var(--color-orange-text);
					display: inline-block;
					position: relative;
					top: 5rpx;
					width: 8rpx;
					height: 36rpx;
					border-radius: 30rpx;
					// margin-left: 20rpx;
				}

				.img-block {
					// margin-left: 20rpx;
					width: 7rpx;
					height: 34rpx;
					margin-bottom: 8rpx;
					vertical-align: middle;
				}

				.apply-view-title {
					margin-left: 16rpx;
				}
			}

		}
	}

	.borders {
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}

	// 表单内容

	.form-content {}
	.married-view {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	// 家庭年收入
	.item-view-hy {
		background-color: white;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		.check-img {
			margin-left: 40rpx;
			width: 36rpx;
			height: 36rpx;
			padding: 20rpx 20rpx 20rpx 0;
		}
	}

	.title-text-ed {
		min-width: 300rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.item-input-hy {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

		padding: 30rpx 0rpx;
		box-sizing: border-box;
		// border-bottom: 2rpx solid #e6e6e6;

		.title-text {
			min-width: 240rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		picker {
			margin-left: 5rpx;
			width: 100%;
			// text-align: end;
		}

		input {

			margin-left: 10rpx;
			width: 100%;
			// text-align: end;
		}

	}
	
	.item-input-image {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

		padding: 15rpx 0rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #e6e6e6;

		.title-text {
			min-width: 240rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

	}
	// 家庭年收入
	.item-view {
		background-color: white;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		.check-img {
			margin-left: 40rpx;
			width: 36rpx;
			height: 36rpx;
			padding: 20rpx 20rpx 20rpx 0;
		}
	}

	.title-text-ed {
		min-width: 300rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.item-input {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

		padding: 30rpx 0rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #e6e6e6;

		.title-text {
			min-width: 220rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		picker {
			margin-left: 5rpx;
			width: 100%;
			// text-align: end;
		}

		input {

			margin-left: 10rpx;
			width: 100%;
			// text-align: end;
		}

	}
    /deep/ .icon-del-box{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0px;
        right:1px;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
	.item-input-st {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

		padding: 30rpx 0rpx;
		box-sizing: border-box;
		// border-bottom: 2rpx solid #e6e6e6;

		.title-text {
			min-width: 240rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		picker {
			margin-left: 5rpx;
			width: 100%;
			// text-align: end;
		}

		input {

			margin-left: 10rpx;
			width: 100%;
			// text-align: end;
		}

	}

	.item-view-er {
		background-color: white;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		.check-img {
			margin-left: 40rpx;
			width: 36rpx;
			height: 36rpx;
			padding: 20rpx 20rpx 20rpx 0;
		}
	}

	.title-text-ed {
		min-width: 300rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.item-input-er {
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 140rpx;
		justify-content: space-evenly;
		padding: 30rpx 0rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #e6e6e6;

		.title-text {
			min-width: 240rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		textarea {
			align-items: center;
			margin-left: 5rpx;
			height: auto;
			//     word-wrap : break-word;
			width: 100%;
		}
	}

	.item-inputcc {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 30rpx 0rpx;
		box-sizing: border-box;


		.title-text {
			min-width: 240rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		input,
		picker {

			margin-left: 40rpx;
			width: 100%;
			// text-align: end;
		}
	}

	.item-input_er {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 30rpx 0rpx;
		box-sizing: border-box;

		.title-text {
			min-width: 186rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.title-text_two {
			min-width: 186rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;

		}

		input,
		picker {

			margin-left: 40rpx;
			width: 100%;
			// text-align: end;
		}
	}

	.family_img {
		width: 14rpx;
		margin-left: 5rpx;
	}

	.family_img_left {
		margin-left: 80rpx;
		width: 400rpx;

	}

	.family_img_liu {
		width: 400rpx;

	}

	.process {
		height: 4rpx;
		width: 640rpx;
		background-color: #ff6619;
	}

	.process_er {
		height: 4rpx;
		width: 640rpx;
		background-color: #cccccc;
	}

	.information_jb {
		margin-left: 43rpx;
		color: #333333;
	}

	.information_qt {
		margin-left: 90rpx;
		color: #333333;
	}

	.information_qy {
		margin-left: 90rpx;
		color: #333333;
	}

	.img_up {}
    .key-value-style{
		line-height: 52rpx;
		align-items: center;
	}
	.process_er_cc {
		height: 4rpx;
		width: 640rpx;
		background-color: #cccccc;
	}

	.direction-view-er {
		width: 100%;
		margin-left: 32rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.direction-view {
		width: 100%;
		margin-left: 8rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.danwei-text {
		width: 200rpx;
	}

	.none-border {
		border: none;
	}

	

	.titlesp {
		color: #cccccc;
		margin-left: 150rpx;
		margin-top: 20rpx;
	}

	//必须为微信号手机号
	.wx-text {
		width: 100%;
		// text-align: end;
		font-size: 24rpx;
		color: #ff3333;
		margin-top: -30rpx;
		padding-left: 226rpx;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #e6e6e6;
	}

	.min-width-280 {
		min-width: 280rpx;
	}

	.min-width-160 {
		min-width: 160rpx;
	}

	.button {
		width: calc(100% - 60rpx);
		margin: 77rpx 30rpx;
	}

	.branthNameText {
		width: 100%;
	}

	.grayColor {
		color: #808080;
	}

	.item-view {
		width: 100%;
		// padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		font-size: 32rpx;
		color: var(--fontColor);
		justify-content: space-between;

		.lable {
			margin-left: -26rpx;
			color: var(--fontColor);
			min-width: 260rpx;
			margin-top: 20rpx;
		}

		.look-view {
			align-items: center;
			color: white;

			.selectlook {
				background-color: var(--color-orange-text);
				padding: 7rpx 35rpx;
				border-radius: 50rpx;
			}
		}
	}

	.horizontal-view {
		display: flex;
		align-items: center;

		text {
			width: 100%;
		}

		image {
			width: 24rpx;
			margin: 0 3rpx 0 10rpx;
		}
	}

	// 同意签署提示
	.sq-view {
		width: auto;
		padding: 15rpx 30rpx 30rpx 35rpx;
		box-sizing: border-box;
		color: var(--color-orange-text);
		font-size: 32rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;

		.check-view {
			display: flex;
			flex-direction: row;
			align-items: center;

			.check-img {
				width: 36rpx;
				height: 36rpx;
				padding: 20rpx 20rpx 20rpx 0;
			}
		}

		.text-name {
			margin-left: 44rpx;

			+.text-name {
				margin-top: 20rpx;
			}
		}

		.agree-tip {
			color: var(--fontColor);
		}
	}

	.none-padding-top {
		padding-top: 0;
	}

	.none-padding-bottom {
		padding-bottom: 0;
	}
	.add-img {
		// margin-right: 5rpx;
			// width: 300rpx;
			// height: 100%;
			// width: 300rpx;
	//       height:300rpx;
		}
</style>
