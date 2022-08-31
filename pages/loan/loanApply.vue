<template>
	<!-- 用款申请-申请 -->

	
	<view class="apply-body">
		<item-nav-bar title="用款申请确认" :st='6'></item-nav-bar>
		<view class="card-body">
			<view class="card-head">
				<span>借款本金(元)</span>
				<view class="right">
					<span>可用借额度：</span>
					<span class="font-color">{{formatAvailableCreditAmount}}</span>
					<span>元</span>
				</view>

			</view>
			<view class="content-top-view">
				<span>￥</span>
				<input type="number" placeholder="请输入借款,金额需是10000元的整数倍" @blur="onLoanAmountBlur" v-model="principal" />
			</view>
		</view>
		<view class="card-body">
			<uni-collapse accordion @change="change" style="border-radius: 16rpx;">
				<uni-collapse-item title-border="none" :border="false">
					<template v-slot:title>
						<view class="loan-detail border-none">
							<span class="left">{{creditLimitObj.productName }}</span>
							<span>{{formatOpenAmt + '元'}}</span>
						</view>
					</template>
					<view class="content" style="border-radius: 16rpx;">
						<view class="loan-detail border-none">
							<span class="left">存款账户</span>
							<span>{{creditLimitObj.acctCode}}</span>
						</view>
						<view class="loan-detail border-none">
							<span class="left">子账户</span>
							<span>{{creditLimitObj.subAcctNo}}</span>
						</view>
						<view class="loan-detail border-none">
							<span class="left">存款金额</span>
							<span>{{formatOpenAmt}}元</span>
						</view>
						<view class="loan-detail border-none">
							<span class="left">产品名称</span>
							<span>{{creditLimitObj.productName}}</span>
						</view>
						<view class="loan-detail border-none">
							<span class="left">到期日</span>
							<span>{{creditLimitObj.dueDate}}</span>
						</view>
						<view class="loan-detail border-none">
							<span class="left">年利率</span>
							<span>{{creditLimitObj.intRate}}%</span>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="card-body">
			<view class="card-head">
				贷款期限
			</view>
			<view class="time-lim-two">
				<button :class="[loanPeriod === '3'?'button-hover':'button']" v-if="this.creditMaxMonth >= 3" @click="checkLoanPeriod(3)">3个月</button>
				<button :class="[loanPeriod === '6'?'button-hover':'button']" v-if="this.creditMaxMonth >= 6" @click="checkLoanPeriod(6)">6个月</button>
				<button :class="[loanPeriod === '9'?'button-hover':'button']" v-if="this.creditMaxMonth >= 9" @click="checkLoanPeriod(9)">9个月</button>
				<button :class="[loanPeriod === '12'?'button-hover':'button']" v-if="this.creditMaxMonth >= 12"
					@click="checkLoanPeriod(12)">12个月</button>
				<button :class="[loanPeriod === '24'?'button-hover':'button']" v-if="this.creditMaxMonth >= 24"
					@click="checkLoanPeriod(24)">24个月</button>
				<button :class="[loanPeriod === '36'?'button-hover':'button']" v-if="this.creditMaxMonth >= 36"
					@click="checkLoanPeriod(36)">36个月</button>
				<button class="button" v-if="this.creditMaxMonth >= 36 || (this.creditMaxMonth < 36 && this.creditMaxMonth >= 24)" style="background-color: transparent;"></button>
				<button class="button" v-if="this.creditMaxMonth >= 36 || (this.creditMaxMonth < 36 && this.creditMaxMonth >= 24)" style="background-color: transparent;"></button>
				<button class="button" v-if="this.creditMaxMonth < 36 && this.creditMaxMonth >= 24" style="background-color: transparent;"></button>
			</view>
			<view class="card-head" style="padding-top: 0;">
				还款方式
			</view>
			<view class="time-lim">
				<button class="one" :class="[repayment === '4'?'button-hover':'button']"
					@click="checkRepayment('4')">按月付息一次还本</button>
				<button class="two" :class="[repayment === '1'?'button-hover':'button']"
					@click="checkRepayment('1')">等额本息</button>
				<button class="two" :class="[repayment === '2'?'button-hover':'button']"
					@click="checkRepayment('2')">等额本金</button>

				<!-- <button>按月付息一次还本</button>
				<button>等额本息</button>
				<button>等额本金</button> -->
			</view>
		</view>
		<view class="card-body">
			<view class="loan-detail">
				<span class="left">贷款用途</span>
				<picker mode="selector" @change="educationPickerChange" :value="multiIndex" :range="educationList"
					range-key="value">
					<view class="grayColor horizontal-view" v-if="multiIndex[0]==-1">
						<text>请选择</text>
						<image src="../../static/img/to_right_icon.png" mode="widthFix"></image>
					</view>
					<view class="horizontal-view" v-else>
						<text>
							{{educationList[multiIndex].value}}
						</text>
						<image src="../../static/img/to_right_icon.png" mode="widthFix"></image>
					</view>

				</picker>
			</view>
			<view class="loan-detail">
				<span class="left">担保方式</span>
				<span>质押</span>
			</view>
			<view class="loan-detail">
				<span class="left">年利率</span>
				<span>{{creditLimitObj.rate}}%</span>
			</view>

			<view class="loan-detail">
				<span class="left">支付方式</span>
				<view class="change">
					<view class="zf" @click="onPayMethodChange('0')">
						<image v-if="payMethod === '0'" class="check-img" src="../../static/img/select_icon.png">
						</image>
						<image v-else class="check-img" src="../../static/img/unselect_icon.png">
						</image>
						<span style="color: #A5A5A5;">自主支付</span>
					</view>
					<view class="stzf" @click="onPayMethodChange('1')">
						<image v-if="payMethod === '1'" class="check-img" src="../../static/img/select_icon.png">
						</image>
						<image v-else class="check-img" src="../../static/img/unselect_icon.png">
						</image>
						<span style="color: #A5A5A5;">受托支付</span>
					</view>
				</view>
			</view>
			<view v-if="payMethod === '1'">
				<view class="loan-detail">
					<view class="loan-detail-content-left">
						<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image>
						<span class="left">受托账户户名</span>
					</view>
					
					<span>
						<input type="text" v-model="rcvAcctName" placeholder="请输入受托账户户名" />
					</span>
				</view>
				<view class="loan-detail">
					<view class="loan-detail-content-left">
						<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image>
						<span class="left">受托账户账号</span>
					</view>
					
					<span>
						<input type="number" v-model="rcvAcctNo" maxlength="23" placeholder="请输入受托账户账号" />
					</span>
				</view>
				<view class="loan-detail">
					<view class="loan-detail-content-left">
						<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image>
						<span class="left">受托账户开户行</span>
					</view>
					
					<view style="display: flex;align-items: center;">
						<input type="text" confirm-type="search" v-model="rcvAcctBankName" placeholder="请输入受托账户开户行" />
						<!-- <image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image> -->
						<uni-icons type="search" size="20" @click="onClickSearch" color="#777777" style="margin-top: 3rpx;"></uni-icons>
					</view>
				</view>
				<view class="loan-detail">
					<view class="loan-detail-content-left">
						<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image>
						<span class="left">受托账户是否本行</span>
					</view>
					
					<view class="change">
						<view class="zf" @click="isShouTuoClick('1')">
							<image v-if="isShouTuo" class="check-img" src="../../static/img/select_icon.png">
							</image>
							<image v-else class="check-img" src="../../static/img/unselect_icon.png">
							</image>
							<span>本行受托</span>
						</view>
						<view class="stzf" @click="isShouTuoClick('2')">
							<image v-if="unShouTuo" class="check-img" src="../../static/img/select_icon.png">
							</image>
							<image v-else class="check-img" src="../../static/img/unselect_icon.png">
							</image>
							<span>他行受托</span>
						</view>
					</view>
				</view>
				<view class="loan-detail">
					<view class="loan-detail-content-left">
						<image src="../../static/img/star_icon.png" mode="widthFix" class="family_img"></image>
						<span class="left">用途证明</span>
					</view>
					
					<view class="select-image" style="width: 75%;">
						<uni-file-picker ref="fileThree" limit="6" :list-styles="listStyles"
							:image-styles="imageStyles" @select="selectHouse" @delete="deleteHouse" v-model="attachments">
							<image src="../../static/img/choose_img_icon.png" class="add-img" mode="widthFix"></image>
						</uni-file-picker>
					</view>
					
				</view>
			</view>
			<view class="loan-detail">
				<span class="left">还款计划</span>
				<view class="right" @click="onClickRepaymentPlan">
					<span>点击查看</span>
					<image src="../../static/img/to_right_icon.png" mode=""></image>
				</view>
			</view>
			<view class="loan-detail">
				<span class="left">收款账户(还款账户)</span>
				<span style="width: 80%;">
					<input type="number" v-model="loanAcctNo" :disabled="true" placeholder="请输入收款账户" />
				</span>
			</view>
		</view>
		<view>
			<button class="nextButton" type="primary" @click="nextStep">下一步</button>
		</view>
		
		<view class="popup">
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="close" @click="close">
						<uni-icons type="closeempty" size="24" color="#c1c1c1"></uni-icons>
					</view>
					<h4>请您选择开户行</h4>
					<scroll-view class="checkbox-content" scroll-y="true">
						<view  :class="{ checked: item.checked, 'g-checkbox': true }"
							v-for="item in powerStationList" :key="item.bankNo" @click="choosePS(item)">
							<view class="checked-icon-content" v-if="item.checked">
								<view class="checked-icon"></view>
								<uni-icons type="checkmarkempty" size="13" color="#fff"></uni-icons>
							</view>
							<ul class="clearfix">
								<li>
									<p>{{item.bankName}}</p>
									<!-- <span>电站编号</span> -->
								</li>
							<!-- 	<li>
									<p>{{item.plantScale}}</p>
									<span>电站容量（KW/h）</span>
								</li>
								<li>
									<p>{{item.totalAmount}}</p>
									<span>贷款金额（元）</span>
								</li> -->
							</ul>
						</view>
					</scroll-view>
					<view>
						<button class="button long" type="primary" @click="toLoan()">确定</button>
					</view>
				</view>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import ItemNavBar from "@/component/ItemNavBar.vue"
	import {
		formatThousandsNew,isBankNo
	} from "../../utils/index.js"
	import Coi from 'js-coi';
	export default {
		components: {
			ItemNavBar
		},
		data() {
			return {
				powerStationList: [{
					bankNo: 'ZGluZ3l1bm5h4',
					bankName: ''
				},{
					bankNo: 'ZGluZ3l1bm5h41111',
					bankName: ''}],
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
				
				principal: '', // 借款金额
				loanPeriod: '', //选中的期限
				repayment: '', // 还款方式
				payMethod: '0',

				isShouTuo: false,
				unShouTuo: false,

				educationList: [{
						key: "14",
						value: '购买原材料'
					}, {
						key: "21",
						value: '购买设备'
					},
					{
						key: "22",
						value: '支付工程款'
					}, {
						key: "23",
						value: '流动资金'
					}, {
						key: "24",
						value: '经营周转资金'
					},
					{
						key: "25",
						value: '货款'
					}
				],
				multiIndex: [-1],
				loanPurpose: '',

				creditLimitObj: {},
				formatAvailableCreditAmount: '',
				formatOpenAmt: '',
				rcvAcctNo: '',
				rcvAcctName: '',//受托账户户名
				rcvAcctBankName: '',//受托账户开户行
				rcvAcctBankNo: '',//受托账户行号
				rcvAcctCardBelong: '', //受托收款账户是否本行(
				loanAcctNo: '',//收款账户户号
				attachments: [],
				creditMaxMonth: 0,
			}
		},
		onLoad(options) {
			this.creditLimitObj  = uni.getStorageSync('creditLimitObjItem')|| {};
			// this.creditLimitObj  = JSON.parse(decodeURIComponent(options.creditLimitObj)) || {};
			console.log(this.creditLimitObj.acctCode)
			this.creditMaxMonth = Number(this.creditLimitObj.creditMaxMonth)
			this.formatAvailableCreditAmount = formatThousandsNew(this.creditLimitObj.availableCreditAmount);
			this.formatOpenAmt = formatThousandsNew(this.creditLimitObj.openAmt);
			this.loanAcctNo = this.creditLimitObj.acctCode
		},

		methods: {

			//输入框金额焦点触发
			onLoanAmountBlur(e) {
				let loanAmount = e.detail.value;
				if (!this.isNumber(loanAmount)) {
					uni.showToast({
						title: "借款金额格式有误",
						icon: 'none'
					})
					this.principal = ''
					return;
				}
				if (Number(loanAmount) > Number(this.creditLimitObj.availableCreditAmount)) {
					uni.showToast({
						title: "借款额度不能大于可用借款金额",
						icon: 'none'
					})
					this.principal = ''
					return;
				}
				if (Number(loanAmount) >= 500000) {
					this.payMethod = '1'
				} else {
					this.payMethod = '0'
				}
			},
			isNumber(number = '') {
				var reg = /^\d+(\.\d+)?$/;
				if (reg.test(number)) {
					return true;
				} else {
					return false;
				}
			},
			change(e) {
				console.log(e);
			},
			// 全部借出
			onClickAllBorrow() {
				if (Number(this.creditLimitObj.availableCreditAmount) >= 500000) {
					this.payMethod = '1'
				}
				this.principal = Number(this.creditLimitObj.availableCreditAmount)
			},

			// 选择贷款期限
			checkLoanPeriod(item) {
				// const creditMaxMonth = this.creditLimitObj.creditMaxMonth;
				if (this.creditMaxMonth < item) {
					uni.showToast({
						title: `您当前最大可选择贷款期限为${this.creditMaxMonth}个月`,
						icon: 'none'
					})
					return;
				}
				
				if (item > 12 && this.repayment === '4') {
					this.repayment = ''
				}
				this.loanPeriod = item+''
			},

			// 选择还款方式
			checkRepayment(item) {
				if (this.loanPeriod === '') {
					uni.showToast({
						title: '请先选择贷款期限',
						icon: 'none'
					})
					return;
				}
				if (Number(this.loanPeriod) > 12 && item === '4') {
					showDialog('贷款期限大于12个月时，还款方式只能选择等额本息或者等额本金');
					return;
				}
				this.repayment = item
			},

			//选择贷款用途
			educationPickerChange(value) {
				console.log('贷款用途', JSON.stringify(value));
				let educationArr = value.detail.value
				this.multiIndex = educationArr
				this.loanPurpose = this.educationList[value.detail.value].key
			},

			// 支付方式
			onPayMethodChange(event) {
				if (this.payMethod === '1' && Number(this.principal) >= 500000) {
					uni.showToast({
						title: '借款本大于等于50万元人民币时支付方式必须为受托支付',
						icon: 'none'
					})
					return;
				}
				this.payMethod = event
			},
			// 关闭弹出框
			close() {
				this.$refs.popup.close()
			},
			//选中开户行
			choosePS(item) {
				console.log(item.checked)
				let list = this.powerStationList;
				for (let i = 0; i < list.length; i++) {
					if (list[i].bankNo === item.bankNo) {
						this.$set(list[i], 'checked', true)
					}else{
						
					this.$set(list[i], 'checked', false)
					}
				}
			
			},
			// 选择完电站点击完成
			toLoan() {
				const list = this.powerStationList.filter((item) => item.checked)
				if (!list.length) {
					uni.showModal({
						title: "提示",
						content: '请选择一个开户行！',
						showCancel: false,
						confirmText: "确定"
					})
				} else {
					this.rcvAcctBankNo = list[0].bankNo
					this.rcvAcctBankName = list[0].bankName
					this.close()
				}
			},
			//查询开户行
			onClickSearch() {
				for (let i = 0; i < this.powerStationList.length; i++) {
					this.powerStationList[i].checked = false
				}
				// this.$refs.popup.open('bottom')
				// return
				if (!this.rcvAcctBankName) {
					uni.showToast({
						title: '请输入受托账户开户行有效关键字',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: "加载中"
				})
				this.$request.postAjax(this.$apiUrl.queryAssociatedBankNoAction, {
					"productId": "ZYD001",
					keyword: this.rcvAcctBankName
				}).then(res => {
					console.log('模糊开户行数据：', JSON.stringify(res))
					for (let i = 0; i < res.bankInfoList.length; i++) {
						res.bankInfoList[i].checked = false
					}
					this.powerStationList = res.bankInfoList
					this.$refs.popup.open('bottom')
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},

			// 受托收款账户是否本行
			isShouTuoClick(values) {
				if (values === '1') {
					this.isShouTuo = true;
					this.unShouTuo = false
				} else {
					this.isShouTuo = false;
					this.unShouTuo = true
				}
				this.rcvAcctCardBelong = values
			},

			// 还款计划
			onClickRepaymentPlan() {
				const validCoi = new Coi();
				validCoi
					.data(this.principal)
					.isRequired('请输入借款金额')
					.data(this.loanPeriod)
					.isRequired('请选择贷款期限')
					.data(this.repayment)
					.isRequired('请选择还款方式');

				if (!validCoi.pass) {
					uni.showToast({
						title: validCoi.errorMessage,
						icon: 'none'
					})
					return;
				}
				uni.navigateTo({
					// ${encodeURIComponent(JSON.stringify(item))}
					url: `./pepaymentPlan?creditLimitObj=${encodeURIComponent(JSON.stringify(this.creditLimitObj))}&loanAmount=${this.principal}&loanPeriod=${this.loanPeriod}&repayment=${this.repayment}`
				});
			},
			nextStep() {
				uni.showLoading({
					title: "加载中"
				})
				const validCoi = new Coi();
				validCoi
					.data(this.principal)
					.isRequired('请输入借款金额')
					.data(this.loanPeriod)
					.isRequired('请选择贷款期限')
					.data(this.repayment)
					.isRequired('请选择还款方式')
					.data(this.loanPurpose)
					.isRequired('请选择贷款用途')
					.data(this.loanAcctNo)
					.isRequired('请输入收款账户（还款账户）');

				if (this.payMethod === '1') {
					validCoi
						.data(this.rcvAcctName)
						.isRequired('请输入受托账户户名')
						.data(this.rcvAcctNo)
						.isRequired('请输入受托账户账号')
						.data(this.rcvAcctBankName)
						.isRequired('请输入受托账户开户行')
						.data(this.rcvAcctBankNo)
						.isRequired(`请点击受托账户开户行匹配准确受托账户开户行信息`)
						.data(this.rcvAcctCardBelong)
						.isRequired('请选择受托收款账户是否本行')
						.data(this.attachments)
						.isRequired('请上传用途证明！');
				}

				if (!validCoi.pass) {
					uni.showToast({
						title: validCoi.errorMessage,
						icon: 'none'
					})
					return;
				}

				//
				if (Number(this.principal) < 10000) {
					uni.showToast({
						title: '借款金额最低为10000元',
						icon: 'none'
					})
					return;
				}
				//
				if (Number(this.principal) % 10000 !== 0) {
					uni.showToast({
						title: '借款金额必须为10000的整数倍',
						icon: 'none'
					})
					return;
				}
				//
				if (!isBankNo(this.loanAcctNo)) {
					uni.showToast({
						title: '收款账户（还款账户）格式有误',
						icon: 'none'
					})
					return;
				}

				let loanSubmitReqObj = {
					creditLimitId: this.creditLimitObj.creditLimitId,
					loanPurpose: this.loanPurpose,
					loanPeriod: this.loanPeriod,
					loanUnit: '2',
					loanAmount: this.principal,
					repayment: this.repayment,
					initRate: this.creditLimitObj.rate,
					payMethod: this.payMethod,
					guarantWay: 'A'
				};
				//
				if (this.payMethod === '1') {
					if (this.rcvAcctNo === this.loanAcctNo) {
						uni.showToast({
							title: '受托账户账号与收款账户账号不能一致',
							icon: 'none'
						})
						return;
					}
					loanSubmitReqObj.rcvAcctNo = this.rcvAcctNo;
					loanSubmitReqObj.rcvAcctName = this.rcvAcctName;
					loanSubmitReqObj.rcvAcctBankNo = this.rcvAcctBankNo;
					loanSubmitReqObj.rcvAcctBankName = this.rcvAcctBankName;
					loanSubmitReqObj.rcvAcctCardBelong = this.rcvAcctCardBelong;
					loanSubmitReqObj.attachments = this.attachments;
				}

				this.$request.postAjax(this.$apiUrl.getQueryHostAcctInfoAction, {
					"productId": "ZYD001",
					acctNo: this.loanAcctNo,
					payMethod: this.payMethod,
					rcvAcctNo: this.payMethod === '1' ? this.rcvAcctNo : '',
					rcvAcctName: this.payMethod === '1' ? this.rcvAcctName : '',
					rcvAcctCardBelong: this.payMethod === '1' ? this.rcvAcctCardBelong : ''
				}).then(res => {
					console.log('---：', JSON.stringify(res))
					loanSubmitReqObj.loanAcctNo = this.loanAcctNo;
					// 将用款申请对象缓存
					uni.setStorageSync('loanSubmitReqObj', loanSubmitReqObj);
					uni.setStorageSync('creditLimitObjAppconfirm', this.creditLimitObj);
					uni.navigateTo({
						url: `./applyConfirm?creditLimitObj=${JSON.stringify(
							this.creditLimitObj
						)}&loanAmount=${this.principal}&loanPeriod=${this.loanPeriod}&repayment=${this.repayment}`
					});
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					// uni.hideLoading();
				})
			},
			// 选择图片后方法（用途）
			selectHouse(e) {
				if(e.tempFiles.length != null && e.tempFiles.length != undefined && e.tempFiles.length > 0){
					for (var i = 0; i < e.tempFiles.length; i++) {
						console.log('图片前信息：', JSON.stringify(e))
						this.select(e.tempFiles[i].file, '22',i,"fileThree")
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
							_this.upLoad(splitBase64Data, type, e.name , i, refType,dataURL);
						})
					}
					
				})
			},
			// 文件上传
			upLoad(base64Data, fileKind, fileName,i,refType,dataURL) {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$request.postAjax(this.$apiUrl.uploadAction, {
					fileBase64: base64Data
				}).then(res => {
					console.log('上传成功返回数据：', res);
					this.attachments.push({
						name:fileName.substring(0,25),
						extname:'png',
						url:dataURL,
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
					if(refType == "fileThree"){
						this.$refs.fileThree.clearFiles(i);
					}
					uni.showToast({
						title: "上传失败",
						icon: "none"
					})
					uni.hideLoading()
				})
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
			// 选择图片后方法（用途）
			deleteHouse(e) {
				this.deleteFile(e, '22')
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

<style lang="less">
	.apply-body {
		padding-top: 30rpx;
		padding-bottom: 80rpx;
	}

	.card-body {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 16rpx;
	}

	.card-head {
		padding: 0 30rpx;
		padding-top: 54rpx;
		color: black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: left;
	}

	.card-head .right {
		font-size: 24rpx;
	}

	.font-color {
		color: var(--color-orange-text);
	}

	.content-top-view {
		display: flex;
		align-items: center;
		color: var(--fontColor);
		border-radius: 16rpx;
		padding: 50rpx 30rpx;
		font-size: 40rpx;
	}

	.content-top-view input {
		font-size: 30rpx;
		width: 100%;
	}


	.time-lim {
		padding: 40rpx 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

	}


	.time-lim .button {
		background-color: #f2f2f2;
		border-radius: 30rpx;
		color: #999999;
		height: 60rpx;
		font-size: 28rpx;
		line-height: 60rpx;
	}

	.time-lim .button-hover {
		background-color: #ff6619;
		border-radius: 30rpx;
		color: #fff;
		height: 60rpx;
		font-size: 28rpx;
		line-height: 60rpx;
	}

	.time-lim-two {
		padding: 10rpx 30rpx 40rpx 30rpx;
		display: flex;
		/* flex-direction: row; */
		justify-content: space-between;
		align-items: center;
		flex-flow: row wrap;
	}

	.time-lim-two .button {
		width: 22%;
		background-color: #f2f2f2;
		border-radius: 30rpx;
		color: #999999;
		height: 60rpx;
		font-size: 28rpx;
		line-height: 60rpx;
		margin-top: 30rpx;
	}
	
	uni-button {
	    padding-left: 10px;
	    padding-right: 10px;
	}

	.time-lim-two .button-hover {
		width: 22%;
		background-color: #ff6619;
		border-radius: 30rpx;
		color: #fff;
		height: 60rpx;
		font-size: 28rpx;
		line-height: 60rpx;
		margin-top: 30rpx;
	}

	.applyInfo {
		font-size: 35rpx;
		line-height: 80rpx;
		margin: 30rpx;
	}
	.family_img {
		width: 14rpx;
		// margin-left: 5rpx;
	}
	
	/* .left {
		font-weight: 600;
	} */

	.loan-detail {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: right;
		padding: 40rpx 0;
		margin: 0 30rpx;
		border-bottom: 1rpx solid #e6e6e6;
		color: #666666;
		font-size: 32rpx;
	}
	.loan-detail-content-left{
		display: flex;
		align-items: center;
	}
	.loan-detail .left{
		text-align: left;
	}
	.loan-detail2 {

		padding: 40rpx 0;
		margin: 0 30rpx;
		color: #666666;
		font-size: 32rpx;
		/* padding: 40rpx 0;
		margin: 0 30rpx;
		border-bottom: 1rpx solid #e6e6e6;
		color: #666666;
		font-size: 32rpx; */
	}

	.loan-detail .right span {
		color: #ababab;
	}

	.loan-detail .right image {
		width: 15rpx;
		height: 25rpx;
		padding-left: 16rpx;
	}

	.bottom {
		padding: 40rpx 30rpx;
		font-size: 28rpx;
		color: #666666;
	}

	.nextButton {
		margin-bottom: 113rpx;
		margin-top: 20rpx;
		width: calc(100% - 60rpx);
		background-color: var(--color-orange-text);
		color: var(--white);
		border-radius: 50rpx;
	}

	.zf {
		display: flex;
	}

	.zf image,
	.stzf image {
		width: 40rpx;
		height: 40rpx;
		padding-right: 8rpx;
	}

	.stzf {
		display: flex;
		padding-left: 10rpx;
	}

	.change {
		display: flex;
		justify-content: space-between;
	}

	.border-none {
		border: none;
	}

	.grayColor {
		color: #808080;
	}

	.horizontal-view {
		display: flex;
		align-items: center;

		text {
			width: 100%;
		}

		image {
			width: 20rpx;
			margin: 0 3rpx 0 10rpx;
		}
	}

	/deep/ .popup {
		uni-view[name=content],
		.uni-popup__wrapper {
			border-radius: 30rpx 30rpx 0 0;
		}
	
		.button {
			margin-right: 0;
			margin-left: 0;
			width: 100%;
		}
	
		.close {
			position: absolute;
			right: 30rpx;
			top: 60rpx;
		}
	}
	
	.popup-content {
		padding: 60rpx 30rpx;
		position: relative;
	}
	
	.checkbox-content {
		max-height: 650rpx;
		overflow: auto;
	}
	
	.g-checkbox {
		position: relative;
		background-color: var(--bgColor);
		border: 1px solid var(--bgColor);
		border-radius: 16rpx;
		margin-bottom: 20rpx;
	
		ul {
			padding: 0 24rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}
	
		li {
			list-style: none;
			text-align: center;
			padding: 36rpx 0;
	
			p {
				color: #333;
				margin-bottom: 0rpx;
			}
	
			span {
				font-size: 28rpx;
				color: #999;
			}
		}
	
		&.checked {
			border-color: var(--color-orange-text);
			background-color: #fff;
	
			.checked-icon-content {
				position: absolute;
				right: -1px;
				top: -1px;
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
				overflow: hidden;
			}
	
			.checked-icon {
				position: absolute;
				width: 100%;
				height: 100%;
				background: var(--color-orange-text);
				transform: rotate(45deg);
				top: -32rpx;
				left: 32rpx;
			}
	
			.uni-icons {
				position: absolute;
				top: 4rpx;
				right: 4rpx;
			}
		}
	}
	
	
</style>
