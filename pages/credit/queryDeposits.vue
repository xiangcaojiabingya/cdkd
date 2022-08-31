<template>
	<!-- 申请信息页面 -->
	<view>
		<item-nav-bar title="授信申请" :st='1'></item-nav-bar>
		<scroll-view class="content-body" scroll-y="true">
			<view class="form-content">
				<form @submit="formSubmit" @reset="formReset">
					<view class="application-user-data">


						<view class="item-view">
							<view class="item-input none-border">
								<!-- 输入框 -->
								<view class="title-text">
									<!-- <image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image> -->
									<text>银行卡号</text>
								</view>
								<input name="bankCard" @tap="openKeyBoard('card')" :value="passStr" type='number'
									@focus="cardFocus" @blur="cardBlur" placeholder="请输入银行卡号,示例:6230****8888" />
							</view>
						</view>
						<view class="item-view">
							<view class="item-input none-border">
								<!-- 输入框 -->
								<view class="title-text">
									<!-- <image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image> -->
									<text>子账号</text>
								</view>
								<input name="childAccount" @tap="openKeyBoard('number')" :value="telStr" type='number'
									@focus="sunNumberFocus" @blur="sunNumberBlur" placeholder="请输入存单子账号，示例00****" />
							</view>
						</view>
						<view class="item-view">
							<view class="item-input none-border">
								<!-- 输入框 -->
								<view class="title-text">
									<!-- <image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image> -->
									<text>存单金额</text>
								</view>
								<input name="depositAmount" @tap="openKeyBoard('money')" :value="moneyStr" type='number'
									@focus="amountFocus" @blur="amountBlur" placeholder="请输入存单金额" />
							</view>
						</view>
						<view class="item-view-er">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text-st ">
									<!-- <image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image> -->
									<text>存单种类</text>
								</view>
								<picker mode="selector" @change="educationPickerChange" :value="depositTypeListIndex"
									:range="depositTypeList" range-key="text">
									<view class="grayColor horizontal-view" v-if="depositTypeListIndex==-1">
										<text class="type-style">请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-view" v-else>
										<text>
											{{depositTypeList[depositTypeListIndex].text}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view>
					</view>
					<!-- v-if="isMarried" -->




					<view class="horizontal-view-st">
						<!-- <image src="../../static/img/cerdit/spot.png" mode="widthFix"></image> -->
						<text>温馨提示：您可登录“日照银行手机银行”，通过以下路径查找子账号信息：</text>
					</view>
					<view class="horizontal-view-info">
						<!-- <image src="../../static/img/cerdit/spot.png"mode="widthFix"></image> -->
						<text>整存整取/大额存单：【首页】-【存款】-【我的定期】；</text>
					</view>
					<view class="horizontal-view-info">
						<!-- <image src="../../static/img/cerdit/spot.png"mode="widthFix"></image> -->
						<!-- <text>整存整取/大额存单：【我的】-【存款】-【本行账户】；</text> -->
					</view>
					<view class="horizontal-view-info">
						<!-- <image src="../../static/img/cerdit/spot.png"mode="widthFix"></image>
						<text>优享存：【直销银行】-【账户】-【本行账户】。</text> -->
					</view>
					<button class="button" type="primary" form-type="submit">查询</button>
				</form>
			</view>
		</scroll-view>
		<!-- 数字键盘 -->
		<keyboard-package ref="number" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm"
			:disableDot="true" />
		<keyboard-package ref="card" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm"
			:disableDot="true" />
		<keyboard-package ref="money" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm"
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
		depositType_list
	} from "../../common/projectFormConfig.js"
	import {
		checkMobile,
	} from "../../utils/index.js"
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
				bizToken: '',
				orderInfo: {},
				phone: '',
				depositTypeList: depositType_list,
				depositTypeListIndex: -1,
				educationBranch: '',
				// cityList: cityList,
				// cityIndex: -1,
				// countyList: cityList[0].list,
				// countyIndex: -1,
				isAgree: false,
				isMarried: '10',
				currentBranch: "",
				applyNo: "",
				grantId: "",
				btranthList: [
					[],
					[],
					[]
				],
				st: '',
				multiIndex: [-1, -1, -1],
				classAList: [],
				secondList: [],
				tertiaryList: [],
				recmmendName: "",
				recmmend: "",
				type: 'number', //键盘类型判断
				numberList: [], //数字键盘数组
				idCardList: [], //身份证键盘数组
				moneyList: [],
				familyInCome: '', //家庭年收入
				bankCardFocus: '', //银行卡号聚焦输入的数据
				subNumberFocus: '', //子账号聚焦前输入的数据
				depositAmountFocus: '', //存单金额聚焦前输入的数据
			}
		},
		onLoad() {
			if (this.$gfdGlobalData.getData("openFaceAndOcr")) {
				let searchURL = window.location.search;
				searchURL = searchURL.substring(1, searchURL.length);
				this.bizToken = searchURL.split("&")[0].split("=")[1];
				getApp().globalData.bizToken = this.bizToken
				uni.setStorageSync('bizToken', this.bizToken)
				// //调用腾讯核身结果
				this.getDetectInfoAction()
			}
			sessionStorage.alreadyRead = false
			this.phone = getApp().globalData.phone || uni.getStorageSync("phone")


			// //获取机构列表
			// this.getBtranthList()
			console.log('isAgreeisAgreeisAgree：', JSON.stringify(this.depositTypeList))
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
			},
			moneyStr() {
				let str = '';
				this.moneyList.forEach(item => {
					str += item.toString();
				})
				return str;
			},

		},
		methods: {
			clearNoNum(e) {
				let temp = e.target.value
				let digits = 5
				if (temp < 0) {
					temp = "";
					return;
				}
				var posDot = temp.indexOf("."); //返回指定字符在此字符串中第一次出现处的索引
				if (posDot < 0) { //不包含小数点
					if (temp.length <= digits) {
						this.$nextTick(function() {
							this.familyInCome = temp + ''
						})
						return; //小于五位数直接返回
					} else {
						// temp.delete(5, 6);//大于五位数就删掉第六位（只会保留五位）
						if (temp.length > digits) {
							temp = temp.substring(1, digits + 1);
						}
						this.$nextTick(function() {
							this.familyInCome = temp + ''
						})
						return;
					}
				}
				var lastDot = temp.lastIndexOf(".");
				if (posDot != lastDot) {
					temp = "";
					this.$nextTick(function() {
						this.familyInCome = temp + ''
					})
					return;
				}
				//走到这有小数点
				if (posDot > digits) {
					// edt.delete(5, 6);//大于五位数就删掉第六位（只会保留五位）
					if (temp.length > digits) {
						temp = temp.substring(1, digits + 1);
					}
					this.$nextTick(function() {
						this.familyInCome = temp + ''
					})
					return;
				}
				if (temp.length - posDot - 1 > 2) //如果包含小数点
				{
					// edt.delete(posDot + 3, posDot + 4);//删除小数点后的第三位
					temp = temp.substring(0, posDot + 3);
				}
				this.$nextTick(function() {
					this.familyInCome = temp + ''
				})
			},
			educationPickerChange(value) {
				let educationArr = value.detail.value
				this.depositTypeListIndex = educationArr
				this.educationBranch = this.depositTypeList[value.detail.value]
				console.log('bbbbbbbbbb', JSON.stringify(this.educationBranch));
			},
			// 家庭年收入验证，前6后2
			inComeValid(e) {
				console.log(e.target.value)
				let val = e.target.value
				val = val.replace(/[^\d\.]/g, "")
				val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
				if (!val || val + '' === '0') {
					this.$nextTick(function() {
						this.familyInCome = ''
					})
					return
				}
				for (var i = 0; i <= 9; i++) {
					var s = '0' + i.toString()
					if (val + '' === s) {
						this.$nextTick(function() {
							this.familyInCome = ''
						})
						console.log(val)
						return
					}
				}
				if (val < 0) {
					val = Math.abs(val)
				}
				// console.log(Math.floor(val * 100)/100)
				// return;
				// val = Math.floor(val * 100) / 100
				if (val >= 999999) {
					const valStr = val + ''
					const w = valStr.indexOf('.')
					if (w > -1) {
						val = valStr.substr(0, 6) + valStr.substr(w, 3)
					} else {
						val = valStr.substr(0, 6)
					}
				}
				console.log(val)
				this.$nextTick(function() {
					this.familyInCome = val + ''
				})
			},
			//自定义键盘完成输入按钮
			onConfirm() {},
			//自定义键盘删除按钮
			onDelete() {
				switch (this.type) {
					case 'number':
						this.numberList.pop();
						break;
					case 'card':
						this.idCardList.pop();
						break;
					case 'money':
						this.moneyList.pop();
						break;
				}
			},
			cardFocus(e) {
				// console.log(e)
				this.bankCardFocus = e.detail.value
			},
			sunNumberFocus(e) {
				// console.log(e)
				this.subNumberFocus = e.detail.value
			},
			amountFocus(e) {
				// console.log(e)
				this.depositAmountFocus = e.detail.value
			},
			cardBlur(e){
				this.bankCardFocus = e.detail.value
			},
			sunNumberBlur(e) {
				// console.log(e)
				this.subNumberFocus = e.detail.value
			},
			amountBlur(e) {
				// console.log(e)
				this.depositAmountFocus = e.detail.value
			},
			//自定义键盘弹出事件
			openKeyBoard(key) {
				uni.hideKeyboard();
				switch (key) {
					case 'number':
						this.numberList = []
						this.numberList = Object.assign([], this.subNumberFocus)
						// this.numberList.push(this.subNumberFocus);
						break;
					case 'card':
						this.idCardList = []
						this.idCardList = Object.assign([], this.bankCardFocus)
						// this.idCardList.push(this.bankCardFocus);
						break;
					case 'money':
						this.moneyList = []
						this.moneyList = Object.assign([], this.depositAmountFocus)
						// this.moneyList.push(this.depositAmountFocus);
						break;
				}
				this.type = key;
				this.$refs[key].open();
			},
			//自定义键盘input事件
			onInput(val) {
				switch (this.type) {
					case 'number':
						if (this.numberList.length >= 6) {
							this.close();
							return;
						};
						this.numberList.push(val);
						break;
					case 'card':
						if (this.idCardList.length >= 19) {
							this.close();
							return;
						};
						this.idCardList.push(val);
						break;
					case 'money':
						this.moneyList.push(val);
						break;
				}

			},
			//身份证有效期处理
			dealValiddate(str) {
				if (str) {
					if (str.indexOf("长期") != -1) {
						str = str.replace('-', "至")
						return str.slice(0, 4) + '-' + str.slice(4, 6) + "-" + str.slice(6, str.length)
					} else {
						return str.slice(0, 4) + '-' + str.slice(4, 6) + "-" + str.slice(6, 8) + "至" + str.slice(9, 13) +
							"-" + str.slice(13, 15) + "-" + str.slice(15.17)
					}

				} else {
					return ""
				}
			},
			//出生日期处理
			dealOcrBirth(str) {
				if (str) {
					return str.replace(/\//g, "-")
				} else {
					return ""
				}
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
					uni.redirectTo({
						url: './credit'
					});
				})
			},
			valid(data) {
				// uni.showToast({
				// 	title: "请填写具体地址"+data.spouseCertID+"--"+data.spouseMobile,
				// 	icon: "none"
				// })
				// return false
				if (!data.bankCard) {
					uni.showToast({
						title: "请填写银行卡号",
						icon: "none"
					})
					return false
				}
				if (!data.childAccount) {
					uni.showToast({
						title: "请填写子账号",
						icon: "none"
					})
					return false
				}

				if (!data.depositAmount) {
					uni.showToast({
						title: "请填写存单金额",
						icon: "none"
					})
					return false
				}
				if (!this.educationBranch) {
					uni.showToast({
						title: "请选择存单种类",
						icon: "none"
					})
					return false
				}


				return true
			},
			//授信数据保存
			formSubmit: function(e) {
				const that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value

				if (!this.valid(formData)) {
					return
				}
				
				uni.showLoading({
					title: "加载中"
				})
				const info = {
					acctNo: formData.bankCard,
					subAcct: formData.childAccount,
					amt: formData.depositAmount,
					depositType: this.educationBranch.code
				};

				this.$request.postAjax(this.$apiUrl.depositQueryAction, info).then(res => {
					uni.hideLoading();
					const infoer = JSON.stringify(res)
					console.log('kkkkkkkkkkk',JSON.stringify(infoer))
					uni.setStorageSync('fixedDepositId', res.fixedDepositId)
					uni.setStorageSync('openBranchNo', res.openBranchNo)
					uni.setStorageSync('coreCustNo', res.coreCustNo)
					if(res.fixedDepositId == '' || res.fixedDepositId == null){
						uni.showToast({
							title: "系统异常",
							icon: "none"
						})
						return
					}
					
					setTimeout(function() {
						{
							uni.navigateTo({
								url: `./depositDetail?infoer=` + infoer
							})
						}
					}, 100);


				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})

			},

		}
	}
</script>

<style scoped lang="less">
	.content-body {
		// background-color: violet;
		display: flex;
		flex-direction: column;
		width: 100%;
		// border-radius: 40rpx;
		font-size: 32rpx;
		color: #333333;
		font-weight: 500;

		// margin-top: 30rpx;
		.application-user-data {
			padding: 5rpx;
			background-color: white;
			margin-top: 20rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;

		}
	}

	.borders {
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}

	// 表单内容

	.form-content {}

	.type-style {
		font-size: 29rpx;
	}

	.married-view {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.item-view-er {
		background-color: white;
		width: 100%;
		padding: 0 12rpx;
		box-sizing: border-box;

		// margin-left: 30rpx;
		.check-img {
			margin-left: 40rpx;
			width: 36rpx;
			height: 36rpx;
			padding: 20rpx 20rpx 20rpx 0;
		}
	}

	// 家庭年收入
	.item-view {
		background-color: white;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		// margin-left: 30rpx;
		.check-img {
			margin-left: 40rpx;
			width: 36rpx;
			height: 36rpx;
			padding: 20rpx 20rpx 20rpx 0;
		}
	}

	.item-input {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 30rpx 0rpx;
		box-sizing: border-box;
		// border-bottom: 2rpx solid #e6e6e6;

		.title-text {
			min-width: 128rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			// margin-left: -16rpx;

		}

		.title-text-st {
			min-width: 128rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-left: 20rpx;
		}

		input {
			margin-left: 40rpx;
			width: 100%;
			font-size: 29rpx;
			// text-align: end;
		}

		picker {
			margin-left: 40rpx;
			width: 100%;
			// font-size: 18rpx;
			// text-align: end;
		}
	}

	.family_img {
		width: 14rpx;
		margin-left: 5rpx;
	}

	.direction-view {
		width: 100%;
		// margin-left: 50rpx;
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

	.horizontal-view-st {
		display: flex;
		align-items: center;


		text {
			font-size: 28rpx;
			margin-top: 30rpx;
			color: #808080;
			width: 100%;
			margin-right: 20rpx;
			margin-left: 30rpx;
		}

		image {
			width: 10rpx;
			margin: 2rpx 10rpx 0 30rpx;
		}
	}

	.horizontal-view-info {
		display: flex;
		align-items: center;

		text {
			margin-left: 30rpx;
			font-size: 28rpx;
			// margin-top: 30rpx;
			color: #808080;
			width: 100%;
		}

		image {
			width: 10rpx;
			margin: 30rpx 10rpx 0 30rpx;
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

	.none-padding-top {
		padding-top: 0;
	}

	.none-padding-bottom {
		padding-bottom: 0;
	}
</style>
