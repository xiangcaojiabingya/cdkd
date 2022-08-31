(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-loan-loanList"],{"054b":function(t,a,e){"use strict";var n=e("1f8a"),i=e.n(n);i.a},"1f8a":function(t,a,e){var n=e("6fa3");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=e("4f06").default;i("8bc35b22",n,!0,{sourceMap:!1,shadowMode:!1})},"22ef":function(t,a,e){"use strict";(function(t){var n=e("4ea4");e("4de4"),e("4160"),e("159b"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=e("926d"),s=e("2707"),o=n(e("8337")),c={components:{ItemNavBar:o.default},data:function(){return{applyList:[],applyInfoCheck:{},powerStationList:[{id:"1",plantNo:"ZGluZ3l1bm5h1",creditNum:"",plantScale:"50",totalAmount:"100000",checked:!1},{id:"2",plantNo:"ZGluZ3l1bm5h2",creditNum:"",plantScale:"50",totalAmount:"100000",checked:!0},{id:"3",plantNo:"ZGluZ3l1bm5h3",creditNum:"",plantScale:"50",totalAmount:"100000",checked:!1},{id:"4",plantNo:"ZGluZ3l1bm5h4",creditNum:"",plantScale:"50",totalAmount:"100000",checked:!1}],rcvAcctName:"",rcvAcctNo:"",cnapsCode:"",cnapsName:"",pawneeName:""}},onLoad:function(){this.queryCreditLimitAction()},onShow:function(){},methods:{queryCreditLimitAction:function(){var a=this;uni.showLoading({title:"加载中"}),this.$request.postAjax(this.$apiUrl.getQueryCreditLimitAction,{productId:"ZYD001",status:"1"}).then((function(e){t("log","授信列表：",JSON.stringify(e)," at pages/loan/loanList.vue:194"),a.applyList=e.creditLimitList,a.applyList.forEach((function(t){t.formatOpenAmt=(0,s.formatThousandsNew)(t.openAmt),t.formatAvailableCreditAmount=(0,s.formatThousandsNew)(t.availableCreditAmount)})),uni.hideLoading()})).catch((function(a){t("log",a," at pages/loan/loanList.vue:202")}))},toggle:function(a){t("log",a," at pages/loan/loanList.vue:207"),this.applyList.length>1&&""===a.creditLimitId?uni.showToast({title:"请点击选择对应的授信额度",icon:"none"}):"99"!==a.status?(uni.setStorageSync("creditLimitObjItem",a),uni.navigateTo({url:"./loanApply"})):uni.showToast({title:"本业务仅可用款一次，请勿重复用款！",icon:"none"})},getListData:function(){var a=this;uni.showLoading({title:"加载中"}),this.$request.postAjax(this.$apiUrl.queryCreditLimitForPvAction,{productId:"ZYD001",status:"1"}).then((function(e){t("log","授信列表：",e," at pages/loan/loanList.vue:240"),a.applyList=e.creditLimitList})).catch((function(a){t("log",a," at pages/loan/loanList.vue:244")}))},toggle2:function(a){var e=this;this.applyInfoCheck=a,uni.showLoading({title:"加载中"}),this.$request.postAjax(this.$apiUrl.queryPowerForPvAction,{productId:"ZYD001",creditLimitId:a.creditLimitId}).then((function(n){e.$gfdGlobalData.setData("creditLimitId",a.creditLimitId),t("log","电站数据：",JSON.stringify(n)," at pages/loan/loanList.vue:269"),e.powerStationList=n.powerStaList,e.rcvAcctName=n.rcvAcctName,e.rcvAcctNo=n.rcvAcctNo,e.cnapsCode=n.cnapsCode,e.cnapsName=n.cnapsName,e.pawneeName=n.pawneeName,e.$refs.popup.open("bottom")})).catch((function(a){t("log",a," at pages/loan/loanList.vue:279")}))},submit:function(a){this.$gfdGlobalData.setData("applyInfoCheck",a),uni.showModal({content:"您确定要提交申请吗？",confirmText:"确定",cancelText:"取消",success:function(a){a.confirm?uni.navigateTo({url:"../common/smsVerification/smsVerification?type=loanAtlast"}):a.cancel&&t("log","用户点击取消"," at pages/loan/loanList.vue:306")}})},close:function(){this.$refs.popup.close()},choosePS:function(t){for(var a=this.powerStationList,e=0;e<a.length;e++)a[e].plantNo===t.plantNo&&this.$set(a[e],"checked",!a[e].checked)},toLoan:function(){var t=this.powerStationList.filter((function(t){return t.checked}));t.length?(this.$gfdGlobalData.setData("powerListCheck",t),this.$gfdGlobalData.setData("rcvAcctInfo",{rcvAcctName:this.rcvAcctName,rcvAcctNo:this.rcvAcctNo,cnapsCode:this.cnapsCode,cnapsName:this.cnapsName,pawneeName:this.pawneeName}),this.$gfdGlobalData.setData("applyInfoCheck",this.applyInfoCheck),this.close(),uni.navigateTo({url:"./applyForPay"})):uni.showModal({title:"提示",content:"请选择至少一个电站！",showCancel:!1,confirmText:"确定"})},loanStateMatch:function(t){var a=i.loanState.filter((function(a){return a.state===t}));return a[0]?a[0].name:""}}};a.default=c}).call(this,e("0de9")["log"])},"249f":function(t,a,e){"use strict";e.r(a);var n=e("22ef"),i=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(a,t,(function(){return n[t]}))}(s);a["default"]=i.a},"40d3":function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return s})),e.d(a,"a",(function(){return n}));var i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-uni-view",[n("item-nav-bar",{attrs:{title:"用款申请",st:7}}),n("v-uni-view",{staticClass:"content-body circle-body"},[n("v-uni-view",{staticClass:"prompt"},[t._v("每一笔存单快贷额度只能进行一次用款，用款后可用借款额度为0，不可再次发起用款，用款时请合理录入用款金额")]),t._l(t.applyList,(function(a){return n("v-uni-view",{key:a.creditLimitId,staticClass:"card-body"},[n("v-uni-view",{staticClass:"card-content"},[n("v-uni-view",{staticClass:"list"},[n("span",{staticClass:"list-label"},[t._v("主账号")]),n("span",{staticClass:"liat-content"},[t._v(t._s(a.acctCode))])]),n("v-uni-view",{staticClass:"list"},[n("span",{staticClass:"list-label"},[t._v("子账号")]),n("span",{staticClass:"liat-content"},[t._v(t._s(a.subAcctNo))])]),n("v-uni-view",{staticClass:"list"},[n("span",{staticClass:"list-label"},[t._v("存单金额")]),n("span",{staticClass:"liat-content"},[t._v(t._s(a.formatOpenAmt)+"元")])]),n("v-uni-view",{staticClass:"list"},[n("span",{staticClass:"list-label"},[t._v("申请时间")]),n("span",{staticClass:"liat-content"},[t._v(t._s(a.startTime))])]),"1"===a.status1||"3"===a.status1?n("v-uni-view",{staticClass:"list"},[n("span",{staticClass:"list-label"},[t._v("可用借款金额")]),n("span",{staticClass:"liat-content"},[t._v(t._s(a.formatAvailableCreditAmount)+"元")])]):t._e(),n("v-uni-view",{staticClass:"list"},[n("span",{staticClass:"list-label"},[t._v("利率")]),n("span",{staticClass:"liat-content"},[t._v(t._s(a.rate)+"%")])]),n("v-uni-view",{staticClass:"list"},[n("span",{staticClass:"list-label"},[t._v("到期日期")]),n("span",{staticClass:"liat-content"},[t._v(t._s(a.endTime))])]),n("v-uni-view",{staticClass:"list"},[n("span",{staticClass:"list-label"},[t._v("状态")]),"1"===a.status1?n("span",{staticClass:"liat-content"},[t._v("未用款")]):t._e(),"2"===a.status1?n("span",{staticClass:"liat-content"},[t._v("已用款")]):t._e(),"3"===a.status1?n("span",{staticClass:"liat-content"},[t._v("用款审批中")]):t._e()]),"1"===a.status1?n("v-uni-view",[n("v-uni-button",{staticClass:"button",attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggle(a)}}},[t._v("用款申请")])],1):t._e()],1)],1)})),0==t.applyList.length?n("v-uni-view",{staticClass:"warm-tip"},[n("v-uni-image",{staticClass:"img-block-er",attrs:{src:e("ab06")}}),n("span",[t._v("暂无相关记录")])],1):t._e()],2)],1)},s=[]},4552:function(t,a,e){"use strict";(function(t){e("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={name:"ItemNavBar",components:{},props:{title:{type:String,default:"Title"},isShowLeftIcon:{default:!0,type:Boolean},st:{default:2,type:Number}},data:function(){return{}},methods:{onClickLeft:function(){t("log","bbbbbbbbbbbbbbbb",this.st," at component/ItemNavBar.vue:36"),1==this.st?uni.redirectTo({url:"./credit"}):3==this.st?uni.switchTab({url:"../index/index"}):4==this.st?uni.redirectTo({url:"../../loan/applyConfirm"}):5==this.st?uni.redirectTo({url:"./loanApply"}):6==this.st?uni.redirectTo({url:"./loanList"}):7==this.st?uni.switchTab({url:"../index/index"}):8==this.st?uni.redirectTo({url:"./cardManage"}):9==this.st?uni.switchTab({url:"../personalCenter"}):uni.navigateBack()}}};a.default=n}).call(this,e("0de9")["log"])},5816:function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.itmenavbar[data-v-0581b724]{width:100%;height:%?90?%;background:#f2f2f2;color:#ff661a;font-size:%?36?%;display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;z-index:99}.backimg[data-v-0581b724]{width:%?32?%;position:absolute;left:%?30?%}',""]),t.exports=a},"6fa3":function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.card-body[data-v-1c69013e]{margin-top:%?15?%;border-radius:%?15?%}.list .list-label[data-v-1c69013e]{width:%?200?%}[data-v-1c69013e] .popup uni-view[name=content],[data-v-1c69013e] .popup .uni-popup__wrapper{border-radius:%?30?% %?30?% 0 0}[data-v-1c69013e] .popup .button{margin-right:0;margin-left:0;width:100%}[data-v-1c69013e] .popup .close{position:absolute;right:%?30?%;top:%?60?%}.popup-content[data-v-1c69013e]{padding:%?60?% %?30?%;position:relative}.checkbox-content[data-v-1c69013e]{max-height:%?650?%;overflow:auto}.g-checkbox[data-v-1c69013e]{position:relative;background-color:var(--bgColor);border:1px solid var(--bgColor);border-radius:%?16?%;margin-bottom:%?20?%}.g-checkbox ul[data-v-1c69013e]{padding:0 %?24?%;display:flex;flex-direction:row;justify-content:space-around}.g-checkbox li[data-v-1c69013e]{list-style:none;text-align:center;padding:%?56?% 0}.g-checkbox li p[data-v-1c69013e]{color:#333;margin-bottom:%?30?%}.g-checkbox li span[data-v-1c69013e]{font-size:%?28?%;color:#999}.g-checkbox.checked[data-v-1c69013e]{border-color:var(--color-orange-text);background-color:#fff}.g-checkbox.checked .checked-icon-content[data-v-1c69013e]{position:absolute;right:-1px;top:-1px;width:%?68?%;height:%?68?%;border-radius:%?16?%;overflow:hidden}.g-checkbox.checked .checked-icon[data-v-1c69013e]{position:absolute;width:100%;height:100%;background:var(--color-orange-text);-webkit-transform:rotate(45deg);transform:rotate(45deg);top:%?-32?%;left:%?32?%}.g-checkbox.checked .uni-icons[data-v-1c69013e]{position:absolute;top:%?4?%;right:%?4?%}.img-block-er[data-v-1c69013e]{margin:auto;margin-top:%?80?%;width:%?500?%;height:%?300?%}.warm-tip[data-v-1c69013e]{text-align:center;display:flex;flex-direction:column}.prompt[data-v-1c69013e]{font-size:%?27?%;color:#ca0;background-color:#fff9db;text-align:left;line-height:%?47?%;padding-left:%?27?%;padding-top:%?11?%;padding-bottom:%?11?%}',""]),t.exports=a},"7d0d":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDY0OCwgMjAyMS8wMS8xMi0xNTo1MjoyOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwMzY0NzA2QThFMjExRUM5MjFERjYwNDZDMzE1MDQ4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwMzY0NzA3QThFMjExRUM5MjFERjYwNDZDMzE1MDQ4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjAzNjQ3MDRBOEUyMTFFQzkyMURGNjA0NkMzMTUwNDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjAzNjQ3MDVBOEUyMTFFQzkyMURGNjA0NkMzMTUwNDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6un8f4AAABt0lEQVR42ryXOUuDQRCGkxBtLIxHoYVGPLCIJ7EIagpPJCBYCP4CbfwL1v4TEQsFRbTwRFEsPErB20JUxDMWdvFdmIVliPE79puFp9hhv7xvZmbnS8K5qepQQGsOxMEM2P3rUDQA4TCYBxO036GYmIFVkHF62LaBdTDCYuOFHohYFF/OI67KsCiRgW3Qx2JDYPO/B21kYCGP+JgTcRsZWAGjLJahXgi8CbdAP4v1ggM3H+K1BEtM/Af0uBX3mgFV2wFjnwPd4MzLN4n4FM+CNq/ibjOwxsTfQQpc+OniqMeG+wCd4N7vHXZSgg0m/gQ6bIg7MTALBo39IWiyJe7EQCPbfxMhKQPT4NzYD4M9UCRl4IWm250RS1MpiiUMqPVGd/3KiHWBUxuZcDqIsiRqmkiQiZiEAbU+QZKVowUcg3IJA2p90QC6NmINNIorJQyYU/DWiNVSOaokDOieSLJM1FAm4hIG9MuIN6bKwAmokzCgy9EKboxYBWWiXsKA/jWUYu+HGPVEs4QBPTFVTzwYsVIqR0Lqj8kraAeXRqwE7EsZ0CbS7HaUSRpQ65nmxBF4BJOFDv8KMAAXkFQC7I4/DAAAAABJRU5ErkJggg=="},8337:function(t,a,e){"use strict";e.r(a);var n=e("91d4"),i=e("f18a");for(var s in i)"default"!==s&&function(t){e.d(a,t,(function(){return i[t]}))}(s);e("9cb7");var o,c=e("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"0581b724",null,!1,n["a"],o);a["default"]=r.exports},"91d4":function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return s})),e.d(a,"a",(function(){return n}));var i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-uni-view",{staticClass:"itmenavbar"},[t.isShowLeftIcon?n("v-uni-image",{staticClass:"backimg",attrs:{src:e("7d0d"),mode:"widthFix"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.onClickLeft.apply(void 0,arguments)}}}):t._e()],1)},s=[]},"926d":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.repayStatus=a.loanStatus=a.loanUnit=a.payMethod=a.repayment=a.loanPurpose=a.guarantWay=a.loanState=a.creditState=void 0;var n=[{state:"01",name:"配偶授权中"},{state:"02",name:"授权成功待提交"},{state:"03",name:"提交信贷成功，待审批"},{state:"04",name:"授权拒绝"},{state:"05",name:""},{state:"06",name:"银行审批中"},{state:"07",name:"审批成功"},{state:"08",name:"审批拒绝"},{state:"09",name:"失效"}];a.creditState=n;var i=[{state:"1",name:"未用款"},{state:"2",name:"提交完毕待授权"},{state:"3",name:"授权成功待提交"},{state:"4",name:"提交银行成功"},{state:"5",name:"用款授权拒绝"},{state:"6",name:"提交银行失败"},{state:"7",name:"已失效"},{state:"8",name:"银行审批失败"},{state:"9",name:"已用款"},{state:"10",name:"银行审批中"}];a.loanState=i;var s=[{state:"C",name:"保证"}];a.guarantWay=s;var o=[{state:"2101",name:"购买光伏设备"}];a.loanPurpose=o;var c=[{state:"1",name:"等额本息"},{state:"9",name:"按固定周期付息，按分期还款计划表还本"}];a.repayment=c;var r=[{state:"0",name:"自主支付"},{state:"1",name:"受托支付"}];a.payMethod=r;var l=[{state:"1",name:"年"},{state:"2",name:"月"},{state:"3",name:"日"},{state:"4",name:"期"}];a.loanUnit=l;var u=[{state:"1",name:"使用中"},{state:"2",name:"已逾期"},{state:"3",name:"已结清"}];a.loanStatus=u;var d=[{state:"1",name:"还款成功"},{state:"2",name:"还款中"},{state:"3",name:"还款失败"},{state:"4",name:"部分还款成功"}];a.repayStatus=d},"969f":function(t,a,e){var n=e("5816");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=e("4f06").default;i("40813c8d",n,!0,{sourceMap:!1,shadowMode:!1})},"9cb7":function(t,a,e){"use strict";var n=e("969f"),i=e.n(n);i.a},ab06:function(t,a,e){t.exports=e.p+"static/img/empty-zqd.png"},d6aa:function(t,a,e){"use strict";e.r(a);var n=e("40d3"),i=e("249f");for(var s in i)"default"!==s&&function(t){e.d(a,t,(function(){return i[t]}))}(s);e("054b");var o,c=e("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"1c69013e",null,!1,n["a"],o);a["default"]=r.exports},f18a:function(t,a,e){"use strict";e.r(a);var n=e("4552"),i=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(a,t,(function(){return n[t]}))}(s);a["default"]=i.a}}]);