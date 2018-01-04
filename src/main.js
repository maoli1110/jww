import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import MintUI  from 'mint-ui';
import "babel-polyfill";
import 'mint-ui/lib/style.css';
Vue.use(MintUI);
Vue.prototype.$axios = axios;
// import global_ from './global.vue'//引用config文件
// Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

/**
 * http拦截器
 * Add a request interceptor
 */
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	// Do something with response data
	return response;
}, function (error) {
	// Do something with response error
	return Promise.reject(error);
});
