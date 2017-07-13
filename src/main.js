// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'
Vue.prototype.ajax = axios;
Vue.prototype.HOST = '/api'
Vue.config.productionTip = false


//时间过滤器
Vue.filter('formTime',function(a){
	var time = new Date(a);
	return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  template: '<App/>',
  components: { App }
})
