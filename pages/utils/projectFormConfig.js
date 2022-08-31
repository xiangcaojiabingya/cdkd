const baseInfoList = [
	{ label: '姓名', content: '王哈哈' },
	{ label: '性别', content: '女' },
	{ label: '出生日期', content: '2008-10-10' },
	{ label: '证件类型', content: '身份证' },
	{ label: '证件号码', content: '370882199210112012' },
	{ label: '证件有效期', content: '2008-10-10至2013-10-10' },
	{ label: '手机号码', content: '15054168807' },
	{ label: '民族', content: '汉族' },
	{ label: '国籍', content: '中国' }
];

const depositDetailList = [
	{ label: '存款账户', content: '625800****8888' },
	{ label: '子账号', content: '001004' },
	{ label: '存款金额', content: '100,000.00元' },
	{ label: '产品名称', content: '整存整取三年' },
	{ label: '币种', content: '人民币' },
	{ label: '开户机构', content: '济南路分行' },
	{ label: '起息日', content: '2021/10/10' },
	{ label: '到期日', content: '2024/10/10' },
	{ label: '存期', content: '三年' },
	{ label: '年利率', content: '4.6%' }
];

const depositType_list = [ { text: '整存整取', code: '0102' }, { text: '大额存单', code: '0109' }, { text: '存本取息', code: '0104' } ];

//
const educationList = [
	{ text: '研究生或以上', code: '6' },
	{ text: '本科', code: '5' },
	{ text: '大专', code: '4' },
	{ text: '高中/中专', code: '1' },
	{ text: '初中或以下', code: '0' }
];

const education_code = {
	0: '初中或以下',
	1: '高中/中专',
	4: '大专',
	5: '本科',
	6: '研究生或以上'
};

const vocation_code_list = [
	{ text: '专业技术人员', code: '1' },
	{ text: '国家机关、党群组织、企业、事业单位负责人', code: '0' },
	{ text: '办事人员和有关人员', code: '3' },
	{ text: '商业、服务业人员', code: '4' },
	{ text: '农、林、牧、渔、水利业生产人员', code: '5' },
	{ text: '生产、运输设备操作人员及有关人员', code: '6' },
	{ text: '不便分类的其它从业人员', code: 'Y' },
	{ text: '军人', code: 'X' },
	{ text: '未知', code: 'Z' }
];

const position_code_list = [
	{ text: '高级领导', code: '1' },
	{ text: '中级领导', code: '2' },
	{ text: '一般员工', code: '3' },
	{ text: '其他', code: '4' },
	{ text: '未知', code: '9' }
];

const position_code_list_new = [
	{ text: '高级领导(行政级别局级及局级以上领导或大公司高级管理人员)', code: '1' },
	{ text: '中级领导(行政级别局级以下领导或大公司中级管理人员)', code: '2' },
	{ text: '一般员工', code: '3' },
	{ text: '其他', code: '4' },
	{ text: '未知', code: '9' }
];

const relation_type_list = [
	{ text: '配偶', code: '1' },
	{ text: '子女', code: '9' },
	{ text: '父母', code: '5' },
	{ text: '兄弟', code: '71' },
	{ text: '姐妹', code: '72' },
	{ text: '朋友', code: '84' }
];

// 规划用途
const purpose_list = [ { text: '住宅', code: '01' }, { text: '公寓', code: '02' }, { text: '商铺', code: '03' } ];

const purpose_list_new = [
	{ text: '住宅', code: '01' },
	{ text: '公寓', code: '02' },
	{ text: '别墅', code: '03' },
	{ text: '商铺', code: '04' },
	{ text: '办公', code: '05' }
];

// 房屋状态
const house_status = [ { text: '出租', code: '01' }, { text: '自住', code: '02' }, { text: '闲置', code: '03' } ];

// 房屋所有权类ing
const ownership_type = [
	{ text: '本人单独所有', code: '01' },
	{ text: '配偶单独所有', code: '02' },
	{ text: '夫妻双方共同所有', code: '03' },
	{ text: '第三人所有', code: '04' }
];

const loanUnitMap = {
	1: '年',
	2: '个月',
	3: '日',
	4: '期'
};

const repaymentMap = {
	1: '等额本息',
	2: '等额本金',
	3: '等本等费',
	4: '按期付息到期还本',
	5: '到期一次性还本付息'
};

const guarantWayMap = {
	D: '信用',
	B: '抵押',
	A: '质押',
	C: '保证'
};

const loanPurposeMap = {
	10: '综合消费',
	15: '购车',
	7: '购家具',
	0: '购家电',
	1: '家装',
	5: '教育',
	8: '婚庆',
	6: '旅游'
};

const application_status = {
	'01': '关联人授权中',
	'02': '等待提交',
	'03': '审核审核中',
	'04': '授权拒绝',
	'99': '作废'
};

const house_status_invert = {
	'01': '出租',
	'02': '自住',
	'03': '闲置'
};

const applyState = {
	'00': '待授权',
	'01': '已授权',
	'02': '已失效',
	'99': '拒绝授权'
};

const applyListState = {
	'01': '关联人授权中',
	'02': '授权成功待提交',
	'03': '提交信贷成功，待审批',
	'04': '授权拒绝',
	'05': '取消',
	'06': '银行审核中',
	'07': '审核通过',
	'08': '审核未通过',
	'09': '失效',
	'99': '删除'
};

const repayStatus = {
	'1': '还款成功',
	'2': '还款中',
	'3': '还款失败',
	'4': '部分还款成功'
};

const creditApplyStateList = {
	'00': '初始化',
	'01': '预授信',
	'02': '授信审批中',
	'03': '授信通过',
	'04': '授信拒绝',
	'05': '补件'
};

export {
	baseInfoList,
	depositDetailList,
	educationList,
	education_code,
	vocation_code_list,
	position_code_list,
	relation_type_list,
	depositType_list,
	loanUnitMap,
	repaymentMap,
	guarantWayMap,
	loanPurposeMap,
	purpose_list,
	purpose_list_new,
	house_status,
	ownership_type,
	application_status,
	house_status_invert,
	applyState,
	position_code_list_new,
	applyListState,
	repayStatus,
	creditApplyStateList
};
