<template>
	<!-- 申请信息页面 -->
	<view>
		<item-nav-bar title="授信申请"></item-nav-bar>
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
							<span class="apply-view-title">申请人信息</span>
						</view>
						<key-value title="姓名" :content="this.orderInfo.username"></key-value>
						<key-value title="性别" :content="this.orderInfo.userSex"></key-value>
						<key-value title="出生日期" :content="dealOcrBirth(this.orderInfo.userBirthday)">
						</key-value>
						<key-value title="证件类型" content="身份证"></key-value>
						<key-value title="证件号码" :content="this.orderInfo.userCertId"></key-value>
						<key-value title="证件有效期"
							:content="dealValiddate(this.orderInfo.userValidBegin,this.orderInfo.userValidEnd)">
						</key-value>
						<key-value title="手机号码" :content="this.orderInfo.userPhone"></key-value>
						<key-value title="民族" :content="((this.orderInfo && this.orderInfo.userFolk) || '') + '族'">
						</key-value>
						<key-value title="国籍" content="中国"></key-value>
						<view class="address-view">
							<view class="vBottom">
								<view class="current-view">
									<image src="../../static/img/star_icon.png" mode="widthFix"></image>
									<text>所在地区</text>
								</view>
								<view class="input-view">
									<text class="province-text">山东省</text>

									<picker @change="bindPickerCity" :value="cityIndex" :range="cityList"
										range-key="name">
										<text class="grayColor" v-if="cityIndex==-1">请选择市</text>
										<text v-else>{{cityList[cityIndex].name}}</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</picker>


									<picker @change="bindPickerCounty" :value="countyIndex" :range="countyList"
										range-key="name">
										<text class="grayColor" v-if="countyIndex==-1">区</text>
										<text v-else>{{countyList[countyIndex].name}}</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</picker>

								</view>
							</view>
						</view>
						<!-- 	<view class="detail-adress-vew">
							<view>
								<input class="detail-address" name="liveAdressDesc" placeholder="请输入具体地址" />
							</view>
						</view> -->
						<view class="item-view">
							<view class=" item-input">
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>详细地址</text>
								</view>
								<view class="direction-view">
									<input class="text-size" name="liveAdressDesc" placeholder="请输入详细地址" />
									<!-- <input name="familyInCome" type='number' placeholder="请输入家庭年收入" /> -->
									<!-- <text class="danwei-text">万元/年</text> -->
								</view>
							</view>
						</view>
						<view class="item-view">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>教育程度</text>
								</view>
								<picker mode="selector" @change="educationPickerChange" :value="multiIndex"
									:range="educationList" range-key="text">
									<view class="grayColor horizontal-view" v-if="multiIndex==-1">
										<text class="text-size">请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-view" v-else>
										<text>
											{{educationList[multiIndex].text}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view>

						<view class="item-view borders">
							<view class="item-input none-border none-padding-bottom">
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>婚姻状况</text>
								</view>
								<view class="married-view">
									<image class="check-img" @click="handleMarried('10')"
										:src="isMarried === '10'?'../../static/img/cerdit/form_icon_marital_selected.png':'../../static/img/cerdit/form_icon_marital_normal.png'">
									</image>未婚
									<image class="check-img" @click="handleMarried('20')"
										:src="isMarried === '20'?'../../static/img/cerdit/form_icon_marital_selected.png':'../../static/img/cerdit/form_icon_marital_normal.png'">
									</image>已婚
								</view>
							</view>
						</view>

						<view class="item-view borders">
							<view class="item-input none-border none-padding-top">
								<view class="title-text">
								</view>
								<view class="married-view">
									<image class="check-img" @click="handleMarried('40')"
										:src="isMarried === '40'?'../../static/img/cerdit/form_icon_marital_selected.png':'../../static/img/cerdit/form_icon_marital_normal.png'">
									</image>离异
									<image class="check-img" @click="handleMarried('30')"
										:src="isMarried === '30'?'../../static/img/cerdit/form_icon_marital_selected.png':'../../static/img/cerdit/form_icon_marital_normal.png'">
									</image>丧偶
								</view>
							</view>
						</view>
						<view class="item-view">
							<view class=" item-input">
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>家庭年收入</text>
								</view>
								<!--  -->
								<view class="direction-view">
									<input name="familyInCome" v-model="familyInCome" @input="inComeValid"
										id="amount-input" type='digit' placeholder="请输入家庭年收入" />
									<text class="danwei-text">万元/年</text>
								</view>
							</view>
						</view>
					<!-- 	<view class="item-view">
							<view class="item-input">

								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>是否农户</text>
								</view>
								<picker mode="selector" @change="farmersListPickerChange" :value="farmersListIndex"
									:range="farmersList" range-key="text">
									<view class="grayColor horizontal-view" v-if="farmersListIndex==-1">
										<text class="text-size">请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-view" v-else>
										<text>
											{{farmersList[farmersListIndex].text}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view> -->
						<view class="item-view" v-if="this.farmerCard == 'Y'">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>是否有营业执照</text>
								</view>
								<picker mode="selector" @change="businessLicensePickerChange"
									:value="businessLicenseListIndex" :range="businessLicenseList" range-key="text">
									<view class="grayColor horizontal-view" v-if="businessLicenseListIndex==-1">
										<text class="text-size">请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-view" v-else>
										<text>
											{{businessLicenseList[businessLicenseListIndex].text}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view>
					</view>
					<!-- v-if="isMarried" -->


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
		cityList
	} from "../../common/addata.js"
	import {
		educationList,
		farmers,
		businessLicense
	} from "../../common/projectFormConfig.js"
	import {
		checkMobile
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
				cityList: cityList,
				cityIndex: -1,
				countyList: cityList[0].list,
				countyIndex: -1,
				isAgree: false,
				isMarried: '10',
				currentBranch: "",
				educationBranch: '', //教育程度
				applyNo: "",
				grantId: "",
				farmerCard: '',
				farmersList: farmers,
				farmersListIndex: -1,
				farmers: '',
				businessLicenseList: businessLicense,
				businessLicenseListIndex: -1,
				businessLicense: '',
				educationList: educationList, //教育程度下拉列表
				multiIndex: -1,
				classAList: [],
				secondList: [],
				tertiaryList: [],
				recmmendName: "",
				recmmend: "",
				type: 'number', //键盘类型判断
				numberList: [], //数字键盘数组
				idCardList: [], //身份证键盘数组
				familyInCome: '', //家庭年收入
			}
		},
		onLoad() {
			this.farmerCard = uni.getStorageSync('farmerCard')
			console.log(this.farmerCard)
			sessionStorage.alreadyRead = false
			this.phone = getApp().globalData.phone || uni.getStorageSync("phone")
			let searchURL = window.location.search;
			searchURL = searchURL.substring(1, searchURL.length);
			this.bizToken = searchURL.split("&")[0].split("=")[1];
			getApp().globalData.bizToken = this.bizToken
			uni.setStorageSync('bizToken', this.bizToken)
			//调用腾讯核身结果
			// this.getDetectInfoAction()
			//获取机构列表
			this.getUserInfoAction()
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
			//身份证有效期处理
			dealValiddate(str, st) {
				if (str, st) {
					if (st.indexOf("长期") != -1) {
						str = str.replace('-', "至")
						return str.slice(0, 4) + '-' + str.slice(4, 6) + "-" + str.slice(6, str.length)
					} else {
						return str.slice(0, 4) + '-' + str.slice(4, 6) + "-" + str.slice(6, 8) + "至" + st.slice(0, 4) +
							"-" + st.slice(4, 6) + "-" + st.slice(6.8)
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
			businessLicensePickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.businessLicenseListIndex = educationArr
				this.businessLicense = this.businessLicenseList[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.farmers.code));
			},
			//教育程度选择
			educationPickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.multiIndex = educationArr
				this.educationBranch = this.educationList[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.educationBranch.code));
			},

			farmersListPickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.farmersListIndex = educationArr
				this.farmers = this.farmersList[value.detail.value]
				if ((this.farmers.code == 1 && this.farmerCard == '') || (this.farmers.code == 1 && this.farmerCard == 'Y')  ) {
					this.queryCorrespondingCardAction()
				} else {

				}
				console.log('ccccccccc', JSON.stringify(this.farmers.code));
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
			queryCorrespondingCardAction() {
				uni.showLoading({
					title: "加载中"
				})
				//获取订单信息
				this.$request.postAjax(this.$apiUrl.queryCorrespondingCardAction, {}).then(res => {
					console.log('身份证信息：', res);
					this.farmerCard = res.result;
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},
			getUserInfoAction() {
				uni.showLoading({
					title: "加载中"
				})
				//获取订单信息
				this.$request.postAjax(this.$apiUrl.getUserInfoAction, {}).then(res => {
					console.log('身份证信息：', res);
					this.orderInfo = res
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},
			//选择城市
			bindPickerCity(e) {
				this.cityIndex = e.detail.value
				this.countyList = this.cityList[this.cityIndex].list
				this.countyIndex = 0
			},
			//选择县
			bindPickerCounty(e) {
				if (this.cityIndex == -1) {
					uni.showToast({
						title: "请先选择市",
						icon: "none"
					})
					return
				}
				this.countyIndex = e.detail.value

			},
			bindPickerCityTwo(e) {
				this.cityIndexTwo = e.detail.value
				this.countyListTwo = this.cityListTwo[this.cityIndexTwo].list
				this.countyIndexTwo = 0
			},
			bindPickerCountyTwo(e) {
				this.countyIndexTwo = e.detail.value

			},
			valid(data) {
				// uni.showToast({
				// 	title: "请填写具体地址"+data.spouseCertID+"--"+data.spouseMobile,
				// 	icon: "none"
				// })
				// return false
				if (!this.educationBranch) {
					uni.showToast({
						title: "请选择教育程度",
						icon: "none"
					})
					return false
				}
				if (this.cityIndex == -1) {
					uni.showToast({
						title: "请选择市区",
						icon: "none"
					})
					return false
				}
				if (!data.liveAdressDesc) {
					uni.showToast({
						title: "请填写具体地址",
						icon: "none"
					})
					return false
				}
				if (!data.familyInCome) {
					uni.showToast({
						title: "请填写家庭年收入",
						icon: "none"
					})
					return false
				}
				if (data.familyInCome > 1000 || data.familyInCome < 1) {
					uni.showToast({
						title: "年收入不能低于1万元，不能高于1000万元",
						icon: "none"
					})
					return false
				}
				// if (!this.farmers) {
				// 	uni.showToast({
				// 		title: "请选择是否农户",
				// 		icon: "none"
				// 	})
				// 	return false
				// }
				// if (this.farmers.code == 1 && this.farmerCard == 'N') {
				// 	uni.showToast({
				// 		title: "您选择的贷款主体为农户，未查到我行惠农卡信息，请核实后再进行下一步操作",
				// 		icon: "none"
				// 	})
				// 	return false
				// }
				return true
			},
			//授信数据保存
			formSubmit: function(e) {
				// const that = this;
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// let formData = e.detail.value



				const that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value
				if (!this.valid(formData)) {
					return
				}
				const info = {
					liveAddress: formData.liveAdressDesc, //当前居住地址
					liveProvinceCode: '370000',
					liveCityCode: this.cityList[this.cityIndex].code,
					liveAreaCode: this.countyList[this.countyIndex].code,
					highestEducation: this.educationBranch.code, //教育程度
					familyInCome: formData.familyInCome, //家庭年收入
					marriageState: this.isMarried, //婚姻状况
					isPeasant: this.farmerCard == 'Y' ? '1' : '0',
					isBusiness: this.farmerCard == 'Y' ? this.businessLicense.code : "1",
				};
				const infoer = JSON.stringify(info)
				if (this.farmerCard == 'Y' && this.businessLicense.code == '0') {
					uni.navigateTo({
						url: `./otherInformation?infoer=` + infoer
					})
				} else {
					uni.navigateTo({
						url: `./enterpriseInformation?infoer=` + infoer
					})
				}

			},

			//是否已婚
			handleMarried(isMarried) {
				this.isMarried = isMarried
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

	/deep/ .text-size {
		font-size: 30rpx;
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

	//当前居住地址
	.address-view {
		width: 100%;
		background-color: white;
		box-sizing: border-box;
		padding: 0 30rpx;

		.vBottom {
			border-bottom: 2rpx solid #e6e6e6;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			padding: 30rpx 0;
			font-size: 32rpx;
			color: #333333;
			align-items: center;
			font-weight: 500;
		}

		.current-view {
			display: flex;
			flex-direction: row;
			align-items: center;
			min-width: 186rpx;

			image {
				width: 14rpx;
				margin-left: 5rpx;
			}
		}
	}

	.input-view {
		width: 100%;
		display: flex;
		flex-direction: row;
		// justify-content: flex-end;
		font-size: 32rpx;
		margin-left: 40rpx;

		.province-text {
			margin-right: 15rpx;
		}

		image {
			width: 20rpx;
			margin: 0 15rpx;
		}
	}


	//具体地址
	.detail-adress-vew {
		background-color: white;
		padding: 40rpx 30rpx 0rpx 30rpx;

		view {
			border-bottom: 2rpx solid #e6e6e6;
			padding-bottom: 40rpx;
		}
	}

	.detail-address {
		text-align: end;

		width: 100%;
		word-break: break-all;
		overflow-wrap: break-word;
		word-wrap: break-word;
		box-sizing: border-box;

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

	.item-input {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 30rpx 0rpx;
		font-size: 32rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #e6e6e6;

		.title-text {
			min-width: 186rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		input,
		picker {
			margin-left: 40rpx;
			width: 100%;
			font-size: 30rpx;
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
			font-size: 32rpx;
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
		background-color: #cccccc;
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

	.process_er_cc {
		height: 4rpx;
		width: 640rpx;
		background-color: #cccccc;
	}

	.direction-view {
		width: 100%;
		// margin-left: 50rpx;
		font-size: 32rpx;
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

	//申请人配偶信息
	.sqr-txt {
		background-color: white;
		padding: 30rpx 30rpx;
		font-weight: 500;
		font-size: 36rpx;
		color: var(--color-orange-text);
		margin-top: 30rpx;
		margin-bottom: 0;
		// border-bottom: 2rpx solid #e6e6e6;
		margin-bottom: 0;
	}

	.min-width-text {
		min-width: 300rpx;
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
		font-size: 30rpx;
		color: #808080;
	}

	.direction-view-size {
		font-size: 30rpx;
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

	/deep/ .uni-input-input {
		position: relative;
		display: block;
		height: 100%;
		background: none;
		color: inherit;
		opacity: 1;
		font-size: 32rpx;
		line-height: inherit;
		letter-spacing: inherit;
		text-align: inherit;
		text-indent: inherit;
		text-transform: inherit;
		text-shadow: inherit;
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
</style>
