import config from '../config.js';

const baseUrl = getBaseUrl()
const request = (url = '', date = {}, type = 'GET', header = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: baseUrl + url,
			data: date,
			header: header,
			dataType: 'json',
			success: (res) => {
				// console.log("返回数据："+JSON.stringify(res));
				resolve(res.data)
			},
			fail: (error) => {
				console.log(error)
				let [err, res] = error;
				reject(err)
			},
			complete: () => {

			}
		});
	})
}
export default request


function getBaseUrl() {
	if (process.env.NODE_ENV === 'development') {
		return "api"
	} else {
		return config[config.env].baseUrl
	}
}
