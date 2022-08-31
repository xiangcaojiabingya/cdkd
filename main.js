import App from './App'

// #ifndef VUE3

import Vue from 'vue'

Vue.config.productionTip = false
App.mpType = 'app'
import apiUtils from "./request/api.js"
import apiUrl from "./request/url.js"
Vue.prototype.$request = apiUtils
Vue.prototype.$apiUrl = apiUrl
import uView from "uview-ui"
import gfdGlobalData from "./utils/index.js"
Vue.prototype.$gfdGlobalData = gfdGlobalData
Vue.use(uView);
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
