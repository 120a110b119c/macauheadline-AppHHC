import Vue from 'vue'
import App from './App'
//import jquery from '@/utils/js/jquery.min.js'
import { serverUrl , webViewUrl } from '@/utils/pathSetting/constPath.js'
import {JQUERY} from "@/utils/js/jquery.min.js"
Vue.prototype.JQUERY = JQUERY
// Vue.prototype.jquery = jquery;
Vue.config.productionTip = false
import uView from "uview-ui";
Vue.use(uView);

Vue.prototype.versionData = "3.5.1.0916"

Vue.prototype.serverUrl = serverUrl; // 生产环境
Vue.prototype.webViewUrl = webViewUrl;
// Vue.prototype.serverUrl = "/api/";		// 开发环境
import * as Httpps from '@/utils/js/http/http.js';
Vue.prototype.$Httpps = Httpps;
Vue.prototype.shareImage = "http://2020.macaoheadline.com/Imgs/macaoheadlineLogo.png"

// import {zhTran} from '@/utils/js/conversion/index.js'
// Vue.prototype.$zhTran = zhTran

import i18n from '@/utils/js/conversion/index.js' 
Vue.prototype._i18n = i18n

// import {fontConversion} from "@/utils/js/conversion/index3.js"
// Vue.prototype.$fontConversion = fontConversion

Vue.prototype.requestPost = Httpps.requestPost
// 本地缓存
Vue.prototype.$getStorage = function(key) {
	var userParam = uni.getStorageSync(key);
	if (userParam != null && userParam != "" && userParam != undefined) {
		return userParam;
	} else {
		return null;
	}
}



App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
})
app.$mount()
