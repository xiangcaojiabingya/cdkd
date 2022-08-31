(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-personalCenter-mineLoan-loanDetail"],{4552:function(t,e,a){"use strict";(function(t){a("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"ItemNavBar",components:{},props:{title:{type:String,default:"Title"},isShowLeftIcon:{default:!0,type:Boolean},st:{default:2,type:Number}},data:function(){return{}},methods:{onClickLeft:function(){t("log","bbbbbbbbbbbbbbbb",this.st," at component/ItemNavBar.vue:36"),1==this.st?uni.redirectTo({url:"./credit"}):3==this.st?uni.switchTab({url:"../index/index"}):4==this.st?uni.redirectTo({url:"../../loan/applyConfirm"}):5==this.st?uni.redirectTo({url:"./loanApply"}):6==this.st?uni.redirectTo({url:"./loanList"}):7==this.st?uni.switchTab({url:"../index/index"}):8==this.st?uni.redirectTo({url:"./cardManage"}):9==this.st?uni.switchTab({url:"../personalCenter"}):uni.navigateBack()}}};e.default=n}).call(this,a("0de9")["log"])},"4fd0":function(t,e,a){"use strict";var n=a("da2d"),i=a.n(n);i.a},"50ee":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("item-nav-bar",{attrs:{title:"贷款详情"}}),a("v-uni-view",{staticClass:"content-body"},[a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("借款金额")]),a("v-uni-text",[t._v(t._s(t.queryLoanDetailActionObj.formatLoanAmount))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("起止时间")]),a("v-uni-text",[t._v(t._s(t.queryLoanDetailActionObj.loanStartTime)+"至"+t._s(t.queryLoanDetailActionObj.loanEndTime))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("年化利率")]),a("v-uni-text",[t._v(t._s(t.queryLoanDetailActionObj.rate)+"%")])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("还款方式")]),a("v-uni-text",[t._v(t._s(t.formatRepayMethod))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("首次还款日")]),a("v-uni-text",[t._v(t._s(t.queryLoanDetailActionObj.firstRepayDay))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("借款人姓名")]),a("v-uni-text",[t._v(t._s(t.queryLoanDetailActionObj.userName))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("借款人身份证")]),a("v-uni-text",[t._v(t._s(t.queryLoanDetailActionObj.certificateNo))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("还款日")]),a("v-uni-text",[t._v("每月"+t._s(t.queryLoanDetailActionObj.repayDay)+"号")])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("借款期限")]),a("v-uni-text",[t._v(t._s(t.formatApplyTerm)+"（期）")])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("合同及协议")]),a("v-uni-view",{staticClass:"look-view"},t._l(t.queryLoanDetailActionObj.contractInfoList,(function(e,n){return a("span",{staticClass:"selectlook",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.viewContract(e.contractFileUrl)}}},[t._v(t._s("《"+e.contractName+"》"))])})),0)],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"lable"},[t._v("借款用途")]),a("v-uni-text",[t._v(t._s(t.formatLoanPurpose))])],1)],1)],1)},o=[]},"55e9":function(t,e,a){"use strict";a.r(e);var n=a("50ee"),i=a("b2ee");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("4fd0");var r,s=a("f0c5"),l=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"fcb0c15e",null,!1,n["a"],r);e["default"]=l.exports},5816:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.itmenavbar[data-v-0581b724]{width:100%;height:%?90?%;background:#f2f2f2;color:#ff661a;font-size:%?36?%;display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;z-index:99}.backimg[data-v-0581b724]{width:%?32?%;position:absolute;left:%?30?%}',""]),t.exports=e},"7d0d":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDY0OCwgMjAyMS8wMS8xMi0xNTo1MjoyOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwMzY0NzA2QThFMjExRUM5MjFERjYwNDZDMzE1MDQ4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwMzY0NzA3QThFMjExRUM5MjFERjYwNDZDMzE1MDQ4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjAzNjQ3MDRBOEUyMTFFQzkyMURGNjA0NkMzMTUwNDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjAzNjQ3MDVBOEUyMTFFQzkyMURGNjA0NkMzMTUwNDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6un8f4AAABt0lEQVR42ryXOUuDQRCGkxBtLIxHoYVGPLCIJ7EIagpPJCBYCP4CbfwL1v4TEQsFRbTwRFEsPErB20JUxDMWdvFdmIVliPE79puFp9hhv7xvZmbnS8K5qepQQGsOxMEM2P3rUDQA4TCYBxO036GYmIFVkHF62LaBdTDCYuOFHohYFF/OI67KsCiRgW3Qx2JDYPO/B21kYCGP+JgTcRsZWAGjLJahXgi8CbdAP4v1ggM3H+K1BEtM/Af0uBX3mgFV2wFjnwPd4MzLN4n4FM+CNq/ibjOwxsTfQQpc+OniqMeG+wCd4N7vHXZSgg0m/gQ6bIg7MTALBo39IWiyJe7EQCPbfxMhKQPT4NzYD4M9UCRl4IWm250RS1MpiiUMqPVGd/3KiHWBUxuZcDqIsiRqmkiQiZiEAbU+QZKVowUcg3IJA2p90QC6NmINNIorJQyYU/DWiNVSOaokDOieSLJM1FAm4hIG9MuIN6bKwAmokzCgy9EKboxYBWWiXsKA/jWUYu+HGPVEs4QBPTFVTzwYsVIqR0Lqj8kraAeXRqwE7EsZ0CbS7HaUSRpQ65nmxBF4BJOFDv8KMAAXkFQC7I4/DAAAAABJRU5ErkJggg=="},8337:function(t,e,a){"use strict";a.r(e);var n=a("91d4"),i=a("f18a");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("9cb7");var r,s=a("f0c5"),l=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"0581b724",null,!1,n["a"],r);e["default"]=l.exports},"91d4":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"itmenavbar"},[t.isShowLeftIcon?n("v-uni-image",{staticClass:"backimg",attrs:{src:a("7d0d"),mode:"widthFix"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickLeft.apply(void 0,arguments)}}}):t._e()],1)},o=[]},"926d":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.repayStatus=e.loanStatus=e.loanUnit=e.payMethod=e.repayment=e.loanPurpose=e.guarantWay=e.loanState=e.creditState=void 0;var n=[{state:"01",name:"配偶授权中"},{state:"02",name:"授权成功待提交"},{state:"03",name:"提交信贷成功，待审批"},{state:"04",name:"授权拒绝"},{state:"05",name:""},{state:"06",name:"银行审批中"},{state:"07",name:"审批成功"},{state:"08",name:"审批拒绝"},{state:"09",name:"失效"}];e.creditState=n;var i=[{state:"1",name:"未用款"},{state:"2",name:"提交完毕待授权"},{state:"3",name:"授权成功待提交"},{state:"4",name:"提交银行成功"},{state:"5",name:"用款授权拒绝"},{state:"6",name:"提交银行失败"},{state:"7",name:"已失效"},{state:"8",name:"银行审批失败"},{state:"9",name:"已用款"},{state:"10",name:"银行审批中"}];e.loanState=i;var o=[{state:"C",name:"保证"}];e.guarantWay=o;var r=[{state:"2101",name:"购买光伏设备"}];e.loanPurpose=r;var s=[{state:"1",name:"等额本息"},{state:"9",name:"按固定周期付息，按分期还款计划表还本"}];e.repayment=s;var l=[{state:"0",name:"自主支付"},{state:"1",name:"受托支付"}];e.payMethod=l;var c=[{state:"1",name:"年"},{state:"2",name:"月"},{state:"3",name:"日"},{state:"4",name:"期"}];e.loanUnit=c;var u=[{state:"1",name:"使用中"},{state:"2",name:"已逾期"},{state:"3",name:"已结清"}];e.loanStatus=u;var d=[{state:"1",name:"还款成功"},{state:"2",name:"还款中"},{state:"3",name:"还款失败"},{state:"4",name:"部分还款成功"}];e.repayStatus=d},"969f":function(t,e,a){var n=a("5816");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("40813c8d",n,!0,{sourceMap:!1,shadowMode:!1})},"9b72":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.creditApplyStateList=e.repayStatus=e.businessNature=e.applyListState=e.position_code_list_new=e.applyState=e.farmers=e.house_status_invert=e.application_status=e.ownership_type=e.house_status=e.purpose_list_new=e.purpose_list=e.loanPurposeMap=e.guarantWayMap=e.repaymentMap=e.Industry=e.loanUnitMap=e.relation_type_list_ismarry=e.relation_type_list_marry=e.depositType_list=e.relation_type_list=e.position_code_list=e.vocation_code_list=e.education_code=e.educationList=e.depositDetailList=e.businessLicense=e.relation_type_list_select=e.relation_type_list_marry_select=e.relation_type_list_ismarry_select=e.baseInfoList=void 0;var n=[{label:"姓名",content:"王哈哈"},{label:"性别",content:"女"},{label:"出生日期",content:"2008-10-10"},{label:"证件类型",content:"身份证"},{label:"证件号码",content:"370882199210112012"},{label:"证件有效期",content:"2008-10-10至2013-10-10"},{label:"手机号码",content:"15054168807"},{label:"民族",content:"汉族"},{label:"国籍",content:"中国"}];e.baseInfoList=n;var i=[{label:"存款账户",content:"625800****8888"},{label:"子账号",content:"001004"},{label:"存款金额",content:"100,000.00元"},{label:"产品名称",content:"整存整取三年"},{label:"币种",content:"人民币"},{label:"开户机构",content:"济南路分行"},{label:"起息日",content:"2021/10/10"},{label:"到期日",content:"2024/10/10"},{label:"存期",content:"三年"},{label:"年利率",content:"4.6%"}];e.depositDetailList=i;var o=[{text:"整存整取",code:"0102"},{text:"大额存单",code:"0109"},{text:"存本取息",code:"0104"}];e.depositType_list=o;var r=[{text:"研究生或以上",code:"6"},{text:"本科",code:"5"},{text:"大专",code:"4"},{text:"高中/中专",code:"1"},{text:"初中或以下",code:"0"}];e.educationList=r;var s=[{text:"农、林、牧、渔业",code:"A"},{text:"采矿业",code:"B"},{text:"制造业",code:"C"},{text:"电力、热力、燃气及水生产和供应业",code:"D"},{text:"建筑业",code:"E"},{text:"交通运输、仓储和邮政业",code:"F"},{text:"信息传输、软件和信息技术服务业",code:"G"},{text:"批发和零售业",code:"H"},{text:"住宿和餐饮业",code:"I"},{text:"金融业",code:"J"},{text:"房地产业",code:"K"},{text:"租赁和商务服务业",code:"L"},{text:"科学研究和技术服务业",code:"M"},{text:"水利、环境和公共设施管理业",code:"N"},{text:"居民服务、修理和其他服务业",code:"O"},{text:"教育",code:"P"},{text:"卫生和社会工作",code:"Q"},{text:"公共管理、社会保障和社会组织",code:"S"},{text:"国际组织",code:"T"}];e.Industry=s;var l={0:"初中或以下",1:"高中/中专",4:"大专",5:"本科",6:"研究生或以上"};e.education_code=l;var c=[{text:"专业技术人员",code:"1"},{text:"国家机关、党群组织、企业、事业单位负责人",code:"0"},{text:"办事人员和有关人员",code:"3"},{text:"商业、服务业人员",code:"4"},{text:"农、林、牧、渔、水利业生产人员",code:"5"},{text:"生产、运输设备操作人员及有关人员",code:"6"},{text:"不便分类的其它从业人员",code:"Y"},{text:"军人",code:"X"},{text:"未知",code:"Z"}];e.vocation_code_list=c;var u=[{text:"高级领导",code:"1"},{text:"中级领导",code:"2"},{text:"一般员工",code:"3"},{text:"其他",code:"4"},{text:"未知",code:"9"}];e.position_code_list=u;var d=[{text:"高级领导(行政级别局级及局级以上领导或大公司高级管理人员)",code:"1"},{text:"中级领导(行政级别局级以下领导或大公司中级管理人员)",code:"2"},{text:"一般员工",code:"3"},{text:"其他",code:"4"},{text:"未知",code:"9"}];e.position_code_list_new=d;var v=[{text:"配偶",code:"1"},{text:"子女",code:"9"},{text:"父母",code:"5"},{text:"兄弟",code:"71"},{text:"姐妹",code:"72"},{text:"朋友",code:"84"}];e.relation_type_list=v;var p=[{text:"配偶",code:"1"}];e.relation_type_list_marry=p;var m=[{text:"子女",code:"9"},{text:"父母",code:"5"},{text:"兄弟",code:"71"},{text:"姐妹",code:"72"},{text:"朋友",code:"84"}];e.relation_type_list_ismarry=m;var b=[{label:"配偶",value:"1"},{label:"子女",value:"9"},{label:"父母",value:"5"},{label:"兄弟",value:"71"},{label:"姐妹",value:"72"},{label:"朋友",value:"84"}];e.relation_type_list_select=b;var f=[{label:"配偶",value:"1"}];e.relation_type_list_marry_select=f;var x=[{label:"子女",value:"9"},{label:"父母",value:"5"},{label:"兄弟",value:"71"},{label:"姐妹",value:"72"},{label:"朋友",value:"84"}];e.relation_type_list_ismarry_select=x;var _=[{text:"住宅",code:"01"},{text:"公寓",code:"02"},{text:"商铺",code:"03"}];e.purpose_list=_;var y=[{text:"住宅",code:"01"},{text:"公寓",code:"02"},{text:"别墅",code:"03"},{text:"商铺",code:"04"},{text:"办公",code:"05"}];e.purpose_list_new=y;var A=[{text:"出租",code:"01"},{text:"自住",code:"02"},{text:"闲置",code:"03"}];e.house_status=A;var h=[{text:"本人单独所有",code:"01"},{text:"配偶单独所有",code:"02"},{text:"夫妻双方共同所有",code:"03"},{text:"第三人所有",code:"04"}];e.ownership_type=h;var w={1:"年",2:"个月",3:"日",4:"期"};e.loanUnitMap=w;var M={1:"等额本息",2:"等额本金",3:"等本等费",4:"按期付息到期还本",5:"到期一次性还本付息"};e.repaymentMap=M;var g={D:"信用",B:"抵押",A:"质押",C:"保证"};e.guarantWayMap=g;var C={14:"购买原材料",21:"购买设备",22:"支付工程款",23:"流动资金",24:"经营周转资金",25:"货款"};e.loanPurposeMap=C;var L={"01":"关联人授权中","02":"等待提交","03":"审核审核中","04":"授权拒绝",99:"作废"};e.application_status=L;var I={"01":"出租","02":"自住","03":"闲置"};e.house_status_invert=I;var D={"00":"待授权","01":"已授权","02":"已失效",99:"拒绝授权"};e.applyState=D;var j={"01":"关联人授权中","02":"授权成功待提交","03":"提交信贷成功，待审批","04":"授权拒绝","05":"取消","06":"银行审核中","07":"审核通过","08":"审核未通过","09":"失效",99:"删除"};e.applyListState=j;var R=[{text:"否",code:"0"},{text:"是",code:"1"}];e.farmers=R;var N=[{text:"是",code:"1"},{text:"否",code:"0"}];e.businessLicense=N;var S={1:"还款成功",2:"还款中",3:"还款失败",4:"部分还款成功"};e.repayStatus=S;var T=[{text:"是",code:"1"},{text:"否",code:"0"}];e.businessNature=T;var U=[{state:"00",name:"初始化"},{state:"01",name:"预授信"},{state:"02",name:"授信审批中"},{state:"03",name:"授信通过"},{state:"04",name:"授信拒绝"},{state:"05",name:"补件"}];e.creditApplyStateList=U},"9cb7":function(t,e,a){"use strict";var n=a("969f"),i=a.n(n);i.a},b2ee:function(t,e,a){"use strict";a.r(e);var n=a("c1e3"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},c1e3:function(t,e,a){"use strict";(function(t){var n=a("4ea4");a("4de4"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("9b72"),o=a("2707"),r=a("926d"),s=n(a("8337")),l={components:{ItemNavBar:s.default},data:function(){return{username:"",userCertId:"",loanReceipt:{},loanDetail:{},formatApplyTerm:"",formatRepayMethod:"",formatLoanPurpose:"",queryLoanDetailActionObj:{}}},onLoad:function(){this.loanReceipt=getApp().globalData.loanDetail,this.getLoanDetail()},methods:{repaymentMatch:function(t){var e=r.repayment.filter((function(e){return e.state===t}));return e[0]?e[0].name:""},loanUnitMatch:function(t){var e=r.loanUnit.filter((function(e){return e.state===t}));return e[0]?e[0].name:""},viewContract:function(t){if(getApp().globalData.openReader){JSON.stringify({contractInfoList:[{contractFileUrl:t}]});getApp().globalData.contractInfoList=[{contractFileUrl:t}],uni.navigateTo({url:"../../../component/ReadDocument?noTime=true"})}},getLoanDetail:function(){var e=this;uni.showLoading({title:"加载中"}),this.$request.postAjax(this.$apiUrl.queryLoanDetailAction,{productId:"ZYD001",loanInvoiceId:this.loanReceipt.loanInvoiceId}).then((function(a){t("log","贷款详情：",a," at pages/personalCenter/mineLoan/loanDetail.vue:163"),a.formatLoanAmount=(0,o.formatThousandsNew)(a.loanAmount),e.formatApplyTerm=a.applyTerm+i.loanUnitMap[a.applyTermUnit],e.formatRepayMethod=i.repaymentMap[a.repayMethod],e.formatLoanPurpose=i.loanPurposeMap[a.loanPurpose],e.queryLoanDetailActionObj=a,uni.hideLoading()})).catch((function(e){t("log",e," at pages/personalCenter/mineLoan/loanDetail.vue:173"),uni.hideLoading()}))}}};e.default=l}).call(this,a("0de9")["log"])},c283:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content-body[data-v-fcb0c15e]{background-color:#fff;padding:%?20?% 0;width:calc(100% - %?40?%);border-radius:%?16?%;margin-left:%?20?%;margin-right:%?20?%}.item-view[data-v-fcb0c15e]{width:100%;padding:%?20?% %?20?% %?20?% %?30?%;box-sizing:border-box;display:flex;flex-direction:row;font-size:%?30?%;color:var(--fontColor);justify-content:space-between}.item-view .lable[data-v-fcb0c15e]{color:var(--fontColor);min-width:%?240?%}.item-view .look-view[data-v-fcb0c15e]{align-items:center;color:var(--color-orange-text)}',""]),t.exports=e},da2d:function(t,e,a){var n=a("c283");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("51931460",n,!0,{sourceMap:!1,shadowMode:!1})},f18a:function(t,e,a){"use strict";a.r(e);var n=a("4552"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a}}]);