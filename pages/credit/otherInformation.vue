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
							<view class="process"></view>

							<image src="../../static/img/03icon_txh.png" mode="widthFix" class="family_img_liu"></image>
							<view class="process"></view>
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

						<!-- <h3 class="sqr-txt">办理信息</h3> -->
						<view class="apply-view">
							<image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image>
							<span class="apply-view-title">工作信息</span>
						</view>
						<view class="item-view">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>单位所属行业</text>
								</view>
								<picker mode="selector" @change="IndustryPickerChange" :value="IndustryListIndex"
									:range="IndustryList" range-key="text">
									<view class="grayColor horizontal-viewer" v-if="IndustryListIndex==-1">
										<text>请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-viewer" v-else>
										<text>
											{{IndustryList[IndustryListIndex].text}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view>
						<view class="item-view">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>职业</text>
								</view>
								<picker mode="selector" @change="professionalPickerChange" :value="professionalIndex"
									:range="professionalList" range-key="text">
									<view class="grayColor horizontal-viewer" v-if="professionalIndex==-1">
										<text>请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-viewer" v-else>
										<text>
											{{professionalList[professionalIndex].text}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view>
						<view class="item-view">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>职务</text>
								</view>
								<picker mode="selector" @change="positionPickerChange" :value="positionIndex"
									:range="positionList" range-key="text">
									<view class="grayColor horizontal-viewer" v-if="positionIndex==-1">
										<text>请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-viewer" v-else>
										<text>
											{{positionList[positionIndex].text}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view>
						<view class="item-view">
							<view class=" item-input">
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>单位名称</text>
								</view>
								<view class="direction-view">
									<input name="unit" placeholder="请输入单位名称" v-model="enterpriseName" />
								</view>
							</view>
						</view>
						<view class="address-view">
							<view class="vBottom">
								<view class="current-view">
									<image src="../../static/img/star_icon.png" mode="widthFix"></image>
									<text>现工作单位地址</text>
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
						<view class="item-view">
							<view class=" item-input">
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>详细地址</text>
								</view>
								<view class="direction-view">
									<input name="liveAdressDesc" placeholder="请输入详细地址" />
									<!-- <input name="familyInCome" type='number' placeholder="请输入家庭年收入" /> -->
									<!-- <text class="danwei-text">万元/年</text> -->
								</view>
							</view>
						</view>
					</view>
					<view class="application-user-data">
						<view class="apply-view">
							<image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image>
							<span class="apply-view-title">紧急联系人信息</span>
							<image class="img-block-add" src="../../static/img/cerdit/add.png" mode="widthFix"
								@click="onClickAddRelation"></image>
						</view>
						<!-- 						<template #right>
						    <view class="delete_btn" @click="deleteIdent(index)">删除</view>
						</template>
						 -->
						<view class="item-view">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>关系1</text>

								</view>
								<u-select v-model="show" mode=single-column :list="relationshipList" @confirm="confirm">

								</u-select>
								<view @click="show = true" class='relationshipListClass'>
									<view class="grayColor horizontal-view" v-if="relationship == ''">
										<text class="choosestyle">请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png"
											class="chooseImage" mode="widthFix"></image>
									</view>
									<view class="horizontal-view" v-else>
										<text class="choosestyleer"> {{this.relationship.label}}</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png"
											class="chooseImage" mode="widthFix"></image>
									</view>


								</view>


							</view>
						</view>

						<view class="item-view">
							<view class=" item-input">
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>姓名</text>
								</view>
								<view class="direction-view">
									<input name="thename" placeholder="请输入姓名" />
								</view>
							</view>
						</view>
						<view class="item-view">
							<view class="item-input none-border">
								<!-- 输入框 -->
								<view class="title-text">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>联系电话</text>
								</view>
								<input name="childAccount" @tap="openKeyBoard('number')" :value="telStr" type='number' @focus="sunNumberFocus" @blur="sunNumberBlur"
									placeholder="请输入联系电话" maxlength="11" />
							</view>
						</view>
						<uni-swipe-action-item :right-options="options1" @click="bindClick(2)">
							<view class="content-box" @click="contentClick">
								<text class="content-text">
									<view class="item-view"
										v-if='this.currentRelation == 2 || this.currentRelation == 3'>
										<view class="item-input">
											<!-- 输入框 -->
											<view class=" title-text ">
												<image src="../../static/img/star_icon.png" mode="widthFix"
													class="family_img"></image>
												<text>关系2</text>
											</view>
											<picker mode="selector" @change="relationshipListPickerChange2"
												:value="relationshipListIndex2" :range="relationshipList2"
												range-key="text">
												<view class="grayColor horizontal-viewer"
													v-if="relationshipListIndex2==-1">
													<text>请选择</text>
													<image src="../../static/img/cerdit/form_icon_rightarrow.png"
														mode="widthFix"></image>
												</view>
												<view class="horizontal-viewer" v-else>
													<text>
														{{relationshipList2[relationshipListIndex2].text}}
													</text>
													<image src="../../static/img/cerdit/form_icon_rightarrow.png"
														mode="widthFix"></image>
												</view>

											</picker>
										</view>
									</view>
									<view class="item-view"
										v-if='this.currentRelation == 2 || this.currentRelation == 3'>
										<view class=" item-input">
											<view class="title-text">
												<image src="../../static/img/star_icon.png" mode="widthFix"
													class="family_img"></image>
												<text>姓名</text>
											</view>
											<view class="direction-view">
												<input name="thename2" placeholder="请输入姓名" />
											</view>
										</view>
									</view>
									<view class="item-view"
										v-if='this.currentRelation == 2 || this.currentRelation == 3'>
										<view class="item-input none-border">
											<!-- 输入框 -->
											<view class="title-text">
												<image src="../../static/img/star_icon.png" mode="widthFix"
													class="family_img"></image>
												<text>联系电话</text>
											</view>
											<input name="bankCard" @tap="openKeyBoard('card')" :value="passStr" @focus="cardFocus" @blur="cardBlur"
												type='number' placeholder="请输入联系电话" maxlength="11" />
										</view>
									</view>
								</text>
							</view>
						</uni-swipe-action-item>
						<uni-swipe-action-item :right-options="options1" @click="bindClick(3)">
							<view class="content-box" @click="contentClick">
								<text class="content-text">
									<view class="item-view" v-if='this.currentRelation == 3'>
										<view class="item-input">
											<!-- 输入框 -->
											<view class=" title-text ">
												<image src="../../static/img/star_icon.png" mode="widthFix"
													class="family_img"></image>
												<text>关系3</text>
											</view>
											<picker mode="selector" @change="relationshipListPickerChange3"
												:value="relationshipListIndex3" :range="relationshipList3"
												range-key="text">
												<view class="grayColor horizontal-viewer"
													v-if="relationshipListIndex3==-1">
													<text>请选择</text>
													<image src="../../static/img/cerdit/form_icon_rightarrow.png"
														mode="widthFix"></image>
												</view>
												<view class="horizontal-viewer" v-else>
													<text>
														{{relationshipList3[relationshipListIndex3].text}}
													</text>
													<image src="../../static/img/cerdit/form_icon_rightarrow.png"
														mode="widthFix"></image>
												</view>

											</picker>
										</view>
									</view>
									<view class="item-view" v-if='this.currentRelation == 3'>
										<view class=" item-input">
											<view class="title-text">
												<image src="../../static/img/star_icon.png" mode="widthFix"
													class="family_img"></image>
												<text>姓名</text>
											</view>
											<view class="direction-view">
												<input name="thename3" placeholder="请输入姓名" />
											</view>
										</view>
									</view>
									<view class="item-view" v-if='this.currentRelation == 3'>
										<view class="item-input none-border">
											<!-- 输入框 -->
											<view class="title-text">
												<image src="../../static/img/star_icon.png" mode="widthFix"
													class="family_img"></image>
												<text>联系电话</text>
											</view>
											<input name="depositAmount" @tap="openKeyBoard('money')" :value="moneyStr" @focus="amountFocus" @blur="amountBlur"
												type='number' placeholder="请输入联系电话" maxlength="11" />
										</view>
									</view>
								</text>
							</view>
						</uni-swipe-action-item>

					</view>


					<view class="application-user-data">

						<!-- <h3 class="sqr-txt">办理信息</h3> -->
						<view class="apply-view">
							<image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image>
							<span class="apply-view-title">办理信息</span>
						</view>
						<view class="item-view">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text ">
									<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img">
									</image>
									<text>办理机构</text>
								</view>
								<picker mode="multiSelector" @change="bindMultiPickerChange"
									@columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="btranthList"
									range-key="branthName">
									<view class="grayColor horizontal-viewer" v-if="multiIndex[0]==-1">
										<text>请选择</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>
									<view class="horizontal-viewer" v-else>
										<text>
											{{btranthList[0].length>0?btranthList[0][multiIndex[0]].branthName+',':''}}{{btranthList[1].length>0?btranthList[1][multiIndex[1]].branthName:''}}
										</text>
										<image src="../../static/img/cerdit/form_icon_rightarrow.png" mode="widthFix">
										</image>
									</view>

								</picker>
							</view>
						</view>


						<view class="item-view">
							<view class="item-input">
								<!-- 输入框 -->
								<view class=" title-text">
									<text>推荐人工号</text>
								</view>
								<input name="recmmend" placeholder="请输入推荐人工号(选填)" type="number" @blur="getRecmmendName"
									:value="recmmend" v-model="recmmend" />
							</view>
						</view>

					</view>
					<view class="sq-view">
						<view class="check-view" @click="handleAgree">
							<image class="check-img"
								:src="isAgree?require('../../static/img/cerdit/form_icon_agree.png'):require('../../static/img/cerdit/form_icon_disagree.png')">
							</image>
							<text class="agree-tip">我已阅读并同意签署</text>
						</view>

						<view class="text-name" @click="singleAgree('credit')">《日照银行个人信用报告查询授权书》</view>
						<view class="text-name" @click="singleAgree('tripartite')">《日照银行个人信息查询授权书》</view>
					</view>

					<button class="button" type="primary" form-type="submit">提交</button>
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
		checkMobile
	} from "../../utils/index.js"
	import {
		cityList
	} from "../../common/addata.js"
	import {
		vocation_code_list,
		position_code_list,
		relation_type_list,
		relation_type_list_marry,
		relation_type_list_ismarry,
		Industry,
		relation_type_list_ismarry_select,
		relation_type_list_marry_select
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
				show: false,
				isOpened: 'none',
				options1: [{

					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}

				}],
				marriageStatus: '',
				cityList: cityList,
				cityIndex: -1,
				countyList: cityList[0].list,
				countyIndex: -1,
				info: {},
				currentRelation: 1,
				st: {},
				userInfo: {}, //用户信息
				applyInfoCheck: {}, //用款信息
				attachments: [], //影像文件列表
				bizToken: '',
				orderInfo: {},
				phone: '',
				isAgree: false,
				enterpriseName: '',
				currentBranch: "",
				applyNo: "",
				grantId: "",
				multiIndex: [-1, -1,],
				btranthList: [
					[],
					[]
				],
				// relationshipLister:'',
				classAList: [],
				secondList: [],
				tertiaryList: [],
				occupation: '',
				contactList: [],
				relationObj1: {},
				IndustryList: Industry,
				IndustryListIndex: -1,
				recmmendName: "",
				recmmend: "",
				relationshipList3: '', //关系列表
				relationshipList2: '', //关系列表
				relationshipList: '', //关系列表
				relationshipListIndex: -1,
				relationshipListIndex2: -1,
				relationshipListIndex3: -1,
				relationship: '',
				relationship2: '',
				relationship3: '',
				professionalList: vocation_code_list, //职业列表
				positionList: position_code_list, //职务列表
				professionalIndex: -1,
				positionIndex: -1,
				position: '',
				professional: '',
				type: 'number', //键盘类型判断
				numberList: [], //数字键盘数组
				idCardList: [], //身份证键盘数组
				moneyList: [],
				bankCardFocus: '', //银行卡号聚焦输入的数据
				subNumberFocus: '', //子账号聚焦前输入的数据
				depositAmountFocus: '', //存单金额聚焦前输入的数据
				// familyInCome: '',//家庭年收入
			}
		},
		onLoad(e) {
			if (e.infoer) {
				this.info = JSON.parse(decodeURIComponent(e.infoer))
			}
			this.enterpriseName = this.info.enterpriseName
			console.log('sdfghjklyxrchjk' + JSON.stringify(this.info))
			// console.log('sdfghjklyxrchjk' + this.info)
			// if(this.info.marriageStatus == 10){
			// 	const 
			// }
			this.marriageStatus = this.info.marriageState;
			if (this.marriageStatus != 20) {
				this.relationshipList = relation_type_list_ismarry_select;
				this.relationshipList2 = relation_type_list_ismarry;
				this.relationshipList3 = relation_type_list_ismarry;
			} else {
				this.relationshipList = relation_type_list_marry_select;
				this.relationshipList2 = relation_type_list;
				this.relationshipList3 = relation_type_list;
			}
			sessionStorage.alreadyRead = false
			this.phone = getApp().globalData.phone || uni.getStorageSync("phone")
			// let searchURL = window.location.search;
			// searchURL = searchURL.substring(1, searchURL.length);
			// this.bizToken = searchURL.split("&")[0].split("=")[1];
			// getApp().globalData.bizToken = this.bizToken
			// uni.setStorageSync('bizToken', this.bizToken)

			// //调用腾讯核身结果
			// this.getDetectInfoAction()
			// //获取机构列表
			this.getBtranthList()

		},
		onShow() {

			const alreadyRead = JSON.parse(sessionStorage.alreadyRead)
			// const redBPP = this.$gfdGlobalData.getData('redBPP')
			// console.log('vvvvv',redBPP)
			// const singleAgree = this.$gfdGlobalData.getData('singleAgree')
			// console.log('mmmmmm',singleAgree)

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
			bindClick(e) {
				console.log(e);
				if (this.currentRelation == 3 && e == 2) {
					uni.showToast({
						title: `请先删除关系3`,
						icon: 'none'
					});
				} else if (this.currentRelation == 3 && e == 3) {
					this.currentRelation = 2
					this.relationObj3.relation = '',
						this.relationObj3.name = '',
						this.relationObj3.mobileNo = ''
				} else {
					this.currentRelation = 1
					this.relationObj2.relation = '',
						this.relationObj2.name = '',
						this.relationObj2.mobileNo = ''
				}
				console.log('333333333', this.currentRelation)
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
			cardBlur(e) {
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
						if (this.numberList.length >= 11) {
							this.close();
							return;
						};
						this.numberList.push(val);
						break;
					case 'card':
						if (this.idCardList.length >= 11) {
							this.close();
							return;
						};
						this.idCardList.push(val);
						break;
					case 'money':
						if (this.moneyList.length >= 11) {
							this.close();
							return;
						};
						this.moneyList.push(val);
						break;
				}

			},
			onClickAddRelation() {
				if (this.currentRelation == 3) {
					uni.showToast({
						title: "最多可添加三条紧急联系人信息",
						icon: "none"
					})
					return
				}
				this.currentRelation += 1
				console.log('333333333', this.currentRelation)
			},
			// 办理机构选择
			bindMultiPickerChange(e) {
				let multiArray = this.btranthList
				let arr = e.detail.value;
				let branch = multiArray[1][arr[1]].branthNo;
				this.multiIndex = arr
				this.currentBranch = branch
			},
			bindMultiPickerColumnChange(e) {
				// console.log(e.detail.value)
				// if(this.multiIndex[0] == -1){
				// 	 this.btranthList[1] = [];
				// 	let defaulter = this.classAList[0].branthNo
				// 	let iden2 = defaulter.split('-')[1];
				// 	this.secondList.forEach((item) => {
				// 		let list3arr2 = item.branthNo.split('-');
				// 		if (list3arr2[1] == iden2) {
				// 			this.btranthList[1].push(item);
				// 		}
				// 	});
				// 	 this.multiIndex[0] = e.detail.value;
				// }
				// console.log('kkkkkkkkkkk',e.detail.column)
				var data = {
					multiArray: this.btranthList,
					secondList: this.classAList,
					multiIndex: this.multiIndex,
					tertiaryList: this.secondList
				};
				
				switch (e.detail.column) {
					case 0:
						data.multiArray[1] = [];
						let secondObj = data.secondList[e.detail.value];
						// console.log('lllllllllllll',JSON.stringify(secondObj))
						let iden = secondObj.branthNo.split('-')[1];
						data.tertiaryList.forEach((item) => {
							let list3arr = item.branthNo.split('-');
							if (list3arr[1] == iden) {
								data.multiArray[1].push(item);
							}
						});
						data.multiIndex[0] = e.detail.value;
					case 1:
						data.multiIndex[1] = e.detail.value;
						break;

					case 2:
						break;

				}
			
				this.btranthList = data.multiArray
				this.multiIndex = data.multiIndex
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
			relationshipListPickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.relationshipListIndex = educationArr
				this.relationship = this.relationshipList[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.relationship));
			},
			relationshipListPickerChange2(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.relationshipListIndex2 = educationArr
				this.relationship2 = this.relationshipList2[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.relationship));
			},
			relationshipListPickerChange3(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.relationshipListIndex3 = educationArr
				this.relationship3 = this.relationshipList3[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.relationship));
			},
			//获取机构列表
			getBtranthList() {
				this.$request.postAjax(this.$apiUrl.queryBtranthList, {
					"queryType": "00",
					"branthNo": ""
				}).then(res => {
					console.log('branthList：', res.branthList);
					let branthList = [];
					let classAList = [];
					let secondList = [];
					let tertiaryList = [];
					let st = [];
					res.branthList.forEach((item) => {
						let arr = item.branthNo.split('-');
						if (arr.length == '1') {
							// classAList.push(item);
						} else if (arr.length == '2') {
							st.push(item);
						} else {
							st.push(item);
						}
					});
					console.log('mmmmmmmmm', JSON.stringify(st))
					st.forEach((item) => {
						let arrtwo = item.branthNo.split('-');

						if (arrtwo.length == '2') {
							classAList.push(item);
						} else {
							secondList.push(item);
						}
					});
					branthList = [classAList, []];
					
					if (classAList.length > 0) {
						let iden = classAList[0].branthNo.split('-')[1];
						// console.log('ooooooooooo',iden)
						secondList.forEach((item) => {
							let list3arr = item.branthNo.split('-');
							// console.log('ooooooooooo',list3arr)
							if (list3arr[1] == iden) {
								branthList[1].push(item);
								// console.log('ooooooooooo',JSON.stringify(branthList[1]))
							}
						});
					}
					this.btranthList = branthList
					this.classAList = classAList
					this.secondList = secondList
					// this.tertiaryList = tertiaryList
					if (this.btranthList[0].length > 0) {
						if (this.btranthList[1].length > 0) {
							if (this.btranthList[2].length > 0) {
								this.currentBranch = this.btranthList[2][0].branthNo
							} else {
								this.currentBranch = this.btranthList[1][0].branthNo
							}
						} else {
							this.currentBranch = this.btranthList[0][0].branthNo
						}
					}
					if (this.multiIndex[0] == -1) {
						this.currentBranch = ''
					}
				}).catch(error => {
					console.log(error);
				})
			},

			valid(data) {
				if (!this.occupation) {
					uni.showToast({
						title: "请选择单位所属行业",
						icon: "none"
					})
					return false
				}
				if (!this.professional) {
					uni.showToast({
						title: "请选择职业",
						icon: "none"
					})
					return false
				}
				if (!this.position) {
					uni.showToast({
						title: "请选择职务",
						icon: "none"
					})
					return false
				}
				if (!data.unit) {
					uni.showToast({
						title: "请填写单位名称",
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
						title: "请填写详细地址",
						icon: "none"
					})
					return false
				}
				if (!this.relationship) {
					uni.showToast({
						title: "请选择关系1",
						icon: "none"
					})
					return false
				}
				if (!data.thename) {
					uni.showToast({
						title: "请填写关系1中的姓名",
						icon: "none"
					})
					return false
				}
				if (!data.childAccount) {
					uni.showToast({
						title: "请填写关系1中的电话",
						icon: "none"
					})
					return false
				}
				if (((this.currentRelation == 2) || (this.currentRelation == 3)) && !this.relationship2) {
					uni.showToast({
						title: "请填写关系2中关系或者左滑删除",
						icon: "none"
					})
					return false
				}
				if (((this.currentRelation == 2) || (this.currentRelation == 3)) && !data.thename2) {
					uni.showToast({
						title: "请填写关系2中姓名或者左滑删除",
						icon: "none"
					})
					return false
				}
				if (((this.currentRelation == 2) || (this.currentRelation == 3)) && !data.bankCard) {
					uni.showToast({
						title: "请填写关系2中电话或者左滑删除",
						icon: "none"
					})
					return false
				}
				if ((this.currentRelation == 3) && !this.relationship3) {
					uni.showToast({
						title: "请填写关系3中关系或者左滑删除",
						icon: "none"
					})
					return false
				}
				if ((this.currentRelation == 3) && !data.thename3) {
					uni.showToast({
						title: "请填写关系3中姓名或者左滑删除",
						icon: "none"
					})
					return false
				}
				if ((this.currentRelation == 3) && !data.depositAmount) {
					uni.showToast({
						title: "请填写关系3中电话或者左滑删除",
						icon: "none"
					})
					return false
				}
				if (!this.currentBranch) {
					uni.showToast({
						title: "请选择办理机构",
						icon: "none"
					})
					return false
				}
				if (!this.isAgree) {
					uni.showToast({
						title: "请先阅读并同意授权书",
						icon: "none"
					})
					return
				}
				return true
			},
			//授信数据保存
			formSubmit: function(e) {
				console.log('ccc', this.currentBranch)
				if (this.cityIndex == -1) {
					uni.showToast({
						title: "请选现工作单位地址",
						icon: "none"
					})
					return false
				}
				const that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value
				const phone = uni.getStorageSync('phone')
				console.log('kkkkkkk' + phone)
				this.relationObj1 = {
					relation: this.relationship.value,
					name: formData.thename,
					mobileNo: formData.childAccount,
					certificateType: '0',

				}
				this.relationObj2 = {
					relation: this.relationship2.code,
					name: formData.thename2,
					mobileNo: formData.bankCard,
					certificateType: '0',
				}
				this.relationObj3 = {
					relation: this.relationship3.code,
					name: formData.thename3,
					mobileNo: formData.depositAmount,
					certificateType: '0',
				}
				console.log('吧吧vv', JSON.stringify(this.contactList.length))
				if (this.currentRelation === 1) {
					this.contactList = []
					this.contactList.splice(0, 0, this.relationObj1);
				} else if (this.currentRelation === 2) {
					this.contactList = []
					this.contactList.splice(0, 0, this.relationObj1);
					this.contactList.splice(1, 0, this.relationObj2);
				} else if (this.currentRelation === 3) {
					this.contactList = []
					this.contactList.splice(0, 0, this.relationObj1);
					this.contactList.splice(1, 0, this.relationObj2);
					this.contactList.splice(2, 0, this.relationObj3);
				}
				console.log('吧吧vv', JSON.stringify(this.contactList))
				const infos = {
					productId: 'ZYD001',
					vocationCode: this.professional.code,
					position: this.position.text,
					workName: formData.unit,
					workAddrAreaCode: this.countyList[this.countyIndex].code,
					workAddrAddress: '山东省' + this.cityList[this.cityIndex].name + this.countyList[this.countyIndex]
						.name + formData.liveAdressDesc,
					branch: this.currentBranch ? this.currentBranch : uni.getStorageSync('openBranchNo'),
					bankEmpNo: formData.recmmend,
					contactList: this.contactList,
					workAddCityCode: this.cityList[this.cityIndex].code,
					workAddProvinceCode: '370000',
					occupation: this.occupation.code,
					// bankEmpNo: this.data.operatorId,
					// recmmend: this.data.operatorId,
				};
				const infoer = {
					...this.info,
					...infos
				};
				uni.setStorageSync('infoer', infoer)
				console.log('fffffff' + JSON.stringify(infoer))
				if (!this.valid(formData)) {
					return
				}

				uni.navigateTo({
					url: `../common/smsVerification/smsVerification?type=otherInformation`
				})

			},
			confirm(e) {
				this.relationship = e[0];
				console.log('bbbbbbbbbb', JSON.stringify(this.relationship));
				// let educationArr = value.detail.value
				// this.relationshipListIndex = educationArr
				// this.relationship = this.relationshipList[value.detail.value]
				// console.log('ccccccccc', JSON.stringify(this.relationship));
			},
			singleAgree(status) {
				if (this.$gfdGlobalData.getData('openReader')) {
					// switch (status){
					// 	case 'borrow':
					// 		this.$gfdGlobalData.setData("borrow", 'true')
					// 		break;
					// 	case 'pledge':
					// 		this.$gfdGlobalData.setData("pledge", 'true')
					// 		break;
					// 	case 'promise':
					// 		this.$gfdGlobalData.setData("promise", 'true')
					// 		break;
					// 	default:
					// 		break;
					// }
					if (this.isAgree) {
						this.$gfdGlobalData.setData("singleAgree", 'false')
						this.redeayRequest(status)
					} else {
						uni.showToast({
							title: "请先勾选我已阅读并同意签署",
							icon: "none"
						})
					}

				}
			},
			redeayRequest(stflag) {
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.queryContractProtocol, {
					"contractType": stflag, //"credit,tripartite",
					"productId": "ZYD001",
					'liveAddress': this.info.liveAddress
				}).then(res => {
					uni.hideLoading();
					console.log('文本地址：', res);
					getApp().globalData.contractInfoList = res.contractInfoList
					uni.navigateTo({
						url: '../../component/ReadDocument'
					})
				}).catch(error => {
					uni.hideLoading();
					this.isAgree = false;
					console.log(error);
				});
			},
			//是否同意
			handleAgree() {
				this.isAgree = !this.isAgree
				if (!this.isAgree) {
					sessionStorage.alreadyRead = false
				}
				if (this.isAgree && getApp().globalData.openReader) {
					this.redeayRequest("credit,tripartite")
				}
			},
			// 获取客户经理姓名
			getRecmmendName() {

				uni.showLoading({
					title: "加载中"
				});
				this.$request.postAjax(this.$apiUrl.queryOrganTreeByRoleAction, {
					"productId": "ZYD001",
					"organId": this.currentBranch,
					"recmmend": this.recmmend
				}).then(res => {
					uni.hideLoading();
					console.log('获取客户经理名称：', res);
					this.recmmendName = res.recmmendName

				}).catch(error => {
					uni.hideLoading();
					this.recmmendName = ""
					console.log(error);
				});
			},

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
			IndustryPickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.IndustryListIndex = educationArr
				this.occupation = this.IndustryList[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.occupation));
			},
			//职业
			professionalPickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.professionalIndex = educationArr
				this.professional = this.professionalList[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.professional));
			},
			//职务
			positionPickerChange(value) {
				console.log('bbbbbbbbbb', JSON.stringify(value));
				let educationArr = value.detail.value
				this.positionIndex = educationArr
				this.position = this.positionList[value.detail.value]
				console.log('ccccccccc', JSON.stringify(this.position));
			},

			// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。

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

				.img-block-add {
					margin-left: 320rpx;
					width: 40rpx;
					height: 40rpx;
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
		margin-left: 40rpx;

		.province-text {
			margin-right: 15rpx;
		}

		image {
			width: 20rpx;
			margin: 0 15rpx;
		}
	}

	.horizontal-view {
		width: 440rpx;
		display: flex;
		align-items: center;
	}

	.horizontal-view uni-image {
		width: 12px;
		margin-right: -20rpx;
	}

	.chooseImage {
		margin-right: -0rpx;
	}

	// .horizontal-view[data-v-046b1ce9]
	.choosestyle {
		// color: black;
		margin-left: 14rpx;
		margin-right: 220rpx;
		padding-right: 90rpx;
	}

	.choosestyleer {
		color: black;
		margin-left: 15rpx;
		margin-right: 215rpx;
		padding-right: 120rpx;
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
			font-size: 30rpx;
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

	.process_er_cc {
		height: 4rpx;
		width: 640rpx;
		background-color: #cccccc;
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

	// .u-btn[data-v-6e15e680] {
	// 	width:400rpx;
	//     position: relative;
	//     border: 0;
	// 	color: #FFFFFF;
	//     display: inline-flex;
	//     overflow: visible;
	//     line-height: 1;
	//     display: flex;
	//     flex-direction: row;
	//     align-items: center;
	//     justify-content: center;
	//     cursor: pointer;
	//     // padding: 0 20px;
	//     z-index: 1;
	//     box-sizing: border-box;
	//     transition: all 0.15s;
	// }
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

	.horizontal-viewer {
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

	.relationshipListClass {
		width: 100%;
		margin-left: 30rpx;

	}

	.tip-text {
		margin-top: 15rpx;
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

	.content-view {
		background-color: white;
		padding: 19rpx 30rpx 39rpx 30rpx;
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

		.item-view {
			margin-bottom: 50rpx;

			.example-body {
				// padding: 10px;
				padding-top: 0;
				margin-top: 30rpx;
			}

			.add-img {
				width: 100%;
			}
		}
	}
</style>
