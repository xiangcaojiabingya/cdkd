import request from "./request.js"
import config from "../config.js"
import {
	getFormatDate,
	getuuid
} from "../utils/index.js"
import {
	Encrypt,
	Decrypt
} from '../common/js/AESCryptoJS.js'
import rsaUtil from '../common/js/RSAJSEncrypt.js'


let rsaPublicKey = config[config.env].rsaPublicKey
let rsePrivateKey = config[config.env].rsePrivateKey


const apiUtils = {

	//get请求
	getAjax: function(apiUrl, requestData) {
		return new Promise((resolve, reject) => {
			request(apiUrl.url, requestData).then(result => {
				console.log('获取token', result);
				resolve(result)
			}).catch(error => {
				console.log(error);
				reject(error)
			})
		})
	},

	//post请求
	postAjax: function(apiUrl, datas, headers = {
		"Referrer-Policy": "origin",
		'content-type': 'application/json;charset=utf-8',
		Type: "J"
	}) {

		datas.productId = datas.productId || "ZYD001"
		let requestData = {
			header: {
				"productId": "ZYD001",
				"iCIFID": getApp().globalData.iCIFID || uni.getStorageSync("iCIFID"),
				"accessChannelNo": "00"
			},
			body: datas
		}
		console.log("请求数据" + JSON.stringify(requestData));
		//将数据进行AES加密
		var requestDatas = Encrypt(JSON.stringify(requestData), getApp().globalData.aesKey || uni.getStorageSync('aesKey'))
		//将AES加密key进行RSA加密
		var encodeKeys = rsaUtil.Encrypt(getApp().globalData.aesKey || uni.getStorageSync('aesKey'), rsaPublicKey)

		let data = {
			timeStamp: getFormatDate(),
			requestId: getuuid(),
			txBrNo: config[config.env].txBrNo,
			chnlCode: config[config.env].chnlCode,
			serviceCode: apiUrl.apiCode,
			svcSubCode: "",
			access_token: uni.getStorageSync("token"),
			version: '1.0.0',
			sign: null,
			encryptAlgo: "AES",
			encodeKey: encodeKeys, //AES的加密key
			requestData: requestDatas, //AES加密后的数据
		}
		return new Promise((resolve, reject) => {
			request(apiUrl.url, data, "POST", headers).then(res => {
				// console.log('解密前', res);
				var result = res.responseData
				var aesKey = rsaUtil.Decrypt(res.encodeKey, rsePrivateKey)
				// console.log("aesKey =" + aesKey);
				result = Decrypt(res.responseData, aesKey)

				console.log("post-success-result = ", JSON.stringify(result));

				if(result.sysHead && result.sysHead.retCode && result.sysHead.retCode === 'G0403') {
					console.log('access_token处理')
					getApp().globalData.iCIFID = ''
					try {
						let ph = uni.getStorageSync("phone");
						uni.clearStorageSync();
						uni.setStorageSync("phone", ph);
						uni.setStorageSync("iCIFID", '')
					} catch (e) {
						// error
					}
					uni.reLaunch({
						url: '/pages/login/login'
					});
				} else if (result.body.errorCode == 0 || result.body.errorCode == '000000' || result
					.body.errorCode == 'S000A000') {
					console.log('iCIFID: ', result.header.iCIFID)
					getApp().globalData.iCIFID = result.header.iCIFID
					uni.setStorageSync("iCIFID", result.header.iCIFID)
					resolve(result.body)
				} else {
					uni.showToast({
						title: result.body.errorMsg,
						icon: "none"
					})
					// 未登录或登录过期
					if (result.body.errorCode == 'BLEC0001') {
						getApp().globalData.iCIFID = ''
						try {
							let ph = uni.getStorageSync("phone");
							uni.clearStorageSync();
							uni.setStorageSync("phone", ph);
							uni.setStorageSync("iCIFID", '')
						} catch (e) {
							// error
						}
						console.log('errorCode：', result.body.errorCode, result.body
							.errorCode ==
							'BLEC0001')
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
					setTimeout(function() {
						reject(result.body)
					}, 1000);

				}


			}).catch(error => {
				console.log(error);
				reject(error)
			})
		})
	}

}

export default apiUtils


//get请求
export function getAjax(apiUrl, requestData) {
	return new Promise((resolve, reject) => {
		request(apiUrl.url, requestData).then(result => {
			console.log('获取token', result);
			resolve(result)
		}).catch(error => {
			console.log(error);
			reject(error)
		})
	})
}

//post请求
export function postAjax(apiUrl, datas, headers = {
	"Referrer-Policy": "origin",
	'content-type': 'application/json;charset=utf-8',
	Type: "J"
}) {

	let requestData = {
		header: {
			"productId": "ZYD001",
			"iCIFID": getApp().globalData.iCIFID || uni.getStorageSync("iCIFID"),
			"accessChannelNo": "00"
		},
		body: datas
	}
	console.log("请求数据" + JSON.stringify(requestData));
	//将数据进行AES加密
	var requestDatas = Encrypt(JSON.stringify(requestData), getApp().globalData.aesKey || uni.getStorageSync('aesKey'))
	//将AES加密key进行RSA加密
	var encodeKeys = rsaUtil.Encrypt(getApp().globalData.aesKey || uni.getStorageSync('aesKey'), rsaPublicKey)

	let data = {
		timeStamp: getFormatDate(),
		requestId: getuuid(),
		txBrNo: config[config.env].txBrNo,
		chnlCode: config[config.env].chnlCode,
		serviceCode: apiUrl.apiCode,
		svcSubCode: "",
		access_token: uni.getStorageSync("token"),
		version: '1.0.0',
		sign: null,
		encryptAlgo: "AES",
		encodeKey: encodeKeys, //AES的加密key
		requestData: requestDatas, //AES加密后的数据
	}
	return new Promise((resolve, reject) => {
		request(apiUrl.url, data, "POST", headers).then(res => {
			// console.log('解密前', res);
			var result = res.responseData
			var aesKey = rsaUtil.Decrypt(res.encodeKey, rsePrivateKey)
			// console.log("aesKey =" + aesKey);
			result = Decrypt(res.responseData, aesKey)

			console.log("post-success-result = ", JSON.stringify(result));
			if(result.sysHead && result.sysHead.retCode && result.sysHead.retCode === 'G0403') {
				console.log('access_token处理')
				getApp().globalData.iCIFID = ''
				try {
					let ph = uni.getStorageSync("phone");
					uni.clearStorageSync();
					uni.setStorageSync("phone", ph);
					uni.setStorageSync("iCIFID", '')
				} catch (e) {
					// error
				}
				uni.reLaunch({
					url: '/pages/login/login'
				});
			} else if (result.body.errorCode == 0 || result.body.errorCode == '000000' || result.body
				.errorCode == 'S000A000') {
				console.log('iCIFID: ', result.header.iCIFID)
				getApp().globalData.iCIFID = result.header.iCIFID
				uni.setStorageSync("iCIFID", result.header.iCIFID)
				resolve(result.body)
			} else {
				uni.showToast({
					title: result.body.errorMsg,
					icon: "none"
				})
				// 未登录或登录过期
				if (result.body.errorCode == 'BLEC0001') {
					getApp().globalData.iCIFID = ''
					try {
						let ph = uni.getStorageSync("phone");
						uni.clearStorageSync();
						uni.setStorageSync("phone", ph);
						uni.setStorageSync("iCIFID", '')
					} catch (e) {
						// error
					}
					console.log('errorCode：', result.body.errorCode, result.body
						.errorCode ==
						'BLEC0001')
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
				setTimeout(function() {
					reject(result.body)
				}, 1000);
			}


		}).catch(error => {
			console.log(error);
			reject(error)
		})
	})
}
