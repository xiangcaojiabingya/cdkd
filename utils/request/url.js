let apiUrl
export default apiUrl = {
	//获取中台token
	getToken: {
		url: "/auth/oauth/token",
		apiCode: ""
	},
	//获取机构列表
	queryBtranthList: {
		url: "/xsdk/queryBtranthList",
		apiCode: "A0791"
	},

	// 公共
	//获取微信手机号
	getWxPhoneAction: {
		url: "/xsdk/getWxPhoneAction",
		apiCode: ""
	},
	//获取图形验证码
	getPicCodeUrl: {
		url: "/xsdk/generatePicCaptchaAction",
		apiCode: "A0493"
	},
	//获取验证码
	getMsgCodeUrl: {
		url: "/xsdk/smsSendAction",
		apiCode: "A0495"
	},
	// 获取验证码（无图形验证码）
	smsSendNoCaptcha: {
		url: "/xsdk/smsSendNoCaptchaAction",
		apiCode: "A0530"
	},
	//注册
	registUrl: {
		url: "/xsdk/registerAction",
		apiCode: "A0497"
	},
	// 登录
	loginUrl: {
		url: "/xsdk/signinAction",
		apiCode: "A0499"
	},
	// 腾讯人脸获取bizToken
	getBizToken: {
		url: "/xsdk/getBizTokenAction",
		apiCode: "A0703"
	},
	// 获取腾讯核身结果
	getDetectInfoAction: {
		url: "/xsdk/getDetectInfoAction",
		apiCode: "A0704"
	},

	// 授信申请
	// 申请列表查询
	queryOrderListForPvAction: {
		url: "/xsdk/queryOrderListForPvAction",
		apiCode: "A1200"
	},
	// 订单状态校验
	checkOrderStateForPvAction: {
		url: "/xsdk/checkOrderStateForPvAction",
		apiCode: "A1201"
	},
	// 申请信息建立
	addOrderInfoForPvAction: {
		url: "/xsdk/addOrderInfoForPvAction",
		apiCode: "A1202"
	},
	// 机构列表查询
	queryBtranthList: {
		url: "/xsdk/queryBtranthList",
		apiCode: "A0791"
	},
	// 申请信息保存
	applySaveForPvAction: {
		url: "/xsdk/applySaveForPvAction",
		apiCode: "A1203"
	},
	// 申请信息提交
	applySubmitForPvAction: {
		url: "/xsdk/applySubmitForPvAction",
		apiCode: "A1204"
	},

	// 授权
	// 授权列表查询
	grantListForPvAction: {
		url: "/xsdk/grantListForPvAction",
		apiCode: "A1205"
	},
	// 授权详情查询
	grantDetailForPvAction: {
		url: "/xsdk/grantDetailForPvAction",
		apiCode: "A1206"
	},
	// 授权
	grantForPvAction: {
		url: "/xsdk/grantForPvAction",
		apiCode: "A1208"
	},

	// 绑定卡
	// 查询绑定卡信息
	queryBindAcctAction: {
		url: "/xsdk/queryBindAcctAction",
		apiCode: "A0797"
	},
	// 验证银行卡
	checkAccNoAction: {
		url: "/xsdk/checkAccNoAction",
		apiCode: "A0846"
	},
	// 新增/更换绑定卡
	changeBindAcctAction: {
		url: "/xsdk/changeBindAcctAction",
		apiCode: "A0799"
	},

	// 我的授信
	// 授信列表查询
	queryCreditLimitForPvAction: {
		url: "/xsdk/queryCreditLimitForPvAction",
		apiCode: "A1209"
	},
	// 结束授信
	endApplyAction: {
		url: "/xsdk/endApplyAction",
		apiCode: "A0795"
	},

	// 用款申请
	// 授信列表查询

	// 查询电站
	queryPowerForPvAction: {
		url: "/xsdk/queryPowerForPvAction",
		apiCode: "A1210"
	},
	// 支用申请试算
	loanTrialAction: {
		url: "/xsdk/loanTrialAction",
		apiCode: "A0532"
	},
	// 支用申请
	loanSubmitAction: {
		url: "/xsdk/loanSubmitAction",
		apiCode: "A0555"
	},
	// 支用授权后申请
	loanSubmitForPvAction: {
		url: "/xsdk/loanSubmitForPvAction",
		apiCode: "A1241"
	},
	// 支用申请列表查询
	queryApplyPageAction: {
		url: "/xsdk/queryApplyPageAction",
		apiCode: "A0847"
	},
	// 借据ID查询（根据支用申请ID）
	queryLoanIdAction: {
		url: "/xsdk/queryLoanIdAction",
		apiCode: "A0848"
	},
	// 重新获取授信利率
	queryCreditRateAction: {
		url: "/xsdk/queryCreditRateAction",
		apiCode: "A1133"
	},

	// 我的贷款
	// 借据列表查询
	queryLoanListAction: {
		url: "/xsdk/queryLoanListAction",
		apiCode: "A0579"
	},
	queryLoanDetailAction: {
		url: "/xsdk/queryLoanDetailAction",
		apiCode: "A0580"
	},
	// 还款计划明细查询
	planDetailAction: {
		url: "/xsdk/planDetailAction",
		apiCode: "A0586"
	},
	// 提前还款试算
	trialAdvanceRepayAction: {
		url: "/xsdk/trialAdvanceRepayAction",
		apiCode: "A0583"
	},
	// 还款
	loanRepayAction: {
		url: "/xsdk/loanRepayAction",
		apiCode: "A0582"
	},
	// 逾期详情
	overdueDescAction: {
		url: "/xsdk/overdueDescAction",
		apiCode: "A0627"
	},
	// 结清证明查询
	querySettleAction: {
		url: "/xsdk/querySettleAction",
		apiCode: "A0856"
	},
	// 借据查询
	queryReceiptAction: {
		url: "/xsdk/queryReceiptAction",
		apiCode: "A0796"
	},
	// 文本调阅
	queryContractProtocol: {
		// url: "/xsdk/queryContractProtocol",
		// apiCode: "A0642"
		url:"/xsdk/queryContractProtocolForPv",
		apiCode:"A1251"
	},
	//用户信息查询(授信)
	getUserInfoAction: {
		url: "/xsdk/getUserInfoAction",
		apiCode: "A0523"
	},
	//用户信息查询(用款)
	getUserInfoForPvAction: {
		url: "/xsdk/getUserInfoForPvAction",
		apiCode: "A1230"
	},
	// 上传文件
	uploadAction: {
		url: "/xsdk/uploadAction",
		apiCode: "A0782"
	},
	//查询客户经理名称
	queryOrganTreeByRoleAction: {
		url: "/xsdk/queryOrganTreeByRoleAction",
		apiCode: "A1247"
	},
	//受托账户校验
	checkAccountCreditForPvAction: {
		url: "/xsdk/checkAccountCreditForPvAction",
		apiCode: "A1271"
	},
	//用户卡信息获取
	queryBankCardPageForPvAction: {
		url: "/xsdk/queryBankCardPageForPvAction",
		apiCode: "A1275"
	},
	//注销账号
	logoutForPvAction: {
		url: "/xsdk/logoutForPvAction",
		apiCode: "A1281"
	}
}
