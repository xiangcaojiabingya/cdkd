(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-credit-creditSpouse"],{"10d8":function(t,e,A){var a=A("f4ef");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=A("4f06").default;n("46a60102",a,!0,{sourceMap:!1,shadowMode:!1})},"11d4":function(t,e,A){"use strict";var a=A("10d8"),n=A.n(a);n.a},"1de5":function(t,e,A){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},3650:function(t,e,A){"use strict";A.r(e);var a=A("5bfd"),n=A("e516");for(var i in n)"default"!==i&&function(t){A.d(e,t,(function(){return n[t]}))}(i);A("11d4");var o,r=A("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"24213685",null,!1,a["a"],o);e["default"]=c.exports},4552:function(t,e,A){"use strict";(function(t){A("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"ItemNavBar",components:{},props:{title:{type:String,default:"Title"},isShowLeftIcon:{default:!0,type:Boolean},st:{default:2,type:Number}},data:function(){return{}},methods:{onClickLeft:function(){t("log","bbbbbbbbbbbbbbbb",this.st," at component/ItemNavBar.vue:36"),1==this.st?uni.redirectTo({url:"./credit"}):3==this.st?uni.switchTab({url:"../index/index"}):4==this.st?uni.redirectTo({url:"../../loan/applyConfirm"}):5==this.st?uni.redirectTo({url:"./loanApply"}):6==this.st?uni.redirectTo({url:"./loanList"}):7==this.st?uni.switchTab({url:"../index/index"}):8==this.st?uni.redirectTo({url:"./cardManage"}):9==this.st?uni.switchTab({url:"../personalCenter"}):uni.navigateBack()}}};e.default=a}).call(this,A("0de9")["log"])},5816:function(t,e,A){var a=A("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.itmenavbar[data-v-0581b724]{width:100%;height:%?90?%;background:#f2f2f2;color:#ff661a;font-size:%?36?%;display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;z-index:99}.backimg[data-v-0581b724]{width:%?32?%;position:absolute;left:%?30?%}',""]),t.exports=e},"5bfd":function(t,e,A){"use strict";var a;A.d(e,"b",(function(){return n})),A.d(e,"c",(function(){return i})),A.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("item-nav-bar",{attrs:{title:"用款申请确认",st:5}}),a("v-uni-view",{staticClass:"content-body"},[a("v-uni-view",{staticClass:"white-bg-view"},[a("v-uni-text",[t._v("借款本金（元）")]),a("v-uni-text",{staticClass:"money-text"},[t._v(t._s(t.formatLoanAmount))])],1),a("v-uni-view",{staticClass:"item-body"},[a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",[t._v("贷款期限")]),a("v-uni-text",[t._v(t._s(t.formatLoanPeriod))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",{staticClass:"min-width-140"},[t._v("还款方式")]),a("v-uni-text",[t._v(t._s(t.formatRepayment))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",[t._v("用途")]),a("v-uni-text",[t._v(t._s(t.formatLoanPurpose))])],1),a("v-uni-view",{staticClass:"item-view "},[a("v-uni-text",[t._v("担保方式")]),a("v-uni-text",[t._v(t._s(t.formatGuarantWay))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",[t._v("年利率")]),a("v-uni-text",[t._v(t._s(t.initRate+"%"))])],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",[t._v("还款计划")]),a("v-uni-view",{staticClass:"look-view",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toPlan.apply(void 0,arguments)}}},[a("v-uni-text",[t._v("查看")]),a("v-uni-image",{staticClass:"right_icon",attrs:{src:A("d5a6"),mode:"widthFix"}})],1)],1),a("v-uni-view",{staticClass:"item-view"},[a("v-uni-text",[t._v("收款账户")]),a("v-uni-text",[t._v(t._s(t.loanAcctNo))])],1)],1),a("v-uni-view",{staticClass:"item-body mt22 borders"},[a("v-uni-view",{staticClass:"tip-view"},[t._v("根据监管规定，贷款资金只能用于个人经营用途，不可用于购买\n\t\t\t\t理财、股票、房产等风险投资，请您合理规划贷款用途。")]),a("v-uni-view",{staticClass:"sq-view"},[a("v-uni-view",{staticClass:"check-view",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleAgree.apply(void 0,arguments)}}},[a("v-uni-image",{staticClass:"check-img",attrs:{src:t.isAgree?"../../static/img/cerdit/form_icon_agree.png":"../../static/img/cerdit/form_icon_disagree.png"}}),a("v-uni-text",{staticClass:"agree-tip"},[t._v("请阅读协议信息")])],1),a("v-uni-view",{staticClass:"ml60",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.singleAgree("borrow")}}},[t._v("《个人经营性借款合同（线上）》")]),a("v-uni-view",{staticClass:"mt22 ml60",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.singleAgree("pledge")}}},[t._v("《本金最高额权利质押合同（线上）》")]),a("v-uni-view",{staticClass:"mt22 ml60",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.singleAgree("promise")}}},[t._v("《资金使用承诺函》")])],1)],1),a("v-uni-button",{staticClass:"button",attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.nextStep.apply(void 0,arguments)}}},[t._v("下一步")])],1)],1)},i=[]},"7d0d":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDY0OCwgMjAyMS8wMS8xMi0xNTo1MjoyOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwMzY0NzA2QThFMjExRUM5MjFERjYwNDZDMzE1MDQ4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwMzY0NzA3QThFMjExRUM5MjFERjYwNDZDMzE1MDQ4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjAzNjQ3MDRBOEUyMTFFQzkyMURGNjA0NkMzMTUwNDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjAzNjQ3MDVBOEUyMTFFQzkyMURGNjA0NkMzMTUwNDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6un8f4AAABt0lEQVR42ryXOUuDQRCGkxBtLIxHoYVGPLCIJ7EIagpPJCBYCP4CbfwL1v4TEQsFRbTwRFEsPErB20JUxDMWdvFdmIVliPE79puFp9hhv7xvZmbnS8K5qepQQGsOxMEM2P3rUDQA4TCYBxO036GYmIFVkHF62LaBdTDCYuOFHohYFF/OI67KsCiRgW3Qx2JDYPO/B21kYCGP+JgTcRsZWAGjLJahXgi8CbdAP4v1ggM3H+K1BEtM/Af0uBX3mgFV2wFjnwPd4MzLN4n4FM+CNq/ibjOwxsTfQQpc+OniqMeG+wCd4N7vHXZSgg0m/gQ6bIg7MTALBo39IWiyJe7EQCPbfxMhKQPT4NzYD4M9UCRl4IWm250RS1MpiiUMqPVGd/3KiHWBUxuZcDqIsiRqmkiQiZiEAbU+QZKVowUcg3IJA2p90QC6NmINNIorJQyYU/DWiNVSOaokDOieSLJM1FAm4hIG9MuIN6bKwAmokzCgy9EKboxYBWWiXsKA/jWUYu+HGPVEs4QBPTFVTzwYsVIqR0Lqj8kraAeXRqwE7EsZ0CbS7HaUSRpQ65nmxBF4BJOFDv8KMAAXkFQC7I4/DAAAAABJRU5ErkJggg=="},8337:function(t,e,A){"use strict";A.r(e);var a=A("91d4"),n=A("f18a");for(var i in n)"default"!==i&&function(t){A.d(e,t,(function(){return n[t]}))}(i);A("9cb7");var o,r=A("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"0581b724",null,!1,a["a"],o);e["default"]=c.exports},"91d4":function(t,e,A){"use strict";var a;A.d(e,"b",(function(){return n})),A.d(e,"c",(function(){return i})),A.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"itmenavbar"},[t.isShowLeftIcon?a("v-uni-image",{staticClass:"backimg",attrs:{src:A("7d0d"),mode:"widthFix"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickLeft.apply(void 0,arguments)}}}):t._e()],1)},i=[]},"926d":function(t,e,A){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.repayStatus=e.loanStatus=e.loanUnit=e.payMethod=e.repayment=e.loanPurpose=e.guarantWay=e.loanState=e.creditState=void 0;var a=[{state:"01",name:"配偶授权中"},{state:"02",name:"授权成功待提交"},{state:"03",name:"提交信贷成功，待审批"},{state:"04",name:"授权拒绝"},{state:"05",name:""},{state:"06",name:"银行审批中"},{state:"07",name:"审批成功"},{state:"08",name:"审批拒绝"},{state:"09",name:"失效"}];e.creditState=a;var n=[{state:"1",name:"未用款"},{state:"2",name:"提交完毕待授权"},{state:"3",name:"授权成功待提交"},{state:"4",name:"提交银行成功"},{state:"5",name:"用款授权拒绝"},{state:"6",name:"提交银行失败"},{state:"7",name:"已失效"},{state:"8",name:"银行审批失败"},{state:"9",name:"已用款"},{state:"10",name:"银行审批中"}];e.loanState=n;var i=[{state:"C",name:"保证"}];e.guarantWay=i;var o=[{state:"2101",name:"购买光伏设备"}];e.loanPurpose=o;var r=[{state:"1",name:"等额本息"},{state:"9",name:"按固定周期付息，按分期还款计划表还本"}];e.repayment=r;var c=[{state:"0",name:"自主支付"},{state:"1",name:"受托支付"}];e.payMethod=c;var s=[{state:"1",name:"年"},{state:"2",name:"月"},{state:"3",name:"日"},{state:"4",name:"期"}];e.loanUnit=s;var l=[{state:"1",name:"使用中"},{state:"2",name:"已逾期"},{state:"3",name:"已结清"}];e.loanStatus=l;var d=[{state:"1",name:"还款成功"},{state:"2",name:"还款中"},{state:"3",name:"还款失败"},{state:"4",name:"部分还款成功"}];e.repayStatus=d},"969f":function(t,e,A){var a=A("5816");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=A("4f06").default;n("40813c8d",a,!0,{sourceMap:!1,shadowMode:!1})},"9b72":function(t,e,A){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.creditApplyStateList=e.repayStatus=e.businessNature=e.applyListState=e.position_code_list_new=e.applyState=e.farmers=e.house_status_invert=e.application_status=e.ownership_type=e.house_status=e.purpose_list_new=e.purpose_list=e.loanPurposeMap=e.guarantWayMap=e.repaymentMap=e.Industry=e.loanUnitMap=e.relation_type_list_ismarry=e.relation_type_list_marry=e.depositType_list=e.relation_type_list=e.position_code_list=e.vocation_code_list=e.education_code=e.educationList=e.depositDetailList=e.businessLicense=e.relation_type_list_select=e.relation_type_list_marry_select=e.relation_type_list_ismarry_select=e.baseInfoList=void 0;var a=[{label:"姓名",content:"王哈哈"},{label:"性别",content:"女"},{label:"出生日期",content:"2008-10-10"},{label:"证件类型",content:"身份证"},{label:"证件号码",content:"370882199210112012"},{label:"证件有效期",content:"2008-10-10至2013-10-10"},{label:"手机号码",content:"15054168807"},{label:"民族",content:"汉族"},{label:"国籍",content:"中国"}];e.baseInfoList=a;var n=[{label:"存款账户",content:"625800****8888"},{label:"子账号",content:"001004"},{label:"存款金额",content:"100,000.00元"},{label:"产品名称",content:"整存整取三年"},{label:"币种",content:"人民币"},{label:"开户机构",content:"济南路分行"},{label:"起息日",content:"2021/10/10"},{label:"到期日",content:"2024/10/10"},{label:"存期",content:"三年"},{label:"年利率",content:"4.6%"}];e.depositDetailList=n;var i=[{text:"整存整取",code:"0102"},{text:"大额存单",code:"0109"},{text:"存本取息",code:"0104"}];e.depositType_list=i;var o=[{text:"研究生或以上",code:"6"},{text:"本科",code:"5"},{text:"大专",code:"4"},{text:"高中/中专",code:"1"},{text:"初中或以下",code:"0"}];e.educationList=o;var r=[{text:"农、林、牧、渔业",code:"A"},{text:"采矿业",code:"B"},{text:"制造业",code:"C"},{text:"电力、热力、燃气及水生产和供应业",code:"D"},{text:"建筑业",code:"E"},{text:"交通运输、仓储和邮政业",code:"F"},{text:"信息传输、软件和信息技术服务业",code:"G"},{text:"批发和零售业",code:"H"},{text:"住宿和餐饮业",code:"I"},{text:"金融业",code:"J"},{text:"房地产业",code:"K"},{text:"租赁和商务服务业",code:"L"},{text:"科学研究和技术服务业",code:"M"},{text:"水利、环境和公共设施管理业",code:"N"},{text:"居民服务、修理和其他服务业",code:"O"},{text:"教育",code:"P"},{text:"卫生和社会工作",code:"Q"},{text:"公共管理、社会保障和社会组织",code:"S"},{text:"国际组织",code:"T"}];e.Industry=r;var c={0:"初中或以下",1:"高中/中专",4:"大专",5:"本科",6:"研究生或以上"};e.education_code=c;var s=[{text:"专业技术人员",code:"1"},{text:"国家机关、党群组织、企业、事业单位负责人",code:"0"},{text:"办事人员和有关人员",code:"3"},{text:"商业、服务业人员",code:"4"},{text:"农、林、牧、渔、水利业生产人员",code:"5"},{text:"生产、运输设备操作人员及有关人员",code:"6"},{text:"不便分类的其它从业人员",code:"Y"},{text:"军人",code:"X"},{text:"未知",code:"Z"}];e.vocation_code_list=s;var l=[{text:"高级领导",code:"1"},{text:"中级领导",code:"2"},{text:"一般员工",code:"3"},{text:"其他",code:"4"},{text:"未知",code:"9"}];e.position_code_list=l;var d=[{text:"高级领导(行政级别局级及局级以上领导或大公司高级管理人员)",code:"1"},{text:"中级领导(行政级别局级以下领导或大公司中级管理人员)",code:"2"},{text:"一般员工",code:"3"},{text:"其他",code:"4"},{text:"未知",code:"9"}];e.position_code_list_new=d;var u=[{text:"配偶",code:"1"},{text:"子女",code:"9"},{text:"父母",code:"5"},{text:"兄弟",code:"71"},{text:"姐妹",code:"72"},{text:"朋友",code:"84"}];e.relation_type_list=u;var v=[{text:"配偶",code:"1"}];e.relation_type_list_marry=v;var p=[{text:"子女",code:"9"},{text:"父母",code:"5"},{text:"兄弟",code:"71"},{text:"姐妹",code:"72"},{text:"朋友",code:"84"}];e.relation_type_list_ismarry=p;var g=[{label:"配偶",value:"1"},{label:"子女",value:"9"},{label:"父母",value:"5"},{label:"兄弟",value:"71"},{label:"姐妹",value:"72"},{label:"朋友",value:"84"}];e.relation_type_list_select=g;var m=[{label:"配偶",value:"1"}];e.relation_type_list_marry_select=m;var b=[{label:"子女",value:"9"},{label:"父母",value:"5"},{label:"兄弟",value:"71"},{label:"姐妹",value:"72"},{label:"朋友",value:"84"}];e.relation_type_list_ismarry_select=b;var h=[{text:"住宅",code:"01"},{text:"公寓",code:"02"},{text:"商铺",code:"03"}];e.purpose_list=h;var w=[{text:"住宅",code:"01"},{text:"公寓",code:"02"},{text:"别墅",code:"03"},{text:"商铺",code:"04"},{text:"办公",code:"05"}];e.purpose_list_new=w;var M=[{text:"出租",code:"01"},{text:"自住",code:"02"},{text:"闲置",code:"03"}];e.house_status=M;var f=[{text:"本人单独所有",code:"01"},{text:"配偶单独所有",code:"02"},{text:"夫妻双方共同所有",code:"03"},{text:"第三人所有",code:"04"}];e.ownership_type=f;var x={1:"年",2:"个月",3:"日",4:"期"};e.loanUnitMap=x;var y={1:"等额本息",2:"等额本金",3:"等本等费",4:"按期付息到期还本",5:"到期一次性还本付息"};e.repaymentMap=y;var I={D:"信用",B:"抵押",A:"质押",C:"保证"};e.guarantWayMap=I;var D={14:"购买原材料",21:"购买设备",22:"支付工程款",23:"流动资金",24:"经营周转资金",25:"货款"};e.loanPurposeMap=D;var G={"01":"关联人授权中","02":"等待提交","03":"审核审核中","04":"授权拒绝",99:"作废"};e.application_status=G;var C={"01":"出租","02":"自住","03":"闲置"};e.house_status_invert=C;var Y={"00":"待授权","01":"已授权","02":"已失效",99:"拒绝授权"};e.applyState=Y;var E={"01":"关联人授权中","02":"授权成功待提交","03":"提交信贷成功，待审批","04":"授权拒绝","05":"取消","06":"银行审核中","07":"审核通过","08":"审核未通过","09":"失效",99:"删除"};e.applyListState=E;var R=[{text:"否",code:"0"},{text:"是",code:"1"}];e.farmers=R;var B=[{text:"是",code:"1"},{text:"否",code:"0"}];e.businessLicense=B;var Q={1:"还款成功",2:"还款中",3:"还款失败",4:"部分还款成功"};e.repayStatus=Q;var N=[{text:"是",code:"1"},{text:"否",code:"0"}];e.businessNature=N;var j=[{state:"00",name:"初始化"},{state:"01",name:"预授信"},{state:"02",name:"授信审批中"},{state:"03",name:"授信通过"},{state:"04",name:"授信拒绝"},{state:"05",name:"补件"}];e.creditApplyStateList=j},"9cb7":function(t,e,A){"use strict";var a=A("969f"),n=A.n(a);n.a},"9cfe":function(t,e,A){"use strict";(function(t){var a=A("4ea4");A("99af"),A("4de4"),A("4d63"),A("ac1f"),A("25f0"),A("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=A("2707"),i=A("9b72"),o=A("926d"),r=a(A("8337")),c=a(A("1e9c")),s={components:{ItemNavBar:r.default},data:function(){return{isAgree:!1,applyInfoCheck:{},loanSubmitInfo:{},creditLimitId:"",sequenceNo:"",txtContractId:"",formatLoanAmount:"",formatLoanPeriod:"",formatRepayment:"",formatLoanPurpose:"",formatGuarantWay:"",initRate:"",loanAcctNo:"",creditLimitObj:{},loanAmount:"",loanPeriod:"",repaymen:"",isAgreeJsonFlag:{borrow:!1,pledge:!1,promise:!1},RedirectUrl:"",url:"",bizToken:""}},onLoad:function(t){sessionStorage.alreadyRead=!1},onShow:function(){var e=this,A=uni.getStorageSync("loanSubmitReqObj"),a=uni.getStorageSync("creditLimitObjAppconfirm")||{},o=A.loanAmount,r=A.loanPeriod,c=A.loanUnit,s=A.repayment,l=A.loanPurpose,d=A.guarantWay,u=A.initRate,v=A.loanAcctNo;this.formatLoanAmount=(0,n.formatThousandsNew)(o),this.formatLoanPeriod=r+i.loanUnitMap[c],this.formatRepayment=i.repaymentMap[s],this.formatLoanPurpose=i.loanPurposeMap[l],this.formatGuarantWay=i.guarantWayMap[d],this.initRate=u,this.loanAcctNo=v,this.creditLimitObj=a,this.loanAmount=o,this.loanPeriod=r,this.repayment=s;var p=JSON.parse(sessionStorage.alreadyRead),g=this.$gfdGlobalData.getData("redBPP");uni.showModal({title:"是否注销当前账号",content:alreadyReada+g,success:function(e){var A=this;setTimeout((function(){p&&"true"===g?(uni.showToast({title:"此为true",icon:"none"}),t("log","alreadyReada为true",p," at pages/credit/creditSpouse.vue:180"),A.isAgree=!0):(uni.showToast({title:"此为false",icon:"none"}),t("log","alreadyReada为false",p," at pages/credit/creditSpouse.vue:187"),A.isAgree=!1)}),1e3)}}),setTimeout((function(){p&&"true"===g?(uni.showToast({title:"此为true",icon:"none"}),t("log","alreadyReada为true",p," at pages/credit/creditSpouse.vue:200"),e.isAgree=!0):(uni.showToast({title:"此为false",icon:"none"}),t("log","alreadyReada为false",p," at pages/credit/creditSpouse.vue:207"),e.isAgree=!1)}),1e3),t("log","isAgreeisAgreeisAgree：",this.isAgree," at pages/credit/creditSpouse.vue:212")},methods:{guarantWayMatch:function(t){var e=o.guarantWay.filter((function(e){return e.state===t}));return e[0]?e[0].name:""},loanPurposeMatch:function(t){var e=o.loanPurpose.filter((function(e){return e.state===t}));return e[0]?e[0].name:""},repaymentMatch:function(t){var e=o.repayment.filter((function(e){return e.state===t}));return e[0]?e[0].name:""},payMethodMatch:function(t){var e=o.payMethod.filter((function(e){return e.state===t}));return e[0]?e[0].name:""},loanUnitMatch:function(t){var e=o.loanUnit.filter((function(e){return e.state===t}));return e[0]?e[0].name:""},toPlan:function(){uni.navigateTo({url:"./pepaymentPlan?creditLimitObj=".concat(encodeURIComponent(JSON.stringify(this.creditLimitObj)),"&loanAmount=").concat(this.loanAmount,"&loanPeriod=").concat(this.loanPeriod,"&repayment=").concat(this.repayment)})},decodeAmp:function(t){var e="&amp;",A="amp;";return t=t.replace(new RegExp(e,"g"),"&"),t=t.replace(new RegExp(A,"g"),""),t},getAccessUrl:function(){return c.default[c.default.env].accessUrl},getBizToken:function(){var e=this;uni.showLoading({title:"加载中"}),this.$request.postAjax(this.$apiUrl.getBizToken,{productId:"ZYD001",queryType:"4",appCode:"xfsd",url:this.getAccessUrl()+this.$gfdGlobalData.getData("RedirectUrl")}).then((function(A){t("log","获取人脸核身数据",A," at pages/credit/creditSpouse.vue:277"),e.bizToken=A.bizToken,e.$gfdGlobalData.setData("bizToken",e.bizToken),e.url=e.decodeAmp(A.url),setTimeout((function(){window.location.replace(e.url)}),1e3),uni.hideLoading()})).catch((function(e){t("log",e," at pages/credit/creditSpouse.vue:288")}))},nextStep:function(){if(this.isAgree){var t=uni.getStorageSync("loanSubmitReqObj");t.applyId=this.creditLimitObj.applyId,t.txtContractId=this.txtContractId,uni.setStorageSync("loanSubmitReqObj",t),this.$gfdGlobalData.getData("openFaceAndOcr")?(this.$gfdGlobalData.setData("RedirectUrl","pages/common/smsVerification/smsVerification?type=loan"),this.getBizToken()):uni.navigateTo({url:"../common/smsVerification/smsVerification?type=loan"})}else uni.showToast({title:"请先阅读并同意个人经营性借款合同和本金最高额权利质押合同",icon:"none"})},getMoneyFormat:function(t){return(0,n.moneyFormat)(t+"")},singleAgree:function(t){this.$gfdGlobalData.getData("openReader")&&this.redeayRequest(t)},handleAgree:function(){this.isAgree=!this.isAgree,this.$gfdGlobalData.setData("redBPP","true"),this.isAgree||(sessionStorage.alreadyRead=!1,this.$gfdGlobalData.setData("redBPP","false")),this.isAgree&&this.$gfdGlobalData.getData("openReader")&&this.redeayRequest("borrow,pledge,promise")},redeayRequest:function(e){var A=this,a=uni.getStorageSync("loanSubmitReqObj");uni.showLoading({title:"加载中"}),this.$request.postAjax(this.$apiUrl.queryContractProtocolUsemoney,{productId:"ZYD001",contractType:e,creditLimitId:a.creditLimitId,loanPeriod:a.loanPeriod,loanUnit:a.loanUnit,loanAmount:a.loanAmount,repayment:a.repayment,initRate:a.initRate,loanAcctNo:a.loanAcctNo,rcvAcctNo:"1"===a.payMethod?a.rcvAcctNo:"",rcvAcctName:"1"===a.payMethod?a.rcvAcctName:"",rcvAcctBankName:"1"===a.payMethod?a.rcvAcctBankName:"",payMethod:a.payMethod,loanPurpose:a.loanPurpose,applyId:this.creditLimitObj.applyId,txtContractId:this.txtContractId}).then((function(e){uni.hideLoading(),t("log","文本地址：",e," at pages/credit/creditSpouse.vue:378"),A.txtContractId=e.txtContractId,A.$gfdGlobalData.setData("contractInfoList",e.contractInfoList),uni.navigateTo({url:"../../component/ReadDocument"})}))}}};e.default=s}).call(this,A("0de9")["log"])},ba71:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsYAAAFPCAYAAABOPwg4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjE5RDlEQ0FBNjZFMTFFQzkzOERGOTdEOTc3MDJEN0EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjQzRDkwRkVBNjc3MTFFQzkzOERGOTdEOTc3MDJEN0EiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMTlEOURDOEE2NkUxMUVDOTM4REY5N0Q5NzcwMkQ3QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMTlEOURDOUE2NkUxMUVDOTM4REY5N0Q5NzcwMkQ3QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqD2IcQAAAoYSURBVHja7N1L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"},d5a6:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAVCAYAAAByrA+0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMC1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MUEzRjhEMTc3NjgxMUVDOEZGN0U0QzMyQUQ2MTVBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MUEzRjhEMjc3NjgxMUVDOEZGN0U0QzMyQUQ2MTVBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgxQTNGOENGNzc2ODExRUM4RkY3RTRDMzJBRDYxNUE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgxQTNGOEQwNzc2ODExRUM4RkY3RTRDMzJBRDYxNUE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+EtCRhgAAANRJREFUeNqUkk0KwjAQRtPQE3gE9x7HM9RaUVtwqQsXrrS6EevPwjt5DLe6rt9AB4YhSePAB0l4rx0mSd7j4dYYUyBnZGN6yiIlMkDWSB0jPMS+7JNIqJB7rERCi2TITUlHn2A6aaKkpUuyYh0lWfUBlq4OKaFN6miTpLxbZ0KiqlLPMFjiP7L0sYGRt90LeImzPCRQzwdkJM6eNgDXoneqBlmlHpimslDwlNq0/8B6rASfkLkPlhcXBbMQDbOwU/DFB7MwU3Dhg1kg6Ivs+2CqnwADAKtmOZ03rJ7qAAAAAElFTkSuQmCC"},e516:function(t,e,A){"use strict";A.r(e);var a=A("9cfe"),n=A.n(a);for(var i in a)"default"!==i&&function(t){A.d(e,t,(function(){return a[t]}))}(i);e["default"]=n.a},f18a:function(t,e,A){"use strict";A.r(e);var a=A("4552"),n=A.n(a);for(var i in a)"default"!==i&&function(t){A.d(e,t,(function(){return a[t]}))}(i);e["default"]=n.a},f4ef:function(t,e,A){var a=A("24fb"),n=A("1de5"),i=A("ba71");e=a(!1);var o=n(i);e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content-body[data-v-24213685]{padding-top:%?0?%;position:absolute;top:0;left:0;right:0;margin-top:%?90?%}.content-body .white-bg-view[data-v-24213685]{width:calc(100% - %?60?%);background:url('+o+") no-repeat;background-size:100% 100%;height:%?288?%;margin-left:%?30?%;border-radius:%?16?%;display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:%?32?%;color:var(--fontColor)}.content-body .white-bg-view .money-text[data-v-24213685]{color:var(--color-orange-text);font-size:%?72?%;font-weight:700;margin-top:%?20?%}.content-body .item-body[data-v-24213685]{width:calc(100% - %?60?%);background-color:#fff;margin-left:%?30?%;padding-top:%?30?%;padding-bottom:%?20?%;border-bottom-left-radius:%?16?%;border-bottom-right-radius:%?16?%}.content-body .item-body .item-view[data-v-24213685]{width:100%;padding:%?20?% %?30?%;box-sizing:border-box;display:flex;flex-direction:row;font-size:%?32?%;color:var(--fontColor);justify-content:space-between}.content-body .item-body .item-view .min-width-140[data-v-24213685]{min-width:%?280?%}.content-body .item-body .item-view .look-view[data-v-24213685]{display:flex;align-items:center;color:var(--color-orange-text)}.content-body .item-body .item-view .right_icon[data-v-24213685]{width:%?13?%;margin-left:%?10?%}.content-body .button[data-v-24213685]{margin-bottom:%?113?%;margin-top:%?79?%;width:calc(100% - %?60?%)}.content-body .tip-view[data-v-24213685]{font-size:%?26?%;width:calc(100% - %?60?%);margin-left:%?30?%;margin-top:%?20?%}.content-body .sq-view[data-v-24213685]{width:100%;padding:%?24?%;box-sizing:border-box;color:var(--color-orange-text);font-size:%?28?%}.content-body .sq-view .check-view[data-v-24213685]{display:flex;flex-direction:row;align-items:center}.content-body .sq-view .check-view .check-img[data-v-24213685]{width:%?35?%;height:%?35?%;padding:%?20?%}.content-body .sq-view .agree-tip[data-v-24213685]{color:#333}.borders[data-v-24213685]{border-radius:%?16?%}.mt40[data-v-24213685]{margin-top:%?40?%}.mt22[data-v-24213685]{margin-top:%?22?%}.ml60[data-v-24213685]{margin-left:%?60?%}",""]),t.exports=e}}]);