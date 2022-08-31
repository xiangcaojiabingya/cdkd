<template>
	<!-- 申请信息页面 -->
	<view>
		<item-nav-bar title="授信申请"></item-nav-bar>
		<scroll-view class="content-body" scroll-y="true">
			<view class="form-content">
				<form @submit="formSubmit" @reset="formReset">
					<view class="application-user-data">
						<!-- <view class="apply-view"><image class="img-block" src="../../static/img/cerdit/card_img_titlebar_line.png"></image><span class="apply-view-title">申请人信息</span></view> -->
						<key-value title="存款账户" :content="this.depositDetail.acctNo"></key-value>
						<key-value title="子账号" :content="this.depositDetail.subAcctNo"></key-value>
						<key-value title="存款金额" :content="formatThousandsNew(this.depositDetail.openAmt)">
						</key-value>
						<key-value title="产品名称" :content="this.depositDetail.productName"></key-value>
						<key-value title="开户机构" :content="this.depositDetail.openBranch"></key-value>
						<key-value title="起息日" :content="formatDate(this.depositDetail.valDate)">
						</key-value>
						<key-value title="到期日" :content="formatDate(this.depositDetail.dueDate)"></key-value>
						<key-value title="存期" :content="this.depositDetail.period"></key-value>
						<key-value title="年利率(%)" :content="this.depositDetail.intRate"></key-value>
					</view>
					<button class="button" type="primary" form-type="submit">确认</button>
				</form>
			</view>
		</scroll-view>
		<!-- 数字键盘 -->
		<keyboard-package ref="number"  @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm" :disableDot="true"/>
		
		<!-- 身份证键盘 -->
		<keyboard-package ref="idCard" type="idCard"  @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm"/>
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
				 depositDetail: {},
				bizToken: '',
				orderInfo: {},
				phone: '',
				farmerCard:'',
				cityList: cityList,
				cityIndex: -1,
				countyList: cityList[0].list,
				countyIndex: -1,
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
				multiIndex: [-1, -1, -1],
				classAList: [],
				secondList: [],
				tertiaryList: [],
				recmmendName: "",
				recmmend: "",
				type:'number',//键盘类型判断
				numberList:[],//数字键盘数组
				idCardList:[],//身份证键盘数组
				familyInCome: '',//家庭年收入
			}
		},
		onLoad(e) {
			if(e.infoer){
					this.depositDetail = JSON.parse(decodeURIComponent(e.infoer))
			}
					
			console.log('ccccccccc'+ JSON.stringify(this.depositDetail))
			sessionStorage.alreadyRead = false
			this.phone = getApp().globalData.phone || uni.getStorageSync("phone")
			let searchURL = window.location.search;
			searchURL = searchURL.substring(1, searchURL.length);
			this.bizToken = searchURL.split("&")[0].split("=")[1];
			getApp().globalData.bizToken = this.bizToken
			uni.setStorageSync('bizToken', this.bizToken)
			// //调用腾讯核身结果
			// this.getDetectInfoAction()
			// //获取机构列表
			// this.getBtranthList()
			this.queryCorrespondingCardAction()
		},
		onShow() {
			const alreadyRead = JSON.parse(sessionStorage.alreadyRead)
			if(alreadyRead){
				console.log('alreadyReada为true', alreadyRead)
				this.isAgree = true
			} else {
				console.log('alreadyReada为false', alreadyRead)
				this.isAgree = false
			}
			console.log('isAgreeisAgreeisAgree：', this.isAgree)
		},
		computed:{
			//电话号码输入的数据
			telStr(){
				let str='';
				this.numberList.forEach(item=>{
					str+=item.toString();
				})
				return str;
			},
			//身份证输入的数据
			passStr(){
				let str='';
				this.idCardList.forEach(item=>{
					str+=item.toString();
				})
				return str;
			}
		},
		methods: {
			queryCorrespondingCardAction() {
				uni.showLoading({
					title: "加载中"
				})
				//获取订单信息
				this.$request.postAjax(this.$apiUrl.queryCorrespondingCardAction, {}).then(res => {
					console.log('身份证信息：', res);
					this.farmerCard = res.result;
					uni.setStorageSync('farmerCard',this.farmerCard)
					uni.hideLoading();
				}).catch(error => {
					console.log(error);
					uni.hideLoading();
				})
			},
			clearNoNum(e) {
				let temp = e.target.value
				let digits = 5
			    if (temp < 0) {
			        temp = "";
			        return;
			    }
			    var posDot = temp.indexOf(".");//返回指定字符在此字符串中第一次出现处的索引
			    if (posDot < 0) {//不包含小数点
			        if (temp.length <= digits) {
						this.$nextTick(function(){
							this.familyInCome = temp + ''
						})
			            return;//小于五位数直接返回
			        } else {
			            // temp.delete(5, 6);//大于五位数就删掉第六位（只会保留五位）
			            if (temp.length > digits) {
			                temp = temp.substring(1, digits + 1);
			            }
						this.$nextTick(function(){
							this.familyInCome = temp + ''
						})
			            return;
			        }
			    }
			    var lastDot = temp.lastIndexOf(".");
			    if (posDot != lastDot) {
			        temp = "";
					this.$nextTick(function(){
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
					this.$nextTick(function(){
						this.familyInCome = temp + ''
					})
			        return;
			    }
			    if (temp.length - posDot - 1 > 2)//如果包含小数点
			    {
			        // edt.delete(posDot + 3, posDot + 4);//删除小数点后的第三位
			        temp = temp.substring(0, posDot + 3);
			    }
				this.$nextTick(function(){
					this.familyInCome = temp + ''
				})
			},
			// 家庭年收入验证，前6后2
			inComeValid(e) {
				console.log(e.target.value)
				let val = e.target.value
				val = val.replace(/[^\d\.]/g, "")
				val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
				if(!val || val + '' === '0'){
					this.$nextTick(function(){
						this.familyInCome = ''
					})
					return
				}
				for (var i = 0; i <= 9; i++) {
					var s = '0'+i.toString()
					if(val + '' === s){
						this.$nextTick(function(){
							this.familyInCome = ''
						})
						console.log(val)
						return
					}
				}
				if(val < 0){
					val = Math.abs(val)
				}
				// console.log(Math.floor(val * 100)/100)
				// return;
				// val = Math.floor(val * 100) / 100
				if(val >= 999999){
					const valStr = val + ''
					const w = valStr.indexOf('.')
					if(w > -1){
						val = valStr.substr(0, 6) + valStr.substr(w, 3)
					} else {
						val = valStr.substr(0, 6)
					}
				}
				console.log(val)
				this.$nextTick(function(){
					this.familyInCome = val + ''
				})
			},
			formatDate(date) {
				if(date){
					return date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8);
				}
				return date
			},
			formatThousandsNew(num, decimal = 2) {
				if(num){
					num = num.toString();
					let index = num.indexOf('.');
					if (index !== -1) {
						num = num.substring(0, decimal + index + 1);
					} else {
						num = num.substring(0);
					}
					let str = parseFloat(num).toFixed(decimal);
					const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
					return str.replace(reg, '$1,');
				}
				return num 
			},
			//自定义键盘完成输入按钮
			onConfirm(){},
			//自定义键盘删除按钮
			onDelete(){
				switch (this.type){
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
				this.type=key;
				this.$refs[key].open();
			},
			//自定义键盘input事件
			onInput(val){
				switch(this.type){
					case 'number':
						if(this.numberList.length>=11){
							this.close();
							return;
						};
						this.numberList.push(val);
						break;
					case 'idCard':
						if(this.idCardList.length>=18){
							this.close();
							return;
						};
						this.idCardList.push(val);
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
				})
			},
		
			valid(data) {
				return true
			},
			//授信数据保存
			formSubmit: function(e) {
				const that = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value
				uni.navigateTo({
					url: `./createApply?farmerCard=`
							})
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
		.application-user-data{
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
				.orange-block{
					background-color: var(--color-orange-text);
					display: inline-block;
					position: relative;
					top: 5rpx;
					width: 8rpx;
					height: 36rpx;
					border-radius: 30rpx;
					// margin-left: 20rpx;
				}
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
			
		}
	}
	
	.borders{
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

		input,picker {
			margin-left: 40rpx;
			width: 100%;
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
		color: #808080;
	}

	.horizontal-view {
		display: flex;
		align-items: center;
		text{
			width: 100%;
		}
		image{
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
		.text-name{
			margin-left: 44rpx;
			+.text-name{
				margin-top: 20rpx;
			}
		}
		.agree-tip {
			color: var(--fontColor);
		}
	}
	.none-padding-top{
		padding-top: 0;
	}
	.none-padding-bottom{
		padding-bottom: 0;
	}
</style>
