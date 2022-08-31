const creditState = [{
	state: '01',
	name: '配偶授权中'
}, {
	state: '02',
	name: '授权成功待提交'
}, {
	state: '03',
	name: '提交信贷成功，待审批'
}, {
	state: '04',
	name: '授权拒绝'
}, {
	state: '05',
	name: ''
}, {
	state: '06',
	name: '银行审批中'
}, {
	state: '07',
	name: '审批成功'
}, {
	state: '08',
	name: '审批拒绝'
}, {
	state: '09',
	name: '失效'
}]
export {creditState}
/**
 * 用款状态
 */
const loanState = [{
	state: '1',
	name: '未用款'
}, {
	state: '2',
	name: '提交完毕待授权'
}, {
	state: '3',
	name: '授权成功待提交'
}, {
	state: '4',
	name: '提交银行成功'
}, {
	state: '5',
	name: '用款授权拒绝'
}, {
	state: '6',
	name: '提交银行失败'
}, {
	state: '7',
	name: '已失效'
}, {
	state: '8',
	name: '银行审批失败'
}, {
	state: '9',
	name: '已用款'
}, {
	state: '10',
	name: '银行审批中'
}]
export {loanState}
/**
 * 担保方式
 */
const guarantWay = [{
	state: 'C',
	name: '保证'
}]
export {guarantWay}
/**
 * 贷款用途
 */
const loanPurpose = [{
	state: '2101',
	name: '购买光伏设备'
}]
export {loanPurpose}
/**
 * 还款方式
 */
const repayment = [{
	state: '1',
	name: '等额本息'
}, {
	state: '9',
	name: '按固定周期付息，按分期还款计划表还本'
}]
export {repayment}
/**
 * 支付方式
 */
const payMethod = [{
	state: '0',
	name: '自主支付'
}, {
	state: '1',
	name: '受托支付'
}]
export {payMethod}
/**
 * 借款期限单位
 */
const loanUnit = [{
	state: '1',
	name: '年'
}, {
	state: '2',
	name: '月'
},{
	state: '3',
	name: '日'
}, {
	state: '4',
	name: '期'
}]
export {loanUnit}
/**
 * 贷款状态
 */
const loanStatus = [{
	state: '1',
	name: '使用中'
}, {
	state: '2',
	name: '已逾期'
},{
	state: '3',
	name: '已结清'
}]
export {loanStatus}
/**
 * 还款状态
 */
const repayStatus = [{
	state: '1',
	name: '还款成功'
}, {
	state: '2',
	name: '还款中'
},{
	state: '3',
	name: '还款失败'
},{
	state: '4',
	name: '部分还款成功'
}]
export {repayStatus}