(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-credit-depositDetail"],{"0f3e":function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("item-nav-bar",{attrs:{title:"授信申请"}}),a("v-uni-scroll-view",{staticClass:"content-body",attrs:{"scroll-y":"true"}},[a("v-uni-view",{staticClass:"form-content"},[a("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)},reset:function(t){arguments[0]=t=e.$handleEvent(t),e.formReset.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"application-user-data"},[a("key-value",{attrs:{title:"存款账户",content:this.depositDetail.acctNo}}),a("key-value",{attrs:{title:"子账号",content:this.depositDetail.subAcctNo}}),a("key-value",{attrs:{title:"存款金额",content:e.formatThousandsNew(this.depositDetail.openAmt)}}),a("key-value",{attrs:{title:"产品名称",content:this.depositDetail.productName}}),a("key-value",{attrs:{title:"开户机构",content:this.depositDetail.openBranch}}),a("key-value",{attrs:{title:"起息日",content:e.formatDate(this.depositDetail.valDate)}}),a("key-value",{attrs:{title:"到期日",content:e.formatDate(this.depositDetail.dueDate)}}),a("key-value",{attrs:{title:"存期",content:this.depositDetail.period}}),a("key-value",{attrs:{title:"年利率(%)",content:this.depositDetail.intRate}})],1),a("v-uni-button",{staticClass:"button",attrs:{type:"primary","form-type":"submit"}},[e._v("确认")])],1)],1)],1),a("keyboard-package",{ref:"number",attrs:{disableDot:!0},on:{onInput:function(t){arguments[0]=t=e.$handleEvent(t),e.onInput.apply(void 0,arguments)},onDelete:function(t){arguments[0]=t=e.$handleEvent(t),e.onDelete.apply(void 0,arguments)},onConfirm:function(t){arguments[0]=t=e.$handleEvent(t),e.onConfirm.apply(void 0,arguments)}}}),a("keyboard-package",{ref:"idCard",attrs:{type:"idCard"},on:{onInput:function(t){arguments[0]=t=e.$handleEvent(t),e.onInput.apply(void 0,arguments)},onDelete:function(t){arguments[0]=t=e.$handleEvent(t),e.onDelete.apply(void 0,arguments)},onConfirm:function(t){arguments[0]=t=e.$handleEvent(t),e.onConfirm.apply(void 0,arguments)}}})],1)},o=[]},"3bbc":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.cityList=void 0;var i=[{code:"370100",name:"济南市",list:[{code:"370102",name:"历下区"},{code:"370103",name:"市中区"},{code:"370104",name:"槐荫区"},{code:"370105",name:"天桥区"},{code:"370112",name:"历城区"},{code:"370113",name:"长清区"},{code:"370124",name:"平阴县"},{code:"370125",name:"济阳县"},{code:"370126",name:"商河县"},{code:"370181",name:"章丘市"},{code:"370116",name:"莱芜区"},{code:"370117",name:"钢城区"}]},{code:"370200",name:"青岛市",list:[{code:"370202",name:"市南区"},{code:"370203",name:"市北区"},{code:"370211",name:"黄岛区"},{code:"370212",name:"崂山区"},{code:"370213",name:"李沧区"},{code:"370214",name:"城阳区"},{code:"370281",name:"胶州市"},{code:"370282",name:"即墨市"},{code:"370283",name:"平度市"},{code:"370285",name:"莱西市"}]},{code:"370300",name:"淄博市",list:[{code:"370302",name:"淄川区"},{code:"370303",name:"张店区"},{code:"370304",name:"博山区"},{code:"370305",name:"临淄区"},{code:"370306",name:"周村区"},{code:"370321",name:"桓台县"},{code:"370322",name:"高青县"},{code:"370323",name:"沂源县"}]},{code:"370400",name:"枣庄市",list:[{code:"370402",name:"市中区"},{code:"370403",name:"薛城区"},{code:"370404",name:"峄城区"},{code:"370405",name:"台儿庄区"},{code:"370406",name:"山亭区"},{code:"370481",name:"滕州市"}]},{code:"370500",name:"东营市",list:[{code:"370502",name:"东营区"},{code:"370503",name:"河口区"},{code:"370505",name:"垦利区"},{code:"370522",name:"利津县"},{code:"370523",name:"广饶县"}]},{code:"370600",name:"烟台市",list:[{code:"370602",name:"芝罘区"},{code:"370611",name:"福山区"},{code:"370612",name:"牟平区"},{code:"370613",name:"莱山区"},{code:"370634",name:"长岛县"},{code:"370681",name:"龙口市"},{code:"370682",name:"莱阳市"},{code:"370683",name:"莱州市"},{code:"370684",name:"蓬莱市"},{code:"370685",name:"招远市"},{code:"370686",name:"栖霞市"},{code:"370687",name:"海阳市"}]},{code:"370700",name:"潍坊市",list:[{code:"370702",name:"潍城区"},{code:"370703",name:"寒亭区"},{code:"370704",name:"坊子区"},{code:"370705",name:"奎文区"},{code:"370724",name:"临朐县"},{code:"370725",name:"昌乐县"},{code:"370781",name:"青州市"},{code:"370782",name:"诸城市"},{code:"370783",name:"寿光市"},{code:"370784",name:"安丘市"},{code:"370785",name:"高密市"},{code:"370786",name:"昌邑市"}]},{code:"370800",name:"济宁市",list:[{code:"370811",name:"任城区"},{code:"370812",name:"兖州区"},{code:"370826",name:"微山县"},{code:"370827",name:"鱼台县"},{code:"370828",name:"金乡县"},{code:"370829",name:"嘉祥县"},{code:"370830",name:"汶上县"},{code:"370831",name:"泗水县"},{code:"370832",name:"梁山县"},{code:"370881",name:"曲阜市"},{code:"370883",name:"邹城市"}]},{code:"370900",name:"泰安市",list:[{code:"370902",name:"泰山区"},{code:"370911",name:"岱岳区"},{code:"370921",name:"宁阳县"},{code:"370923",name:"东平县"},{code:"370982",name:"新泰市"},{code:"370983",name:"肥城市"}]},{code:"371000",name:"威海市",list:[{code:"371002",name:"环翠区"},{code:"371003",name:"文登区"},{code:"371082",name:"荣成市"},{code:"371083",name:"乳山市"}]},{code:"371100",name:"日照市",list:[{code:"371102",name:"东港区"},{code:"371103",name:"岚山区"},{code:"371121",name:"五莲县"},{code:"371122",name:"莒县"}]},{code:"371300",name:"临沂市",list:[{code:"371302",name:"兰山区"},{code:"371311",name:"罗庄区"},{code:"371312",name:"河东区"},{code:"371321",name:"沂南县"},{code:"371322",name:"郯城县"},{code:"371323",name:"沂水县"},{code:"371324",name:"兰陵县"},{code:"371325",name:"费县"},{code:"371326",name:"平邑县"},{code:"371327",name:"莒南县"},{code:"371328",name:"蒙阴县"},{code:"371329",name:"临沭县"}]},{code:"371400",name:"德州市",list:[{code:"371402",name:"德城区"},{code:"371403",name:"陵城区"},{code:"371422",name:"宁津县"},{code:"371423",name:"庆云县"},{code:"371424",name:"临邑县"},{code:"371425",name:"齐河县"},{code:"371426",name:"平原县"},{code:"371427",name:"夏津县"},{code:"371428",name:"武城县"},{code:"371481",name:"乐陵市"},{code:"371482",name:"禹城市"}]},{code:"371500",name:"聊城市",list:[{code:"371502",name:"东昌府区"},{code:"371521",name:"阳谷县"},{code:"371522",name:"莘县"},{code:"371523",name:"茌平县"},{code:"371524",name:"东阿县"},{code:"371525",name:"冠县"},{code:"371526",name:"高唐县"},{code:"371581",name:"临清市"}]},{code:"371600",name:"滨州市",list:[{code:"371602",name:"滨城区"},{code:"371603",name:"沾化区"},{code:"371621",name:"惠民县"},{code:"371622",name:"阳信县"},{code:"371623",name:"无棣县"},{code:"371625",name:"博兴县"},{code:"371626",name:"邹平县"}]},{code:"371700",name:"菏泽市",list:[{code:"371702",name:"牡丹区"},{code:"371703",name:"定陶区"},{code:"371721",name:"曹县"},{code:"371722",name:"单县"},{code:"371723",name:"成武县"},{code:"371724",name:"巨野县"},{code:"371725",name:"郓城县"},{code:"371726",name:"鄄城县"},{code:"371728",name:"东明县"}]}];t.cityList=i},"93cd":function(e,t,a){var i=a("f14d");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("8969999a",i,!0,{sourceMap:!1,shadowMode:!1})},baa5:function(e,t,a){var i=a("23e7"),n=a("e58c");i({target:"Array",proto:!0,forced:n!==[].lastIndexOf},{lastIndexOf:n})},c453:function(e,t,a){"use strict";(function(e){var i=a("4ea4");a("4160"),a("c975"),a("baa5"),a("fb6a"),a("d3b7"),a("acd8"),a("ac1f"),a("25f0"),a("5319"),a("841c"),a("1276"),a("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("4f51")),o=i(a("47d8")),d=i(a("9a46")),c=i(a("bc95")),r=i(a("2c85")),s=a("3bbc"),l=(a("2707"),i(a("8337"))),m={components:{KeyValue:n.default,ItemInput:o.default,ItemPicker:d.default,ItemLine:c.default,ItemNavBar:l.default,keyboardPackage:r.default},data:function(){return{depositDetail:{},bizToken:"",orderInfo:{},phone:"",farmerCard:"",cityList:s.cityList,cityIndex:-1,countyList:s.cityList[0].list,countyIndex:-1,isAgree:!1,isMarried:"10",currentBranch:"",applyNo:"",grantId:"",btranthList:[[],[],[]],multiIndex:[-1,-1,-1],classAList:[],secondList:[],tertiaryList:[],recmmendName:"",recmmend:"",type:"number",numberList:[],idCardList:[],familyInCome:""}},onLoad:function(t){t.infoer&&(this.depositDetail=JSON.parse(decodeURIComponent(t.infoer))),e("log","ccccccccc"+JSON.stringify(this.depositDetail)," at pages/credit/depositDetail.vue:95"),sessionStorage.alreadyRead=!1,this.phone=getApp().globalData.phone||uni.getStorageSync("phone");var a=window.location.search;a=a.substring(1,a.length),this.bizToken=a.split("&")[0].split("=")[1],getApp().globalData.bizToken=this.bizToken,uni.setStorageSync("bizToken",this.bizToken),this.queryCorrespondingCardAction()},onShow:function(){var t=JSON.parse(sessionStorage.alreadyRead);t?(e("log","alreadyReada为true",t," at pages/credit/depositDetail.vue:112"),this.isAgree=!0):(e("log","alreadyReada为false",t," at pages/credit/depositDetail.vue:115"),this.isAgree=!1),e("log","isAgreeisAgreeisAgree：",this.isAgree," at pages/credit/depositDetail.vue:118")},computed:{telStr:function(){var e="";return this.numberList.forEach((function(t){e+=t.toString()})),e},passStr:function(){var e="";return this.idCardList.forEach((function(t){e+=t.toString()})),e}},methods:{queryCorrespondingCardAction:function(){var t=this;uni.showLoading({title:"加载中"}),this.$request.postAjax(this.$apiUrl.queryCorrespondingCardAction,{}).then((function(a){e("log","身份证信息：",a," at pages/credit/depositDetail.vue:145"),t.farmerCard=a.result,uni.setStorageSync("farmerCard",t.farmerCard),uni.hideLoading()})).catch((function(t){e("log",t," at pages/credit/depositDetail.vue:150"),uni.hideLoading()}))},clearNoNum:function(e){var t=e.target.value,a=5;if(t<0)t="";else{var i=t.indexOf(".");if(i<0)return t.length<=a||t.length>a&&(t=t.substring(1,a+1)),void this.$nextTick((function(){this.familyInCome=t+""}));var n=t.lastIndexOf(".");if(i!=n)return t="",void this.$nextTick((function(){this.familyInCome=t+""}));if(i>a)return t.length>a&&(t=t.substring(1,a+1)),void this.$nextTick((function(){this.familyInCome=t+""}));t.length-i-1>2&&(t=t.substring(0,i+3)),this.$nextTick((function(){this.familyInCome=t+""}))}},inComeValid:function(t){e("log",t.target.value," at pages/credit/depositDetail.vue:209");var a=t.target.value;if(a=a.replace(/[^\d\.]/g,""),a=a.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3"),a&&a+""!=="0"){for(var i=0;i<=9;i++){var n="0"+i.toString();if(a+""===n)return this.$nextTick((function(){this.familyInCome=""})),void e("log",a," at pages/credit/depositDetail.vue:225")}if(a<0&&(a=Math.abs(a)),a>=999999){var o=a+"",d=o.indexOf(".");a=d>-1?o.substr(0,6)+o.substr(d,3):o.substr(0,6)}e("log",a," at pages/credit/depositDetail.vue:244"),this.$nextTick((function(){this.familyInCome=a+""}))}else this.$nextTick((function(){this.familyInCome=""}))},formatDate:function(e){return e?e.slice(0,4)+"/"+e.slice(4,6)+"/"+e.slice(6,8):e},formatThousandsNew:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(e){e=e.toString();var a=e.indexOf(".");e=-1!==a?e.substring(0,t+a+1):e.substring(0);var i=parseFloat(e).toFixed(t),n=i.indexOf(".")>-1?/(\d)(?=(\d{3})+\.)/g:/(\d)(?=(?:\d{3})+$)/g;return i.replace(n,"$1,")}return e},onConfirm:function(){},onDelete:function(){switch(this.type){case"number":this.numberList.pop();break;case"idCard":this.idCardList.pop();break}},openKeyBoard:function(e){uni.hideKeyboard(),this.type=e,this.$refs[e].open()},onInput:function(e){switch(this.type){case"number":if(this.numberList.length>=11)return void this.close();this.numberList.push(e);break;case"idCard":if(this.idCardList.length>=18)return void this.close();this.idCardList.push(e);break}},dealValiddate:function(e){return e?-1!=e.indexOf("长期")?(e=e.replace("-","至"),e.slice(0,4)+"-"+e.slice(4,6)+"-"+e.slice(6,e.length)):e.slice(0,4)+"-"+e.slice(4,6)+"-"+e.slice(6,8)+"至"+e.slice(9,13)+"-"+e.slice(13,15)+"-"+e.slice(15.17):""},dealOcrBirth:function(e){return e?e.replace(/\//g,"-"):""},getDetectInfoAction:function(){var t=this;uni.showLoading({title:"加载中"}),this.$request.postAjax(this.$apiUrl.addOrderInfoForPvAction,{bizToken:this.bizToken,queryType:"3"}).then((function(a){e("log","身份证信息：",a," at pages/credit/depositDetail.vue:343"),t.orderInfo=a,uni.hideLoading()})).catch((function(t){e("log",t," at pages/credit/depositDetail.vue:347"),uni.hideLoading()}))},valid:function(e){return!0},formSubmit:function(t){e("log","form发生了submit事件，携带数据为："+JSON.stringify(t.detail.value)," at pages/credit/depositDetail.vue:358");t.detail.value;uni.navigateTo({url:"./createApply?farmerCard="})},checkIDCard:function(e){for(var t=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],a=["1","0","X","9","8","7","6","5","4","3","2"],i=e+"",n=e[17],o=i.substring(0,17),d=o.split(""),c=d.length,r=0,s=0;s<c;s++)r+=d[s]*t[s];var l=r%11,m=a[l],u=/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,f=u.test(e);return!(n!==m||!f)}}};t.default=m}).call(this,a("0de9")["log"])},ca23:function(e,t,a){"use strict";a.r(t);var i=a("0f3e"),n=a("e546");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("e62c");var d,c=a("f0c5"),r=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,"c79901c4",null,!1,i["a"],d);t["default"]=r.exports},e546:function(e,t,a){"use strict";a.r(t);var i=a("c453"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},e62c:function(e,t,a){"use strict";var i=a("93cd"),n=a.n(i);n.a},f14d:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,".content-body[data-v-c79901c4]{display:flex;flex-direction:column;width:100%;font-size:%?32?%;color:#333;font-weight:500}.content-body .application-user-data[data-v-c79901c4]{margin-top:%?20?%;margin-left:%?20?%;margin-right:%?20?%;border-radius:%?16?%}.content-body .application-user-data .apply-view[data-v-c79901c4]{border-top-left-radius:%?16?%;border-top-right-radius:%?16?%;font-size:%?36?%;background-color:#fff;padding:%?30?% %?35?% %?15?% %?35?%;color:var(--color-orange-text);font-weight:500}.content-body .application-user-data .apply-view .orange-block[data-v-c79901c4]{background-color:var(--color-orange-text);display:inline-block;position:relative;top:%?5?%;width:%?8?%;height:%?36?%;border-radius:%?30?%}.content-body .application-user-data .apply-view .img-block[data-v-c79901c4]{width:%?7?%;height:%?34?%;margin-bottom:%?8?%;vertical-align:middle}.content-body .application-user-data .apply-view .apply-view-title[data-v-c79901c4]{margin-left:%?16?%}.borders[data-v-c79901c4]{border-bottom-left-radius:%?16?%;border-bottom-right-radius:%?16?%}.married-view[data-v-c79901c4]{width:100%;display:flex;flex-direction:row;align-items:center}.address-view[data-v-c79901c4]{width:100%;background-color:#fff;box-sizing:border-box;padding:0 %?30?%}.address-view .vBottom[data-v-c79901c4]{border-bottom:%?2?% solid #e6e6e6;display:flex;flex-direction:row;justify-content:space-evenly;padding:%?30?% 0;font-size:%?32?%;color:#333;align-items:center;font-weight:500}.address-view .current-view[data-v-c79901c4]{display:flex;flex-direction:row;align-items:center;min-width:%?186?%}.address-view .current-view uni-image[data-v-c79901c4]{width:%?14?%;margin-left:%?5?%}.input-view[data-v-c79901c4]{width:100%;display:flex;flex-direction:row;margin-left:%?40?%}.input-view .province-text[data-v-c79901c4]{margin-right:%?15?%}.input-view uni-image[data-v-c79901c4]{width:%?20?%;margin:0 %?15?%}.detail-adress-vew[data-v-c79901c4]{background-color:#fff;padding:%?40?% %?30?% %?0?% %?30?%}.detail-adress-vew uni-view[data-v-c79901c4]{border-bottom:%?2?% solid #e6e6e6;padding-bottom:%?40?%}.detail-address[data-v-c79901c4]{text-align:end;width:100%;word-break:break-all;overflow-wrap:break-word;word-wrap:break-word;box-sizing:border-box}.item-view[data-v-c79901c4]{background-color:#fff;width:100%;padding:0 %?30?%;box-sizing:border-box}.item-view .check-img[data-v-c79901c4]{margin-left:%?40?%;width:%?36?%;height:%?36?%;padding:%?20?% %?20?% %?20?% 0}.item-input[data-v-c79901c4]{width:100%;display:flex;flex-direction:row;justify-content:space-evenly;padding:%?30?% %?0?%;box-sizing:border-box;border-bottom:%?2?% solid #e6e6e6}.item-input .title-text[data-v-c79901c4]{min-width:%?186?%;display:flex;flex-direction:row;align-items:center}.item-input uni-input[data-v-c79901c4],\n.item-input uni-picker[data-v-c79901c4]{margin-left:%?40?%;width:100%}.family_img[data-v-c79901c4]{width:%?14?%;margin-left:%?5?%}.direction-view[data-v-c79901c4]{width:100%;display:flex;flex-direction:row;align-items:center}.danwei-text[data-v-c79901c4]{width:%?200?%}.none-border[data-v-c79901c4]{border:none}.sqr-txt[data-v-c79901c4]{background-color:#fff;padding:%?30?% %?30?%;font-weight:500;font-size:%?36?%;color:var(--color-orange-text);margin-top:%?30?%;margin-bottom:0}.min-width-text[data-v-c79901c4]{min-width:%?300?%}.wx-text[data-v-c79901c4]{width:100%;font-size:%?24?%;color:#f33;margin-top:%?-30?%;padding-left:%?226?%;padding-bottom:%?30?%;box-sizing:border-box;border-bottom:%?2?% solid #e6e6e6}.min-width-280[data-v-c79901c4]{min-width:%?280?%}.min-width-160[data-v-c79901c4]{min-width:%?160?%}.button[data-v-c79901c4]{width:calc(100% - %?60?%);margin:%?77?% %?30?%}.branthNameText[data-v-c79901c4]{width:100%}.grayColor[data-v-c79901c4]{color:grey}.horizontal-view[data-v-c79901c4]{display:flex;align-items:center}.horizontal-view uni-text[data-v-c79901c4]{width:100%}.horizontal-view uni-image[data-v-c79901c4]{width:%?24?%;margin:0 %?3?% 0 %?10?%}.sq-view[data-v-c79901c4]{width:auto;padding:%?15?% %?30?% %?30?% %?35?%;box-sizing:border-box;color:var(--color-orange-text);font-size:%?32?%;margin-top:%?20?%;margin-left:%?20?%;margin-right:%?20?%;border-radius:%?16?%;background-color:#fff}.sq-view .check-view[data-v-c79901c4]{display:flex;flex-direction:row;align-items:center}.sq-view .check-view .check-img[data-v-c79901c4]{width:%?36?%;height:%?36?%;padding:%?20?% %?20?% %?20?% 0}.sq-view .text-name[data-v-c79901c4]{margin-left:%?44?%}.sq-view .text-name + .text-name[data-v-c79901c4]{margin-top:%?20?%}.sq-view .agree-tip[data-v-c79901c4]{color:var(--fontColor)}.none-padding-top[data-v-c79901c4]{padding-top:0}.none-padding-bottom[data-v-c79901c4]{padding-bottom:0}",""]),e.exports=t}}]);